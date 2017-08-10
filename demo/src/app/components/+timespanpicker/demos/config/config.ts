import { Component } from '@angular/core';
import { TimespanpickerConfig } from 'ngx-bootstrap/timespanpicker';

// such override allows to keep some initial values

export function getTimespanpickerConfig(): TimespanpickerConfig {
  return Object.assign(new TimespanpickerConfig(), {
    hourStep: 2,
    minuteStep: 10,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true
  });
}

@Component({
  selector: 'demo-timespanpicker-config',
  templateUrl: './config.html',
  providers: [{provide: TimespanpickerConfig, useFactory: getTimespanpickerConfig}]
})
export class DemoTimespanpickerConfigComponent {
  public mytime:string;
}
