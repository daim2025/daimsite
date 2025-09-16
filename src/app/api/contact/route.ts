import { NextRequest, NextResponse } from 'next/server';
import { subscriberStore } from '@/lib/kv-store';

// メールアドレスバリデーション
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目（お名前、メールアドレス、メッセージ）をすべて入力してください' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // Contact形式でsubscriberStoreに保存
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedName = name.trim();
    const contactMessage = `件名: ${subject?.trim() || '件名なし'}\n\n${message.trim()}`;
    
    // subscriberStoreに追加（name, messageも含める）
    const newContact = await subscriberStore.add(normalizedEmail, normalizedName, contactMessage);
    
    console.log('New contact received:', {
      id: newContact.id,
      name: newContact.name,
      email: newContact.email,
      subject: subject?.trim() || '件名なし',
      createdAt: newContact.createdAt,
      note: 'Contact saved to KV store'
    });

    return NextResponse.json(
      { 
        message: 'お問い合わせを受け付けました。確認後、担当者よりご連絡いたします。',
        id: newContact.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
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

    // お問い合わせ一覧を取得（KV storeから）
    const subscribers = await subscriberStore.getAll();
    const contacts = subscribers.filter(sub => sub.message && sub.message.trim() !== '');
    
    const sortedContacts = contacts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(
      { 
        contacts: sortedContacts,
        count: contacts.length,
        newCount: contacts.filter(c => c.status === 'active').length,
        message: 'お問い合わせ一覧'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error getting contacts:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
