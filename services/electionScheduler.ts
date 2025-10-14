import cron from 'node-cron';
import { notifyElectionStart, notifyElectionEnd } from './electionNotifications';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export function scheduleElections() {
  // Every minute, check elections
  cron.schedule('* * * * *', async () => {
    const electionsSnap = await getDocs(collection(db, 'elections'));
    const now = new Date();

    electionsSnap.docs.forEach(docSnap => {
      const election = docSnap.data();
      if (election.startTime <= now && !election.started) {
        notifyElectionStart(election.name);
        docSnap.ref.update({ started: true });
      }
      if (election.endTime <= now && !election.ended) {
        notifyElectionEnd(election.name);
        docSnap.ref.update({ ended: true });
      }
    });
  });
}
