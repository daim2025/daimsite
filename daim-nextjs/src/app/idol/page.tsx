'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function IdolPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-luxury relative py-32 overflow-hidden">
        {/* Background Image with Cool Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
          
          {/* Floating Particles Effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-pink-400 rounded-full animate-ping"
                style={{
                  left: `${(i * 5.5) % 100}%`,
                  top: `${(i * 4.8) % 100}%`,
                  animationDelay: `${(i * 0.15) % 3}s`,
                  animationDuration: `${2 + (i * 0.1) % 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-200 mb-4 drop-shadow-2xl">06</div>
            <p className="section-subtitle text-gray-200 text-lg mb-2 font-medium tracking-wider">Idol Demo</p>
            <h1 className="section-title text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
              <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent">
                STAMP - AI Generated Idol Music
              </span>
            </h1>
            
            {/* Glowing Accent Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-600 mx-auto rounded-full shadow-lg shadow-pink-400/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Idol Demo Content */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="text-8xl mb-8">🎤</div>
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-200">
                AI Generated Idol Music
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                最新のAI技術を使用してアイドル向けの音楽を作成しました。
                <br />
                アイドル音楽制作の未来を体験してください。
              </p>
            </div>

            {/* Song Details */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light mb-4">STAMP</h3>
                <p className="text-gray-300 mb-6">
                  writing: ShiroKoba<br/>
                  AI Enhancement: DAIM Studio
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-lg font-medium mb-2">🎵 Musical Style</h4>
                    <p className="text-gray-300 text-sm">Upbeat idol pop with electronic elements</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-lg font-medium mb-2">🎭 Target Audience</h4>
                    <p className="text-gray-300 text-sm">Idol fans and pop music lovers</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-lg font-medium mb-2">🤖 AI Features</h4>
                    <p className="text-gray-300 text-sm">Melody generation, arrangement, mixing</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg p-6 border border-pink-500/30">
                    <div className="text-4xl mb-4">🎧</div>
                    <p className="text-gray-300 text-sm">
                      楽曲の詳細、歌詞、推し曲投票など
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-600 to-blue-700 text-white font-bold rounded-2xl hover:from-slate-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="text-xl">←</span>
                <span>トップページに戻る</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
