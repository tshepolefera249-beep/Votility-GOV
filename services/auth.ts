import * as LocalAuthentication from 'expo-local-authentication';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export async function registerUser(email: string, password: string) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, 'users', res.user.uid), { email });
}

export async function loginWithGoogle(idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(auth, credential);
}

export async function biometricAuth() {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  if (!compatible) throw new Error('No biometrics available');
  const result = await LocalAuthentication.authenticateAsync();
  return result.success;
}

