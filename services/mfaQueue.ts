import AsyncStorage from '@react-native-async-storage/async-storage';

const MFA_QUEUE_KEY = 'mfaQueue';

export async function enqueueMFA(userId: string, code: string) {
  const existing = JSON.parse(await AsyncStorage.getItem(MFA_QUEUE_KEY) || '[]');
  existing.push({ userId, code, timestamp: Date.now() });
  await AsyncStorage.setItem(MFA_QUEUE_KEY, JSON.stringify(existing));
}

export async function dequeueMFA() {
  const existing = JSON.parse(await AsyncStorage.getItem(MFA_QUEUE_KEY) || '[]');
  if(existing.length === 0) return null;
  const item = existing.shift();
  await AsyncStorage.setItem(MFA_QUEUE_KEY, JSON.stringify(existing));
  return item;
}
