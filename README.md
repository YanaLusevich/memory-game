# Memory Game 🧠

A browser-based Memory Game built with **HTML, CSS and JavaScript**.

The player needs to find all matching pairs of cards using as few moves as possible. The game includes a victory screen, restart functionality and a persistent leaderboard based on `localStorage`.

## Features

* 16 cards with 8 matching pairs
* Random card shuffle on every new game
* Card flip animation
* Automatic matching of identical cards
* Mismatched cards close automatically after a short delay
* Protection against clicking already opened or matched cards
* Move counter
* Matched pairs counter
* New Game button without page reload
* Victory modal after finding all 8 pairs
* Leaderboard with the 10 best results
* Results sorted by:

  1. Fewest moves
  2. Earlier completion time when moves are equal
* Results stored in `localStorage`
* Leaderboard persists after page reload and browser restart
* Modal windows can be closed with:

  * Close button
  * Overlay click
  * `Escape` key
* Page scrolling is disabled while a modal is open

## Technologies

* HTML5
* CSS3
* JavaScript (ES6+)
* DOM API
* `localStorage`

No frameworks or external libraries are used.

## How to Play

1. Open the game.
2. Click on a card to reveal it.
3. Open a second card.
4. If the cards match, they remain open.
5. If they do not match, both cards close automatically.
6. Continue until all 8 pairs are found.
7. Your result is saved to the leaderboard after victory.

### Moves

One move is counted when the player opens the second card of a pair.

For example:

* Open card #1 → no move yet
* Open card #2 → **1 move**

## Game Controls

### New Game

Starts a new game without reloading the page:

* reshuffles all cards;
* closes all cards;
* resets the counters;
* cancels the timer of a mismatched pair;
* does not delete previous leaderboard results.

### Leaderboard

Displays the best game results saved in the browser.

The leaderboard contains:

| Place | Moves | Date       |
| ----- | ----: | ---------- |
| 1     |    17 | 04.10.2026 |
| 2     |    19 | 04.10.2026 |
| 3     |    21 | 04.10.2026 |

Only the 10 best results are stored.

## Project Structure

```text
memory-game/
│
├── index.html
├── style.css
├── script.js
├── favicon.png
│
├── image/
│   ├── bear.png
│   ├── cat.png
│   ├── fox.png
│   ├── lion.png
│   ├── owl.png
│   ├── panda.png
│   ├── rabbit.png
│   └── sheep.png
│
└── fonts/
    └── ofont.ru_Handgeschrieben.ttf
```

## Running the Project

Clone or download the repository and open `index.html` in a browser.

For development, you can also use **VS Code Live Server**.

## Data Storage

Leaderboard results are stored in the browser using:

```javascript
localStorage
```

The game does not require a backend or database.

Unfinished games are not saved. A result is added only after all 8 pairs have been matched.

## What I Practiced

This project was created to practice:

* DOM manipulation
* Creating page elements with JavaScript
* Event listeners
* Arrays and array methods
* Game state management
* Timers with `setTimeout`
* Conditional logic
* CSS animations and 3D card flipping
* Working with `localStorage`
* Creating reusable functions
* Building and controlling modal windows

## Future Improvements

Possible future improvements:

* Responsive design for smaller screens
* Difficulty levels
* Sound effects
* Game timer
* More card themes
* Personal player names in the leaderboard
* Improved animations

## Author

Created as a JavaScript practice project.
