import { Timespan } from './../timespanpicker.models';
import { Action } from '../../mini-ngrx/index';
import {
  canChangeHours,
  canChangeMinutes,
  canChangeSeconds,
  canChangeValue,
  timespanpickerControls,
  canChangeDays
} from '../timespanpicker-controls.util';
import { TimespanpickerConfig } from '../timespanpicker.config';
import { TimespanpickerComponentState, TimespanpickerControls } from '../timespanpicker.models';
import { changeTime, toNumber } from '../timespanpicker.utils';
import { TimespanpickerActions } from './timespanpicker.actions';

export class TimespanpickerState {
  value: Timespan;
  config: TimespanpickerComponentState;
  controls: TimespanpickerControls;
}

export const initialState = {
  value: {
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0'
  },
  config: new TimespanpickerConfig(),
  controls: {
    canIncrementDays: true,
    canIncrementHours: true,
    canIncrementMinutes: true,
    canIncrementSeconds: true,

    canDecrementDays: true,
    canDecrementHours: true,
    canDecrementMinutes: true,
    canDecrementSeconds: true
  }
} as TimespanpickerState;

export function timespanpickerReducer(state = initialState, action: Action) {
  console.log('timespanpickerReducer');
  console.log(action);
  switch (action.type) {
    // case (TimespanpickerActions.WRITE_VALUE): {
    //   return Object.assign({}, state, { value: action.payload });
    // }

    case (TimespanpickerActions.CHANGE_DAYS): {
      console.log('TimespanpickerActions.CHANGE_DAYS');
      console.log(state);
      console.log(action);
      if (!canChangeValue(state.config, action.payload) ||
        !canChangeDays(action.payload, state.controls)) {
        return state;
      }

      console.log('TimespanpickerActions.CHANGE_DAYS start');
      // console.log(toNumber(state.value.day) + toNumber(action.payload.step));
      // return Object.assign({}, state, { day: toNumber(state.day) + toNumber(action.payload.step) });
      const _newTime = changeTime(state.value, { days: action.payload.step });

      return Object.assign({}, state, { value: _newTime });
      
    }

    case (TimespanpickerActions.CHANGE_HOURS): {
      if (!canChangeValue(state.config, action.payload) ||
        !canChangeHours(action.payload, state.controls)) {
        return state;
      }

      const _newTime = changeTime(state.value, { hours: action.payload.step });

      return Object.assign({}, state, { value: _newTime });
    }

    case (TimespanpickerActions.CHANGE_MINUTES): {
      if (!canChangeValue(state.config, action.payload) ||
        !canChangeMinutes(action.payload, state.controls)) {
        return state;
      }

      const _newTime = changeTime(state.value, { minutes: action.payload.step });

      return Object.assign({}, state, { value: _newTime });
    }

    case (TimespanpickerActions.CHANGE_SECONDS): {
      if (!canChangeValue(state.config, action.payload) ||
        !canChangeSeconds(action.payload, state.controls)) {
        return state;
      }

      const _newTime = changeTime(state.value, { seconds: action.payload.step });

      return Object.assign({}, state, { value: _newTime });
    }

    case (TimespanpickerActions.SET_TIME_UNIT): {
      if (!canChangeValue(state.config)) {
        return state;
      }

      return Object.assign({}, state, {value: action.payload});
    }

    case (TimespanpickerActions.UPDATE_CONTROLS): {
      console.log('TimespanpickerActions.UPDATE_CONTROLS');
      console.log(state);
      const _newControlsState = timespanpickerControls(state.value, action.payload);

      return Object.assign({}, state, {
        config: action.payload,
        controls: _newControlsState
      });
    }

    default:
      return state;
  }
}
