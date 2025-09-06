import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const footerSections = [
    {
      heading: t('footer.product'),
      links: [
        { href: '/contact', label: 'Contact Us' },
        { href: '/about', label: 'About' },
        { href: '/studio', label: 'Studio' },
        { href: '/ponyo-prince', label: 'Project' },
      ]
    },
    {
      heading: t('footer.artists'),
      links: [
        { href: '/ponyo-prince', label: t('footer.ponyo') },
      ]
    },
    {
      heading: t('footer.support'),
      links: [
        { href: '#', label: 'Privacy Policy' },
        { href: '#', label: 'Terms of Service' },
        { href: '#', label: 'Cookie Policy' },
      ]
    }
  ];

  const socialLinks = [
    { icon: '𝕏', label: 'Twitter', href: '#' },
    { icon: '🎮', label: 'Discord', href: '#' },
    { icon: '💻', label: 'GitHub', href: '#' },
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
                <p className="tagline-sub text-gray-300">
                  {t('footer.tagline')}
                </p>
              </div>
            </div>
            <div className="social-links flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <span className="social-icon text-lg">{social.icon}</span>
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

        {/* Bottom Section */}
        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="copyright text-gray-400 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="footer-extra">
            <span className="powered-by text-gray-500 text-sm italic">
              {t('footer.powered')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
