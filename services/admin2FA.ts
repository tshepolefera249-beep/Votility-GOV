import * as speakeasy from 'speakeasy';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function verifyAdmin2FA(adminId: string, token: string) {
  const ref = doc(db, 'admins', adminId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;
  const secret = snap.data()?.twoFASecret;
  return speakeasy.totp.verify({ secret, encoding: 'base32', token });
}
