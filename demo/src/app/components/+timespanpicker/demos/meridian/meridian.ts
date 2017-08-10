import { Component } from '@angular/core';

@Component({
  selector: 'demo-timespanpicker-meridian',
  templateUrl: './meridian.html'
})
export class DemoTimespanpickerMeridianComponent {
  public ismeridian: boolean = true;

  public mytime: Date = new Date();

  public toggleMode(): void {
    this.ismeridian = !this.ismeridian;
  }
}
