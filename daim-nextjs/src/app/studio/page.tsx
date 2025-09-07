'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function StudioPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage(t('studio.page.email.validation'));
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setEmail(''); // フォームをクリア
      } else {
        setMessage(data.error || t('studio.email.error'));
        setMessageType('error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setMessage(t('contact.form.network-error'));
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-luxury relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-blue-500/5"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
          

        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="section-subtitle text-gray-200 text-lg mb-2 font-medium tracking-wider">{t('studio.page.subtitle')}</p>
            <h1 className="section-title text-4xl md:text-6xl font-light mb-6 text-white drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-slate-200 to-blue-200 bg-clip-text text-transparent">
                {t('studio.page.title')}
              </span>
            </h1>
            
            {/* Coming Soon Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-600/20 to-blue-600/20 border border-slate-500/30 rounded-full backdrop-blur-xl">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300 font-medium tracking-wide">Coming Soon</span>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
            
            {/* Glowing Accent Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-slate-400 via-blue-400 to-slate-600 mx-auto rounded-full shadow-lg shadow-slate-400/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Studio Interface */}
      <section className="section-luxury py-24 bg-black/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-blue-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-slate-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-slate-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="dj-studio-interface max-w-7xl mx-auto">
            {/* DJ Mixer Console */}
            <div className="dj-mixer mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-blue-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="mixer-header flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-slate-400 font-mono">DAIM MIXER PRO</h3>
                  <div className="mixer-status flex items-center gap-4">
                    <div className="status-led w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400 font-mono">ONLINE</span>
                  </div>
                </div>
                
                {/* Channel Strips */}
                <div className="channel-strips grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { name: 'CHANNEL A', color: 'from-slate-500 to-blue-500', icon: '🎵' },
                    { name: 'CHANNEL B', color: 'from-blue-500 to-slate-500', icon: '🎵' },
                    { name: 'MASTER', color: 'from-slate-400 to-blue-600', icon: '🎚️' }
                  ].map((channel, index) => (
                    <div key={channel.name} className="channel-strip bg-gray-800/50 rounded-2xl p-6 border border-white/10">
                      <div className="channel-header flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-white font-mono">{channel.name}</span>
                        <div className="text-2xl">{channel.icon}</div>
                      </div>
                      
                      {/* Fader */}
                      <div className="fader-container relative h-32 mb-4">
                        <div className="fader-track w-2 bg-gray-700 rounded-full mx-auto h-full relative">
                          <div className={`fader-knob absolute w-6 h-6 bg-gradient-to-br ${channel.color} rounded-full border-2 border-white/30 cursor-pointer transform -translate-x-1/2 shadow-lg hover:scale-110 transition-transform duration-200`}
                               style={{ top: '30%' }}>
                            <div className="absolute inset-1 bg-white/20 rounded-full"></div>
                          </div>
                        </div>
                        <div className="fader-labels absolute inset-0 flex flex-col justify-between text-xs text-gray-400 font-mono">
                          <span>0</span>
                          <span>-20</span>
                          <span>-40</span>
                          <span>-60</span>
                        </div>
                      </div>
                      
                      {/* EQ Knobs */}
                      <div className="eq-section flex justify-between items-center">
                        {['LOW', 'MID', 'HIGH'].map((band, bandIndex) => (
                          <div key={band} className="eq-knob text-center">
                            <div className="eq-label text-xs text-gray-400 mb-2">{band}</div>
                            <div className="eq-control w-8 h-8 bg-gray-700 rounded-full border border-white/20 cursor-pointer hover:bg-gray-600 transition-colors duration-200 relative">
                              <div className="absolute inset-1 bg-white/10 rounded-full"></div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Crossfader */}
                <div className="crossfader-section text-center">
                  <div className="crossfader-label text-sm text-gray-400 mb-3 font-mono">CROSSFADER</div>
                  <div className="crossfader-track w-full h-3 bg-gray-700 rounded-full relative">
                    <div className="crossfader-knob absolute w-8 h-8 bg-gradient-to-r from-slate-500 to-blue-500 rounded-full border-2 border-white/30 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-110 transition-transform duration-200"
                         style={{ left: '50%' }}>
                      <div className="absolute inset-1 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Turntables */}
            <div className="turntables-section mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: 'TURNTABLE A', color: 'from-slate-500 to-blue-500', icon: '💿' },
                  { name: 'TURNTABLE B', color: 'from-blue-500 to-slate-500', icon: '💿' }
                ].map((turntable, index) => (
                  <div key={turntable.name} className="turntable relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-gray-800/90 to-black/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                      <div className="turntable-header flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-white font-mono">{turntable.name}</h4>
                        <div className="text-3xl">{turntable.icon}</div>
                      </div>
                      
                      {/* Vinyl Record */}
                      <div className="vinyl-record w-32 h-32 mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-full border-4 border-gray-600 shadow-inner"></div>
                        <div className="absolute inset-4 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-2 border-gray-500"></div>
                        <div className="absolute inset-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border border-gray-400"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                        </div>
                        
                        {/* Rotation Animation */}
                        <div className="absolute inset-0 rounded-full border-2 border-slate-400/30 animate-spin" style={{animationDuration: '3s'}}></div>
                      </div>
                      
                      {/* Speed Controls */}
                      <div className="speed-controls flex justify-center gap-4">
                        {['33', '45', '78'].map((speed) => (
                          <button key={speed} className="speed-btn px-4 py-2 bg-gray-700 text-white rounded-lg border border-white/20 hover:bg-gray-600 transition-colors duration-200 font-mono">
                            {speed}
                          </button>
                        ))}
                      </div>
                      
                      {/* Pitch Control */}
                      <div className="pitch-control mt-6">
                        <div className="pitch-label text-sm text-gray-400 mb-3 text-center font-mono">PITCH</div>
                        <div className="pitch-slider w-full h-2 bg-gray-700 rounded-full relative">
                          <div className="pitch-knob absolute w-4 h-4 bg-slate-400 rounded-full border border-white/30 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-110 transition-transform duration-200"
                               style={{ left: '50%' }}>
                          </div>
                        </div>
                        <div className="pitch-value text-center mt-2 text-sm text-gray-400 font-mono">±8%</div>
                      </div>
                    </div>
                </div>
                ))}
              </div>
              </div>
              
            {/* Effects Rack */}
            <div className="effects-rack mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-gray-800/90 to-black/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="effects-header text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-400 font-mono mb-2">EFFECTS RACK</h3>
                  <p className="text-gray-400 text-sm">AI-Powered Audio Processing</p>
                </div>
                
                <div className="effects-grid grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: 'REVERB', icon: '🌊', color: 'from-slate-500 to-blue-500', active: true },
                    { name: 'DELAY', icon: '⏰', color: 'from-blue-500 to-slate-500', active: false },
                    { name: 'FILTER', icon: '🔧', color: 'from-slate-400 to-blue-600', active: true },
                    { name: 'DISTORTION', icon: '⚡', color: 'from-blue-600 to-slate-400', active: false }
                  ].map((effect) => (
                    <div key={effect.name} className="effect-module text-center">
                      <div className={`effect-button w-16 h-16 mx-auto mb-3 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        effect.active 
                          ? 'bg-gradient-to-br ' + effect.color + ' border-white/50 shadow-lg' 
                          : 'bg-gray-700 border-white/20 hover:border-white/40'
                      }`}>
                        <div className="text-2xl mt-2">{effect.icon}</div>
                      </div>
                      <div className="effect-name text-sm text-gray-300 font-mono">{effect.name}</div>
                      <div className="effect-status text-xs text-gray-500 mt-1">
                        {effect.active ? 'ACTIVE' : 'STANDBY'}
                      </div>
              </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Generation Controls */}
            <div className="ai-controls text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
              
              <div className="relative flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="btn-luxury btn-primary group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-blue-500 rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:blur-xl transition-all duration-300"></div>
                  <span className="relative px-10 py-5 text-white font-bold text-lg rounded-2xl flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    🎧 Generate Track
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </span>
                </button>
                
                <button className="btn-luxury group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl border border-white/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl border border-white/20 blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <span className="relative px-10 py-5 text-white font-bold text-lg rounded-2xl flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    🎛️ Fine Tune
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </span>
                </button>
              </div>
              
              {/* Studio Status */}
              <div className="mt-8 flex justify-center items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400 font-mono">STUDIO READY</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span className="text-sm text-gray-400 font-mono">AI ENGINE ACTIVE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  <span className="text-sm text-gray-400 font-mono">NEURAL NET READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Registration Section */}
      <section className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Notification Signup */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-light mb-4 text-slate-200">{t('studio.page.email.title')}</h3>
              <p className="text-gray-300 mb-6">
                {t('studio.page.email.description')}
              </p>
              
              {/* メッセージ表示 */}
              {message && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  messageType === 'success' 
                    ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border-red-500/30 text-red-300'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder={t('studio.page.email.placeholder')} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isLoading || !email.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-slate-500 to-blue-500 text-white font-semibold rounded-lg hover:from-slate-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t('studio.page.email.loading')}
                      </div>
                    ) : (
                      t('studio.page.email.button')
                    )}
                </button>
              </div>
                
                {/* プライバシーポリシー */}
                <p className="text-xs text-gray-400 text-center max-w-md mx-auto">
                  {t('studio.page.email.privacy')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
