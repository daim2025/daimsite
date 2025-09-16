import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://daim.vercel.app'),
  title: "DAIM - Intelligent Music Creation",
  description: "Where artificial intelligence meets musical intuition. Experience the future of sound creation through sophisticated algorithms and human creativity.",
  keywords: ["AI", "Music", "Creation", "DAIM", "Intelligent", "Platform"],
  authors: [{ name: "DAIM Team" }],
  creator: "DAIM",
  publisher: "DAIM",
  robots: "index, follow",
  openGraph: {
    title: "DAIM - Intelligent Music Creation",
    description: "Where artificial intelligence meets musical intuition. Experience the future of sound creation.",
    url: "https://daim.vercel.app",
    siteName: "DAIM",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/logo_daim.svg",
        width: 1200,
        height: 630,
        alt: "DAIM Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAIM - Intelligent Music Creation",
    description: "Where artificial intelligence meets musical intuition. Experience the future of sound creation.",
    images: ["/images/logo_daim.svg"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // JavaScript実行確認テスト
              console.log('🟢 Layout JavaScript実行確認');
              
              // Generate Dynamic Favicon
              function generateDynamicFavicon() {
                const canvas = document.createElement('canvas');
                canvas.width = 32;
                canvas.height = 32;
                const ctx = canvas.getContext('2d');
                
                // Black background with rounded corners
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, 32, 32);
                
                // White "D" text
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 20px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('D', 16, 16);
                
                // Create favicon link
                const link = document.querySelector('link[rel*="icon"]') || document.createElement('link');
                link.type = 'image/png';
                link.rel = 'icon';
                link.href = canvas.toDataURL('image/png');
                document.head.appendChild(link);
              }
              
              // Generate favicon immediately
              generateDynamicFavicon();
              
              // Remove Next.js development UI and logos
              function removeNextJSUI() {
                // Remove by attribute
                const elementsToRemove = [
                  '[data-next-mark-loading]',
                  '[data-nextjs-dialog-overlay]',
                  '[data-nextjs-toast]',
                  '[data-nextjs-portal]',
                  '.__next-dev-indicator',
                  '[data-nextjs-dev-indicator]',
                  'svg[viewBox="0 0 40 40"]',
                  'svg[width="40"][height="40"]',
                  '.nextjs-badge',
                  '.__next-build-watcher',
                  '.__next-prerender-indicator',
                  // Additional selectors for Next.js badges
                  'div[style*="position:fixed"][style*="bottom:16px"]',
                  'div[style*="position:fixed"][style*="bottom: 16px"]',
                  'div[style*="position: fixed"][style*="bottom: 16px"]',
                  'div[style*="z-index: 99999"]',
                  'div[style*="z-index:99999"]',
                  'a[href*="vercel.com"]',
                  'a[href*="nextjs.org"]',
                  // Vercel badge selectors
                  '[data-nextjs-toast-wrapper]',
                  '[data-overlay]',
                  '.vercel-badge',
                  '.__next-badge'
                ];
                
                elementsToRemove.forEach(selector => {
                  const elements = document.querySelectorAll(selector);
                  elements.forEach(el => {
                    if (el) {
                      el.remove();
                      el.style.display = 'none';
                      el.style.visibility = 'hidden';
                      el.style.opacity = '0';
                    }
                  });
                });
                
                // Remove SVGs containing Next.js logo patterns
                const svgs = document.querySelectorAll('svg');
                svgs.forEach(svg => {
                  const hasNextLogo = svg.innerHTML.includes('next_logo_paint') || 
                                     svg.innerHTML.includes('next_logo_mask') ||
                                     svg.getAttribute('data-next-mark-loading') !== null;
                  if (hasNextLogo) {
                    svg.remove();
                  }
                });
                
                // Remove specific Next.js links
                const nextLinks = document.querySelectorAll('a[href*="nextjs.org"]');
                nextLinks.forEach(link => link.remove());
                
                // Remove links with specific pattern
                const badgeLinks = document.querySelectorAll('a[target="_blank"][rel="noopener noreferrer"]');
                badgeLinks.forEach(link => {
                  const span = link.querySelector('span');
                  if (span && span.textContent === 'N') {
                    link.remove();
                  }
                });
                
                // Remove any span containing just "N" that might be a badge
                const nSpans = document.querySelectorAll('span');
                nSpans.forEach(span => {
                  if (span.textContent.trim() === 'N' && span.children.length === 0) {
                    span.parentElement?.remove();
                  }
                });
                
                // More aggressive removal of fixed position elements in bottom corners
                const allDivs = document.querySelectorAll('div');
                allDivs.forEach(div => {
                  const style = window.getComputedStyle(div);
                  const isFixed = style.position === 'fixed';
                  const isBottomRight = (style.bottom === '16px' || style.bottom === '1rem') && 
                                       (style.right === '16px' || style.right === '1rem');
                  const isBottomLeft = (style.bottom === '16px' || style.bottom === '1rem') && 
                                      (style.left === '16px' || style.left === '1rem');
                  const hasHighZIndex = parseInt(style.zIndex) > 9999;
                  
                  if (isFixed && (isBottomRight || isBottomLeft) && (hasHighZIndex || div.innerHTML.includes('Next.js') || div.innerHTML.includes('Vercel'))) {
                    div.remove();
                  }
                });
                
                // Remove any element with Vercel or Next.js branding
                const allElements = document.querySelectorAll('*');
                allElements.forEach(el => {
                  const text = el.textContent || '';
                  const innerHTML = el.innerHTML || '';
                  if (text.includes('Powered by Vercel') || text.includes('Next.js') || 
                      innerHTML.includes('next') || innerHTML.includes('vercel')) {
                    const style = window.getComputedStyle(el);
                    if (style.position === 'fixed' || style.position === 'absolute') {
                      el.remove();
                    }
                  }
                });
              }
              
              // Run immediately
              removeNextJSUI();
              
              // Run when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeNextJSUI);
              }
              
              // Run periodically to catch dynamically added elements
              setInterval(removeNextJSUI, 500);
              
              // Observer for new elements
              const observer = new MutationObserver(removeNextJSUI);
              observer.observe(document.body, { childList: true, subtree: true });
            `,
          }}
        />
      </body>
    </html>
  );
}
