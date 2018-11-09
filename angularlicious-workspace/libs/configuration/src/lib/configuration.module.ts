import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationContext } from './configuration-context';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
  ]
})
export class ConfigurationModule {
  static forRoot(config: ConfigurationContext): ModuleWithProviders {
    return {
      ngModule: ConfigurationModule,
      providers: [
        {
          provide: ConfigurationContext,
          useValue: config
        },
        HttpClientModule
      ]
    };
  }
}
