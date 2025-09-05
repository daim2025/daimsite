'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PonyoPrincePage() {
  const { t } = useLanguage();
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
            <p className="section-subtitle text-gray-200 text-lg mb-2 font-medium tracking-wider">{t('ponyopage.hero.subtitle')}</p>
            <h1 className="section-title text-4xl md:text-6xl font-light mb-8 text-white drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                {t('ponyopage.hero.title')}
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
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">{t('ponyopage.project.title')}</h2>
            <p className="text-xl text-gray-300">{t('ponyopage.project.subtitle')}</p>
            <p className="text-lg text-gray-400 mt-2">{t('ponyopage.project.subtitle2')}</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                {t('ponyopage.project.desc1')}
              </p>
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                {t('ponyopage.project.desc2')}
              </p>
            </div>
            
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="card-description text-gray-300 leading-relaxed mb-4">
                {t('ponyopage.project.desc3')}
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
                <h3 className="card-title text-2xl font-light mb-6">{t('ponyopage.about.concept')}</h3>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  {t('ponyopage.about.concept.desc1')}
                </p>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  {t('ponyopage.about.concept.desc2')}
                </p>
              </div>
            </div>
            
            <div>
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="card-title text-2xl font-light mb-6">{t('ponyopage.about.profile')}</h3>
                <h4 className="text-xl font-light mb-4 text-slate-300">{t('ponyopage.about.profile.name')}</h4>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  {t('ponyopage.about.profile.desc1')}
                </p>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  {t('ponyopage.about.profile.desc2')}
                </p>
                <div className="bg-gradient-to-r from-slate-600/20 to-blue-700/20 rounded-lg p-4 border border-slate-500/20 mt-4">
                  <p className="text-sm text-slate-300 font-medium mb-2">{t('ponyopage.about.achievements1')}</p>
                  <p className="text-sm text-slate-300">{t('ponyopage.about.achievements2')}</p>
                  <p className="text-sm text-slate-300">{t('ponyopage.about.achievements3')}</p>
                  <p className="text-sm text-slate-300 mt-2">{t('ponyopage.about.events')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Song Lyrics Section */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 text-center">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-light mb-2 text-slate-300">初期楽曲</h3>
                <p className="text-lg text-gray-300 font-medium">Title：A.I.（Android Imagination）</p>
              </div>
              
              <div className="lyrics-content text-gray-300 leading-relaxed space-y-4 text-center max-w-2xl mx-auto">
                <p>サイリウムが眩しい<br />
                固いベッドの上<br />
                戦いぬいていた記憶<br />
                誰もいないこの部屋</p>
                
                <p>感覚が研ぎ澄まされて<br />
                どこからか響いてくる<br />
                機械のキシム音が<br />
                やけに騒々しくてたまらない</p>
                
                <p>頭の中に響く声は<br />
                あの時、あの場所の、<br />
                あいつのいつもの声だけど<br />
                何か何かが足りていない</p>
                
                <p>匂いも感じない<br />
                暑さも冷たさも<br />
                今は何も感じない<br />
                あのあらい息づかいさえも</p>
                
                <p className="text-blue-300 font-medium">ヒューマノイドの夢は現実なの？<br />
                感覚がないはずなのに湧き出る感情<br />
                イマジネーションは誰のもの？<br />
                色あふれる世界へ、さあ戻ろう</p>
                
                <p className="text-purple-300 font-bold">AI、色奪（Irodori）、AI、色奪（Irodori）、<br />
                AI、色奪（Irodori）、AI、色奪（Irodori）</p>
                
                <p>心の中を伝うのは<br />
                あの夜、あの歌の<br />
                熱い言葉のリリックだけど<br />
                微か微かにしか感じれない</p>
                
                <p>死んだんじゃない<br />
                まだ死んじゃいない<br />
                新しい命じゃない<br />
                生まれ変わっちゃいないんだ</p>
                
                <p className="text-blue-300 font-medium">ヒューマノイドの夢は現実なの？<br />
                感覚がないはずなのに湧き出る感情<br />
                イマジネーションは誰のもの？<br />
                色あふれる世界へ、さあ戻ろう</p>
                
                <p className="text-purple-300 font-bold">AI、色奪（Irodori）、AI、色奪（Irodori）、<br />
                AI、色奪（Irodori）、AI、色奪（Irodori）</p>
              </div>
              
              <div className="text-center mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-slate-400">writing：DAIM Driver Shiro Koba</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Song Setting Section - Full Width */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="card-title text-4xl font-light mb-8 text-center">楽曲設定</h3>
              <div className="space-y-8 text-gray-300 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p>
                      コスプレイヤー、DJ、グラビア等の、様々な活動をしているぽにょ皇子。<br />
                      DJにおいては、アニソンDJとして活躍。<br />
                      そこで、生成する楽曲をアニソンの主題歌らしいイメージで検討。<br />
                      今回は、A.I.による楽曲自動生成に掛けて、「A.I.＝Android Imagination」として<br />
                      世界観を設定。
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-600/20 to-blue-700/20 rounded-lg p-6 border border-slate-500/20">
                    <p className="text-slate-300">
                      近い未来、大国による争いが世界に広まってしまったら・・・<br />
                      奪い合う大国と戦いたくない者との戦い・・・<br />
                      そんな架空のバトルアニメの主題歌<br />
                      戦いを止める鍵は、AIなのか、Humanなのか、それともヒューマノイドか・・・
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p>
                    ぽにょ皇子2nd.シングル「変幻自在」の変幻性をコスプレから更に拡張し、バトルアニメ内で争いを止めるキャラクター設定。傷つきながらもヒューマノイドとして戦う姿を歌詞にした。
                  </p>
                </div>
                
                {/* Videos Section */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {/* Introduction Video */}
                  <div className="bg-black/30 rounded-lg p-6 border border-slate-500/20">
                    <h4 className="text-xl font-medium text-slate-300 mb-4 text-center">紹介動画</h4>
                    <div className="relative w-full aspect-video">
                      <iframe 
                        src="https://player.vimeo.com/video/1116091352?h=0&autoplay=0&title=0&byline=0&portrait=0"
                        className="absolute top-0 left-0 w-full h-full rounded border border-slate-500/30"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  
                  {/* Song Video */}
                  <div className="bg-black/30 rounded-lg p-6 border border-slate-500/20">
                    <h4 className="text-xl font-medium text-slate-300 mb-4 text-center">楽曲動画</h4>
                    <div className="relative w-full aspect-video">
                      <iframe 
                        src="https://player.vimeo.com/video/1116093914?h=0&autoplay=0&title=0&byline=0&portrait=0"
                        className="absolute top-0 left-0 w-full h-full rounded border border-slate-500/30"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-light mb-6">{t('ponyopage.sns.title')}</h2>
            <p className="text-xl text-gray-300">{t('ponyopage.sns.subtitle')}</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <a href="https://x.com/ponyoouji" target="_blank" rel="noopener noreferrer" className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group">
                <div className="text-4xl mb-4">𝕏</div>
                <h3 className="text-xl font-light mb-2">X (Twitter)</h3>
                <p className="text-gray-400 text-sm">@ponyoouji</p>
                <div className="mt-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  <span className="text-sm">{t('ponyopage.sns.follow')}</span>
                </div>
              </a>
              
              <a href="https://www.instagram.com/ponyoouji/" target="_blank" rel="noopener noreferrer" className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group">
                <div className="text-4xl mb-4">📷</div>
                <h3 className="text-xl font-light mb-2">Instagram</h3>
                <p className="text-gray-400 text-sm">@ponyoouji</p>
                <div className="mt-4 text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                  <span className="text-sm">{t('ponyopage.sns.follow')}</span>
                </div>
              </a>
              
              <a href="https://www.youtube.com/c/%E3%81%BD%E3%81%AB%E3%82%87%E7%9A%87%E5%AD%90official" target="_blank" rel="noopener noreferrer" className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group">
                <div className="text-4xl mb-4">📺</div>
                <h3 className="text-xl font-light mb-2">YouTube</h3>
                <p className="text-gray-400 text-sm">{t('ponyopage.sns.youtube.name')}</p>
                <div className="mt-4 text-red-400 group-hover:text-red-300 transition-colors duration-300">
                  <span className="text-sm">{t('ponyopage.sns.subscribe')}</span>
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
