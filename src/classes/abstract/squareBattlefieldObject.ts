import { ILine } from "./ILine";
import { EnemyObject } from "./enemyObject";
import { FighterObject } from "./fighterObject";

export abstract class SquareBattlefieldObject  {
    private squareQuantity:number;
    private enemies:EnemyObject[];
    private fighter:FighterObject;

    constructor(squareQuantity:number,enemies:EnemyObject[],fighter:FighterObject) {
        this.squareQuantity = squareQuantity;
        this.enemies = enemies;
        this.fighter = fighter;
    }

    public GetSumDistance():number{
        const allDistance:ILine = this.GetAllDistance();
        const values:number[] = Object.values(allDistance);
        let sum:number = 0;
        values.forEach(value => {
            sum += value;
        });
        return sum;
    }
    public GetAllDistance():ILine{
        return {
            horizontal:this.getHorizontalDistance(),
            vertical:this.getVerticalDistance(),
            leftCross:this.getLeftCrossDistance(),
            rightCross:this.getRightCrossDistance()
        }
    }

    private getHorizontalDistance():number{
        const sameHorizontalEnemies:EnemyObject[] = this.enemies.filter(enemy => enemy.GetYLocation() == this.fighter.GetYLocation());
        
        if(sameHorizontalEnemies.length == 0){
            return this.squareQuantity;
        }
        else if(sameHorizontalEnemies.length == 1){
            const enemy:EnemyObject = sameHorizontalEnemies[0];
            return enemy.GetXLocation() > this.fighter.GetXLocation() ? enemy.GetXLocation() : (this.squareQuantity - enemy.GetXLocation());
        }else{
            const allXlocations:number[] = sameHorizontalEnemies.map(enemy => {return enemy.GetXLocation()});
            const bigger:number[] = allXlocations.filter(x => x > this.fighter.GetXLocation());
            const lower:number[] = allXlocations.filter(x => x < this.fighter.GetXLocation());

            bigger.push(this.squareQuantity);
            lower.push(0);
            return Math.min(...bigger) - Math.max(...lower);
        }
    }

    private getVerticalDistance():number{
        const sameVerticalEnemies:EnemyObject[] = this.enemies.filter(enemy => enemy.GetXLocation() == this.fighter.GetXLocation());

        if(sameVerticalEnemies.length == 0){
            return this.squareQuantity;
        }else if (sameVerticalEnemies.length == 1){
            const enemy:EnemyObject = sameVerticalEnemies[0];
            return enemy.GetYLocation() > this.fighter.GetYLocation() ? enemy.GetYLocation() : (this.squareQuantity - enemy.GetYLocation());
        }
        else{
            const allYlocations:number[] = sameVerticalEnemies.map(enemy => enemy.GetYLocation());
            const bigger:number[] = allYlocations.filter(y => y > this.fighter.GetYLocation());
            const lower:number[] = allYlocations.filter(y => y < this.fighter.GetYLocation());

            bigger.push(this.squareQuantity);
            lower.push(0);
            return Math.min(...bigger) - Math.max(...lower);
        }
    }

    private getLeftCrossDistance():number{
        const sumOfLocations = this.fighter.GetXLocation() + this.fighter.GetYLocation();
        const leftUpEndpoint:number[] = sumOfLocations > this.squareQuantity ? 
        [(sumOfLocations-this.squareQuantity),this.squareQuantity] :
        [0,sumOfLocations];
        const rightDownEndpoint:number[] = [leftUpEndpoint[1],leftUpEndpoint[0]];

        const sameLinePoints:EnemyObject[] = this.enemies.filter(enemy => this.lineControl([leftUpEndpoint,rightDownEndpoint],enemy.GetLocations()));
        
        if(sameLinePoints.length == 0){
            return Math.abs(leftUpEndpoint[0] - rightDownEndpoint[0]);
        }
        else if(sameLinePoints.length == 1){
            const difference:number = this.fighter.GetXLocation() - sameLinePoints[0].GetXLocation();
            const xLocatinOfEndPoints:number[] = [leftUpEndpoint[0],rightDownEndpoint[0]];
            const xEndPoint:number = difference < 0 ? Math.min(...xLocatinOfEndPoints) : Math.max(...xLocatinOfEndPoints);

            return Math.abs(xEndPoint - sameLinePoints[0].GetXLocation());
        }else{
            const allXlocations:number[] = sameLinePoints.map(enemy => {return enemy.GetXLocation()});
            const bigger:number[] = allXlocations.filter(x => x > this.fighter.GetXLocation());
            const lower:number[] = allXlocations.filter(x => x < this.fighter.GetXLocation());

            bigger.push(rightDownEndpoint[0]);
            lower.push(leftUpEndpoint[0]);

            return Math.min(...bigger) - Math.max(...lower);
        }
    }

    private getRightCrossDistance():number{
        const fighterLocationStatus:boolean = this.fighter.GetXLocation() >= this.fighter.GetYLocation();
        const xLocation = this.fighter.GetXLocation();
        const yLocation = this.fighter.GetYLocation();
        const rightUpEndpoint:number[] = fighterLocationStatus ? 
        [this.squareQuantity,(this.squareQuantity-xLocation+yLocation)]:
        [this.squareQuantity-(yLocation-xLocation),this.squareQuantity];

        const leftDownEndpoint:number[] = fighterLocationStatus ?
        [xLocation-yLocation,0]:
        [0,yLocation-xLocation];

        const sameLinePoints:EnemyObject[] = this.enemies.filter(enemy => this.lineControl([leftDownEndpoint,rightUpEndpoint],enemy.GetLocations()));

        if(sameLinePoints.length == 0){
            return Math.abs(leftDownEndpoint[0] - rightUpEndpoint[0]);
        }else if(sameLinePoints.length == 1){
            const difference:number = this.fighter.GetXLocation() - sameLinePoints[0].GetXLocation();
            const yLocatinOfEndPoints:number[] = [leftDownEndpoint[1],rightUpEndpoint[1]];
            const yEndPoint:number = difference < 0 ? Math.min(...yLocatinOfEndPoints) : Math.max(...yLocatinOfEndPoints);

            return Math.abs(yEndPoint - sameLinePoints[0].GetYLocation());
        }else{
            const allXlocations:number[] = sameLinePoints.map(enemy => {return enemy.GetXLocation()});
            const bigger:number[] = allXlocations.filter(x => x > this.fighter.GetXLocation());
            const lower:number[] = allXlocations.filter(x => x < this.fighter.GetXLocation());

            bigger.push(rightUpEndpoint[0]);
            lower.push(leftDownEndpoint[0]);

            return Math.min(...bigger) - Math.max(...lower);
        }
    }

    private lineControl(endpoints:number[][],point:number[]):boolean{
        const firtsEndPoint = endpoints[0];
        const secondEndPoint = endpoints[1];
        
        const fixedA = (firtsEndPoint[1]-secondEndPoint[1]) / (firtsEndPoint[0]-secondEndPoint[0]);
        const fixedB = firtsEndPoint[1] - (fixedA * firtsEndPoint[0]);
        return (fixedA*point[0] + fixedB) == point[1];
    }


}