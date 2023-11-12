import { ILine } from "./classes/abstract/ILine";
import { EnemyObject } from "./classes/abstract/enemyObject";
import { FighterObject } from "./classes/abstract/fighterObject";
import { SquareBattlefieldObject } from "./classes/abstract/squareBattlefieldObject";
import { Battlefield8X8 } from "./classes/concrete/battlefield8X8";
import { Enemy } from "./classes/concrete/enemy";
import { Fighter } from "./classes/concrete/figter";
import { RandomHelper } from "./helper/randomHelper";

const upTo:number = 9;
const figterLocation:number[] = RandomHelper.Instance.GetRandomLocation(upTo);
const fighter:FighterObject = new Fighter(figterLocation[0],figterLocation[1]);

const enemyList:EnemyObject[] = [];
const enemiesLocations:any = {};
for (let i = 0; i < 4;) {
    const enemyLocation = RandomHelper.Instance.GetRandomLocation(upTo);
    if(
        (enemyLocation[0] == fighter.GetXLocation() && enemyLocation[1] == fighter.GetYLocation()) ||
        (enemyList.filter(enemy => (enemy.GetXLocation() == enemyLocation[0] && enemy.GetYLocation() == enemiesLocations[1]))).length > 0
    ) continue;
    enemiesLocations[`enemy${i+1}`] = enemyLocation;
    enemyList.push(
        new Enemy(enemyLocation[0],enemyLocation[1])
    );
    i++;
}

const battlefiel:SquareBattlefieldObject = new Battlefield8X8(enemyList,fighter);
const sumDistance:number = battlefiel.GetSumDistance();
const allDistance:ILine = battlefiel.GetAllDistance();

console.log(`Fighter Location: [${fighter.GetLocations()}]`);
console.log("Enemies Locations:",enemiesLocations);
console.log("All Distance:",allDistance);
console.log("Sum Distance:",sumDistance);
