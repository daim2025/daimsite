'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
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
      setMessage('必須項目をすべて入力してください');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // お問い合わせAPIエンドポイントを呼び出し
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('お問い合わせを送信しました。確認後、担当者よりご連絡いたします。');
        setMessageType('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // フォームをクリア
      } else {
        setMessage(data.error || '送信に失敗しました');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setMessage('ネットワークエラーが発生しました。再度お試しください。');
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
          
          {/* Floating Particles Effect */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-slate-400 rounded-full animate-ping"
                style={{
                  left: `${(i * 6.5) % 100}%`,
                  top: `${(i * 7.2) % 100}%`,
                  animationDelay: `${(i * 0.2) % 4}s`,
                  animationDuration: `${3 + (i * 0.1) % 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-200 mb-4 drop-shadow-2xl">📧</div>
            <p className="section-subtitle text-gray-200 text-lg mb-2 font-medium tracking-wider">Contact Us</p>
            <h1 className="section-title text-4xl md:text-6xl font-display font-semibold mb-8 text-white drop-shadow-2xl">
              <span className="gradient-text">
                お問い合わせ
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
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-light mb-8 text-slate-200">Get in Touch</h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  DAIMに関するご質問、ご相談、お仕事のご依頼など、<br />
                  お気軽にお問い合わせください。
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-200 mb-2">Email</h3>
                      <p className="text-gray-400">hello@daim.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-200 mb-2">営業時間</h3>
                      <p className="text-gray-400">平日 9:00 - 18:00 JST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-200 mb-2">返信時間</h3>
                      <p className="text-gray-400">24時間以内にご返信いたします</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-light mb-6 text-slate-200">メッセージを送信</h3>
                
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
                        お名前 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="山田太郎"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                        メールアドレス <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-200 mb-2">
                      件名
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isLoading}
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
                      メッセージ <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      rows={6}
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
                        送信中...
                      </div>
                    ) : (
                      '送信する'
                    )}
                  </button>
                  
                  {/* プライバシーポリシー */}
                  <p className="text-xs text-gray-400 text-center">
                    送信いただいた情報は、お問い合わせ対応の目的でのみ使用され、第三者に提供されることはありません。
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
