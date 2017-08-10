import { Component } from '@angular/core';

@Component({
  selector: 'demo-timespanpicker-basic',
  templateUrl: './basic.html'
})
export class DemoTimespanpickerBasicComponent {
  public mytime;
  public get showtime() {
    return this.mytime ? JSON.stringify(this.mytime) : 'empty';
  }

}
