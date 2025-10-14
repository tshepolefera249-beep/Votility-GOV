import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Validate SA ID using Luhn algorithm
export function validateSAID(id: string) {
  if (!/^\d{13}$/.test(id)) return false;
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    let num = parseInt(id[i]);
    if (i % 2 === 0) sum += num;
    else {
      num *= 2;
      if (num > 9) num -= 9;
      sum += num;
    }
  }
  return sum % 10 === 0;
}

// Register user with ID verification
export async function registerUserWithID(uid: string, saID: string, email: string) {
  if (!validateSAID(saID)) throw new Error('Invalid SA ID');
  const userRef = doc(db, 'users', uid);
  const existing = await getDoc(userRef);
  if (existing.exists()) throw new Error('User already exists');
  await setDoc(userRef, { saID, email, createdAt: new Date().toISOString() });
}
