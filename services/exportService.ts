import { getVoteStats } from './voteStats';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export async function exportResults(electionId: string) {
  const stats = await getVoteStats(electionId);
  const csv = ['Candidate, Votes', ...Object.entries(stats.stats).map(([c,v]) => `${c}, ${v}`)].join('\n');
  const path = FileSystem.documentDirectory + `${electionId}_results.csv`;
  await FileSystem.writeAsStringAsync(path, csv);
  await Sharing.shareAsync(path);
}
