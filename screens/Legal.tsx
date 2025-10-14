import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Legal() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Privacy Policy & Terms of Use</Text>
      <Text>We collect and store your personal information securely. By using Votility, you consent to our data collection and use in accordance with POPIA.</Text>
      <Text>Votes are stored encrypted. Admins can view results but cannot alter votes.</Text>
      <Text>For full details, visit our website or contact support.</Text>
    </ScrollView>
  );
}
