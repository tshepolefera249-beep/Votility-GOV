import jwt from 'jsonwebtoken';

export function refreshSession(oldToken: string, secret: string, expiry = '2h') {
  try {
    const payload: any = jwt.verify(oldToken, secret, { ignoreExpiration: true });
    return jwt.sign({ userId: payload.userId }, secret, { expiresIn: expiry });
  } catch {
    return null;
  }
}
