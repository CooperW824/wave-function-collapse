import { Component, OnInit } from '@angular/core';
import { CellObj } from '../cell';
import { direction } from '../directions';
import { TileObj } from '../tile';
type Cell = CellObj;
type Tile = TileObj;

@Component({
	selector: 'app-wave-function-output',
	templateUrl: './wave-function-output.component.html',
	styleUrls: ['./wave-function-output.component.css']
})

export class WaveFunctionOutputComponent implements OnInit {
	dim = 20;
	cells: Cell[][] = Array.from(Array(this.dim), () => new Array(this.dim))
	tiles: Tile[] = [];
	failed:boolean = false;

	constructor() { }


	/**
	 * Ran by angular on page load, generates the list of tiles and initializes the cells array with CellObj objects
	 */

	ngOnInit(): void {
		this.tiles.push(new TileObj("/assets/tiles/basicTee/tile1.png", ["ABA", "ABA",'AAA','ABA'], 0));
		this.tiles.push(new TileObj("/assets/tiles/basicTee/tile0.png", ["AAA", "AAA",'AAA','AAA'], 0));
		this.rotateTile(this.tiles[0]);
		for(var r= 0; r < this.cells.length; r++){
			for(var c=0; c<this.cells[r].length; c++){
				this.cells[r][c]=new CellObj(this.tiles.length,this.tiles);
			}
		}
	}

	/**
	 * Shifts every element of the array arr 1 position to the left without
	 * modifying the original array.
	 * @param arr the array to rotate
	 * @returns arr with each element shifted 1 position to the left
	 */
	// TODO: needs refactoring to fit with clean code standards
	shiftArrayLeft(arr:string[]):string[]{
		var outputArr = []
		outputArr.push(arr[3])
		outputArr.push(arr[0])
		outputArr.push(arr[1])
		outputArr.push(arr[2])
		return outputArr;
	}

	/**
	 * Appends the tile array with each rotation of the tile passed as a parameter.
	 * @param tile the Tile object to be rotated in all other orientations.
	 */

	rotateTile(tile: Tile): void{
		var sides:string[] = tile.getSideKeys();
		var img = tile.image;
		for(var r = 1; r < 4; r++){
			sides = this.shiftArrayLeft(sides);
			this.tiles.push(new TileObj(img,sides, r*90));
		}
	}

	/**
	 * Generates a list of tiles from candidates that are valid with the adjecent cell in the specified direction
	 * @param candidates The array of possible tiles the current cell could collapse to.
	 * @param adjTile The tile of the adjacent collapsed cell in the specified direction
	 * @param direction The direction of the adjacent collapsed cell that the function is comparing against
	 * @returns a Tile[] that contains all the valid tiles in the specified direction that the current cell could collapse to. 
	 */
	
	checkValid(candidates: Tile[], adjTile:Tile, direction:number): Tile[]{
		var otherDir = (direction+2)%4;
		var adjSideKey = adjTile.getSideKey(otherDir);
		adjSideKey = adjSideKey.split("").reverse().join("");
		var output: Tile[] = []
		for(var tile of candidates){
			if(tile.getSideKey(direction) === adjSideKey){
				output.push(tile);
			}
		}
		return output;
	}

	/**
	 * Collapses the cell at the specified location. Selects which tile to display,
	 * marks the cell as collapsed, and renders the picture.
	 * @param r the row of the cell to be collapsed
	 * @param c the collumn of the cell to be collapsed
	 */

	collapse(r: number, c: number): void{
		var cell = this.cells[r][c];
		cell.setCollapsed(true);
		var tiles = cell.getValidTiles();
		var tile = tiles[Math.floor(Math.random()*tiles.length)];
		cell.setTile(tile);
		this.cells[r][c] = cell;
		this.render(r,c,tile.image,tile.getRotation());
	}

	/**
	 * Gets the valid tiles of the specified cell in all directions, 
	 * updates the valid tiles and entropy values of the specified cell.
	 * @param r the row of the cell to be updated
	 * @param c the collumn of the cell to be updated
	 */

