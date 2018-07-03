import { ServiceContext } from '@angularlicious/rules-engine';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { ErrorResponse } from './models/error-response.model';
import { OAuthErrorResponse } from './models/oauth-error-response.model';
import { RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
/**
 * Use the [ServiceBase] to provide common behavior for Angular
 * services.
 */
export declare class ServiceBase {
    loggingService: AngularliciousLoggingService;
    accessToken: string;
    serviceName: string;
    serviceContext: ServiceContext;
    /**
     * Use the constructor to provide required elements to the base class.
     *
     * @param loggingService The [LoggingService] is a required dependency of this
     * class. It should be injected into any Angular Services that extend from
     * this base class. It will allow the members of the base class to log information
     * using the common LoggingService.
     */
    constructor(loggingService: AngularliciousLoggingService);
    /**
     * Use to extract the contents of the HTTP body and return a JSON
     * representation of the data.
     * @param response: contains the HTTP response.
     */
    extractData(response: Response): any;
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
    handleUnexpectedError(error: Error): void;
    /**
     * Use to handle an error that contains a [name] and a [message].
     * @param error
     */
    handleError(error: {
        name: string;
        message: string | undefined;
    }): void;
    /**
     * Use to handle HTTP errors when calling web api(s).
     */
    handleHttpError(error: {
        toString: () => void;
        _body: any;
        json: () => ErrorResponse;
    }, requestOptions: RequestOptions): Observable<Response>;
    /**
     * Use this method to handle an error from the OAuth Provider API.
     * @param error
     * @param requestOptions
     */
    handleOAuthError(error: OAuthErrorResponse, requestOptions: RequestOptions): Observable<Response>;
    /**
     * Use to create a new [ErrorResponse] with the specified message.
     * @param message The message for the specified [ErrorResponse].
     */
    createErrorResponse(message: string): ErrorResponse;
    /**
     * Use a generic method to finish service requests that return [Observables].
     * @param sourceName
     */
    finishRequest(sourceName: string): void;
    /**
     * Use to reset the service context when you want to clear messages from the [ServiceContext]. If you want to
     * append messages from subsequent service calls, do not use this method.
     */
    resetServiceContext(): void;
    /**
     * Use to write the current messages contained in the [ServiceContext]. Written messages are limited
     * to items that are marked as [DisplayToUser = true].
     */
    writeMessages(): void;
}
