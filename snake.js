const arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// SNAKE 
const i = 5
const j = 5

arr[i][j] = "≡"
let snake = []

snake.push({ x: i, y: j })


//print grid

function printGrid() {

  console.clear()
  if (checkGameOver()) {
    printGameOver()
  }
  else {
    console.log("PRESS W/A/S/D OR  h/j/k/l to move, Ctrl + c to quit \n")
  }

  console.log("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄")

  arr[snake[0].x][snake[0].y] = "≡"

  for (let i = 0; i < 10; i++) {
    let rowString = '█';
    for (let j = 0; j < 10; j++) {
      let value = arr[i][j];
      let display = value === 0 ? ' ' : value.toString();
      rowString += ` ${display.padEnd(1)} `;
    }
    console.log(rowString + '█');

  }

  console.log("▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀")

}
function printGameOver() {

  console.log("SORRY BUDDY YOU LOST!! \n")
  console.log("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄")


  for (let i = 0; i < 10; i++) {
    let rowString = '█';
    for (let j = 0; j < 10; j++) {
      let value = arr[i][j];
      let display = value === 0 ? ' ' : value.toString();
      rowString += ` ${display.padEnd(2)} `;
    }
    console.log(rowString + '█');
  }

  console.log("▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀")
  process.exit()
}
function checkGameOver() {

  if (snake[0].x >= 10 || snake[0].y >= 10 || snake[0].y < 0 || snake[0].x < 0)
    return true
}

function selectRandom() {
  // Find all empty spots
  let emptySpots = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (arr[i][j] === 0)
        emptySpots.push({ x: i, y: j });

      if (emptySpots.length === 0)
        return;
      let randomSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];

      arr[randomSpot.x][randomSpot.y] =
        "■";
    }
  }
}

function moveUp() {
  arr[snake[0].x][snake[0].y] = "■"
  snake[0].x = snake[0].x - 1
  if (arr[snake[0].x][snake[0].y] === "■") printGameOver()
  printGrid()
}

function moveDown() {
  arr[snake[0].x][snake[0].y] = "■"
  snake[0].x = snake[0].x + 1
  if (arr[snake[0].x][snake[0].y] === "■") printGameOver()
  printGrid()
}

function moveRight() {
  arr[snake[0].x][snake[0].y] = "■"
  snake[0].y = snake[0].y + 1
  if (arr[snake[0].x][snake[0].y] === "■") printGameOver()
  printGrid()
}

function moveLeft() {
  arr[snake[0].x][snake[0].y] = "■"
  snake[0].y = snake[0].y - 1
  if (arr[snake[0].x][snake[0].y] === "■") printGameOver()
  printGrid()
}


function performMove(direction) {
  if (direction === 'up') { moveUp(); }
  if (direction === 'down') { moveDown(); }
  if (direction === 'left') { moveLeft(); }
  if (direction === 'right') { moveRight(); }
}
const { log } = require('console')
// --INPUT HANDLING
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
  process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit();

  if (key.name === 'w' || key.name === 'k' || key.name === 'up') {
    performMove('up');
  }
  else if (key.name === 's' || key.name === 'j' || key.name === 'down') {
    performMove('down');
  }
  else if (key.name === 'a' || key.name === 'h' || key.name === 'left') {
    performMove('left');
  }
  else if (key.name === 'd' || key.name === 'l' || key.name === 'right') {
    performMove('right');
  }
})

//Start
printGrid()
