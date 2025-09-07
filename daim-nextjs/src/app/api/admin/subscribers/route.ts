import { NextRequest, NextResponse } from 'next/server';
import { 
  readSubscribers, 
  writeSubscribers, 
  checkAdminAuth,
  type Subscriber 
} from '@/lib/subscribers';

// 登録者一覧取得
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    
    if (!checkAdminAuth(adminKey)) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') || 'all';
    const offset = (page - 1) * limit;

    const allSubscribers = readSubscribers();
    
    let filteredSubscribers = allSubscribers;
    if (status !== 'all') {
      filteredSubscribers = allSubscribers.filter(sub => sub.status === status);
    }

    const total = filteredSubscribers.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedSubscribers = filteredSubscribers.slice(offset, offset + limit);

    return NextResponse.json({
      subscribers: paginatedSubscribers,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// メール送信（簡易実装）
export async function POST(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key');
    
    if (!checkAdminAuth(adminKey)) {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    const { type } = await request.json();
    const subscribers = readSubscribers();
    const activeSubscribers = subscribers.filter(sub => sub.status === 'active');

    // 実際のメール送信はここで実装（現在はログ出力のみ）
    console.log(`Sending ${type} email to ${activeSubscribers.length} subscribers`);
    
    // メール送信のシミュレーション
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      message: `${activeSubscribers.length}件のメールを送信しました`,
      count: activeSubscribers.length,
      type
    });

  } catch (error) {
    console.error('Error sending bulk email:', error);
    return NextResponse.json(
      { error: 'メール送信中にエラーが発生しました' },
      { status: 500 }
    );
  }
}