import { NextRequest, NextResponse } from 'next/server';
import { voteStore } from '@/lib/kv-store';

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

    // 保存前の状態を確認
    const beforeCount = (await voteStore.getAll()).length;
    console.log(`📊 Before save: ${beforeCount} votes`);

    // 専用の投票ストアに保存
    const newVote = await voteStore.add(voteData);

    // 保存後の状態を確認
    const afterCount = (await voteStore.getAll()).length;
    console.log(`📊 After save: ${afterCount} votes`);

    console.log('Vote saved successfully:', {
      id: newVote.id,
      costume: newVote.costume,
      email: newVote.email || 'anonymous',
      comment: newVote.comment,
      createdAt: newVote.createdAt,
      beforeCount,
      afterCount,
      storage: 'Dedicated Vote Store (KV + JSON)'
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
      // 最新データを強制取得
      const votes = await voteStore.getAll(true);
      const voteCounts = await voteStore.getCounts();

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
    const url = new URL(request.url);
    const refresh = url.searchParams.get('refresh') === 'true';

    // refreshパラメータがある場合は最新データを取得
    const votes = await voteStore.getAll(refresh);
    const voteCounts = await voteStore.getCounts();
    const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);

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
      // 全ての投票データを削除
      await voteStore.deleteAll();

      console.log('All votes deleted by admin');

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

