import {createReducer, on} from '@ngrx/store';
import {newSensorState} from './sensor-state.actions';
import {SensorState} from '../interfaces/sensor-state.interface';
import {TypedAction} from '@ngrx/store/src/models';

const initialSensorState: SensorState = {} as any;

export const setNewSensorState$ = createReducer(initialSensorState,
  on(newSensorState, (state: SensorState, params: SensorState & TypedAction<any>) => ({...state, ...{[params.sensor]: params}})));
