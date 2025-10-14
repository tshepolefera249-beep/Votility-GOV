import jwt from 'jsonwebtoken';

export function generateTempAdminToken(adminId: string, secret: string, duration = '15m') {
  return jwt.sign({ adminId, temp: true }, secret, { expiresIn: duration });
}

export function validateTempAdminToken(token: string, secret: string) {
  try {
    const payload: any = jwt.verify(token, secret);
    return payload.temp === true ? payload.adminId : null;
  } catch {
    return null;
  }
}
