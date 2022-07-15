class Tile{
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

    // returns rotation in degrees not radians
    public get getRotation() : number {
        return this.rotation
    }
        
}