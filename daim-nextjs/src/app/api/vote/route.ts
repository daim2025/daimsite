import { NextRequest, NextResponse } from 'next/server';
import { voteStore } from '@/lib/kv-store';
import { supabaseVoteStore } from '@/lib/supabase';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key',
};

// メールアドレスバリデーション
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  console.log('=== Vote POST Request Started ===');
  console.log('Request URL:', request.url);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));

  try {
    const contentType = request.headers.get('content-type');
    let costume, email, comment;

    console.log('Content-Type:', contentType);

    if (contentType?.includes('application/json')) {
      // JSON形式の場合
      const data = await request.json();
      costume = data.costume;
      email = data.email;
      comment = data.comment;
      console.log('JSON data received:', { costume, email: email ? 'provided' : 'not provided', comment });
    } else {
      // フォームデータの場合
      const formData = await request.formData();
      costume = formData.get('costume');
      email = formData.get('email');
      comment = formData.get('comment');
      console.log('Form data received:', { costume, email: email ? 'provided' : 'not provided', comment });
    }

    // バリデーション
    if (!costume) {
      console.log('❌ Validation failed: No costume selected');
      return NextResponse.json(
        { error: 'コスプレ衣装を選択してください' },
        { status: 400, headers: corsHeaders }
      );
    }

    // コスプレ選択肢の検証
    const validCostumes = ['1', '2', '3', '4'];
    if (!validCostumes.includes(costume)) {
      console.log('❌ Validation failed: Invalid costume selection:', costume);
      return NextResponse.json(
        { error: '無効な選択肢です' },
        { status: 400, headers: corsHeaders }
      );
    }

    // メールアドレスが提供されている場合はバリデーション
    if (email && !validateEmail(email)) {
      console.log('❌ Validation failed: Invalid email format:', email);
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400, headers: corsHeaders }
      );
    }

    // 投票データの作成
    const voteData = {
      costume: `イメージカット（${costume}）`,
      email: email?.toLowerCase().trim() || undefined,
      comment: comment?.trim() || undefined,
      timestamp: new Date().toISOString()
    };

    console.log('✅ Vote data prepared:', voteData);

    // KVストアのみを使用（既存データとの整合性確保）
    console.log('🔄 Using KV Store exclusively for consistency...');
    let newVote;
    let storageUsed = 'KV Store (exclusive)';

    try {
      newVote = await voteStore.add(voteData);
      if (newVote) {
        console.log('✅ Successfully saved to KV Store:', newVote.id);
      } else {
        throw new Error('KV Store returned null/undefined');
      }
    } catch (kvError) {
      console.error('❌ KV Store save failed:', kvError);
      throw new Error(`Failed to save vote to KV Store: ${kvError.message}`);
    }

    if (!newVote) {
      console.error('❌ CRITICAL: Failed to save vote to any storage backend');
      throw new Error('Failed to save vote to any storage backend');
    }

    console.log('🎉 Vote saved successfully:', {
      id: newVote.id,
      costume: newVote.costume,
      email: newVote.email || 'anonymous',
      comment: newVote.comment,
      createdAt: newVote.created_at || newVote.createdAt,
      storage: storageUsed
    });

    const response = {
      message: '投票ありがとうございます！ご投票内容を保存しました。',
      id: newVote.id,
      selectedCostume: newVote.costume,
      timestamp: newVote.timestamp || newVote.created_at
    };

    console.log('📤 Sending success response:', response);

    return NextResponse.json(response, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('❌ Vote form error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    return NextResponse.json(
      {
        error: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    const validKey = process.env.ADMIN_KEY || 'DAIM_TEST_ADMIN_KEY_2024';

    // 管理者権限がある場合は詳細データを返す
    if (adminKey === validKey) {
      // KVストアから直接データを取得（確実性重視）
      console.log('🔄 Admin request: Getting data from KV Store exclusively...');
      let votes = await voteStore.getAll();
      let voteCounts = await voteStore.getCounts();

      console.log(`📊 KV Store data retrieved: ${votes.length} votes, counts:`, voteCounts);

      const sortedVotes = votes.sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt || a.timestamp).getTime();
        const dateB = new Date(b.created_at || b.createdAt || b.timestamp).getTime();
        return dateB - dateA;
      });

      return NextResponse.json(
        {
          votes: sortedVotes,
          totalVotes: votes.length,
          voteCounts,
          mostPopular: Object.entries(voteCounts).reduce((a, b) =>
            voteCounts[a[0]] > voteCounts[b[0]] ? a : b
          )[0],
          message: '投票一覧と集計結果'
        },
        { status: 200, headers: corsHeaders }
      );
    }

    // 一般向けには集計データのみを返す
    // KVストアから直接データを取得（確実性重視）
    console.log('🔄 Public request: Getting counts from KV Store exclusively...');
    let voteCounts = await voteStore.getCounts();
    let totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);

    console.log(`📊 Public data retrieved: ${totalVotes} total votes, counts:`, voteCounts);

    return NextResponse.json(
      {
        votes: [], // 個別投票データは非公開
        totalVotes,
        voteCounts,
        message: '投票集計結果'
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error getting votes:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    if (action === 'clear-cache') {
      // キャッシュクリア
      await voteStore.clearCache();

      console.log('Vote cache cleared by admin');

      return NextResponse.json(
        { message: '投票データのキャッシュをクリアしました' },
        { status: 200 }
      );
    } else {
      // 全ての投票データを削除（KVストアのみ）
      await voteStore.deleteAll();

      console.log(`All votes deleted by admin from KV Store`);

      return NextResponse.json(
        { message: '全ての投票データを削除しました' },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Vote deletion error:', error);
    return NextResponse.json(
      { error: '投票データの削除中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

