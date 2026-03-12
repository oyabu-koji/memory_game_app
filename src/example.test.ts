import { describe, expect, it } from 'vitest';
import { ping } from './example';

describe('ping', () => {
  it('returns a predictable response', () => {
    expect(ping('template')).toBe('pong:template');
  });
});
