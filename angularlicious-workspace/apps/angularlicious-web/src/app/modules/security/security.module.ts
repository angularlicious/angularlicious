import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { SecurityService } from './security.service';
import { SecurityHttpService } from './business/security-http.service';

/**
 * The [SecurityModule] is a [feature service] module that does not contain any declarable items (i.e., components, directives, or pipes).
 * It is used to provide security domain features for the application. Other domain feature modules will use this module to implement
 * the functionality for security features (i.e., account creation, user login, etc.).
 *
 * Use the @NgModule attribute to configure the applications:
 * - declarations: None for [service feature module].
 * - imports: use to reference required modules for the feature.
 * - exports: items that are made public outside of the module
 *    - (i.e., only components, directives, or pipes). NEVER EXPORT SERVICES...USE providers array
 * - providers: services that are made public outside of the module.
 * - bootstrap (use for root module only): N/A
 */
@NgModule({
  declarations: [
    /* Service feature module has no declarations */
  ],
  imports: [SharedModule],
  exports: [
    // SecurityService, // NEVER EXPORT [SERVICES] - THEY ARE PROVIDED, NOT EXPORTED
  ],
  providers: [SecurityService, SecurityHttpService]
})
export class SecurityModule {}
