import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  slug: string;
  featuredImage?: string;
  videoUrl?: string;
  externalLink?: string;
  linkText?: string;
}

// データファイルのパス
const DATA_FILE = path.join(process.cwd(), 'database', 'news.json');

// データファイルが存在しない場合は作成
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(DATA_FILE)) {
    const initialData: NewsItem[] = [
      {
        id: '1',
        title: 'DAIMプラットフォーム正式リリース',
        content: 'AI音楽制作プラットフォーム「DAIM」が正式にリリースされました。革新的な技術により、誰でも直感的に音楽を制作できる環境を提供します。',
        date: '2024-09-07',
        author: 'DAIM Team',
        slug: 'daim-platform-release'
      },
      {
        id: '2',
        title: 'ぽにょ皇子とのコラボプロジェクト開始',
        content: '人気DJぽにょ皇子とのコラボレーションプロジェクトが開始されました。AI技術と人間の創造性の融合による新しい音楽体験をお届けします。',
        date: '2024-09-06',
        author: 'DAIM Team',
        slug: 'ponyo-collaboration'
      }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// データを読み込み
function readNewsData(): NewsItem[] {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// データを保存
function writeNewsData(data: NewsItem[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET: 全ニュース記事を取得
export async function GET() {
  try {
    const news = readNewsData();
    return NextResponse.json(news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error('Error reading news data:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// POST: 新しいニュース記事を作成
export async function POST(request: NextRequest) {
  try {
    const { title, content, author, date, slug, featuredImage, videoUrl, externalLink, linkText } = await request.json();
    
    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Title, content, and author are required' }, { status: 400 });
    }
    
    const news = readNewsData();
    
    // slugが提供されていない場合は、タイトルから自動生成
    const finalSlug = slug || title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    const newArticle: NewsItem = {
      id: Date.now().toString(),
      title,
      content,
      date: date || new Date().toISOString().split('T')[0],
      author,
      slug: finalSlug,
      ...(featuredImage && { featuredImage }),
      ...(videoUrl && { videoUrl }),
      ...(externalLink && { externalLink }),
      ...(linkText && { linkText })
    };
    
    news.push(newArticle);
    writeNewsData(news);
    
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json({ error: 'Failed to create news article' }, { status: 500 });
  }
}