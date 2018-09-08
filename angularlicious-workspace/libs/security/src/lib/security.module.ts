import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AngularliciousLoggingModule,
  AngularliciousLoggingService
} from '@angularlicious/logging';
import { AngularliciousFoundationModule } from '@angularlicious/foundation';
import { AngularliciousCoreModule } from '@angularlicious/core';
import { SecurityBusinessProviderService } from './business/security-business-provider.service';
import { SecurityApiService } from './business/security-api.service';
import { RegisterSubscriberComponent } from './components/register-subscriber/register-subscriber.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpBaseService } from '@angularlicious/foundation';
import { AngularliciousRulesEngineModule } from '@angularlicious/rules-engine';

@NgModule({
  imports: [
    AngularliciousLoggingModule,
    AngularliciousFoundationModule,
    AngularliciousCoreModule,
    AngularliciousRulesEngineModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [RegisterSubscriberComponent],
  exports: [RegisterSubscriberComponent],
  providers: [
    AngularliciousLoggingService,
    SecurityApiService, //PROVIDE INTERNAL SERVICES FOR THE MODULE; SCOPED TO THIS MODULE;
    SecurityBusinessProviderService //PROVIDE INTERNAL SERVICES FOR THE MODULE; SCOPED TO THIS MODULE;
    // HttpBaseService
  ]
})
export class AngularliciousSecurityModule {}
