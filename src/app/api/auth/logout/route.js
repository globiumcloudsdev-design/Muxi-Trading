import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
  
  response.cookies.delete('refreshToken');
  response.cookies.delete('accessToken');
  
  return response;
}