import { NextRequest, NextResponse } from 'next/server';
import { voteStore } from '@/lib/kv-store';
import { supabaseVoteStore } from '@/lib/supabase';

export async function POST(request: NextRequest) {
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
    console.log('🔄 Starting vote migration to Supabase...');

    // KVストアまたはJSONファイルから既存データを取得
    const existingVotes = await voteStore.getAll(true);
    console.log(`📊 Found ${existingVotes.length} existing votes to migrate`);

    if (existingVotes.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No votes found to migrate',
        migrated: 0
      });
    }

    // Supabaseに一つずつ移行
    let migratedCount = 0;
    let errors = [];

    for (const vote of existingVotes) {
      try {
        // データ形式を調整
        const voteData = {
          costume: vote.costume,
          email: vote.email,
          comment: vote.comment,
          timestamp: vote.timestamp || vote.createdAt
        };

        const result = await supabaseVoteStore.add(voteData);
        if (result) {
          migratedCount++;
          console.log(`✅ Migrated vote ${vote.id} -> ${result.id}`);
        } else {
          errors.push(`Failed to migrate vote ${vote.id}: Supabase returned null`);
        }
      } catch (error) {
        console.error(`❌ Failed to migrate vote ${vote.id}:`, error);
        errors.push(`Vote ${vote.id}: ${error.message}`);
      }
    }

    console.log(`🎉 Migration completed: ${migratedCount}/${existingVotes.length} votes migrated`);

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${migratedCount} votes to Supabase`,
      total: existingVotes.length,
      migrated: migratedCount,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      {
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}