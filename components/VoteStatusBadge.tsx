import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VoteStatusBadge({ voted }: { voted: boolean }) {
  return (
    <View style={[styles.badge, { backgroundColor: voted ? 'green' : 'red' }]}>
      <Text style={styles.text}>{voted ? 'Voted' : 'Not Voted'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start'
  },
  text: { color: 'white', fontWeight: 'bold' }
});
