import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularliciousFoundationModule } from '@angularlicious/foundation';
import { AngularliciousCoreModule } from '@angularlicious/core';
import { HttpClientModule } from '@angular/common/http';

/**
 *  Use module to reference the common components, directives, and pipes. Use and reference
 * this module to share common references.
 */
@NgModule({
  imports: [
    AngularliciousCoreModule,
    AngularliciousFoundationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [],
  exports: [
    AngularliciousCoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
