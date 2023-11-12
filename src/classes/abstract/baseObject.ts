export abstract class BaseObject{

    private X_location:number;
    private Y_location:number;
    
    constructor(X_location:number,Y_location:number){
        this.X_location = X_location;
        this.Y_location = Y_location;
    }

    public GetLocations():number[]{
        return [this.GetXLocation(),this.GetYLocation()];
    }

    public GetXLocation():number{
        return this.X_location;
    }

    public GetYLocation():number{
        return this.Y_location;
    }
}