export default function isPasswordValid(password: string): boolean | null {
  const uppers = password.match(/[A-Z]/);
  const lowers = password.match(/[a-z]/);
  const numbers = password.match(/\d/);
  const MAX_PASSWORD_LENGTH = 8;
  return (
    password.length >= MAX_PASSWORD_LENGTH &&
    lowers &&
    uppers &&
    numbers &&
    password === password.trim()
  );
}
