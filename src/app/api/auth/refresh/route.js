import { NextResponse } from 'next/server';
import { verifyRefreshToken, generateAccessToken, getRefreshTokenFromRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    // Get refresh token from cookie
    const refreshToken = getRefreshTokenFromRequest(request);
    
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }
    
    // Verify refresh token
    const result = verifyRefreshToken(refreshToken);
    
    if (!result.valid) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }
    
    // Generate new access token
    const newAccessToken = generateAccessToken(
      result.decoded.id,
      result.decoded.email,
      result.decoded.role
    );
    
    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
    
  } catch (error) {
    // Refresh error: ${error.message};
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}