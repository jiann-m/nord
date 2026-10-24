// MODEL for auth. Phase 1 uses a fake delay; Phase 2 swaps this for Firebase Authentication.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function validateEmail(email: string) {
  if (!email.trim()) return 'Enter your email';
  if (!email.includes('@') || !email.includes('.')) return 'Enter a valid email';
  return '';
}

export function validatePassword(password: string) {
  if (!password) return 'Enter your password';
  if (password.length < 8) return 'Password needs at least 8 characters';
  return '';
}

export async function signIn(email: string, password: string) {
  await wait(700);
  return { email: email.trim().toLowerCase() };
}

export async function signUp(name: string, email: string, password: string) {
  await wait(900);
  return { name: name.trim(), email: email.trim().toLowerCase() };
}