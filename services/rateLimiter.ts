import AsyncStorage from '@react-native-async-storage/async-storage';

const RATE_LIMIT_KEY = 'voteRateLimit';
const MAX_VOTES_PER_MINUTE = 1;

export async function canVote(): Promise<boolean> {
  const data = await AsyncStorage.getItem(RATE_LIMIT_KEY);
  const now = Date.now();
  if (!data) {
    await AsyncStorage.setItem(RATE_LIMIT_KEY, JSON.stringify([now]));
    return true;
  }

  const timestamps: number[] = JSON.parse(data).filter((t: number) => now - t < 60000);
  if (timestamps.length >= MAX_VOTES_PER_MINUTE) return false;

  timestamps.push(now);
  await AsyncStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
  return true;
}
