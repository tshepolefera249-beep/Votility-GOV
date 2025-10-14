import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function LoadingSkeleton({ width = '100%', height = 20 }) {
  return (
    <View style={[styles.skeleton, { width, height }]} />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 5,
    overflow: 'hidden'
  }
});
