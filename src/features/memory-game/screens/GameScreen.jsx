import { useEffect, useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GameBoard } from '../components/GameBoard.jsx';
import { ProgressBadge } from '../components/ProgressBadge.jsx';
import { ClearOverlay } from '../components/ClearOverlay.jsx';
import { useGameSession } from '../hooks/useGameSession.js';
import {
  canRestart,
  getTotalPairs,
  isGameCleared,
  isInputLocked,
} from '../logic/gameSelectors.js';
import { DEFAULT_GAME_CONFIG } from '../types/game.types.js';

export function GameScreen({ onExitToHome }) {
  const didStartRef = useRef(false);
  const { state, revealCard, restartGame, startGame } = useGameSession(
    DEFAULT_GAME_CONFIG
  );

  useEffect(() => {
    if (didStartRef.current) {
      return;
    }

    didStartRef.current = true;
    startGame();
  }, [startGame]);

  const totalPairs = getTotalPairs(DEFAULT_GAME_CONFIG);
  const finished = isGameCleared(state, DEFAULT_GAME_CONFIG);
  const restartEnabled = canRestart(state);

  return (
    <View style={styles.screen}>
      <View style={styles.topRow}>
        {onExitToHome ? (
          <Pressable onPress={onExitToHome} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonLabel}>おうち</Text>
          </Pressable>
        ) : (
          <View style={styles.buttonPlaceholder} />
        )}
        <ProgressBadge
          gameStatus={state.gameStatus}
          matchedPairs={state.matchedPairs}
          totalPairs={totalPairs}
        />
        <Pressable
          disabled={!restartEnabled}
          onPress={restartGame}
          style={[
            styles.secondaryButton,
            !restartEnabled ? styles.disabledButton : null,
          ]}
          testID="restart-game-button"
        >
          <Text style={styles.secondaryButtonLabel}>もういちど</Text>
        </Pressable>
      </View>

      <View style={styles.boardArea}>
        <GameBoard
          cards={state.cards}
          disabled={isInputLocked(state)}
          onCardPress={revealCard}
        />
        <ClearOverlay visible={finished} onRestart={restartGame} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fdf6e9',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boardArea: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  secondaryButton: {
    backgroundColor: '#fff6df',
    borderRadius: 999,
    minWidth: 84,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  secondaryButtonLabel: {
    color: '#6a4b1f',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.45,
  },
  buttonPlaceholder: {
    minWidth: 84,
  },
});
