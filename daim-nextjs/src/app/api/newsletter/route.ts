import { NextRequest, NextResponse } from 'next/server';
// import { supabaseAdmin } from '@/lib/supabase';
// import { sendWelcomeEmail } from '@/lib/email';
// import { v4 as uuidv4 } from 'uuid';

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

    // 一時的にニュースレター登録機能を無効化（データベース未実装）
    console.log('Newsletter signup request for:', normalizedEmail);

    return NextResponse.json(
      { 
        message: 'ありがとうございます！リリース時にお知らせいたします。',
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
    if (adminKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    // 一時的にモックデータを返す（データベース未実装）
    return NextResponse.json(
      { 
        count: 0,
        message: '登録者数（データベース未実装）'
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
