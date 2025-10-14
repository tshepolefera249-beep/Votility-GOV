import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';

// Email + Password + 2FA code
export async function loginAdmin(email: string, password: string, code: string) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  // For simplicity, store 2FA code in Firestore or environment
  if (code !== process.env.ADMIN_2FA_CODE) throw new Error('Invalid 2FA code');
  return res.user;
}

// Send email 2FA link
export async function sendAdmin2FALink(email: string) {
  const actionCodeSettings = {
    url: 'https://yourapp.com/adminLogin',
    handleCodeInApp: true
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
}
