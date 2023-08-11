export default function isEmailValid(email: string): boolean | null {
  const valid = email.match(/\S+@\S+\.\S+/);
  return valid && email === email.trim();
}
