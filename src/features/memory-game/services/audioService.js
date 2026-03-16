import { Audio } from 'expo-av';

const SOUND_KEYS = Object.freeze(['flip', 'match', 'finish']);
const sounds = new Map();

function getSoundAsset(kind) {
  if (process.env.VITEST === 'true') {
    return null;
  }

  if (typeof require !== 'function') {
    return null;
  }

  switch (kind) {
    case 'flip':
      return require('../../../../assets/audio/flip.wav');
    case 'match':
      return require('../../../../assets/audio/match.wav');
    case 'finish':
      return require('../../../../assets/audio/finish.wav');
    default:
      return null;
  }
}

async function loadSound(kind) {
  if (sounds.has(kind)) {
    return sounds.get(kind);
  }

  const source = getSoundAsset(kind);

  if (!source) {
    return null;
  }

  const result = await Audio.Sound.createAsync(source, {
    shouldPlay: false,
    volume: 0.65,
  });

  sounds.set(kind, result.sound);
  return result.sound;
}

export async function prepareAudio() {
  try {
    if (Audio.setAudioModeAsync) {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
    }

    await Promise.all(SOUND_KEYS.map((kind) => loadSound(kind)));
  } catch (error) {
    console.warn('audio prepare failed', error);
  }
}

export async function playSound(kind) {
  try {
    const sound = await loadSound(kind);

    if (!sound) {
      return false;
    }

    if (sound.replayAsync) {
      await sound.replayAsync();
      return true;
    }

    if (sound.playFromPositionAsync) {
      await sound.playFromPositionAsync(0);
      return true;
    }

    return false;
  } catch (error) {
    console.warn(`audio play failed for ${kind}`, error);
    return false;
  }
}

export async function disposeAudio() {
  const unloadPromises = [];

  for (const sound of sounds.values()) {
    if (sound?.unloadAsync) {
      unloadPromises.push(
        sound.unloadAsync().catch((error) => {
          console.warn('audio unload failed', error);
        })
      );
    }
  }

  sounds.clear();
  await Promise.all(unloadPromises);
}
