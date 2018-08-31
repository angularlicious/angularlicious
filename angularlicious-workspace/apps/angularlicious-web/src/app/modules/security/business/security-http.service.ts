import { Inject, Injectable } from '@angular/core';
// import {
//   Http,
//   RequestMethod,
//   Response,
//   Headers,
//   RequestOptions
// } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/cache';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

import { HttpBaseService, HttpRequestMethod } from '@angularlicious/foundation';
import { Credentials } from '../models/credentials.model';
import { UserAccount } from '../models/user-account.model';
import { ConfirmationToken } from '../models/confirmation-token.model';
import { Subscriber } from '@angularlicious/security';
import { ServiceResponse } from '@angularlicious/foundation';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SecurityHttpService {
  url = '/api/security';
  data: Observable<Response>;
  serviceName: string;

  constructor(
    @Inject(HttpClient) public http: HttpClient,
    @Inject(HttpBaseService) public httpService: HttpBaseService,
    public loggingService: AngularliciousLoggingService
  ) {
    this.serviceName = 'SecurityHttpService';
  }

  /**
   * Use to send an Http request to the web api.
   *
   * @param userAccount: Contains user and credential information for the specified user.
   */
  public createUserAccount(userAccount: UserAccount) {
    const requestUrl = 'api/learner/account';
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${this.serviceName} preparing to call: ${requestUrl}`
    );

    const body = JSON.stringify(userAccount);
    const options = this.httpService.createRequestOptions(
      HttpRequestMethod.post,
      this.httpService.createHeader(false),
      requestUrl,
      body
    );
    return this.httpService.executeRequest(options);
  }

  /**
   * Use to confirm the user account. The token is provided by the application to the
   * potential user in an email. The user must enter the token to confirm the account.
   * @parm token: A string value that represents the new user account information.
   */
  public confirmUserAccount(confirmationToken: ConfirmationToken) {
    const requestUrl = 'api/learner/confirm-account';
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${this.serviceName} preparing to call: ${requestUrl}`
    );

    const body = JSON.stringify(confirmationToken);
    const options = this.httpService.createRequestOptions(
      HttpRequestMethod.post,
      this.httpService.createHeader(false),
      requestUrl,
      body
    );
    return this.httpService.executeRequest(options);

    /**TEMPORARY IMPLEMENTATION */
    // let response = { IsSuccess: false, Message: `Fake message from ${this.serviceName}` };
    // let subject: BehaviorSubject<any> = new BehaviorSubject(response);
    // return subject.asObservable();
    /**TEMPORARY IMPLEMENTATION */
  }

  public confirmSubscription(confirmationToken: ConfirmationToken) {
    const requestUrl = 'api/subscriber/confirmation';
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${this.serviceName} preparing to call: ${requestUrl}`
    );

    const body = JSON.stringify(confirmationToken);
    const options = this.httpService.createRequestOptions(
      HttpRequestMethod.post,
      this.httpService.createHeader(false),
      requestUrl,
      body
    );
    return this.httpService.executeRequest(options);

    /**TEMPORARY IMPLEMENTATION */
    // let response = { IsSuccess: false, Message: `Fake message from ${this.serviceName}` };
    // let subject: BehaviorSubject<any> = new BehaviorSubject(response);
    // return subject.asObservable();
    /**TEMPORARY IMPLEMENTATION */
  }

  public registerSubscriber(subscriber: Subscriber) {
    const requestUrl = 'api/subscriber/register';
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${this.serviceName} preparing to call: ${requestUrl}`
    );

    const body = JSON.stringify(subscriber);
    const options = this.httpService.createRequestOptions(
      HttpRequestMethod.post,
      this.httpService.createHeader(false),
      requestUrl,
      body
    );
    return this.httpService.executeRequest(options);

    /**TEMPORARY IMPLEMENTATION */
    // let response = new ServiceResponse();
    // response.IsSuccess = true;
    // response.Message = `Fake message from ${this.serviceName}`;
    // response.Data = true;
    // let subject: BehaviorSubject<any> = new BehaviorSubject(response);
    // return subject.asObservable();
    /**TEMPORARY IMPLEMENTATION */
  }

  /**
   * Use the [retrieveServiceInfo] method to create a new [Author] using the application's web api.
   * @param author
   */
  public validateCredentials(credentials: Credentials) {
    // TODO: form url encode the data submission;
    // POST http://build.hybridmobileapp.net/token HTTP/1.1
    // Content-Type: application/x-www-form-urlencoded
    // Host: dev.hybridmobileapp.net
    // Content-Length: 55
    // Expect: 100-continue
    // Connection: Keep-Alive
    // grant_type=password&username=username&password=password

    const body = `grant_type=password&username=${
      credentials.UserName
    }&password=${credentials.Password}`;
    const requestUrl = '/token';
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `${this.serviceName} preparing to call: ${requestUrl}`
    );

    const options = this.httpService.createRequestOptions(
      HttpRequestMethod.post,
      this.httpService.createFormUrlencodedHeader(),
      requestUrl,
      body
    );
    return this.httpService.executeRequest(options);

    /**TEMPORARY IMPLEMENTATION */
    // let response = { IsSuccess: false, Message: `Fake message from ${this.serviceName}` };
    // let subject: BehaviorSubject<any> = new BehaviorSubject(response);
    // return subject.asObservable();
    /**TEMPORARY IMPLEMENTATION */
  }

  retrieveUserCapabilities(): Observable<any> {
    // let requestUrl = this.url + '/user-capabilities';
    // this.loggingService.log(this.serviceName, Severity.Information, `${this.serviceName} preparing to call: ${requestUrl}`);

    // let options = this.httpService.createRequestOptions(
    //   RequestMethod.Get,
    //   this.httpService.createHeader(true),
    //   requestUrl,
    //   '');
    // return this.httpService.executeRequest(options);

    /**TEMPORARY IMPLEMENTATION */
    const response = {
      IsSuccess: false,
      Message: `Fake message from ${this.serviceName}`
    };
    const subject: BehaviorSubject<any> = new BehaviorSubject(response);
    return subject.asObservable();
    /**TEMPORARY IMPLEMENTATION */
  }
}
