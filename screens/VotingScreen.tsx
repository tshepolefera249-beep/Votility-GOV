import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { castVote } from '@/services/voting';
import i18n from '@/i18n/i18n';

export default function VotingScreen({ route }) {
  const { userId, electionId, encryptionKey, candidates } = route.params;
  const [message, setMessage] = useState('');

  async function vote(candidateId: string) {
    try {
      const res = await castVote(userId, electionId, candidateId, encryptionKey);
      setMessage(res);
    } catch (e: any) {
      setMessage(e.message);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>{i18n.t('vote')}:</Text>
      {candidates.map(c => (
        <Button key={c} title={c} onPress={() => vote(c)} />
      ))}
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}
