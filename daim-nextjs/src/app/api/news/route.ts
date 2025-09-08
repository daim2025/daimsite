import { NextRequest, NextResponse } from 'next/server';
import { newsStore } from '@/lib/kv-store';

// GET: 全ニュース記事を取得
export async function GET() {
  try {
    const news = await newsStore.getAll();
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
    
    // slugが提供されていない場合は、タイトルから自動生成
    const finalSlug = slug || title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    const newArticle = await newsStore.create({
      title,
      content,
      date: date || new Date().toISOString().split('T')[0],
      author,
      slug: finalSlug,
      ...(featuredImage && { featuredImage }),
      ...(videoUrl && { videoUrl }),
      ...(externalLink && { externalLink }),
      ...(linkText && { linkText })
    });
    
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json({ error: 'Failed to create news article' }, { status: 500 });
  }
}