import { TileObj } from "./tile";
type Tile = TileObj;

export class TileSets{
    tileSets: Tile[][] = [[new TileObj("/assets/tiles/basicTee/blank.png", ["BBB","BBB","BBB","BBB"], 0)]];


    constructor() { 
		var basicTee: Tile[] = [];
		basicTee.push(new TileObj("/assets/tiles/basicTee/tile1.png", ["ABA", "ABA",'AAA','ABA'], 0));
		basicTee.push(new TileObj("/assets/tiles/basicTee/tile0.png", ["AAA", "AAA",'AAA','AAA'], 0));
		for(var tile of this.rotateTile(basicTee[0])){
			basicTee.push(tile);
		}
		this.tileSets.push(basicTee);

		var circuitTiles: Tile[] = [];
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/bridge.png", ["ABA", "ACA","ABA","ACA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/component.png", ["DDD", "DDD","DDD","DDD"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/connection.png", ["ABA", "AAD","DDD","DAA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/corner.png", ["AAA", "AAA","AAD","DAA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/dskew.png", ["ABA", "ABA","ABA","ABA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/skew.png", ["ABA", "ABA","AAA","AAA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/substrate.png", ["AAA", "AAA","AAA","AAA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/t.png", ["AAA", "ABA","ABA","ABA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/track.png", ["ABA", "AAA","ABA","AAA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/transition.png", ["ACA", "AAA","ABA","AAA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/turn.png", ["ABA", "ABA","AAA","AAA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/viad.png", ["AAA", "ABA","AAA","ABA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/vias.png", ["ABA", "AAA","AAA","AAA"],0));
		circuitTiles.push(new TileObj("/assets/tiles/Circuit/wire.png", ["AAA", "ACA","AAA","ACA"],0));
		var circuitTilesToRotate = [0,2,3,4,5,7,8,9,10,11,12,13];
		for(var index of circuitTilesToRotate){
			for(var tile of this.rotateTile(circuitTiles[index])){
				circuitTiles.push(tile);
			}
		}
		this.tileSets.push(circuitTiles)

		var knotsTiles: Tile[] = [];
		knotsTiles.push(new TileObj("/assets/tiles/Knots/corner.png", ["ABA", "ABA","AAA","AAA"],0));
		knotsTiles.push(new TileObj("/assets/tiles/Knots/cross.png", ["ABA", "ABA","ABA","ABA"],0));
		knotsTiles.push(new TileObj("/assets/tiles/Knots/empty.png", ["AAA", "AAA","AAA","AAA"],0));
		knotsTiles.push(new TileObj("/assets/tiles/Knots/line.png", ["AAA", "ABA","AAA","ABA"],0));
		knotsTiles.push(new TileObj("/assets/tiles/Knots/t.png", ["AAA", "ABA","ABA","ABA"],0));
		var knotsTilesToRotate =[0,3,4]
		for(var index of knotsTilesToRotate){
			for(var tile of this.rotateTile(knotsTiles[index])){
				knotsTiles.push(tile);
			}
		}		
		this.tileSets.push(knotsTiles);
		
		var roadsAndRiversTiles: Tile[] = [];
		roadsAndRiversTiles.push(new TileObj("/assets/tiles/Castle/bridge.png", ["ABA", "ACA","ABA","ACA"],0));
		roadsAndRiversTiles.push(new TileObj("/assets/tiles/Castle/ground.png", ["AAA", "AAA","AAA","AAA"],0));
		roadsAndRiversTiles.push(new TileObj("/assets/tiles/Castle/river.png", ["ABA", "AAA","ABA","AAA"],0));
		roadsAndRiversTiles.push(new TileObj("/assets/tiles/Castle/riverturn.png", ["ABA", "ABA","AAA","AAA"],0));
		roadsAndRiversTiles.push(new TileObj("/assets/tiles/Castle/road.png", ["ACA", "AAA","ACA","AAA"],0));
		roadsAndRiversTiles.push(new TileObj("/assets/tiles/Castle/roadturn.png", ["ACA", "ACA","AAA","AAA"],0));
		roadsAndRiversTiles.push(new TileObj("/assets/tiles/Castle/t.png", ["AAA", "ACA","ACA","ACA"],0));
		var CastleTilesToRotate =[0,2,3,4,5,6]
		for(var index of CastleTilesToRotate){
			for(var tile of this.rotateTile(roadsAndRiversTiles[index])){
				roadsAndRiversTiles.push(tile);
			}
		}		
		this.tileSets.push(roadsAndRiversTiles);

		var circleTiles:Tile[] = []
		circleTiles.push(new TileObj("/assets/tiles/Circles/b.png", ["BBB", "BBB","BBB","BBB"],0));
		circleTiles.push(new TileObj("/assets/tiles/Circles/b_half.png", ["BBB", "WWW","WWW","WWW"],0));
		circleTiles.push(new TileObj("/assets/tiles/Circles/b_i.png", ["BBB", "WWW","BBB","WWW"],0));
		circleTiles.push(new TileObj("/assets/tiles/Circles/b_quarter.png", ["BBB", "BBB","WWW","WWW"],0));
		circleTiles.push(new TileObj("/assets/tiles/Circles/w.png", ["WWW", "WWW","WWW","WWW"],0));
		circleTiles.push(new TileObj("/assets/tiles/Circles/w_half.png", ["WWW", "BBB","BBB","BBB"],0));
		circleTiles.push(new TileObj("/assets/tiles/Circles/w_i.png", ["WWW", "BBB","WWW","BBB"],0));
		circleTiles.push(new TileObj("/assets/tiles/Circles/w_quarter.png", ["WWW", "WWWW","BBB","BBB"],0));
		var circleTilesToRotate=[1,2,3,5,6,7];
		for(var index of circleTilesToRotate){
			for(var tile of this.rotateTile(circleTiles[index])){
				circleTiles.push(tile);
			}
		}
		this.tileSets.push(circleTiles);

	// 	var floorPlanTiles: Tile[] = []
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/div.png", ["AAA", "ABA","AAA","ABA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/divt.png", ["AAA", "ABA","ABA","ABA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/divturn.png", ["ABA", "ABA","AAA","AAA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/door.png", ["AAA", "ABA","AAA","ABA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/empty.png", ["CCC", "CCC","CCC","CCC"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/floor.png", ["AAA", "AAA","AAA","AAA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/glass.png", ["AAA", "ADC","CCC","CDA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/halfglass.png", ["AAA", "ADC","CCC","CEA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/in.png", ["AAA", "AAA","AEC","CEA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/out.png", ["CEA", "AEC","CCC","CCC"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/stairs.png", ["AAA", "AAA","FFF","AAA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/table.png", ["AAA", "AAA","AAA","AAA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/vent.png", ["AAA", "AAA","AAA","AAA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/w.png.png", ["AAA", "AEC","CCC","CEA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/wall.png", ["AAA", "AEC","CCC","CEA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/walldiv.png", ["ABA", "AEC","CCC","CEA"],0));
	// 	floorPlanTiles.push(new TileObj("/assets/tiles/FloorPlan/window.png", ["AAA", "AEC","CCC","CEA"],0));
	// 	// var FloorPlanTilesToRotate =[0,1,2,3,6,7,8,9,10,13,14,15,16]
	// 	for(var index= 0; index < floorPlanTiles.length; index++){
	// 		for(var tile of this.rotateTile(floorPlanTiles[index])){
	// 			floorPlanTiles.push(tile);
	// 		}
	// 	}		
	// 	this.tileSets.push(floorPlanTiles);
 }


    /**
     * Shifts every element of the array arr 1 position to the left without
     * modifying the original array.
     * @param arr the array to rotate
     * @returns arr with each element shifted 1 position to the left
     */
    // TODO: needs refactoring to fit with clean code standards
    private shiftArrayLeft(arr:string[]):string[]{
        var outputArr = [];
        outputArr.push(arr[3]);
        outputArr.push(arr[0]);
        outputArr.push(arr[1]);
        outputArr.push(arr[2]);
        return outputArr;
    }

    /**
     * Appends the tile array with each rotation of the tile passed as a parameter.
     * @param tile the Tile object to be rotated in all other orientations.
     */

    private rotateTile(tile: Tile): Tile[]{
        var tiles =[];
        var sides:string[] = tile.getSideKeys();
        var img = tile.image;
        for(var r = 1; r < 4; r++){
            sides = this.shiftArrayLeft(sides);
            tiles.push(new TileObj(img,sides, r*90));
        }
        return tiles;
    }


	public getTileSet(index: number): Tile[]{
		return this.tileSets[index];
	}
}
