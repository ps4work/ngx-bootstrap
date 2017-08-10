import { Component } from '@angular/core';

@Component({
  selector: 'demo-timespanpicker-min-max',
  templateUrl: './min-max.html'
})
export class DemoTimespanpickerMinMaxComponent {
  public myTime: Date = new Date();
  public minTime: Date = new Date();
  public maxTime: Date = new Date();

  constructor() {
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(17);
    this.maxTime.setMinutes(0);
  }
}
