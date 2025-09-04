'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import React from 'react';

export default function PonyoPrincePage() {
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
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/40 to-blue-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
          

        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-200 mb-4 drop-shadow-2xl">07</div>
            <p className="section-subtitle text-gray-200 text-lg mb-2 font-medium tracking-wider">Artist Spotlight</p>
            <h1 className="section-title text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                ぽにょ皇子
              </span>
            </h1>
            
            {/* Glowing Accent Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 mx-auto rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* PROJECT */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">PROJECT</h2>
            <p className="text-xl text-gray-300">DJ ぽにょ皇子×AI音楽生成×DAIM Driver Team</p>
            <p className="text-lg text-gray-400 mt-2">First Demonstration</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                開発中の自動音楽生成アプリを想定し、最新のAI技術をDAIMエンジン開発チームが活用して楽曲を作成した場合のデモンストレーション。
              </p>
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                第一弾は、DJ ぽにょ皇子の世界観を紐解きながら、どこまで、AIと音楽、カルチャーが融合できるかチャレンジします。
              </p>
            </div>
            
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                AIを使って次世代の楽曲制作の可能性を広げるには、いままでのようなAIだけで完結させるという文化に終止符を打ち、AIが生み出した作品に人がどこまで完成度を高めプロデュースしていけるのかが鍵です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">ABOUT</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 mb-8">
                <h3 className="card-title text-2xl font-light mb-6">制作コンセプト</h3>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  AI音楽の可能性と人間の感性との融合
                </p>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  このDAIMのプロジェクトの第一弾は、DJ、コスプレイヤー、アーティストとして活躍中のぽにょ皇子とDMCのクリエイター陣がタッグを組み、それぞれ知恵を出し合いながら彼女の世界感を元にプロジェクトを進行していきます。
                </p>
              </div>
            </div>
            
            <div>
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="card-title text-2xl font-light mb-6">ARTIST PROFILE</h3>
                <h4 className="text-xl font-light mb-4 text-slate-300">DJ ぽにょ皇子</h4>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  コスプレイヤーをはじめ、DJ、グラビア等、様々な活動をしているぽにょ皇子。フォロワー数35万人超え。DJだけでなくパワフルなMCもこなしながらフロアを沸かせる予測不能な彼女のパフォーマンスには目が離せない。
                </p>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  全国各地毎月多数のイベントに出演するなど精力的に活動中。DJanesAWARD2021国内ガールズDJランキング2021年度のランキング7位に君臨。
                </p>
                <div className="bg-gradient-to-r from-slate-600/20 to-blue-700/20 rounded-lg p-4 border border-slate-500/20 mt-4">
                  <p className="text-sm text-slate-300 font-medium mb-2">▽ 1stシングル「Put on your beat！！！」</p>
                  <p className="text-sm text-slate-300">▽ 2ndシングル「変幻自在」</p>
                  <p className="text-sm text-slate-300">iTunes Store にて、リリースから24時間を待たずして日本国内 ダンスジャンル トップソングランキング 1位 を獲得。</p>
                  <p className="text-sm text-slate-300 mt-2">主催クラブイベント #ぽ祭 #過激波電脳東京 #ぽにょ皇子生誕祭</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A.I. Demo Music */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">A.I. DEMO MUSIC</h2>
            <p className="text-xl text-gray-300">AIによる生成音源</p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-8">
            <div className="card-intelligent p-6 bg-white/5 rounded-xl border border-white/10 text-center">
              <div className="mb-6">
                <h3 className="text-xl font-light mb-4 text-slate-200">音源プレビュー</h3>
                <div className="bg-gradient-to-r from-slate-600/20 to-blue-700/20 rounded-lg p-6 border border-slate-500/20">
                  <p className="text-sm text-slate-300 mb-4">
                    A.I.（Android Imagination）ver.6
                  </p>
                  <audio 
                    controls 
                    className="w-full h-12 rounded-lg bg-slate-800/50 border border-slate-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    preload="metadata"
                    crossOrigin="anonymous"
                  >
                    <source src="/audio/AI-trance-rap-2.wav" type="audio/wav" />
                    お使いのブラウザは音声再生に対応していません。
                  </audio>
                  <div className="mt-3 text-xs text-slate-400">
                    AI-trance-rap-2.wav - ぽにょ皇子 AI音楽生成デモ
                  </div>
                </div>
              </div>
              <p className="card-description text-gray-300 leading-relaxed">
                今後、ぽにょ皇子によるミキシングやアレンジを行い、楽曲として完成させていきます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">SNS</h2>
            <p className="text-xl text-gray-300">ぽにょ皇子の公式アカウント</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <a href="https://x.com/ponyoouji" target="_blank" rel="noopener noreferrer" className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group">
                <div className="text-4xl mb-4">𝕏</div>
                <h3 className="text-xl font-light mb-2">X (Twitter)</h3>
                <p className="text-gray-400 text-sm">@ponyoouji</p>
                <div className="mt-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  <span className="text-sm">フォローする →</span>
                </div>
              </a>
              
              <a href="https://www.instagram.com/ponyoouji/" target="_blank" rel="noopener noreferrer" className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group">
                <div className="text-4xl mb-4">📷</div>
                <h3 className="text-xl font-light mb-2">Instagram</h3>
                <p className="text-gray-400 text-sm">@ponyoouji</p>
                <div className="mt-4 text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                  <span className="text-sm">フォローする →</span>
                </div>
              </a>
              
              <a href="https://www.youtube.com/c/%E3%81%BD%E3%81%AB%E3%82%87%E7%9A%87%E5%AD%90official" target="_blank" rel="noopener noreferrer" className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group">
                <div className="text-4xl mb-4">📺</div>
                <h3 className="text-xl font-light mb-2">YouTube</h3>
                <p className="text-gray-400 text-sm">ぽにょ皇子official</p>
                <div className="mt-4 text-red-400 group-hover:text-red-300 transition-colors duration-300">
                  <span className="text-sm">チャンネル登録 →</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
