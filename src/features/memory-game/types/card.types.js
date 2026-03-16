/**
 * @typedef {'apple' | 'balloon' | 'cat' | 'cloud' | 'flower'
 * | 'moon' | 'rainbow' | 'star' | 'sun' | 'unicorn'} CardSymbol
 */

/**
 * @typedef {Object} CardModel
 * @property {string} id
 * @property {CardSymbol} symbol
 * @property {boolean} isFlipped
 * @property {boolean} isMatched
 * @property {number} position
 */

export const CARD_SYMBOLS = Object.freeze([
  'apple',
  'balloon',
  'cat',
  'cloud',
  'flower',
  'moon',
  'rainbow',
  'star',
  'sun',
  'unicorn',
]);

export const CARD_FACE_BY_SYMBOL = Object.freeze({
  apple: '🍎',
  balloon: '🎈',
  cat: '🐱',
  cloud: '☁️',
  flower: '🌼',
  moon: '🌙',
  rainbow: '🌈',
  star: '⭐',
  sun: '☀️',
  unicorn: '🦄',
});

export const CARD_LABEL_BY_SYMBOL = Object.freeze({
  apple: 'apple',
  balloon: 'balloon',
  cat: 'cat',
  cloud: 'cloud',
  flower: 'flower',
  moon: 'moon',
  rainbow: 'rainbow',
  star: 'star',
  sun: 'sun',
  unicorn: 'unicorn',
});
