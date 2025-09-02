import { NextRequest, NextResponse } from 'next/server';

// 外部のsubscribersデータを参照（実際の実装では共通のデータストアを使用）
// 開発・テスト用の簡易実装
let subscribers: Array<{
  email: string;
  status: 'active' | 'unsubscribed';
  createdAt: string;
  token: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: '配信停止トークンが必要です' },
        { status: 400 }
      );
    }

    // トークンでサブスクライバーを検索
    const subscriber = subscribers.find(sub => sub.token === token);

    if (!subscriber) {
      return NextResponse.json(
        { error: '無効な配信停止トークンです' },
        { status: 404 }
      );
    }

    if (subscriber.status === 'unsubscribed') {
      return NextResponse.json(
        { message: '既に配信停止されています' },
        { status: 200 }
      );
    }

    // 配信停止
    subscriber.status = 'unsubscribed';

    return NextResponse.json(
      { 
        message: '配信停止が完了しました',
        email: subscriber.email
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: '配信停止トークンが必要です' },
        { status: 400 }
      );
    }

    // トークンでサブスクライバーを検索
    const subscriber = subscribers.find(sub => sub.token === token);

    if (!subscriber) {
      return NextResponse.json(
        { error: '無効な配信停止トークンです' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        email: subscriber.email,
        status: subscriber.status
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe check error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
