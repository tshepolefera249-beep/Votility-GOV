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
import { db } from '@/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function assignAdminRole(userId: string, role: string) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { role });
}

export async function checkAdminRole(userId: string, role: string) {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return false;
  return snap.data()?.role === role;
}
