import { NextRequest, NextResponse } from 'next/server';
import { voteStore } from '@/lib/kv-store';
import { supabaseVoteStore } from '@/lib/supabase';
import { simpleVoteStore } from '@/lib/simple-vote-store';

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
    console.log('=== DEBUG VOTES REQUEST ===');

    // KVストアからデータ取得
    console.log('🔍 Checking KV Store...');
    const kvVotes = await voteStore.getAll(true);
    const kvCounts = await voteStore.getCounts();

    console.log('KV Store results:', {
      count: kvVotes.length,
      votes: kvVotes.slice(0, 3) // 最初の3件のみログ
    });

    // Supabaseからデータ取得
    console.log('🔍 Checking Supabase...');
    const supabaseVotes = await supabaseVoteStore.getAll();
    const supabaseCounts = await supabaseVoteStore.getCounts();

    console.log('Supabase results:', {
      count: supabaseVotes.length,
      votes: supabaseVotes.slice(0, 3) // 最初の3件のみログ
    });

    // Simple Memory Storeからデータ取得
    console.log('🔍 Checking Simple Memory Store...');
    const memoryVotes = await simpleVoteStore.getAll();
    const memoryCounts = await simpleVoteStore.getCounts();

    console.log('Simple Memory Store results:', {
      count: memoryVotes.length,
      votes: memoryVotes.slice(0, 3) // 最初の3件のみログ
    });

    // 環境変数チェック
    const envCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasKvUrl: !!process.env.KV_REST_API_URL,
      hasKvToken: !!process.env.KV_REST_API_TOKEN,
      nodeEnv: process.env.NODE_ENV
    };

    console.log('Environment check:', envCheck);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: envCheck,
      kvStore: {
        total: kvVotes.length,
        counts: kvCounts,
        latestVotes: kvVotes.slice(0, 5).map(vote => ({
          id: vote.id,
          costume: vote.costume,
          timestamp: vote.timestamp || vote.createdAt,
          email: vote.email ? 'provided' : 'not provided'
        }))
      },
      supabase: {
        total: supabaseVotes.length,
        counts: supabaseCounts,
        latestVotes: supabaseVotes.slice(0, 5).map(vote => ({
          id: vote.id,
          costume: vote.costume,
          created_at: vote.created_at,
          email: vote.email ? 'provided' : 'not provided'
        }))
      },
      simpleMemoryStore: {
        total: memoryVotes.length,
        counts: memoryCounts,
        latestVotes: memoryVotes.slice(0, 5).map(vote => ({
          id: vote.id,
          costume: vote.costume,
          created_at: vote.created_at,
          email: vote.email ? 'provided' : 'not provided'
        }))
      }
    });

  } catch (error) {
    console.error('Debug votes error:', error);
    return NextResponse.json(
      {
        error: 'デバッグエラー',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}