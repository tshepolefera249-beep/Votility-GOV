import jwt from 'jsonwebtoken';

export function generateSessionToken(userId: string, secret: string, expiresIn = '2h') {
  return jwt.sign({ userId }, secret, { expiresIn });
}

export function validateSessionToken(token: string, secret: string) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}
