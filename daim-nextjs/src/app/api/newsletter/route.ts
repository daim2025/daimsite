import { NextRequest, NextResponse } from 'next/server';
import { 
  readSubscribers, 
  addSubscriber, 
  findSubscriber, 
  updateSubscriber, 
  validateEmail, 
  checkAdminAuth 
} from '@/lib/subscribers';

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

    // 既存のサブスクライバーをチェック
    const existingSubscriber = findSubscriber(email);

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { error: 'このメールアドレスは既に登録されています' },
          { status: 409 }
        );
      } else {
        // 配信停止中の場合は再登録
        updateSubscriber(email, { status: 'active' });
        return NextResponse.json(
          { message: 'メールの配信を再開しました' },
          { status: 200 }
        );
      }
    } else {
      // 新しいサブスクライバーを追加
      addSubscriber(email);
      return NextResponse.json(
        { 
          message: 'メール登録が完了しました！リリース時に通知をお送りします。',
          email: email.toLowerCase().trim()
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: '登録処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

// GET: 管理者認証（ダッシュボード用）
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    
    if (!checkAdminAuth(adminKey)) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    // 登録者統計を取得
    const subscribers = readSubscribers();
    const activeSubscribers = subscribers.filter(sub => sub.status === 'active');

    return NextResponse.json(
      { 
        count: activeSubscribers.length,
        total: subscribers.length,
        message: '認証に成功しました'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: '認証処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}