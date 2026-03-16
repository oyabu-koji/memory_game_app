/**
 * @typedef {'idle' | 'playing' | 'resolving' | 'finished'} GameStatus
 */

/**
 * @typedef {Object} GameConfig
 * @property {number} rows
 * @property {number} columns
 * @property {number} pairCount
 * @property {number} mismatchDelayMs
 */

/**
 * @typedef {Object} GameSessionState
 * @property {import('./card.types').CardModel[]} cards
 * @property {string[]} selectedCardIds
 * @property {number} matchedPairs
 * @property {GameStatus} gameStatus
 */

export const GAME_STATUS = Object.freeze({
  IDLE: 'idle',
  PLAYING: 'playing',
  RESOLVING: 'resolving',
  FINISHED: 'finished',
});

export const DEFAULT_GAME_CONFIG = Object.freeze({
  rows: 5,
  columns: 4,
  pairCount: 10,
  mismatchDelayMs: 900,
});

export function createEmptyGameSessionState() {
  return {
    cards: [],
    selectedCardIds: [],
    matchedPairs: 0,
    gameStatus: GAME_STATUS.IDLE,
  };
}
