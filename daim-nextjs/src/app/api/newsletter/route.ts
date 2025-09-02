import { NextRequest, NextResponse } from 'next/server';

// メール登録データを保存するための簡単なストレージ（開発・テスト用）
let subscribers: Array<{
  email: string;
  status: 'active' | 'unsubscribed';
  createdAt: string;
  token: string;
}> = [];

// UUIDのような文字列を生成
function generateToken(): string {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16 | 0).toString(16);
  });
}

// メールアドレスバリデーション
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // バリデーション
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // 正規化
    const normalizedEmail = email.toLowerCase().trim();

    // 既存のサブスクライバーをチェック
    const existingSubscriber = subscribers.find(sub => sub.email === normalizedEmail);

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { error: 'このメールアドレスは既に登録されています' },
          { status: 409 }
        );
      } else {
        // 配信停止中の場合は再登録
        existingSubscriber.status = 'active';
        existingSubscriber.token = generateToken();
      }
    } else {
      // 新規登録
      subscribers.push({
        email: normalizedEmail,
        status: 'active',
        createdAt: new Date().toISOString(),
        token: generateToken()
      });
    }

    return NextResponse.json(
      { 
        message: 'メール登録が完了しました！リリース時に通知をお送りします。',
        email: normalizedEmail 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 管理者権限チェック（簡易版）
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_API_KEY && adminKey !== 'DAIM_TEST_ADMIN_KEY_2024') {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    // アクティブな登録者数を取得
    const activeSubscribers = subscribers.filter(sub => sub.status === 'active');

    return NextResponse.json(
      { 
        count: activeSubscribers.length,
        total: subscribers.length,
        subscribers: subscribers, // 開発・テスト用
        message: '登録者数'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error getting subscriber stats:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
