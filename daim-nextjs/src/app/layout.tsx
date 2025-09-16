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
      </body>
    </html>
  );
}
