import { NextRequest, NextResponse } from 'next/server';
import { simpleVoteStore } from '@/lib/simple-vote-store';

// メールアドレスバリデーション
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: NextRequest) {
  try {
    const { costume, email, comment } = await request.json();

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

    // シンプルストアに保存
    const newVote = simpleVoteStore.add(voteData);
    
    console.log('Vote saved successfully:', {
      id: newVote.id,
      costume: newVote.costume,
      email: newVote.email || 'anonymous',
      comment: newVote.comment,
      createdAt: newVote.createdAt,
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
    // 管理者権限チェック（簡易版）
    const adminKey = request.headers.get('x-admin-key');
    const validKey = process.env.ADMIN_KEY || 'DAIM_TEST_ADMIN_KEY_2024';
    if (adminKey !== validKey) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    // シンプルストアから投票データを取得
    const votes = simpleVoteStore.getAll();
    const voteCounts = simpleVoteStore.getCounts();
    
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

  } catch (error) {
    console.error('Error getting votes:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

