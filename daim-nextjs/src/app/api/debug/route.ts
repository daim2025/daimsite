import { NextRequest, NextResponse } from 'next/server';
import { voteStore } from '@/lib/kv-store';

export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    const validKey = process.env.ADMIN_KEY || 'DAIM_TEST_ADMIN_KEY_2024';

    // 管理者権限チェック
    if (adminKey !== validKey) {
      return NextResponse.json(
        { error: '管理者権限が必要です' },
        { status: 401 }
      );
    }

    // 環境情報を取得
    const hasKvEnv = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

    // ストレージ情報を調査
    const votes = await voteStore.getAll();
    const jsonVotes = await voteStore.loadFromJson();

    const debugInfo = {
      environment: process.env.NODE_ENV,
      hasKvEnvironment: hasKvEnv,
      kvUrl: process.env.KV_REST_API_URL ? 'Present' : 'Missing',
      kvToken: process.env.KV_REST_API_TOKEN ? 'Present' : 'Missing',
      votesFromStore: votes.length,
      votesFromJson: jsonVotes.length,
      storageMethod: hasKvEnv ? 'KV Store' : 'JSON File + Memory',
      votes: votes.slice(0, 2), // 最初の2件のみ表示
      jsonVotes: jsonVotes.slice(0, 2) // 最初の2件のみ表示
    };

    return NextResponse.json(debugInfo, { status: 200 });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'デバッグ情報の取得に失敗しました', details: error.message },
      { status: 500 }
    );
  }
}