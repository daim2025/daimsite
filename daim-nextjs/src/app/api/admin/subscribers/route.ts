import { NextRequest, NextResponse } from 'next/server';
// import { supabaseAdmin } from '@/lib/supabase';
// import { sendBulkEmails } from '@/lib/email';

// 管理者権限チェック
const checkAdminAuth = (request: NextRequest) => {
  const adminKey = request.headers.get('x-admin-key');
  return adminKey === process.env.ADMIN_API_KEY;
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

    // 一時的にモックデータを返す（データベース未実装）
    return NextResponse.json({
      subscribers: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0
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

// 一括メール送信
export async function POST(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    const { type } = await request.json();

    if (!type || !['welcome', 'release'].includes(type)) {
      return NextResponse.json(
        { error: '無効なメールタイプです' },
        { status: 400 }
      );
    }

    // 一時的にメール送信機能を無効化（データベース未実装）
    return NextResponse.json({
      message: `メール送信機能は一時的に無効化されています（データベース未実装）`,
      total: 0,
      success: 0,
      failed: 0,
      results: []
    });

  } catch (error) {
    console.error('Bulk email error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
