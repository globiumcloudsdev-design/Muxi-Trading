import { NextResponse } from 'next/server';
import { verifyAccessToken, getAccessTokenFromRequest } from '@/lib/auth';

export async function GET(request) {
  const accessToken = getAccessTokenFromRequest(request);
  
  if (!accessToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  
  const result = verifyAccessToken(accessToken);
  
  if (result.valid) {
    return NextResponse.json({ 
      authenticated: true, 
      user: result.decoded 
    });
  }
  
  // Access token expired, but refresh token can get new one
  if (result.expired) {
    return NextResponse.json({ 
      authenticated: false, 
      expired: true 
    }, { status: 401 });
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
