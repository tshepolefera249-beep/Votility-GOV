export function validatePassword(password: string): boolean {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  return password.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial;
}
