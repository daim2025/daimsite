'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/studio', label: 'Studio' },
    { href: '#about', label: 'About' },
    { href: '#process', label: 'Process' },
    { href: '#ponyo-prince-spotlight', label: 'ぽにょ皇子' },
    { href: '#cms-features', label: 'Manage' },
  ];

  return (
    <nav className="luxury-nav fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="nav-container flex justify-between items-center">
          <div className="nav-logo">
            <a href="/" className="block hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/images/logo_daim.svg"
                alt="DAIM"
                width={120}
                height={48}
                className="h-10 w-auto brightness-0 invert drop-shadow-lg"
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="nav-links hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <li key={`nav-${index}-${link.label}`}>
                <a 
                  href={link.href} 
                  className="nav-link text-white/90 hover:text-white transition-colors duration-300 font-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <li key={`mobile-nav-${index}-${link.label}`}>
                  <a 
                    href={link.href} 
                    className="nav-link block text-white/90 hover:text-white transition-colors duration-300 font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
