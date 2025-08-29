'use client';

import Image from 'next/image';
import React from 'react';

export default function TeaserPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent animate-pulse"></div>
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-slate-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-600/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo_daim.svg"
            alt="DAIM"
            width={400}
            height={160}
            className="brightness-0 invert drop-shadow-2xl"
            priority
            sizes="(max-width: 768px) 300px, 400px"
          />
        </div>

        {/* Subtitle */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-light text-slate-300 mb-4 tracking-wider">
            Intelligent Music Platform
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">
            Where artificial intelligence meets musical intuition
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mb-16">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/30 rounded-2xl shadow-2xl">
            <p className="text-xl font-medium text-white mb-2">Coming Soon</p>
            <p className="text-sm text-slate-300">革新的な音楽創造体験をお届けします</p>
          </div>
        </div>

        {/* Minimalist animated element */}
        <div className="flex items-center justify-center space-x-3">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" 
              style={{animationDelay: `${i * 0.5}s`, animationDuration: '2s'}}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-slate-500 font-light">
          © 2025 DAIM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
