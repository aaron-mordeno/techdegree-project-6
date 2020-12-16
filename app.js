const phraseDiv = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
const startButton = document.querySelector('a.btn__reset');
let ul = document.querySelector('div#phrase ul');
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
    console.log(letters);
    let match = null;
    for (let i = 0; i < letters.length; i++) {
        if (button.textContent === letters[i].textContent) {
            console.log('correct')
        } else {
            console.log('wrong')
        }
    }
};