import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
