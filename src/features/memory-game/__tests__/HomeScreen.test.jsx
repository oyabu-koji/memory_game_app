import { cleanup, fireEvent, screen } from '@testing-library/react-native';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../shared/test-support/renderWithProviders.jsx';
import { HomeScreen } from '../screens/HomeScreen.jsx';

afterEach(() => {
  cleanup();
});

describe('HomeScreen', () => {
  it('starts the game from the main button', () => {
    const onStart = vi.fn();

    renderWithProviders(<HomeScreen onStart={onStart} />);

    fireEvent.press(screen.getByTestId('start-game-button'));

    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
