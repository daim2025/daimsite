import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Basic認証の実装
  const basicAuth = request.headers.get('authorization')
  const url = request.nextUrl.clone()

  // 静的ファイルやAPIルート、favicon等はBasic認証をスキップ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/audio') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Basic認証のチェック
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')
    
    // 環境変数から認証情報を取得（デフォルト値付き）
    const validUser = process.env.BASIC_AUTH_USERNAME || 'Admin'
    const validPassword = process.env.BASIC_AUTH_PASSWORD || '0070'
    
    if (user === validUser && pwd === validPassword) {
      return NextResponse.next()
    }
  }

  // 認証が必要な場合のレスポンス
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="DAIM Site"',
      'Content-Type': 'text/plain',
    },
  })
}

// ミドルウェアが適用されるパスを設定
export const config = {
  matcher: [
    // 全てのパスにマッチ（静的ファイルとAPIは上記で除外）
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

