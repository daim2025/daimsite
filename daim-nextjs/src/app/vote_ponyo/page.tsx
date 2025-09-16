import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { getVoteData } from '@/lib/server-vote-data';

export default function VotePonyoPage() {
  const { votes, totalVotes, voteCounts } = getVoteData();

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-luxury relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/ponyooji_art202308.avif" 
            alt="ぽにょ皇子 アート背景" 
            fill 
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-purple-900/60 to-blue-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="section-title text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                AI ムービー生成イメージ
              </span>
            </h1>
            
            {/* Glowing Accent Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 mx-auto rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <div className="card-intelligent p-6 md:p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4 md:mb-6">
                ぽにょ皇子のAI生成楽曲に合わせて、ミュージックビデオも「写真から動画をAI生成」で、どこまでできるかチャレンジします。
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4 md:mb-6">
                楽曲の歌詞に合わせて、過去の記憶のシーンのメインキャラクターの衣装はどのコスプレが良いか、皆さまの投票で決定します。
              </p>
              <p className="text-lg md:text-xl font-semibold text-purple-300">
                下記の4種類のコスプレが良いか、投票ページにてご応募ください。
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-center mb-12 md:mb-16 text-purple-200 px-4">
            ぽにょ皇子 AI自動生成動画キャラクターイメージ
          </h2>

          {/* Costume Option 1 */}
          <div className="mb-12 md:mb-16">
            <div className="card-intelligent p-6 md:p-8 bg-white/5 rounded-xl border border-white/10">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
                <div>
                  <h4 className="text-xl font-medium text-purple-300 mb-4">イメージカット（1）</h4>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image 
                      src="/images/ponyo-image-01.webp" 
                      alt="ぽにょ皇子 コスプレ1" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-center mb-6 text-slate-300">生成サンプル</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/general-5-2025-09-07T14_18_21Z-1.mp4"
                      />
                    </div>
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/general-5-2025-09-13T08_17_22Z.mp4"
                      />
                    </div>
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/1ad69258-85ce-44ca-a075-1255cfa0ace3.mp4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Costume Option 2 */}
          <div className="mb-16">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div>
                  <h4 className="text-xl font-medium text-purple-300 mb-4">イメージカット（2）</h4>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image 
                      src="/images/ponyo-image-02.webp" 
                      alt="ぽにょ皇子 コスプレ2" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-center mb-6 text-slate-300">生成サンプル</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/465e2363-1964-4cb7-8c29-26585ed52eb4-1.mp4"
                      />
                    </div>
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/kling_20250914_Image_to_Video_A_female_D_315_0.mp4"
                      />
                    </div>
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/kling_20250914_Image_to_Video_A_woman_si_487_0.mp4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Costume Option 3 */}
          <div className="mb-16">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div>
                  <h4 className="text-xl font-medium text-purple-300 mb-4">イメージカット（3）</h4>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image 
                      src="/images/ponyo-image-03.webp" 
                      alt="ぽにょ皇子 コスプレ3" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-center mb-6 text-slate-300">生成サンプル</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/general-5-2025-09-13T08_40_27Z.mp4"
                      />
                    </div>
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/kling_20250913_Image_to_Video_Everyone_i_4278_0.mp4"
                      />
                    </div>
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/kling_20250914_Image_to_Video_A_girl_who_97_0.mp4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Costume Option 4 */}
          <div className="mb-16">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div>
                  <h4 className="text-xl font-medium text-purple-300 mb-4">イメージカット（4）</h4>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image 
                      src="/images/ponyo-image-04.webp" 
                      alt="ぽにょ皇子 コスプレ4" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-center mb-6 text-slate-300">生成サンプル</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/bc274c27-7f8c-4d90-8562-436af5d4e991.mp4"
                      />
                    </div>
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/general-5-2025-09-13T17_57_09Z.mp4"
                      />
                    </div>
                    <div className="relative aspect-video bg-black/30 rounded border border-slate-500/30">
                      <video 
                        controls 
                        className="w-full h-full object-cover rounded"
                        src="https://xdesign.co.jp/wp-content/uploads/2025/09/general-5-2025-09-13T17_51_32Z.mp4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vote Results Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="card-intelligent p-6 md:p-8 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-xl border border-blue-400/30">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-blue-200">🏆 現在の投票結果</h3>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-light text-white mb-2">{totalVotes}</div>
                <div className="text-gray-300">総投票数</div>
              </div>

              {totalVotes > 0 ? (
                <div className="space-y-4">
                  {Object.entries(voteCounts).map(([costume, count]) => {
                    const percentage = Math.round((count / totalVotes) * 100);
                    return (
                      <div key={costume} className="bg-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg text-white">イメージカット（{costume}）</span>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-400">{count}票</div>
                            <div className="text-sm text-gray-400">{percentage}%</div>
                          </div>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  まだ投票がありません。最初の一票をお待ちしています！
                </div>
              )}
            </div>
          </div>

          {/* Voting Section */}
          <div className="max-w-3xl mx-auto">
            <div className="card-intelligent p-6 md:p-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-400/30">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-purple-200">投票フォーム</h3>
              
              <form action="/api/vote" method="POST" className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-base md:text-lg font-medium text-purple-200 mb-3 md:mb-4">
                    どのコスプレ衣装が良いと思いますか？ <span className="text-red-400">*</span>
                  </label>
                  <div className="space-y-2 md:space-y-3">
                    {[1, 2, 3, 4].map((option) => (
                      <label key={option} className="flex items-center p-3 md:p-4 bg-black/30 rounded-lg border border-slate-500/20 hover:bg-black/50 transition-colors cursor-pointer">
                        <input 
                          type="radio" 
                          name="costume" 
                          value={option}
                          required
                          className="mr-3 md:mr-4 w-4 h-4 md:w-5 md:h-5 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                        />
                        <span className="text-white text-sm md:text-base">イメージカット（{option}）</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-base md:text-lg font-medium text-purple-200 mb-2">
                    メールアドレス（任意）
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-black/30 border border-slate-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="comment" className="block text-base md:text-lg font-medium text-purple-200 mb-2">
                    コメント（任意）
                  </label>
                  <textarea 
                    id="comment"
                    name="comment"
                    rows={3}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-black/30 border border-slate-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none md:rows-4"
                    placeholder="ご意見やコメントがあればお聞かせください"
                  />
                </div>

                <div className="text-center">
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base md:text-lg rounded-2xl transition-all duration-300 transform shadow-lg hover:from-purple-700 hover:to-pink-700 hover:scale-105"
                  >
                    投票する
                  </button>
                </div>
              </form>
              
              <p className="text-center text-gray-400 text-sm mt-6">
                ※投票結果は今後のMV制作の参考にさせていただきます
              </p>
            </div>
          </div>

          {/* Token Commitment Button */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <div className="card-intelligent p-6 md:p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-purple-200">応援してください</h3>
              <p className="text-gray-300 mb-8 text-sm md:text-base">
                ぽにょ皇子のプロジェクトを応援していただける方は、こちらからトークンコミットメントで支援いただけます
              </p>
              <a href="https://commit.daim.site" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-6 w-full md:w-auto bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold text-base md:text-lg rounded-2xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-400/30">
                <span className="text-xl md:text-2xl">🎯</span>
                <span>トークンコミットメント（応援する）</span>
                <span className="text-xl md:text-2xl">💫</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
    </div>
  );
}
