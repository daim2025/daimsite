import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AuthGuard from "@/components/AuthGuard";

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
        url: "/images/logo_daim.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: "/images/logo_daim.svg",
    shortcut: "/images/logo_daim.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <LanguageProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </LanguageProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
                  '.__next-prerender-indicator'
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
