import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { getLeaderboard } from '@/services/leaderboard';

export default function CandidateGraph({ electionId }: { electionId: string }) {
  const [data, setData] = useState<{ candidate: string, votes: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const leaderboard = await getLeaderboard(electionId);
      setData(leaderboard);
    }
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [electionId]);

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
      <VictoryBar data={data} x="candidate" y="votes" />
    </VictoryChart>
  );
}
