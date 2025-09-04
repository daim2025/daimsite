import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // デバッグ用ログ
  console.log('Middleware triggered for:', request.nextUrl.pathname)
  
  // 環境変数から認証情報を取得
  const validUser = process.env.BASIC_AUTH_USERNAME || 'Admin'
  const validPassword = process.env.BASIC_AUTH_PASSWORD || '0070'
  
  console.log('Valid user:', validUser)
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    hasUsername: !!process.env.BASIC_AUTH_USERNAME,
    hasPassword: !!process.env.BASIC_AUTH_PASSWORD
  })
  
  // Basic認証をチェック
  const basicAuth = request.headers.get('authorization')
  console.log('Basic auth header:', basicAuth ? 'Present' : 'Missing')
  
  if (basicAuth) {
    try {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')
      
      console.log('Provided user:', user)
      
      if (user === validUser && pwd === validPassword) {
        console.log('Authentication successful')
        return NextResponse.next()
      }
    } catch (error) {
      console.log('Auth header parsing error:', error)
    }
  }

  console.log('Sending 401 response')
  // 認証が失敗した場合、Basic認証ダイアログを表示
  const response = new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store',
    },
  })
  
  // ヘッダーを明示的に設定
  response.headers.set('WWW-Authenticate', 'Basic realm="Secure Area"')
  
  return response
}

// すべてのページにBasic認証を適用
export const config = {
  matcher: [
    '/',
    '/ponyo-prince',
    '/studio',
    '/contact',
    '/idol',
    '/admin',
    '/unsubscribe'
  ],
}

