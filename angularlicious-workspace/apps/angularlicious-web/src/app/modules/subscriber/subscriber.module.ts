import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SiteModule } from '../site/site.module';
import { HttpBaseService } from '@angularlicious/foundation';
import { SubscriberConfirmationComponent } from './subscriber-confirmation/subscriber-confirmation.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';

import {
  AngularliciousSecurityModule,
  AngularliciousSecurityService
} from '@angularlicious/security';

@NgModule({
  imports: [
    AngularliciousSecurityModule,
    CommonModule,
    SharedModule,
    CoreModule,
    SiteModule
  ],
  declarations: [
    SignUpComponent,
    SubscriberConfirmationComponent,
    UnsubscribeComponent,
    SubscriberListComponent
  ],
  exports: [
    SignUpComponent,
    SubscriberConfirmationComponent,
    SubscriberListComponent
  ],
  providers: [AngularliciousSecurityService],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

})
export class SubscriberModule {}
