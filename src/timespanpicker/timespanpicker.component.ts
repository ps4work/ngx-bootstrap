/* tslint:disable:no-forward-ref max-file-line-count */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  forwardRef,
  Input,
  OnChanges, Output,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TimespanpickerActions } from './reducer/timespanpicker.actions';
import { TimespanpickerStore } from './reducer/timespanpicker.store';
import { getControlsValue } from './timespanpicker-controls.util';
import { TimespanpickerConfig } from './timespanpicker.config';
import { TimeChangeSource, TimespanpickerComponentState, TimespanpickerControls } from './timespanpicker.models';
import { isValidDate, padNumber, parseTime, isInputValid } from './timespanpicker.utils';

export const TIMESPANPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => TimespanpickerComponent),
  multi: true
};

@Component({
  selector: 'timespanpicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TIMESPANPICKER_CONTROL_VALUE_ACCESSOR, TimespanpickerStore],
  template: `
    <table>
      <tbody>
      <tr class="text-center" [class.hidden]="!isSpinnersVisible">
        <!-- increment days button-->
        <td>
          <a class="btn btn-link" [class.disabled]="!canIncrementDays"
             (click)="changeDays(dayStep)">
            <span class="glyphicon glyphicon-chevron-up"></span>
          </a>
        </td>
        <!-- divider -->
        <td>&nbsp;&nbsp;&nbsp;</td>
        <!-- increment hours button-->
        <td>
          <a class="btn btn-link" [class.disabled]="!canIncrementHours"
             (click)="changeHours(hourStep)">
            <span class="glyphicon glyphicon-chevron-up"></span>
          </a>
        </td>
        <!-- divider -->
        <td>&nbsp;&nbsp;&nbsp;</td>
        <!-- increment minutes button -->
        <td>
          <a class="btn btn-link" [class.disabled]="!canIncrementMinutes"
             (click)="changeMinutes(minuteStep)">
            <span class="glyphicon glyphicon-chevron-up"></span>
          </a>
        </td>
        <!-- divider -->
        <td *ngIf="showSeconds">&nbsp;</td>
        <!-- increment seconds button -->
        <td *ngIf="showSeconds">
          <a class="btn btn-link" [class.disabled]="!canIncrementSeconds"
             (click)="changeSeconds(secondsStep)">
            <span class="glyphicon glyphicon-chevron-up"></span>
          </a>
        </td>
      </tr>
      <tr>
        <!-- days -->
        <td class="form-group" [class.has-error]="invalidDays">
          <input type="text" style="width:50px;"
                 class="form-control text-center"
                 placeholder="DD"
                 maxlength="2"
                 [readonly]="readonlyInput"
                 [value]="days"
                 (wheel)="prevDef($event);changeDays(dayStep * wheelSign($event), 'wheel')"
                 (keydown.ArrowUp)="changeDays(dayStep, 'key')"
                 (keydown.ArrowDown)="changeDays(-dayStep, 'key')"
                 (change)="updateDays($event.target.value)"></td>
        <!-- divider -->
        <td>&nbsp;:&nbsp;</td>
        <!-- hours -->
        <td class="form-group" [class.has-error]="invalidHours">
          <input type="text" style="width:50px;"
                 class="form-control text-center"
                 placeholder="HH"
                 maxlength="2"
                 [readonly]="readonlyInput"
                 [value]="hours"
                 (wheel)="prevDef($event);changeHours(hourStep * wheelSign($event), 'wheel')"
                 (keydown.ArrowUp)="changeHours(hourStep, 'key')"
                 (keydown.ArrowDown)="changeHours(-hourStep, 'key')"
                 (change)="updateHours($event.target.value)"></td>
        <!-- divider -->
        <td>&nbsp;:&nbsp;</td>
        <!-- minutes -->
        <td class="form-group" [class.has-error]="invalidMinutes">
          <input style="width:50px;" type="text"
                 class="form-control text-center"
                 placeholder="MM"
                 maxlength="2"
                 [readonly]="readonlyInput"
                 [value]="minutes"
                 (wheel)="prevDef($event);changeMinutes(minuteStep * wheelSign($event), 'wheel')"
                 (keydown.ArrowUp)="changeMinutes(minuteStep, 'key')"
                 (keydown.ArrowDown)="changeMinutes(-minuteStep, 'key')"
                 (change)="updateMinutes($event.target.value)">
        </td>
        <!-- divider -->
        <td *ngIf="showSeconds">&nbsp;:&nbsp;</td>
        <!-- seconds -->
        <td class="form-group" *ngIf="showSeconds" [class.has-error]="invalidSeconds">
          <input style="width:50px;" type="text"
                 class="form-control text-center"
                 placeholder="SS"
                 maxlength="2"
                 [readonly]="readonlyInput"
                 [value]="seconds"
                 (wheel)="prevDef($event);changeSeconds(secondsStep * wheelSign($event), 'wheel')"
                 (keydown.ArrowUp)="changeSeconds(secondsStep, 'key')"
                 (keydown.ArrowDown)="changeSeconds(-secondsStep, 'key')"
                 (change)="updateSeconds($event.target.value)">
        </td>
      </tr>
      <tr class="text-center" [class.hidden]="!isSpinnersVisible">
        <!-- decrement days button-->
        <td>
          <a class="btn btn-link" [class.disabled]="!canDecrementDays" (click)="changeDays(-dayStep)">
            <span class="glyphicon glyphicon-chevron-down"></span>
          </a>
        </td>
        <!-- divider -->
        <td>&nbsp;&nbsp;&nbsp;</td>
        <!-- decrement hours button-->
        <td>
          <a class="btn btn-link" [class.disabled]="!canDecrementHours" (click)="changeHours(-hourStep)">
            <span class="glyphicon glyphicon-chevron-down"></span>
          </a>
        </td>
        <!-- divider -->
        <td>&nbsp;&nbsp;&nbsp;</td>
        <!-- decrement minutes button-->
        <td>
          <a class="btn btn-link" [class.disabled]="!canDecrementMinutes" (click)="changeMinutes(-minuteStep)">
            <span class="glyphicon glyphicon-chevron-down"></span>
          </a>
        </td>
        <!-- divider -->
        <td *ngIf="showSeconds">&nbsp;</td>
        <!-- decrement seconds button-->
        <td *ngIf="showSeconds">
          <a class="btn btn-link" [class.disabled]="!canDecrementSeconds" (click)="changeSeconds(-secondsStep)">
            <span class="glyphicon glyphicon-chevron-down"></span>
          </a>
        </td>
      </tr>
      </tbody>
    </table>
  `
})
export class TimespanpickerComponent implements ControlValueAccessor, TimespanpickerComponentState, TimespanpickerControls, OnChanges {
  /** days change step */
  @Input() dayStep: number;
  /** hours change step */
  @Input() hourStep: number;
  /** hours change step */
  @Input() minuteStep: number;
  /** seconds change step */
  @Input() secondsStep: number;
  /** if true hours and minutes fields will be readonly */
  @Input() readonlyInput: boolean;
  /** if true scroll inside hours and minutes inputs will change time */
  @Input() mousewheel: boolean;
  /** if true up/down arrowkeys inside hours and minutes inputs will change time */
  @Input() arrowkeys: boolean;
  /** if true spinner arrows above and below the inputs will be shown */
  @Input() showSpinners: boolean;
  @Input() showMeridian: boolean;
  @Input() showSeconds: boolean;

