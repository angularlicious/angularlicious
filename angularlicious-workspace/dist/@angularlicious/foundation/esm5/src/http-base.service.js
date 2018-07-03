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
var HttpBaseService = /** @class */ (function () {
    function HttpBaseService(http, loggingService) {
        this.http = http;
        this.loggingService = loggingService;
        this.serviceName = 'HttpBaseService';
    }
    /**
     * Use to create a [Header] for [multipart/form-data].
     */
    /**
     * Use to create a [Header] for [multipart/form-data].
     * @param {?} requiresAuthToken
     * @return {?}
     */
    HttpBaseService.prototype.createMultipartFormDataHeader = /**
     * Use to create a [Header] for [multipart/form-data].
     * @param {?} requiresAuthToken
     * @return {?}
     */
    function (requiresAuthToken) {
        this.loggingService.log(this.serviceName, Severity.Information, "Preparing to create header for the [multipart/form-data] HTTP request. RequiresAuthToken: " + requiresAuthToken + ".");
        var /** @type {?} */ headers = new Headers();
        if (requiresAuthToken) {
            // create header request with security token;
            headers.append('Authorization', "Bearer " + this.accessToken);
        }
        return headers;
    };
    /**
     * Use to create a [Header] for Content-Type [application/x-www-form-urlencoded].
     */
    /**
     * Use to create a [Header] for Content-Type [application/x-www-form-urlencoded].
     * @return {?}
     */
    HttpBaseService.prototype.createFormUrlencodedHeader = /**
     * Use to create a [Header] for Content-Type [application/x-www-form-urlencoded].
     * @return {?}
     */
    function () {
        this.loggingService.log(this.serviceName, Severity.Information, "Preparing to create header for the [application/x-www-form-urlencoded] HTTP request.");
        var /** @type {?} */ headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return headers;
    };
    /**
     * Use to create a [Header] for the HTTP request. If the [requiresAuthToken] indicator
     * is true, the request will use the current Authorization security token.
     * @param isSecure
     */
    /**
     * Use to create a [Header] for the HTTP request. If the [requiresAuthToken] indicator
     * is true, the request will use the current Authorization security token.
     * @param {?} requiresAuthToken
     * @return {?}
     */
    HttpBaseService.prototype.createHeader = /**
     * Use to create a [Header] for the HTTP request. If the [requiresAuthToken] indicator
     * is true, the request will use the current Authorization security token.
     * @param {?} requiresAuthToken
     * @return {?}
     */
    function (requiresAuthToken) {
        this.loggingService.log(this.serviceName, Severity.Information, "Preparing to create header for the HTTP request. RequiresAuthToken: " + requiresAuthToken + ".");
        var /** @type {?} */ headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (requiresAuthToken) {
            headers.append('Authorization', "Bearer " + this.accessToken);
        }
        return headers;
    };
    /**
     * Use this method to create a new HttpRequestOptions item for a request.
     * @param headers Use to supply header information in the request.
     * @param url Use to indicate the URL of the web api.
     * @param body Use to provide a data payload for the request.
     */
    /**
     * Use this method to create a new HttpRequestOptions item for a request.
     * @param {?} method
     * @param {?} headers Use to supply header information in the request.
     * @param {?} url Use to indicate the URL of the web api.
     * @param {?} body Use to provide a data payload for the request.
     * @return {?}
     */
    HttpBaseService.prototype.createRequestOptions = /**
     * Use this method to create a new HttpRequestOptions item for a request.
     * @param {?} method
     * @param {?} headers Use to supply header information in the request.
     * @param {?} url Use to indicate the URL of the web api.
     * @param {?} body Use to provide a data payload for the request.
     * @return {?}
     */
    function (method, headers, url, body) {
        this.loggingService.log(this.serviceName, Severity.Information, "Preparing to create request options for the HTTP request.");
        var /** @type {?} */ options = new HttpRequestOptions();
        options.headers = headers;
        options.requestUrl = url;
        options.body = body;
        return options;
    };
    /**
     * Use to execute an HTTP request using the specified header and URL.
     */
    /**
     * Use to execute an HTTP request using the specified header and URL.
     * @param {?} requestOptions
     * @return {?}
     */
    HttpBaseService.prototype.executeRequest = /**
     * Use to execute an HTTP request using the specified header and URL.
     * @param {?} requestOptions
     * @return {?}
     */
    function (requestOptions) {
        this.loggingService.log(this.serviceName, Severity.Information, "Preparing to execute HTTP request. Url: " + requestOptions.requestUrl);
        return this.http.request(requestOptions.requestMethod.toString(), requestOptions.requestUrl, requestOptions);
        // return this.http
        //   .request(new Request(requestOptions))
        //   .map(response => response.json()) // maps the observable response to a JSON object;
        //   .catch(error => this.handleHttpError(error, requestOptions)); // use to handle any exception during service call;
    };
    /**
     * Use to execute an HTTP [get] request using the specified url and options.
     */
    /**
     * Use to execute an HTTP [get] request using the specified url and options.
     * @template ServiceResponse
     * @param {?} requestOptions
     * @return {?}
     */
    HttpBaseService.prototype.get = /**
     * Use to execute an HTTP [get] request using the specified url and options.
     * @template ServiceResponse
     * @param {?} requestOptions
     * @return {?}
     */
    function (requestOptions) {
        requestOptions.requestMethod = HttpRequestMethod.GET;
        var /** @type {?} */ response = this.http.get(requestOptions.requestUrl, requestOptions)
            .pipe();
        return response;
    };
    /**
     * Use to execute an HTTP [post] request using the specified url and options.
     * @param requestOptions use to define the options for the specified request.
     */
    /**
     * Use to execute an HTTP [post] request using the specified url and options.
     * @template ServiceResponse
     * @param {?} requestOptions use to define the options for the specified request.
     * @return {?}
     */
    HttpBaseService.prototype.post = /**
     * Use to execute an HTTP [post] request using the specified url and options.
     * @template ServiceResponse
     * @param {?} requestOptions use to define the options for the specified request.
     * @return {?}
     */
    function (requestOptions) {
        requestOptions.requestMethod = HttpRequestMethod.POST;
        var /** @type {?} */ response = this.http.post(requestOptions.requestUrl, requestOptions)
            .pipe();
        return response;
    };
    /**
     * Use to handle HTTP errors when calling web api(s).
     */
    /**
     * Use to handle HTTP errors when calling web api(s).
     * @param {?} error
     * @param {?} requestOptions
     * @return {?}
     */
    HttpBaseService.prototype.handleHttpError = /**
     * Use to handle HTTP errors when calling web api(s).
     * @param {?} error
     * @param {?} requestOptions
     * @return {?}
     */
    function (error, requestOptions) {
        var /** @type {?} */ message = error.toString() + " " + requestOptions.requestUrl + ", " + JSON.stringify(requestOptions.body);
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
                var /** @type {?} */ response = error.json();
                if (response) {
                    var /** @type {?} */ subject = new BehaviorSubject(response);
                    return subject.asObservable();
                }
                else {
                    // TODO: RETRIEVE ERROR DETAILS; STATUS, MESSAGE; ETC. AND PROVIDE TO HANDLER;
                    return this.handleUnexpectedError(error);
                }
            }
            catch (/** @type {?} */ ex) {
                var /** @type {?} */ err = /** @type {?} */ (ex);
                var /** @type {?} */ errorMessage = err.name + "; " + err.message;
                this.loggingService.log(this.serviceName, Severity.Error, errorMessage);
                return this.handleUnexpectedError(err);
            }
        }
        else {
            return this.handleUnexpectedError(error);
        }
    };
    /**
     * @param {?=} error
     * @return {?}
     */
    HttpBaseService.prototype.handleUnexpectedError = /**
     * @param {?=} error
     * @return {?}
     */
    function (error) {
        var /** @type {?} */ response = this.createErrorResponse(error);
        var /** @type {?} */ subject = new BehaviorSubject(response);
        return subject.asObservable();
    };
    /**
     * @param {?=} error
     * @return {?}
     */
    HttpBaseService.prototype.createErrorResponse = /**
     * @param {?=} error
     * @return {?}
     */
    function (error) {
        var /** @type {?} */ message = 'Unexpected error while processing response.';
        var /** @type {?} */ response = new ErrorResponse();
        if (error instanceof Error) {
            message = error.name + " - " + error.message;
            response.Exception = error;
        }
        response.Message = message;
        return response;
    };
    HttpBaseService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HttpBaseService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: AngularliciousLoggingService }
    ]; };
    return HttpBaseService;
}());
export { HttpBaseService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi8iLCJzb3VyY2VzIjpbInNyYy9odHRwLWJhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFhLFdBQVcsRUFBNEIsTUFBTSxzQkFBc0IsQ0FBQztBQUlwRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7O0lBZ0I1RCx5QkFDUyxNQUNBO1FBREEsU0FBSSxHQUFKLElBQUk7UUFDSixtQkFBYyxHQUFkLGNBQWM7MkJBTEYsaUJBQWlCO0tBTWpDO0lBRUw7O09BRUc7Ozs7OztJQUNILHVEQUE2Qjs7Ozs7SUFBN0IsVUFBOEIsaUJBQTBCO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsV0FBVyxFQUNoQixRQUFRLENBQUMsV0FBVyxFQUNwQiwrRkFBNkYsaUJBQWlCLE1BQUcsQ0FDbEgsQ0FBQztRQUNGLHFCQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7WUFFdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsWUFBVSxJQUFJLENBQUMsV0FBYSxDQUFDLENBQUM7U0FDL0Q7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2hCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsb0RBQTBCOzs7O0lBQTFCO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLHNGQUFzRixDQUN2RixDQUFDO1FBQ0YscUJBQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxtQ0FBbUM7U0FDcEQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxzQ0FBWTs7Ozs7O0lBQVosVUFBYSxpQkFBMEI7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLHlFQUF1RSxpQkFBaUIsTUFBRyxDQUM1RixDQUFDO1FBQ0YscUJBQU0sT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztRQUN4RSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsWUFBVSxJQUFJLENBQUMsV0FBYSxDQUFDLENBQUM7U0FDL0Q7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2hCO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7OztJQUNILDhDQUFvQjs7Ozs7Ozs7SUFBcEIsVUFDRSxNQUF5QixFQUN6QixPQUFvQixFQUNwQixHQUFXLEVBQ1gsSUFBUztRQUVULElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsV0FBVyxFQUNoQixRQUFRLENBQUMsV0FBVyxFQUNwQiwyREFBMkQsQ0FDNUQsQ0FBQztRQUNGLHFCQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDekMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDMUIsT0FBTyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDekIsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjtJQUVEOztPQUVHOzs7Ozs7SUFDSCx3Q0FBYzs7Ozs7SUFBZCxVQUFlLGNBQWtDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsV0FBVyxFQUNoQixRQUFRLENBQUMsV0FBVyxFQUNwQiw2Q0FBMkMsY0FBYyxDQUFDLFVBQVksQ0FBQyxDQUFDO1FBRTFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBa0IsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxjQUFjLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs7OztLQUsvSDtJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsNkJBQUc7Ozs7OztJQUFILFVBQXFCLGNBQWtDO1FBQ3JELGNBQWMsQ0FBQyxhQUFhLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1FBQ3JELHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBa0IsY0FBYyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUM7YUFDekYsSUFBSSxFQUFFLENBQUM7UUFFUixNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsOEJBQUk7Ozs7OztJQUFKLFVBQXNCLGNBQWtDO1FBQ3RELGNBQWMsQ0FBQyxhQUFhLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBQ3RELHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBa0IsY0FBYyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUM7YUFDMUYsSUFBSSxFQUFFLENBQUM7UUFFUixNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCx5Q0FBZTs7Ozs7O0lBQWYsVUFDRSxLQUFVLEVBQ1YsY0FBa0M7UUFFbEMscUJBQU0sT0FBTyxHQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FDakMsY0FBYyxDQUFDLFVBQVUsVUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7WUFRekIsSUFBSSxDQUFDO2dCQUNILHFCQUFNLFFBQVEsR0FBa0IsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM3QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNiLHFCQUFNLE9BQU8sR0FBeUIsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BFLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQy9CO2dCQUFDLElBQUksQ0FBQyxDQUFDOztvQkFFTixNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQzthQUNGO1lBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsRUFBRSxFQUFFLENBQUM7Z0JBQ1oscUJBQU0sR0FBRyxxQkFBVSxFQUFFLENBQUEsQ0FBQztnQkFDdEIscUJBQU0sWUFBWSxHQUFNLEdBQUcsQ0FBQyxJQUFJLFVBQUssR0FBRyxDQUFDLE9BQVMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hDO1NBQ0Y7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUM7S0FDRjs7Ozs7SUFFRCwrQ0FBcUI7Ozs7SUFBckIsVUFBc0IsS0FBYTtRQUNqQyxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELHFCQUFNLE9BQU8sR0FBeUIsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCw2Q0FBbUI7Ozs7SUFBbkIsVUFBb0IsS0FBYTtRQUMvQixxQkFBSSxPQUFPLEdBQUcsNkNBQTZDLENBQUM7UUFDNUQscUJBQU0sUUFBUSxHQUFrQixJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sR0FBTSxLQUFLLENBQUMsSUFBSSxXQUFNLEtBQUssQ0FBQyxPQUFTLENBQUM7WUFDN0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFDRCxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCOztnQkFsTEYsVUFBVTs7OztnQkFyQkYsVUFBVTtnQkFTViw0QkFBNEI7OzBCQVhyQzs7U0F3QmEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFdmVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJy4vbW9kZWxzL2h0dHAtcmVxdWVzdC1tZXRob2RzLmVudW0nO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1lcnJvci5tb2RlbCc7XHJcbmltcG9ydCB7IFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGNyZWF0ZSBhbmQgZXhlY3V0ZSBIVFRQIHNlcnZpY2UgcmVxdWVzdHMuXHJcbiAqIDEuIENyZWF0ZSBIZWFkZXJzXHJcbiAqIDIuIENyZWF0ZSBSZXF1ZXN0T3B0aW9uc1xyXG4gKiAzLiBFeGVjdXRlIFJlcXVlc3RcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBCYXNlU2VydmljZSB7XHJcbiAgcHVibGljIHNlcnZpY2VOYW1lID0gJ0h0dHBCYXNlU2VydmljZSc7XHJcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgW211bHRpcGFydC9mb3JtLWRhdGFdLlxyXG4gICAqL1xyXG4gIGNyZWF0ZU11bHRpcGFydEZvcm1EYXRhSGVhZGVyKHJlcXVpcmVzQXV0aFRva2VuOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGhlYWRlciBmb3IgdGhlIFttdWx0aXBhcnQvZm9ybS1kYXRhXSBIVFRQIHJlcXVlc3QuIFJlcXVpcmVzQXV0aFRva2VuOiAke3JlcXVpcmVzQXV0aFRva2VufS5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICBpZiAocmVxdWlyZXNBdXRoVG9rZW4pIHtcclxuICAgICAgLy8gY3JlYXRlIGhlYWRlciByZXF1ZXN0IHdpdGggc2VjdXJpdHkgdG9rZW47XHJcbiAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMuYWNjZXNzVG9rZW59YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgQ29udGVudC1UeXBlIFthcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRdLlxyXG4gICAqL1xyXG4gIGNyZWF0ZUZvcm1VcmxlbmNvZGVkSGVhZGVyKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBoZWFkZXIgZm9yIHRoZSBbYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXSBIVFRQIHJlcXVlc3QuYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgdGhlIEhUVFAgcmVxdWVzdC4gSWYgdGhlIFtyZXF1aXJlc0F1dGhUb2tlbl0gaW5kaWNhdG9yXHJcbiAgICogaXMgdHJ1ZSwgdGhlIHJlcXVlc3Qgd2lsbCB1c2UgdGhlIGN1cnJlbnQgQXV0aG9yaXphdGlvbiBzZWN1cml0eSB0b2tlbi5cclxuICAgKiBAcGFyYW0gaXNTZWN1cmVcclxuICAgKi9cclxuICBjcmVhdGVIZWFkZXIocmVxdWlyZXNBdXRoVG9rZW46IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgaGVhZGVyIGZvciB0aGUgSFRUUCByZXF1ZXN0LiBSZXF1aXJlc0F1dGhUb2tlbjogJHtyZXF1aXJlc0F1dGhUb2tlbn0uYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgaWYgKHJlcXVpcmVzQXV0aFRva2VuKSB7XHJcbiAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMuYWNjZXNzVG9rZW59YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgSHR0cFJlcXVlc3RPcHRpb25zIGl0ZW0gZm9yIGEgcmVxdWVzdC5cclxuICAgKiBAcGFyYW0gaGVhZGVycyBVc2UgdG8gc3VwcGx5IGhlYWRlciBpbmZvcm1hdGlvbiBpbiB0aGUgcmVxdWVzdC5cclxuICAgKiBAcGFyYW0gdXJsIFVzZSB0byBpbmRpY2F0ZSB0aGUgVVJMIG9mIHRoZSB3ZWIgYXBpLlxyXG4gICAqIEBwYXJhbSBib2R5IFVzZSB0byBwcm92aWRlIGEgZGF0YSBwYXlsb2FkIGZvciB0aGUgcmVxdWVzdC5cclxuICAgKi9cclxuICBjcmVhdGVSZXF1ZXN0T3B0aW9ucyhcclxuICAgIG1ldGhvZDogSHR0cFJlcXVlc3RNZXRob2QsXHJcbiAgICBoZWFkZXJzOiBIdHRwSGVhZGVycyxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgYm9keTogYW55XHJcbiAgKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIHJlcXVlc3Qgb3B0aW9ucyBmb3IgdGhlIEhUVFAgcmVxdWVzdC5gXHJcbiAgICApO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBIdHRwUmVxdWVzdE9wdGlvbnMoKTtcclxuICAgIG9wdGlvbnMuaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICBvcHRpb25zLnJlcXVlc3RVcmwgPSB1cmw7XHJcbiAgICBvcHRpb25zLmJvZHkgPSBib2R5O1xyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgYW4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBzcGVjaWZpZWQgaGVhZGVyIGFuZCBVUkwuXHJcbiAgICovXHJcbiAgZXhlY3V0ZVJlcXVlc3QocmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gZXhlY3V0ZSBIVFRQIHJlcXVlc3QuIFVybDogJHtyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsfWApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxTZXJ2aWNlUmVzcG9uc2U+KHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QudG9TdHJpbmcoKSwgcmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCwgcmVxdWVzdE9wdGlvbnMpO1xyXG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgLy8gICAucmVxdWVzdChuZXcgUmVxdWVzdChyZXF1ZXN0T3B0aW9ucykpXHJcbiAgICAvLyAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKSAvLyBtYXBzIHRoZSBvYnNlcnZhYmxlIHJlc3BvbnNlIHRvIGEgSlNPTiBvYmplY3Q7XHJcbiAgICAvLyAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmhhbmRsZUh0dHBFcnJvcihlcnJvciwgcmVxdWVzdE9wdGlvbnMpKTsgLy8gdXNlIHRvIGhhbmRsZSBhbnkgZXhjZXB0aW9uIGR1cmluZyBzZXJ2aWNlIGNhbGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIFtnZXRdIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCB1cmwgYW5kIG9wdGlvbnMuXHJcbiAgICovXHJcbiAgZ2V0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0TWV0aG9kID0gSHR0cFJlcXVlc3RNZXRob2QuR0VUO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmh0dHAuZ2V0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCwgcmVxdWVzdE9wdGlvbnMpXHJcbiAgICAucGlwZSgpO1xyXG5cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBleGVjdXRlIGFuIEhUVFAgW3Bvc3RdIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCB1cmwgYW5kIG9wdGlvbnMuXHJcbiAgICogQHBhcmFtIHJlcXVlc3RPcHRpb25zIHVzZSB0byBkZWZpbmUgdGhlIG9wdGlvbnMgZm9yIHRoZSBzcGVjaWZpZWQgcmVxdWVzdC5cclxuICAgKi9cclxuICBwb3N0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0TWV0aG9kID0gSHR0cFJlcXVlc3RNZXRob2QuUE9TVDtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5odHRwLnBvc3Q8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgIC5waXBlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBIVFRQIGVycm9ycyB3aGVuIGNhbGxpbmcgd2ViIGFwaShzKS5cclxuICAgKi9cclxuICBoYW5kbGVIdHRwRXJyb3IoXHJcbiAgICBlcnJvcjogYW55LFxyXG4gICAgcmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci50b1N0cmluZygpfSAke1xyXG4gICAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsXHJcbiAgICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBtZXNzYWdlKTtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xyXG4gICAgICAvKipcclxuICAgICAgICogVGhpcyBpcyBhbiBlcnJvciB0aGF0IGNvbnRhaW5zIGEgYm9keSAtIGEgW1Jlc3BvbnNlXSBmcm9tIHRoZSBhcHBsaWNhdGlvbiB3ZWIgYXBpLiBJbmNsdWRlczpcclxuICAgICAgICogMS4gSXNTdWNjZXNzXHJcbiAgICAgICAqIDIuIE1lc3NhZ2VcclxuICAgICAgICogMy4gQXJyYXkgb2YgU2VydmljZUVycm9yIGl0ZW1zXHJcbiAgICAgICAqIDQuIEV4Y2VwdGlvbiAob3B0aW9uYWwpXHJcbiAgICAgICAqL1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gZXJyb3IuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBUT0RPOiBSRVRSSUVWRSBFUlJPUiBERVRBSUxTOyBTVEFUVVMsIE1FU1NBR0U7IEVUQy4gQU5EIFBST1ZJREUgVE8gSEFORExFUjtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgIGNvbnN0IGVyciA9IDxFcnJvcj5leDtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgJHtlcnIubmFtZX07ICR7ZXJyLm1lc3NhZ2V9YDtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcj86IEVycm9yKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShlcnJvcik7XHJcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFcnJvclJlc3BvbnNlKGVycm9yPzogRXJyb3IpOiBFcnJvclJlc3BvbnNlIHtcclxuICAgIGxldCBtZXNzYWdlID0gJ1VuZXhwZWN0ZWQgZXJyb3Igd2hpbGUgcHJvY2Vzc2luZyByZXNwb25zZS4nO1xyXG4gICAgY29uc3QgcmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xyXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgbWVzc2FnZSA9IGAke2Vycm9yLm5hbWV9IC0gJHtlcnJvci5tZXNzYWdlfWA7XHJcbiAgICAgIHJlc3BvbnNlLkV4Y2VwdGlvbiA9IGVycm9yO1xyXG4gICAgfVxyXG4gICAgcmVzcG9uc2UuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==