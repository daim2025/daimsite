import emailjs from '@emailjs/browser';

// EmailJS設定
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

// EmailJS初期化
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

// メール送信関数
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    // EmailJS初期化
    initEmailJS();

    // メール送信
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        to_name: 'DAIM Team',
        to_email: 'info@discoverfeed.net', // 主要な宛先
        cc_email: 'koba@discoverfeed.net', // CC先
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || '件名なし',
        message: formData.message,
        reply_to: formData.email,
        // 現在時刻を追加
        sent_at: new Date().toLocaleString('ja-JP'),
      }
    );

    return {
      success: true,
      messageId: response.text,
      message: 'メールが正常に送信されました。'
    };
  } catch (error) {
    console.error('EmailJS送信エラー:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'メール送信に失敗しました。',
      message: 'メール送信に失敗しました。後でもう一度お試しください。'
    };
  }
};

// 投票メール送信関数
export const sendVoteEmail = async (voteData: {
  costume: string;
  email?: string;
  comment?: string;
}) => {
  try {
    // EmailJS初期化
    initEmailJS();

    // 投票メール送信
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        to_name: 'DAIM Team',
        to_email: 'info@discoverfeed.net', // 主要な宛先
        cc_email: 'koba@discoverfeed.net, akioiwaki@gmail.com', // CC先（複数）
        from_name: 'ぽにょ皇子投票システム',
        from_email: voteData.email || 'anonymous@vote.daim.site',
        subject: '🗳️ ぽにょ皇子AI動画 - 新しい投票が届きました',
        message: `
🗳️ **新しい投票が届きました**

👗 **選択されたコスプレ**: ${voteData.costume}
📧 **メールアドレス**: ${voteData.email || 'anonymous'}
💬 **コメント**: ${voteData.comment || 'なし'}
📅 **投票日時**: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}

---
DAIM AI ムービー生成 - 衣装選び投票システム
        `,
        reply_to: voteData.email || 'noreply@daim.site',
        // 現在時刻を追加
        sent_at: new Date().toLocaleString('ja-JP'),
      }
    );

    return {
      success: true,
      messageId: response.text,
      message: '投票が正常に送信されました。'
    };
  } catch (error) {
    console.error('EmailJS投票送信エラー:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '投票送信に失敗しました。',
      message: '投票送信に失敗しました。後でもう一度お試しください。'
    };
  }
};

// 環境変数チェック関数
export const checkEmailJSConfig = () => {
  const config = EMAILJS_CONFIG;
  const missing = [];
  
  if (config.serviceId === 'your_service_id') missing.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
  if (config.templateId === 'your_template_id') missing.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
  if (config.publicKey === 'your_public_key') missing.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
  
  if (missing.length > 0) {
    console.warn('EmailJS設定が不完全です。以下の環境変数を設定してください:', missing);
    return false;
  }
  
  return true;
};