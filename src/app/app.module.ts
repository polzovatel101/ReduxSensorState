import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {setNewSensorState$} from './store/sensor-state.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ sensorState: setNewSensorState$ }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
