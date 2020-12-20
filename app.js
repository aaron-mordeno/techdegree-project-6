const overlay = document.getElementById('overlay');
const startButton = document.querySelector('a.btn__reset');
const title = document.querySelector('.title');

const phraseDiv = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
const ul = document.querySelector('div#phrase ul');

const scoreboard = document.querySelector('div#scoreboard ol');
let missed = 0;

const phrasesArray = [
    'coding is fun',
    'smoke weed',
    'skate or die',
    'does it djent',
    'life is pain'
];

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
        if (li.textContent === ' ') {
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
            scoreboard.removeChild(scoreboard.firstElementChild);

            let lostLife = document.createElement('li');
            lostLife.classList.add('tries');
            let lostLifeImg = document.createElement('img');
            lostLifeImg.src = "images/lostHeart.png";

            lostLife.appendChild(lostLifeImg);
            scoreboard.appendChild(lostLife);

            missed += 1;
        }
        checkWin();
        console.log(`Letter: ${checkLetterResult} Missed: ${missed}`);
    }
    
});

// check if game is won or lost after each button press
const checkWin = () => {
    let lettersinPhrase = document.querySelectorAll('.letter');
    let shownLetters = document.querySelectorAll('.letter.show');
    if (shownLetters.length === lettersinPhrase.length) {
        overlay.classList.add('win');
        title.textContent = 'You Win!';
        overlay.style.display = 'flex';
    } else if (missed === 5) {
        overlay.classList.add('lose');
        title.textContent = 'You Lose!';
        overlay.style.display = 'flex';
    }
}

// event listener for Start Game button
startButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
    addPhraseToDisplay();
});