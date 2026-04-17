import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret-key';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key';

// ==================== ACCESS TOKEN (15 min) ====================
export function generateAccessToken(userId, email, role) {
  return jwt.sign(
    { id: userId, email, role, type: 'access' },
    ACCESS_SECRET,
    { expiresIn: '15m' }  // 15 minutes
  );
}

export function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { valid: false, expired: true, decoded: null };
    }
    return { valid: false, expired: false, decoded: null };
  }
}

// ==================== REFRESH TOKEN (7 days) ====================
export function generateRefreshToken(userId, email, role) {
  return jwt.sign(
    { id: userId, email, role, type: 'refresh' },
    REFRESH_SECRET,
    { expiresIn: '7d' }  // 7 days
  );
}

export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { valid: false, expired: true, decoded: null };
    }
    return { valid: false, expired: false, decoded: null };
  }
}

// ==================== TOKEN HELPERS ====================
export function getAccessTokenFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  // Browser page navigations won't send Authorization headers.
  // Read access token from cookie so proxy auth checks can pass.
  const cookieToken = request.cookies.get('accessToken')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

export function getRefreshTokenFromRequest(request) {
  return request.cookies.get('refreshToken')?.value;
}

// ==================== VERIFY AUTH ====================
export async function verifyAuth(request) {
  // First check access token
  const accessToken = getAccessTokenFromRequest(request);
  
  if (accessToken) {
    const result = verifyAccessToken(accessToken);
    if (result.valid) {
      return {
        authenticated: true,
        user: result.decoded,
        needNewToken: false
      };
    }
  }
  
  // Access token expired, check refresh token
  const refreshToken = getRefreshTokenFromRequest(request);
  
  if (!refreshToken) {
    return { authenticated: false, user: null, needNewToken: false };
  }
  
  const refreshResult = verifyRefreshToken(refreshToken);
  
  if (!refreshResult.valid) {
    return { authenticated: false, user: null, needNewToken: false };
  }
  
  // Refresh token valid, generate new access token
  const newAccessToken = generateAccessToken(
    refreshResult.decoded.id,
    refreshResult.decoded.email,
    refreshResult.decoded.role
  );
  
  return {
    authenticated: true,
    user: refreshResult.decoded,
    needNewToken: true,
    newAccessToken
  };
}