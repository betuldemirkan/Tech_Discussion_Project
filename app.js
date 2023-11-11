const enemyArray = [];
const enemySize = 4;
let totalMoves = 0;

//generate random positions in 8x8 table
function randomNumber() {
  return Math.floor(Math.random() * 8);
}

//control duplicated positions
function duplicated(array, randomPos) {
  return array.some(
    (pos) => randomPos[0] === pos[0] && randomPos[1] === pos[1]
  );
}
//control is position moveable
function moveable(pos) {
  return pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7;
}

//calculate max move with given move array
function calculateMoves(move, currPos) {
  let moves = 0;
  let position = currPos;
  while (!duplicated(enemyArray, position)) {
    position = [position[0] + move[0], position[1] + move[1]];
    if (moveable(position)) {
      moves += 1;
    } else {
      break;
    }
  }
  totalMoves += moves;
  return moves;
}

//generate enemy positions
for (let i = 0; i < enemySize; i++) {
  let randomPosition = [randomNumber(), randomNumber()];
  while (duplicated(enemyArray, randomPosition)) {
    randomPosition = [randomNumber(), randomNumber()];
  }
  enemyArray[i] = randomPosition;
  console.log("enemy " + (i+1) + " position           = " + enemyArray[i]);
}

//generate char position
let charPosition = [randomNumber(), randomNumber()];
while (duplicated(enemyArray, charPosition)) {
  charPosition = [randomNumber(), randomNumber()];
}
console.log("\nchar position              = " + charPosition);
console.log(
  "\ntotal moves to right       = " + calculateMoves([1, 0], charPosition)
);
console.log(
  "total moves to left        = " + calculateMoves([-1, 0], charPosition)
);
console.log(
  "total moves to top         = " + calculateMoves([0, 1], charPosition)
);
console.log(
  "total moves to botttom     = " + calculateMoves([0, -1], charPosition)
);
console.log(
  "total moves to topright    = " + calculateMoves([1, 1], charPosition)
);
console.log(
  "total moves to topleft     = " + calculateMoves([-1, 1], charPosition)
);
console.log(
  "total moves to bottomright = " + calculateMoves([1, -1], charPosition)
);
console.log(
  "total moves to bottomleft  = " + calculateMoves([-1, -1], charPosition)
);
console.log("\ntotal moves                = " + totalMoves);
