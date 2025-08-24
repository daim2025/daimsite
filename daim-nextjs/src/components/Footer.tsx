import Image from 'next/image';

export default function Footer() {
  const footerSections = [
    {
      heading: 'Product',
      links: [
        { href: '#studio', label: 'Studio' },
        { href: '#about', label: 'About' },
        { href: '#process', label: 'Process' },
        { href: '/idol', label: 'Idol Demo' },
      ]
    },
    {
      heading: 'Company',
      links: [
      
        { href: '#ponyo-prince-spotlight', label: 'ぽにょ皇子' },
        { href: '#cms-features', label: 'Manage' },
        { href: '#contact', label: 'Contact' },
      ]
    },
    {
      heading: 'Legal',
      links: [
        { href: '#', label: 'Privacy Policy' },
        { href: '#', label: 'Terms of Service' },
        { href: '#', label: 'Cookie Policy' },
      ]
    }
  ];

  const socialLinks = [
    { label: 'Twitter', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'GitHub', href: '#' },
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
                  音楽×AI×クリエーター×未来
                </p>
              </div>
            </div>
            <div className="social-links flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 text-sm font-medium"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Other Sections */}
          {footerSections.map((section, sectionIndex) => (
            <div key={`footer-section-${sectionIndex}-${section.heading}`} className="footer-section">
              <h4 className="footer-heading text-white text-lg font-semibold mb-6">
                {section.heading}
              </h4>
              <ul className="footer-links space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={`footer-link-${sectionIndex}-${linkIndex}-${link.label}`}>
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
            &copy; 2025 DAIM. All rights reserved.
          </p>
          <div className="footer-extra flex items-center gap-6">
            <span className="made-with text-gray-500 text-sm italic">
              Made with ❤️ in Japan
            </span>
            <span className="powered-by text-gray-400 text-sm flex items-center gap-2">
              Powered by 
              <Image
                src="/images/logo-df.avif"
                alt="DiscoverFeed.Co.Ltd"
                width={120}
                height={40}
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
