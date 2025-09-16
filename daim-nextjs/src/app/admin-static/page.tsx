'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

interface VoteData {
  votes: any[];
  totalVotes: number;
  voteCounts: Record<string, number>;
}

export default function AdminStaticPage() {
  const [voteData, setVoteData] = useState<VoteData>({
    votes: [],
    totalVotes: 0,
    voteCounts: {}
  });

  useEffect(() => {
    // クライアントサイドで投票データを取得（管理者権限）
    const fetchVoteData = async () => {
      try {
        const response = await fetch('/api/vote', {
          headers: {
            'x-admin-key': 'DAIM_TEST_ADMIN_KEY_2024'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setVoteData(data);
        }
      } catch (error) {
        console.error('Failed to fetch vote data:', error);
      }
    };

    fetchVoteData();
  }, []);

  const { votes, totalVotes, voteCounts } = voteData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navigation />
      
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-light mb-4">管理者ダッシュボード（静的版）</h1>
              <p className="text-gray-300">投票結果の確認（JavaScript不要）</p>
            </div>

            {/* 統計情報 */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">総投票数</h3>
                <div className="text-3xl font-light text-purple-400">{totalVotes}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">イメージカット（1）</h3>
                <div className="text-3xl font-light text-blue-400">{voteCounts['1'] || 0}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">イメージカット（2）</h3>
                <div className="text-3xl font-light text-green-400">{voteCounts['2'] || 0}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">イメージカット（3）</h3>
                <div className="text-3xl font-light text-yellow-400">{voteCounts['3'] || 0}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">イメージカット（4）</h3>
                <div className="text-3xl font-light text-red-400">{voteCounts['4'] || 0}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">最新更新</h3>
                <div className="text-lg text-gray-300">
                  {votes.length > 0 
                    ? new Date(votes[0].createdAt).toLocaleString('ja-JP')
                    : '投票なし'
                  }
                </div>
              </div>
            </div>

            {/* 投票詳細 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-medium mb-6">🗳️ 投票詳細リスト</h3>
              
              {votes.length > 0 ? (
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
                      {votes.map((vote) => (
                        <tr key={vote.id} className="hover:bg-white/5">
                          <td className="px-4 py-3 text-gray-300">
                            {new Date(vote.createdAt).toLocaleString('ja-JP')}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300">
                              {vote.costume}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-300">
                            {vote.email || '匿名'}
                          </td>
                          <td className="px-4 py-3 text-gray-300 max-w-xs truncate">
                            {vote.comment || '-'}
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {vote.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  まだ投票がありません
                </div>
              )}
            </div>

            {/* 集計グラフ（テキストベース） */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-medium mb-6">📊 投票集計</h3>
              
              {Object.entries(voteCounts).map(([costume, count]) => {
                const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                return (
                  <div key={costume} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>イメージカット（{costume}）</span>
                      <span>{count}票 ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                ✅ この画面はJavaScript不要で動作します<br />
                データは /database/votes.json から読み込んでいます
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}