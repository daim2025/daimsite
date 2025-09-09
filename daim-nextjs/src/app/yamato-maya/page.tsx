'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function YamatoMayaPage() {
  const { t } = useLanguage();
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-luxury relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/yamato-maya-hero.webp" 
            alt="Yamato Maya アート背景" 
            fill 
            className="object-cover object-center"
            priority
            unoptimized
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
            <p className="section-subtitle text-gray-200 text-lg mb-2 font-medium tracking-wider">Electronic Music Artist</p>
            <h1 className="section-title text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                YAMATO MAYA
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
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">Project</h2>
            <p className="text-xl text-gray-300">Electronic Music & Performance Art</p>
            <p className="text-lg text-gray-400 mt-2">Innovative Sound Design & Visual Experience</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                YAMATO MAYAは、電子音楽とパフォーマンスアートを融合させた革新的なアーティストプロジェクトです。
                テクノロジーと音楽の境界を超越し、新しい音楽体験を創造しています。
              </p>
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                独自のサウンドデザインと視覚的表現により、観客を没入的な音響空間へと導きます。
                電子音楽の可能性を探求し続ける実験的なアプローチが特徴です。
              </p>
            </div>
            
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                ライブパフォーマンスでは、リアルタイムでサウンドとビジュアルを操作し、
                その場でしか体験できない唯一無二の音楽体験を提供しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="card-title text-2xl font-light mb-6">Concept</h3>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  音楽とテクノロジーの融合により、新しい感覚体験を創出することを目指しています。
                  デジタルとアナログの境界を曖昧にし、聴衆を未知の音響世界へと誘います。
                </p>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  各作品は実験的なアプローチで制作され、従来の音楽の枠組みを超越した
                  革新的なサウンドスケープを構築しています。
                </p>
              </div>
            </div>
            
            <div>
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="card-title text-2xl font-light mb-6">Profile</h3>
                <h4 className="text-xl font-light mb-4 text-slate-300">YAMATO MAYA</h4>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  電子音楽アーティスト、サウンドデザイナー、パフォーマーとして活動。
                  音響技術と芸術的表現の融合を追求し、独自の音楽世界を構築。
                </p>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  国内外での公演を通じて、電子音楽の新しい可能性を探求し続けている。
                  テクノロジーを駆使したライブパフォーマンスは高い評価を得ている。
                </p>
                <div className="bg-gradient-to-r from-slate-600/20 to-blue-700/20 rounded-lg p-4 border border-slate-500/20 mt-4">
                  <p className="text-sm text-slate-300 font-medium mb-2">主な活動</p>
                  <p className="text-sm text-slate-300">• 電子音楽の作曲・制作</p>
                  <p className="text-sm text-slate-300">• ライブパフォーマンス</p>
                  <p className="text-sm text-slate-300">• サウンドデザイン</p>
                  <p className="text-sm text-slate-300 mt-2">国内外の音楽フェスティバル、クラブイベントに出演</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 text-center">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-light mb-2 text-slate-300">Music</h3>
                <p className="text-lg text-gray-300 font-medium">Latest Releases</p>
              </div>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <div className="bg-black/30 rounded-lg p-6 border border-slate-500/20">
                  <p className="text-center">
                    電子音楽の新たな地平を切り開く革新的なサウンドを制作中。<br />
                    テクノロジーと音楽の融合により生まれる<br />
                    未来的なサウンドスケープをお楽しみください。
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-slate-400">Produced by YAMATO MAYA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="card-title text-4xl font-light mb-8 text-center">Live Performance</h3>
              <div className="space-y-8 text-gray-300 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p>
                      YAMATO MAYAのライブパフォーマンスは、<br />
                      音楽とビジュアルアートが融合した<br />
                      総合的な感覚体験です。<br />
                      リアルタイムでサウンドを操作し、<br />
                      その場でしか体験できない音楽を創造します。
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-600/20 to-blue-700/20 rounded-lg p-6 border border-slate-500/20">
                    <p className="text-slate-300">
                      テクノロジーを駆使した革新的なセットアップにより、<br />
                      電子音楽の新しい可能性を探求。<br />
                      観客との相互作用を通じて、<br />
                      唯一無二の音楽体験を提供します。
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p>
                    各パフォーマンスは実験的なアプローチで構成され、<br />
                    電子音楽の境界を押し広げる挑戦的な内容となっています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">Brand</h2>
            <p className="text-xl text-gray-300">Official Logo & Assets</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="card-intelligent p-12 bg-white/5 rounded-xl border border-white/10 text-center">
              <div className="mb-8">
                <Image 
                  src="/images/yamato-maya-logo.png" 
                  alt="YAMATO MAYA Official Logo" 
                  width={300}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-2xl font-light mb-4 text-white">YAMATO MAYA</h3>
              <p className="text-gray-300 mb-8">Official Brand Logo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">Gallery</h2>
            <p className="text-xl text-gray-300">Visual Archive</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 group">
                <Image 
                  src="/images/yamato-maya-1.jpg" 
                  alt="Yamato Maya Performance 1" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 group">
                <Image 
                  src="/images/yamato-maya-2.jpg" 
                  alt="Yamato Maya Performance 2" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 group">
                <Image 
                  src="/images/yamato-maya-3.jpg" 
                  alt="Yamato Maya Performance 3" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Kit Section */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">Press Kit</h2>
            <p className="text-xl text-gray-300">Download Official Materials</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-intelligent p-6 bg-white/5 rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                <div className="mb-6">
                  <svg className="w-16 h-16 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-3">日本語版</h3>
                <p className="text-gray-400 text-sm mb-6">Japanese Press Kit</p>
                <a
                  href="/press-kit/yamato-maya-press-kit-jp.pdf"
                  download="YAMATO_MAYA_Press_Kit_JP.pdf"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  ダウンロード
                </a>
              </div>
              
              <div className="card-intelligent p-6 bg-white/5 rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                <div className="mb-6">
                  <svg className="w-16 h-16 mx-auto text-green-400 group-hover:text-green-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-3">English</h3>
                <p className="text-gray-400 text-sm mb-6">English Press Kit</p>
                <a
                  href="/press-kit/yamato-maya-press-kit-en.pdf"
                  download="YAMATO_MAYA_Press_Kit_EN.pdf"
                  className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  Download
                </a>
              </div>
              
              <div className="card-intelligent p-6 bg-white/5 rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                <div className="mb-6">
                  <svg className="w-16 h-16 mx-auto text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-3">中文</h3>
                <p className="text-gray-400 text-sm mb-6">Chinese Press Kit</p>
                <a
                  href="/press-kit/yamato-maya-press-kit-zh.pdf"
                  download="YAMATO_MAYA_Press_Kit_ZH.pdf"
                  className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  下载
                </a>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="card-intelligent p-6 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-300 mb-4">
                  プレスキットには、高解像度の画像、バイオグラフィー、技術仕様などが含まれています。
                </p>
                <p className="text-sm text-gray-400">
                  Press kits include high-resolution images, biography, technical specifications, and more.
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