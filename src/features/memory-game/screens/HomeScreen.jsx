import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function HomeScreen({ onStart }) {
  return (
    <View style={styles.screen}>
      <View style={styles.heroCard}>
        <Text style={styles.emoji}>🧠</Text>
        <Text style={styles.title}>Memory Game</Text>
        <Text style={styles.subtitle}>おなじ えを みつけよう</Text>
        <Pressable
          onPress={onStart}
          style={styles.button}
          testID="start-game-button"
        >
          <Text style={styles.buttonLabel}>あそぶ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: '#fdf6e9',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: '#fffaf2',
    borderRadius: 36,
    borderColor: '#ffd166',
    borderWidth: 4,
    paddingHorizontal: 28,
    paddingVertical: 36,
    shadowColor: '#d2a34f',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    width: '100%',
  },
  emoji: {
    fontSize: 52,
  },
  title: {
    color: '#2b2a25',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 12,
  },
  subtitle: {
    color: '#775221',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#ff8c42',
    borderRadius: 999,
    marginTop: 28,
    minWidth: 180,
    paddingHorizontal: 28,
    paddingVertical: 18,
  },
  buttonLabel: {
    color: '#fff9f0',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
});
