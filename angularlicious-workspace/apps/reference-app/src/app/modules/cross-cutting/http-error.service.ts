import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { BusinessProviderService } from './business/business-provider.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '@angularlicious/http-service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService extends ServiceBase {

  constructor(
    loggingService: AngularliciousLoggingService,
    private businessProvider: BusinessProviderService
  ) {
    super(loggingService)
    this.serviceName = '';
    this.businessProvider.serviceContext = this.serviceContext;
    this.businessProvider.loggingService = this.loggingService;
    this.loggingService.log('', Severity.Information, `The HttpErrorService is initialized.`, ['HttpErrorService', 'cross-cutting-concerns'])
  }

  createHttpError(componentName: string): Observable<ApiResponse<string>> {
    return this.businessProvider.createHttpError(componentName);
  }

  createHttpApiError(errorName: string): Observable<ApiResponse<boolean>> {
    return this.businessProvider.createHttpApiError(errorName);
  }
}
