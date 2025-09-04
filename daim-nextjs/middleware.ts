import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 静的ファイル、API、認証ページはスルー
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/audio') ||
    pathname === '/auth' ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 他のページは /auth にリダイレクト
  return NextResponse.redirect(new URL('/auth', request.url))
}

// すべてのページに認証を適用（除外ルール以外）
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|audio|auth).*)',
  ],
}

