import AsyncStorage from '@react-native-async-storage/async-storage';
import { resolveOfflineConflicts } from './offlineConflictResolver';

const QUEUE_KEY = 'advancedOfflineQueue';

export async function addToQueue(vote: any) {
  const existing = JSON.parse(await AsyncStorage.getItem(QUEUE_KEY) || '[]');
  existing.push(vote);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(existing));
}

export async function processQueue(encryptionKey: string) {
  const votes = JSON.parse(await AsyncStorage.getItem(QUEUE_KEY) || '[]');
  await resolveOfflineConflicts(votes, encryptionKey);
  await AsyncStorage.removeItem(QUEUE_KEY);
}
