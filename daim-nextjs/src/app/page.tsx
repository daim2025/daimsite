'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    try {
      const video = e.currentTarget;
      // 超スローモーション設定（0.2倍速）
      video.playbackRate = 0.2;
      setIsVideoLoaded(true);
      
      // 再生開始を確実にする
      video.play().catch(error => {
        console.log('Video autoplay blocked:', error);
      });
    } catch (error) {
      console.log('Video setup error:', error);
      setIsVideoLoaded(true); // エラーでも表示は続ける
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.log('Video error:', e);
    setVideoError(true);
  };

  // 動画設定の確実な適用
  useEffect(() => {
    const video = heroVideoRef.current;
    if (video) {
      const setVideoSettings = () => {
        video.playbackRate = 0.2; // 超スローモーション
      };
      
      // 動画が読み込まれたら設定適用
      if (video.readyState >= 1) {
        setVideoSettings();
      }
      
      video.addEventListener('loadedmetadata', setVideoSettings);
      video.addEventListener('canplay', setVideoSettings);
      
      return () => {
        video.removeEventListener('loadedmetadata', setVideoSettings);
        video.removeEventListener('canplay', setVideoSettings);
      };
    }
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-luxury relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Video */}
        <div className="hero-video-container absolute inset-0">
          <video
            ref={heroVideoRef}
            className={`hero-video w-full h-full object-cover brightness-[0.15] contrast-125 saturate-90 transition-all duration-500 ${
              videoError ? 'video-error' : isVideoLoaded ? 'video-playing' : 'video-loading'
            }`}
            autoPlay
            muted
            loop
            playsInline
            onLoadedMetadata={handleVideoLoad}
            onError={handleVideoError}
          >
            <source src="/images/ym_movie.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40"></div>
          
          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <div className="text-red-400 text-6xl mb-4">⚠️</div>
                <p className="text-red-400 font-mono">Video Error</p>
                <p className="text-gray-400 text-sm mt-2">Please refresh the page</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="hero-grid grid md:grid-cols-2 gap-16 items-center">
            <div className="hero-content">
            <Image
                src="/images/logo_daim.svg"
                alt="DAIM Logo"
                width={320}
                height={128}
                className="hero-logo mb-8 brightness-0 invert drop-shadow-2xl transition-all duration-500 hover:scale-105"
                priority
              />
              <p className="hero-subtitle text-xl font-medium text-gray-300 mb-4 tracking-wide">Intelligent Music Platform</p>
              <h1 className="hero-title text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight gradient-text">DAIM</h1>
              <p className="hero-description text-xl font-light text-gray-300 mb-12 max-w-2xl leading-relaxed tracking-wide">
                Where artificial intelligence meets musical intuition. Experience the future of sound creation through sophisticated algorithms and creative innovation.
              </p>
              <div className="flex gap-6 flex-wrap">
                <a href="#studio" className="btn-professional px-8 py-4 text-white font-semibold rounded-lg">
                  <span>Enter Studio</span>
                </a>
                <a href="/idol" className="px-8 py-4 border border-slate-400/30 text-white font-medium rounded-lg hover:bg-slate-400/10 transition-all duration-300 glass-morphism">
                  <span>🎤 Idol Demo</span>
                </a>
                <a href="#about" className="px-8 py-4 border border-slate-400/30 text-white font-medium rounded-lg hover:bg-slate-400/10 transition-all duration-300 glass-morphism">
                  <span>Discover More</span>
                </a>
              </div>
            </div>
            
            <div className="groove-visual relative z-10 hidden md:block">
              <div className="vinyl-record w-80 h-80 border-4 border-slate-400 border-opacity-30 rounded-full mx-auto relative bg-slate-400/5 backdrop-blur-xl">
                <div className="absolute inset-4 border-2 border-slate-400 border-opacity-20 rounded-full"></div>
                <div className="absolute inset-8 border border-slate-400 border-opacity-10 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                </div>
              </div>
              <div className="groove-eq flex items-end justify-center gap-1 mt-8 h-20">
                {[45, 65, 35, 70, 25, 60, 50].map((height, i) => (
                  <div 
                    key={i} 
                    className="eq-bar w-2 bg-slate-400 rounded-t opacity-60 animate-pulse" 
                    style={{
                      height: `${height}px`, 
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About DAIM */}
      <section id="about" className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-400 mb-4">01</div>
            <p className="section-subtitle text-gray-300 text-lg mb-2">Philosophy</p>
            <h2 className="section-title text-4xl md:text-5xl font-display font-semibold">DAIMとは</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                DAIMは音楽×AI×クリエーター×未来をコンセプトとした洗練された音楽創造プラットフォームです。
                <br /><br />
                最先端のAI技術とクリエーターの感性を融合させ、誰でも直感的にプロフェッショナルな楽曲を制作できる環境を提供します。シンプルな操作で、深い音楽理論に基づいた sophisticated な楽曲を生み出すことができます。
              </p>
              
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="card-title text-2xl font-display font-semibold mb-6">Intelligent Composition</h3>
                <p className="card-description text-gray-300 leading-relaxed">
                  最先端のAI技術と人間の感性を融合させ、誰でも直感的にプロフェッショナルな楽曲を制作できる環境を提供します。シンプルな操作で、深い音楽理論に基づいた sophisticated な楽曲を生み出すことができます。
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-80 h-80 border-2 border-slate-400 border-opacity-30 rounded-full flex items-center justify-center relative bg-slate-400/5 backdrop-blur-xl">
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-400 mb-2">
                    Intelligent<br />
                    <span className="text-lg text-gray-300 font-light">Music Creation</span>
                  </div>
                </div>
                <div className="absolute bottom-16 flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" 
                      style={{animationDelay: `${i * 0.2}s`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Interface */}
      <section id="studio" className="section-luxury py-24 bg-black/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-blue-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-slate-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-slate-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="section-header text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-400 mb-4">02</div>
            <p className="section-subtitle text-gray-300 text-lg mb-2">Creation</p>
            <h2 className="section-title text-4xl md:text-5xl font-display font-semibold">Intelligent Studio</h2>
          </div>
          
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

      {/* Creation Process */}
      <section id="process" className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-400 mb-4">03</div>
            <p className="section-subtitle text-gray-300 text-lg mb-2">Methodology</p>
            <h2 className="section-title text-4xl md:text-5xl font-display font-semibold">Creation Process</h2>
          </div>
          
          <div className="mb-16">
            <p className="text-xl text-gray-300 leading-relaxed text-center max-w-3xl mx-auto font-light">
              DAIMでの音楽制作は、直感的でありながら深い音楽理論に基づいたインテリジェントなプロセスです。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="card-intelligent text-center p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="card-title text-2xl font-display font-semibold mb-6">Inspiration Input</h3>
              <p className="card-description text-gray-300 leading-relaxed">
                あなたの音楽的インスピレーションを自然言語で入力。AIが音楽理論、感情表現、楽器編成を分析し、最適な音楽構造を提案します。
              </p>
            </div>
            
            <div className="card-intelligent text-center p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="card-title text-2xl font-display font-semibold mb-6">Intelligent Processing</h3>
              <p className="card-description text-gray-300 leading-relaxed">
                高度なアルゴリズムが和声進行、メロディライン、リズムパターンを生成。人間の感性とAIの論理的思考が融合した楽曲が誕生します。
              </p>
            </div>
            
            <div className="card-intelligent text-center p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="card-title text-2xl font-display font-semibold mb-6">Refinement & Export</h3>
              <p className="card-description text-gray-300 leading-relaxed">
                生成された楽曲を直感的に調整・編集。プロフェッショナル品質のマスタリングを施し、あらゆる形式で出力可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Distribution */}
      <section className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-400 mb-4">04</div>
            <p className="section-subtitle text-gray-300 text-lg mb-2">Distribution</p>
            <h2 className="section-title text-4xl md:text-5xl font-display font-semibold">Professional Distribution</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 mb-8">
                <h3 className="card-title text-2xl font-display font-semibold mb-6">Global Reach</h3>
                <p className="card-description text-gray-300 leading-relaxed">
                  生成された楽曲を世界中のプラットフォームに配信。Spotify、Apple Music、YouTubeなど、あらゆるチャンネルでリスナーに届けることができます。
                </p>
              </div>
              
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="card-title text-2xl font-display font-semibold mb-6">Revenue Optimization</h3>
                <p className="card-description text-gray-300 leading-relaxed">
                  インテリジェントな分析ツールでリスナーの反応を追跡し、最適な配信戦略を提案。収益を最大化するためのデータドリブンなアプローチを提供します。
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-80 h-80 border-2 border-slate-400 border-opacity-30 rounded-full flex items-center justify-center relative bg-slate-400/5 backdrop-blur-xl">
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-400 mb-2">
                    Global<br />
                    <span className="text-lg text-gray-300 font-light">Distribution</span>
                  </div>
                </div>
                <div className="absolute bottom-16 flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" 
                      style={{animationDelay: `${i * 0.2}s`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Management */}
      <section id="cms-features" className="section-luxury py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-400 mb-4">05</div>
            <p className="section-subtitle text-gray-300 text-lg mb-2">Management</p>
            <h2 className="section-title text-4xl md:text-5xl font-display font-semibold">Content Management</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="card-intelligent text-center p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="card-title text-2xl font-display font-semibold mb-6">Track Management</h3>
              <p className="card-description text-gray-300 leading-relaxed">
                生成された楽曲を効率的に管理。メタデータの編集、タグ付け、カテゴリ分類など、プロフェッショナルな楽曲管理をサポートします。
              </p>
            </div>
            
            <div className="card-intelligent text-center p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="card-title text-2xl font-display font-semibold mb-6">Analytics Dashboard</h3>
              <p className="card-description text-gray-300 leading-relaxed">
                詳細なリスナー分析とパフォーマンス指標を提供。楽曲の反応、地域別の再生数、リスナーの行動パターンなどを可視化します。
              </p>
            </div>
            
            <div className="card-intelligent text-center p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="card-title text-2xl font-display font-semibold mb-6">Collaboration Tools</h3>
              <p className="card-description text-gray-300 leading-relaxed">
                チームでの楽曲制作をサポート。共同編集、コメント機能、バージョン管理など、効率的なコラボレーション環境を提供します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Idol Demo Section */}
      <section className="section-luxury py-24 bg-black/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-400 mb-4">06</div>
            <p className="section-subtitle text-gray-300 text-lg mb-2">Demo</p>
            <h2 className="section-title text-4xl md:text-5xl font-display font-semibold">Idol Demo</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We have created idol-oriented music using the latest AI technology. 
              Experience the future of idol music creation.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎤</div>
                <h3 className="text-2xl font-light mb-4">STAMP - AI Generated Idol Music</h3>
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
                  <a 
                    href="/idol" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-500 to-blue-600 text-white font-bold rounded-2xl hover:from-slate-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="text-xl">🎧</span>
                    <span>Listen to STAMP</span>
                    <span className="text-xl">→</span>
                  </a>
                  <p className="text-gray-400 text-sm mt-4">
                    Experience the full lyrics and AI-generated music
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ponyo Prince Spotlight */}
      <section id="ponyo-prince-spotlight" className="section-luxury py-24">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <div className="section-number text-6xl font-light text-gray-400 mb-4">07</div>
            <p className="section-subtitle text-gray-300 text-lg mb-2">Artist Spotlight</p>
            <h2 className="section-title text-4xl md:text-5xl font-display font-semibold">ぽにょ皇子</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center">
              <div className="w-80 h-80 border-2 border-slate-500 border-opacity-30 rounded-full flex items-center justify-center relative bg-gradient-to-br from-slate-600/15 to-blue-700/8 backdrop-blur-xl overflow-hidden">
                <Image 
                  src="/images/ponyo1.jpeg" 
                  alt="ぽにょ皇子" 
                  width={320} 
                  height={320} 
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600/20 to-blue-700/20 rounded-full"></div>
                <div className="absolute bottom-16 flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 h-2 bg-gradient-to-r from-slate-500 to-blue-600 rounded-full animate-pulse" 
                      style={{animationDelay: `${i * 0.2}s`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10 mb-8">
                <h3 className="card-title text-2xl font-display font-semibold mb-6">Artist Profile</h3>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  コスプレイヤー、DJ、グラビア等の様々な活動をしているぽにょ皇子。フォロワー数35万人超え。DJだけでなくパワフルなMCもこなしながらフロアを沸かせる予測不能なパフォーマンスには目が離せません。
                </p>
                <div className="bg-gradient-to-r from-slate-600/20 to-blue-700/20 rounded-lg p-4 border border-slate-500/20">
                  <p className="text-sm text-slate-300 font-medium mb-2">🏆 DJanesAWARD2021 国内ガールズDJランキング7位</p>
                  <p className="text-sm text-slate-300">📀 1stシングル「Put on your beat！！！」</p>
                  <p className="text-sm text-slate-300">📀 2ndシングル「変幻自在」- iTunes Store ダンスジャンル1位</p>
                </div>
              </div>
              
              <div className="card-intelligent p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="card-title text-2xl font-display font-semibold mb-6">AI Music Generation</h3>
                <p className="card-description text-gray-300 leading-relaxed mb-4">
                  「A.I.（Android Imagination）」をテーマに、AI音楽生成デモンストレーションを実施。架空のバトルアニメの主題歌として、7つのバージョンの楽曲を生成しました。
                </p>
                <div className="text-center mt-6">
                  <a href="/ponyo-prince" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-500 to-blue-600 text-white font-bold rounded-2xl hover:from-slate-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <span className="text-xl">🎵</span>
                    <span>詳細を見る</span>
                    <span className="text-xl">→</span>
                  </a>
                  <p className="text-gray-400 text-sm mt-4">
                    楽曲の詳細、歌詞、推し曲投票など
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}