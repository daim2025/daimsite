'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isRootPage = pathname === '/';

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '/studio', label: 'Studio' },
    { href: '#process', label: 'Process' },
    { href: '#cms-features', label: 'Manage' },
    { href: '#ponyo-prince-spotlight', label: 'ぽにょ皇子' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="nav-professional fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="nav-container flex justify-between items-center">
          <div className="nav-logo">
            <Link href="/" className="logo-link flex items-center gap-3 group">
              <Image
                src="/images/logo_daim.svg"
                alt="DAIM"
                width={44}
                height={44}
                className="logo-img transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 brightness-0 invert"
              />
              <span className="logo-text text-xl font-display font-semibold text-white/95 group-hover:text-white transition-all duration-300 tracking-tight">DAIM</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="nav-links hidden md:flex space-x-8">
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
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
