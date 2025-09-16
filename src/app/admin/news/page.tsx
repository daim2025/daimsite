'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    content: '', 
    author: 'DAIM Team', 
    date: '',
    slug: '',
    featuredImage: '',
    videoUrl: '',
    externalLink: '',
    linkText: ''
  });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingItem ? `/api/news/${editingItem.id}` : '/api/news';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ 
          title: '', 
          content: '', 
          author: 'DAIM Team', 
          date: '',
          slug: '',
          featuredImage: '',
          videoUrl: '',
          externalLink: '',
          linkText: ''
        });
        setEditingItem(null);
        setShowForm(false);
        fetchNews();
      } else {
        console.error('Error saving article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title, 
      content: item.content, 
      author: item.author, 
      date: item.date,
      slug: item.slug || '',
      featuredImage: item.featuredImage || '',
      videoUrl: item.videoUrl || '',
      externalLink: item.externalLink || '',
      linkText: item.linkText || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('この記事を削除しますか？')) return;
    
    try {
      const response = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const resetForm = () => {
    setFormData({ 
      title: '', 
      content: '', 
      author: 'DAIM Team', 
      date: '',
      slug: '',
      featuredImage: '',
      videoUrl: '',
      externalLink: '',
      linkText: ''
    });
    setEditingItem(null);
    setShowForm(false);
  };

  // ドラッグ&ドロップ機能
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newNews = [...news];
    const draggedItem = newNews[draggedIndex];
    
    // 配列から要素を削除
    newNews.splice(draggedIndex, 1);
    // 新しい位置に挿入
    newNews.splice(dropIndex, 0, draggedItem);
    
    setNews(newNews);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">ニュース管理</h1>
            <p className="text-slate-400 mt-2">記事の作成・編集・削除を行えます</p>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              管理画面に戻る
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              新しい記事を作成
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                {editingItem ? '記事を編集' : '新しい記事を作成'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    タイトル
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    著者
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    日付
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL識別子（slug）
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase() })}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="article-title-2024"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    記事のURL用識別子（英数字とハイフンのみ、空の場合は自動生成）
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    内容（Markdown対応）
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none font-mono text-sm"
                    required
                    placeholder="記事の内容を入力してください。

Markdown記法が使用できます：
- リンク: [リンク名](https://example.com)
- 太字: **太字**
- 斜体: *斜体*
- 見出し: # 見出し1, ## 見出し2
- リスト: - アイテム1
- 引用: > 引用文
- コード: `コード` または ```コードブロック```"
                  />
                  <div className="mt-2 text-xs text-slate-400">
                    <div className="mb-2 font-medium">Markdown記法の例：</div>
                    <div className="bg-slate-800 p-2 rounded font-mono">
                      <div>[DAIM公式サイト](https://daim.vercel.app)</div>
                      <div>**重要なお知らせ** や *強調したい点*</div>
                      <div>## 見出し</div>
                      <div>- リスト項目1</div>
                      <div>- リスト項目2</div>
                    </div>
                  </div>
                </div>

                {/* メディア・リンクセクション */}
                <div className="border-t border-slate-600 pt-6">
                  <h4 className="text-lg font-medium text-slate-200 mb-4">メディア・リンク（オプション）</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        アイキャッチ画像URL
                      </label>
                      <input
                        type="text"
                        value={formData.featuredImage}
                        onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                        className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="https://example.com/image.jpg または /images/example.jpg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        動画URL（YouTube等）
                      </label>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        外部リンクURL
                      </label>
                      <input
                        type="url"
                        value={formData.externalLink}
                        onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                        className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        リンクテキスト
                      </label>
                      <input
                        type="text"
                        value={formData.linkText}
                        onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                        className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="詳細はこちら"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {editingItem ? '更新' : '作成'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* News List */}
        <div className="space-y-4">
          {news.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              記事がありません
            </div>
          ) : (
            news.map((item, index) => (
              <div 
                key={item.id} 
                className={`bg-slate-900 rounded-lg p-6 border border-slate-700 cursor-move transition-all duration-200 ${
                  draggedIndex === index ? 'opacity-50 scale-95' : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-slate-500 text-sm font-mono mt-1">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">
                        {item.date} | {item.author}
                      </p>
                      <p className="text-slate-300 line-clamp-3">
                        {item.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="text-slate-500 text-xs">
                      ドラッグで移動
                    </div>
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}