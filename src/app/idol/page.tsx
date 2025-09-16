'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function IdolPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const lyricsVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    try {
      const video = e.currentTarget;
      // 安全なplaybackRateの範囲内で設定（0.25 - 4.0）
      const safePlaybackRate = Math.max(0.25, Math.min(0.5, 0.5));
      if (video.playbackRate !== safePlaybackRate) {
        video.playbackRate = safePlaybackRate;
      }
      setIsVideoLoaded(true);
    } catch (error) {
      console.log('Playback rate adjustment not supported:', error);
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.log('Video error:', e);
    setVideoError(true);
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-light mb-8 tracking-wider">
            Idol Demo
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            We have created idol-oriented music using the latest AI technology.
          </p>
        </div>
      </section>

      {/* Project Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light mb-6">STAMP - 歌詞</h2>
              <p className="text-gray-300 text-lg">writing: ShiroKoba</p>
            </div>

            {/* Lyrics Video Container */}
            <div className="lyrics-video-container relative min-h-[600px] rounded-xl overflow-hidden mb-12">
              <div className="lyrics-video-bg absolute inset-0">
                <video
                  ref={lyricsVideoRef}
                  className="lyrics-video w-full h-full object-cover brightness-60 contrast-105 saturate-95 opacity-80"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedMetadata={handleVideoLoad}
                  onError={handleVideoError}
                >
                  <source src="/images/mov_xi_2.mp4" type="video/mp4" />
                </video>
                <div className="lyrics-video-overlay absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"></div>
              </div>

              {/* Lyrics Content */}
              <div className="lyrics-content relative z-10 p-8 md:p-12 h-full flex flex-col justify-start">
                <div className="lyrics-text-container max-w-3xl">
                  <div className="lyrics-text space-y-6">
                    <div className="lyrics-verse">
                      <p>今日もまた 同じ道を歩いて</p>
                      <p>昨日と同じ景色を見て</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>私の心は どこにあるのだろう</p>
                      <p>探しても見つからない 答えを</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>時は流れて 季節は変わって</p>
                      <p>でも私の心は 変わらない</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>今日もまた 同じ空を見上げて</p>
                      <p>昨日と同じ星を数えて</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>私の夢は どこにあるのだろう</p>
                      <p>追いかけても届かない 光を</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>時は流れて 世界は変わって</p>
                      <p>でも私の夢は 変わらない</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>今日もまた 同じ歌を歌って</p>
                      <p>昨日と同じ言葉を紡いで</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>私の想いは どこにあるのだろう</p>
                      <p>伝えても届かない 愛を</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>時は流れて 人は変わって</p>
                      <p>でも私の想いは 変わらない</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>今日もまた 同じ道を歩いて</p>
                      <p>明日も同じ景色を見て</p>
                    </div>
                    
                    <div className="lyrics-verse">
                      <p>私の心は どこにあるのだろう</p>
                      <p>探しても見つからない 答えを</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="text-center">
              <h3 className="text-2xl font-light mb-6">About This Project</h3>
              <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
                複数人で歌う前提の歌詞なので、２小節毎に区切っているが（今日〜、私〜等）、
                少し疾走感を持たせた作り方。こうなると歌詞を作り直す必要が高まるか・・・
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors text-lg"
          >
            ← Back to Home
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
