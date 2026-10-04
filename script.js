const cards = [
    'bear.png',
    'cat.png',
    'fox.png',
    'lion.png',
    'owl.png',
    'panda.png',
    'rabbit.png',
    'sheep.png'
];

const leaderboardKey = 'memoryGameLeaderboard';
let cardPairs = [];

cardPairs.sort(() => Math.random() - 0.5)

// Верстка header

const header = document.createElement('header'),
      btn_newGame = document.createElement('button'),
      btn_leaders = document.createElement('button');

btn_newGame.textContent = 'New Game';
btn_leaders.textContent = 'Leaderboard';

btn_newGame.classList.add('btn_newGame');
btn_leaders.classList.add('btn_leaders');

header.append(btn_newGame, btn_leaders);


//Верстка main

const main = document.createElement('main'),
      cardGrid = document.createElement('div');

cardGrid.classList.add('card-grid');

main.append(cardGrid);

const counters = document.createElement('div');
const movesCounter = document.createElement('p');
const pairsCounter = document.createElement('p');

let firstCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let hideCardsTimeout = null;
let gameFinished = false;

counters.classList.add('counters');

movesCounter.textContent = `Moves: ${moves}`;
pairsCounter.textContent = `Pairs: ${matchedPairs} / 8`;

counters.append(movesCounter, pairsCounter);

main.prepend(counters);

function startNewGame() {
    clearTimeout(hideCardsTimeout);
    hideCardsTimeout = null;

    firstCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;
    gameFinished = false;

    cardPairs = [...cards, ...cards];
    cardPairs.sort(() => Math.random() - 0.5);

    gameCards.forEach((card, index) => {
        const image = cardPairs[index];
        const cardInner = card.querySelector('.card-inner');

        cardInner.style.transition = 'none';

        card.classList.remove('flipped');
        card.classList.remove('matched');

        card.dataset.image = image;
        card.querySelector('.card-back img').src = `./image/${image}`;

        cardInner.offsetHeight;

        cardInner.style.transition = '';

    });

    movesCounter.textContent = `Moves: ${moves}`;
    pairsCounter.textContent = `Pairs: ${matchedPairs} / 8`;
}

function saveResult() {
    const results = JSON.parse(localStorage.getItem(leaderboardKey)) || [];

    const result = {
        moves: moves,
        date: new Date().toISOString(),
        taimestamp: Date.now()
    }

    results.push(result);

    results.sort((a, b) => {
        if (a.moves !== b.moves) {
            return a.moves - b.moves
        }

        return a.taimestamp - b.taimestamp
    });

    const topResults = results.slice(0, 10)

    localStorage.setItem(leaderboardKey, JSON.stringify(topResults));
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

function showLeaderboardModal() {
    const results = JSON.parse(localStorage.getItem(leaderboardKey)) || [];

    const leaderboardContent = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = 'Leaderboard';

    leaderboardContent.append(title);

    if (results.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No results yet.';

        const buttons = document.createElement('div');
        buttons.classList.add('modal-buttons');

        buttons.append(createCloseButton());

        leaderboardContent.append(emptyMessage, buttons);

        openModal(leaderboardContent);
        return;
    }

    const table = document.createElement('table');

    const headerRow = document.createElement('tr');

    const placeHeader = document.createElement('th');
    placeHeader.textContent = 'Place';

    const movesHeader = document.createElement('th');
    movesHeader.textContent = 'Moves';

    const dateHeader = document.createElement('th');
    dateHeader.textContent = 'Date';

    headerRow.append(placeHeader, movesHeader, dateHeader);
    table.append(headerRow);

    results.forEach((result, index) => {
        const row = document.createElement('tr');

        const placeCell = document.createElement('td');
        placeCell.textContent = index + 1;

        const movesCell = document.createElement('td');
        movesCell.textContent = result.moves;

        const dataCell = document.createElement('td');
        dataCell.textContent = formatDate(result.date);

        row.append(placeCell, movesCell, dataCell);
        table.append(row)
    });

    const buttons = document.createElement('div');
    buttons.classList.add('modal-buttons');

    buttons.append(createCloseButton());

    leaderboardContent.append(table, buttons);

    openModal(leaderboardContent);
}


btn_newGame.addEventListener('click', startNewGame);
btn_leaders.addEventListener('click', showLeaderboardModal);

const gameCards = [];

// Создаем карточки

for (let i = 0; i < 16; i++) {

    const card = document.createElement('div'),
          cardInner = document.createElement('div'),
          cardFront = document.createElement('div'),
          cardBack = document.createElement('div');

    card.classList.add('card');
    cardInner.classList.add('card-inner');
    cardFront.classList.add('card-front');
    cardBack.classList.add('card-back');

    cardFront.textContent = '?';
    
    const imageElement = document.createElement('img');
    cardBack.append(imageElement);

    cardInner.append(cardFront, cardBack);
    card.append(cardInner);

    cardGrid.append(card);
    gameCards.push(card);

    card.addEventListener('click', () => {

        if (gameFinished) return;

        if (lockBoard) return;

        if (card.classList.contains('flipped')) return;

        if (card.classList.contains('matched')) return;

        card.classList.add('flipped');

        if(firstCard === null) {
            firstCard = card;
        } else {
            moves++;
            movesCounter.textContent = `Moves: ${moves}`;

            if(firstCard.dataset.image === card.dataset.image) {
                console.log ('Совпадение')

                firstCard.classList.add('matched');
                card.classList.add('matched');

                matchedPairs++;
                pairsCounter.textContent = `Pairs: ${matchedPairs} / 8`;

                firstCard = null;

                if (matchedPairs === 8) {
                    gameFinished = true;
                    saveResult();
                    showVictoryModal();
                }
            } else {
                lockBoard = true;

                const first = firstCard;
                const second = card;

                hideCardsTimeout = setTimeout(() => {
                    
                    first.classList.remove('flipped');
                    second.classList.remove('flipped');

                    firstCard = null;
                    lockBoard = false;
                }, 1000)
                console.log ('Не совпало')
            }

        }
    });
}

//Модальное окно

function openModal(content) {
    const modalOverlay = document.createElement('div');
    const modal = document.createElement('div');

    modalOverlay.classList.add('modal-overlay');
    modal.classList.add('modal');

    modal.append(content);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);

    document.body.style.overflow = 'hidden';

    modalOverlay.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('keydown', handleEscape);
}

function handleEscape(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

function createCloseButton() {
    const closeButton = document.createElement('button');

    closeButton.textContent = 'Close';
    closeButton.classList.add('modal-close');

    closeButton.addEventListener('click', closeModal);

    return closeButton;
}

function createNewGameButton() {
    const newGameButton = document.createElement('button');

    newGameButton.textContent = 'New Game';
    newGameButton.classList.add('modal-newGame');

    newGameButton.addEventListener('click', () => {
        closeModal();
        startNewGame();
    });

    return newGameButton;
}

function showVictoryModal() {
    const victoryContent = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = 'Victory';

    const result = document.createElement('p');
    result.textContent = `Moves: ${moves}`;

    const buttons = document.createElement('div');
    buttons.classList.add('modal-buttons');

    buttons.append(
        createNewGameButton(),
        createCloseButton()
    );

    victoryContent.append(
        title,
        result,
        buttons
    );

    openModal(victoryContent);
}

function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');

    if (modalOverlay) {
        modalOverlay.remove();

        document.body.style.overflow = '';

        document.removeEventListener('keydown', handleEscape);
    }
}

document.body.append(header, main);
startNewGame();