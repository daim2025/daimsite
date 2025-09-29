import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key');
  const validKey = process.env.ADMIN_KEY || 'DAIM_TEST_ADMIN_KEY_2024';

  // 管理者権限チェック
  if (adminKey !== validKey) {
    return NextResponse.json(
      { error: '管理者権限が必要です' },
      { status: 401 }
    );
  }

  try {
    // KV接続状態を確認
    const kvEnvs = {
      KV_REST_API_URL: !!process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
      KV_URL: !!process.env.KV_URL,
      KV_REST_API_READ_ONLY_TOKEN: !!process.env.KV_REST_API_READ_ONLY_TOKEN
    };

    let kvStatus = 'NOT_AVAILABLE';
    let kvData = null;
    let kvError = null;

    try {
      const { kv } = require('@vercel/kv');
      kvStatus = 'AVAILABLE';

      // 実際にKVからデータを取得してみる
      kvData = await kv.get('votes:all');
      console.log('Debug KV GET result:', kvData);

    } catch (error) {
      kvStatus = 'ERROR';
      kvError = error.message;
      console.error('Debug KV error:', error);
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      kvEnvironment: kvEnvs,
      kvStatus,
      kvDataLength: Array.isArray(kvData) ? kvData.length : null,
      kvError,
      sampleData: Array.isArray(kvData) ? kvData.slice(0, 2) : kvData
    });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'デバッグAPIエラー', details: error.message },
      { status: 500 }
    );
  }
}