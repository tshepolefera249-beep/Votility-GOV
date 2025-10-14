import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuickStats({ title, value }: { title: string, value: string | number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 10, backgroundColor: '#eee', margin: 10, alignItems: 'center' },
  title: { fontSize: 14, color: '#555' },
  value: { fontSize: 24, fontWeight: 'bold' }
});
