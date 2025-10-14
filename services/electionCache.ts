import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const CACHE_KEY = 'electionCache';

export async function cacheElections() {
  const snap = await getDocs(collection(db, 'elections'));
  const elections = snap.docs.map(doc => doc.data());
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(elections));
  return elections;
}

export async function getCachedElections() {
  const raw = await AsyncStorage.getItem(CACHE_KEY);
  return raw ? JSON.parse(raw) : [];
}
