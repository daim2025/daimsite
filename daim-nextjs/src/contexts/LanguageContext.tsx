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
    'nav.about': 'About',
    'nav.news': 'ニュース',
    'nav.studio': 'Studio',
    'nav.process': 'Process',
    'nav.distribution': 'Distribution',
    'nav.cms': 'CMS',
    'nav.idol': 'Idol Demo',
    'nav.project': 'Project',
    'nav.ponyo': 'ぽにょ皇子',
    'nav.yamato': 'YAMATO MAYA',
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
    'ponyopage.hero.number': '02',
    'ponyopage.hero.subtitle': '1st.Project',
    'ponyopage.hero.title': 'ぽにょ皇子',
    
    // Project Section
    'ponyopage.project.title': 'PROJECT 01',
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
    'ponyopage.demo.disclaimer': '＊この動画はAI生成した動画とCGによる動画となります',
    
    // Music Section
    'ponyopage.music.title': '初期楽曲',
    'ponyopage.music.song.title': 'Title：A.I.（Android Imagination）',
    'ponyopage.music.writer': 'writing：DAIM Driver Shiro Koba',
    
    // Lyrics
    'ponyopage.lyrics.verse1.line1': 'サイリウムが眩しい',
    'ponyopage.lyrics.verse1.line2': '固いベッドの上',
    'ponyopage.lyrics.verse1.line3': '戦いぬいていた記憶',
    'ponyopage.lyrics.verse1.line4': '誰もいないこの部屋',
    'ponyopage.lyrics.verse2.line1': '感覚が研ぎ澄まされて',
    'ponyopage.lyrics.verse2.line2': 'どこからか響いてくる',
    'ponyopage.lyrics.verse2.line3': '機械のキシム音が',
    'ponyopage.lyrics.verse2.line4': 'やけに騒々しくてたまらない',
    'ponyopage.lyrics.verse3.line1': '頭の中に響く声は',
    'ponyopage.lyrics.verse3.line2': 'あの時、あの場所の、',
    'ponyopage.lyrics.verse3.line3': 'あいつのいつもの声だけど',
    'ponyopage.lyrics.verse3.line4': '何か何かが足りていない',
    'ponyopage.lyrics.verse4.line1': '匂いも感じない',
    'ponyopage.lyrics.verse4.line2': '暑さも冷たさも',
    'ponyopage.lyrics.verse4.line3': '今は何も感じない',
    'ponyopage.lyrics.verse4.line4': 'あのあらい息づかいさえも',
    'ponyopage.lyrics.chorus1.line1': 'ヒューマノイドの夢は現実なの？',
    'ponyopage.lyrics.chorus1.line2': '感覚がないはずなのに湧き出る感情',
    'ponyopage.lyrics.chorus1.line3': 'イマジネーションは誰のもの？',
    'ponyopage.lyrics.chorus1.line4': '色あふれる世界へ、さあ戻ろう',
    'ponyopage.lyrics.hook': 'AI、色奪（Irodori）、AI、色奪（Irodori）、',
    'ponyopage.lyrics.verse5.line1': '心の中を伝うのは',
    'ponyopage.lyrics.verse5.line2': 'あの夜、あの歌の',
    'ponyopage.lyrics.verse5.line3': '熱い言葉のリリックだけど',
    'ponyopage.lyrics.verse5.line4': '微か微かにしか感じれない',
    'ponyopage.lyrics.verse6.line1': '死んだんじゃない',
    'ponyopage.lyrics.verse6.line2': 'まだ死んじゃいない',
    'ponyopage.lyrics.verse6.line3': '新しい命じゃない',
    'ponyopage.lyrics.verse6.line4': '生まれ変わっちゃいないんだ',
    
    // Song Settings Section
    'ponyopage.settings.title': '楽曲設定',
    'ponyopage.settings.description1': 'コスプレイヤー、DJ、グラビア等の、様々な活動をしているぽにょ皇子。',
    'ponyopage.settings.description2': 'DJにおいては、アニソンDJとして活躍。',
    'ponyopage.settings.description3': 'そこで、生成する楽曲をアニソンの主題歌らしいイメージで検討。',
    'ponyopage.settings.description4': '今回は、A.I.による楽曲自動生成に掛けて、「A.I.＝Android Imagination」として世界観を設定。',
    'ponyopage.settings.story.title': '架空のバトルアニメの主題歌',
    'ponyopage.settings.story.line1': '近い未来、大国による争いが世界に広まってしまったら・・・',
    'ponyopage.settings.story.line2': '奪い合う大国と戦いたくない者との戦い・・・',
    'ponyopage.settings.story.line3': 'そんな架空のバトルアニメの主題歌',
    'ponyopage.settings.story.line4': '戦いを止める鍵は、AIなのか、Humanなのか、それともヒューマノイドか・・・',
    'ponyopage.settings.character': 'ぽにょ皇子2nd.シングル「変幻自在」の変幻性をコスプレから更に拡張し、バトルアニメ内で争いを止めるキャラクター設定。傷つきながらもヒューマノイドとして戦う姿を歌詞にした。',
    'ponyopage.videos.intro': '紹介動画',
    'ponyopage.videos.song': '楽曲動画',
    'ponyopage.videos.intro.url': 'https://player.vimeo.com/video/1116091352?h=0&autoplay=0&title=0&byline=0&portrait=0',
    'ponyopage.videos.song.url': 'https://player.vimeo.com/video/1116093914?h=0&autoplay=0&title=0&byline=0&portrait=0',

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
    'ponyo.number': '02',
    'ponyo.subtitle': '1st.Project',
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

    // About Page
    'about.page.title': 'DAIMとは',
    'about.page.subtitle': 'Decentralized AI Music',
    'about.page.concept': '音楽×AI×クリエーター×未来',
    'about.page.description1': '最先端のAI技術とクリエーターの感性を融合させ、誰でも直感的にプロフェッショナルな楽曲を制作できる環境を提供します。シンプルな操作で、深い音楽理論に基づいた sophisticated な楽曲を生み出すことができます。',
    'about.page.intelligent.title': 'Intelligent Composition',
    'about.page.intelligent.description': '最先端のAI技術と人間の感性を融合させ、誰でも直感的にプロフェッショナルな楽曲を制作できる環境を提供します。',
    'about.process.methodology': 'Methodology',
    'about.process.title': 'Creation Process',
    'about.process.description': 'DAIMでの音楽制作は、直感的でありながら深い音楽理論に基づいたインテリジェントなプロセス',
    'about.process.inspiration.title': 'Inspiration Input',
    'about.process.inspiration.description': '音楽的インスピレーションを自然言語で入力。AIが音楽理論、感情表現、楽器編成を分析し、最適な音楽構造を提案',
    'about.process.processing.title': 'Intelligent Processing',
    'about.process.processing.description': '高度なアルゴリズムが和声進行、メロディライン、リズムパターンを生成。人間の感性とAIの論理的思考が融合',
    'about.process.refinement.title': 'Refinement & Export',
    'about.process.refinement.description': '生成された楽曲を直感的に調整・編集。プロフェッショナル品質のマスタリングを施し、あらゆる形式で出力可能',
    'about.distribution.section': 'Distribution',
    'about.distribution.title': 'Professional Distribution',
    'about.distribution.global.title': 'Global Reach',
    'about.distribution.global.description': '生成された楽曲を世界中のプラットフォームに配信。Spotify、Apple Music、YouTubeなど、あらゆるチャンネルでリスナーに届けることができます。',
    'about.distribution.revenue.title': 'Revenue Optimization',
    'about.distribution.revenue.description': 'インテリジェントな分析ツールでリスナーの反応を追跡し、最適な配信戦略を提案。収益を最大化するためのデータドリブンなアプローチを提供。',
    'about.cms.section': 'Management',
    'about.cms.title': 'Content Management',
    'about.cms.track.title': 'Track Management',
    'about.cms.track.description': '生成された楽曲を効率的に管理。メタデータの編集、タグ付け、カテゴリ分類など、プロフェッショナルな楽曲管理をサポート',
    'about.cms.analytics.title': 'Analytics Dashboard',
    'about.cms.analytics.description': '詳細なリスナー分析とパフォーマンス指標を提供。楽曲の反応、地域別の再生数、リスナーの行動パターンなどを可視化',
    'about.cms.collaboration.title': 'Collaboration Tools',
    'about.cms.collaboration.description': 'チームでの楽曲制作をサポート。共同編集、コメント機能、バージョン管理など、効率的なコラボレーション環境を提供',

    // Studio Page Additional
    'studio.page.title': 'AI-Powered Studio',
    'studio.page.subtitle': 'Intelligent Studio',
    'studio.page.email.title': 'アップデート通知',
    'studio.page.email.description': '新機能のリリース時に通知を受け取るには、メールアドレスを登録してください',
    'studio.page.email.placeholder': 'your@email.com',
    'studio.page.email.button': '登録',
    'studio.page.email.loading': '登録中...',
    'studio.page.email.validation': 'メールアドレスを入力してください',
    'studio.page.email.privacy': 'メールアドレスはアップデート通知の送信のみに使用され、第三者に提供されることはありません。',

    // Footer
    'footer.powered': 'Powered by DiscoverFeed.',
    'footer.contents': 'Contents',
    'footer.artists': 'Artists',
    'footer.support': 'Support',
    'footer.tagline': '音楽×AI×クリエイター×未来',
    'footer.copyright': '© 2025 DAIM. All rights reserved.',
    'footer.ponyo': 'ぽにょ皇子',
    'footer.yamato': 'YAMATO MAYA',
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.news': 'News',
    'nav.studio': 'Studio',
    'nav.process': 'Process',
    'nav.distribution': 'Distribution',
    'nav.cms': 'CMS',
    'nav.idol': 'Idol Demo',
    'nav.project': 'Project',
    'nav.ponyo': 'Ponyo Prince',
    'nav.yamato': 'YAMATO MAYA',
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
    'ponyopage.hero.number': '02',
    'ponyopage.hero.subtitle': '1st.Project',
    'ponyopage.hero.title': 'Ponyo Prince',
    
    // Project Section
    'ponyopage.project.title': 'PROJECT 01',
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
    'ponyopage.demo.disclaimer': '* This video is AI-generated video and CG video',
    
    // Music Section
    'ponyopage.music.title': 'Initial Track',
    'ponyopage.music.song.title': 'Title: A.I. (Android Imagination)',
    'ponyopage.music.writer': 'writing: DAIM Driver Shiro Koba',
    
    // Lyrics
    'ponyopage.lyrics.verse1.line1': 'Dazzling lights so bright',
    'ponyopage.lyrics.verse1.line2': 'On this rigid bed',
    'ponyopage.lyrics.verse1.line3': 'Memories of battles fought',
    'ponyopage.lyrics.verse1.line4': 'In this empty room alone',
    'ponyopage.lyrics.verse2.line1': 'My senses sharpened now',
    'ponyopage.lyrics.verse2.line2': 'Echoing from somewhere',
    'ponyopage.lyrics.verse2.line3': 'The grinding sound of machines',
    'ponyopage.lyrics.verse2.line4': 'So unbearably loud',
    'ponyopage.lyrics.verse3.line1': 'The voice inside my head',
    'ponyopage.lyrics.verse3.line2': 'From that time, that place',
    'ponyopage.lyrics.verse3.line3': 'Their familiar voice, but',
    'ponyopage.lyrics.verse3.line4': 'Something, something\'s missing',
    'ponyopage.lyrics.verse4.line1': 'I can\'t smell anything',
    'ponyopage.lyrics.verse4.line2': 'No heat, no cold',
    'ponyopage.lyrics.verse4.line3': 'I feel nothing now',
    'ponyopage.lyrics.verse4.line4': 'Not even that rough breathing',
    'ponyopage.lyrics.chorus1.line1': 'Are a humanoid\'s dreams real?',
    'ponyopage.lyrics.chorus1.line2': 'Emotions rising though I shouldn\'t feel',
    'ponyopage.lyrics.chorus1.line3': 'Whose imagination is this?',
    'ponyopage.lyrics.chorus1.line4': 'Let\'s return to that colorful world',
    'ponyopage.lyrics.hook': 'AI, Irodori, AI, Irodori,',
    'ponyopage.lyrics.verse5.line1': 'What flows through my heart',
    'ponyopage.lyrics.verse5.line2': 'From that night, that song',
    'ponyopage.lyrics.verse5.line3': 'Those passionate lyrics, but',
    'ponyopage.lyrics.verse5.line4': 'I can barely feel them',
    'ponyopage.lyrics.verse6.line1': 'I\'m not dead',
    'ponyopage.lyrics.verse6.line2': 'Not dead yet',
    'ponyopage.lyrics.verse6.line3': 'This isn\'t new life',
    'ponyopage.lyrics.verse6.line4': 'I haven\'t been reborn',
    
    // Song Settings Section
    'ponyopage.settings.title': 'Track Settings',
    'ponyopage.settings.description1': 'Ponyo Prince is active in various fields including cosplay, DJing, and gravure modeling.',
    'ponyopage.settings.description2': 'As a DJ, she is active as an anime song DJ.',
    'ponyopage.settings.description3': 'Therefore, we considered generating music with an image like an anime theme song.',
    'ponyopage.settings.description4': 'This time, based on A.I. automatic music generation, we set the worldview as "A.I. = Android Imagination".',
    'ponyopage.settings.story.title': 'Theme Song for a Fictional Battle Anime',
    'ponyopage.settings.story.line1': 'In the near future, if conflicts between major powers spread across the world...',
    'ponyopage.settings.story.line2': 'The battle between the warring superpowers and those who don\'t want to fight...',
    'ponyopage.settings.story.line3': 'This is the theme song for such a fictional battle anime',
    'ponyopage.settings.story.line4': 'The key to stopping the war - is it AI, Human, or Humanoid...',
    'ponyopage.settings.character': 'Expanding the transformative nature of Ponyo Prince\'s 2nd single "Hengenjizai" from cosplay, we set up a character who stops fighting within the battle anime. The lyrics depict her fighting as a humanoid while getting hurt.',
    'ponyopage.videos.intro': 'Introduction Video',
    'ponyopage.videos.song': 'Music Video',
    'ponyopage.videos.intro.url': 'https://player.vimeo.com/video/1117628867?h=0&autoplay=0&title=0&byline=0&portrait=0',
    'ponyopage.videos.song.url': 'https://player.vimeo.com/video/1116093914?h=0&autoplay=0&title=0&byline=0&portrait=0',

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
    'ponyo.number': '02',
    'ponyo.subtitle': '1st.Project',
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

    // About Page
    'about.page.title': 'About DAIM',
    'about.page.subtitle': 'Decentralized AI Music',
    'about.page.concept': 'Music × AI × Creator × Future',
    'about.page.description1': 'A sophisticated music creation platform that fuses cutting-edge AI technology with creator sensibility, providing an environment where anyone can intuitively create professional music. Create sophisticated tracks based on deep music theory with simple operations.',
    'about.page.intelligent.title': 'Intelligent Composition',
    'about.page.intelligent.description': 'Fusing cutting-edge AI technology with human sensibility, we provide an environment where anyone can intuitively create professional music.',
    'about.process.methodology': 'Methodology',
    'about.process.title': 'Creation Process',
    'about.process.description': 'Music production with DAIM is an intelligent process that is intuitive yet based on deep music theory',
    'about.process.inspiration.title': 'Inspiration Input',
    'about.process.inspiration.description': 'Input musical inspiration in natural language. AI analyzes music theory, emotional expression, and instrumentation to suggest optimal musical structures',
    'about.process.processing.title': 'Intelligent Processing',
    'about.process.processing.description': 'Advanced algorithms generate chord progressions, melody lines, and rhythm patterns. Human sensibility and AI logical thinking merge',
    'about.process.refinement.title': 'Refinement & Export',
    'about.process.refinement.description': 'Intuitively adjust and edit generated music. Apply professional quality mastering and output in any format',
    'about.distribution.section': 'Distribution',
    'about.distribution.title': 'Professional Distribution',
    'about.distribution.global.title': 'Global Reach',
    'about.distribution.global.description': 'Distribute your generated music to platforms worldwide. Reach listeners through all channels including Spotify, Apple Music, YouTube, and more.',
    'about.distribution.revenue.title': 'Revenue Optimization',
    'about.distribution.revenue.description': 'Track listener reactions with intelligent analytics tools and suggest optimal distribution strategies. Provide data-driven approaches to maximize revenue.',
    'about.cms.section': 'Management',
    'about.cms.title': 'Content Management',
    'about.cms.track.title': 'Track Management',
    'about.cms.track.description': 'Efficiently manage generated music. Support professional music management including metadata editing, tagging, and categorization',
    'about.cms.analytics.title': 'Analytics Dashboard',
    'about.cms.analytics.description': 'Provide detailed listener analytics and performance metrics. Visualize music reactions, regional play counts, and listener behavior patterns',
    'about.cms.collaboration.title': 'Collaboration Tools',
    'about.cms.collaboration.description': 'Support team music production. Provide efficient collaboration environment including co-editing, commenting, and version control',

    // Studio Page Additional
    'studio.page.title': 'AI-Powered Studio',
    'studio.page.subtitle': 'Intelligent Studio',
    'studio.page.email.title': 'Update Notifications',
    'studio.page.email.description': 'Register your email address to receive notifications when new features are released',
    'studio.page.email.placeholder': 'your@email.com',
    'studio.page.email.button': 'Register',
    'studio.page.email.loading': 'Registering...',
    'studio.page.email.validation': 'Please enter your email address',
    'studio.page.email.privacy': 'Email addresses are used only for sending update notifications and will not be provided to third parties.',

    // Footer
    'footer.powered': 'Powered by DiscoverFeed.',
    'footer.contents': 'Contents',
    'footer.artists': 'Artists',
    'footer.support': 'Support',
    'footer.tagline': 'Music × AI × Creator × Future',
    'footer.copyright': '© 2025 DAIM. All rights reserved.',
    'footer.ponyo': 'Ponyo Prince',
    'footer.yamato': 'YAMATO MAYA',
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


