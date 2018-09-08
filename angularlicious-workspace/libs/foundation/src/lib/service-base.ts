import {
  ServiceContext,
  MessageType,
  ServiceMessage
} from '@angularlicious/rules-engine';
import {
  AngularliciousLoggingService,
  Severity
} from '@angularlicious/logging';
import { ErrorResponse } from './models/error-response.model';
import { OAuthErrorResponse } from './models/oauth-error-response.model';
import { BehaviorSubject } from 'rxjs';
// import { RequestOptions, Response } from '@angular/http';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpRequestOptions } from './models/http-request-options';

/**
 * Use the [ServiceBase] to provide common behavior for Angular
 * services.
 */
export class ServiceBase {
  accessToken = '';
  serviceName: string;
  serviceContext: ServiceContext = new ServiceContext();

  /**
   * Use the constructor to provide required elements to the base class.
   *
   * @param loggingService The [LoggingService] is a required dependency of this
   * class. It should be injected into any Angular Services that extend from
   * this base class. It will allow the members of the base class to log information
   * using the common LoggingService.
   */
  constructor(public loggingService: AngularliciousLoggingService) {}

  /**
   * Use to extract the contents of the HTTP body and return a JSON
   * representation of the data.
   * @param response: contains the HTTP response.
   */
  extractData(response: Response) {
    const body = response.json();
    return body || {};
  }

  /**
   * Use to handle an unexpected error in the application. The error should implement
   * the specified interface. The method will add a new [ServiceMessage] to the
   * specified [ServiceContext].
   * @param error An unexpected application error that implements the [Error] interface.
   *
   * interface Error {
   *  name: string;
   *  message: string;
   *  stack?: string;
   * }
   */
  handleUnexpectedError(error: Error): void {
    const message = new ServiceMessage(error.name, error.message)
      .WithDisplayToUser(true)
      .WithMessageType(MessageType.Error)
      .WithSource(this.serviceName);

    const logItem = `${message.toString()}; ${error.stack}`;
    this.loggingService.log(this.serviceName, Severity.Error, logItem);

    this.serviceContext.addMessage(message);
  }

  /**
   * Use to handle an error that contains a [name] and a [message].
   * @param error
   */
  handleError(error: { name: string; message: string | undefined }): void {
    const message = new ServiceMessage(error.name, error.message)
      .WithDisplayToUser(true)
      .WithMessageType(MessageType.Error)
      .WithSource(this.serviceName);

    this.loggingService.log(
      this.serviceName,
      Severity.Error,
      message.toString()
    );

    this.serviceContext.addMessage(message);
  }

  /**
   * Use to handle HTTP errors when calling web api(s).
   */
  handleHttpError(
    error: { toString: () => void; _body: any; json: () => ErrorResponse },
    requestOptions: HttpRequestOptions
  ): Observable<Response> {
    const message = `${error.toString()} ${
      requestOptions.requestUrl
    }, ${JSON.stringify(requestOptions.body)}`;
    this.loggingService.log(this.serviceName, Severity.Error, message);
    if (error && error._body) {
      try {
        const errorResponse: ErrorResponse = error.json();
        const behaviorSubject: BehaviorSubject<any> = new BehaviorSubject(
          errorResponse
        );
        return behaviorSubject.asObservable();
      } catch (error) {
        this.loggingService.log(
          this.serviceName,
          Severity.Error,
          error.toString()
        );
      }
    }

    // default return behavior;
    const response = this.createErrorResponse(
      'Unexpected error while processing response.'
    );
    const subject: BehaviorSubject<any> = new BehaviorSubject(response);
    return subject.asObservable();
  }

  /**
   * Use this method to handle an error from the OAuth Provider API.
   * @param error
   * @param requestOptions
   */
  handleOAuthError(
    error: OAuthErrorResponse,
    requestOptions: HttpRequestOptions
  ): Observable<Response> {
    const message = `${error.toString()} ${
      requestOptions.requestUrl
    }, ${JSON.stringify(requestOptions.body)}`;
    this.loggingService.log(this.serviceName, Severity.Error, message);
    if (error && error._body) {
      try {
        const errorResponse = this.createErrorResponse(
          `Unable to validate credentials.`
        );
        const behaviorSubject: BehaviorSubject<any> = new BehaviorSubject(
          errorResponse
        );
        return behaviorSubject.asObservable();
      } catch (e) {
        this.loggingService.log(this.serviceName, Severity.Error, e.toString());
      }
    }

    // default return behavior;
    const response = this.createErrorResponse(
      `Unable to validate credentials.`
    );
    const subject: BehaviorSubject<any> = new BehaviorSubject(response);
    return subject.asObservable();
  }

  /**
   * Use to create a new [ErrorResponse] with the specified message.
   * @param message The message for the specified [ErrorResponse].
   */
  createErrorResponse(message: string): ErrorResponse {
    const response: ErrorResponse = new ErrorResponse();
    response.Message = message;
    return response;
  }

  /**
   * Use a generic method to finish service requests that return [Observables].
   * @param sourceName
   */
  finishRequest(sourceName: string): void {
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Request for [${sourceName}] by ${this.serviceName} is complete.`
    );
    if (this.serviceContext.hasErrors()) {
      this.loggingService.log(
        this.serviceName,
        Severity.Information,
        `Preparing to write any messages.`
      );
      this.serviceContext.Messages.filter(
        f => f.MessageType === MessageType.Error && f.DisplayToUser
      ).forEach(e =>
        this.loggingService.log(this.serviceName, Severity.Error, e.toString())
      );
    }
  }

  /**
   * Use to reset the service context when you want to clear messages from the [ServiceContext]. If you want to
   * append messages from subsequent service calls, do not use this method.
   */
  resetServiceContext() {
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Preparing to reset the Messages of the current [ServiceContext].`
    );
    if (this.serviceContext && this.serviceContext.Messages) {
      if (this.serviceContext.Messages.length > 0) {
        this.loggingService.log(
          this.serviceName,
          Severity.Information,
          `Resetting the Messages of the current [ServiceContext].`
        );
        this.serviceContext.Messages = new Array<ServiceMessage>();
      } else {
        this.loggingService.log(
          this.serviceName,
          Severity.Information,
          `The current [ServiceContext] does not contain any [Messages].`
        );
      }
    } else {
      this.loggingService.log(
        this.serviceName,
        Severity.Warning,
        `The current [ServiceContext] is not valid.`
      );
    }
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Finished  processing request to [reset] the Messages of the current [ServiceContext].`
    );
  }

  /**
   * Use to write the current messages contained in the [ServiceContext]. Written messages are limited
   * to items that are marked as [DisplayToUser = true].
   */
  writeMessages() {
    if (this.serviceContext && this.serviceContext.Messages) {
      this.serviceContext.Messages.forEach(e => {
        if (e.MessageType === MessageType.Error && e.DisplayToUser) {
          this.loggingService.log(
            this.serviceName,
            Severity.Error,
            e.toString()
          );
        }
      });
    }
  }
}
