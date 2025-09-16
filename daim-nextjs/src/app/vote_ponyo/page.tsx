'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import React, { useState } from 'react';

export default function VotePonyoPage() {
  const [selectedCostume, setSelectedCostume] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCostume) {
      setSubmitMessage('コスプレ衣装を選択してください');
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          costume: selectedCostume,
          email: email.trim() || undefined,
          comment: comment.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message);
        setIsSuccess(true);
        // フォームをリセット
        setSelectedCostume('');
        setEmail('');
        setComment('');
      } else {
        setSubmitMessage(data.error || '投票の送信に失敗しました');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('投票送信エラー:', error);
      setSubmitMessage('ネットワークエラーが発生しました。再度お試しください。');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-luxury relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-purple-900/40 to-blue-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
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
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                ぽにょ皇子のAI生成楽曲に合わせて、ミュージックビデオも「写真から動画をAI生成」で、どこまでできるかチャレンジします。
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                楽曲の歌詞に合わせて、過去の記憶のシーンのメインキャラクターの衣装はどのコスプレが良いか、皆さまの投票で決定します。
              </p>
              <p className="text-xl font-semibold text-purple-300">
                下記の4種類のコスプレが良いか、投票ページにてご応募ください。
              </p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-light text-center mb-16 text-purple-200">
            ぽにょ皇子 AI自動生成動画キャラクターイメージ
          </h2>

          {/* Costume Option 1 */}
          <div className="mb-16">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <div className="grid md:grid-cols-3 gap-8 items-start">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Voting Section */}
          <div className="max-w-3xl mx-auto">
            <div className="card-intelligent p-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-400/30">
              <h3 className="text-2xl font-bold text-center mb-8 text-purple-200">投票フォーム</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-purple-200 mb-4">
                    どのコスプレ衣装が良いと思いますか？ <span className="text-red-400">*</span>
                  </label>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((option) => (
                      <label key={option} className="flex items-center p-4 bg-black/30 rounded-lg border border-slate-500/20 hover:bg-black/50 transition-colors cursor-pointer">
                        <input 
                          type="radio" 
                          name="costume" 
                          value={option}
                          checked={selectedCostume === option.toString()}
                          onChange={(e) => setSelectedCostume(e.target.value)}
                          className="mr-4 w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                        />
                        <span className="text-white">イメージカット（{option}）</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-purple-200 mb-2">
                    メールアドレス（任意）
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-slate-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="comment" className="block text-lg font-medium text-purple-200 mb-2">
                    コメント（任意）
                  </label>
                  <textarea 
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/30 border border-slate-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="ご意見やコメントがあればお聞かせください"
                  />
                </div>

                {submitMessage && (
                  <div className={`text-center p-4 rounded-lg ${
                    isSuccess 
                      ? 'bg-green-600/20 border border-green-500/30 text-green-300' 
                      : 'bg-red-600/20 border border-red-500/30 text-red-300'
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <div className="text-center">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform shadow-lg ${
                      isSubmitting 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? '送信中...' : '投票する'}
                  </button>
                </div>
              </form>
              
              <p className="text-center text-gray-400 text-sm mt-6">
                ※投票結果は今後のMV制作の参考にさせていただきます
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
