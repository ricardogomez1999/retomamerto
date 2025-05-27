import { isValidationError } from '../app/api/candidates/route';

describe('isValidationError', () => {
  it('returns true for mongoose validation errors', () => {
    const error = { name: 'ValidationError', message: 'invalid' };
    expect(isValidationError(error)).toBe(true);
  });

  it('returns false for non-validation errors', () => {
    const otherError = { name: 'OtherError', message: 'wrong' };
    expect(isValidationError(otherError)).toBe(false);
    expect(isValidationError(new Error('oops'))).toBe(false);
  });
});
