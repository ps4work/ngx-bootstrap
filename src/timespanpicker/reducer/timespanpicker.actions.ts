import { Injectable } from '@angular/core';
import { Action } from '../../mini-ngrx/index';
import { TimespanChangeEvent, TimespanpickerComponentState, Timespan } from '../timespanpicker.models';

@Injectable()
export class TimespanpickerActions {
  static readonly WRITE_VALUE = '[timespanpicker] write value from ng model';
  static readonly CHANGE_DAYS = '[timespanpicker] change days';
  static readonly CHANGE_HOURS = '[timespanpicker] change hours';
  static readonly CHANGE_MINUTES = '[timespanpicker] change minutes';
  static readonly CHANGE_SECONDS = '[timespanpicker] change seconds';
  static readonly SET_TIME_UNIT = '[timespanpicker] set time unit';
  static readonly UPDATE_CONTROLS = '[timespanpicker] update controls';

  writeValue(value: Date | string) {
    return {
      type: TimespanpickerActions.WRITE_VALUE,
      payload: value
    };
  }

  changeDays(event: TimespanChangeEvent) {
    return {
      type: TimespanpickerActions.CHANGE_DAYS,
      payload: event
    };
  }

  changeHours(event: TimespanChangeEvent) {
    return {
      type: TimespanpickerActions.CHANGE_HOURS,
      payload: event
    };
  }

  changeMinutes(event: TimespanChangeEvent) {
    return {
      type: TimespanpickerActions.CHANGE_MINUTES,
      payload: event
    };
  }

  changeSeconds(event: TimespanChangeEvent): Action {
    return {
      type: TimespanpickerActions.CHANGE_SECONDS,
      payload: event
    };
  }

  setTime(value: Timespan): Action {
    return {
      type: TimespanpickerActions.SET_TIME_UNIT,
      payload: value
    };
  }

  updateControls(value: TimespanpickerComponentState): Action {
    return {
      type: TimespanpickerActions.UPDATE_CONTROLS,
      payload: value
    };
  }
}
