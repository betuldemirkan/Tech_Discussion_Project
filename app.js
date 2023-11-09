const enemyArray = [];
const enemySize = 4;

//generate random positions in 8x8 table
function randomNumber() {
  return Math.floor(Math.random() * 9);
}

//control duplicated positions
function duplicated(array, randomPos) {
  return array.some(
    (pos) => randomPos[0] === pos[0] && randomPos[1] === pos[1]
  );
}

//generate enemy positions
for (let i = 0; i < enemySize; i++) {
  let randomPosition = [randomNumber(), randomNumber()];
  while (duplicated(enemyArray, randomPosition)) {
    randomPosition = [randomNumber(), randomNumber()];
  }
  enemyArray[i] = randomPosition;
  console.log("enemy "+ i + " position =  " + enemyArray[i])
}

//generate char position
let charPosition = [randomNumber(), randomNumber()];
while (duplicated(enemyArray, charPosition)) {
  charPosition = [randomNumber(), randomNumber()];
}
console.log("char position    =  " + charPosition);