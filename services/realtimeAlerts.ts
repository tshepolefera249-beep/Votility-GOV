import { db } from '@/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { sendThemedNotification } from './userNotifications';

export function subscribeElectionAlerts(userToken: string) {
  const electionsRef = collection(db, 'elections');
  const unsubscribe = onSnapshot(electionsRef, (snap) => {
    snap.docChanges().forEach(change => {
      if (change.type === 'added') {
        sendThemedNotification('New Election', `A new election "${change.doc.data().name}" has started!`, userToken);
      }
    });
  });
  return unsubscribe;
}
import { db } from '@/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export function subscribeToCriticalEvents(callback: (event: any) => void) {
  const criticalRef = collection(db, 'systemAlerts');
  return onSnapshot(criticalRef, snapshot => {
    snapshot.docChanges().forEach(change => {
      if(change.type === 'added') callback(change.doc.data());
    });
  });
}
