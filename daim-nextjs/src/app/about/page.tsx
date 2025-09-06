'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (
    <div className="font-mono min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white antialiased">
      <Navigation />
      
      {/* Hero Section with About DAIM Combined */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-purple-500/5"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Image
              src="/images/logo_daim.svg"
              alt="DAIM Logo"
              width={180}
              height={72}
              className="mb-12 brightness-0 invert drop-shadow-lg mx-auto"
              priority
            />
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              <span className="text-slate-400">{t('about.page.title')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light tracking-widest uppercase">
              {t('about.page.subtitle')}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 font-light">
                  <strong className="text-slate-400 font-bold">{t('about.page.concept')}</strong>をコンセプトとした洗練された音楽創造プラットフォーム
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {t('about.page.description1')}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-slate-400/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 text-slate-400">{t('about.page.intelligent.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.page.intelligent.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 border-2 border-slate-400/20 rounded-full flex items-center justify-center relative bg-gradient-to-br from-slate-400/5 to-purple-500/5 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-400 mb-2">INTELLIGENT</div>
                    <div className="text-sm text-gray-300 font-light tracking-wider">MUSIC CREATION</div>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-slate-400/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 border border-slate-400/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creation Process */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-slate-400 text-sm font-bold tracking-wider mb-4 uppercase">{t('about.process.methodology')}</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">{t('about.process.title')}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('about.process.description')}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-slate-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">💭</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-400">{t('about.process.inspiration.title')}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {t('about.process.inspiration.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-purple-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🧠</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">{t('about.process.processing.title')}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {t('about.process.processing.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-green-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-green-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🎵</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-400">{t('about.process.refinement.title')}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {t('about.process.refinement.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Distribution */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-slate-400 text-sm font-bold tracking-wider mb-4 uppercase">{t('about.distribution.section')}</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">{t('about.distribution.title')}</h2>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-400/10 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-xl">🌍</div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-400">{t('about.distribution.global.title')}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.distribution.global.description')}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-400/10 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-xl">📈</div>
                  </div>
                  <h3 className="text-xl font-bold text-green-400">{t('about.distribution.revenue.title')}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.distribution.revenue.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 border-2 border-blue-400/20 rounded-full flex items-center justify-center relative bg-gradient-to-br from-blue-400/5 to-green-400/5 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">GLOBAL</div>
                    <div className="text-sm text-gray-300 font-light tracking-wider">DISTRIBUTION</div>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-blue-400/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-8 border border-green-400/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Management */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-slate-400 text-sm font-bold tracking-wider mb-4 uppercase">{t('about.cms.section')}</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">{t('about.cms.title')}</h2>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-blue-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🎵</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">{t('about.cms.track.title')}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {t('about.cms.track.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-purple-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">📊</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">{t('about.cms.analytics.title')}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {t('about.cms.analytics.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-green-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-green-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🤝</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-400">{t('about.cms.collaboration.title')}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {t('about.cms.collaboration.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}