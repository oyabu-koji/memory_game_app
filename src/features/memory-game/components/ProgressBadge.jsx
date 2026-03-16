import { StyleSheet, Text, View } from 'react-native';

export function ProgressBadge({ matchedPairs, totalPairs, gameStatus }) {
  const isFinished = gameStatus === 'finished';

  return (
    <View style={[styles.badge, isFinished ? styles.finishedBadge : null]}>
      <Text style={styles.eyebrow}>
        {isFinished ? 'ぜんぶそろった!' : 'そろえたペア'}
      </Text>
      <Text style={styles.value}>
        {matchedPairs} / {totalPairs}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#d9a14f',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  finishedBadge: {
    backgroundColor: '#dff7d5',
  },
  eyebrow: {
    color: '#745019',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  value: {
    color: '#33230e',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 2,
  },
});
