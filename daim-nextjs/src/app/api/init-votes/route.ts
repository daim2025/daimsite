import { NextRequest, NextResponse } from 'next/server';
import { voteStore } from '@/lib/kv-store';

export async function POST(request: NextRequest) {
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

    // JSONファイルからVotesを読み込み、KVストアに強制的に保存
    const jsonVotes = await voteStore.loadFromJson();

    if (jsonVotes.length === 0) {
      return NextResponse.json(
        { message: 'JSONファイルに投票データがありません' },
        { status: 200 }
      );
    }

    // KVストアに強制的にデータを保存
    for (const vote of jsonVotes) {
      // 個別の投票データを保存
      const safeKvSet = async (key: string, value: any): Promise<void> => {
        try {
          // Vercel KVが利用可能な場合
          if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
            const { kv } = await import('@vercel/kv');
            await kv.set(key, value);
          }
        } catch (error) {
          console.warn(`Could not save to KV: ${key}`, error);
        }
      };

      await safeKvSet(`vote:${vote.id}`, vote);
    }

    // 全投票データを保存
    await (async () => {
      try {
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
          const { kv } = await import('@vercel/kv');
          await kv.set('votes:all', jsonVotes);
        }
      } catch (error) {
        console.warn('Could not save votes:all to KV', error);
      }
    })();

    // 集計データを再計算して保存
    const voteCounts = { '1': 0, '2': 0, '3': 0, '4': 0 };
    jsonVotes.forEach(vote => {
      const match = vote.costume?.match(/イメージカット（(\d)）/);
      if (match && match[1]) {
        voteCounts[match[1]]++;
      }
    });

    return NextResponse.json(
      {
        message: 'KVストアに投票データを初期化しました',
        imported: jsonVotes.length,
        voteCounts
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Vote initialization error:', error);
    return NextResponse.json(
      { error: '投票データの初期化に失敗しました', details: error.message },
      { status: 500 }
    );
  }
}