import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpBaseService, ServiceResponse } from '@angularlicious/foundation';
import {
  AngularliciousLoggingService,
  Severity
} from '@angularlicious/logging';
import { Subscriber } from '../models/subscriber.model';
import { HttpRequestMethod } from '@angularlicious/foundation';

@Injectable()
export class SecurityApiService extends HttpBaseService {
  constructor(
    http: HttpClient,
    public httpService: HttpBaseService,
    loggingService: AngularliciousLoggingService
  ) {
    super(http, loggingService);
  }

  registerSubscriber(subscriber: Subscriber): Observable<ServiceResponse> {
    const requestUrl = 'api/subscriber/register';
    const message = `${this.serviceName} preparing to call: ${requestUrl}`;
    this.loggingService.log(this.serviceName, Severity.Information, message);

    const body = JSON.stringify(subscriber);
    const options = this.httpService.createRequestOptions(
      HttpRequestMethod.post,
      this.httpService.createHeader(false),
      requestUrl,
      body
    );
    return this.httpService.post(options);

    /**TEMPORARY IMPLEMENTATION */
    // const response = new ServiceResponse();
    // response.IsSuccess = true;
    // response.Message = `Fake message from ${this.serviceName}`;
    // response.Data = true;
    // const subject: BehaviorSubject<any> = new BehaviorSubject(response);
    // return subject.asObservable();
    /**TEMPORARY IMPLEMENTATION */
  }
}
