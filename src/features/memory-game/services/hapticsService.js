import * as Haptics from 'expo-haptics';

const HAPTIC_STYLE_BY_KIND = Object.freeze({
  flip: Haptics.ImpactFeedbackStyle?.Light,
  match: Haptics.ImpactFeedbackStyle?.Medium,
  finish: Haptics.ImpactFeedbackStyle?.Heavy,
});

export async function triggerHaptics(kind) {
  try {
    if (kind === 'mismatch') {
      return false;
    }

    if (!Haptics.impactAsync) {
      return false;
    }

    await Haptics.impactAsync(HAPTIC_STYLE_BY_KIND[kind]);
    return true;
  } catch (error) {
    console.warn(`haptics failed for ${kind}`, error);
    return false;
  }
}
