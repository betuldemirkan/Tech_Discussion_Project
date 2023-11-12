import { Enemy } from "../characters/Enemy";

export class EnemyFactory {
  static create(numberOfEnemies: number): Enemy[] {
    const enemies = [];
    for (let i = 0; i < numberOfEnemies; i++) {
      enemies.push(new Enemy());
    }
    return enemies;
  }
}
