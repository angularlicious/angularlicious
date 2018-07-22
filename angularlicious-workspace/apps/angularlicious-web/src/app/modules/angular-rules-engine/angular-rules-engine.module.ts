import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteModule } from '../site/site.module';
import { SharedModule } from '../shared/shared.module';

import { AngularRulesEngineComponent } from './index/index.component';

@NgModule({
  imports: [CommonModule, SharedModule, SiteModule],
  declarations: [AngularRulesEngineComponent],
  exports: [AngularRulesEngineComponent]
})
export class AngularRulesEngineModule {}
