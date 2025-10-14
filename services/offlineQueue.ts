import AsyncStorage from '@react-native-async-storage/async-storage';

export async function queuePendingVote(vote: any) {
  const existing = JSON.parse(await AsyncStorage.getItem('pendingVotes') || '[]');
  existing.push(vote);
  await AsyncStorage.setItem('pendingVotes', JSON.stringify(existing));
}

export async function syncPendingVotes(castVoteFunc: (vote:any)=>Promise<void>) {
  const votes = JSON.parse(await AsyncStorage.getItem('pendingVotes') || '[]');
  for (const v of votes) await castVoteFunc(v);
  await AsyncStorage.removeItem('pendingVotes');
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { castVote } from './voting';

export async function queuePendingVote(vote: any) {
  const existing = JSON.parse(await AsyncStorage.getItem('pendingVotes') || '[]');
  existing.push(vote);
  await AsyncStorage.setItem('pendingVotes', JSON.stringify(existing));
}

export async function syncPendingVotes() {
  const votes = JSON.parse(await AsyncStorage.getItem('pendingVotes') || '[]');
  const failed: any[] = [];

  for (const v of votes) {
    try {
      await castVote(v.userId, v.electionId, v.vote, v.encryptionKey);
    } catch {
      failed.push(v); // keep failed votes
    }
  }

  await AsyncStorage.setItem('pendingVotes', JSON.stringify(failed));
  return { synced: votes.length - failed.length, failed: failed.length };
}
