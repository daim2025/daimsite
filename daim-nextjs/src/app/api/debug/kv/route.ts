import { NextRequest, NextResponse } from 'next/server';
import { supabaseVoteStore, supabase } from '@/lib/supabase';

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

    // Supabase状態も確認
    let supabaseStatus = 'NOT_CONFIGURED';
    let supabaseData = null;
    let supabaseError = null;

    const supabaseEnvs = {
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    };

    if (supabase) {
      try {
        supabaseStatus = 'CONFIGURED';
        supabaseData = await supabaseVoteStore.getAll();
        supabaseStatus = 'CONNECTED';
        console.log('Debug Supabase GET result:', supabaseData?.length || 0, 'votes');
      } catch (error) {
        supabaseStatus = 'ERROR';
        supabaseError = error.message;
        console.error('Debug Supabase error:', error);
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      kvEnvironment: kvEnvs,
      kvStatus,
      kvDataLength: Array.isArray(kvData) ? kvData.length : null,
      kvError,
      kvSampleData: Array.isArray(kvData) ? kvData.slice(0, 2) : kvData,
      supabaseEnvironment: supabaseEnvs,
      supabaseStatus,
      supabaseDataLength: Array.isArray(supabaseData) ? supabaseData.length : null,
      supabaseError,
      supabaseSampleData: Array.isArray(supabaseData) ? supabaseData.slice(0, 2) : supabaseData
    });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'デバッグAPIエラー', details: error.message },
      { status: 500 }
    );
  }
}