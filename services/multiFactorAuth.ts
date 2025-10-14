import { authenticateBiometric } from './biometricAuth';
import { sendVerificationEmail } from './emailVerification';

export async function loginUser(userId: string, password: string, email?: string, otp?: string) {
  // Step 1: Verify password (assume Firebase Auth handles it)
  const passwordValid = true; // replace with actual verification
  if (!passwordValid) throw new Error('Invalid password');

  // Step 2: Biometric check
  const biometricValid = await authenticateBiometric();

  // Step 3: OTP check
  if (email && otp) {
    const verified = await verifyEmail(userId, otp, otp);
    if (!verified) throw new Error('OTP verification failed');
  }

  return passwordValid && biometricValid;
}
