import { Character } from "../characters/Character";
import { GameBoard } from "../game/GameBoard";
import { Direction } from "../utils/Direction";

export class Player extends Character {
  constructor() {
    super("P", "Player");
  }

  private calculateDistanceInDirection(direction: Direction,gameBoard: GameBoard) {
    let { x, y } = this.position;
    let dx = 0,dy = 0;
    let distance = 0;

    switch (direction) {
      case Direction.UP:
        dy = -1;
        break;
      case Direction.DOWN:
        dy = 1;
        break;
      case Direction.LEFT:
        dx = -1;
        break;
      case Direction.RIGHT:
        dx = 1;
        break;
      case Direction.UP_LEFT:
        dx = -1;
        dy = -1;
        break;
      case Direction.UP_RIGHT:
        dx = 1;
        dy = -1;
        break;
      case Direction.DOWN_LEFT:
        dx = -1;
        dy = 1;
        break;
      case Direction.DOWN_RIGHT:
        dx = 1;
        dy = 1;
        break;
    }

    while (true) {
      x += dx;
      y += dy;
      if (!gameBoard.isWithinBounds({ x, y })) {
        break;
      }

      distance++;

      if (gameBoard.isEnemyAt({ x, y })) {
        break;
      }
    }

    return distance;
  }

  calculateTotalMoveDistance(board: GameBoard): number {
    let totalDistance = 0;
    for (let value of Object.values(Direction)) {
      if (typeof value === "number") {
        totalDistance += this.calculateDistanceInDirection(value as Direction,board);
      }
    }
    return totalDistance;
  }
}
