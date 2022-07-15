import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wave-function-output',
  templateUrl: './wave-function-output.component.html',
  styleUrls: ['./wave-function-output.component.css']
})
export class WaveFunctionOutputComponent implements OnInit {
  dim = 2;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  collapse(i:number, j:number): void{

  }

}
