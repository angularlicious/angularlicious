import { Inject, Injectable } from '@angular/core';

import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

import { SecurityHttpService } from './security-http.service';
import { BusinessProviderBase } from '@angularlicious/foundation';
import { UserAccount } from './../models/user-account.model';
import { ConfirmationToken } from './../models/confirmation-token.model';
import { Credentials } from './../models/credentials.model';

import { CreateUserAccountAction } from './actions/create-user-account.action';
import { RegisterSubscriberAction } from './actions/register-subscriber.action';
import { ConfirmUserAccountAction } from './actions/confirm-user-account.action';
import { ConfirmSubscriptionAction } from './actions/confirm-subscription.action';
import { ValidateCredentialsAction } from './actions/validate-credentials.action';

import { Subscriber } from '@angularlicious/security';

@Injectable()
export class SecurityBusinessProviderService extends BusinessProviderBase {
  constructor(
    public loggingService: AngularliciousLoggingService,
    @Inject(SecurityHttpService) public securityHttpService: SecurityHttpService
  ) {
    super(loggingService);
    this.serviceName = 'SecurityBusinessProviderService';
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Running the constructor for ${this.serviceName}`
    );
  }

  /**
   * Use to create a new user account.
   * @param userAccount
   */
  createUserAccount(userAccount: UserAccount) {
    const action = new CreateUserAccountAction(userAccount);
    action.Do(this);
    return action.response;
  }

  confirmUserAccount(confirmationToken: ConfirmationToken) {
    const action = new ConfirmUserAccountAction(confirmationToken);
    action.Do(this);
    return action.response;
  }

  confirmSubscription(confirmationToken: ConfirmationToken) {
    const action = new ConfirmSubscriptionAction(confirmationToken);
    action.Do(this);
    return action.response;
  }

  registerSubscriber(subscriber: Subscriber) {
    const action = new RegisterSubscriberAction(subscriber);
    action.Do(this);
    return action.response;
  }

  /**
   * Use to validate the credentials using the application's OAuth provider.
   */
  validateCredentials(credentials: Credentials) {
    const action = new ValidateCredentialsAction(credentials);
    action.Do(this);
    return action.response;
  }
}
