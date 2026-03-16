import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function ClearOverlay({ visible, onRestart }) {
  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>やったね!</Text>
        <Text style={styles.subtitle}>ぜんぶ みつけたよ</Text>
        <Pressable
          onPress={onRestart}
          style={styles.button}
          testID="clear-restart-button"
        >
          <Text style={styles.buttonLabel}>もういちど</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 252, 244, 0.96)',
    borderColor: '#ffd166',
    borderRadius: 28,
    borderWidth: 3,
    paddingHorizontal: 28,
    paddingVertical: 24,
    shadowColor: '#d4a04a',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 18,
  },
  title: {
    color: '#2f7d32',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#5f4b23',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#ff9d2a',
    borderRadius: 999,
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonLabel: {
    color: '#fffaf0',
    fontSize: 18,
    fontWeight: '900',
  },
});
