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

const cardPairs = [...cards, ...cards];

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

let firstCard = null;

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
    
    const image = cardPairs[i];
    card.dataset.image = image;

    const imageElement = document.createElement('img');
    imageElement.src = `./image/${image}`;

    cardBack.append(imageElement);

    cardInner.append(cardFront, cardBack);
    card.append(cardInner);

    cardGrid.append(card);

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');

        if(firstCard === null) {
            firstCard = card;
        } else {
            if(firstCard.dataset.image === card.dataset.image) {
                console.log ('Совпадение')
            } else {
                console.log ('Не совпало')
            }

            firstCard = null
        }
    });
}

document.body.append(header, main);

