export class RandomHelper{

    private static _instance:RandomHelper;
    
    public static get Instance(){
        return this._instance || (this._instance = new this());
    }

    public GetRandomLocation(upTo:number):number[]{
        return [
            Math.floor(Math.random() * upTo),
            Math.floor(Math.random() * upTo)
        ]
    }
}