import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimespanpickerComponent } from './timespanpicker.component';
import { TimespanpickerActions } from './reducer/timespanpicker.actions';
import { TimespanpickerConfig } from './timespanpicker.config';
import { TimespanpickerStore } from './reducer/timespanpicker.store';

@NgModule({
  imports: [CommonModule],
  declarations: [TimespanpickerComponent],
  exports: [TimespanpickerComponent]
})
export class TimespanpickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimespanpickerModule,
      providers: [TimespanpickerConfig, TimespanpickerActions, TimespanpickerStore]
    };
  }
}
