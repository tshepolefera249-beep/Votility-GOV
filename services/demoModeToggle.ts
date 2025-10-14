import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setDemoMode(enabled: boolean) {
  await AsyncStorage.setItem('demoMode', JSON.stringify(enabled));
}

export async function isDemoMode(): Promise<boolean> {
  const value = await AsyncStorage.getItem('demoMode');
  return value === 'true';
}
