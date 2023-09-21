function isStreetValid(street: string): boolean {
  return street.trim().length > 0 && street.trim() === street;
}

export default isStreetValid;
