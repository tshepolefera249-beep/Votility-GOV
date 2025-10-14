import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, addDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

export default function AdminElectionManager() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'elections'), (snap) => {
      setElections(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  async function createElection() {
    await addDoc(collection(db, 'elections'), {
      name: 'New Election',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 1000*60*60*24).toISOString(), // 24h election
      active: false
    });
  }

  async function toggleElectionActive(id: string, current: boolean) {
    const ref = doc(db, 'elections', id);
    await updateDoc(ref, { active: !current });
  }

  return (
    <View>
      <Button title="Create Election" onPress={createElection} />
      <FlatList
        data={elections}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} | Active: {item.active ? 'Yes' : 'No'}</Text>
            <Button title={item.active ? 'Deactivate' : 'Activate'} onPress={() => toggleElectionActive(item.id, item.active)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
