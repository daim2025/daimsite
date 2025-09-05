'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isRootPage = pathname === '/';
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '/studio', label: t('nav.studio') },
    { href: '/about', label: t('nav.about') },
    { href: '/ponyo-prince', label: t('nav.ponyo') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="nav-professional fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="nav-container flex justify-between items-center">
          <div className="nav-logo">
            <Link href="/" className="logo-link flex items-center group">
              <Image
                src="/images/logo_daim.svg"
                alt="DAIM"
                width={100}
                height={100}
                className="logo-img transition-all duration-500 group-hover:scale-110 brightness-0 invert"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="nav-links flex space-x-8">
            {navLinks.map((link, index) => (
              <li key={`nav-${index}-${link.label}`}>
                {link.href.startsWith('#') ? (
                  <a 
                    href={isRootPage ? link.href : `/${link.href}`}
                    className="nav-link-professional text-white/90 hover:text-white transition-colors duration-300 font-medium tracking-wide"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link 
                    href={link.href}
                    className="nav-link-professional text-white/90 hover:text-white transition-colors duration-300 font-medium tracking-wide"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            </ul>

            {/* Language Toggle */}
            <div className="language-toggle">
              <button
                onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white/90 hover:text-white font-medium"
                aria-label="Switch Language"
              >
                <span className="text-sm font-mono">{language.toUpperCase()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/90 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
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
          <div className="md:hidden mt-4 pb-6 border-t border-white/10 glass-morphism rounded-lg mx-4">
            <ul className="space-y-2 p-4">
              {navLinks.map((link, index) => (
                <li key={`mobile-nav-${index}-${link.label}`}>
                  {link.href.startsWith('#') ? (
                    <a 
                      href={isRootPage ? link.href : `/${link.href}`}
                      className="nav-link block text-white/90 hover:text-white transition-colors duration-300 font-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href}
                      className="nav-link block text-white/90 hover:text-white transition-colors duration-300 font-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                                  )}
              </li>
              ))}
              
              {/* Mobile Language Toggle */}
              <li className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setLanguage(language === 'ja' ? 'en' : 'ja');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white/90 hover:text-white font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                  </svg>
                  <span className="font-mono">{language === 'ja' ? 'English' : '日本語'}</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
