import { Enemy } from "../characters/Enemy";
import { Player } from "../characters/Player";
import { EnemyFactory } from "../factory/EnemyFactory";
import { PlayerFactory } from "../factory/PlayerFactory";
import { GameBoard } from "./GameBoard";

export class Game {
  private gameBoard: GameBoard;
  private player: Player;
  private enemies: Enemy[];

  constructor() {
    this.gameBoard = new GameBoard();
    this.player = PlayerFactory.create();
    this.enemies = EnemyFactory.create(4);
  }

  start(): void {
    this.gameBoard.initalize(this.enemies, this.player);

    const totalMoveDistance = this.player.calculateTotalMoveDistance(this.gameBoard);

    console.log(`Oyuncu başlangıç konumu: (${this.player.getPosition().x}, ${this.player.getPosition().y})`);

      this.enemies.forEach((enemy, index) => {
          console.log(`Düşman ${index + 1} başlangıç konumu: (${enemy.getPosition().x}, ${enemy.getPosition().y})`);
      });

    this.gameBoard.displayBoard();

    console.log(`Toplam hareket mesafesi: ${totalMoveDistance}`);
  }
}