import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding() {
  const nav = useNavigation();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:20 }}>
      <Text style={{ fontSize:24, fontWeight:'bold', marginBottom:20 }}>Welcome to Votility</Text>
      <Text style={{ marginBottom:20 }}>Learn how to vote safely and securely using our app. Swipe through to complete onboarding.</Text>
      <Button title="Finish Onboarding" onPress={() => nav.navigate('Login')} />
    </View>
  );
}
