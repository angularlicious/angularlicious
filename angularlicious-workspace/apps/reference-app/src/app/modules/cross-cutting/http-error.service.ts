import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService extends ServiceBase {
 

  constructor(
    loggingService: AngularliciousLoggingService
  ) {
    super(loggingService)
    this.loggingService.log('', Severity.Information, `The HttpErrorService is initialized.`, ['HttpErrorService', 'cross-cutting-concerns'])
   }

   createHttpError(componentName: string): any {
  }
}
