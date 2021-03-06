import { Action } from '../../mini-ngrx/index';
import {
  canChangeHours,
  canChangeMinutes,
  canChangeSeconds,
  canChangeValue,
  timepickerControls,
  canChangeDays
} from '../timepicker-controls.util';
import { TimepickerConfig } from '../timepicker.config';
import { TimepickerComponentState, TimepickerControls } from '../timepicker.models';
import { changeTime, setTime, toNumber } from '../timepicker.utils';
import { TimepickerActions } from './timepicker.actions';

export class TimepickerState {
  value: Date;
  day: string;
  config: TimepickerComponentState;
  controls: TimepickerControls;
}

export const initialState = {
  day: '0',
  config: new TimepickerConfig(),
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
} as TimepickerState;

export function timepickerReducer(state = initialState, action: Action) {
  console.log('timepickerReducer');
  console.log(action);
  switch (action.type) {
    case (TimepickerActions.WRITE_VALUE): {
      return Object.assign({}, state, { value: action.payload });
    }

    case (TimepickerActions.CHANGE_DAYS): {
      console.log('TimepickerActions.CHANGE_DAYS');
      console.log(state);
      console.log(action);
      if (!canChangeValue(state.config, action.payload) ||
        !canChangeDays(action.payload, state.controls)) {
        return state;
      }

      console.log('TimepickerActions.CHANGE_DAYS start');
      console.log(toNumber(state.day) + toNumber(action.payload.step));
      return Object.assign({}, state, { day: toNumber(state.day) + toNumber(action.payload.step) });
    }

    case (TimepickerActions.CHANGE_HOURS): {
      if (!canChangeValue(state.config, action.payload) ||
        !canChangeHours(action.payload, state.controls)) {
        return state;
      }

      const _newTime = changeTime(state.value, { hour: action.payload.step });

      return Object.assign({}, state, { value: _newTime });
    }

    case (TimepickerActions.CHANGE_MINUTES): {
      if (!canChangeValue(state.config, action.payload) ||
        !canChangeMinutes(action.payload, state.controls)) {
        return state;
      }

      const _newTime = changeTime(state.value, { minute: action.payload.step });

      return Object.assign({}, state, { value: _newTime });
    }

    case (TimepickerActions.CHANGE_SECONDS): {
      if (!canChangeValue(state.config, action.payload) ||
        !canChangeSeconds(action.payload, state.controls)) {
        return state;
      }

      const _newTime = changeTime(state.value, { seconds: action.payload.step });

      return Object.assign({}, state, { value: _newTime });
    }

    case (TimepickerActions.SET_TIME_UNIT): {
      if (!canChangeValue(state.config)) {
        return state;
      }

      const _newTime = setTime(state.value, action.payload);

      return Object.assign({}, state, { value: _newTime, day: action.payload.day });
    }

    case (TimepickerActions.UPDATE_CONTROLS): {
      console.log('TimepickerActions.UPDATE_CONTROLS');
      console.log(state);
      const _newControlsState = timepickerControls(state.value, action.payload);

      return Object.assign({}, state, {
        config: action.payload,
        controls: _newControlsState
      });
    }

    default:
      return state;
  }
}
