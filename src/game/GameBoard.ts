import { Character, Position } from "../characters/Character";
import { Enemy } from "../characters/Enemy";
import { Player } from "../characters/Player";

export class GameBoard {
  private board: string[][];
  private boardSize: number;
  private occupiedPositions: Set<string>;
  private enemiesPositions: Set<string>;

  constructor(boardSize: number = 8) {
    this.boardSize = boardSize;
    this.board = this.createBoard();
    this.occupiedPositions = new Set<string>();
    this.enemiesPositions = new Set<string>();
  }

  private createBoard(): string[][] {
    let board = new Array(this.boardSize);
    for (let i = 0; i < this.boardSize; i++) {
      board[i] = new Array(this.boardSize).fill("-");
    }

    return board;
  }

  displayBoard(): void {
    for (let row of this.board) {
      console.log(row.join(" "));
    }
  }

  private positionToString(position: Position): string {
    return `${position.x},${position.y}`;
  }

  private isPositionEmpty(position: Position): boolean {
    const positionKey = this.positionToString(position);
    return !this.occupiedPositions.has(positionKey);
  }

  placeCharacterAtRandom(character: Character): void {
    let randomPosition: Position;
    let positionFound = false;

    while (!positionFound) {
      randomPosition = {
        x: Math.floor(Math.random() * this.boardSize),
        y: Math.floor(Math.random() * this.boardSize),
      };

      if (this.isPositionEmpty(randomPosition)) {
        this.board[randomPosition.x][randomPosition.y] = character.symbol;
        positionFound = true;
        character.setPosition(randomPosition);
        const positionKey = this.positionToString(randomPosition);
        this.occupiedPositions.add(positionKey);
        if (character.type === "Enemy") {
          this.enemiesPositions.add(positionKey);
        }
      }
    }
  }

  isEnemyAt(position: Position): boolean {
    const positionKey = this.positionToString(position);
    return this.enemiesPositions.has(positionKey);
  }

  isWithinBounds(position: Position): boolean {
    return (
      position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8
    );
  }

  initalize(enemies: Enemy[], player: Player): void {
    this.placeCharacterAtRandom(player);
    enemies.forEach((enemy) => {
      this.placeCharacterAtRandom(enemy);
    });
  }
}
