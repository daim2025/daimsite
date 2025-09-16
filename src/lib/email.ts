import nodemailer from 'nodemailer';

// メール送信設定
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ウェルカムメールテンプレート
export const sendWelcomeEmail = async (email: string, unsubscribeToken: string) => {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?token=${unsubscribeToken}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>DAIM Studio - 登録完了</title>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e293b, #0f172a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { opacity: 0.9; }
        .unsubscribe { font-size: 12px; color: #666; text-align: center; margin-top: 30px; }
        .unsubscribe a { color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">DAIM Studio</div>
          <div class="subtitle">Intelligent Music Platform</div>
        </div>
        <div class="content">
          <h2>🎉 登録完了</h2>
          <p>DAIM Studio のリリース通知にご登録いただき、ありがとうございます。</p>
          <p>最先端のAI技術を駆使した次世代DJスタジオの開発進捗や、リリース情報をお送りいたします。</p>
          
          <h3>🚀 予定機能</h3>
          <ul>
            <li>AI Track Analysis - 楽曲の自動分析</li>
            <li>Smart Mixing - AIによる最適なミックス提案</li>
            <li>Real-time Effects - リアルタイムエフェクト</li>
          </ul>
          
          <p>開発進捗: <strong>75% 完了</strong></p>
          
          <p>今後ともDAIMをよろしくお願いいたします。</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          
          <p><strong>DAIM開発チーム</strong></p>
        </div>
        <div class="unsubscribe">
          配信停止をご希望の場合は<a href="${unsubscribeUrl}">こちら</a>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"DAIM Studio" <${process.env.SMTP_USER}>`,
    to: email,
    subject: '🎵 DAIM Studio - 登録完了のお知らせ',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

// リリース通知メールテンプレート
export const sendReleaseNotification = async (email: string, unsubscribeToken: string) => {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?token=${unsubscribeToken}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>DAIM Studio - リリース通知</title>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { opacity: 0.9; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .unsubscribe { font-size: 12px; color: #666; text-align: center; margin-top: 30px; }
        .unsubscribe a { color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎉 DAIM Studio</div>
          <div class="subtitle">ついにリリース！</div>
        </div>
        <div class="content">
          <h2>🚀 DAIM Studio がリリースされました！</h2>
          <p>お待たせいたしました。DAIM Studio が正式にリリースされました。</p>
          
          <p>最先端のAI技術を駆使した次世代DJスタジオで、今すぐ音楽制作を始めましょう。</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/studio" class="cta-button">
            🎧 今すぐ始める
          </a>
          
          <h3>✨ 新機能</h3>
          <ul>
            <li>AI Track Analysis - 楽曲の自動分析とBPMマッチング</li>
            <li>Smart Mixing - AIによる最適なトランジション提案</li>
            <li>Real-time Effects - リアルタイムエフェクト適用</li>
            <li>Intelligent Composition - AI音楽生成機能</li>
          </ul>
          
          <p>ご利用をお待ちしております！</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          
          <p><strong>DAIM開発チーム</strong></p>
        </div>
        <div class="unsubscribe">
          配信停止をご希望の場合は<a href="${unsubscribeUrl}">こちら</a>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"DAIM Studio" <${process.env.SMTP_USER}>`,
    to: email,
    subject: '🎉 DAIM Studio - 正式リリースのお知らせ',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Release notification sent to ${email}`);
  } catch (error) {
    console.error('Error sending release notification:', error);
    throw error;
  }
};

// 一括メール送信
export const sendBulkEmails = async (
  subscribers: Array<{ email: string; unsubscribe_token: string }>,
  type: 'welcome' | 'release'
) => {
  const results = [];
  
  for (const subscriber of subscribers) {
    try {
      if (type === 'welcome') {
        await sendWelcomeEmail(subscriber.email, subscriber.unsubscribe_token);
      } else {
        await sendReleaseNotification(subscriber.email, subscriber.unsubscribe_token);
      }
      results.push({ email: subscriber.email, status: 'sent' });
    } catch (error) {
      results.push({ email: subscriber.email, status: 'failed', error });
    }
  }
  
  return results;
};
