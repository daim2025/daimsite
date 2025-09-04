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
    'hero.subtitle': 'Intelligent Music Platform',
    'hero.title': 'DAIM',
    'hero.description': 'Where artificial intelligence meets musical intuition. Experience the future of sound creation through sophisticated algorithms and creative innovation.',
    'hero.cta.studio': 'Enter Studio',
    'hero.cta.idol': '🎤 Idol Demo',
    'hero.cta.more': 'Discover More',

    // About Section
    'about.number': '01',
    'about.subtitle': 'About DAIM',
    'about.title': 'DAIMとは',
    'about.description': 'DAIMは、AI技術を活用した次世代音楽制作プラットフォームです。プロデューサーからビギナーまで、誰もが直感的に音楽を制作できる環境を提供します。',

    // Studio Section
    'studio.number': '01',
    'studio.subtitle': 'Creation',
    'studio.title': 'Intelligent Studio',
    'studio.description': '最先端のAI技術を駆使したスタジオ環境で、アイデアを瞬時に音楽に変換。',

    // Ponyo Section
    'ponyo.number': '02',
    'ponyo.subtitle': 'Artist Spotlight',
    'ponyo.title': 'ぽにょ皇子',
    'ponyo.description': 'コスプレイヤー、DJ、グラビア等の様々な活動をしているぽにょ皇子。フォロワー数35万人超え。',
    'ponyo.profile.title': 'Artist Profile',
    'ponyo.profile.description': 'コスプレイヤーをはじめ、DJ、グラビア等、様々な活動をしているぽにょ皇子。フォロワー数35万人超え。DJだけでなくパワフルなMCもこなしながらフロアを沸かせる予測不能なパフォーマンスには目が離せません。',
    'ponyo.ai.title': 'AI Music Generation',
    'ponyo.ai.description': '「A.I.（Android Imagination）」をテーマに、AI音楽生成デモンストレーションを実施。架空のバトルアニメの主題歌として、7つのバージョンの楽曲を生成しました。',
    'ponyo.cta': '詳細を見る',
    'ponyo.cta.description': '楽曲の詳細、歌詞、推し曲投票など',

    // Ponyo Prince Page
    'ponyopage.hero.number': '07',
    'ponyopage.hero.subtitle': 'Artist Spotlight',
    'ponyopage.hero.title': 'ぽにょ皇子',
    
    // Project Section
    'ponyopage.project.title': 'PROJECT',
    'ponyopage.project.subtitle': 'DJ ぽにょ皇子×AI音楽生成×DAIM Driver Team',
    'ponyopage.project.subtitle2': 'First Demonstration',
    'ponyopage.project.desc1': '開発中の自動音楽生成アプリを想定し、最新のAI技術をDAIMエンジン開発チームが活用して楽曲を作成した場合のデモンストレーション。',
    'ponyopage.project.desc2': '第一弾は、DJ ぽにょ皇子の世界観を紐解きながら、どこまで、AIと音楽、カルチャーが融合できるかチャレンジします。',
    'ponyopage.project.desc3': 'AIを使って次世代の楽曲制作の可能性を広げるには、いままでのようなAIだけで完結させるという文化に終止符を打ち、AIが生み出した作品に人がどこまで完成度を高めプロデュースしていけるのかが鍵です。',
    
    // About Section
    'ponyopage.about.title': 'ABOUT',
    'ponyopage.about.concept': '制作コンセプト',
    'ponyopage.about.concept.desc1': 'AI音楽の可能性と人間の感性との融合',
    'ponyopage.about.concept.desc2': 'このDAIMのプロジェクトの第一弾は、DJ、コスプレイヤー、アーティストとして活躍中のぽにょ皇子とDMCのクリエイター陣がタッグを組み、それぞれ知恵を出し合いながら彼女の世界感を元にプロジェクトを進行していきます。',
    'ponyopage.about.profile': 'ARTIST PROFILE',
    'ponyopage.about.profile.name': 'DJ ぽにょ皇子',
    'ponyopage.about.profile.desc1': 'コスプレイヤーをはじめ、DJ、グラビア等、様々な活動をしているぽにょ皇子。フォロワー数35万人超え。DJだけでなくパワフルなMCもこなしながらフロアを沸かせる予測不能な彼女のパフォーマンスには目が離せない。',
    'ponyopage.about.profile.desc2': '全国各地毎月多数のイベントに出演するなど精力的に活動中。DJanesAWARD2021国内ガールズDJランキング2021年度のランキング7位に君臨。',
    'ponyopage.about.achievements1': '▽ 1stシングル「Put on your beat！！！」',
    'ponyopage.about.achievements2': '▽ 2ndシングル「変幻自在」',
    'ponyopage.about.achievements3': 'iTunes Store にて、リリースから24時間を待たずして日本国内 ダンスジャンル トップソングランキング 1位 を獲得。',
    'ponyopage.about.events': '主催クラブイベント #ぽ祭 #過激波電脳東京 #ぽにょ皇子生誕祭',
    
    // Demo Music Section
    'ponyopage.demo.title': 'A.I. DEMO MUSIC',
    'ponyopage.demo.subtitle': 'AIによる生成音源',
    'ponyopage.demo.preview': '音源プレビュー',
    'ponyopage.demo.version': 'A.I.（Android Imagination）ver.6',
    'ponyopage.demo.browser': 'お使いのブラウザは音声再生に対応していません。',
    'ponyopage.demo.filename': 'AI-trance-rap-2.wav - ぽにょ皇子 AI音楽生成デモ',
    'ponyopage.demo.future': '今後、ぽにょ皇子によるミキシングやアレンジを行い、楽曲として完成させていきます。',
    
    // SNS Section
    'ponyopage.sns.title': 'SNS',
    'ponyopage.sns.subtitle': 'ぽにょ皇子の公式アカウント',
    'ponyopage.sns.follow': 'フォローする →',
    'ponyopage.sns.subscribe': 'チャンネル登録 →',
    'ponyopage.sns.youtube.name': 'ぽにょ皇子official',

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
    'hero.subtitle': 'Intelligent Music Platform',
    'hero.title': 'DAIM',
    'hero.description': 'Where artificial intelligence meets musical intuition. Experience the future of sound creation through sophisticated algorithms and creative innovation.',
    'hero.cta.studio': 'Enter Studio',
    'hero.cta.idol': '🎤 Idol Demo',
    'hero.cta.more': 'Discover More',

    // About Section
    'about.number': '01',
    'about.subtitle': 'About DAIM',
    'about.title': 'About DAIM',
    'about.description': 'DAIM is a next-generation music production platform leveraging AI technology. We provide an environment where everyone from professionals to beginners can intuitively create music.',

    // Studio Section
    'studio.number': '01',
    'studio.subtitle': 'Creation',
    'studio.title': 'Intelligent Studio',
    'studio.description': 'Transform your ideas into music instantly with our cutting-edge AI-powered studio environment.',

    // Ponyo Section
    'ponyo.number': '02',
    'ponyo.subtitle': 'Artist Spotlight',
    'ponyo.title': 'Ponyo Prince',
    'ponyo.description': 'A multi-talented artist active as a cosplayer, DJ, and gravure model with over 350,000 followers.',
    'ponyo.profile.title': 'Artist Profile',
    'ponyo.profile.description': 'A multi-talented artist active as a cosplayer, DJ, and gravure model. With over 350,000 followers, her unpredictable performances that combine powerful DJ skills and MC abilities never fail to energize the crowd.',
    'ponyo.ai.title': 'AI Music Generation',
    'ponyo.ai.description': 'Under the theme of "A.I. (Android Imagination)", we conducted an AI music generation demonstration. Seven different versions of tracks were generated as theme songs for a fictional battle anime.',
    'ponyo.cta': 'View Details',
    'ponyo.cta.description': 'Song details, lyrics, and favorite track voting',

    // Ponyo Prince Page
    'ponyopage.hero.number': '07',
    'ponyopage.hero.subtitle': 'Artist Spotlight',
    'ponyopage.hero.title': 'Ponyo Prince',
    
    // Project Section
    'ponyopage.project.title': 'PROJECT',
    'ponyopage.project.subtitle': 'DJ Ponyo Prince × AI Music Generation × DAIM Driver Team',
    'ponyopage.project.subtitle2': 'First Demonstration',
    'ponyopage.project.desc1': 'A demonstration of music creation using the latest AI technology by the DAIM engine development team, assuming an automatic music generation app under development.',
    'ponyopage.project.desc2': 'The first phase challenges how far AI, music, and culture can be fused while unraveling the worldview of DJ Ponyo Prince.',
    'ponyopage.project.desc3': 'To expand the possibilities of next-generation music production using AI, the key is to break away from the culture of AI-only completion and see how far humans can enhance and produce works created by AI.',
    
    // About Section
    'ponyopage.about.title': 'ABOUT',
    'ponyopage.about.concept': 'Production Concept',
    'ponyopage.about.concept.desc1': 'Fusion of AI music possibilities and human sensibility',
    'ponyopage.about.concept.desc2': 'The first phase of this DAIM project involves DJ, cosplayer, and artist Ponyo Prince teaming up with DMC creators, combining their wisdom to proceed with the project based on her worldview.',
    'ponyopage.about.profile': 'ARTIST PROFILE',
    'ponyopage.about.profile.name': 'DJ Ponyo Prince',
    'ponyopage.about.profile.desc1': 'Ponyo Prince is active in various fields including cosplay, DJing, and gravure modeling, with over 350,000 followers. Her unpredictable performances that combine powerful DJing and MC skills to energize the floor are captivating.',
    'ponyopage.about.profile.desc2': 'She is actively performing at numerous events across the country every month. She ranked 7th in the DJanes AWARD 2021 domestic girls DJ ranking for 2021.',
    'ponyopage.about.achievements1': '▽ 1st Single "Put on your beat!!!"',
    'ponyopage.about.achievements2': '▽ 2nd Single "Hengenjizai"',
    'ponyopage.about.achievements3': 'Achieved #1 on iTunes Store Japan Dance Genre Top Songs Ranking within 24 hours of release.',
    'ponyopage.about.events': 'Host club events #PoMatsuri #Gekiha Denno Tokyo #Ponyo Prince Birthday Festival',
    
    // Demo Music Section
    'ponyopage.demo.title': 'A.I. DEMO MUSIC',
    'ponyopage.demo.subtitle': 'AI Generated Audio',
    'ponyopage.demo.preview': 'Audio Preview',
    'ponyopage.demo.version': 'A.I. (Android Imagination) ver.6',
    'ponyopage.demo.browser': 'Your browser does not support audio playback.',
    'ponyopage.demo.filename': 'AI-trance-rap-2.wav - Ponyo Prince AI Music Generation Demo',
    'ponyopage.demo.future': 'In the future, mixing and arrangements by Ponyo Prince will be performed to complete the tracks.',
    
    // SNS Section
    'ponyopage.sns.title': 'SNS',
    'ponyopage.sns.subtitle': 'Ponyo Prince Official Accounts',
    'ponyopage.sns.follow': 'Follow →',
    'ponyopage.sns.subscribe': 'Subscribe →',
    'ponyopage.sns.youtube.name': 'Ponyo Prince Official',

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


