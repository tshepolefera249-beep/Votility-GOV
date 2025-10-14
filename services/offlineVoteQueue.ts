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
