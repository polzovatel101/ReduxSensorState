import {createAction, props} from '@ngrx/store';
import {SensorState} from '../interfaces/sensor-state.interface';

export const newSensorActionType = '[Sensor State] new sensor state';

export const newSensorState = createAction(newSensorActionType, props<SensorState>());
