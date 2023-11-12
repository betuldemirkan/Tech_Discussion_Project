import { Player } from "../characters/Player";

export class PlayerFactory {
  static create(): Player {
    return new Player();
  }
}
