import { NextRequest, NextResponse } from 'next/server';
// import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: '配信停止トークンが必要です' },
        { status: 400 }
      );
    }

    // 一時的に配信停止機能を無効化（データベース未実装）
    console.log('Unsubscribe request for token:', token);

    return NextResponse.json(
      { 
        message: '配信停止機能は一時的に無効化されています（データベース未実装）',
        email: 'unknown@example.com'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: '配信停止トークンが必要です' },
        { status: 400 }
      );
    }

    // 一時的に配信停止確認機能を無効化（データベース未実装）
    console.log('Unsubscribe check for token:', token);

    return NextResponse.json(
      { 
        email: 'unknown@example.com',
        status: 'active'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe check error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
