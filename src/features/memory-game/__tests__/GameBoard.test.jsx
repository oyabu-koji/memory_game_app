import { cleanup, fireEvent, screen } from '@testing-library/react-native';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../shared/test-support/renderWithProviders.jsx';
import { GameBoard } from '../components/GameBoard.jsx';
import { createDeck } from '../logic/createDeck.js';
import { DEFAULT_GAME_CONFIG } from '../types/game.types.js';

afterEach(() => {
  cleanup();
});

describe('GameBoard', () => {
  it('renders 20 cards and relays presses', () => {
    const cards = createDeck(DEFAULT_GAME_CONFIG, () => 0.4);
    const onCardPress = vi.fn();

    renderWithProviders(
      <GameBoard cards={cards} disabled={false} onCardPress={onCardPress} />
    );

    const firstCard = screen.getByTestId(`memory-card-${cards[0].id}`);

    fireEvent.press(firstCard);

    expect(screen.getAllByRole('button')).toHaveLength(20);
    expect(onCardPress).toHaveBeenCalledWith(cards[0].id);
  });
});
