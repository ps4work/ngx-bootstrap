import { Injectable } from '@angular/core';
import { timespanpickerReducer, TimespanpickerState, initialState } from './timespanpicker.reducer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Action } from '../../mini-ngrx/index';
import { MiniStore } from '../../mini-ngrx/store.class';
import { MiniState } from '../../mini-ngrx/state.class';

@Injectable()
export class TimespanpickerStore extends MiniStore<TimespanpickerState> {
  constructor() {
    const _dispatcher = new BehaviorSubject<Action>({type: '[mini-ngrx] dispatcher init'});
    const state = new MiniState<TimespanpickerState>(initialState, _dispatcher, timespanpickerReducer);
    super(_dispatcher, timespanpickerReducer, state);
  }
}
