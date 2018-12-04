import { ErrorHandler, Injectable, Optional } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingConfig } from 'libs/configuration/src/lib/configs/error-handling-config';
import {
  AngularliciousLoggingService,
  Severity
} from '@angularlicious/logging';

@Injectable()
export class ErrorHandlericious extends ErrorHandler {
  includeDefaultErrorHandling: boolean = false;
  name: string = 'ErrorHandlericious';

  constructor(
    @Optional() public config: ErrorHandlingConfig,
    private loggingService: AngularliciousLoggingService
  ) {
    super();

    if (config) {
      this.includeDefaultErrorHandling = config.includeDefaultErrorHandling;
      this.name = config.name;
    }
  }

  /**
   * Overrides the method implemented in the @angular/core ErrorHandler.
   *
   * @param error
   */
  handleError(error: Error | HttpErrorResponse): any {
    if (this.includeDefaultErrorHandling) {
      // use the [super] call to keep default error handling functionality --> console;
      super.handleError(error);
    }

    // A. HANDLE ERRORS FROM HTTP
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // 1: A client-side or network error occurred. Handle it accordingly.
        this.loggingService.log(
          this.name,
          Severity.Error,
          `Unexpected error. ${{ ...error }}; Details: ${{ ...error.error }}`,
          [`${this.name}`]
        );
      } else {
        // 2: The API returned an unsuccessful response (i.e., 400, 401, 403, etc.).
        this.loggingService.log(
          this.name,
          Severity.Error,
          `API Error. ${{ ...error }}; Details: ${{ ...error.error }}`,
          [`${this.name}`]
        );
      }
    } else {
      // B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT;
      this.loggingService.log(
        this.name,
        Severity.Error,
        `API Error. ${{ ...error }}`,
        [`${this.name}`]
      );
    }
  }
}
