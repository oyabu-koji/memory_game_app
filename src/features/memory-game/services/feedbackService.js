import { disposeAudio, playSound, prepareAudio } from './audioService.js';
import { triggerHaptics } from './hapticsService.js';

/**
 * @typedef {'flip' | 'match' | 'mismatch' | 'finish'} FeedbackKind
 */

export async function prepareFeedback() {
  await prepareAudio();
}

export async function playFeedback(kind) {
  try {
    switch (kind) {
      case 'flip':
        await Promise.allSettled([playSound('flip')]);
        break;
      case 'match':
        await Promise.allSettled([playSound('match'), triggerHaptics('match')]);
        break;
      case 'mismatch':
        await Promise.allSettled([triggerHaptics('mismatch')]);
        break;
      case 'finish':
        await Promise.allSettled([playSound('finish'), triggerHaptics('finish')]);
        break;
      default:
        break;
    }
  } catch (error) {
    console.warn(`feedback failed for ${kind}`, error);
  }
}

export async function disposeFeedback() {
  await disposeAudio();
}
