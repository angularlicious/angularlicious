import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { HttpErrorApiService } from './http-error-api.service';
import { CreateHttpErrorAction } from './create-http-error.action';
import { Observable } from 'rxjs';
import { ApiResponse } from '@angularlicious/http-service';
import { CreateHttpApiErrorAction } from './create-http-api-error.action';

@Injectable({
  providedIn: 'root'
})
export class BusinessProviderService extends ServiceBase {
 
  constructor(
    loggingService: AngularliciousLoggingService,
    public apiService: HttpErrorApiService
  ) {
    super(loggingService);
    this.serviceName = 'BusinessProviderService';
   }

   createHttpError(componentName: string): any {
    const actions = new CreateHttpErrorAction(componentName);
    actions.Do(this);
    return actions.response;
  }

  createHttpApiError(errorName: string): Observable<ApiResponse<boolean>> {
    const actions = new CreateHttpApiErrorAction(errorName);
    actions.Do(this);
    return actions.response;
  }
}
