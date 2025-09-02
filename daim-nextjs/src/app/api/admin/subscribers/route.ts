import { NextRequest, NextResponse } from 'next/server';

// 外部のsubscribersデータを参照（実際の実装では共通のデータストアを使用）
// 開発・テスト用の簡易実装
let subscribers: Array<{
  email: string;
  status: 'active' | 'unsubscribed';
  createdAt: string;
  token: string;
}> = [];

// 管理者権限チェック
const checkAdminAuth = (request: NextRequest) => {
  const adminKey = request.headers.get('x-admin-key');
  return adminKey === process.env.ADMIN_API_KEY || adminKey === 'DAIM_TEST_ADMIN_KEY_2024';
};

// 登録者一覧取得
export async function GET(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') || 'all';
    const offset = (page - 1) * limit;

    let filteredSubscribers = subscribers;
    if (status !== 'all') {
      filteredSubscribers = subscribers.filter(sub => sub.status === status);
    }

    const total = filteredSubscribers.length;
    const paginatedSubscribers = filteredSubscribers.slice(offset, offset + limit);

    return NextResponse.json({
      subscribers: paginatedSubscribers.map(sub => ({
        id: sub.token, // トークンをIDとして使用
        email: sub.email,
        status: sub.status,
        created_at: sub.createdAt,
        updated_at: sub.createdAt
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Admin subscribers error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// 一括メール送信（モック）
export async function POST(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    const { type, targetStatus = 'active' } = await request.json();

    if (!type || !['welcome', 'release'].includes(type)) {
      return NextResponse.json(
        { error: '無効なメールタイプです' },
        { status: 400 }
      );
    }

    // 対象の登録者を取得
    const targetSubscribers = subscribers.filter(sub => sub.status === targetStatus);

    if (targetSubscribers.length === 0) {
      return NextResponse.json(
        { message: '送信対象の登録者がいません' },
        { status: 200 }
      );
    }

    // モック送信（実際のメール送信の代わり）
    const results = targetSubscribers.map(sub => ({
      email: sub.email,
      status: 'sent' // 開発・テスト用は常に成功
    }));

    const successCount = results.length;

    return NextResponse.json({
      message: `メール送信完了: 成功 ${successCount}件`,
      total: targetSubscribers.length,
      success: successCount,
      failed: 0,
      results
    });

  } catch (error) {
    console.error('Bulk email error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
