document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos da página
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

    // Definição das notas musicais usadas no jogo
    const notes_musical = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'];

    // Função auxiliar para criar elementos HTML com uma classe específica
    const createElement = (tag, className) => {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    };

    let firstCard = '';  // Armazena a primeira carta virada
    let secondCard = ''; // Armazena a segunda carta virada
    let lockBoard = false; // Impede ações enquanto as cartas são verificadas
    let matchedPairs = 0; // Contador de pares encontrados
    let hasStarted = false; // Indica se o jogo já começou

    // Funções de gerenciamento do cronômetro
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

    // Função para verificar se o jogo terminou
    const checkGameOver = () => {
        if (matchedPairs === notes_musical.length) {
            stopTimer();
            setTimeout(() => {
                displayEndGameScreen(); // Exibe a tela final do jogo
            }, 500);
        }
    };

    // Função para comparar as cartas viradas
    const checkCards = () => {
        const firstNote = firstCard.getAttribute('data-note');
        const secondNote = secondCard.getAttribute('data-note');

        if (firstNote === secondNote) {
            disableCards(); // Desabilita as cartas se forem iguais
            matchedPairs++;
            playNoteSound(firstNote); // Toca o som da nota
            resetBoard(); // Reseta o estado do tabuleiro
            checkGameOver(); // Verifica se o jogo terminou
        } else {
            unflipCards(); // Vira as cartas de volta se forem diferentes
        }
    };

    // Função para resetar o estado do tabuleiro
    const resetBoard = () => {
        [firstCard, secondCard] = ['', ''];
        lockBoard = false;
    };

    // Função para revelar a carta clicada
    const revealCard = (event) => {
        const target = event.target;
        if (lockBoard) return; // Impede ações se o tabuleiro estiver bloqueado
        if (target.parentNode === firstCard) return;  // Evita duplo clique na mesma carta

        if (!hasStarted) {
            startTimer(); // Inicia o cronômetro na primeira carta virada
            hasStarted = true;
        }

        target.parentNode.classList.add('reveal-card'); // Revela a carta clicada

        if (!firstCard) {
            firstCard = target.parentNode;
            return;
        }

        secondCard = target.parentNode;
        lockBoard = true;
        checkCards(); // Verifica as duas cartas viradas
    };

    // Função para criar uma carta com uma nota específica
    const createCard = (note, type) => {
        const card = createElement('div', 'card');
        const front = createElement('div', 'face front');
        const back = createElement('div', 'face back');

        const folder = type === 'question' ? 'name_note' : 'n_n_letter_notation';
        front.style.backgroundImage = `url('../images/${folder}/${note}.png')`;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', revealCard);
        card.setAttribute('data-note', note);

        return card;
    };

    // Função para carregar o jogo com as cartas embaralhadas
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

    // Função para tocar o som da nota correspondente
    const playNoteSound = (note) => {
        const audio = new Audio(`../sounds/${note}.mp3`);
        audio.play();
    };

    // Função para exibir a tela final do jogo
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

    // Função para desabilitar as cartas que foram acertadas
    const disableCards = () => {
        firstCard.firstChild.classList.add('disabled_card');
        secondCard.firstChild.classList.add('disabled_card');
        resetBoard();
    };

    // Função para virar as cartas de volta se não forem iguais
    const unflipCards = () => {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            resetBoard();
        }, 1000);
    };

    // Manipuladores de eventos para os botões
    playAgainButton.addEventListener('click', () => {
        endGameScreen.style.display = 'none';
        grid.innerHTML = ''; // Limpa o tabuleiro
        matchedPairs = 0; // Reseta o contador de pares
        resetTimer(); // Reseta o temporizador
        loadGame(); // Recarrega o jogo
    });

    restartTheGame.addEventListener('click', () => {
        endGameScreen.style.display = 'none';
        grid.innerHTML = ''; // Limpa o tabuleiro
        matchedPairs = 0; // Reseta o contador de pares
        resetTimer(); // Reseta o temporizador
        loadGame(); // Recarrega o jogo
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

    // Inicializa o jogo quando a página é carregada
    window.onload = () => {
        spanPlayer.textContent = localStorage.getItem('player');
        loadGame();
    };
});
