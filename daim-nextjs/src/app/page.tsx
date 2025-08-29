'use client';

import Image from 'next/image';
import React from 'react';

export default function TeaserPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Digital music background */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Flowing data streams */}
        <div className="absolute inset-0">
          {/* Horizontal data lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/3 to-transparent animate-pulse" style={{animationDelay: '1s', animationDuration: '6s'}}></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/4 to-transparent animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/3 to-transparent animate-pulse" style={{animationDelay: '3s', animationDuration: '7s'}}></div>
          
          {/* Vertical data lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/4 to-transparent animate-pulse" style={{animationDelay: '0.5s', animationDuration: '8s'}}></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-teal-500/3 to-transparent animate-pulse" style={{animationDelay: '2.5s', animationDuration: '6s'}}></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/3 to-transparent animate-pulse" style={{animationDelay: '4.5s', animationDuration: '9s'}}></div>
        </div>
        
        {/* Digital particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-32 w-1 h-1 bg-cyan-400/20 rounded-full animate-ping" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-24 w-1 h-1 bg-blue-400/15 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-20 w-1 h-1 bg-purple-400/20 rounded-full animate-ping" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
          <div className="absolute bottom-20 right-40 w-1 h-1 bg-indigo-400/15 rounded-full animate-ping" style={{animationDelay: '0.5s', animationDuration: '6s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-teal-400/10 rounded-full animate-ping" style={{animationDelay: '4s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-green-400/15 rounded-full animate-ping" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
        </div>

                {/* Audio waveform suggestion */}
        <div className="absolute bottom-0 left-0 w-full h-2 flex items-end justify-center space-x-1 opacity-[0.03]">
          {[...Array(100)].map((_, i) => {
            // インデックスベースの固定値を使用してSSRとクライアントで同じ値になるようにする
            const height = 2 + ((i * 7 + 13) % 8);
            const duration = 2 + ((i * 3 + 7) % 3);
            return (
              <div 
                key={i}
                className="w-1 bg-white animate-pulse"
                style={{
                  height: `${height}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${duration}s`
                }}
              ></div>
            );
          })}
        </div>
          </div>
          
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo */}
        <div className="mb-12">
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
          
                {/* Coming Soon Message */}
        <div className="text-center">
          <p className="text-2xl font-thin text-gray-700/30 tracking-[0.3em] uppercase">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}