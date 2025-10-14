import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function generateAdminActivityHeatmap() {
  const snap = await getDocs(collection(db, 'adminActions'));
  const heatmap: Record<string, number> = {};
  snap.docs.forEach(doc => {
    const date = new Date(doc.data().timestamp.seconds * 1000).toDateString();
    heatmap[date] = (heatmap[date] || 0) + 1;
  });
  return heatmap;
}
