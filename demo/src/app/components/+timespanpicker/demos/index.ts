import { DemoTimespanpickerBasicComponent } from './basic/basic';
import { DemoTimespanpickerConfigComponent } from './config/config';
import { DemoTimespanpickerMeridianComponent } from './meridian/meridian';
import { DemoTimespanpickerDisabledComponent } from './disabled/disabled';
import { DemoTimespanpickerCustomComponent } from './custom/custom';
import { DemoTimespanpickerDynamicComponent } from './dynamic/dynamic';
import { DemoTimespanpickerMinMaxComponent } from './min-max/min-max';
import { DemoTimespanpickerSecondsComponent } from './seconds/seconds';
import { DemoTimespanpickerMousewheelArrowkeysComponent } from './mousewheel-arrowkeys/mousewheel-arrowkeys';
import { DemoTimespanpickerCustomValidationComponent } from './custom-validation/custom-validation';

export const DEMO_COMPONENTS = [
  DemoTimespanpickerBasicComponent, DemoTimespanpickerConfigComponent, DemoTimespanpickerMeridianComponent,
  DemoTimespanpickerMinMaxComponent, DemoTimespanpickerDisabledComponent, DemoTimespanpickerCustomComponent,
  DemoTimespanpickerDynamicComponent, DemoTimespanpickerSecondsComponent, DemoTimespanpickerMousewheelArrowkeysComponent,
  DemoTimespanpickerCustomValidationComponent
];

export const DEMOS = {
  basic: {
    component: require('!!raw-loader?lang=typescript!./basic/basic'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html')
  },
  meridian: {
    component: require('!!raw-loader?lang=typescript!./meridian/meridian'),
    html: require('!!raw-loader?lang=markup!./meridian/meridian.html')
  },
  minmax: {
    component: require('!!raw-loader?lang=typescript!./min-max/min-max'),
    html: require('!!raw-loader?lang=markup!./min-max/min-max.html')
  },
  disabled: {
    component: require('!!raw-loader?lang=typescript!./disabled/disabled'),
    html: require('!!raw-loader?lang=markup!./disabled/disabled.html')
  },
  custom: {
    component: require('!!raw-loader?lang=typescript!./custom/custom'),
    html: require('!!raw-loader?lang=markup!./custom/custom.html')
  },
  dynamic: {
    component: require('!!raw-loader?lang=typescript!./dynamic/dynamic'),
    html: require('!!raw-loader?lang=markup!./dynamic/dynamic.html')
  },
  config: {
    component: require('!!raw-loader?lang=typescript!./config/config'),
    html: require('!!raw-loader?lang=markup!./config/config.html')
  },
  seconds: {
    component: require('!!raw-loader?lang=typescript!./seconds/seconds'),
    html: require('!!raw-loader?lang=markup!./seconds/seconds.html')
  },
  mousewheel: {
    component: require('!!raw-loader?lang=typescript!./mousewheel-arrowkeys/mousewheel-arrowkeys'),
    html: require('!!raw-loader?lang=markup!./mousewheel-arrowkeys/mousewheel-arrowkeys.html')
  },
  customvalidation: {
    component: require('!!raw-loader?lang=typescript!./custom-validation/custom-validation'),
    html: require('!!raw-loader?lang=markup!./custom-validation/custom-validation.html')
  }
};
