import { Timespan } from './timespanpicker.models';

const dex = 10;
const hoursPerDay = 24;
const hoursPerDayHalf = 12;
const minutesPerHour = 60;
const secondsPerMinute = 60;

export function isValidDate(value?: string | Date): boolean {
  if (!value) {
    return false;
  }

  if (value instanceof Date && isNaN(value.getHours())) {
    return false;
  }

  if (typeof value === 'string') {
    return isValidDate(new Date(value));
  }

  return true;
}

export function toNumber(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  return parseInt(value, dex);
}

export function isNumber(value: string): boolean {
  return !isNaN(toNumber(value));
}

export function parseDays(value: string | number): number {
  const day = toNumber(value);
  if (isNaN(day) || day < 0) {
    return NaN;
  }

  return day;
}

export function parseHours(value: string | number, isPM: boolean = false): number {
  const hour = toNumber(value);
  if (isNaN(hour) || hour < 0 || hour > (isPM ? hoursPerDayHalf : hoursPerDay)) {
    return NaN;
  }

  return hour;
}

export function parseMinutes(value: string | number): number {
  const minute = toNumber(value);
  if (isNaN(minute) || minute < 0 || minute > minutesPerHour) {
    return NaN;
  }

  return minute;
}

export function parseSeconds(value: string | number): number {
  const seconds = toNumber(value);
  if (isNaN(seconds) || seconds < 0 || seconds > secondsPerMinute) {
    return NaN;
  }

  return seconds;
}

export function parseTime(value: string | Date): Date {
  if (typeof value === 'string') {
    return new Date(value);
  }

  return value;
}

export function changeTime(value: Timespan, diff: Timespan): Timespan {
  if (!value) {
    return changeTime({days: 0, hours: 0, minutes: 0, seconds: 0}, diff);
  }

  let days = toNumber(value.days);
  let hours = toNumber(value.hours);
  let minutes = toNumber(value.minutes);
  let seconds = toNumber(value.seconds);

  if (diff.days) {
    days = (days + toNumber(diff.days));
    if (days < 0) {
      days = 0;
    }
  }

  if (diff.hours) {
    hours = (hours + toNumber(diff.hours));
    if (hours < 0) {
      hours = 0;
    }
  }

  if (diff.minutes) {
    minutes = (minutes + toNumber(diff.minutes));
    if (minutes < 0) {
      minutes = 0;
    }
  }

  if (diff.seconds) {
    seconds = (seconds + toNumber(diff.seconds));
    if (seconds < 0) {
      seconds = 0;
    }
  }

  return {days: days, hours: hours, minutes: minutes, seconds: seconds};
}

export function padNumber(value: number): string {
  const _value = value.toString();
  if (_value.length > 1) { return _value; }

  return `0${_value}`;
}

export function isInputValid(days: string, hours: string, minutes: string, seconds: string = '0', isPM: boolean): boolean {
  if (isNaN(parseDays(days)) || isNaN(parseHours(hours, isPM)) || isNaN(parseMinutes(minutes)) || isNaN(parseSeconds(seconds))) {
    return false;
  }
  return true;
}
