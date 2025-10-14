import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function ElectionTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState<number>(endTime.getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endTime.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const hours = Math.floor(timeLeft / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return <Text>{`${hours}h ${minutes}m ${seconds}s`}</Text>;
}
