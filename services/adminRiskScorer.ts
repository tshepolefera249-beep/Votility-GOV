import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function scoreAdminRisk(adminId: string) {
  const snap = await getDocs(collection(db, 'adminActions'));
  const actions = snap.docs.map(d => d.data()).filter(a => a.adminId === adminId);
  
  let score = 0;
  actions.forEach(a => {
    if(a.tier === 'high') score += 10;
    if(a.tier === 'medium') score += 5;
  });

  return score; // Higher score = higher risk
}
