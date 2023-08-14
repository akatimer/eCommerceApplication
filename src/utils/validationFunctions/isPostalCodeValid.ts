function isPostalCodeValid(code: string): boolean {
  const postalCodePattern = /^[0-9]{5}(?:-[0-9]{4})?|[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/;

  return postalCodePattern.test(code);
}

export default isPostalCodeValid;
