'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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

export default function NewsArticlePage() {
  const { slug } = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch('/api/news');
        const allNews = await response.json();
        
        const foundArticle = allNews.find((item: NewsItem) => 
          item.slug === slug || item.id === slug
        );
        
        if (foundArticle) {
          setArticle(foundArticle);
          // Get related articles (exclude current article)
          const related = allNews.filter((item: NewsItem) => item.id !== foundArticle.id).slice(0, 3);
          setRelatedNews(related);
        } else {
          // Article not found, redirect to news page
          router.push('/news');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        router.push('/news');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">記事が見つかりません</h1>
            <button
              onClick={() => router.push('/news')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              ニュース一覧に戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <article className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/news')}
              className="inline-flex items-center text-slate-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              ニュース一覧に戻る
            </button>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="text-slate-400 text-sm font-mono tracking-wider mb-2 md:mb-0">
                {new Date(article.date).toLocaleDateString('ja-JP')}
              </div>
              <div className="text-slate-500 text-sm">
                by {article.author}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              {article.title}
            </h1>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-8">
              <img 
                src={article.featuredImage.startsWith('/') ? article.featuredImage : article.featuredImage} 
                alt={article.title}
                className="w-full h-80 md:h-96 object-cover rounded-xl border border-white/10"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          )}

          {/* Video Embed */}
          {article.videoUrl && (
            <div className="mb-8">
              <div className="aspect-video bg-slate-800 rounded-xl border border-white/10 overflow-hidden">
                {article.videoUrl.includes('youtube.com') || article.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={article.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    allowFullScreen
                    title={article.title}
                  />
                ) : (
                  <video 
                    src={article.videoUrl} 
                    controls 
                    className="w-full h-full"
                    title={article.title}
                  />
                )}
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-8 [&_a]:text-blue-400 [&_a:hover]:text-blue-300 [&_a]:underline [&_p]:text-slate-300 [&_p]:leading-relaxed [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_strong]:text-white [&_em]:text-slate-200 [&_blockquote]:border-l-blue-400 [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:text-slate-300 [&_ul]:text-slate-300 [&_ol]:text-slate-300 [&_li]:text-slate-300">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : '_self'}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                    {...props}
                  >
                    {children}
                  </a>
                ),
                p: ({ children }) => (
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-white mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold text-white mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold text-white mt-4 mb-2">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-l-blue-400 pl-4 text-slate-300 italic my-4">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="text-slate-300 list-disc list-inside mb-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="text-slate-300 list-decimal list-inside mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-slate-300 mb-1">
                    {children}
                  </li>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-slate-800 text-blue-300 px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-slate-800 text-blue-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-slate-800 text-blue-300 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* External Link */}
          {article.externalLink && (
            <div className="mb-12 p-6 bg-slate-900 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white">関連リンク</h3>
              <a 
                href={article.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-medium"
              >
                <span>{article.linkText || '詳細を見る'}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}

          {/* Related Articles */}
          {relatedNews.length > 0 && (
            <section className="border-t border-white/10 pt-12">
              <h2 className="text-2xl font-bold mb-8 text-white">関連記事</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <article key={item.id} className="group">
                    <div 
                      className="glass-morphism p-6 rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer h-full"
                      onClick={() => router.push(`/news/${item.slug || item.id}`)}
                    >
                      {item.featuredImage && (
                        <div className="mb-4">
                          <img 
                            src={item.featuredImage.startsWith('/') ? item.featuredImage : item.featuredImage} 
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-lg border border-white/10"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      )}
                      
                      <div className="text-slate-400 text-xs font-mono mb-2">
                        {new Date(item.date).toLocaleDateString('ja-JP')}
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-white group-hover:text-slate-300 transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                        {item.content}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      
      <Footer />
    </div>
  );
}