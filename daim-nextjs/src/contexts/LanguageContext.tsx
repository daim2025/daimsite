'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻訳データ
const translations = {
  ja: {
    // Navigation
    'nav.about': 'DAIMとは',
    'nav.studio': 'Studio',
    'nav.process': 'Process',
    'nav.distribution': 'Distribution',
    'nav.cms': 'CMS',
    'nav.idol': 'Idol Demo',
    'nav.ponyo': 'ぽにょ皇子',
    'nav.contact': 'お問い合わせ',

    // Hero Section
    'hero.subtitle': 'AI Music Creation Platform',
    'hero.title': 'AI音楽制作プラットフォーム',
    'hero.description': '誰でも簡単に、プロクオリティの音楽を制作できる革新的なAI音楽制作プラットフォームです。',
    'hero.cta.primary': '無料で始める',
    'hero.cta.secondary': 'デモを見る',

    // About Section
    'about.number': '01',
    'about.subtitle': 'About DAIM',
    'about.title': 'DAIMとは',
    'about.description': 'DAIMは、AI技術を活用した次世代音楽制作プラットフォームです。プロデューサーからビギナーまで、誰もが直感的に音楽を制作できる環境を提供します。',

    // Studio Section
    'studio.number': '02',
    'studio.subtitle': 'Intelligent Studio',
    'studio.title': 'AI-Powered Studio',
    'studio.description': '最先端のAI技術を駆使したスタジオ環境で、アイデアを瞬時に音楽に変換。',

    // Process Section
    'process.number': '03',
    'process.subtitle': 'Creation Process',
    'process.title': '制作プロセス',
    'process.description': 'シンプルで直感的な3ステップで、プロクオリティの音楽を制作できます。',

    // Distribution Section
    'distribution.number': '04',
    'distribution.subtitle': 'Professional Distribution',
    'distribution.title': 'プロフェッショナル配信',
    'distribution.description': '制作した音楽を世界中の主要な音楽プラットフォームに配信できます。',

    // CMS Section
    'cms.number': '05',
    'cms.subtitle': 'Content Management',
    'cms.title': 'コンテンツ管理',
    'cms.description': '制作した楽曲の管理から配信まで、全てを一元管理できるCMSシステム。',

    // Idol Demo Section
    'idol.number': '06',
    'idol.subtitle': 'Idol Demo',
    'idol.title': 'アイドルデモ',
    'idol.description': 'AI技術を活用したアイドル音楽制作のデモンストレーション。',

    // Ponyo Section
    'ponyo.number': '07',
    'ponyo.subtitle': 'Artist Showcase',
    'ponyo.title': 'ぽにょ皇子',
    'ponyo.description': 'DAIMで制作されたアーティスト作品のショーケース。',

    // Contact Page
    'contact.subtitle': 'Contact Us',
    'contact.title': 'お問い合わせ',
    'contact.form.title': 'メッセージを送信',
    'contact.form.name': 'お名前',
    'contact.form.email': 'メールアドレス',
    'contact.form.subject': '件名',
    'contact.form.message': 'メッセージ',
    'contact.form.submit': '送信する',
    'contact.form.sending': '送信中...',
    'contact.form.required': '必須項目をすべて入力してください',
    'contact.form.success': 'お問い合わせを送信しました。確認後、担当者よりご連絡いたします。',
    'contact.form.error': '送信に失敗しました',
    'contact.form.network-error': 'ネットワークエラーが発生しました。再度お試しください。',
    'contact.form.privacy': '送信いただいた情報は、お問い合わせ対応の目的でのみ使用され、第三者に提供されることはありません。',

    // Studio Page
    'studio.email.title': 'リリース通知を受け取る',
    'studio.email.description': 'DAIMの最新情報やリリース通知をいち早くお届けします。',
    'studio.email.placeholder': 'メールアドレスを入力',
    'studio.email.submit': '通知を受け取る',
    'studio.email.success': 'ありがとうございます！リリース通知を送信いたします。',
    'studio.email.error': '登録に失敗しました。もう一度お試しください。',

    // Footer
    'footer.powered': 'Powered by DiscoverFeed.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.support': 'Support',
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.studio': 'Studio',
    'nav.process': 'Process',
    'nav.distribution': 'Distribution',
    'nav.cms': 'CMS',
    'nav.idol': 'Idol Demo',
    'nav.ponyo': 'Ponyo Prince',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.subtitle': 'AI Music Creation Platform',
    'hero.title': 'AI Music Creation Platform',
    'hero.description': 'An innovative AI music creation platform that enables anyone to easily produce professional-quality music.',
    'hero.cta.primary': 'Get Started Free',
    'hero.cta.secondary': 'Watch Demo',

    // About Section
    'about.number': '01',
    'about.subtitle': 'About DAIM',
    'about.title': 'About DAIM',
    'about.description': 'DAIM is a next-generation music production platform leveraging AI technology. We provide an environment where everyone from professionals to beginners can intuitively create music.',

    // Studio Section
    'studio.number': '02',
    'studio.subtitle': 'Intelligent Studio',
    'studio.title': 'AI-Powered Studio',
    'studio.description': 'Transform your ideas into music instantly with our cutting-edge AI-powered studio environment.',

    // Process Section
    'process.number': '03',
    'process.subtitle': 'Creation Process',
    'process.title': 'Creation Process',
    'process.description': 'Create professional-quality music in three simple and intuitive steps.',

    // Distribution Section
    'distribution.number': '04',
    'distribution.subtitle': 'Professional Distribution',
    'distribution.title': 'Professional Distribution',
    'distribution.description': 'Distribute your created music to major music platforms worldwide.',

    // CMS Section
    'cms.number': '05',
    'cms.subtitle': 'Content Management',
    'cms.title': 'Content Management',
    'cms.description': 'Centrally manage everything from music production management to distribution with our CMS system.',

    // Idol Demo Section
    'idol.number': '06',
    'idol.subtitle': 'Idol Demo',
    'idol.title': 'Idol Demo',
    'idol.description': 'Demonstration of idol music production utilizing AI technology.',

    // Ponyo Section
    'ponyo.number': '07',
    'ponyo.subtitle': 'Artist Showcase',
    'ponyo.title': 'Ponyo Prince',
    'ponyo.description': 'Showcase of artist works created with DAIM.',

    // Contact Page
    'contact.subtitle': 'Contact Us',
    'contact.title': 'Contact Us',
    'contact.form.title': 'Send Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.required': 'Please fill in all required fields',
    'contact.form.success': 'Your inquiry has been sent. We will contact you after confirmation.',
    'contact.form.error': 'Failed to send',
    'contact.form.network-error': 'A network error occurred. Please try again.',
    'contact.form.privacy': 'The information you submit will only be used for inquiry response purposes and will not be provided to third parties.',

    // Studio Page
    'studio.email.title': 'Get Release Notifications',
    'studio.email.description': 'Be the first to receive the latest DAIM updates and release notifications.',
    'studio.email.placeholder': 'Enter your email address',
    'studio.email.submit': 'Get Notifications',
    'studio.email.success': 'Thank you! We will send you release notifications.',
    'studio.email.error': 'Registration failed. Please try again.',

    // Footer
    'footer.powered': 'Powered by DiscoverFeed.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.support': 'Support',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('ja');

  // ローカルストレージから言語設定を読み込み
  useEffect(() => {
    const savedLanguage = localStorage.getItem('daim-language') as Language;
    if (savedLanguage && (savedLanguage === 'ja' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // 言語変更時にローカルストレージに保存
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('daim-language', lang);
  };

  // 翻訳関数
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}