  /** meridian labels based on locale */
  @Input() meridians: string[];

  /** minimum time user can select */
  @Input() min: Date;
  /** maximum time user can select */
  @Input() max: Date;

  /** emits true if value is a valid date */
  @Output() isValid: EventEmitter<boolean> = new EventEmitter();

  // ui variables
  days: string = '0';
  hours: string;
  minutes: string;
  seconds: string;
  meridian: string;

  get isSpinnersVisible(): boolean {
    return this.showSpinners && !this.readonlyInput;
  }

  // min\max validation for input fields
  invalidDays = false;
  invalidHours = false;
  invalidMinutes = false;
  invalidSeconds = false;

  // time picker controls state
  canIncrementDays: boolean;
  canIncrementHours: boolean;
  canIncrementMinutes: boolean;
  canIncrementSeconds: boolean;

  canDecrementDays: boolean;
  canDecrementHours: boolean;
  canDecrementMinutes: boolean;
  canDecrementSeconds: boolean;

  // control value accessor methods
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  constructor(_config: TimespanpickerConfig,
              private _cd: ChangeDetectorRef,
              private _store: TimespanpickerStore,
              private _timespanpickerActions: TimespanpickerActions) {
    Object.assign(this, _config);
    // todo: add unsubscribe
    _store
      .select((state) => state.value)
      .subscribe((value) => {
        // update UI values if date changed
        this._renderTime(value);
        this.onChange(value);

        this._store.dispatch(this._timespanpickerActions.updateControls(getControlsValue(this)));
      });
    _store
      .select((state) => state.day)
      .subscribe((value) => {
        this._renderDays(value);

        this._store.dispatch(this._timespanpickerActions.updateControls(getControlsValue(this)));
      });

    _store
      .select((state) => state.controls)
      .subscribe((controlsState) => {
        this.isValid.emit(isInputValid(this.days, this.hours, this.minutes, this.seconds, this.isPM()));
        Object.assign(this, controlsState);
        _cd.markForCheck();
      });
  }

