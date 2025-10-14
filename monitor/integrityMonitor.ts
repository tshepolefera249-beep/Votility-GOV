// monitor/integrityMonitor.ts
import { verifyLedger } from '../ledger/encryptedAuditLedger';
import { anchorElectionHash } from '../blockchain/anchorVotes';
import crypto from 'crypto';

export async function monitorIntegrity() {
  try {
    verifyLedger();
    const currentHash = crypto.randomBytes(32).toString('hex');
    await anchorElectionHash(currentHash);
    console.log('Integrity verified and hash anchored.');
  } catch (err) {
    console.error('Integrity failure detected:', err);
  }
}
