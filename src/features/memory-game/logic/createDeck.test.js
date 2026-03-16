import { describe, expect, it } from 'vitest';
import { createDeck } from './createDeck.js';
import { DEFAULT_GAME_CONFIG } from '../types/game.types.js';

describe('createDeck', () => {
  it('creates 20 cards for the default game', () => {
    const deck = createDeck(DEFAULT_GAME_CONFIG, () => 0.2);

    expect(deck).toHaveLength(20);
    expect(deck.every((card) => card.isFlipped === false)).toBe(true);
    expect(deck.every((card) => card.isMatched === false)).toBe(true);
    expect(deck.map((card) => card.position)).toEqual(
      Array.from({ length: 20 }, (_, index) => index)
    );
  });

  it('creates exactly 10 pairs', () => {
    const deck = createDeck(DEFAULT_GAME_CONFIG, () => 0.8);
    const counts = deck.reduce((accumulator, card) => {
      accumulator[card.symbol] = (accumulator[card.symbol] ?? 0) + 1;
      return accumulator;
    }, {});

    expect(Object.values(counts)).toEqual(Array(10).fill(2));
  });
});
