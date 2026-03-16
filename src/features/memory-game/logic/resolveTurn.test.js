import { describe, expect, it } from 'vitest';
import { resolveTurn } from './resolveTurn.js';

const makeCards = (matchedCards = []) => [
  {
    id: 'apple-a',
    symbol: 'apple',
    isFlipped: true,
    isMatched: matchedCards.includes('apple-a'),
    position: 0,
  },
  {
    id: 'apple-b',
    symbol: 'apple',
    isFlipped: true,
    isMatched: matchedCards.includes('apple-b'),
    position: 1,
  },
  {
    id: 'moon-a',
    symbol: 'moon',
    isFlipped: true,
    isMatched: matchedCards.includes('moon-a'),
    position: 2,
  },
  {
    id: 'moon-b',
    symbol: 'moon',
    isFlipped: true,
    isMatched: matchedCards.includes('moon-b'),
    position: 3,
  },
];

describe('resolveTurn', () => {
  it('returns a match resolution', () => {
    expect(resolveTurn(makeCards(), ['apple-a', 'apple-b'])).toEqual({
      kind: 'match',
      cardIds: ['apple-a', 'apple-b'],
      isFinished: false,
    });
  });

  it('returns a mismatch resolution', () => {
    expect(resolveTurn(makeCards(), ['apple-a', 'moon-a'])).toEqual({
      kind: 'mismatch',
      cardIds: ['apple-a', 'moon-a'],
      isFinished: false,
    });
  });

  it('marks the last pair as finished', () => {
    expect(
      resolveTurn(makeCards(['moon-a', 'moon-b']), ['apple-a', 'apple-b'])
    ).toEqual({
      kind: 'match',
      cardIds: ['apple-a', 'apple-b'],
      isFinished: true,
    });
  });
});
