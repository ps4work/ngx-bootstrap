export interface Timespan {
  day?: string | number;
  hour?: string | number;
  minute?: string | number;
  seconds?: string | number;
  isPM?: boolean;
}

export interface TimespanpickerControls {
  canIncrementDays: boolean;
  canIncrementHours: boolean;
  canIncrementMinutes: boolean;
  canIncrementSeconds: boolean;

  canDecrementDays: boolean;
  canDecrementHours: boolean;
  canDecrementMinutes: boolean;
  canDecrementSeconds: boolean;
}

export interface TimespanpickerComponentState {
  min: Date;
  max: Date;

  dayStep: number;
  hourStep: number;
  minuteStep: number;
  secondsStep: number;

  readonlyInput: boolean;

  mousewheel: boolean;
  arrowkeys: boolean;

  showSpinners: boolean;
  showMeridian: boolean;
  showSeconds: boolean;

  meridians: string[];
}

export type TimeChangeSource = 'wheel' | 'key' | '';

export interface TimespanChangeEvent {
  step: number;
  source: TimeChangeSource;
}
