import nodemailer from 'nodemailer';

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// Email templates
export const emailTemplates = {
  welcome: {
    subject: 'DAIMへようこそ！ 🎵',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff;">
        <div style="padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);">
          <h1 style="color: #fff; font-size: 28px; margin-bottom: 10px;">DAIMへようこそ！</h1>
          <p style="color: #a0a0a0; font-size: 16px;">Decentralized AI Music Platform</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #fff; font-size: 22px; margin-bottom: 20px;">🎵 音楽×AI×クリエイター×未来</h2>
          
          <p style="color: #d0d0d0; line-height: 1.6; margin-bottom: 20px;">
            DAIMプラットフォームへの登録、ありがとうございます！<br>
            AIと人間の創造性が融合する、新しい音楽制作の世界へようこそ。
          </p>
          
          <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #fff; font-size: 18px; margin-bottom: 15px;">✨ DAIMで体験できること</h3>
            <ul style="color: #d0d0d0; line-height: 1.8; padding-left: 20px;">
              <li>AI支援による革新的な音楽制作</li>
              <li>グローバル音楽配信プラットフォーム</li>
              <li>アーティストとのコラボレーション</li>
              <li>収益化とライセンス管理</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://daim.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #fff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold;">
              プラットフォームを探索する
            </a>
          </div>
          
          <p style="color: #a0a0a0; font-size: 14px; text-align: center;">
            最新情報やアップデートは、このメールでお届けします。
          </p>
        </div>
        
        <div style="background: #111; padding: 20px; text-align: center; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            © 2024 DAIM Platform. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `
DAIMへようこそ！

音楽×AI×クリエイター×未来

DAIMプラットフォームへの登録、ありがとうございます！
AIと人間の創造性が融合する、新しい音楽制作の世界へようこそ。

DAIMで体験できること：
・AI支援による革新的な音楽制作
・グローバル音楽配信プラットフォーム
・アーティストとのコラボレーション
・収益化とライセンス管理

プラットフォームはこちら: https://daim.vercel.app

最新情報やアップデートは、このメールでお届けします。

© 2024 DAIM Platform. All rights reserved.
    `
  },

  release: {
    subject: '🚀 DAIM最新リリース - 新機能をお試しください！',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff;">
        <div style="padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);">
          <h1 style="color: #fff; font-size: 28px; margin-bottom: 10px;">🚀 新機能リリース！</h1>
          <p style="color: #e0e0e0; font-size: 16px;">DAIM Platform Update</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #fff; font-size: 22px; margin-bottom: 20px;">最新のアップデートをお届け！</h2>
          
          <p style="color: #d0d0d0; line-height: 1.6; margin-bottom: 20px;">
            DAIMプラットフォームに新しい機能が追加されました。<br>
            より直感的で パワフルな音楽制作体験をお楽しみください。
          </p>
          
          <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #7c3aed;">
            <h3 style="color: #fff; font-size: 18px; margin-bottom: 15px;">🎵 新機能・改善点</h3>
            <ul style="color: #d0d0d0; line-height: 1.8; padding-left: 20px;">
              <li>ニュース・アップデート機能の追加</li>
              <li>メーリングリスト登録システム</li>
              <li>管理者ダッシュボードの強化</li>
              <li>ユーザーインターフェースの改善</li>
              <li>パフォーマンスの最適化</li>
            </ul>
          </div>
          
          <div style="background: #0f1419; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #4ade80; font-size: 18px; margin-bottom: 15px;">🎯 今後の予定</h3>
            <p style="color: #d0d0d0; line-height: 1.6;">
              • AI音楽生成機能のベータ版<br>
              • アーティストコラボレーション機能<br>
              • モバイルアプリのリリース
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://daim.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: #fff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; margin-right: 10px;">
              新機能を体験する
            </a>
            <a href="https://daim.vercel.app/news" style="display: inline-block; background: #1a1a1a; color: #fff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; border: 1px solid #333;">
              最新ニュースを見る
            </a>
          </div>
        </div>
        
        <div style="background: #111; padding: 20px; text-align: center; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            配信停止をご希望の場合は、こちらからお手続きください。<br>
            © 2024 DAIM Platform. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `
🚀 DAIM最新リリース

DAIMプラットフォームに新しい機能が追加されました。
より直感的でパワフルな音楽制作体験をお楽しみください。

新機能・改善点：
・ニュース・アップデート機能の追加
・メーリングリスト登録システム
・管理者ダッシュボードの強化
・ユーザーインターフェースの改善
・パフォーマンスの最適化

今後の予定：
• AI音楽生成機能のベータ版
• アーティストコラボレーション機能
• モバイルアプリのリリース

新機能を体験: https://daim.vercel.app
最新ニュース: https://daim.vercel.app/news

© 2024 DAIM Platform. All rights reserved.
    `
  }
};

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter based on environment
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Production SMTP configuration
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development/testing mode - log to console
      this.transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true
      });
    }
  }

  async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@daim.vercel.app',
        to,
        subject: template.subject,
        text: template.text,
        html: template.html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      // In development, log the email content
      if (!process.env.SMTP_HOST) {
        console.log('📧 Email would be sent to:', to);
        console.log('📧 Subject:', template.subject);
        console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(result));
      }
      
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string): Promise<boolean> {
    return this.sendEmail(email, emailTemplates.welcome);
  }

  async sendReleaseNotification(email: string): Promise<boolean> {
    return this.sendEmail(email, emailTemplates.release);
  }

  async sendBulkEmail(emails: string[], template: 'welcome' | 'release'): Promise<{ sent: number; failed: number }> {
    const results = { sent: 0, failed: 0 };
    const emailTemplate = emailTemplates[template];
    
    // Send emails in batches to avoid overwhelming the server
    const batchSize = 5;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const promises = batch.map(async (email) => {
        try {
          await this.sendEmail(email, emailTemplate);
          results.sent++;
        } catch (error) {
          console.error(`Failed to send email to ${email}:`, error);
          results.failed++;
        }
      });
      
      await Promise.all(promises);
      
      // Small delay between batches
      if (i + batchSize < emails.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

// Singleton instance
export const emailService = new EmailService();