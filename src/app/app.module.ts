import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WaveFunctionOutputComponent } from './wave-function-output/wave-function-output.component';


@NgModule({
  declarations: [
    AppComponent,
    WaveFunctionOutputComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
