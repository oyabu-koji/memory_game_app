import { CARD_SYMBOLS } from '../types/card.types.js';
import { DEFAULT_GAME_CONFIG } from '../types/game.types.js';

function shuffle(items, random = Math.random) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [
      nextItems[swapIndex],
      nextItems[index],
    ];
  }

  return nextItems;
}

export function createDeck(config = DEFAULT_GAME_CONFIG, random = Math.random) {
  const { pairCount, rows, columns } = config;

  if (rows * columns !== pairCount * 2) {
    throw new Error('GameConfig must describe an even board.');
  }

  const selectedSymbols = CARD_SYMBOLS.slice(0, pairCount);

  if (selectedSymbols.length !== pairCount) {
    throw new Error('Not enough card symbols to build the deck.');
  }

  return shuffle(
    selectedSymbols.flatMap((symbol, pairIndex) => [
      {
        id: `${symbol}-${pairIndex}-a`,
        symbol,
        isFlipped: false,
        isMatched: false,
        position: -1,
      },
      {
        id: `${symbol}-${pairIndex}-b`,
        symbol,
        isFlipped: false,
        isMatched: false,
        position: -1,
      },
    ]),
    random
  ).map((card, position) => ({
    ...card,
    position,
  }));
}
