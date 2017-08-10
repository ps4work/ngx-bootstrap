import { changeTime } from './timespanpicker.utils';
import { TimespanChangeEvent, TimespanpickerComponentState, TimespanpickerControls, Timespan } from './timespanpicker.models';

export function canChangeValue(state: TimespanpickerComponentState, event?: TimespanChangeEvent): boolean {
  if (state.readonlyInput) {
    return false;
  }

  if (event) {
    if (event.source === 'wheel' && !state.mousewheel) {
      return false;
    }

    if (event.source === 'key' && !state.arrowkeys) {
      return false;
    }
  }

  return true;
}

export function canChangeDays(event: TimespanChangeEvent, controls: TimespanpickerControls): boolean {
  if (!event.step) {
    return false;
  }

  if (event.step > 0 && !controls.canIncrementDays) {
    return false;
  }

  if (event.step < 0 && !controls.canDecrementDays) {
    return false;
  }

  return true;
}

export function canChangeHours(event: TimespanChangeEvent, controls: TimespanpickerControls): boolean {
  if (!event.step) {
    return false;
  }

  if (event.step > 0 && !controls.canIncrementHours) {
    return false;
  }

  if (event.step < 0 && !controls.canDecrementHours) {
    return false;
  }

  return true;
}

export function canChangeMinutes(event: TimespanChangeEvent, controls: TimespanpickerControls): boolean {
  if (!event.step) {
    return false;
  }
  if (event.step > 0 && !controls.canIncrementMinutes) {
    return false;
  }
  if (event.step < 0 && !controls.canDecrementMinutes) {
    return false;
  }

  return true;
}

export function canChangeSeconds(event: TimespanChangeEvent, controls: TimespanpickerControls): boolean {
  if (!event.step) {
    return false;
  }
  if (event.step > 0 && !controls.canIncrementSeconds) {
    return false;
  }
  if (event.step < 0 && !controls.canDecrementSeconds) {
    return false;
  }

  return true;
}

export function getControlsValue(state: TimespanpickerComponentState): TimespanpickerComponentState {
  const {
    dayStep, hourStep, minuteStep, secondsStep,
    readonlyInput, mousewheel, arrowkeys,
    showSpinners, showMeridian, showSeconds,
    meridians, min, max
  } = state;
  return {
    dayStep, hourStep, minuteStep, secondsStep,
    readonlyInput, mousewheel, arrowkeys,
    showSpinners, showMeridian, showSeconds,
    meridians, min, max
  };
}

export function timespanpickerControls(value: Timespan, state: TimespanpickerComponentState): TimespanpickerControls {
  const {min, max, hourStep, minuteStep, secondsStep, showSeconds} = state;
  const res = {
    canIncrementDays: true,
    canIncrementHours: true,
    canIncrementMinutes: true,
    canIncrementSeconds: true,

    canDecrementDays: true,
    canDecrementHours: true,
    canDecrementMinutes: true,
    canDecrementSeconds: true
  } as TimespanpickerControls;

  if (!value) {
    return res;
  }

// compare dates
  if (max) {
    const _newHour = changeTime(value, { hours:  hourStep });
    res.canIncrementHours = max > _newHour;

    if (!res.canIncrementHours) {
      const _newMinutes = changeTime(value, { minutes: minuteStep });
      res.canIncrementMinutes =  showSeconds ? max > _newMinutes : max >= _newMinutes ;
    }

    if (!res.canIncrementMinutes) {
      const _newSeconds = changeTime(value, { seconds: secondsStep });
      res.canIncrementSeconds = max >= _newSeconds;
    }
  }

  if (min) {
    const _newHour = changeTime(value, { hours:  -hourStep });
    res.canDecrementHours = min < _newHour;

    if (!res.canDecrementHours) {
      const _newMinutes = changeTime(value, { minutes: -minuteStep });
      res.canDecrementMinutes = showSeconds ? min < _newMinutes : min <= _newMinutes;
    }

    if (!res.canDecrementMinutes) {
      const _newSeconds = changeTime(value, { seconds: -secondsStep });
      res.canDecrementSeconds = min <= _newSeconds;
    }
  }

  return res;
}
