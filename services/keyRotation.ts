import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const KEY_STORAGE = 'currentEncryptionKey';

export async function getCurrentKey() {
  let key = await AsyncStorage.getItem(KEY_STORAGE);
  if(!key) {
    key = generateNewKey();
    await AsyncStorage.setItem(KEY_STORAGE, key);
  }
  return key;
}

export function generateNewKey() {
  return CryptoJS.lib.WordArray.random(32).toString();
}

export async function rotateKey() {
  const newKey = generateNewKey();
  await AsyncStorage.setItem(KEY_STORAGE, newKey);
  return newKey;
}
