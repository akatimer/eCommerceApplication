function isNameValid(name: string): boolean {
  if (!name) {
    return false;
  }
  const valid = /^[a-zA-Z ]+$/.test(name);
  return valid && name === name.trim();
}

export default isNameValid;
