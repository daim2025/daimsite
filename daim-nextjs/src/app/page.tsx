'use client';

import Image from 'next/image';
import React from 'react';

export default function TeaserPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Sophisticated dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-950 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-gray-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
      </div>

      {/* Elegant animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-950/20 to-purple-950/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-slate-950/30 to-gray-950/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s', animationDuration: '10s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-blue-950/15 to-indigo-950/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s', animationDuration: '12s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-br from-gray-950/25 to-slate-950/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '9s', animationDuration: '14s'}}></div>
      </div>

      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-gradient-to-br from-white to-transparent mix-blend-overlay"></div>

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
          <div className="relative inline-block px-10 py-6 bg-gradient-to-r from-gray-950/90 to-slate-950/90 backdrop-blur-2xl border border-gray-800/40 rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/10 to-purple-950/10 rounded-3xl"></div>
            <div className="relative">
              <p className="text-xl font-medium text-gray-100">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}