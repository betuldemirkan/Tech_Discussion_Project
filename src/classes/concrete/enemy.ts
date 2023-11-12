import { EnemyObject } from "../abstract/enemyObject";

export class Enemy extends EnemyObject{
    constructor(X_location:number,Y_location:number){
        super(X_location,Y_location);
    }
}