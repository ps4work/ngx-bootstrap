import { Component } from '@angular/core';

@Component({
  selector: 'demo-timespanpicker-seconds',
  templateUrl: './seconds.html'
})
export class DemoTimespanpickerSecondsComponent {
  public myTime: Date = new Date();
  public showSec: boolean = true;
}
