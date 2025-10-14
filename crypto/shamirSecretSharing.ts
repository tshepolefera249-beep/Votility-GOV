// crypto/shamirSecretSharing.ts
import secrets from 'secrets.js-grempe';

export function splitSecret(secret: string, total: number, threshold: number) {
  return secrets.share(secrets.str2hex(secret), total, threshold);
}

export function combineShares(shares: string[]) {
  return secrets.hex2str(secrets.combine(shares));
}
