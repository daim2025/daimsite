'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isRootPage = pathname === '/';
  const { language, setLanguage, t } = useLanguage();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { href: '/studio', label: t('nav.studio') },
    { href: '/about', label: t('nav.about') },
    { href: '/news', label: t('nav.news') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const projectLinks = [
    { href: '/ponyo-prince', label: t('nav.ponyo') },
    { href: '/yamato-maya', label: t('nav.yamato') },
  ];

  // ドロップダウンの開閉処理
  const handleDropdownEnter = () => {
    // 既存のタイマーをクリア
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsProjectDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    // 少し遅延してから閉じる（マウス移動の猶予を与える）
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProjectDropdownOpen(false);
    }, 300); // 300ms の遅延
  };

  // コンポーネントのクリーンアップ
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

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
                style={{ maxWidth: '100px', width: 'auto', height: 'auto' }}
                className="logo-img logo-responsive transition-all duration-500 group-hover:scale-110 brightness-0 invert"
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
            
            {/* Project Dropdown */}
            <li 
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className="nav-link-professional text-white/90 hover:text-white transition-colors duration-300 font-medium tracking-wide flex items-center gap-1"
              >
                {t('nav.project')}
                <svg className={`w-4 h-4 transition-transform duration-200 ${isProjectDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isProjectDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  {projectLinks.map((project, index) => (
                    <Link
                      key={`project-${index}-${project.label}`}
                      href={project.href}
                      className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => setIsProjectDropdownOpen(false)}
                    >
                      {project.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
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
              
              {/* Mobile Project Section */}
              <li>
                <div className="text-white/90 font-light py-2 border-t border-white/10 mt-2 pt-4">
                  <div className="text-white/70 text-sm mb-2 uppercase tracking-wider">{t('nav.project')}</div>
                  {projectLinks.map((project, index) => (
                    <Link
                      key={`mobile-project-${index}-${project.label}`}
                      href={project.href}
                      className="block text-white/90 hover:text-white transition-colors duration-300 font-light py-2 pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {project.label}
                    </Link>
                  ))}
                </div>
              </li>
              
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
