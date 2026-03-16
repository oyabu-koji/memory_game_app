import { useCallback, useEffect, useReducer, useRef } from 'react';
import { createDeck } from '../logic/createDeck.js';
import { resolveTurn } from '../logic/resolveTurn.js';
import {
  createEmptyGameSessionState,
  DEFAULT_GAME_CONFIG,
  GAME_STATUS,
} from '../types/game.types.js';
import {
  disposeFeedback,
  playFeedback,
  prepareFeedback,
} from '../services/feedbackService.js';

function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        cards: action.cards,
        selectedCardIds: [],
        matchedPairs:
          action.cards.filter((card) => card.isMatched).length / 2,
        gameStatus: GAME_STATUS.PLAYING,
      };

    case 'REVEAL_CARD':
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.cardId ? { ...card, isFlipped: true } : card
        ),
        selectedCardIds: [...state.selectedCardIds, action.cardId],
        gameStatus: action.lock ? GAME_STATUS.RESOLVING : state.gameStatus,
      };

    case 'APPLY_MATCH':
      return {
        ...state,
        cards: state.cards.map((card) =>
          action.cardIds.includes(card.id)
            ? { ...card, isFlipped: true, isMatched: true }
            : card
        ),
        selectedCardIds: [],
        matchedPairs: state.matchedPairs + 1,
        gameStatus: action.isFinished
          ? GAME_STATUS.FINISHED
          : GAME_STATUS.PLAYING,
      };

    case 'RESET_MISMATCH':
      return {
        ...state,
        cards: state.cards.map((card) =>
          action.cardIds.includes(card.id)
            ? { ...card, isFlipped: false }
            : card
        ),
        selectedCardIds: [],
        gameStatus: GAME_STATUS.PLAYING,
      };

    default:
      return state;
  }
}

function isCardSelectable(state, cardId) {
  if (state.gameStatus !== GAME_STATUS.PLAYING) {
    return false;
  }

  const card = state.cards.find((candidate) => candidate.id === cardId);

  if (!card) {
    return false;
  }

  return !card.isMatched && !card.isFlipped;
}

function previewCards(cards, cardId) {
  return cards.map((card) =>
    card.id === cardId ? { ...card, isFlipped: true } : card
  );
}

export function useGameSession(config = DEFAULT_GAME_CONFIG) {
  const [state, dispatch] = useReducer(reducer, undefined, createEmptyGameSessionState);
  const mismatchTimeoutRef = useRef(null);

  const clearPendingResolution = useCallback(() => {
    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    clearPendingResolution();
    dispatch({
      type: 'START_GAME',
      cards: createDeck(config),
    });
  }, [clearPendingResolution, config]);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const revealCard = useCallback(
    (cardId) => {
      if (!isCardSelectable(state, cardId)) {
        return;
      }

      void playFeedback('flip');

      if (state.selectedCardIds.length === 0) {
        dispatch({ type: 'REVEAL_CARD', cardId, lock: false });
        return;
      }

      const nextCards = previewCards(state.cards, cardId);
      const nextSelectedCardIds = [...state.selectedCardIds, cardId];
      const resolution = resolveTurn(nextCards, nextSelectedCardIds);

      dispatch({ type: 'REVEAL_CARD', cardId, lock: true });

      if (!resolution) {
        return;
      }

      if (resolution.kind === 'match') {
        dispatch({
          type: 'APPLY_MATCH',
          cardIds: resolution.cardIds,
          isFinished: resolution.isFinished,
        });
        void playFeedback('match');

        if (resolution.isFinished) {
          void playFeedback('finish');
        }

        return;
      }

      void playFeedback('mismatch');
      clearPendingResolution();
      mismatchTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'RESET_MISMATCH', cardIds: resolution.cardIds });
        mismatchTimeoutRef.current = null;
      }, config.mismatchDelayMs);
    },
    [clearPendingResolution, config.mismatchDelayMs, state]
  );

  useEffect(() => {
    void prepareFeedback();

    return () => {
      clearPendingResolution();
      void disposeFeedback();
    };
  }, [clearPendingResolution]);

  return {
    state,
    startGame,
    restartGame,
    revealCard,
  };
}
