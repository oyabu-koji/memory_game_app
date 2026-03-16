import { describe, expect, it } from 'vitest';
import {
  canRestart,
  getRemainingPairs,
  getTotalPairs,
  isGameCleared,
  isInputLocked,
} from './gameSelectors.js';
import {
  DEFAULT_GAME_CONFIG,
  GAME_STATUS,
} from '../types/game.types.js';

describe('gameSelectors', () => {
  it('derives progress values', () => {
    const state = {
      matchedPairs: 3,
      gameStatus: GAME_STATUS.PLAYING,
    };

    expect(getTotalPairs(DEFAULT_GAME_CONFIG)).toBe(10);
    expect(getRemainingPairs(state, DEFAULT_GAME_CONFIG)).toBe(7);
    expect(isGameCleared(state, DEFAULT_GAME_CONFIG)).toBe(false);
  });

  it('locks input while resolving or finished', () => {
    expect(isInputLocked({ gameStatus: GAME_STATUS.RESOLVING })).toBe(true);
    expect(isInputLocked({ gameStatus: GAME_STATUS.FINISHED })).toBe(true);
    expect(isInputLocked({ gameStatus: GAME_STATUS.PLAYING })).toBe(false);
  });

  it('allows restart after the game starts', () => {
    expect(canRestart({ gameStatus: GAME_STATUS.IDLE })).toBe(false);
    expect(canRestart({ gameStatus: GAME_STATUS.PLAYING })).toBe(true);
  });
});
