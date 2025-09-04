import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 静的ファイル、API、認証ページ、faviconを除外
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/audio') ||
    pathname === '/auth' ||
    pathname === '/favicon.ico' ||
    pathname.includes('.') // 拡張子を含むファイル
  ) {
    return NextResponse.next()
  }

  // 他のページは /auth にリダイレクト
  const authUrl = new URL('/auth', request.url)
  
  // 現在のパスをクエリパラメータとして保存
  if (pathname !== '/') {
    authUrl.searchParams.set('redirect', pathname)
  }
  
  return NextResponse.redirect(authUrl)
}

export const config = {
  matcher: [
    /*
     * すべてのリクエストパスにマッチ、ただし以下を除く:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

