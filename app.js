const enemyArray = [];
const enemySize = 4;
let totalMoves = 0;

const moveDirections = [
  { direction: [1, 0], name: "right      " },
  { direction: [-1, 0], name: "left       " },
  { direction: [0, 1], name: "top        " },
  { direction: [0, -1], name: "bottom     " },
  { direction: [1, 1], name: "topright   " },
  { direction: [-1, 1], name: "topleft    " },
  { direction: [1, -1], name: "bottomright" },
  { direction: [-1, -1], name: "bottomleft " }
];

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
console.log("\nchar position              = " + charPosition + "\n3");

moveDirections.forEach(move => {
  const totalMoves = calculateMoves(move.direction, charPosition);
  console.log(`total moves to ${move.name} = ${totalMoves}`);
});

console.log("\ntotal moves                = " + totalMoves);