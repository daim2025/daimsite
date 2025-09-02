'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

interface Subscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
  updated_at: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');
  const [emailSending, setEmailSending] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscribers();
    }
  }, [isAuthenticated, pagination.page, filter]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const response = await fetch('/api/newsletter', {
        headers: {
          'x-admin-key': adminKey
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin-key', adminKey);
        }
      } else {
        setAuthError('無効な管理者キーです');
      }
    } catch (error) {
      setAuthError('認証エラーが発生しました');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('admin-key');
      if (savedKey) {
        setAdminKey(savedKey);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: filter
      });

      const response = await fetch(`/api/admin/subscribers?${params}`, {
        headers: {
          'x-admin-key': adminKey
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers);
        setPagination(data.pagination);
      } else {
        console.error('Failed to fetch subscribers');
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendBulkEmail = async (type: 'welcome' | 'release') => {
    setEmailSending(true);
    setEmailMessage('');

    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ type })
      });

      const data = await response.json();
      setEmailMessage(data.message);
    } catch (error) {
      setEmailMessage('メール送信でエラーが発生しました');
    } finally {
      setEmailSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <Navigation />
        
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <h1 className="text-2xl font-light mb-6 text-center">管理者ログイン</h1>
                
                <form onSubmit={handleAuth} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      placeholder="管理者キー (テスト用: DAIM_TEST_ADMIN_KEY_2024)"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  {authError && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-sm">
                      {authError}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  >
                    ログイン
                  </button>
                </form>
                
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    <strong>テスト用管理者キー:</strong><br />
                    DAIM_TEST_ADMIN_KEY_2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navigation />
      
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-light mb-4">管理者ダッシュボード</h1>
              <p className="text-gray-300">メール登録者の管理</p>
            </div>

            {/* 統計情報 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">総登録者数</h3>
                <div className="text-3xl font-light text-blue-400">{pagination.total}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">アクティブ</h3>
                <div className="text-3xl font-light text-green-400">
                  {subscribers.filter(s => s.status === 'active').length}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">配信停止</h3>
                <div className="text-3xl font-light text-red-400">
                  {subscribers.filter(s => s.status === 'unsubscribed').length}
                </div>
              </div>
            </div>

            {/* メール送信 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-medium mb-4">一括メール送信</h3>
              
              {emailMessage && (
                <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg text-sm">
                  {emailMessage}
                </div>
              )}
              
              <div className="flex gap-4">
                <button
                  onClick={() => sendBulkEmail('welcome')}
                  disabled={emailSending}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                >
                  {emailSending ? '送信中...' : 'ウェルカムメール'}
                </button>
                <button
                  onClick={() => sendBulkEmail('release')}
                  disabled={emailSending}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                >
                  {emailSending ? '送信中...' : 'リリース通知'}
                </button>
              </div>
            </div>

            {/* フィルター */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-8">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === 'all' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  すべて
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === 'active' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  アクティブ
                </button>
                <button
                  onClick={() => setFilter('unsubscribed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === 'unsubscribed' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  配信停止
                </button>
              </div>
            </div>

            {/* 登録者一覧 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-medium">登録者一覧</h3>
              </div>

              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>読み込み中...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">メールアドレス</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">状態</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">登録日</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="hover:bg-white/5">
                            <td className="px-6 py-4 text-sm text-white">{subscriber.email}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                subscriber.status === 'active'
                                  ? 'bg-green-500/20 text-green-300'
                                  : 'bg-red-500/20 text-red-300'
                              }`}>
                                {subscriber.status === 'active' ? 'アクティブ' : '配信停止'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              {formatDate(subscriber.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {subscribers.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      登録者がいません
                    </div>
                  )}

                  {/* ページネーション */}
                  {pagination.totalPages > 1 && (
                    <div className="p-6 border-t border-white/10 flex justify-between items-center">
                      <div className="text-sm text-gray-300">
                        {pagination.total}件中 {((pagination.page - 1) * pagination.limit) + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)}件を表示
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                          disabled={pagination.page === 1}
                          className="px-3 py-1 bg-white/10 text-gray-300 rounded disabled:opacity-50"
                        >
                          前へ
                        </button>
                        <button
                          onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                          disabled={pagination.page === pagination.totalPages}
                          className="px-3 py-1 bg-white/10 text-gray-300 rounded disabled:opacity-50"
                        >
                          次へ
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
