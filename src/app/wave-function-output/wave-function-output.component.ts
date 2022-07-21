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
	dim = 15;
	cells: Cell[][] = Array.from(Array(this.dim), () => new Array(this.dim))
	tiles: Tile[] = [];
	failed:boolean = false;

	constructor() { }

	ngOnInit(): void {
		this.tiles.push(new TileObj("/assets/tiles/basicTee/tile1.png", ["ABA", "ABA",'AAA','ABA'], 0));
		this.tiles.push(new TileObj("/assets/tiles/basicTee/tile0.png", ["AAA", "AAA",'AAA','AAA'], 0));
		this.rotateTile(this.tiles[0]);
		for(var i= 0; i < this.cells.length; i++){
			for(var j=0; j<this.cells[i].length; j++){
				this.cells[i][j]=new CellObj(this.tiles.length,this.tiles);
			}
		}
	}

	rotateArray(arr:string[]):string[]{
		var outputArr = []
		outputArr.push(arr[3])
		outputArr.push(arr[0])
		outputArr.push(arr[1])
		outputArr.push(arr[2])
		return outputArr;
	}

	rotateTile(tile: Tile): void{
		var sides:string[] = tile.getSideKeys();
		var img = tile.image;
		for(var i = 1; i < 4; i++){
			sides = this.rotateArray(sides);
			this.tiles.push(new TileObj(img,sides, i*90));
		}
	}
	
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

	collapse(i: number, j: number): void{
		var cell = this.cells[i][j];
		cell.setCollapsed(true);
		var tiles = cell.getValidTiles();
		var tile = tiles[Math.floor(Math.random()*tiles.length)];
		cell.setTile(tile);
		this.cells[i][j] = cell;
		console.log(cell)
		this.render(i,j,tile.image,tile.getRotation());
	}

	updateCell(x: number, y:number): void{
		var currentCell = this.cells[y][x];
		var otherCell; 
		if(y-1 >= 0){
			otherCell = this.cells[y-1][x];
			if(otherCell.isCollapsed()){
				var valid = this.checkValid(currentCell.getValidTiles(), otherCell.getTile(), direction.NORTH);
				currentCell.setValidTiles(valid);
			}
		}
		if(x+1 < this.cells[y].length){
			otherCell = this.cells[y][x+1];
			if(otherCell.isCollapsed()){
				var valid = this.checkValid(currentCell.getValidTiles(), otherCell.getTile(), direction.EAST);
				currentCell.setValidTiles(valid);
			}
		}
		if(y+1 < this.cells.length){
			otherCell = this.cells[y+1][x];
			if(otherCell.isCollapsed()){
				var valid = this.checkValid(currentCell.getValidTiles(), otherCell.getTile(), direction.SOUTH);
				currentCell.setValidTiles(valid);
			}
		}	
		if(x-1 >= 0){
			otherCell = this.cells[y][x-1];
			if(otherCell.isCollapsed()){
				var valid = this.checkValid(currentCell.getValidTiles(), otherCell.getTile(), direction.WEST);
				currentCell.setValidTiles(valid);
			}
		}
		currentCell.setEntropy(currentCell.getValidTiles().length);
		this.cells[y][x] = currentCell;
	}

	reset():void{
		for(var i= 0; i < this.cells.length; i++){
			for(var j=0; j<this.cells[i].length; j++){
				this.cells[i][j].setCollapsed(false);
				this.cells[i][j].setValidTiles(this.tiles);
				this.render(i,j,"../../assets/tiles/basicTee/blank.png",0);
			}
		}
	}

	run():void{
		this.reset();
		this.generate(0,0)
		while(this.failed){
			this.reset();
			this.generate(0,0)
		}
	}

	generate(i:number, j:number): void{
		var lowestEntropy = 5;
		var lowestEntropyCoords = [0,0]
		if(this.cells[i][j].getEntropy() == 0){
			this.failed = true;
			return;
		}
		this.collapse(i,j);
		var availableCells: boolean[] = [true, true, true, true]
		if(i==0 || this.cells[i-1][j].isCollapsed()){
			availableCells[direction.NORTH] = false;
		}else{
			this.updateCell(j, i-1);
            if(this.cells[i-1][j].getEntropy() <= lowestEntropy){
                lowestEntropy = this.cells[i-1][j].getEntropy();
                lowestEntropyCoords = [i-1, j] 
            }
		}
		if(j==0 || this.cells[i][j-1].isCollapsed()){
			availableCells[direction.WEST] = false;			
		}else{
			this.updateCell(j-1, i);
			if(this.cells[i][j-1].getEntropy() <= lowestEntropy){
			lowestEntropy = this.cells[i][j-1].getEntropy();
			lowestEntropyCoords = [i, j-1]
			}
		}
		if(i==this.cells.length-1 || this.cells[i+1][j].isCollapsed()){
			availableCells[direction.SOUTH] = false;	 
		}else{
			this.updateCell(j, i+1);
			if(this.cells[i+1][j].getEntropy() <= lowestEntropy){
			lowestEntropy = this.cells[i+1][j].getEntropy();
			lowestEntropyCoords = [i+1, j] 
			}
		}
		if(j==this.cells[i].length-1 || this.cells[i][j+1].isCollapsed()){
			availableCells[direction.EAST] = false;
		}else{
			this.updateCell(j+1, i);
			if(this.cells[i][j+1].getEntropy() <= lowestEntropy){
			lowestEntropy = this.cells[i][j+1].getEntropy();
			lowestEntropyCoords = [i, j+1] 
			}
		}
		if(!(availableCells.includes(true))){
			this.failed = false;
			return;
		}	
		
		this.generate(lowestEntropyCoords[0], lowestEntropyCoords[1])
	}

	render(i:number, j:number, tile:string, rotation:number): void{
		let imgId = "img"+i+" "+j;
		let img = document.getElementById(imgId) as HTMLImageElement;
		img.src = tile;
		img.style.transform = `rotate(${rotation}deg)`
	}

}


