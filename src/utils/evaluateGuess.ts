import type { LetterStatus } from '../types/game';

// Counts answer letters not matched in place, so repeated letters are only marked "present" as often as they remain.
const countUnmatchedLetters = (guessLetters: string[], answerLetters: string[]): Map<string, number> =>
  answerLetters.reduce((counts, letter, idx) => {
    if (guessLetters[idx] === letter) return counts;
    counts.set(letter, (counts.get(letter) ?? 0) + 1);
    return counts;
  }, new Map<string, number>());

export const evaluateGuess = (guess: string, answer: string): LetterStatus[] => {
  const guessLetters = guess.split('');
  const answerLetters = answer.split('');
  const unmatched = countUnmatchedLetters(guessLetters, answerLetters);

  return guessLetters.map((letter, idx): LetterStatus => {
    if (answerLetters[idx] === letter) return 'correct';
    const remaining = unmatched.get(letter) ?? 0;
    if (remaining === 0) return 'absent';
    unmatched.set(letter, remaining - 1);
    return 'present';
  });
};
