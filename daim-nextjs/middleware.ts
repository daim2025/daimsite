import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 環境変数から認証情報を取得
  const validUser = process.env.BASIC_AUTH_USERNAME || 'Admin'
  const validPassword = process.env.BASIC_AUTH_PASSWORD || '0070'
  
  // Basic認証をチェック
  const basicAuth = request.headers.get('authorization')
  
  if (basicAuth) {
    try {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')
      
      if (user === validUser && pwd === validPassword) {
        return NextResponse.next()
      }
    } catch (error) {
      // 認証ヘッダーの解析に失敗した場合
    }
  }

  // 認証が失敗した場合、Basic認証ダイアログを表示
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="DAIM Site"',
    },
  })
}

// すべてのページにBasic認証を適用（静的ファイルやAPIは除外）
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|audio).*)',
  ],
}

