// security/deviceSessionManager.ts
import NodeCache from 'node-cache';

interface SessionData {
  userId: string;
  deviceId: string;
  issuedAt: number;
}

const sessionCache = new NodeCache({ stdTTL: 3600 }); // 1 hour TTL

export function registerSession(userId: string, deviceId: string) {
  const key = `${userId}:${deviceId}`;
  const session: SessionData = { userId, deviceId, issuedAt: Date.now() };
  sessionCache.set(key, session);
  return session;
}

export function validateSession(userId: string, deviceId: string) {
  const key = `${userId}:${deviceId}`;
  const session = sessionCache.get<SessionData>(key);
  if (!session) throw new Error('Session invalid or expired');
  return session;
}

export function revokeSession(userId: string, deviceId: string) {
  const key = `${userId}:${deviceId}`;
  sessionCache.del(key);
}
