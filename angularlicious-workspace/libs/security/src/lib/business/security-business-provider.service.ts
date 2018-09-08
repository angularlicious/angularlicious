import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { ServiceBase, ServiceResponse } from '@angularlicious/foundation';
import {
  LoggingServiceConfig,
  AngularliciousLoggingService
} from '@angularlicious/logging';
import { RegisterSubscriberAction } from './actions/register-subscriber.action';
import { Subscriber } from './../models/subscriber.model';
import { SecurityApiService } from './security-api.service';

@Injectable()
export class SecurityBusinessProviderService extends ServiceBase {
  constructor(
    loggingService: AngularliciousLoggingService,
    public securityApiService: SecurityApiService
  ) {
    super(loggingService);
  }

  /**
   * Use action to register a new subscriber.
   * @param subscriber
   */
  registerSubscriber(subscriber: Subscriber): Observable<ServiceResponse> {
    const action = new RegisterSubscriberAction(subscriber);
    action.Do(this);
    return action.response;
  }
}
