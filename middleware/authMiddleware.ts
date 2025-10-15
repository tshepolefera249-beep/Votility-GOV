// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../security/jwtManager';
import { validateSession } from '../security/deviceSessionManager';

export function zeroTrustAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const payload = verifyToken(token);
    validateSession(payload.sub, payload.deviceId);

    // attach user info to request for handlers
    (req as any).user = { id: payload.sub, deviceId: payload.deviceId };
    next();
  } catch (err: any) {
    return res.status(403).json({ message: err.message });
  }
}
