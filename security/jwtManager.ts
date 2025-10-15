// security/jwtManager.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
const JWT_EXPIRY = '15m'; // short-lived for zero-trust

export function generateToken(userId: string, deviceId: string) {
  return jwt.sign({ sub: userId, deviceId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; deviceId: string; iat: number; exp: number };
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

// Rotate token: issue new token if old one is nearing expiry
export function rotateToken(oldToken: string) {
  const payload = verifyToken(oldToken);
  return generateToken(payload.sub, payload.deviceId);
}
