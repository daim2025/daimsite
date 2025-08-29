import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// クライアントサイド用
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// サーバーサイド用（管理者権限）
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// データベース型定義
export interface Subscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
  updated_at: string;
  unsubscribe_token: string;
}
