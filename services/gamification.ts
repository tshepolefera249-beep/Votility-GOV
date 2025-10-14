import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Award a badge for first vote
export async function awardFirstVoteBadge(userId: string) {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  const badges = snap.data()?.badges || [];
  if (!badges.includes('firstVote')) {
    badges.push('firstVote');
    await updateDoc(userRef, { badges });
    return true;
  }
  return false;
}

// Track streaks
export async function trackVotingStreak(userId: string) {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  const lastVote = snap.data()?.lastVote;
  const streak = snap.data()?.streak || 0;
  const today = new Date().toDateString();

  if (lastVote === today) return streak; // already voted today
  const newStreak = lastVote === new Date(Date.now() - 86400000).toDateString() ? streak + 1 : 1;
  await updateDoc(userRef, { streak: newStreak, lastVote: today });
  return newStreak;
}
