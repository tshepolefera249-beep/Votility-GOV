import AsyncStorage from '@react-native-async-storage/async-storage';
import { submitVote } from './voteService';

const QUEUE_KEY = 'offlineVoteQueue';

export async function enqueueVote(voteData: any) {
  const queueRaw = await AsyncStorage.getItem(QUEUE_KEY);
  const queue = queueRaw ? JSON.parse(queueRaw) : [];
  queue.push(voteData);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function flushQueue() {
  const queueRaw = await AsyncStorage.getItem(QUEUE_KEY);
  if (!queueRaw) return;
  const queue = JSON.parse(queueRaw);
  for (const vote of queue) {
    await submitVote(vote);
  }
  await AsyncStorage.removeItem(QUEUE_KEY);
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { submitVote } from './voteSubmission';

const QUEUE_KEY = 'offlineVoteQueue';

export async function enqueueOfflineVote(vote: any) {
  const existing = JSON.parse(await AsyncStorage.getItem(QUEUE_KEY) || '[]');
  existing.push(vote);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(existing));
}

export async function syncOfflineVotes(encryptionKey: string) {
  const queue = JSON.parse(await AsyncStorage.getItem(QUEUE_KEY) || '[]');
  for (const vote of queue) {
    await submitVote(vote.userId, vote.electionId, vote.candidateId, encryptionKey);
  }
  await AsyncStorage.removeItem(QUEUE_KEY);
}
