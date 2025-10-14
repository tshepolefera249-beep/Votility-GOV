import { db } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export async function setMaintenanceMode(active: boolean) {
  await updateDoc(doc(db, 'config', 'appSettings'), { maintenanceMode: active });
}