  isPM(): boolean {
    return this.showMeridian && this.meridian === this.meridians[1];
  }

  prevDef($event: any) {
    $event.preventDefault();
  }

  wheelSign($event: any): number {
    return Math.sign($event.deltaY as number) * -1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._store.dispatch(this._timespanpickerActions.updateControls(getControlsValue(this)));
  }

  changeDays(step: number, source: TimeChangeSource = ''): void {
    console.log('changeDays');
    this._store.dispatch(this._timespanpickerActions.changeDays({step, source}));
  }

  changeHours(step: number, source: TimeChangeSource = ''): void {
    console.log('changeHours');
    this._store.dispatch(this._timespanpickerActions.changeHours({step, source}));
  }

  changeMinutes(step: number, source: TimeChangeSource = ''): void {
    this._store.dispatch(this._timespanpickerActions.changeMinutes({step, source}));
  }

  changeSeconds(step: number, source: TimeChangeSource = ''): void {
    this._store.dispatch(this._timespanpickerActions.changeSeconds({step, source}));
  }

  updateDays(days: string): void {
    console.log('updateDays');
    this.days = days;
    this._updateTime();
  }

  updateHours(hours: string): void {
    console.log('updateHours');
    this.hours = hours;
    this._updateTime();
  }

  updateMinutes(minutes: string) {
    this.minutes = minutes;
    this._updateTime();
  }

  updateSeconds(seconds: string) {
    this.seconds = seconds;
    this._updateTime();
  }

  _updateTime() {
    if (!isInputValid(this.days, this.hours, this.minutes, this.seconds, this.isPM())) {
      this.onChange(null);
      return;
    }
    this._store.dispatch(this._timespanpickerActions
      .setTime({
        day: this.days,
        hour: this.hours,
        minute: this.minutes,
        seconds: this.seconds
      }));
  }

  /**
   * Write a new value to the element.
   */
  writeValue(obj: any): void {
    if (isValidDate(obj)) {
      this._store.dispatch(this._timespanpickerActions.writeValue(parseTime(obj)));
    }
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.readonlyInput = isDisabled;
  }

  private _renderDays(days: string): void {
    console.log('renderDays');
    this.days = days;
  }
  private _renderTime(value: string | Date): void {
    console.log('renderTime');
    if (!isValidDate(value)) {
      this.days = '';
      this.hours = '';
      this.minutes = '';
      this.seconds = '';
      this.meridian = this.meridians[0];

      return;
    }

    const _value = parseTime(value);
    const _hoursPerDayHalf = 12;
    let _hours = _value.getHours();

    if (this.showMeridian) {
      this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
      _hours = _hours % _hoursPerDayHalf;
      // should be 12 PM, not 00 PM
      if (_hours === 0) {
        _hours = _hoursPerDayHalf;
      }
    }

    this.hours = padNumber(_hours);
    this.minutes = padNumber(_value.getMinutes());
    this.seconds = padNumber(_value.getUTCSeconds());
  }
}
