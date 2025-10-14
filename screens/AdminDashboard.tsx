import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export default function AdminDashboard() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'elections'), (snapshot) => {
      setElections(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  async function createElection() {
    await addDoc(collection(db, 'elections'), {
      name: '2025 Student Election',
      date: new Date().toISOString(),
    });
  }

  return (
    <View>
      <Button title="Create Election" onPress={createElection} />
      <FlatList
        data={elections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
