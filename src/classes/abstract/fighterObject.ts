import { BaseObject } from "./baseObject";

export abstract class FighterObject extends BaseObject{
    constructor(X_location:number,Y_location:number){
        super(X_location,Y_location);
    }
}