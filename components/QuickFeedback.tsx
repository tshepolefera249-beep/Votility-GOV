import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function QuickFeedback({ onSubmit }: { onSubmit: (feedback: string) => void }) {
  const [feedback, setFeedback] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput style={styles.input} value={feedback} onChangeText={setFeedback} placeholder="Enter feedback..." />
      <Button title="Submit" onPress={() => { onSubmit(feedback); setFeedback(''); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10 },
  title: { fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
});
