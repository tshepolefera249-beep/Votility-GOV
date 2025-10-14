import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ElectionCountdown({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('Election ended');
        clearInterval(interval);
        return;
      }
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return <Text style={styles.text}>{timeLeft}</Text>;
}

const styles = StyleSheet.create({ text: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' } });
