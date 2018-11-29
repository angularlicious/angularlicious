import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlingConfig } from 'libs/configuration/src/lib/configs/error-handling-config';

@NgModule({
  imports: [CommonModule]
})
export class ErrorHandlericiousModule {
  static forRoot(config: ErrorHandlingConfig): ModuleWithProviders {
    return {
      ngModule: ErrorHandlericiousModule,
      providers: [
        {
          provide: ErrorHandlingConfig,
          useValue: config
        }
      ]
    };
  }
}
