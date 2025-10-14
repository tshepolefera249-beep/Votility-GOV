import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setDarkMode(enabled: boolean) {
  await AsyncStorage.setItem('darkMode', JSON.stringify(enabled));
}

export async function isDarkMode(): Promise<boolean> {
  const value = await AsyncStorage.getItem('darkMode');
  return value === 'true';
}
