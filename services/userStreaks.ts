import { db } from '@/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export async function updateUserStreak(userId: string) {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return;
  const lastVote = snap.data()?.lastVoteDate;
  const streak = snap.data()?.streak || 0;

  const today = new Date().toDateString();
  if (lastVote === today) return streak; // already voted today

  let newStreak = 1;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (lastVote === yesterday.toDateString()) newStreak = streak + 1;

  await updateDoc(userRef, { streak: newStreak, lastVoteDate: today });
  return newStreak;
}
