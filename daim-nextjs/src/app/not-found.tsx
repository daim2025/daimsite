import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo_daim.svg"
            alt="DAIM"
            width={300}
            height={120}
            className="brightness-0 invert drop-shadow-2xl mx-auto"
            priority
          />
        </div>

        {/* 404 Message */}
        <div className="mb-8">
          <h1 className="text-6xl font-light text-slate-300 mb-4">404</h1>
          <p className="text-xl text-slate-400 mb-6">
            This page is not available yet
          </p>
          <p className="text-sm text-slate-500 mb-8">
            サービス開始まで、しばらくお待ちください
          </p>
        </div>

        {/* Back to home */}
        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/30 rounded-2xl shadow-2xl text-white hover:from-slate-700/80 hover:to-slate-600/80 transition-all duration-300"
        >
          Back to Home
        </Link>

        {/* Coming Soon */}
        <div className="mt-12">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-slate-700/30 rounded-xl">
            <p className="text-sm text-slate-400">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

