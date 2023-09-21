function isPostalCodeValid(code: string): boolean {
  const usaPattern = /^\d{5}(?:-\d{4})?$/;
  const canadaPattern = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] \d[A-Z]\d$/;

  const canadaNewPatern = /^[A-Z]\d[A-Z] [A-Z]\d[A-Z]$/;

  return usaPattern.test(code) || canadaPattern.test(code) || canadaNewPatern.test(code);
}

export default isPostalCodeValid;
