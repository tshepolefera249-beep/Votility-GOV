// verification/multiFactor.ts
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import nodemailer from 'nodemailer';

export function generateTOTPSecret(userId: string) {
  return speakeasy.generateSecret({ name: `Votility:${userId}` });
}

export async function generateQRCode(secret: string) {
  return await qrcode.toDataURL(secret);
}

export function verifyTOTP(token: string, secret: string) {
  return speakeasy.totp.verify({ secret, encoding: 'base32', token });
}

export async function sendEmailOTP(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.MFA_EMAIL, pass: process.env.MFA_PASS },
  });
  await transporter.sendMail({
    from: process.env.MFA_EMAIL,
    to: email,
    subject: 'Your Votility Login OTP',
    text: `Use this OTP to complete login: ${otp}`,
  });
}
