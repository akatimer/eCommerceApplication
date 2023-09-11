import { describe, expect, it } from 'vitest';
import isEmailValid from './isEmailValid';

describe('Is', () => {
  it('Test for true', () => {
    expect(isEmailValid('test@test.com')).toBeDefined();
  });
  it('Test for empty line', () => {
    expect(isEmailValid('')).toBeFalsy();
  });
  it('Test without @', () => {
    expect(isEmailValid('test')).toBeFalsy();
  });
  it('Test without domain', () => {
    expect(isEmailValid('test@')).toBeFalsy();
  });
  it('Test with spaces', () => {
    expect(isEmailValid(' test@ ')).toBeFalsy();
  });
});
