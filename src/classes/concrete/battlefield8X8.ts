import { EnemyObject } from "../abstract/enemyObject";
import { FighterObject } from "../abstract/fighterObject";
import { SquareBattlefieldObject } from "../abstract/squareBattlefieldObject";

export class Battlefield8X8 extends SquareBattlefieldObject{
    constructor(enemies:EnemyObject[],fighter:FighterObject){
        super(8,enemies,fighter);
    }
}