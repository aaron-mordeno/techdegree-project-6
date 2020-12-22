const overlay = document.getElementById('overlay');
const startButton = document.querySelector('a.btn__reset');
const title = document.querySelector('.title');

const phraseDiv = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
const ul = document.querySelector('div#phrase ul');

const scoreboard = document.querySelector('div#scoreboard ol');
let missed = 0;
let gamePhrase = '';
const phrasesArray = [
    'coding is fun',
    'checkmate',
    'skate or die',
    'does it djent',
    'life is pain'
];

// return a random phrase from the phrases array
const getRandomPhraseAsArray = arr => {
    let random = Math.floor(Math.random() * phrasesArray.length);
    return phrasesArray[random];
};



// add phrase to display
const addPhraseToDisplay = arr => {
    // generate random phrase
    gamePhrase = getRandomPhraseAsArray(phrasesArray);

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
        startButton.textContent = 'New Game';
    } else if (missed === 5) {
        overlay.classList.add('lose');
        title.textContent = 'You Lose!';
        overlay.style.display = 'flex';
        startButton.textContent = 'New Game';
    }
}

// event listener for Start Game button
startButton.addEventListener('click', (e) => {
    // remove phrase from screen
    while (ul.firstElementChild) {
        ul.removeChild(ul.firstElementChild);
    }

    // remove 'chosen' class 
    let keys = document.querySelectorAll('#qwerty button');
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].classList.remove('chosen');
        keys[i].disabled = false;
    }

    // reset missed count to 0
    missed = 0;

    // remove all life icons (in case there are any lost life)
    while (scoreboard.firstElementChild) {
        scoreboard.removeChild(scoreboard.firstElementChild);
    }

    // add a full scoreboard with life
    for (let i = 0; i < 5; i++) {
            let life = document.createElement('li');
            life.classList.add('tries');
            let lifeImg = document.createElement('img');
            lifeImg.src = "images/liveHeart.png";

            life.appendChild(lifeImg);
            scoreboard.appendChild(life);
    }

    // add new phrase to the display
    addPhraseToDisplay();
    
    // remove overlay from screen
    overlay.style.display = 'none';

    // remove 'win' or 'lose' class from overlay
    overlay.classList.remove('win');
    overlay.classList.remove('lose');
});