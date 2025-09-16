'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sendContactEmail } from '@/lib/emailjs';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setMessage(t('contact.form.required'));
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      let emailSent = false;
      let apiSaved = false;

      // EmailJSで直接メール送信を試行
      try {
        const emailResult = await sendContactEmail(formData);
        if (emailResult.success) {
          emailSent = true;
        } else {
          console.warn('EmailJS送信失敗:', emailResult.message);
        }
      } catch (emailError) {
        console.warn('EmailJS送信エラー:', emailError);
      }

      // APIエンドポイントにデータを保存
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          apiSaved = true;
        } else {
          console.warn('API保存失敗:', await response.text());
        }
      } catch (apiError) {
        console.warn('API保存エラー:', apiError);
      }

      // 結果に基づいてメッセージを表示
      if (emailSent && apiSaved) {
        setMessage('お問い合わせを送信しました。確認後、担当者よりご連絡いたします。');
        setMessageType('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (apiSaved) {
        setMessage('お問い合わせを受け付けました。メール通知に遅延が生じる場合がありますが、確認後にご連絡いたします。');
        setMessageType('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setMessage('送信中に問題が発生しました。しばらく時間をおいて再度お試しください。');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setMessage('送信中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-luxury relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-blue-500/5"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
          

        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="section-subtitle text-gray-200 text-lg mb-2 font-medium tracking-wider">{t('contact.subtitle')}</p>
            <h1 className="section-title text-4xl md:text-6xl font-display font-semibold mb-8 text-white drop-shadow-2xl">
              <span className="gradient-text">
                {t('contact.title')}
              </span>
            </h1>
            
            {/* Glowing Accent Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-slate-400 via-blue-400 to-slate-600 mx-auto rounded-full shadow-lg shadow-slate-400/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-light mb-6 text-slate-200 text-center">{t('contact.form.title')}</h3>
                
                {/* メッセージ表示 */}
                {message && (
                  <div className={`mb-6 p-4 rounded-lg border ${
                    messageType === 'success' 
                      ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                      : 'bg-red-500/20 border-red-500/30 text-red-300'
                  }`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                        {t('contact.form.name')} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="ブライアン・イーノ"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                        {t('contact.form.email')} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-200 mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isLoading}
                      autoComplete="off"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">件名を選択してください</option>
                      <option value="general">一般的なお問い合わせ</option>
                      <option value="business">ビジネス・パートナーシップ</option>
                      <option value="technical">技術的なサポート</option>
                      <option value="media">メディア・取材</option>
                      <option value="other">その他</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
                      {t('contact.form.message')} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      rows={6}
                      autoComplete="off"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                      placeholder="お問い合わせ内容をご記入ください..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-slate-500 to-blue-500 text-white font-semibold rounded-lg hover:from-slate-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t('contact.form.sending')}
                      </div>
                    ) : (
                      t('contact.form.submit')
                    )}
                  </button>
                  
                  {/* プライバシーポリシー */}
                  <p className="text-xs text-gray-400 text-center">
                    {t('contact.form.privacy')}
                  </p>
                </form>
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
