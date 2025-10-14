import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function impersonateUser(adminId: string, targetUserId: string) {
  const userRef = doc(db, 'users', targetUserId);
  const userSnap = await getDoc(userRef);
  if(!userSnap.exists()) throw new Error('User not found');

  // Log impersonation
  console.log(`Admin ${adminId} is impersonating ${targetUserId}`);

  return userSnap.data(); // return user data to simulate session
}
