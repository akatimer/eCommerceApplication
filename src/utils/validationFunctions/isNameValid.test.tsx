import { describe, expect, it } from 'vitest';
import isNameValid from '../../utils/validationFunctions/isNameValid';

describe('Is', () => {
  it('Test for true', () => {
    expect(isNameValid('Test')).toBeDefined();
  });
  it('Test for empty line', () => {
    expect(isNameValid('')).toBeFalsy();
  });
});
