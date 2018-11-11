import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { ConfigurationService, IConfiguration, ErrorHandlingConfig } from '@angularlicious/configuration';
import { IErrorHandingConfig } from '@angularlicious/configuration';
import { noop } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandliciousService extends ErrorHandler {
  serviceName = 'ErrorHandliciousService';
  errorHandlingConfig: IErrorHandingConfig;
  hasSettings: boolean;

  constructor(
    private config: ConfigurationService,
    private loggingService: AngularliciousLoggingService) {
    super()

    this.init();
  }

  init() {
    // Use to provide default settings for error handling processing.
    this.errorHandlingConfig = new ErrorHandlingConfig('ErrorHandler', true);
    console.warn(`Application [ErrorHandler] is using default settings`);

    // subscribe and use settings from the [ConfigurationService] when available.
    this.config.settings$.subscribe(
      settings => this.handleSettings(settings)
    );
  }

  handleSettings(settings: IConfiguration) {
    this.errorHandlingConfig = settings.errorHandling;
    this.hasSettings = true;
    this.loggingService.log(this.errorHandlingConfig.name, Severity.Information, `Application [ErrorHandler] using configuration settings.`);
  }

  handleError(error: Error | HttpErrorResponse): any {

    if (this.errorHandlingConfig.includeDefaultErrorHandling) {
      // use the [super] call to keep default error handling functionality --> console;
      super.handleError(error);
    }

    if (this.hasSettings) {
      // A. HANDLE ERRORS FROM HTTP
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A.1: A client-side or network error occurred. Handle it accordingly.
          const formattedError = `${error.name}; ${error.message}`;
          this.loggingService.log(this.errorHandlingConfig.name, Severity.Error, `${formattedError}`);
        } else {
          // A.2: The API returned an unsuccessful response (i.e., 400, 401, 403, etc.).
          /**
           * The [HttpService] should return a response that is consumable by the caller
           * of the API. The response should include relevant information and error messages 
           * in a format that is known and consumable by the caller of the API. 
           */
          noop();
        }
      } else {
        // B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT;
        const formattedError = `${error.name}; ${error.message}`;
        this.loggingService.log(this.errorHandlingConfig.name, Severity.Error, `${formattedError}`);
      }
    }
  }
}
}
