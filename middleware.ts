import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 許可するパスの定義
  const allowedPaths = [
    '/',
    '/favicon.ico',
    '/_next',
    '/api',
    '/images',
    '/audio'
  ]
  
  // 静的ファイルやAPIルートは通す
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || // 拡張子を含むファイル（画像、音声など）
    pathname === '/' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }
  
  // 特定のページのみ許可
  const allowedPages = [
    '/',
    '/admin',
    '/admin/news',
    '/vote_ponyo',
    '/ponyo-prince',
    '/yamato-maya',
    '/about',
    '/contact',
    '/studio',
    '/idol',
    '/news',
    '/unsubscribe'
  ]

  // 動的ルート（/news/[slug]など）もチェック
  const isDynamicNewsRoute = pathname.startsWith('/news/') && pathname !== '/news'

  if (!allowedPages.includes(pathname) && !isDynamicNewsRoute) {
    return NextResponse.rewrite(new URL('/404', request.url))
  }
  
  return NextResponse.next()
}

// ミドルウェアが適用されるパスを設定
export const config = {
  matcher: [
    // 全てのパスにマッチ（静的ファイルとAPIは上記で除外）
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

