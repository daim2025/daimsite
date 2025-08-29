import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  console.log('🔐 AUTH API CALLED:', request.url);
  
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    console.log('❌ No auth header in API');
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Site"',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
  
  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');
    
    const validUsername = process.env.BASIC_AUTH_USERNAME || 'admin';
    const validPassword = process.env.BASIC_AUTH_PASSWORD || 'password';
    
    if (username === validUsername && password === validPassword) {
      console.log('✅ Auth successful in API');
      return NextResponse.json({ authenticated: true });
    }
    
    console.log('❌ Invalid credentials in API');
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Site"',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.log('❌ Auth error in API:', error);
    return new NextResponse('Authentication error', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Site"',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}



