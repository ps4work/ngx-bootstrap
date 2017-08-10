import { Component } from '@angular/core';

@Component({
  selector: 'demo-timespanpicker-disabled',
  templateUrl: './disabled.html'
})
export class DemoTimespanpickerDisabledComponent {
  public ismeridian: boolean = false;
  public isEnabled: boolean = true;
  public mytime: Date = new Date();

}
