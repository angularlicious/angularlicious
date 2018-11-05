import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '@angularlicious/configuration';

@NgModule({
  imports: [CommonModule],
  providers: [
    ConfigurationService
  ]
})
export class AngularliciousLoggingModule {
}
