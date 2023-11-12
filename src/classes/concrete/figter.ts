import { FighterObject } from "../abstract/fighterObject";

export class Fighter extends FighterObject{
    constructor(X_location:number,Y_location:number){
        super(X_location,Y_location);
    }
}