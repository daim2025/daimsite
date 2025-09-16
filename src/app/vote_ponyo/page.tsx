'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function VotePonyoPage() {
  const [selectedCostume, setSelectedCostume] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // 必ずコンソールに出力される
  useEffect(() => {
    console.log('🟢🟢🟢 VOTE PAGE JAVASCRIPT IS WORKING! 🟢🟢🟢');
    console.log('🟢 FINAL TEST VERSION - CLIENT SIDE RENDERING');
    alert('JavaScriptが動作しています！');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🟢🟢🟢 FORM SUBMIT STARTED 🟢🟢🟢');
    
    if (!selectedCostume) {
      setSubmitMessage('衣装を選択してください。');
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

      console.log('🟢 API Response Status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('🟢 Vote Success:', result);
        setIsSuccess(true);
        setSubmitMessage('投票ありがとうございます！');
        setSelectedCostume('');
        setEmail('');
        setComment('');
      } else {
        const error = await response.json();
        console.log('❌ Vote Error:', error);
        setSubmitMessage(error.error || '投票に失敗しました。');
      }
    } catch (error) {
      console.error('💥 Submit Error:', error);
      setSubmitMessage('ネットワークエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* HERO Section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/ponyooji_art202308.avif)' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            AI ムービー生成イメージ
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow-lg">
            ぽにょ皇子の衣装を選んでください
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Costume Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
            衣装選び投票
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedCostume === num.toString() 
                    ? 'border-blue-500 bg-blue-500/20' 
                    : 'border-gray-600 hover:border-gray-400'
                }`}
                onClick={() => setSelectedCostume(num.toString())}
              >
                <div className="relative aspect-square mb-4">
                  <Image
                    src={`/images/ponyo-image-0${num}.webp`}
                    alt={`イメージカット${num}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="text-center">
                  <input
                    type="radio"
                    name="costume"
                    value={num.toString()}
                    checked={selectedCostume === num.toString()}
                    onChange={(e) => setSelectedCostume(e.target.value)}
                    className="mr-2"
                  />
                  <label className="text-lg font-medium">
                    イメージカット（{num}）
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Video */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
            Sample Video
          </h3>
          <div className="max-w-4xl mx-auto">
            <video 
              controls 
              className="w-full rounded-lg"
              src="https://xdesign.co.jp/wp-content/uploads/2025/09/bc274c27-7f8c-4d90-8562-436af5d4e991.mp4"
            >
              お使いのブラウザは動画再生に対応していません。
            </video>
          </div>
        </div>

        {/* Voting Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                メールアドレス（任意）
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            {/* Comment Field */}
            <div>
              <label htmlFor="comment" className="block text-lg font-medium mb-2">
                コメント（任意）
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ご意見やご感想をお聞かせください..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !selectedCostume}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                isSubmitting || !selectedCostume
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {isSubmitting ? '投票中...' : '投票する'}
            </button>

            {/* Status Message */}
            {submitMessage && (
              <div className={`text-center p-4 rounded-lg ${
                isSuccess ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
              }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        {/* Token Commitment Button */}
        <div className="text-center mt-12">
          <a
            href="https://commit.daim.site"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
          >
            トークンコミットメント（応援する）
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}