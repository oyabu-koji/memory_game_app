import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { renderWithProviders } from '../../../shared/test-support/renderWithProviders.jsx';
import { GameScreen } from '../screens/GameScreen.jsx';
import { DEFAULT_GAME_CONFIG } from '../types/game.types.js';

const createDeckMock = vi.hoisted(() => vi.fn());

vi.mock('../logic/createDeck.js', () => ({
  createDeck: createDeckMock,
}));

function makeCard(id, symbol, position, overrides = {}) {
  return {
    id,
    symbol,
    isFlipped: false,
    isMatched: false,
    position,
    ...overrides,
  };
}

function buildDeterministicDeck() {
  return [
    makeCard('apple-a', 'apple', 0),
    makeCard('moon-a', 'moon', 1),
    makeCard('apple-b', 'apple', 2),
    makeCard('star-a', 'star', 3),
    makeCard('balloon-a', 'balloon', 4),
    makeCard('balloon-b', 'balloon', 5),
    makeCard('cat-a', 'cat', 6),
    makeCard('cat-b', 'cat', 7),
    makeCard('cloud-a', 'cloud', 8),
    makeCard('cloud-b', 'cloud', 9),
    makeCard('flower-a', 'flower', 10),
    makeCard('flower-b', 'flower', 11),
    makeCard('moon-b', 'moon', 12),
    makeCard('rainbow-a', 'rainbow', 13),
    makeCard('rainbow-b', 'rainbow', 14),
    makeCard('star-b', 'star', 15),
    makeCard('sun-a', 'sun', 16),
    makeCard('sun-b', 'sun', 17),
    makeCard('unicorn-a', 'unicorn', 18),
    makeCard('unicorn-b', 'unicorn', 19),
  ];
}

function buildAlmostFinishedDeck() {
  const symbols = [
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
  ];

  return symbols.flatMap((symbol, pairIndex) => {
    const matched = pairIndex < 9;
    const firstPosition = pairIndex * 2;
    const secondPosition = firstPosition + 1;

    return [
      makeCard(`${symbol}-a`, symbol, firstPosition, {
        isFlipped: matched,
        isMatched: matched,
      }),
      makeCard(`${symbol}-b`, symbol, secondPosition, {
        isFlipped: matched,
        isMatched: matched,
      }),
    ];
  });
}

describe('GameScreen', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('locks extra input while resolving a mismatch', async () => {
    createDeckMock.mockReturnValue(buildDeterministicDeck());

    renderWithProviders(<GameScreen />);

    await waitFor(() => {
      expect(screen.getByTestId('memory-card-apple-a')).toBeTruthy();
    });

    fireEvent.press(screen.getByTestId('memory-card-apple-a'));
    fireEvent.press(screen.getByTestId('memory-card-moon-a'));
    fireEvent.press(screen.getByTestId('memory-card-apple-b'));

    expect(screen.queryAllByText('🍎')).toHaveLength(1);
    expect(screen.queryByText('🌙')).toBeTruthy();

    await act(async () => {
      vi.advanceTimersByTime(DEFAULT_GAME_CONFIG.mismatchDelayMs);
    });

    expect(screen.queryByText('🌙')).toBeNull();

    fireEvent.press(screen.getByTestId('memory-card-apple-b'));

    expect(screen.queryAllByText('🍎')).toHaveLength(1);
  });

  it('shows the clear overlay after the last pair', async () => {
    createDeckMock.mockReturnValue(buildAlmostFinishedDeck());

    renderWithProviders(<GameScreen />);

    await waitFor(() => {
      expect(screen.getByTestId('memory-card-unicorn-a')).toBeTruthy();
    });

    fireEvent.press(screen.getByTestId('memory-card-unicorn-a'));
    fireEvent.press(screen.getByTestId('memory-card-unicorn-b'));

    await waitFor(() => {
      expect(screen.getByText('やったね!')).toBeTruthy();
    });
  });
});
