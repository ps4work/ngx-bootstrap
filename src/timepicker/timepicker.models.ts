export interface Time {
  day?: string | number;
  hour?: string | number;
  minute?: string | number;
  seconds?: string | number;
  isPM?: boolean;
}

export interface TimepickerControls {
  canIncrementDays: boolean;
  canIncrementHours: boolean;
  canIncrementMinutes: boolean;
  canIncrementSeconds: boolean;

  canDecrementDays: boolean;
  canDecrementHours: boolean;
  canDecrementMinutes: boolean;
  canDecrementSeconds: boolean;
}

export interface TimepickerComponentState {
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

export interface TimeChangeEvent {
  step: number;
  source: TimeChangeSource;
}
