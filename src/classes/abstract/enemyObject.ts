import { BaseObject } from "./baseObject";

export abstract class EnemyObject extends BaseObject {
    constructor(X_location:number,Y_location:number){
        super(X_location,Y_location);
    }
}