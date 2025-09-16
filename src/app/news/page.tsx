'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  slug: string;
  featuredImage?: string;
  videoUrl?: string;
  externalLink?: string;
  linkText?: string;
}

export default function NewsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to empty array on error
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('メールアドレスを入力してください');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'メールリストに登録されました！');
        setMessageType('success');
        setEmail('');
        setTimeout(() => {
          setShowNewsletterModal(false);
          setMessage('');
          setMessageType('');
        }, 2000);
      } else {
        setMessage(data.error || '登録に失敗しました');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setMessage('ネットワークエラーが発生しました');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-slate-400 text-sm font-bold tracking-wider mb-4 uppercase">Latest Updates</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              <span className="text-slate-400">News</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              DAIMプラットフォームの最新情報、アップデート、コラボレーションプロジェクトをお届けします
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {news.map((item) => (
                <article key={item.id} className="group cursor-pointer" onClick={() => router.push(`/news/${item.slug || item.id}`)}>
                  <div className="glass-morphism p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="text-slate-400 text-sm font-mono tracking-wider mb-2 md:mb-0">
                        {new Date(item.date).toLocaleDateString('ja-JP')}
                      </div>
                      <div className="text-slate-500 text-sm">
                        by {item.author}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-slate-300 transition-colors duration-300">
                      {item.title}
                    </h2>
                    
                    {/* アイキャッチ画像 */}
                    {item.featuredImage && (
                      <div className="mb-6">
                        <img 
                          src={item.featuredImage.startsWith('/') ? item.featuredImage : item.featuredImage} 
                          alt={item.title}
                          className="w-full h-64 object-cover rounded-lg border border-white/10"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    )}

                    {/* 動画埋め込み */}
                    {item.videoUrl && (
                      <div className="mb-6">
                        <div className="aspect-video bg-slate-800 rounded-lg border border-white/10 overflow-hidden">
                          {item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be') ? (
                            <iframe
                              src={item.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                              className="w-full h-full"
                              allowFullScreen
                              title={item.title}
                            />
                          ) : (
                            <video 
                              src={item.videoUrl} 
                              controls 
                              className="w-full h-full"
                              title={item.title}
                            />
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-slate-300 text-lg leading-relaxed mb-6 prose-invert [&_a]:text-blue-400 [&_a:hover]:text-blue-300 [&_a]:underline [&_p]:text-slate-300 [&_strong]:text-white [&_em]:text-slate-200">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children, ...props }) => (
                            <a
                              href={href}
                              target={href?.startsWith('http') ? '_blank' : '_self'}
                              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                              {...props}
                            >
                              {children}
                            </a>
                          ),
                          p: ({ children }) => (
                            <p className="text-slate-300 leading-relaxed">
                              {children}
                            </p>
                          ),
                        }}
                      >
                        {item.content.length > 200 ? `${item.content.substring(0, 200)}...` : item.content}
                      </ReactMarkdown>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/news/${item.slug || item.id}`);
                        }}
                        className="inline-flex items-center text-slate-400 hover:text-white transition-colors duration-300 font-medium"
                      >
                        <span>続きを読む</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {/* 外部リンク */}
                      {item.externalLink && (
                        <a 
                          href={item.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-medium"
                        >
                          <span>{item.linkText || '詳細を見る'}</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              最新のアップデートやプロジェクト情報をいち早くお届けします
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleContactClick}
                className="btn-luxury px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-all duration-300"
              >
                お問い合わせ
              </button>
              <button 
                onClick={() => setShowNewsletterModal(true)}
                className="btn-luxury px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors duration-300"
              >
                メーリングリスト登録
              </button>
            </div>
          </div>
        </div>
      </section>
      </main>
      
      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md border border-white/10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">メーリングリスト登録</h3>
              <p className="text-slate-300">最新情報をお届けします</p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              {message && (
                <div className={`p-3 rounded-lg text-center ${
                  messageType === 'success' 
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                  {message}
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewsletterModal(false);
                    setMessage('');
                    setMessageType('');
                    setEmail('');
                  }}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    '登録'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}