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
