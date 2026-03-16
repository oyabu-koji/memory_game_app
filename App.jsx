import { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { HomeScreen } from './src/features/memory-game/screens/HomeScreen';
import { GameScreen } from './src/features/memory-game/screens/GameScreen';

const APP_SCREENS = Object.freeze({
  HOME: 'home',
  GAME: 'game',
});

export default function App() {
  const [activeScreen, setActiveScreen] = useState(APP_SCREENS.HOME);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {activeScreen === APP_SCREENS.HOME ? (
        <HomeScreen onStart={() => setActiveScreen(APP_SCREENS.GAME)} />
      ) : (
        <GameScreen onExitToHome={() => setActiveScreen(APP_SCREENS.HOME)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdf6e9',
  },
});
