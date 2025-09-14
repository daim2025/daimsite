import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const footerSections = [
    {
      heading: t('footer.contents'),
      links: [
        { href: '/about', label: 'About' },
        { href: '/news', label: 'News' },
        { href: '/studio', label: 'Studio' },
        { href: '/ponyo-prince', label: 'Project' },
        { href: '/contact', label: 'Contact Us' },
      ]
    },
    {
      heading: t('footer.artists'),
      links: [
        { href: '/ponyo-prince', label: t('footer.ponyo') },
        { href: '/yamato-maya', label: t('footer.yamato') },
      ]
    },
    {
      heading: t('footer.support'),
      links: [
        { href: '#', label: 'Privacy Policy' },
        { href: '#', label: 'Terms of Service' },
        { href: '#', label: 'Cookie Policy' },
        { href: 'https://dmc-3.gitbook.io/dmc_wp', label: 'WhitePaper' },
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      label: 'Twitter', 
      href: 'https://x.com/DmcDao' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ), 
      label: 'Telegram', 
      href: 'https://t.me/dmccofficial' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
        </svg>
      ), 
      label: 'Medium', 
      href: 'https://medium.com/@dmcc.writer' 
    },
  ];

  return (
    <footer className="footer-luxury py-16 border-t border-white/10 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="footer-content grid md:grid-cols-4 gap-12 mb-12">
          {/* Main Section */}
          <div className="footer-section main-section">
            <div className="footer-brand mb-8">
              <Image
                src="/images/logo_daim.svg"
                alt="DAIM"
                width={120}
                height={48}
                className="footer-logo mb-4 brightness-0 invert"
              />
              <div className="footer-tagline">
                <p className="tagline-main text-white text-lg font-medium mb-2">
                  Decentralized AI Music
                </p>
                <p className="tagline-sub text-gray-300 mb-4">
                  {t('footer.tagline')}
                </p>
                
{/* Service Logos */}
                <div className="service-logos flex flex-col gap-3">
                  <a
                    href="http://www.discoverfeed.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity duration-300"
                  >
                    <Image
                      src="/images/DiscoverFeed-logo-s.png"
                      alt="DiscoverFeed Logo"
                      width={120}
                      height={80}
                      style={{ maxWidth: '120px', width: 'auto', height: 'auto' }}
                      className="logo-responsive brightness-0 invert rounded"
                    />
                  </a>
                  
                  <a
                    href="https://www.dmclab.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity duration-300"
                  >
                    <Image
                      src="/images/DMC-logo.png"
                      alt="DMC Logo"
                      width={60}
                      height={60}
                      style={{ maxWidth: '60px', width: 'auto', height: 'auto' }}
                      className="logo-responsive brightness-0 invert rounded"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="social-links flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Other Sections */}
          {footerSections.map((section) => (
            <div key={section.heading} className="footer-section">
                          <h4 className="footer-heading text-white text-lg font-display font-semibold mb-6 tracking-wide">
              {section.heading}
            </h4>
              <ul className="footer-links space-y-3">
                {section.links.map((link, index) => (
                  <li key={`${section.heading}-${index}-${link.label}`}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="footer-link text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Service Links */}
        <div className="footer-services">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="text-left">
              <p className="copyright text-gray-400 text-sm">
                {t('footer.copyright')}
              </p>
            </div>
            <div className="footer-service-links flex flex-col gap-3 text-right">
              <a 
                href="http://www.discoverfeed.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
              >
                DAIM is a DiscoverFeed service
              </a>
              <a 
                href="https://www.dmclab.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
              >
                DAIM is join the DMC ECOSYSTEM
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
