import { direction } from "./directions";
import { TileObj } from "./tile";

type Tile = TileObj;
export class CellObj{
    private entropy: number;
    private tile: Tile;
    private collapsed: boolean;
    private validTiles: Tile[];

    constructor(entropy: number, validTiles: Tile[]){
        this.entropy =entropy;
        this.validTiles = validTiles;
        this.collapsed = false;
        this.tile= new TileObj("",[""],0);
    }

    
    public setTile(v : Tile) {
        this.tile = v;
    }

    public getTile(): Tile{
        return this.tile;
    }
    
    public getEntropy() : number {
        return this.entropy;
    }

    public setEntropy(v : number) {
        this.entropy= v;
    }

    public isCollapsed() : boolean {
        return this.collapsed;
    }

    public setCollapsed(v : boolean) {
        this.collapsed= v;
    }

    
    public getValidTiles() : Tile[] {
        return this.validTiles;
    }

    
    public setValidTiles(v : Tile[]) {
        this.validTiles = v;
    }
    
    public getSideKey(direction: number): string{
        return this.tile.getSideKey(direction);
    }
       
    
}
