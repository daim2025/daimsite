'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function About() {
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
              <span className="text-slate-400">DAIM</span><span className="font-light">とは</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light tracking-widest uppercase">
              Decentralized AI Music
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 font-light">
                  <strong className="text-slate-400 font-bold">音楽×AI×クリエーター×未来</strong>をコンセプトとした洗練された音楽創造プラットフォーム
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  最先端のAI技術とクリエーターの感性を融合させ、誰でも直感的にプロフェッショナルな楽曲を制作できる環境を提供します。シンプルな操作で、深い音楽理論に基づいた sophisticated な楽曲を生み出すことができます。
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-slate-400/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 text-slate-400">Intelligent Composition</h3>
                <p className="text-gray-300 leading-relaxed">
                  最先端のAI技術と人間の感性を融合させ、誰でも直感的にプロフェッショナルな楽曲を制作できる環境を提供します。
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
            <div className="text-slate-400 text-sm font-bold tracking-wider mb-4 uppercase">Methodology</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Creation Process</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              DAIMでの音楽制作は、直感的でありながら深い音楽理論に基づいたインテリジェントなプロセス
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-slate-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">💭</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-400">Inspiration Input</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                音楽的インスピレーションを自然言語で入力。AIが音楽理論、感情表現、楽器編成を分析し、最適な音楽構造を提案
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-purple-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🧠</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Intelligent Processing</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                高度なアルゴリズムが和声進行、メロディライン、リズムパターンを生成。人間の感性とAIの論理的思考が融合
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-green-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-green-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🎵</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Refinement & Export</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                生成された楽曲を直感的に調整・編集。プロフェッショナル品質のマスタリングを施し、あらゆる形式で出力可能
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Distribution */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-slate-400 text-sm font-bold tracking-wider mb-4 uppercase">Distribution</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Professional Distribution</h2>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-400/10 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-xl">🌍</div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-400">Global Reach</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  生成された楽曲を世界中のプラットフォームに配信。Spotify、Apple Music、YouTubeなど、あらゆるチャンネルでリスナーに届けることができます。
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-400/10 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-xl">📈</div>
                  </div>
                  <h3 className="text-xl font-bold text-green-400">Revenue Optimization</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  インテリジェントな分析ツールでリスナーの反応を追跡し、最適な配信戦略を提案。収益を最大化するためのデータドリブンなアプローチを提供。
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
            <div className="text-slate-400 text-sm font-bold tracking-wider mb-4 uppercase">Management</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Content Management</h2>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-blue-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🎵</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Track Management</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                生成された楽曲を効率的に管理。メタデータの編集、タグ付け、カテゴリ分類など、プロフェッショナルな楽曲管理をサポート
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-purple-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">📊</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Analytics Dashboard</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                詳細なリスナー分析とパフォーマンス指標を提供。楽曲の反応、地域別の再生数、リスナーの行動パターンなどを可視化
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-green-400/20 transition-all duration-300">
              <div className="w-16 h-16 bg-green-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🤝</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Collaboration Tools</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                チームでの楽曲制作をサポート。共同編集、コメント機能、バージョン管理など、効率的なコラボレーション環境を提供
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}