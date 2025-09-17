'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import React from 'react';

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
  const [votes, setVotes] = useState<any[]>([]);
  const [filteredVotes, setFilteredVotes] = useState<any[]>([]);
  const [voteCounts, setVoteCounts] = useState<any>({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [isVotesLoading, setIsVotesLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [costumeFilter, setCostumeFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscribers();
    }
  }, [isAuthenticated, pagination.page, filter]);

  useEffect(() => {
    if (isAuthenticated && adminKey) {
      fetchVotes();
    }
  }, [isAuthenticated, adminKey]);

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

  const fetchVotes = async () => {
    setIsVotesLoading(true);
    console.log('Fetching votes with admin key:', adminKey ? 'Present' : 'Missing', 'Key:', adminKey);

    try {
      const response = await fetch('/api/vote', {
        method: 'GET',
        headers: {
          'x-admin-key': adminKey
        },
        cache: 'no-cache'
      });

      console.log('Vote fetch response status:', response.status);

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (response.ok) {
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          return;
        }

        console.log('Vote data received:', {
          votesCount: data.votes?.length || 0,
          totalVotes: data.totalVotes,
          voteCounts: data.voteCounts,
          fullData: data
        });

        setVotes(data.votes || []);
        setFilteredVotes(data.votes || []);
        setVoteCounts(data.voteCounts || {});
        setTotalVotes(data.totalVotes || 0);
      } else {
        console.error('Failed to fetch votes:', response.status, responseText);
      }
    } catch (error) {
      console.error('Error fetching votes:', error);
    } finally {
      setIsVotesLoading(false);
    }
  };

  const deleteAllVotes = async () => {
    if (!confirm('⚠️ 全ての投票データを削除しますか？この操作は取り消せません。')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch('/api/vote', {
        method: 'DELETE',
        headers: {
          'x-admin-key': adminKey
        }
      });

      if (response.ok) {
        // データをクリア
        setVotes([]);
        setFilteredVotes([]);
        setVoteCounts({});
        setTotalVotes(0);
        alert('✅ 全ての投票データを削除しました。');
      } else {
        const errorData = await response.json();
        alert(`❌ 削除に失敗しました: ${errorData.error || '不明なエラー'}`);
      }
    } catch (error) {
      console.error('Error deleting votes:', error);
      alert('❌ 削除中にエラーが発生しました。');
    } finally {
      setIsDeleting(false);
    }
  };

  // フィルタリング機能
  useEffect(() => {
    let filtered = [...votes];

    // 月フィルター（優先）
    if (monthFilter) {
      const [year, month] = monthFilter.split('-');
      filtered = filtered.filter(vote => {
        const voteDate = new Date(vote.createdAt || vote.timestamp);
        return voteDate.getFullYear() === parseInt(year) &&
               voteDate.getMonth() === parseInt(month) - 1;
      });
    } else {
      // 個別日付フィルター（月フィルターが無い場合のみ）
      if (dateFrom) {
        filtered = filtered.filter(vote =>
          new Date(vote.createdAt || vote.timestamp) >= new Date(dateFrom)
        );
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999); // 日付の終わりまで
        filtered = filtered.filter(vote =>
          new Date(vote.createdAt || vote.timestamp) <= endDate
        );
      }
    }

    // コスプレフィルター
    if (costumeFilter !== 'all') {
      filtered = filtered.filter(vote =>
        vote.costume?.includes(`イメージカット（${costumeFilter}）`)
      );
    }

    setFilteredVotes(filtered);
  }, [votes, dateFrom, dateTo, costumeFilter, monthFilter]);

  // フィルタリング後の集計を計算
  const filteredVoteCounts = React.useMemo(() => {
    const counts = { '1': 0, '2': 0, '3': 0, '4': 0 };
    filteredVotes.forEach(vote => {
      const match = vote.costume?.match(/イメージカット（(\d)）/);
      if (match && match[1]) {
        counts[match[1]]++;
      }
    });
    return counts;
  }, [filteredVotes]);

  const filteredTotalVotes = filteredVotes.length;

  // 月別選択のオプションを生成
  const getMonthOptions = () => {
    const months = [];
    const today = new Date();
    
    // 過去12ヶ月分を生成
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const value = `${year}-${month.toString().padStart(2, '0')}`;
      const label = `${year}年${month}月`;
      months.push({ value, label });
    }
    
    return months;
  };

  // CSV ダウンロード機能
  const downloadCSV = () => {
    const headers = ['投票日時', 'コスプレ選択', 'メールアドレス', 'コメント', 'ID'];
    const csvData = filteredVotes.map(vote => [
      new Date(vote.createdAt || vote.timestamp).toLocaleString('ja-JP'),
      vote.costume || '',
      vote.email || '匿名',
      vote.comment || '',
      vote.id || ''
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ponyo_votes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                    <label htmlFor="admin-key" className="sr-only">管理者キー</label>
                    <input
                      type="password"
                      id="admin-key"
                      name="admin-key"
                      placeholder="管理者キー (テスト用: DAIM_TEST_ADMIN_KEY_2024)"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      autoComplete="current-password"
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
              <p className="text-gray-300">メール登録者の管理とコンテンツ管理</p>
              <p className="text-xs text-gray-500 mt-1">Version: {new Date().toISOString()}</p>
              <div className="mt-4 flex gap-4">
                <a
                  href="/admin/news"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  ニュース管理
                </a>
              </div>
            </div>

            {/* 統計情報 */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
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
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">総投票数</h3>
                <div className="text-3xl font-light text-purple-400">{totalVotes}</div>
                <div className="text-xs text-gray-400 mt-1">
                  デバッグ: votes.length={votes.length}, isLoading={isVotesLoading.toString()}
                </div>
              </div>
            </div>

            {/* 投票結果 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">🗳️ ぽにょ皇子 衣装選び投票結果</h3>
                <div className="flex gap-3">
                  <button
                    onClick={downloadCSV}
                    disabled={filteredVotes.length === 0}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
                  >
                    📥 CSV ダウンロード ({filteredVotes.length}件)
                  </button>
                  <button
                    onClick={fetchVotes}
                    disabled={isVotesLoading}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isVotesLoading ? '更新中...' : '🔄 更新'}
                  </button>
                  <button
                    onClick={deleteAllVotes}
                    disabled={isDeleting || totalVotes === 0}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? '削除中...' : '🗑️ 削除'}
                  </button>
                </div>
              </div>

              {/* フィルター */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">📊 フィルター & 検索</h4>
                
                {/* 月別選択 */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-400 mb-1">📅 月別選択（優先）</label>
                  <select
                    value={monthFilter}
                    onChange={(e) => {
                      setMonthFilter(e.target.value);
                      if (e.target.value) {
                        // 月別選択時は個別日付をクリア
                        setDateFrom('');
                        setDateTo('');
                      }
                    }}
                    className="w-full md:w-1/3 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">月別選択なし</option>
                    {getMonthOptions().map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    月別選択時は個別日付設定は無効になります
                  </p>
                </div>

                {/* 個別日付選択 */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      開始日 {monthFilter && <span className="text-gray-500">（無効）</span>}
                    </label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      disabled={!!monthFilter}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      終了日 {monthFilter && <span className="text-gray-500">（無効）</span>}
                    </label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      disabled={!!monthFilter}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">コスプレ選択</label>
                    <select
                      value={costumeFilter}
                      onChange={(e) => setCostumeFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all">すべて</option>
                      <option value="1">イメージカット（1）</option>
                      <option value="2">イメージカット（2）</option>
                      <option value="3">イメージカット（3）</option>
                      <option value="4">イメージカット（4）</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-3 flex gap-2 items-center">
                  <button
                    onClick={() => {
                      setMonthFilter('');
                      setDateFrom('');
                      setDateTo('');
                      setCostumeFilter('all');
                    }}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs transition-colors"
                  >
                    全リセット
                  </button>
                  {monthFilter && (
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                      📅 {getMonthOptions().find(opt => opt.value === monthFilter)?.label} フィルター中
                    </span>
                  )}
                  <span className="text-xs text-gray-400 py-1">
                    {filteredVotes.length} / {totalVotes} 件表示中
                  </span>
                </div>
              </div>

              {/* デバッグ情報 */}
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs">
                <div className="text-red-300 font-medium mb-2">🐛 デバッグ情報:</div>
                <div className="space-y-1 text-gray-300">
                  <div>isVotesLoading: {isVotesLoading.toString()}</div>
                  <div>votes.length: {votes.length}</div>
                  <div>totalVotes: {totalVotes}</div>
                  <div>filteredVotes.length: {filteredVotes.length}</div>
                  <div>voteCounts: {JSON.stringify(voteCounts)}</div>
                  <div>filteredVoteCounts: {JSON.stringify(filteredVoteCounts)}</div>
                  <div>adminKey present: {adminKey ? 'Yes' : 'No'}</div>
                  <div>isAuthenticated: {isAuthenticated.toString()}</div>
                </div>
              </div>

              {isVotesLoading ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>投票データを読み込み中...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 投票集計（フィルター後） */}
                  <div className="grid md:grid-cols-4 gap-4">
                    {Object.entries(filteredVoteCounts).map(([costume, count]) => (
                      <div key={costume} className="bg-white/5 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-300 mb-1">イメージカット {costume}</div>
                        <div className="text-2xl font-bold text-purple-400">{count as number}</div>
                        <div className="text-xs text-gray-400">
                          {filteredTotalVotes > 0 ? Math.round(((count as number) / filteredTotalVotes) * 100) : 0}%
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 投票テーブル */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">
                      📋 投票詳細 ({filteredVotes.length}件)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-white/5">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300">投票日時</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300">コスプレ選択</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300">メールアドレス</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300">コメント</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300">ID</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {filteredVotes.map((vote, index) => (
                            <tr key={vote.id || index} className="hover:bg-white/5">
                              <td className="px-4 py-3 text-gray-300">
                                {new Date(vote.createdAt || vote.timestamp).toLocaleString('ja-JP')}
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300">
                                  {vote.costume || '不明'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-300">
                                {vote.email || '匿名'}
                              </td>
                              <td className="px-4 py-3 text-gray-300 max-w-xs truncate">
                                {vote.comment || '-'}
                              </td>
                              <td className="px-4 py-3 text-gray-400 text-xs">
                                {vote.id || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {filteredVotes.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          条件に一致する投票データがありません
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
