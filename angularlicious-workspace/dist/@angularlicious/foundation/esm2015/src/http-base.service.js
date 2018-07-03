/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpRequestOptions } from './models/http-request-options';
import { HttpRequestMethod } from './models/http-request-methods.enum';
import { Severity } from '@angularlicious/logging';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { ErrorResponse } from './models/error-response.model';
/**
 * Use to create and execute HTTP service requests.
 * 1. Create Headers
 * 2. Create RequestOptions
 * 3. Execute Request
 */
export class HttpBaseService {
    /**
     * @param {?} http
     * @param {?} loggingService
     */
    constructor(http, loggingService) {
        this.http = http;
        this.loggingService = loggingService;
        this.serviceName = 'HttpBaseService';
    }
    /**
     * Use to create a [Header] for [multipart/form-data].
     * @param {?} requiresAuthToken
     * @return {?}
     */
    createMultipartFormDataHeader(requiresAuthToken) {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create header for the [multipart/form-data] HTTP request. RequiresAuthToken: ${requiresAuthToken}.`);
        const /** @type {?} */ headers = new Headers();
        if (requiresAuthToken) {
            // create header request with security token;
            headers.append('Authorization', `Bearer ${this.accessToken}`);
        }
        return headers;
    }
    /**
     * Use to create a [Header] for Content-Type [application/x-www-form-urlencoded].
     * @return {?}
     */
    createFormUrlencodedHeader() {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create header for the [application/x-www-form-urlencoded] HTTP request.`);
        const /** @type {?} */ headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return headers;
    }
    /**
     * Use to create a [Header] for the HTTP request. If the [requiresAuthToken] indicator
     * is true, the request will use the current Authorization security token.
     * @param {?} requiresAuthToken
     * @return {?}
     */
    createHeader(requiresAuthToken) {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create header for the HTTP request. RequiresAuthToken: ${requiresAuthToken}.`);
        const /** @type {?} */ headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (requiresAuthToken) {
            headers.append('Authorization', `Bearer ${this.accessToken}`);
        }
        return headers;
    }
    /**
     * Use this method to create a new HttpRequestOptions item for a request.
     * @param {?} method
     * @param {?} headers Use to supply header information in the request.
     * @param {?} url Use to indicate the URL of the web api.
     * @param {?} body Use to provide a data payload for the request.
     * @return {?}
     */
    createRequestOptions(method, headers, url, body) {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create request options for the HTTP request.`);
        const /** @type {?} */ options = new HttpRequestOptions();
        options.headers = headers;
        options.requestUrl = url;
        options.body = body;
        return options;
    }
    /**
     * Use to execute an HTTP request using the specified header and URL.
     * @param {?} requestOptions
     * @return {?}
     */
    executeRequest(requestOptions) {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to execute HTTP request. Url: ${requestOptions.requestUrl}`);
        return this.http.request(requestOptions.requestMethod.toString(), requestOptions.requestUrl, requestOptions);
        // return this.http
        //   .request(new Request(requestOptions))
        //   .map(response => response.json()) // maps the observable response to a JSON object;
        //   .catch(error => this.handleHttpError(error, requestOptions)); // use to handle any exception during service call;
    }
    /**
     * Use to execute an HTTP [get] request using the specified url and options.
     * @template ServiceResponse
     * @param {?} requestOptions
     * @return {?}
     */
    get(requestOptions) {
        requestOptions.requestMethod = HttpRequestMethod.GET;
        const /** @type {?} */ response = this.http.get(requestOptions.requestUrl, requestOptions)
            .pipe();
        return response;
    }
    /**
     * Use to execute an HTTP [post] request using the specified url and options.
     * @template ServiceResponse
     * @param {?} requestOptions use to define the options for the specified request.
     * @return {?}
     */
    post(requestOptions) {
        requestOptions.requestMethod = HttpRequestMethod.POST;
        const /** @type {?} */ response = this.http.post(requestOptions.requestUrl, requestOptions)
            .pipe();
        return response;
    }
    /**
     * Use to handle HTTP errors when calling web api(s).
     * @param {?} error
     * @param {?} requestOptions
     * @return {?}
     */
    handleHttpError(error, requestOptions) {
        const /** @type {?} */ message = `${error.toString()} ${requestOptions.requestUrl}, ${JSON.stringify(requestOptions.body)}`;
        this.loggingService.log(this.serviceName, Severity.Error, message);
        if (error && error._body) {
            /**
                   * This is an error that contains a body - a [Response] from the application web api. Includes:
                   * 1. IsSuccess
                   * 2. Message
                   * 3. Array of ServiceError items
                   * 4. Exception (optional)
                   */
            try {
                const /** @type {?} */ response = error.json();
                if (response) {
                    const /** @type {?} */ subject = new BehaviorSubject(response);
                    return subject.asObservable();
                }
                else {
                    // TODO: RETRIEVE ERROR DETAILS; STATUS, MESSAGE; ETC. AND PROVIDE TO HANDLER;
                    return this.handleUnexpectedError(error);
                }
            }
            catch (/** @type {?} */ ex) {
                const /** @type {?} */ err = /** @type {?} */ (ex);
                const /** @type {?} */ errorMessage = `${err.name}; ${err.message}`;
                this.loggingService.log(this.serviceName, Severity.Error, errorMessage);
                return this.handleUnexpectedError(err);
            }
        }
        else {
            return this.handleUnexpectedError(error);
        }
    }
    /**
     * @param {?=} error
     * @return {?}
     */
    handleUnexpectedError(error) {
        const /** @type {?} */ response = this.createErrorResponse(error);
        const /** @type {?} */ subject = new BehaviorSubject(response);
        return subject.asObservable();
    }
    /**
     * @param {?=} error
     * @return {?}
     */
    createErrorResponse(error) {
        let /** @type {?} */ message = 'Unexpected error while processing response.';
        const /** @type {?} */ response = new ErrorResponse();
        if (error instanceof Error) {
            message = `${error.name} - ${error.message}`;
            response.Exception = error;
        }
        response.Message = message;
        return response;
    }
}
HttpBaseService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HttpBaseService.ctorParameters = () => [
    { type: HttpClient },
    { type: AngularliciousLoggingService }
];
function HttpBaseService_tsickle_Closure_declarations() {
    /** @type {?} */
    HttpBaseService.prototype.serviceName;
    /** @type {?} */
    HttpBaseService.prototype.accessToken;
    /** @type {?} */
    HttpBaseService.prototype.http;
    /** @type {?} */
    HttpBaseService.prototype.loggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi8iLCJzb3VyY2VzIjpbInNyYy9odHRwLWJhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFhLFdBQVcsRUFBNEIsTUFBTSxzQkFBc0IsQ0FBQztBQUlwRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7QUFZOUQsTUFBTTs7Ozs7SUFJSixZQUNTLE1BQ0E7UUFEQSxTQUFJLEdBQUosSUFBSTtRQUNKLG1CQUFjLEdBQWQsY0FBYzsyQkFMRixpQkFBaUI7S0FNakM7Ozs7OztJQUtMLDZCQUE2QixDQUFDLGlCQUEwQjtRQUN0RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIsNkZBQTZGLGlCQUFpQixHQUFHLENBQ2xILENBQUM7UUFDRix1QkFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7O1lBRXRCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQVUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENB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QUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELHVCQUFNLE9BQU8sR0FBeUIsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxLQUFhO1FBQy9CLHFCQUFJLE9BQU8sR0FBRyw2Q0FBNkMsQ0FBQztRQUM1RCx1QkFBTSxRQUFRLEdBQWtCLElBQUksYUFBYSxFQUFFLENBQUM7UUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0IsT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksTUFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFDRCxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCOzs7WUFsTEYsVUFBVTs7OztZQXJCRixVQUFVO1lBU1YsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEV2ZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcywgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9odHRwLXJlcXVlc3Qtb3B0aW9ucyc7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW1ldGhvZHMuZW51bSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuaW1wb3J0IHsgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IFJlcXVlc3RNZXRob2QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gY3JlYXRlIGFuZCBleGVjdXRlIEhUVFAgc2VydmljZSByZXF1ZXN0cy5cclxuICogMS4gQ3JlYXRlIEhlYWRlcnNcclxuICogMi4gQ3JlYXRlIFJlcXVlc3RPcHRpb25zXHJcbiAqIDMuIEV4ZWN1dGUgUmVxdWVzdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEJhc2VTZXJ2aWNlIHtcclxuICBwdWJsaWMgc2VydmljZU5hbWUgPSAnSHR0cEJhc2VTZXJ2aWNlJztcclxuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHVibGljIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciBbbXVsdGlwYXJ0L2Zvcm0tZGF0YV0uXHJcbiAgICovXHJcbiAgY3JlYXRlTXVsdGlwYXJ0Rm9ybURhdGFIZWFkZXIocmVxdWlyZXNBdXRoVG9rZW46IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgaGVhZGVyIGZvciB0aGUgW211bHRpcGFydC9mb3JtLWRhdGFdIEhUVFAgcmVxdWVzdC4gUmVxdWlyZXNBdXRoVG9rZW46ICR7cmVxdWlyZXNBdXRoVG9rZW59LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgIGlmIChyZXF1aXJlc0F1dGhUb2tlbikge1xyXG4gICAgICAvLyBjcmVhdGUgaGVhZGVyIHJlcXVlc3Qgd2l0aCBzZWN1cml0eSB0b2tlbjtcclxuICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy5hY2Nlc3NUb2tlbn1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciBDb250ZW50LVR5cGUgW2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZF0uXHJcbiAgICovXHJcbiAgY3JlYXRlRm9ybVVybGVuY29kZWRIZWFkZXIoKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGhlYWRlciBmb3IgdGhlIFthcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRdIEhUVFAgcmVxdWVzdC5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciB0aGUgSFRUUCByZXF1ZXN0LiBJZiB0aGUgW3JlcXVpcmVzQXV0aFRva2VuXSBpbmRpY2F0b3JcclxuICAgKiBpcyB0cnVlLCB0aGUgcmVxdWVzdCB3aWxsIHVzZSB0aGUgY3VycmVudCBBdXRob3JpemF0aW9uIHNlY3VyaXR5IHRva2VuLlxyXG4gICAqIEBwYXJhbSBpc1NlY3VyZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUhlYWRlcihyZXF1aXJlc0F1dGhUb2tlbjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBoZWFkZXIgZm9yIHRoZSBIVFRQIHJlcXVlc3QuIFJlcXVpcmVzQXV0aFRva2VuOiAke3JlcXVpcmVzQXV0aFRva2VufS5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICBpZiAocmVxdWlyZXNBdXRoVG9rZW4pIHtcclxuICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy5hY2Nlc3NUb2tlbn1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBIdHRwUmVxdWVzdE9wdGlvbnMgaXRlbSBmb3IgYSByZXF1ZXN0LlxyXG4gICAqIEBwYXJhbSBoZWFkZXJzIFVzZSB0byBzdXBwbHkgaGVhZGVyIGluZm9ybWF0aW9uIGluIHRoZSByZXF1ZXN0LlxyXG4gICAqIEBwYXJhbSB1cmwgVXNlIHRvIGluZGljYXRlIHRoZSBVUkwgb2YgdGhlIHdlYiBhcGkuXHJcbiAgICogQHBhcmFtIGJvZHkgVXNlIHRvIHByb3ZpZGUgYSBkYXRhIHBheWxvYWQgZm9yIHRoZSByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIGNyZWF0ZVJlcXVlc3RPcHRpb25zKFxyXG4gICAgbWV0aG9kOiBIdHRwUmVxdWVzdE1ldGhvZCxcclxuICAgIGhlYWRlcnM6IEh0dHBIZWFkZXJzLFxyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBib2R5OiBhbnlcclxuICApIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgcmVxdWVzdCBvcHRpb25zIGZvciB0aGUgSFRUUCByZXF1ZXN0LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IEh0dHBSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgb3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcclxuICAgIG9wdGlvbnMucmVxdWVzdFVybCA9IHVybDtcclxuICAgIG9wdGlvbnMuYm9keSA9IGJvZHk7XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCBoZWFkZXIgYW5kIFVSTC5cclxuICAgKi9cclxuICBleGVjdXRlUmVxdWVzdChyZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBleGVjdXRlIEhUVFAgcmVxdWVzdC4gVXJsOiAke3JlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmx9YCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnMucmVxdWVzdE1ldGhvZC50b1N0cmluZygpLCByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAvLyAgIC5yZXF1ZXN0KG5ldyBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zKSlcclxuICAgIC8vICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpIC8vIG1hcHMgdGhlIG9ic2VydmFibGUgcmVzcG9uc2UgdG8gYSBKU09OIG9iamVjdDtcclxuICAgIC8vICAgLmNhdGNoKGVycm9yID0+IHRoaXMuaGFuZGxlSHR0cEVycm9yKGVycm9yLCByZXF1ZXN0T3B0aW9ucykpOyAvLyB1c2UgdG8gaGFuZGxlIGFueSBleGNlcHRpb24gZHVyaW5nIHNlcnZpY2UgY2FsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBleGVjdXRlIGFuIEhUVFAgW2dldF0gcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIHVybCBhbmQgb3B0aW9ucy5cclxuICAgKi9cclxuICBnZXQ8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QgPSBIdHRwUmVxdWVzdE1ldGhvZC5HRVQ7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuaHR0cC5nZXQ8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgIC5waXBlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgYW4gSFRUUCBbcG9zdF0gcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIHVybCBhbmQgb3B0aW9ucy5cclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnMgdXNlIHRvIGRlZmluZSB0aGUgb3B0aW9ucyBmb3IgdGhlIHNwZWNpZmllZCByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHBvc3Q8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QgPSBIdHRwUmVxdWVzdE1ldGhvZC5QT1NUO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmh0dHAucG9zdDxTZXJ2aWNlUmVzcG9uc2U+KHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgLnBpcGUoKTtcclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIEhUVFAgZXJyb3JzIHdoZW4gY2FsbGluZyB3ZWIgYXBpKHMpLlxyXG4gICAqL1xyXG4gIGhhbmRsZUh0dHBFcnJvcihcclxuICAgIGVycm9yOiBhbnksXHJcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGAke2Vycm9yLnRvU3RyaW5nKCl9ICR7XHJcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcclxuICAgICAgfSwgJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0T3B0aW9ucy5ib2R5KX1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgaWYgKGVycm9yICYmIGVycm9yLl9ib2R5KSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaGlzIGlzIGFuIGVycm9yIHRoYXQgY29udGFpbnMgYSBib2R5IC0gYSBbUmVzcG9uc2VdIGZyb20gdGhlIGFwcGxpY2F0aW9uIHdlYiBhcGkuIEluY2x1ZGVzOlxyXG4gICAgICAgKiAxLiBJc1N1Y2Nlc3NcclxuICAgICAgICogMi4gTWVzc2FnZVxyXG4gICAgICAgKiAzLiBBcnJheSBvZiBTZXJ2aWNlRXJyb3IgaXRlbXNcclxuICAgICAgICogNC4gRXhjZXB0aW9uIChvcHRpb25hbClcclxuICAgICAgICovXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBlcnJvci5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFRPRE86IFJFVFJJRVZFIEVSUk9SIERFVEFJTFM7IFNUQVRVUywgTUVTU0FHRTsgRVRDLiBBTkQgUFJPVklERSBUTyBIQU5ETEVSO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgY29uc3QgZXJyID0gPEVycm9yPmV4O1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGAke2Vyci5uYW1lfTsgJHtlcnIubWVzc2FnZX1gO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yPzogRXJyb3IpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKGVycm9yKTtcclxuICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XHJcbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2UoZXJyb3I/OiBFcnJvcik6IEVycm9yUmVzcG9uc2Uge1xyXG4gICAgbGV0IG1lc3NhZ2UgPSAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLic7XHJcbiAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICBtZXNzYWdlID0gYCR7ZXJyb3IubmFtZX0gLSAke2Vycm9yLm1lc3NhZ2V9YDtcclxuICAgICAgcmVzcG9uc2UuRXhjZXB0aW9uID0gZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcbn1cclxuIl19