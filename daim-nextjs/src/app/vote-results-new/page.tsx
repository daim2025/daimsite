'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

interface VoteData {
  votes: any[];
  totalVotes: number;
  voteCounts: Record<string, number>;
}

export default function VoteResultsNewPage() {
  const [voteData, setVoteData] = useState<VoteData>({
    votes: [],
    totalVotes: 0,
    voteCounts: {}
  });
  const [loading, setLoading] = useState(true);

  console.log('🚀 NEW VoteResultsPage component loaded - CACHE BYPASS VERSION');

  const fetchVoteData = async () => {
    try {
      console.log('=== NEW PAGE: Fetching vote data ===');
      const response = await fetch(`/api/vote?_bypass=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      console.log('NEW PAGE Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('NEW PAGE Vote data fetched:', data);
        console.log('NEW PAGE Total votes:', data.totalVotes);
        console.log('NEW PAGE Vote counts:', data.voteCounts);
        console.log('NEW PAGE Before setVoteData, current state:', voteData);
        setVoteData(data);
        console.log('NEW PAGE After setVoteData called');
      } else {
        console.error('NEW PAGE API error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('NEW PAGE Failed to fetch vote data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoteData();
    // 30秒ごとにデータを更新
    const interval = setInterval(fetchVoteData, 30000);
    return () => clearInterval(interval);
  }, []);

  const { votes, totalVotes, voteCounts } = voteData;

  console.log('=== NEW PAGE: Rendering vote results ===');
  console.log('NEW PAGE Current voteData state:', voteData);
  console.log('NEW PAGE Total votes for display:', totalVotes);
  console.log('NEW PAGE Loading state:', loading);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navigation />

      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-light mb-4">🗳️ ぽにょ皇子 投票結果 (NEW VERSION)</h1>
              <p className="text-gray-300">コスプレ衣装選択の投票結果をリアルタイムで確認</p>
            </div>

            {/* 総投票数 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-8 text-center">
              <h2 className="text-xl font-medium mb-2">総投票数</h2>
              <div className="text-5xl font-light text-purple-400 mb-2">{totalVotes}</div>
              <div className="text-gray-400">票</div>
              {loading && <div className="text-yellow-400 mt-2">データ読み込み中...</div>}
            </div>

            {/* 投票結果グラフ */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-medium mb-6">📊 投票集計結果</h3>

              {totalVotes > 0 ? (
                <div className="space-y-6">
                  {Object.entries(voteCounts).map(([costume, count]) => {
                    const percentage = Math.round((count / totalVotes) * 100);
                    const costumeNum = costume.replace('イメージカット（', '').replace('）', '');
                    return (
                      <div key={costume}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg">イメージカット（{costumeNum}）</span>
                          <div className="text-right">
                            <div className="text-xl font-bold text-purple-400">{count}票</div>
                            <div className="text-sm text-gray-400">{percentage}%</div>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-4">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  {loading ? 'データを読み込み中...' : 'まだ投票がありません'}
                </div>
              )}
            </div>

            {/* 最新投票情報 */}
            {votes.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">📋 最新の投票</h3>
                <div className="space-y-4">
                  {votes.slice(0, 5).map((vote) => (
                    <div key={vote.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-300 mb-2">
                            {vote.costume}
                          </div>
                          {vote.comment && (
                            <p className="text-gray-300 text-sm">{vote.comment}</p>
                          )}
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          {new Date(vote.createdAt || vote.timestamp).toLocaleString('ja-JP')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <a
                href="/vote_ponyo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <span>🗳️</span>
                <span>投票に参加する</span>
              </a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                ✅ NEW VERSION - キャッシュバイパス対応<br />
                投票データはリアルタイムで更新されます
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}