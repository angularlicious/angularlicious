/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ServiceContext, MessageType, ServiceMessage } from '@angularlicious/rules-engine';
import { Severity } from '@angularlicious/logging';
import { ErrorResponse } from './models/error-response.model';
import { BehaviorSubject } from 'rxjs';
/**
 * Use the [ServiceBase] to provide common behavior for Angular
 * services.
 */
var /**
 * Use the [ServiceBase] to provide common behavior for Angular
 * services.
 */
ServiceBase = /** @class */ (function () {
    /**
     * Use the constructor to provide required elements to the base class.
     *
     * @param loggingService The [LoggingService] is a required dependency of this
     * class. It should be injected into any Angular Services that extend from
     * this base class. It will allow the members of the base class to log information
     * using the common LoggingService.
     */
    function ServiceBase(loggingService) {
        this.loggingService = loggingService;
        this.accessToken = '';
        this.serviceContext = new ServiceContext();
    }
    /**
     * Use to extract the contents of the HTTP body and return a JSON
     * representation of the data.
     * @param response: contains the HTTP response.
     */
    /**
     * Use to extract the contents of the HTTP body and return a JSON
     * representation of the data.
     * @param {?} response
     * @return {?}
     */
    ServiceBase.prototype.extractData = /**
     * Use to extract the contents of the HTTP body and return a JSON
     * representation of the data.
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var /** @type {?} */ body = response.json();
        return body.data || {};
    };
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
    /**
     * Use to handle an unexpected error in the application. The error should implement
     * the specified interface. The method will add a new [ServiceMessage] to the
     * specified [ServiceContext].
     * @param {?} error An unexpected application error that implements the [Error] interface.
     *
     * interface Error {
     *  name: string;
     *  message: string;
     *  stack?: string;
     * }
     * @return {?}
     */
    ServiceBase.prototype.handleUnexpectedError = /**
     * Use to handle an unexpected error in the application. The error should implement
     * the specified interface. The method will add a new [ServiceMessage] to the
     * specified [ServiceContext].
     * @param {?} error An unexpected application error that implements the [Error] interface.
     *
     * interface Error {
     *  name: string;
     *  message: string;
     *  stack?: string;
     * }
     * @return {?}
     */
    function (error) {
        var /** @type {?} */ message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        var /** @type {?} */ logItem = message.toString() + "; " + error.stack;
        this.loggingService.log(this.serviceName, Severity.Error, logItem);
        this.serviceContext.addMessage(message);
    };
    /**
     * Use to handle an error that contains a [name] and a [message].
     * @param error
     */
    /**
     * Use to handle an error that contains a [name] and a [message].
     * @param {?} error
     * @return {?}
     */
    ServiceBase.prototype.handleError = /**
     * Use to handle an error that contains a [name] and a [message].
     * @param {?} error
     * @return {?}
     */
    function (error) {
        var /** @type {?} */ message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        this.loggingService.log(this.serviceName, Severity.Error, message.toString());
        this.serviceContext.addMessage(message);
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
    ServiceBase.prototype.handleHttpError = /**
     * Use to handle HTTP errors when calling web api(s).
     * @param {?} error
     * @param {?} requestOptions
     * @return {?}
     */
    function (error, requestOptions) {
        var /** @type {?} */ message = error.toString() + " " + requestOptions.url + ", " + JSON.stringify(requestOptions.body);
        this.loggingService.log(this.serviceName, Severity.Error, message);
        if (error && error._body) {
            try {
                var /** @type {?} */ errorResponse = error.json();
                var /** @type {?} */ behaviorSubject = new BehaviorSubject(errorResponse);
                return behaviorSubject.asObservable();
            }
            catch (/** @type {?} */ error) {
                this.loggingService.log(this.serviceName, Severity.Error, error.toString());
            }
        }
        // default return behavior;
        var /** @type {?} */ response = this.createErrorResponse('Unexpected error while processing response.');
        var /** @type {?} */ subject = new BehaviorSubject(response);
        return subject.asObservable();
    };
    /**
     * Use this method to handle an error from the OAuth Provider API.
     * @param error
     * @param requestOptions
     */
    /**
     * Use this method to handle an error from the OAuth Provider API.
     * @param {?} error
     * @param {?} requestOptions
     * @return {?}
     */
    ServiceBase.prototype.handleOAuthError = /**
     * Use this method to handle an error from the OAuth Provider API.
     * @param {?} error
     * @param {?} requestOptions
     * @return {?}
     */
    function (error, requestOptions) {
        var /** @type {?} */ message = error.toString() + " " + requestOptions.url + ", " + JSON.stringify(requestOptions.body);
        this.loggingService.log(this.serviceName, Severity.Error, message);
        if (error && error._body) {
            try {
                var /** @type {?} */ errorResponse = this.createErrorResponse("Unable to validate credentials.");
                var /** @type {?} */ behaviorSubject = new BehaviorSubject(errorResponse);
                return behaviorSubject.asObservable();
            }
            catch (/** @type {?} */ e) {
                this.loggingService.log(this.serviceName, Severity.Error, e.toString());
            }
        }
        // default return behavior;
        var /** @type {?} */ response = this.createErrorResponse("Unable to validate credentials.");
        var /** @type {?} */ subject = new BehaviorSubject(response);
        return subject.asObservable();
    };
    /**
     * Use to create a new [ErrorResponse] with the specified message.
     * @param message The message for the specified [ErrorResponse].
     */
    /**
     * Use to create a new [ErrorResponse] with the specified message.
     * @param {?} message The message for the specified [ErrorResponse].
     * @return {?}
     */
    ServiceBase.prototype.createErrorResponse = /**
     * Use to create a new [ErrorResponse] with the specified message.
     * @param {?} message The message for the specified [ErrorResponse].
     * @return {?}
     */
    function (message) {
        var /** @type {?} */ response = new ErrorResponse();
        response.Message = message;
        return response;
    };
    /**
     * Use a generic method to finish service requests that return [Observables].
     * @param sourceName
     */
    /**
     * Use a generic method to finish service requests that return [Observables].
     * @param {?} sourceName
     * @return {?}
     */
    ServiceBase.prototype.finishRequest = /**
     * Use a generic method to finish service requests that return [Observables].
     * @param {?} sourceName
     * @return {?}
     */
    function (sourceName) {
        var _this = this;
        this.loggingService.log(this.serviceName, Severity.Information, "Request for [" + sourceName + "] by " + this.serviceName + " is complete.");
        if (this.serviceContext.hasErrors()) {
            this.loggingService.log(this.serviceName, Severity.Information, "Preparing to write any messages.");
            this.serviceContext.Messages.filter(function (f) { return f.MessageType === MessageType.Error && f.DisplayToUser; }).forEach(function (e) {
                return _this.loggingService.log(_this.serviceName, Severity.Error, e.toString());
            });
        }
    };
    /**
     * Use to reset the service context when you want to clear messages from the [ServiceContext]. If you want to
     * append messages from subsequent service calls, do not use this method.
     */
    /**
     * Use to reset the service context when you want to clear messages from the [ServiceContext]. If you want to
     * append messages from subsequent service calls, do not use this method.
     * @return {?}
     */
    ServiceBase.prototype.resetServiceContext = /**
     * Use to reset the service context when you want to clear messages from the [ServiceContext]. If you want to
     * append messages from subsequent service calls, do not use this method.
     * @return {?}
     */
    function () {
        this.loggingService.log(this.serviceName, Severity.Information, "Preparing to reset the Messages of the current [ServiceContext].");
        if (this.serviceContext && this.serviceContext.Messages) {
            if (this.serviceContext.Messages.length > 0) {
                this.loggingService.log(this.serviceName, Severity.Information, "Resetting the Messages of the current [ServiceContext].");
                this.serviceContext.Messages = new Array();
            }
            else {
                this.loggingService.log(this.serviceName, Severity.Information, "The current [ServiceContext] does not contain any [Messages].");
            }
        }
        else {
            this.loggingService.log(this.serviceName, Severity.Warning, "The current [ServiceContext] is not valid.");
        }
        this.loggingService.log(this.serviceName, Severity.Information, "Finished  processing request to [reset] the Messages of the current [ServiceContext].");
    };
    /**
     * Use to write the current messages contained in the [ServiceContext]. Written messages are limited
     * to items that are marked as [DisplayToUser = true].
     */
    /**
     * Use to write the current messages contained in the [ServiceContext]. Written messages are limited
     * to items that are marked as [DisplayToUser = true].
     * @return {?}
     */
    ServiceBase.prototype.writeMessages = /**
     * Use to write the current messages contained in the [ServiceContext]. Written messages are limited
     * to items that are marked as [DisplayToUser = true].
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.serviceContext && this.serviceContext.Messages) {
            this.serviceContext.Messages.forEach(function (e) {
                if (e.MessageType === MessageType.Error && e.DisplayToUser) {
                    _this.loggingService.log(_this.serviceName, Severity.Error, e.toString());
                }
            });
        }
    };
    return ServiceBase;
}());
/**
 * Use the [ServiceBase] to provide common behavior for Angular
 * services.
 */
export { ServiceBase };
function ServiceBase_tsickle_Closure_declarations() {
    /** @type {?} */
    ServiceBase.prototype.accessToken;
    /** @type {?} */
    ServiceBase.prototype.serviceName;
    /** @type {?} */
    ServiceBase.prototype.serviceContext;
    /** @type {?} */
    ServiceBase.prototype.loggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1iYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vIiwic291cmNlcyI6WyJzcmMvc2VydmljZS1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLFdBQVcsRUFDWCxjQUFjLEVBQ2YsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQWdDLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQVN2Qzs7OztBQUFBO0lBS0U7Ozs7Ozs7T0FPRztJQUNILHFCQUFtQixjQUE0QztRQUE1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBOEI7MkJBWmpELEVBQUU7OEJBRWlCLElBQUksY0FBYyxFQUFFO0tBVWM7SUFFbkU7Ozs7T0FJRzs7Ozs7OztJQUNILGlDQUFXOzs7Ozs7SUFBWCxVQUFZLFFBQWtCO1FBQzVCLHFCQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ3hCO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7Ozs7Ozs7Ozs7Ozs7O0lBQ0gsMkNBQXFCOzs7Ozs7Ozs7Ozs7O0lBQXJCLFVBQXNCLEtBQVk7UUFDaEMscUJBQU0sT0FBTyxHQUFHLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUMxRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7YUFDdkIsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7YUFDbEMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoQyxxQkFBTSxPQUFPLEdBQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFLLEtBQUssQ0FBQyxLQUFPLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxpQ0FBVzs7Ozs7SUFBWCxVQUFZLEtBQW9EO1FBQzlELHFCQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDMUQsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2FBQ3ZCLGVBQWUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO2FBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLFFBQVEsQ0FBQyxLQUFLLEVBQ2QsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUNuQixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7SUFFRDs7T0FFRzs7Ozs7OztJQUNILHFDQUFlOzs7Ozs7SUFBZixVQUNFLEtBQXNFLEVBQ3RFLGNBQThCO1FBRTlCLHFCQUFNLE9BQU8sR0FBTSxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQ2pDLGNBQWMsQ0FBQyxHQUFHLFVBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFHLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUM7Z0JBQ0gscUJBQU0sYUFBYSxHQUFrQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xELHFCQUFNLGVBQWUsR0FBeUIsSUFBSSxlQUFlLENBQy9ELGFBQWEsQ0FDZCxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkM7WUFBQyxLQUFLLENBQUMsQ0FBQyxpQkFBQSxLQUFLLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLEtBQUssRUFDZCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQ2pCLENBQUM7YUFDSDtTQUNGOztRQUdELHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQ3ZDLDZDQUE2QyxDQUM5QyxDQUFDO1FBQ0YscUJBQU0sT0FBTyxHQUF5QixJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQy9CO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILHNDQUFnQjs7Ozs7O0lBQWhCLFVBQ0UsS0FBeUIsRUFDekIsY0FBOEI7UUFFOUIscUJBQU0sT0FBTyxHQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FDakMsY0FBYyxDQUFDLEdBQUcsVUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUcsQ0FBQztRQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQztnQkFDSCxxQkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUM1QyxpQ0FBaUMsQ0FDbEMsQ0FBQztnQkFDRixxQkFBTSxlQUFlLEdBQXlCLElBQUksZUFBZSxDQUMvRCxhQUFhLENBQ2QsQ0FBQztnQkFDRixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3ZDO1lBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsQ0FBQyxFQUFFLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3pFO1NBQ0Y7O1FBR0QscUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FDdkMsaUNBQWlDLENBQ2xDLENBQUM7UUFDRixxQkFBTSxPQUFPLEdBQXlCLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDL0I7SUFFRDs7O09BR0c7Ozs7OztJQUNILHlDQUFtQjs7Ozs7SUFBbkIsVUFBb0IsT0FBZTtRQUNqQyxxQkFBTSxRQUFRLEdBQWtCLElBQUksYUFBYSxFQUFFLENBQUM7UUFDcEQsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUNqQjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsbUNBQWE7Ozs7O0lBQWIsVUFBYyxVQUFrQjtRQUFoQyxpQkFrQkM7UUFqQkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLGtCQUFnQixVQUFVLGFBQVEsSUFBSSxDQUFDLFdBQVcsa0JBQWUsQ0FDbEUsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsV0FBVyxFQUNoQixRQUFRLENBQUMsV0FBVyxFQUNwQixrQ0FBa0MsQ0FDbkMsQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDakMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBdEQsQ0FBc0QsQ0FDNUQsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUNULE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUF2RSxDQUF1RSxDQUN4RSxDQUFDO1NBQ0g7S0FDRjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gseUNBQW1COzs7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsV0FBVyxFQUNoQixRQUFRLENBQUMsV0FBVyxFQUNwQixrRUFBa0UsQ0FDbkUsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIseURBQXlELENBQzFELENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQWtCLENBQUM7YUFDNUQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIsK0RBQStELENBQ2hFLENBQUM7YUFDSDtTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLE9BQU8sRUFDaEIsNENBQTRDLENBQzdDLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsV0FBVyxFQUNoQixRQUFRLENBQUMsV0FBVyxFQUNwQix1RkFBdUYsQ0FDeEYsQ0FBQztLQUNIO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxtQ0FBYTs7Ozs7SUFBYjtRQUFBLGlCQVlDO1FBWEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsS0FBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLEtBQUssRUFDZCxDQUFDLENBQUMsUUFBUSxFQUFFLENBQ2IsQ0FBQztpQkFDSDthQUNGLENBQUMsQ0FBQztTQUNKO0tBQ0Y7c0JBcFBIO0lBcVBDLENBQUE7Ozs7O0FBcE9ELHVCQW9PQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgU2VydmljZUNvbnRleHQsXHJcbiAgTWVzc2FnZVR5cGUsXHJcbiAgU2VydmljZU1lc3NhZ2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSwgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IE9BdXRoRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL29hdXRoLWVycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vLyBpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIFtTZXJ2aWNlQmFzZV0gdG8gcHJvdmlkZSBjb21tb24gYmVoYXZpb3IgZm9yIEFuZ3VsYXJcclxuICogc2VydmljZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmljZUJhc2Uge1xyXG4gIGFjY2Vzc1Rva2VuID0gJyc7XHJcbiAgc2VydmljZU5hbWU6IHN0cmluZztcclxuICBzZXJ2aWNlQ29udGV4dDogU2VydmljZUNvbnRleHQgPSBuZXcgU2VydmljZUNvbnRleHQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBwcm92aWRlIHJlcXVpcmVkIGVsZW1lbnRzIHRvIHRoZSBiYXNlIGNsYXNzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGxvZ2dpbmdTZXJ2aWNlIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGlzIGEgcmVxdWlyZWQgZGVwZW5kZW5jeSBvZiB0aGlzXHJcbiAgICogY2xhc3MuIEl0IHNob3VsZCBiZSBpbmplY3RlZCBpbnRvIGFueSBBbmd1bGFyIFNlcnZpY2VzIHRoYXQgZXh0ZW5kIGZyb21cclxuICAgKiB0aGlzIGJhc2UgY2xhc3MuIEl0IHdpbGwgYWxsb3cgdGhlIG1lbWJlcnMgb2YgdGhlIGJhc2UgY2xhc3MgdG8gbG9nIGluZm9ybWF0aW9uXHJcbiAgICogdXNpbmcgdGhlIGNvbW1vbiBMb2dnaW5nU2VydmljZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBleHRyYWN0IHRoZSBjb250ZW50cyBvZiB0aGUgSFRUUCBib2R5IGFuZCByZXR1cm4gYSBKU09OXHJcbiAgICogcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEuXHJcbiAgICogQHBhcmFtIHJlc3BvbnNlOiBjb250YWlucyB0aGUgSFRUUCByZXNwb25zZS5cclxuICAgKi9cclxuICBleHRyYWN0RGF0YShyZXNwb25zZTogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGJvZHkgPSByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gYm9keS5kYXRhIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBhbiB1bmV4cGVjdGVkIGVycm9yIGluIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGVycm9yIHNob3VsZCBpbXBsZW1lbnRcclxuICAgKiB0aGUgc3BlY2lmaWVkIGludGVyZmFjZS4gVGhlIG1ldGhvZCB3aWxsIGFkZCBhIG5ldyBbU2VydmljZU1lc3NhZ2VdIHRvIHRoZVxyXG4gICAqIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxyXG4gICAqIEBwYXJhbSBlcnJvciBBbiB1bmV4cGVjdGVkIGFwcGxpY2F0aW9uIGVycm9yIHRoYXQgaW1wbGVtZW50cyB0aGUgW0Vycm9yXSBpbnRlcmZhY2UuXHJcbiAgICpcclxuICAgKiBpbnRlcmZhY2UgRXJyb3Ige1xyXG4gICAqICBuYW1lOiBzdHJpbmc7XHJcbiAgICogIG1lc3NhZ2U6IHN0cmluZztcclxuICAgKiAgc3RhY2s/OiBzdHJpbmc7XHJcbiAgICogfVxyXG4gICAqL1xyXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcclxuICAgICAgLldpdGhEaXNwbGF5VG9Vc2VyKHRydWUpXHJcbiAgICAgIC5XaXRoTWVzc2FnZVR5cGUoTWVzc2FnZVR5cGUuRXJyb3IpXHJcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xyXG5cclxuICAgIGNvbnN0IGxvZ0l0ZW0gPSBgJHttZXNzYWdlLnRvU3RyaW5nKCl9OyAke2Vycm9yLnN0YWNrfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbG9nSXRlbSk7XHJcblxyXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBhbiBlcnJvciB0aGF0IGNvbnRhaW5zIGEgW25hbWVdIGFuZCBhIFttZXNzYWdlXS5cclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKi9cclxuICBoYW5kbGVFcnJvcihlcnJvcjogeyBuYW1lOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCB9KTogdm9pZCB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgIC5XaXRoRGlzcGxheVRvVXNlcih0cnVlKVxyXG4gICAgICAuV2l0aE1lc3NhZ2VUeXBlKE1lc3NhZ2VUeXBlLkVycm9yKVxyXG4gICAgICAuV2l0aFNvdXJjZSh0aGlzLnNlcnZpY2VOYW1lKTtcclxuXHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgIG1lc3NhZ2UudG9TdHJpbmcoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIEhUVFAgZXJyb3JzIHdoZW4gY2FsbGluZyB3ZWIgYXBpKHMpLlxyXG4gICAqL1xyXG4gIGhhbmRsZUh0dHBFcnJvcihcclxuICAgIGVycm9yOiB7IHRvU3RyaW5nOiAoKSA9PiB2b2lkOyBfYm9keTogYW55OyBqc29uOiAoKSA9PiBFcnJvclJlc3BvbnNlIH0sXHJcbiAgICByZXF1ZXN0T3B0aW9uczogUmVxdWVzdE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcclxuICAgICAgcmVxdWVzdE9wdGlvbnMudXJsXHJcbiAgICB9LCAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RPcHRpb25zLmJvZHkpfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICBpZiAoZXJyb3IgJiYgZXJyb3IuX2JvZHkpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gZXJyb3IuanNvbigpO1xyXG4gICAgICAgIGNvbnN0IGJlaGF2aW9yU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxyXG4gICAgICAgICAgZXJyb3JSZXNwb25zZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGJlaGF2aW9yU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICAgIGVycm9yLnRvU3RyaW5nKClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVmYXVsdCByZXR1cm4gYmVoYXZpb3I7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcclxuICAgICAgJ1VuZXhwZWN0ZWQgZXJyb3Igd2hpbGUgcHJvY2Vzc2luZyByZXNwb25zZS4nXHJcbiAgICApO1xyXG4gICAgY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcclxuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGhhbmRsZSBhbiBlcnJvciBmcm9tIHRoZSBPQXV0aCBQcm92aWRlciBBUEkuXHJcbiAgICogQHBhcmFtIGVycm9yXHJcbiAgICogQHBhcmFtIHJlcXVlc3RPcHRpb25zXHJcbiAgICovXHJcbiAgaGFuZGxlT0F1dGhFcnJvcihcclxuICAgIGVycm9yOiBPQXV0aEVycm9yUmVzcG9uc2UsXHJcbiAgICByZXF1ZXN0T3B0aW9uczogUmVxdWVzdE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcclxuICAgICAgcmVxdWVzdE9wdGlvbnMudXJsXHJcbiAgICB9LCAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RPcHRpb25zLmJvZHkpfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICBpZiAoZXJyb3IgJiYgZXJyb3IuX2JvZHkpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKFxyXG4gICAgICAgICAgYFVuYWJsZSB0byB2YWxpZGF0ZSBjcmVkZW50aWFscy5gXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBiZWhhdmlvclN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgICAgICAgIGVycm9yUmVzcG9uc2VcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBiZWhhdmlvclN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZS50b1N0cmluZygpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRlZmF1bHQgcmV0dXJuIGJlaGF2aW9yO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2UoXHJcbiAgICAgIGBVbmFibGUgdG8gdmFsaWRhdGUgY3JlZGVudGlhbHMuYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XHJcbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBuZXcgW0Vycm9yUmVzcG9uc2VdIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIGZvciB0aGUgc3BlY2lmaWVkIFtFcnJvclJlc3BvbnNlXS5cclxuICAgKi9cclxuICBjcmVhdGVFcnJvclJlc3BvbnNlKG1lc3NhZ2U6IHN0cmluZyk6IEVycm9yUmVzcG9uc2Uge1xyXG4gICAgY29uc3QgcmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xyXG4gICAgcmVzcG9uc2UuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgYSBnZW5lcmljIG1ldGhvZCB0byBmaW5pc2ggc2VydmljZSByZXF1ZXN0cyB0aGF0IHJldHVybiBbT2JzZXJ2YWJsZXNdLlxyXG4gICAqIEBwYXJhbSBzb3VyY2VOYW1lXHJcbiAgICovXHJcbiAgZmluaXNoUmVxdWVzdChzb3VyY2VOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFJlcXVlc3QgZm9yIFske3NvdXJjZU5hbWV9XSBieSAke3RoaXMuc2VydmljZU5hbWV9IGlzIGNvbXBsZXRlLmBcclxuICAgICk7XHJcbiAgICBpZiAodGhpcy5zZXJ2aWNlQ29udGV4dC5oYXNFcnJvcnMoKSkge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgIGBQcmVwYXJpbmcgdG8gd3JpdGUgYW55IG1lc3NhZ2VzLmBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5maWx0ZXIoXHJcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvciAmJiBmLkRpc3BsYXlUb1VzZXJcclxuICAgICAgKS5mb3JFYWNoKGUgPT5cclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZS50b1N0cmluZygpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlc2V0IHRoZSBzZXJ2aWNlIGNvbnRleHQgd2hlbiB5b3Ugd2FudCB0byBjbGVhciBtZXNzYWdlcyBmcm9tIHRoZSBbU2VydmljZUNvbnRleHRdLiBJZiB5b3Ugd2FudCB0b1xyXG4gICAqIGFwcGVuZCBtZXNzYWdlcyBmcm9tIHN1YnNlcXVlbnQgc2VydmljZSBjYWxscywgZG8gbm90IHVzZSB0aGlzIG1ldGhvZC5cclxuICAgKi9cclxuICByZXNldFNlcnZpY2VDb250ZXh0KCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIHJlc2V0IHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcclxuICAgICk7XHJcbiAgICBpZiAodGhpcy5zZXJ2aWNlQ29udGV4dCAmJiB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzKSB7XHJcbiAgICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICAgIGBSZXNldHRpbmcgdGhlIE1lc3NhZ2VzIG9mIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0uYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcyA9IG5ldyBBcnJheTxTZXJ2aWNlTWVzc2FnZT4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICAgIGBUaGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGRvZXMgbm90IGNvbnRhaW4gYW55IFtNZXNzYWdlc10uYFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuV2FybmluZyxcclxuICAgICAgICBgVGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XSBpcyBub3QgdmFsaWQuYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgRmluaXNoZWQgIHByb2Nlc3NpbmcgcmVxdWVzdCB0byBbcmVzZXRdIHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gd3JpdGUgdGhlIGN1cnJlbnQgbWVzc2FnZXMgY29udGFpbmVkIGluIHRoZSBbU2VydmljZUNvbnRleHRdLiBXcml0dGVuIG1lc3NhZ2VzIGFyZSBsaW1pdGVkXHJcbiAgICogdG8gaXRlbXMgdGhhdCBhcmUgbWFya2VkIGFzIFtEaXNwbGF5VG9Vc2VyID0gdHJ1ZV0uXHJcbiAgICovXHJcbiAgd3JpdGVNZXNzYWdlcygpIHtcclxuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0ICYmIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMpIHtcclxuICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgIGlmIChlLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvciAmJiBlLkRpc3BsYXlUb1VzZXIpIHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICAgICAgZS50b1N0cmluZygpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==