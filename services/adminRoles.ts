import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function getAdminRole(uid: string) {
  const ref = doc(db, 'admins', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return 'none';
  return snap.data().role; // 'superadmin', 'regional', 'manager'
}

export async function checkAdminPermission(uid: string, requiredRole: string) {
  const role = await getAdminRole(uid);
  const hierarchy = ['none', 'manager', 'regional', 'superadmin'];
  return hierarchy.indexOf(role) >= hierarchy.indexOf(requiredRole);
}
