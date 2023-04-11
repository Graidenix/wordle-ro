import {words} from "./words.mjs";

const wordIdx = Math.floor(Math.random() * words.length);
const lettersEl = document.querySelectorAll('.keyboard kbd');
const letters = Array.from(lettersEl).map(el => el.innerText);

const guessedWord = words[wordIdx].toUpperCase();
let tryWordIdx = 1;
let tryLetterIdx = 1;


function backSpace() {
    if (tryLetterIdx <= 1) return;
    const el = document.querySelector(`.grid .word:nth-child(${tryWordIdx}) .letter:nth-child(${tryLetterIdx - 1})`);
    if (!el) return;
    el.innerText = '';
    tryLetterIdx--;
}

function wordSubmit() {
    if (tryLetterIdx <= 5) {
        console.warn('Not yet ready');
        return;
    }
    const guess = document.querySelector(`.grid .word:nth-child(${tryWordIdx})`).innerText.replace(/\W/g, '');
    if (!words.includes(guess)) {
        alert('Nu este asa cuvant!');
        return;
    }

    guess.split('').forEach((lt, idx) => {
        const el = document.querySelector(`.grid .word:nth-child(${tryWordIdx}) .letter:nth-child(${idx + 1})`);
        if (guessedWord[idx] === lt) {
            document.querySelector(`[data-letter="${lt}"]`).classList.add('right');
            return el.classList.add('right');
        }
        if (guessedWord.includes(lt)) {
            document.querySelector(`[data-letter="${lt}"]`).classList.add('found');
            return el.classList.add('found');
        }

        document.querySelector(`[data-letter="${lt}"]`).classList.add('not-found');
        return el.classList.add('not-found');
    });

    if (guess === guessedWord) {
        console.info('WIN');
        return;
    }

    tryLetterIdx = 1;
    tryWordIdx++;

    if (tryWordIdx > 5) {
        alert('Ai pierdut');
        location.reload();
    }
}


function addLetter(letter) {
    if (tryLetterIdx > 5) {
        console.warn('Line is full');
        return;
    }
    const el = document.querySelector(`.grid .word:nth-child(${tryWordIdx}) .letter:nth-child(${tryLetterIdx})`);
    el.innerText = letter.toUpperCase();
    tryLetterIdx++;
}

window.addEventListener('mousedown', ev => {
    if (!ev.target.matches('kbd')) return;
    const letter = ev.target.dataset.letter;
    if (letter === 'Backspace') return backSpace();
    if (letter === 'Enter') return wordSubmit();
    return addLetter(letter);
});

window.addEventListener('keydown', (ev) => {
    if (ev.ctrlKey || ev.altKey || ev.metaKey) return;
    if (ev.key === 'Backspace') return backSpace();
    if (ev.key === 'Enter') return wordSubmit();
    if (letters.includes(ev.key.toUpperCase())) return addLetter(ev.key);
});