	updateCell(r:number, c: number): void{
		var currentCell = this.cells[r][c];
		var otherCell; 
		if(r-1 >= 0){
			otherCell = this.cells[r-1][c];
			if(otherCell.isCollapsed()){
				var valid = this.checkValid(currentCell.getValidTiles(), otherCell.getTile(), direction.NORTH);
				currentCell.setValidTiles(valid);
			}
		}
		if(c+1 < this.cells[r].length){
			otherCell = this.cells[r][c+1];
			if(otherCell.isCollapsed()){
				var valid = this.checkValid(currentCell.getValidTiles(), otherCell.getTile(), direction.EAST);
				currentCell.setValidTiles(valid);
			}
		}
		if(r+1 < this.cells.length){
			otherCell = this.cells[r+1][c];
			if(otherCell.isCollapsed()){
				var valid = this.checkValid(currentCell.getValidTiles(), otherCell.getTile(), direction.SOUTH);
				currentCell.setValidTiles(valid);
			}
		}	
		if(c-1 >= 0){
			otherCell = this.cells[r][c-1];
			if(otherCell.isCollapsed()){
				var valid = this.checkValid(currentCell.getValidTiles(), otherCell.getTile(), direction.WEST);
				currentCell.setValidTiles(valid);
			}
		}
		currentCell.setEntropy(currentCell.getValidTiles().length);
		this.cells[r][c] = currentCell;
	}

	/**
	 * Resets all cells valid tiles and entropy values to the defaults 
	 * and renders a default black img to the page
	 */

	reset():void{
		for(var r= 0; r < this.cells.length; r++){
			for(var c=0; c<this.cells[r].length; c++){
				this.cells[r][c].setCollapsed(false);
				this.cells[r][c].setValidTiles(this.tiles);
				this.render(r,c,"../../assets/tiles/basicTee/blank.png",0); //This is obsolete at this point, remove at the optimization pass
			}
		}
	}

	/**
	 * Resets all the cells and runs the generate function, called by the "Generate!" button onClick event.
	 */

	run():void{
		this.reset();
		this.generate(0,0)
		while(this.failed){
			this.reset();
			this.generate(0,0)
		}
	}

	/**
	 * Recursively generates the board, the heart of the WFC algorithm
	 * @param r the row of the cell to collapse and evaluate surrounding entropy
	 * @param c the collumn of the cell to collapse and evaluate surrounding entropy
	 */

	generate(r:number, c:number): void{
		var lowestEntropy = 5;
		var lowestEntropyCoords = [0,0]
		if(this.cells[r][c].getEntropy() == 0){
			this.failed = true;
			return;
		}
		this.collapse(r,c);
		var availableCells: boolean[] = [true, true, true, true]
		if(r==0 || this.cells[r-1][c].isCollapsed()){
			availableCells[direction.NORTH] = false;
		}else{
			this.updateCell(r-1, c);
            if(this.cells[r-1][c].getEntropy() <= lowestEntropy){
                lowestEntropy = this.cells[r-1][c].getEntropy();
                lowestEntropyCoords = [r-1, c] 
            }
		}
		if(c==0 || this.cells[r][c-1].isCollapsed()){
			availableCells[direction.WEST] = false;			
		}else{
			this.updateCell(r, c-1);
			if(this.cells[r][c-1].getEntropy() <= lowestEntropy){
			lowestEntropy = this.cells[r][c-1].getEntropy();
			lowestEntropyCoords = [r, c-1]
			}
		}
		if(r==this.cells.length-1 || this.cells[r+1][c].isCollapsed()){
			availableCells[direction.SOUTH] = false;	 
		}else{
			this.updateCell(r+1, c);
			if(this.cells[r+1][c].getEntropy() <= lowestEntropy){
			lowestEntropy = this.cells[r+1][c].getEntropy();
			lowestEntropyCoords = [r+1, c] 
			}
		}
		if(c==this.cells[r].length-1 || this.cells[r][c+1].isCollapsed()){
			availableCells[direction.EAST] = false;
		}else{
			this.updateCell(r, c+1);
			if(this.cells[r][c+1].getEntropy() <= lowestEntropy){
			lowestEntropy = this.cells[r][c+1].getEntropy();
			lowestEntropyCoords = [r, c+1] 
			}
		}
		if(!(availableCells.includes(true))){
			this.failed = false;
			for(var r = 0; r < this.cells.length; r++){
				for(var c = 0; c< this.cells[r].length; c++){
					if(!(this.cells[r][c].isCollapsed())){
						this.updateCell(r,c);
						if(this.cells[r][c].getEntropy()!=0){
							this.generate(r,c);
						}else{
							this.failed = true;
							return;
						}
					}
				}
			}
			return;
		}	
		
		this.generate(lowestEntropyCoords[0], lowestEntropyCoords[1])
	}

	/**
	 * Renders the desired tile img to the screen and rotates it to the desired angle.
	 * @param r the row of the img element to render to
	 * @param c the collumn of the img element to render to
	 * @param tile the path to the image to be rendered
	 * @param rotation the desired rotation of the img element (degrees)
	 */

	render(r:number, c:number, tile:string, rotation:number): void{
		let imgId = "img"+r+" "+c;
		let img = document.getElementById(imgId) as HTMLImageElement;
		img.src = tile;
		img.style.transform = `rotate(${rotation}deg)`
	}

}


