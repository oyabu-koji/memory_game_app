import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CARD_FACE_BY_SYMBOL,
  CARD_LABEL_BY_SYMBOL,
} from '../types/card.types.js';

export function MemoryCard({ card, disabled, onPress, size }) {
  const rotation = useRef(
    new Animated.Value(card.isFlipped || card.isMatched ? 1 : 0)
  ).current;
  const isFaceUp = card.isFlipped || card.isMatched;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isFaceUp ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [isFaceUp, rotation]);

  const rotateY = rotation.interpolate
    ? rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      })
    : '0deg';

  const containerStyle = [
    styles.card,
    {
      width: size,
      height: size * 1.18,
      transform: [{ rotateY }],
    },
    isFaceUp ? styles.faceUpCard : styles.faceDownCard,
    card.isMatched ? styles.matchedCard : null,
    disabled && !card.isMatched ? styles.disabledCard : null,
  ];

  return (
    <Pressable
      accessibilityLabel={`memory-card-${card.position + 1}-${
        isFaceUp ? CARD_LABEL_BY_SYMBOL[card.symbol] : 'hidden'
      }`}
      accessibilityRole="button"
      accessibilityState={{
        disabled,
        selected: isFaceUp,
      }}
      disabled={disabled}
      onPress={() => onPress(card.id)}
      style={styles.pressable}
      testID={`memory-card-${card.id}`}
    >
      <Animated.View style={containerStyle}>
        {isFaceUp ? (
          <Text style={styles.symbol}>{CARD_FACE_BY_SYMBOL[card.symbol]}</Text>
        ) : (
          <View style={styles.backPattern}>
            <Text style={styles.backQuestion}>?</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexBasis: '25%',
    alignItems: 'center',
    marginBottom: 12,
  },
  card: {
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 3,
    justifyContent: 'center',
    shadowColor: '#b5692f',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  faceDownCard: {
    backgroundColor: '#ffb86b',
    borderColor: '#ff9d2a',
  },
  faceUpCard: {
    backgroundColor: '#fffaf2',
    borderColor: '#ffd166',
  },
  matchedCard: {
    backgroundColor: '#dff7d5',
    borderColor: '#7cc36d',
  },
  disabledCard: {
    opacity: 0.86,
  },
  backPattern: {
    alignItems: 'center',
    backgroundColor: '#ffdb9e',
    borderRadius: 18,
    height: '78%',
    justifyContent: 'center',
    width: '78%',
  },
  backQuestion: {
    color: '#8a4b11',
    fontSize: 28,
    fontWeight: '900',
  },
  symbol: {
    fontSize: 34,
  },
});
