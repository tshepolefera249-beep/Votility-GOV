import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function AdminLiveMonitor() {
  const [liveStats, setLiveStats] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'votes'), snap => {
      const stats = snap.docs.reduce((acc, doc) => {
        const vote = doc.data().vote;
        acc[vote] = (acc[vote] || 0) + 1;
        return acc;
      }, {});
      setLiveStats(stats);
    });
    return unsub;
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Live Voting Stats</Text>
      {Object.keys(liveStats).map(candidate => (
        <Text key={candidate}>{candidate}: {liveStats[candidate]}</Text>
      ))}
    </View>
  );
}
