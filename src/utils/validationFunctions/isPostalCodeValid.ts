function isPostalCodeValid(code: string): boolean {
  // 11111 or 11111-1111
  const usaPattern = /^\d{5}(?:-\d{4})?$/;
  // A1A 1A1
  const canadaPattern = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] \d[A-Z]\d$/;

  return usaPattern.test(code) || canadaPattern.test(code);
}

export default isPostalCodeValid;
