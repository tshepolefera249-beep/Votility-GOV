import { getEncrypted } from './encryptedCache';
import { resolveOfflineConflicts } from './offlineConflictResolver';

export async function reconcileOfflineVotes(encryptionKey: string) {
  const offlineVotes = await getEncrypted('offlineVotes');
  if(offlineVotes?.length) {
    await resolveOfflineConflicts(offlineVotes, encryptionKey);
  }
}
