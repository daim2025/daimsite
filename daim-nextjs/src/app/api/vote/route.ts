import { NextRequest, NextResponse } from 'next/server';
import { voteStore } from '@/lib/kv-store';
import { supabaseVoteStore } from '@/lib/supabase';

// メールアドレスバリデーション
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let costume, email, comment;

    if (contentType?.includes('application/json')) {
      // JSON形式の場合
      const data = await request.json();
      costume = data.costume;
      email = data.email;
      comment = data.comment;
    } else {
      // フォームデータの場合
      const formData = await request.formData();
      costume = formData.get('costume');
      email = formData.get('email');
      comment = formData.get('comment');
    }

    // バリデーション
    if (!costume) {
      return NextResponse.json(
        { error: 'コスプレ衣装を選択してください' },
        { status: 400 }
      );
    }

    // コスプレ選択肢の検証
    const validCostumes = ['1', '2', '3', '4'];
    if (!validCostumes.includes(costume)) {
      return NextResponse.json(
        { error: '無効な選択肢です' },
        { status: 400 }
      );
    }

    // メールアドレスが提供されている場合はバリデーション
    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // 投票データの作成
    const voteData = {
      costume: `イメージカット（${costume}）`,
      email: email?.toLowerCase().trim() || undefined,
      comment: comment?.trim() || undefined,
      timestamp: new Date().toISOString()
    };

    // Supabaseを優先して保存を試行
    let newVote = await supabaseVoteStore.add(voteData);
    let storageUsed = 'Supabase';

    // Supabaseに失敗した場合はKVストアにフォールバック
    if (!newVote) {
      console.warn('Supabase failed, falling back to KV store');
      const kvVoteData = {
        ...voteData,
        timestamp: voteData.timestamp || new Date().toISOString()
      };
      newVote = await voteStore.add(kvVoteData) as any;
      storageUsed = 'KV Store (fallback)';
    }

    if (!newVote) {
      throw new Error('Failed to save vote to any storage backend');
    }

    console.log('Vote saved successfully:', {
      id: newVote.id,
      costume: newVote.costume,
      email: newVote.email || 'anonymous',
      comment: newVote.comment,
      createdAt: newVote.created_at || newVote.createdAt,
      storage: storageUsed
    });

    return NextResponse.json(
      { 
        message: '投票ありがとうございます！ご投票内容を保存しました。',
        id: newVote.id,
        selectedCostume: newVote.costume,
        timestamp: newVote.timestamp
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Vote form error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    const validKey = process.env.ADMIN_KEY || 'DAIM_TEST_ADMIN_KEY_2024';

    // 管理者権限がある場合は詳細データを返す
    if (adminKey === validKey) {
      // Supabaseから最新データを取得、失敗時はKVストアにフォールバック
      let votes = await supabaseVoteStore.getAll();
      let voteCounts = await supabaseVoteStore.getCounts();

      if (votes.length === 0) {
        console.warn('No Supabase data, falling back to KV store');
        votes = await voteStore.getAll(true);
        voteCounts = await voteStore.getCounts();
      }

      const sortedVotes = votes.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

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
        { status: 200 }
      );
    }

    // 一般向けには集計データのみを返す
    // Supabaseから最新データを取得、失敗時はKVストアにフォールバック
    let voteCounts = await supabaseVoteStore.getCounts();
    let totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);

    if (totalVotes === 0) {
      console.warn('No Supabase data, falling back to KV store for public API');
      voteCounts = await voteStore.getCounts();
      totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);
    }

    return NextResponse.json(
      {
        votes: [], // 個別投票データは非公開
        totalVotes,
        voteCounts,
        message: '投票集計結果'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error getting votes:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
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
      // 全ての投票データを削除（SupabaseとKV両方）
      const supabaseDeleted = await supabaseVoteStore.deleteAll();
      await voteStore.deleteAll();

      console.log(`All votes deleted by admin. Supabase: ${supabaseDeleted ? 'Success' : 'Failed'}, KV: Attempted`);

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

