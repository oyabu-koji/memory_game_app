export function getTotalPairs(config) {
  return config.pairCount;
}

export function getRemainingPairs(state, config) {
  return getTotalPairs(config) - state.matchedPairs;
}

export function isInputLocked(state) {
  return state.gameStatus === 'resolving' || state.gameStatus === 'finished';
}

export function canRestart(state) {
  return state.gameStatus !== 'idle';
}

export function isGameCleared(state, config) {
  return state.matchedPairs === getTotalPairs(config);
}
