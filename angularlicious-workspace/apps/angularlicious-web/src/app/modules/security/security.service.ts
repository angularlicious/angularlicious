import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { ServiceMessage } from '@angularlicious/rules-engine';
import { SecurityBusinessProviderService } from './business/security-business-provider.service';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { ServiceBase } from '@angularlicious/foundation';
// import { SecurityServiceConfig } from './security-service.config';

import { Credentials } from './models/credentials.model';
import { OAuthResponse } from './models/oauth-response.model';
import { UserAccount } from './models/user-account.model';
import { ConfirmationToken } from './models/confirmation-token.model';

import { Subscriber } from '@angularlicious/security';

/**
 * The [SecurityService] is a domain service that manages a single
 * ServiceContext instance for the specified service call. A component
 * should provide the service using the @Component providers array.
 */
@Injectable()
export class SecurityService extends ServiceBase {
  userName: string;
  oAuthResponse: OAuthResponse;
  serviceInitDateTime: Date = new Date();

  /**
   * Use this service to manage security for the application.
   * @param loggingService The application will inje3ct the global instance of the LoggingService.
   * @param businessProvider The application will inject a (new) instance of the provider to this service.
   */
  constructor(
    loggingService: AngularliciousLoggingService,
    public businessProvider: SecurityBusinessProviderService
  ) {
    super(loggingService);
    this.serviceName = 'SecurityService';
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Running constructor for the SecurityService at ${
        this.serviceInitDateTime
      }`
    );
    this.businessProvider.serviceContext = this.serviceContext;
  }

  /**
   * Use to create a new user account for the application.
   */
  createUserAccount(userAccount: UserAccount) {
    this.resetServiceMessages();
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${this.serviceName} preparing to create a new account. Service Init: ${
        this.serviceInitDateTime
      }`
    );
    return this.businessProvider.createUserAccount(userAccount);
  }

  confirmUserAccount(confirmationToken: ConfirmationToken) {
    this.resetServiceMessages();
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${
        this.serviceName
      } preparing to confirm new account with email token [${confirmationToken}].`
    );
    return this.businessProvider.confirmUserAccount(confirmationToken);

    /**TEMPORARY IMPLEMENTATION */
    // let userAccount = new UserAccount();
    // userAccount.FirstName = 'matt';
    // let response = {IsSuccess: true, Data: userAccount};
    // let subject: BehaviorSubject<any> = new BehaviorSubject(response);
    // return subject.asObservable();
    /**TEMPORARY IMPLEMENTATION */
  }

  confirmSubscription(confirmationToken: ConfirmationToken) {
    this.resetServiceMessages();
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${
        this.serviceName
      } preparing to confirm new subscription with email token [${confirmationToken}].`
    );
    return this.businessProvider.confirmSubscription(confirmationToken);

    /**TEMPORARY IMPLEMENTATION */
    // let userAccount = new UserAccount();
    // userAccount.FirstName = 'matt';
    // let response = {IsSuccess: true, Data: userAccount};
    // let subject: BehaviorSubject<any> = new BehaviorSubject(response);
    // return subject.asObservable();
    /**TEMPORARY IMPLEMENTATION */
  }

  /**
   * Use this to validate the user's credentials using the
   * applications web api.
   * @param credentials
   */
  validateCredentials(credentials: Credentials) {
    this.resetServiceMessages();
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${this.serviceName} preparing to validate credentials. Service Init: ${
        this.serviceInitDateTime
      }`
    );
    return this.businessProvider.validateCredentials(credentials);

    // let oauthResponse = new OAuthResponse();
    // oauthResponse.access_token = '1234';
    // oauthResponse.expires_in = 1234;
    // oauthResponse.token_type = 'oauth';
    // let subject: BehaviorSubject<OAuthResponse> = new BehaviorSubject(oauthResponse);
    // return subject.asObservable();
  }

  /**
   * Use to remove the current token value from the security service. The value
   * change will trigger the the [securityTokenUpdate] event in the [BusinessProviderService].
   */
  removeToken(): boolean {
    let isRemoved = false;
    try {
      if (this.accessToken) {
        this.accessToken = ''; // reset the token; remove value;
        // this.createNotAuthenticatedUserCapabilities();
        // this.businessProvider.emitSecurityAccessTokenChange(this.accessToken);
        isRemoved = true;
      }
    } catch (error) {
      this.handleUnexpectedError(error);
      isRemoved = false;
    }
    return isRemoved;
  }

  /**
   * Use to save the OAuth response information.
   * @param oAuthResponse
   */
  saveToken(oAuthResponse: OAuthResponse): boolean {
    const isSaved = false;
    // if (this.businessProvider.oAuthResponseIsValid(oAuthResponse)) {
    //   this.loggingService.log(this.serviceName, Severity.Information, `Preparing to save OAuthResponse: [${oAuthResponse.toString()}].`);
    //   this.oAuthResponse = oAuthResponse;
    //   this.accessToken = oAuthResponse.access_token;
    //   this.businessProvider.emitSecurityAccessTokenChange(this.accessToken); // emit updated/new access token value;
    //   isSaved = true;
    // }
    return isSaved;
  }

  /**
   * Use to return authorization token value.
   */
  token() {
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Preparing to retrieve authorization token.`
    );
    if (this.accessToken && this.oAuthResponse) {
      // TODO: DETERMINE IF THE TOKEN HAS EXPIRED OR NOT; use the [OAuthResponse] object;
      this.loggingService.log(
        this.serviceName,
        Severity.Information,
        `Authorization token exists: ${this.accessToken}.`
      );
      return this.accessToken;
    }
    return null;
  }

  resetServiceMessages() {
    this.serviceContext.Messages = new Array<ServiceMessage>();
  }
}
