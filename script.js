// Верстка header

const header = document.createElement('header'),
      btn_newGame = document.createElement('button'),
      btn_leaders = document.createElement('button');

btn_newGame.textContent = 'New Game';
btn_leaders.textContent = 'Leaderboard';

header.append(btn_newGame, btn_leaders);


//Верстка main

const main = document.createElement('main'),
      cardGrid = document.createElement('div');

cardGrid.classList.add('card-grid');

main.append(cardGrid);


for (let i = 0; i < 16; i++) {

    const card = document.createElement('div');

    card.classList.add('card');

    cardGrid.append(card);
}

document.body.append(header, main);