import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularliciousLoggingModule } from '@angularlicious/logging';
import { AngularliciousRulesEngineModule } from '@angularlicious/rules-engine';

@NgModule({
  imports: [AngularliciousLoggingModule, CommonModule, AngularliciousRulesEngineModule],
})
export class AngularliciousFoundationModule {}
