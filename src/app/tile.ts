




export class TileObj{
    private img:string;
    private sideKeys:string[];

    //rotation in degrees
    private rotation:number; 

    constructor(img:string, sideKeys:string[], rotation:number){
        this.img = img;
        this.sideKeys = sideKeys;
        this.rotation = rotation;
    }

    
    public get image() : string {
        return this.img;
    }

    public getSideKey(direction:number) : string {
        return this.sideKeys[direction];
    }

    public getSideKeys():string[]{
        return this.sideKeys;
    }

    // returns rotation in degrees not radians
    public getRotation() : number {
        return this.rotation
    }
        
}