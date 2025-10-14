import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Onboarding({ steps }: { steps: string[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{steps[current]}</Text>
      {current < steps.length - 1 && <Button title="Next" onPress={next} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, textAlign: 'center', marginBottom: 20 }
});
