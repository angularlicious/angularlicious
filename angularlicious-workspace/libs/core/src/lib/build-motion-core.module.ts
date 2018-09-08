import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AlertComponent } from './components/alert/alert.component';

/**
 * ERROR in : Property binding ngForOf not used by any directive on an
 * embedded template. Make sure that the property name is spelled correctly
 * and all directives are listed in the "@NgModule.declarations".
 *
 * SOLUTION: ADD THE [CommonModule] to the imports section of the module;
 */
@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AngularliciousCoreModule {}
