import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceBase, ServiceResponse } from '@angularlicious/foundation';
import {
  AngularliciousLoggingService,
  Severity
} from '@angularlicious/logging';
import { SecurityBusinessProviderService } from './business/security-business-provider.service';
import { Subscriber } from './models/subscriber.model';

// import { Subscriber } from './models/subscriber.model';
// import { SubscriberBusinessProviderService } from './business/subscriber-business-provider.service';
// import { ConfirmationToken } from './models/confirmation-token.model';

@Injectable()
export class AngularliciousSecurityService extends ServiceBase {
  constructor(
    loggingService: AngularliciousLoggingService,
    private businessProvider: SecurityBusinessProviderService
  ) {
    super(loggingService);
    this.serviceName = 'AngularliciousSecurityService';
    this.businessProvider.serviceContext = this.serviceContext;
    this.businessProvider.loggingService = this.loggingService;
  }

  /**
   * Use to register a new subscriber to the application.
   * @param subscriber contains the user name and email address for the subscriber.
   */
  registerSubscriber(subscriber: Subscriber): Observable<ServiceResponse> {
    const message = `Preparing to register subscriber: ${JSON.stringify(
      subscriber
    )}`;
    this.loggingService.log(this.serviceName, Severity.Information, message);
    return this.businessProvider.registerSubscriber(subscriber);
  }

  // /**
  //  * Use to confirm a new subscriber.
  //  * @param confirmationToken contains the user name and a [Hash] value that is used to confirm the user.
  //  */
  // confirmSubscriber(confirmationToken: ConfirmationToken) {
  //   this.loggingService.log(this.serviceName, Severity.Information, `Preparing to confirm subscriber.`);
  //   return this.businessProvider.confirmSubscriber(confirmationToken)
  // }

  verifyService(): boolean {
    if (
      this.loggingService &&
      this.businessProvider &&
      this.businessProvider.securityApiService
    )
      return true;
  }
}
