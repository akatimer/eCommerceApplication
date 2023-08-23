function isDateValid(date: string): boolean {
  const currentDate = new Date();
  const inputDate = new Date(date);

  const minAgeMilliseconds = 13 * 365.25 * 24 * 60 * 60 * 1000;

  const minAgeDate = new Date(currentDate.getTime() - minAgeMilliseconds);

  return inputDate <= minAgeDate;
}

export default isDateValid;
