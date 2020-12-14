const phraseDiv = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
const startButton = document.querySelector('a.btn__reset');
let missed = 0;
const phrases = [
    'Coding Is Fun',
    'Smoke Weed Everyday',
    'Skate Or Die',
    'Does It Djent',
    'Existence Is Pain'
];

// event listener for Start Game button
startButton.addEventListener('click', (e) => {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// return a random phrase from the phrases array
const getRandomPhraseAsArray = arr => {
    let random = Math.floor(Math.random() * phrases.length);
    let phrase = phrases[random];
    return phrase;
};

// add phrase to display
const addPhraseToDisplay = arr => {
    
};

// check if a letter is in the phrase
const checkLetter = button => {
    
};