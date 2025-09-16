import { NextRequest, NextResponse } from 'next/server';
import { subscriberStore } from '@/lib/kv-store';

// Utility functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkAdminAuth(adminKey: string | null): boolean {
  const validKey = process.env.ADMIN_KEY || 'DAIM_TEST_ADMIN_KEY_2024';
  return adminKey === validKey;
}

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
    const subscribers = await subscriberStore.getAll();
    const existingSubscriber = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase().trim());

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { error: 'このメールアドレスは既に登録されています' },
          { status: 409 }
        );
      } else {
        // 配信停止中の場合は再登録
        await subscriberStore.updateStatus(email.toLowerCase().trim(), 'active');
        return NextResponse.json(
          { message: 'メールの配信を再開しました' },
          { status: 200 }
        );
      }
    } else {
      // 新しいサブスクライバーを追加
      await subscriberStore.add(email.toLowerCase().trim());
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
    const subscribers = await subscriberStore.getAll();
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