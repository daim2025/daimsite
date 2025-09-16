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

const DATA_FILE = path.join(process.cwd(), 'database', 'news.json');

function readNewsData(): NewsItem[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeNewsData(data: NewsItem[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET: 特定のニュース記事を取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = readNewsData();
    const article = news.find(item => item.id === params.id);
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error reading news article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

// PUT: ニュース記事を更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, author, date, slug, featuredImage, videoUrl, externalLink, linkText } = await request.json();
    
    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Title, content, and author are required' }, { status: 400 });
    }
    
    const news = readNewsData();
    const articleIndex = news.findIndex(item => item.id === params.id);
    
    if (articleIndex === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    // slugが提供されていない場合は、タイトルから自動生成
    const finalSlug = slug || title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    news[articleIndex] = {
      ...news[articleIndex],
      title,
      content,
      author,
      date: date || news[articleIndex].date,
      slug: finalSlug,
      featuredImage: featuredImage || undefined,
      videoUrl: videoUrl || undefined,
      externalLink: externalLink || undefined,
      linkText: linkText || undefined
    };
    
    writeNewsData(news);
    
    return NextResponse.json(news[articleIndex]);
  } catch (error) {
    console.error('Error updating news article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE: ニュース記事を削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = readNewsData();
    const articleIndex = news.findIndex(item => item.id === params.id);
    
    if (articleIndex === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    news.splice(articleIndex, 1);
    writeNewsData(news);
    
    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}