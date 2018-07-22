import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteModule } from '../site/site.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { GuideComponent } from './guide/guide.component';
import {
  AngularliciousSecurityModule,
  AngularliciousSecurityService
} from '@angularlicious/security';
@NgModule({
  imports: [AngularliciousSecurityModule, CommonModule, SharedModule, SiteModule],
  declarations: [GuideComponent],
  exports: [GuideComponent],
  providers: [AngularliciousSecurityService]
})
export class CustomAngularModulesModule {}
