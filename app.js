const phraseDiv = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
const startButton = document.querySelector('a.btn__reset');
const ul = document.querySelector('div#phrase ul');
const scoreboard = document.querySelector('scoreboard');


let missed = 0;
const phrasesArray = [
    'coding',
    'weed',
    'skate',
    'djent',
    'pain'
];

// event listener for Start Game button
startButton.addEventListener('click', (e) => {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// return a random phrase from the phrases array
const getRandomPhraseAsArray = arr => {
    let random = Math.floor(Math.random() * phrasesArray.length);
    return phrasesArray[random];
};

let gamePhrase = '';
    gamePhrase = getRandomPhraseAsArray(phrasesArray);

// add phrase to display
const addPhraseToDisplay = arr => {
    let letters = [];
    
    // assigning each letter to a <li>
    for (let i = 0; i < gamePhrase.length; i++) {
        let li = document.createElement('li');
        li.innerText = gamePhrase[i];
        if (li.textContent === '') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        ul.appendChild(li);
    }
    return ul;
};

// check if a letter is in the phrase
const checkLetter = button => {
    let letters = document.querySelectorAll('li.letter');
    let match = null;
    for (let i = 0; i < letters.length; i++) {
        if (button.textContent === letters[i].textContent) {
            letters[i].classList.add('show');
            match = letters[i].textContent;
        }
    }
    return match;
};

// listen for on-screen keyboard clicks
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let button = e.target;
        button.classList.add('chosen');
        button.disabled = true;
        let checkLetterResult = checkLetter(button);
        if (checkLetterResult === null) {
            scoreboard.removeChild(scoreboard.firstChild);

        }
    }
});