'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-luxury relative py-32 overflow-hidden">
        {/* Background Image with Cool Effects */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/ponyooji_art202308.avif" 
            alt="Studio Background" 
            fill 
            className="object-cover object-center"
            priority
          />
          {/* Multiple Overlay Layers for Ultra Cool Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/40 to-blue-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
          
          {/* Floating Particles Effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
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
            <div className="section-number text-6xl font-light text-gray-200 mb-4 drop-shadow-2xl">07</div>
            <p className="section-subtitle text-gray-200 text-lg mb-2 font-medium tracking-wider">Intelligent Studio</p>
            <h1 className="section-title text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>
            
            {/* Glowing Accent Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 mx-auto rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="text-8xl mb-8">
                <svg className="w-32 h-32 mx-auto text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-200">
                AI-Powered DJ Studio for the Future
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                最先端のAI技術を駆使した次世代DJスタジオが、まもなく登場します。
                <br />
                楽曲の自動分析、BPMマッチング、キー調和、AI推薦システムなど、
                <br />
                これまでにない音楽制作体験をお届けします。
              </p>
            </div>

            {/* Feature Preview */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="feature-card p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4 flex justify-center">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-3 text-slate-200">AI Track Analysis</h3>
                <p className="text-gray-400 text-sm">
                  楽曲のBPM、キー、エネルギー、ジャンルを自動分析
                </p>
              </div>
              
              <div className="feature-card p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4 flex justify-center">
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 4v2h6V4M9 4a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-3 text-slate-200">Smart Mixing</h3>
                <p className="text-gray-400 text-sm">
                  AIが最適なトランジションとミックスを提案
                </p>
              </div>
              
              <div className="feature-card p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4 flex justify-center">
                  <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-3 text-slate-200">Real-time Effects</h3>
                <p className="text-gray-400 text-sm">
                  リアルタイムでAIが最適なエフェクトを適用
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-light mb-4 text-slate-200">開発進捗</h3>
                <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                </div>
                <p className="text-gray-400 text-sm mt-3">75% 完了</p>
              </div>
            </div>

            {/* Notification Signup */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-light mb-4 text-slate-200">リリース通知</h3>
              <p className="text-gray-300 mb-6">
                リリース時に通知を受け取るには、メールアドレスを登録してください
              </p>
              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                  登録
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
