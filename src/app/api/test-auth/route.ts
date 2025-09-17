import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key');
  const envKey = process.env.ADMIN_KEY;

  return NextResponse.json({
    message: 'Test endpoint',
    providedKey: adminKey,
    envKey: envKey,
    keysMatch: adminKey === envKey,
    fallbackKey: 'DAIM_TEST_ADMIN_KEY_2024',
    fallbackMatch: adminKey === 'DAIM_TEST_ADMIN_KEY_2024'
  });
}