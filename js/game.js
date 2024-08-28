document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const spanPlayer = document.querySelector('.player');
    const timer = document.querySelector('.timer');
    const endGameScreen = document.querySelector('.end-game');
    const endGameMessage = document.querySelector('.end-game-message');
    const playAgainButton = document.querySelector('.play-again');
    const restartTheGame = document.querySelector('.restartButton');
    const backButton = document.querySelector('.login-button');
    const backLoginButton = document.querySelector('.login');
    const pageGamesButton = document.querySelector('.pageGames');
    const pageGamesButtonVictory = document.querySelector('.pageGamesVictory');

    const notes_musical = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'];

    const createElement = (tag, className) => {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    };

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;
    let hasStarted = false;

    const startTimer = () => {
        this.loop = setInterval(() => {
            const currentTime = parseInt(timer.textContent, 10);
            timer.textContent = currentTime + 1;
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(this.loop);
    };

    const resetTimer = () => {
        timer.textContent = '0';
        hasStarted = false;
        stopTimer();
    };

    const checkGameOver = () => {
        if (matchedPairs === notes_musical.length) {
            stopTimer();
            setTimeout(() => {
                displayEndGameScreen();
            }, 500);
        }
    };

    const checkCards = () => {
        const firstNote = firstCard.getAttribute('data-note');
        const secondNote = secondCard.getAttribute('data-note');

        if (firstNote === secondNote) {
            disableCards();
            matchedPairs++;
            playNoteSound(firstNote);
            resetBoard();
            checkGameOver();
        } else {
            unflipCards();
        }
    };

    const resetBoard = () => {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    };

    const revealCard = (event) => {
        const target = event.target;
        if (lockBoard) return;
        if (target.parentNode === firstCard) return;

        if (!hasStarted) {
            startTimer();
            hasStarted = true;
        }

        target.parentNode.classList.add('reveal-card');

        if (!firstCard) {
            firstCard = target.parentNode;
            return;
        }

        secondCard = target.parentNode;
        lockBoard = true;
        checkCards();
    };

    const createCard = (note, type) => {
        const card = createElement('div', 'card');
        const front = createElement('div', 'face front');
        const back = createElement('div', 'face back');

        const folder = type === 'question' ? 'name_note' : 'treble_clef';
        front.style.backgroundImage = `url('../images/${folder}/${note}.png')`;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', revealCard);
        card.setAttribute('data-note', note);

        return card;
    };

    const loadGame = () => {
        const cards = [];

        notes_musical.forEach(note => {
            cards.push(createCard(note, 'question'));
            cards.push(createCard(note, 'answer'));
        });

        const shuffledArray = cards.sort(() => Math.random() - 0.5);

        shuffledArray.forEach(card => {
            grid.appendChild(card);
        });
    };

    const playNoteSound = (note) => {
        const audio = new Audio(`../sounds/${note}.mp3`);
        audio.play();
    };

    const displayEndGameScreen = () => {
        const playerName = localStorage.getItem('player');
        const currentTime = parseInt(timer.textContent, 10);
        const bestScore = parseInt(localStorage.getItem('bestScore') || Infinity, 10);

        let message = `Parabéns, ${playerName}! Você completou o jogo em ${currentTime} segundos.`;

        if (currentTime < bestScore) {
            message += `\nParabéns, você conseguiu quebrar seu recorde!`;
            localStorage.setItem('bestScore', currentTime);
        }

        endGameMessage.textContent = message;
        endGameScreen.style.display = 'flex';
    };

    const disableCards = () => {
        firstCard.firstChild.classList.add('disabled_card');
        secondCard.firstChild.classList.add('disabled_card');
        resetBoard();
    };

    const unflipCards = () => {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            resetBoard();
        }, 1000);
    };

    playAgainButton.addEventListener('click', () => {
        endGameScreen.style.display = 'none';
        grid.innerHTML = '';
        matchedPairs = 0;
        resetTimer();
        loadGame();
    });

    restartTheGame.addEventListener('click', () => {
        endGameScreen.style.display = 'none';
        grid.innerHTML = '';
        matchedPairs = 0;
        resetTimer();
        loadGame();
    });

    backButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    backLoginButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    pageGamesButton.addEventListener('click', () => {
        window.location.href = '../pages/pageGames.html';
    });

    pageGamesButtonVictory.addEventListener('click', () => {
        window.location.href = '../pages/pageGames.html';
    });

    window.onload = () => {
        spanPlayer.textContent = localStorage.getItem('player');
        loadGame();
    };
});
