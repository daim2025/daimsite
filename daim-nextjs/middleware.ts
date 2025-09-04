import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 一時的にmiddlewareを無効化してテスト
  return NextResponse.next()
}

// すべてのページに認証を適用（除外ルール以外）
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|audio).*)',
  ],
}

