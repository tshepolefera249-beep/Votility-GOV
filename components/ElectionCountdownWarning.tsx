import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function ElectionCountdownWarning({ endTime, warningThreshold = 3600 }: { endTime: string, warningThreshold?: number }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [warn, setWarn] = useState(false);

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
      setWarn(diff / 1000 < warningThreshold);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, warningThreshold]);

  return <Text style={[styles.text, warn && styles.warning]}>{timeLeft}</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  warning: { color: 'red' }
});
