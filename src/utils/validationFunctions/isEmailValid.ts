export default function isEmailValid(email: string): boolean | null {
  const re = /\S+@\S+\.\S+/;
  return email.match(re) && email === email.trim();
}
