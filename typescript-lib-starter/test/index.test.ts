import { example } from 'index';
import * as mockTimers from './utils/mockTimers';

describe('example', () => {
  beforeEach(() => {
    mockTimers.before();
  });

  afterEach(() => {
    mockTimers.after();
  });

  test('should return the correct value', () => {
    const val = example();
    expect(val).toBe('example');
  });
});
