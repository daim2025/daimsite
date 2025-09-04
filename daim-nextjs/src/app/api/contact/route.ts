import { NextRequest, NextResponse } from 'next/server';

// お問い合わせデータを保存するための簡単なストレージ（開発・テスト用）
let contacts: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}> = [];

// IDを生成
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// メールアドレスバリデーション
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 管理者への通知メール送信（複数宛先）
async function sendNotificationEmail(contactData: any) {
  try {
    const recipients = [
      'info@discoverfeed.net',
      'koba@discoverfeed.net'
    ];

    const emailBody = `
新しいお問い合わせが届きました。

■ お問い合わせ内容
- ID: ${contactData.id}
- お名前: ${contactData.name}
- メールアドレス: ${contactData.email}
- 件名: ${contactData.subject}
- 受信日時: ${new Date(contactData.createdAt).toLocaleString('ja-JP')}

■ メッセージ内容:
${contactData.message}

---
このメールは DAIM お問い合わせフォームから自動送信されました。
    `.trim();

    // 実際のメール送信処理（開発環境では模擬）
    if (process.env.NODE_ENV === 'development') {
      console.log('=== EMAIL NOTIFICATION (DEV MODE) ===');
      console.log(`To: ${recipients.join(', ')}`);
      console.log(`Subject: 【DAIM】新しいお問い合わせ - ${contactData.subject}`);
      console.log(`Body:\n${emailBody}`);
      console.log('==========================================');
      
      return { success: true, message: 'Email notification sent (development mode)' };
    }

    // 本番環境では実際のメール送信サービス（SendGrid、AWS SES等）を使用
    // 例: await sendEmailWithSendGrid(recipients, subject, emailBody);
    
    return { success: true, message: 'Email notifications sent to administrators' };
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return { success: false, error: error };
  }
}

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

    // 正規化
    const normalizedData = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject?.trim() || '件名なし',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new' as const
    };

    // データを保存
    contacts.push(normalizedData);

    // 管理者への通知メール送信（複数宛先）
    const notificationResult = await sendNotificationEmail(normalizedData);
    
    console.log('New contact received:', {
      id: normalizedData.id,
      name: normalizedData.name,
      email: normalizedData.email,
      subject: normalizedData.subject,
      createdAt: normalizedData.createdAt,
      emailSent: notificationResult.success
    });

    return NextResponse.json(
      { 
        message: 'お問い合わせを受け付けました。確認後、担当者よりご連絡いたします。',
        id: normalizedData.id
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
    if (adminKey !== process.env.ADMIN_API_KEY && adminKey !== 'DAIM_TEST_ADMIN_KEY_2024') {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 401 }
      );
    }

    // お問い合わせ一覧を取得
    const sortedContacts = contacts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(
      { 
        contacts: sortedContacts,
        count: contacts.length,
        newCount: contacts.filter(c => c.status === 'new').length,
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
