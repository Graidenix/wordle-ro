import { HELP_SEEN_STORAGE_KEY } from './constants';

export const hasSeenHelp = (): boolean => {
  try {
    return window.localStorage.getItem(HELP_SEEN_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const markHelpSeen = (): void => {
  try {
    window.localStorage.setItem(HELP_SEEN_STORAGE_KEY, 'true');
  } catch {
    // Help just shows again next visit when storage is unavailable.
  }
};
