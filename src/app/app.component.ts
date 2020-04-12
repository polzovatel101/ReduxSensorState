import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SensorState} from './interfaces/sensor-state.interface';
import {WebSocketService} from './services/websocket/web-socket.service';
import {SensorWsUrl} from './constants/web-socket-urls';
import {newSensorState} from './store/sensor-state.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTemperature: string;
  currentPressure: string;
  currentHumidity: string;
  sensor: string;

  private currentWS: WebSocket;

  constructor(private store: Store<SensorState>,
              private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.store.pipe(select(newSensorState)).subscribe((sensorStateAction: any) => {
      const lastStateKey =  Object.keys(sensorStateAction.sensorState).pop();
      if (sensorStateAction.sensorState[lastStateKey]) {
        this.setNewSensorState(sensorStateAction.sensorState[lastStateKey]);
      }
    });

    this.webSocketService.openNewWebSocket(SensorWsUrl);
    this.currentWS = this.webSocketService.getWebSocket(SensorWsUrl);
    this.currentWS.onmessage = (event: MessageEvent) => this.onNewMessage(event);
  }


  private onNewMessage(newState: MessageEvent) {
    let newData;
    try {
      newData = JSON.parse(newState.data);
    } catch (e) {
      console.error('Problem with response');
    }
    this.store.dispatch(newSensorState(newData));
  }

  private setNewSensorState(sensorState: SensorState) {
    this.sensor = sensorState.sensor;
    this.currentTemperature = sensorState.temperature + 'C';
    this.currentPressure = sensorState.pressure + 'atm';
    this.currentHumidity = sensorState.humidity + '%';
  }
}
