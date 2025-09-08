import { NextRequest, NextResponse } from 'next/server';
import { subscriberStore, type Subscriber } from '@/lib/kv-store';
import { emailService } from '@/lib/email-service';

// Admin authentication
function checkAdminAuth(adminKey: string | null): boolean {
  const validKey = process.env.ADMIN_KEY || 'DAIM_TEST_ADMIN_KEY_2024';
  return adminKey === validKey;
}

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
    const subscribers = await subscriberStore.getAll();
    const activeSubscribers = subscribers.filter(sub => sub.status === 'active');

    // 実際のメール送信を実装
    const emails = activeSubscribers.map(sub => sub.email);
    const results = await emailService.sendBulkEmail(emails, type);

    const message = `${type === 'welcome' ? 'ウェルカム' : 'リリース通知'}メールを送信しました: 成功 ${results.sent}件, 失敗 ${results.failed}件`;
    
    console.log(`Email sent - Type: ${type}, Success: ${results.sent}, Failed: ${results.failed}`);

    return NextResponse.json({
      success: true,
      message,
      count: activeSubscribers.length,
      results,
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