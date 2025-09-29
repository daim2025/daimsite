import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase接続が設定されていません' },
      { status: 500 }
    );
  }

  try {
    console.log('🔄 Setting up Supabase database...');

    // まず、votesテーブルが存在するかチェック
    const { data: existingTable, error: checkError } = await supabase
      .from('votes')
      .select('count', { count: 'exact', head: true });

    if (!checkError) {
      // テーブルが存在する場合
      console.log('✅ Votes table already exists');

      // 既存データを確認
      const { data: existingVotes, error: selectError } = await supabase
        .from('votes')
        .select('*')
        .limit(5);

      return NextResponse.json({
        success: true,
        message: 'Votes table already exists',
        tableExists: true,
        existingVotesCount: existingTable?.length || 0,
        sampleVotes: existingVotes || []
      });
    }

    // テーブルが存在しない場合、SQL DDLで作成を試行
    console.log('⚠️ Votes table does not exist, attempting to create...');

    // Note: Supabase JavaScript clientはDDL操作をサポートしていないため、
    // テーブル作成はSupabase Dashboard/SQLエディタで手動で行う必要があります。

    const createTableSQL = `
CREATE TABLE IF NOT EXISTS votes (
  id TEXT PRIMARY KEY,
  costume TEXT NOT NULL,
  email TEXT,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスを作成
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at);
CREATE INDEX IF NOT EXISTS idx_votes_costume ON votes(costume);
`;

    return NextResponse.json({
      success: false,
      message: 'Votes table does not exist and cannot be created programmatically',
      tableExists: false,
      sqlToExecute: createTableSQL,
      instructions: 'Please execute the provided SQL in Supabase Dashboard > SQL Editor'
    });

  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json(
      {
        error: 'データベースセットアップ中にエラーが発生しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// テーブル作成SQLを手動で実行するための情報提供
export async function GET(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key');
  const validKey = process.env.ADMIN_KEY || 'DAIM_TEST_ADMIN_KEY_2024';

  if (adminKey !== validKey) {
    return NextResponse.json(
      { error: '管理者権限が必要です' },
      { status: 401 }
    );
  }

  const createTableSQL = `-- Votes table creation SQL
CREATE TABLE IF NOT EXISTS votes (
  id TEXT PRIMARY KEY,
  costume TEXT NOT NULL,
  email TEXT,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at);
CREATE INDEX IF NOT EXISTS idx_votes_costume ON votes(costume);

-- Insert sample data
INSERT INTO votes (id, costume, email, comment, created_at) VALUES
('1758024968849', 'イメージカット（4）', 'test@gmail.com', 'test', '2025-09-16T12:16:08.849Z'),
('1758074936117', 'イメージカット（1）', 'test@test.com', 'test comment', '2025-09-17T02:08:56.117Z'),
('1758075220566', 'イメージカット（2）', '2@test.com', 'test', '2025-09-17T02:13:40.566Z'),
('1758075264023', 'イメージカット（1）', 'test@example.com', 'test comment', '2025-09-17T02:14:24.023Z'),
('1758081251873', 'イメージカット（1）', 'test@test.com', 'test', '2025-09-17T03:54:11.873Z'),
('1759116976028', 'イメージカット（1）', '2@test.com', 'test', '2025-09-29T03:36:16.028Z'),
('1759117489998', 'イメージカット（1）', 'test@example.com', 'First test vote', '2025-09-29T03:44:49.998Z'),
('1759117496509', 'イメージカット（2）', 'test@example.com', 'Second test vote', '2025-09-29T03:44:56.509Z')
ON CONFLICT (id) DO NOTHING;`;

  return NextResponse.json({
    message: 'Supabase votes table setup SQL',
    sql: createTableSQL,
    instructions: [
      '1. Go to your Supabase project dashboard',
      '2. Navigate to SQL Editor',
      '3. Copy and paste the provided SQL',
      '4. Execute the SQL to create the table and insert sample data',
      '5. Test the voting system again'
    ]
  });
}