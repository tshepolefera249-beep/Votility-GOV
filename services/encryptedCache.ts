import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

export async function saveEncrypted(key: string, value: any, expireInSec = 3600) {
  const data = {
    value,
    expires: Date.now() + expireInSec * 1000
  };
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), await getEncryptionKey()).toString();
  await AsyncStorage.setItem(key, encrypted);
}

export async function getEncrypted(key: string) {
  const encrypted = await AsyncStorage.getItem(key);
  if(!encrypted) return null;
  const bytes = CryptoJS.AES.decrypt(encrypted, await getEncryptionKey());
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  if(Date.now() > data.expires) {
    await AsyncStorage.removeItem(key);
    return null;
  }
  return data.value;
}

async function getEncryptionKey() {
  const { getCurrentKey } = await import('./keyRotation');
  return getCurrentKey();
}
