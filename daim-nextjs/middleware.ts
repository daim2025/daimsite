import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 静的ファイルやAPIルートは通す
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || // 拡張子を含むファイル（画像、音声など）
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // すべてのページアクセスを許可
  return NextResponse.next()
}

// ミドルウェアが適用されるパスを設定
export const config = {
  matcher: [
    // 全てのパスにマッチ（静的ファイルとAPIは上記で除外）
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

