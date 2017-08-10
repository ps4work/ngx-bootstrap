import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimespanpickerModule } from 'ngx-bootstrap/timespanpicker';

import { SharedModule } from '../../shared';
import { TimespanpickerSectionComponent } from './timespanpicker-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-timespanpicker.routes';

@NgModule({
  declarations: [
    TimespanpickerSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TimespanpickerModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [TimespanpickerSectionComponent]
})
export class DemoTimespanpickerModule {
}
