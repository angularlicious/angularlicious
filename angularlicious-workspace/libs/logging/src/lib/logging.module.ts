import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLogglyModule} from 'ngx-loggly-logger'
import { AngularliciousRulesEngineModule } from '@angularlicious/rules-engine';

@NgModule({
  imports: [CommonModule,
    AngularliciousRulesEngineModule,
    NgxLogglyModule.forRoot()],
  providers: []
})
export class AngularliciousLoggingModule {
}
