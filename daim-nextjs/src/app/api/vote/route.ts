import { NextRequest, NextResponse } from 'next/server';
import { subscriberStore } from '@/lib/kv-store';
import { sendVoteEmail } from '@/lib/emailjs';

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
      type: 'vote',
      timestamp: new Date().toISOString()
    };

    // EmailJSで投票メールを送信
    const emailResult = await sendVoteEmail(voteData);
    
    if (!emailResult.success) {
      console.error('EmailJS送信失敗:', emailResult.error);
      return NextResponse.json(
        { error: '投票の送信に失敗しました。しばらく時間をおいて再度お試しください。' },
        { status: 500 }
      );
    }
    
    console.log('Vote email sent successfully:', {
      costume: voteData.costume,
      email: voteData.email || 'anonymous',
      messageId: emailResult.messageId,
      timestamp: voteData.timestamp
    });

    return NextResponse.json(
      { 
        message: '投票ありがとうございます！ご投票内容をメールで送信しました。',
        messageId: emailResult.messageId,
        selectedCostume: voteData.costume
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

    // 投票一覧を取得（KV storeから）
    const subscribers = await subscriberStore.getAll();
    const votes = subscribers.filter(sub => 
      sub.message && sub.message.includes('新しい投票が届きました')
    );
    
    const sortedVotes = votes.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // 投票結果の集計
    const voteCounts = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    };

    votes.forEach(vote => {
      if (vote.message.includes('イメージカット（1）')) voteCounts['1']++;
      else if (vote.message.includes('イメージカット（2）')) voteCounts['2']++;
      else if (vote.message.includes('イメージカット（3）')) voteCounts['3']++;
      else if (vote.message.includes('イメージカット（4）')) voteCounts['4']++;
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

