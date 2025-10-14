import { db } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

export async function sendVerificationEmail(userId: string, email: string, code: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Votility Email Verification',
    text: `Your verification code is: ${code}`
  });
}

export async function verifyEmail(userId: string, code: string, inputCode: string) {
  if (code === inputCode) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { emailVerified: true });
    return true;
  }
  return false;
}
