import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function checkAppHealth() {
  try {
    const electionsSnap = await getDocs(collection(db, 'elections'));
    const votesSnap = await getDocs(collection(db, 'votes'));
    return {
      electionsCount: electionsSnap.size,
      votesCount: votesSnap.size,
      status: 'ok'
    };
  } catch (e) {
    return { status: 'error', error: e };
  }
}
