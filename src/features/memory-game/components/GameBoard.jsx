import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { MemoryCard } from './MemoryCard.jsx';

export function GameBoard({ cards, disabled, onCardPress }) {
  const { width } = useWindowDimensions();
  const boardWidth = Math.min(width - 32, 420);
  const cardGap = 10;
  const cardSize = (boardWidth - cardGap * 3) / 4;

  return (
    <View style={[styles.boardShell, { width: boardWidth }]}>
      <FlatList
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        data={cards}
        keyExtractor={(card) => card.id}
        numColumns={4}
        renderItem={({ item }) => (
          <MemoryCard
            card={item}
            disabled={disabled || item.isMatched}
            onPress={onCardPress}
            size={cardSize}
          />
        )}
        scrollEnabled={false}
        testID="game-board"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boardShell: {
    alignSelf: 'center',
    backgroundColor: '#fff6df',
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingTop: 12,
    shadowColor: '#d69a47',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  content: {
    paddingBottom: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
});
