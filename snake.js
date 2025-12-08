const readline = require('readline');

const ROWS = 10;
const COLS = 10;
const EMPTY = 0;
const SNAKE_BODY = '■';
const FOOD = '★';
const GAME_SPEED = 200; // Milliseconds 

let arr = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY)); // grid
let snake = [{ x: 5, y: 5 }]; // snake itself
let score = 0;
let direction = { x: 0, y: 0 }; // Snake is stationary at start
let gameInterval; // timer ( more specifically a counter)

// INITIALISE
arr[5][5] = SNAKE_BODY;
generateFood();

function generateFood() {
  let emptySpots = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (arr[i][j] === EMPTY) emptySpots.push({ x: i, y: j });
    }
  }

  if (emptySpots.length === 0) {
    printGrid();
    console.log("YOU WIN!");
    process.exit();
  }

  let spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
  arr[spot.x][spot.y] = FOOD;
}

function printGrid() {
  console.clear();
  console.log(`SCORE: ${score}`);
  console.log("▄".repeat(COLS * 3 + 2)); // *3 coz padding

  for (let i = 0; i < ROWS; i++) {
    let rowString = '█';
    for (let j = 0; j < COLS; j++) {
      let value = arr[i][j];
      let display = value === EMPTY ? ' ' : value;
      rowString += ` ${display} `;
    }
    console.log(rowString + '█');
  }
  console.log("▀".repeat(COLS * 3 + 2));
}

function gameOver() {
  clearInterval(gameInterval); // Stop the loop
  console.log("\n !! SORRY BUD YOU LOST !!");
  console.log(`Final Score: ${score}`);
  process.exit();
}

function move() {
  //  when no direction is set ( at the very beginning )
  if (direction.x === 0 && direction.y === 0) return; // dont move

  const head = snake[0];
  const newHead = { x: head.x + direction.x, y: head.y + direction.y };

  // Checks for Wall Collisions
  if (newHead.x < 0 || newHead.x >= ROWS || newHead.y < 0 || newHead.y >= COLS) {
    gameOver();
    return; // Stops execution
  }

  //  Checks for Self Collision
  if (arr[newHead.x][newHead.y] === SNAKE_BODY) {
    gameOver();
    return;
  }

  //  Checks for Food
  const ateFood = arr[newHead.x][newHead.y] === FOOD;

  // Update Snake Array
  snake.unshift(newHead);
  arr[newHead.x][newHead.y] = SNAKE_BODY;

  if (ateFood) {
    score++;
    generateFood();
  } else {
    const tail = snake.pop();
    arr[tail.x][tail.y] = EMPTY;
  }

  printGrid();
}

// INPUT HANDLING
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
  process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c')
    process.exit();

  // directions
  const up = { x: -1, y: 0 };
  const down = { x: 1, y: 0 };
  const left = { x: 0, y: -1 };
  const right = { x: 0, y: 1 };

  switch (key.name) {
    case 'w':
    case 'k':
    case 'up':
      if (direction.x !== 1)
        direction = up;
      break;

    case 's':
    case 'j':
    case 'down':
      if (direction.x !== -1)
        direction = down;
      break;

    case 'a':
    case 'h':
    case 'left':
      if (direction.y !== 1)
        direction = left;
      break;

    case 'd':
    case 'l':
    case 'right':
      if (direction.y !== -1)
        direction = right;
      break;
  }
});

printGrid();
gameInterval = setInterval(move, GAME_SPEED);
