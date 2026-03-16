export function resolveTurn(cards, selectedCardIds) {
  if (selectedCardIds.length !== 2) {
    return null;
  }

  const selectedCards = selectedCardIds
    .map((cardId) => cards.find((card) => card.id === cardId))
    .filter(Boolean);

  if (selectedCards.length !== 2) {
    return null;
  }

  const isMatch = selectedCards[0].symbol === selectedCards[1].symbol;
  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
  const isFinished = isMatch && matchedPairs + 1 === cards.length / 2;

  return {
    kind: isMatch ? 'match' : 'mismatch',
    cardIds: [...selectedCardIds],
    isFinished,
  };
}
