import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function AdminAnalytics() {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'votes'), snap => {
      setVotes(snap.docs.map(d => d.data()));
    });
    return unsub;
  }, []);

  const candidates = Array.from(new Set(votes.map(v => v.vote)));
  const data = candidates.map(c => votes.filter(v => v.vote === c).length);

  return (
    <View>
      <BarChart
        data={{
          labels: candidates,
          datasets: [{ data }]
        }}
        width={Dimensions.get('window').width - 30}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`
        }}
        style={{ marginVertical: 10 }}
      />
    </View>
  );
}
