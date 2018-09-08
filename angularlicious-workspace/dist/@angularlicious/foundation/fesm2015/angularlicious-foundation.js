import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularliciousLoggingModule, Severity, AngularliciousLoggingService } from '@angularlicious/logging';
import { AngularliciousRulesEngineModule, ServiceContext, MessageType, ServiceMessage, CompositeRule } from '@angularlicious/rules-engine';
import { BehaviorSubject, Observable } from 'rxjs';
import { Action, ActionResult } from '@angularlicious/actions';
import { NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularliciousFoundationModule {
}
AngularliciousFoundationModule.decorators = [
    { type: NgModule, args: [{
                imports: [AngularliciousLoggingModule, CommonModule, AngularliciousRulesEngineModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ErrorResponse {
    constructor() {
        this.IsSuccess = false;
        this.Errors = new Array();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the [ServiceBase] to provide common behavior for Angular
 * services.
 */
class ServiceBase {
    /**
     * Use the constructor to provide required elements to the base class.
     *
     * @param {?} loggingService The [LoggingService] is a required dependency of this
     * class. It should be injected into any Angular Services that extend from
     * this base class. It will allow the members of the base class to log information
     * using the common LoggingService.
     */
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.accessToken = '';
        this.serviceContext = new ServiceContext();
    }
    /**
     * Use to extract the contents of the HTTP body and return a JSON
     * representation of the data.
     * @param {?} response
     * @return {?}
     */
    extractData(response) {
        const /** @type {?} */ body = response.json();
        return body || {};
    }
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
    handleUnexpectedError(error) {
        const /** @type {?} */ message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        const /** @type {?} */ logItem = `${message.toString()}; ${error.stack}`;
        this.loggingService.log(this.serviceName, Severity.Error, logItem);
        this.serviceContext.addMessage(message);
    }
    /**
     * Use to handle an error that contains a [name] and a [message].
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        const /** @type {?} */ message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        this.loggingService.log(this.serviceName, Severity.Error, message.toString());
        this.serviceContext.addMessage(message);
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
            try {
                const /** @type {?} */ errorResponse = error.json();
                const /** @type {?} */ behaviorSubject = new BehaviorSubject(errorResponse);
                return behaviorSubject.asObservable();
            }
            catch (/** @type {?} */ error) {
                this.loggingService.log(this.serviceName, Severity.Error, error.toString());
            }
        }
        // default return behavior;
        const /** @type {?} */ response = this.createErrorResponse('Unexpected error while processing response.');
        const /** @type {?} */ subject = new BehaviorSubject(response);
        return subject.asObservable();
    }
    /**
     * Use this method to handle an error from the OAuth Provider API.
     * @param {?} error
     * @param {?} requestOptions
     * @return {?}
     */
    handleOAuthError(error, requestOptions) {
        const /** @type {?} */ message = `${error.toString()} ${requestOptions.requestUrl}, ${JSON.stringify(requestOptions.body)}`;
        this.loggingService.log(this.serviceName, Severity.Error, message);
        if (error && error._body) {
            try {
                const /** @type {?} */ errorResponse = this.createErrorResponse(`Unable to validate credentials.`);
                const /** @type {?} */ behaviorSubject = new BehaviorSubject(errorResponse);
                return behaviorSubject.asObservable();
            }
            catch (/** @type {?} */ e) {
                this.loggingService.log(this.serviceName, Severity.Error, e.toString());
            }
        }
        // default return behavior;
        const /** @type {?} */ response = this.createErrorResponse(`Unable to validate credentials.`);
        const /** @type {?} */ subject = new BehaviorSubject(response);
        return subject.asObservable();
    }
    /**
     * Use to create a new [ErrorResponse] with the specified message.
     * @param {?} message The message for the specified [ErrorResponse].
     * @return {?}
     */
    createErrorResponse(message) {
        const /** @type {?} */ response = new ErrorResponse();
        response.Message = message;
        return response;
    }
    /**
     * Use a generic method to finish service requests that return [Observables].
     * @param {?} sourceName
     * @return {?}
     */
    finishRequest(sourceName) {
        this.loggingService.log(this.serviceName, Severity.Information, `Request for [${sourceName}] by ${this.serviceName} is complete.`);
        if (this.serviceContext.hasErrors()) {
            this.loggingService.log(this.serviceName, Severity.Information, `Preparing to write any messages.`);
            this.serviceContext.Messages.filter(f => f.MessageType === MessageType.Error && f.DisplayToUser).forEach(e => this.loggingService.log(this.serviceName, Severity.Error, e.toString()));
        }
    }
    /**
     * Use to reset the service context when you want to clear messages from the [ServiceContext]. If you want to
     * append messages from subsequent service calls, do not use this method.
     * @return {?}
     */
    resetServiceContext() {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to reset the Messages of the current [ServiceContext].`);
        if (this.serviceContext && this.serviceContext.Messages) {
            if (this.serviceContext.Messages.length > 0) {
                this.loggingService.log(this.serviceName, Severity.Information, `Resetting the Messages of the current [ServiceContext].`);
                this.serviceContext.Messages = new Array();
            }
            else {
                this.loggingService.log(this.serviceName, Severity.Information, `The current [ServiceContext] does not contain any [Messages].`);
            }
        }
        else {
            this.loggingService.log(this.serviceName, Severity.Warning, `The current [ServiceContext] is not valid.`);
        }
        this.loggingService.log(this.serviceName, Severity.Information, `Finished  processing request to [reset] the Messages of the current [ServiceContext].`);
    }
    /**
     * Use to write the current messages contained in the [ServiceContext]. Written messages are limited
     * to items that are marked as [DisplayToUser = true].
     * @return {?}
     */
    writeMessages() {
        if (this.serviceContext && this.serviceContext.Messages) {
            this.serviceContext.Messages.forEach(e => {
                if (e.MessageType === MessageType.Error && e.DisplayToUser) {
                    this.loggingService.log(this.serviceName, Severity.Error, e.toString());
                }
            });
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This is the application's base Action class that provides implementation of pipeline methods - pre/post
 * execution methods.
 *
 * The pre-execute methods that can be implemented are:
 * 		1. start();
 * 		2. audit();
 * 		3. preValidateAction();
 * 		4. evaluateRules();
 * 		5. postValidateAction();
 * 		6. preExecuteAction();
 *
 * If the status of action is good, the business logic will be executed using the:
 * 		1. processAction();
 *
 * The post-execution methods that can be implemented are:
 * 		1. postExecuteAction();
 * 		2. validateActionResult();
 * 		3. finish();
 */
class ActionBase extends Action {
    /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     * @return {?}
     */
    validateAction() {
        return this.validationContext.renderRules();
    }
    /**
     * @return {?}
     */
    postValidateAction() {
        this.loggingService.log(this.actionName, Severity.Information, `Preparing to determine if the action contains validation errors in ${this.actionName}`);
        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, Severity.Information, `The target contains validation errors in ${this.actionName}`);
            // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
            this.validationContext.results.forEach(result => {
                if (!result.isValid) {
                    this.publishRuleResult(result);
                    this.retrieveRuleDetails(result);
                }
            });
        }
    }
    /**
     * @return {?}
     */
    postExecuteAction() {
        if (this.actionResult === ActionResult.Fail) {
            this.serviceContext.Messages.forEach(e => {
                if (e.MessageType === MessageType.Error) {
                    this.loggingService.log(this.actionName, Severity.Error, e.toString());
                }
            });
        }
    }
    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     * @return {?}
     */
    validateActionResult() {
        this.loggingService.log(this.actionName, Severity.Information, `Running [validateActionResult] for ${this.actionName}.`);
        // determine the status of the action based on any rule violations;
        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, Severity.Error, `The ${this.actionName} contains rule violations.`);
            this.actionResult = ActionResult.Fail;
            const /** @type {?} */ errorResponse = new ErrorResponse();
            errorResponse.IsSuccess = false;
            errorResponse.Message = `Validation errors exist.`;
            this.response = Observable.throw(errorResponse);
        }
        this.actionResult = this.serviceContext.isGood()
            ? ActionResult.Success
            : ActionResult.Fail;
        return this.actionResult;
    }
    /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param {?} ruleResult The result of a rendered rule.
     * @return {?}
     */
    retrieveRuleDetails(ruleResult) {
        if (ruleResult.rulePolicy instanceof CompositeRule) {
            const /** @type {?} */ composite = /** @type {?} */ (ruleResult.rulePolicy);
            if (composite && composite.hasErrors) {
                const /** @type {?} */ errors = composite.results.filter(result => !result.isValid && result.rulePolicy.isDisplayable);
                errors.forEach(errorResult => {
                    this.publishRuleResult(errorResult);
                    if (errorResult.rulePolicy instanceof CompositeRule) {
                        this.retrieveRuleDetails(errorResult);
                    }
                });
            }
        }
    }
    /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param {?} ruleResult
     * @return {?}
     */
    publishRuleResult(ruleResult) {
        const /** @type {?} */ serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
        serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
        serviceMessage.Source = this.actionName;
        this.serviceContext.Messages.push(serviceMessage);
        this.loggingService.log(this.actionName, Severity.Error, `${serviceMessage.toString()}`);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the business provider base class to access common elements of the business provider.
 *
 * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
 */
class BusinessProviderBase {
    /**
     * @param {?} loggingService
     */
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.loggingService.log(this.serviceName, Severity.Information, `Running constructor for the [BusinessProviderBase].`);
    }
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
    handleUnexpectedError(error) {
        const /** @type {?} */ message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        const /** @type {?} */ logItem = `${message.toString()}; ${error.stack}`;
        this.loggingService.log(this.serviceName, Severity.Error, logItem);
        this.serviceContext.addMessage(message);
    }
    /**
     * @param {?} sourceName
     * @return {?}
     */
    finishRequest(sourceName) {
        this.loggingService.log(this.serviceName, Severity.Information, `Request for [${sourceName}] by ${this.serviceName} is complete.`);
        if (this.serviceContext.hasErrors()) {
            this.loggingService.log(this.serviceName, Severity.Information, `Preparing to write out the errors.`);
            this.serviceContext.Messages.filter(f => f.DisplayToUser && f.MessageType === MessageType.Error).forEach(e => this.loggingService.log(this.serviceName, Severity.Error, e.toString()));
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to provide the alert type information for the AlertNotification and AlertComponent.
 */
class AlertTypes {
}
AlertTypes.Information = 'alert-info';
AlertTypes.Warning = 'alert-warning';
AlertTypes.Danger = 'alert-danger';
AlertTypes.Success = 'alert-success';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AlertNotification {
    /**
     * @param {?} header
     * @param {?} title
     * @param {?=} messages
     * @param {?=} type
     */
    constructor(header, title, messages, type) {
        this.type = AlertTypes.Information;
        this.messages = new Array();
        this.showAlert = false;
        if (type) {
            this.type = type;
        }
        this.header = header;
        this.title = title;
        if (messages) {
            this.messages = messages;
        }
        if (this.header && this.title) {
            this.showAlert = true; // used to trigger the display of the notification.
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ComponentBase {
    /**
     * @param {?} componentName
     * @param {?} loggingService
     * @param {?} router
     */
    constructor(componentName, loggingService, router) {
        this.loggingService = loggingService;
        this.router = router;
        this.componentName = componentName;
        this.alertNotification = new AlertNotification('', '');
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.googleAnalyticsPageview(event);
            }
        });
        // const routerEvent = this.router.events.filter(
        //   event => event instanceof NavigationEnd
        // );
        // if (routerEvent && routerEvent instanceof NavigationEnd) {
        //   this.googleAnalyticsPageview(routerEvent);
        // }
    }
    /**
     * Use to send an analytic event to [Google Analytics].
     * @param {?} category A category is a name that you supply as a way to group objects that you want to track. Typically, you will use the same category name multiple times over related UI elements that you want to group under a given category.
     * @param {?} action Use the action parameter to name the type of event or interaction you want to track for a particular web object (i.e., play, stop, pause, download). A unique event is determined by a unique action name. You can use duplicate action names across categories, but this can affect how unique events are calculated. See the suggestions below and the Implicit Count section for more details.
     * @param {?} label Provide additional information for events that you want to track, such as the movie title in the video examples above, or the name of a file when tracking downloads. All labels are listed independently from their parent categories and actions. This provides you with another useful way to segment the event data for your reports. All labels are listed independently from their parent categories and actions. This provides you with another useful way to segment the event data for your reports.
     * @param {?} value Any numeric value indicating a [value] that will be summarized for the analytic item(s).
     *
     * More information at: https://support.google.com/analytics/answer/1033068
     * or https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     * @return {?}
     */
    googleAnalyticsSendEvent(category, action, label, value) {
        (/** @type {?} */ (window)).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    googleAnalyticsPageview(event) {
        if (event && event.urlAfterRedirects) {
            this.loggingService.log(this.componentName, Severity.Information, `Preparing to set [Google Analytics] page view for [${event.urlAfterRedirects}].`);
            // (<any>window).ga('set', 'page', event.urlAfterRedirects);
            // (<any>window).ga('send', 'pageview');
            // ga('create', 'UA-110194344-1', 'auto', this.componentName);
            // ga(`${this.componentName}.send`, 'pageview');
            // https://blog.thecodecampus.de/angular-2-google-analytics-google-tag-manager/
            // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
            const /** @type {?} */ GA_TRACKING_ID = 'UA-110194344-1';
            // gtag('config', 'GA_TRACKING_ID', {<pageview_parameters>});
            (/** @type {?} */ (window)).ga('config', GA_TRACKING_ID, {
                page_title: this.componentName,
                page_path: event.urlAfterRedirects
            });
        }
        else {
            this.loggingService.log(this.componentName, Severity.Warning, `Failed to set [Google Analytics] page view.`);
        }
    }
    /**
     * Use to create a simple [ErrorResponse] with the specified message.
     * @param {?} message The message to display to the user.
     * @return {?}
     */
    createErrorResponse(message) {
        this.loggingService.log(this.componentName, Severity.Information, `Preparing to create error response for component.`);
        const /** @type {?} */ errorResponse = new ErrorResponse();
        errorResponse.Message = message;
        return errorResponse;
    }
    /**
     * Use to handle service errors. These are error response [See: ErrorResponse] from
     * the application business layers (Action(s) or Http) that will bubble up to the
     * caller (i.e., a component) in a specified format:
     *
     * IsSuccess: boolean = false; // default for ErrorResponse
     * Message: string;
     * Errors: Array<ServiceError> = new Array<ServiceError>();
     * Exception: any;
     * @param {?} errorResponse
     * @param {?=} serviceContext
     * @return {?}
     */
    handleServiceErrors(errorResponse, serviceContext) {
        this.loggingService.log(this.componentName, Severity.Information, `Preparing to handle service errors for component.`);
        if (serviceContext && serviceContext.hasErrors()) {
            this.loggingService.log(this.componentName, Severity.Information, `Retrieving error messages from the ServiceContext/ValidationContext;`);
            const /** @type {?} */ messages = this.retrieveServiceContextErrorMessages(serviceContext);
            this.alertNotification = new AlertNotification('Errors', errorResponse.Message, messages, AlertTypes.Warning);
        }
        else {
            if (errorResponse && errorResponse.Message) {
                this.loggingService.log(this.componentName, Severity.Information, `Retrieving error messages from the [ErrorResponse].`);
                const /** @type {?} */ errors = this.retrieveResponseErrorMessages(errorResponse);
                this.alertNotification = new AlertNotification('Error', errorResponse.Message, errors, AlertTypes.Warning);
                this.loggingService.log(this.componentName, Severity.Error, `Error: ${errorResponse.Message}`);
            }
        }
    }
    /**
     * Use to retrieve the error messages from the specified [ServiceContext].
     *
     * \@parm: serviceContext: A context object containing messages for the specified request.
     * @param {?} serviceContext
     * @return {?}
     */
    retrieveServiceContextErrorMessages(serviceContext) {
        const /** @type {?} */ messages = Array();
        serviceContext.Messages.forEach(e => {
            if (e.MessageType === MessageType.Error && e.DisplayToUser) {
                messages.push(e.Message);
            }
        });
        return messages;
    }
    /**
     * Use to retrieve the error messages from the specified Web API response.
     * @param {?} errorResponse
     * @return {?}
     */
    retrieveResponseErrorMessages(errorResponse) {
        const /** @type {?} */ errors = new Array();
        if (errorResponse && errorResponse.Errors) {
            errorResponse.Errors.forEach(e => {
                if (e.DisplayToUser) {
                    errors.push(e.Message);
                }
            });
        }
        return errors;
    }
    /**
     * Use to reset the [AlertNotification] to the initial state. Removes
     * existing messages and hides the AlertComponent.
     * @return {?}
     */
    resetAlertNotifications() {
        this.alertNotification = new AlertNotification('', '');
    }
    /**
     * Use to navigate to the specified route.
     * \@parm routeName The name of the target route.
     * @param {?} routeName
     * @return {?}
     */
    routeTo(routeName) {
        try {
            this.router.navigate([routeName]);
        }
        catch (/** @type {?} */ error) {
            this.loggingService.log(this.componentName, Severity.Error, `Error while attempting to navigate to [${routeName}] route from ${this.componentName}. Error: ${error.toString()}`);
        }
    }
    /**
     * Use to retrieve and show any response error messages.
     * @param {?} response
     * @return {?}
     */
    showResponseErrors(response) {
        this.handleServiceErrors(response, undefined);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    finishRequest(message) {
        this.loggingService.log(this.componentName, Severity.Information, `${this.componentName}: ${message}`);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    showAlertMessage(message) {
        alert(message);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HttpRequestOptions {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const HttpRequestMethod = {
    GET: 0,
    POST: 1,
    PUT: 2,
    DELETE: 3,
    OPTIONS: 4,
    HEAD: 5,
    PATCH: 6,
};
HttpRequestMethod[HttpRequestMethod.GET] = "GET";
HttpRequestMethod[HttpRequestMethod.POST] = "POST";
HttpRequestMethod[HttpRequestMethod.PUT] = "PUT";
HttpRequestMethod[HttpRequestMethod.DELETE] = "DELETE";
HttpRequestMethod[HttpRequestMethod.OPTIONS] = "OPTIONS";
HttpRequestMethod[HttpRequestMethod.HEAD] = "HEAD";
HttpRequestMethod[HttpRequestMethod.PATCH] = "PATCH";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to create and execute HTTP service requests.
 * 1. Create HttpHeaders
 * 2. Create RequestOptions
 * 3. Execute Request
 */
class HttpBaseService {
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
        const /** @type {?} */ headers = new HttpHeaders();
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
        const /** @type {?} */ headers = new HttpHeaders({
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
        const /** @type {?} */ response = this.http
            .get(requestOptions.requestUrl, requestOptions)
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
        const /** @type {?} */ response = this.http
            .post(requestOptions.requestUrl, requestOptions)
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
    { type: HttpClient, },
    { type: AngularliciousLoggingService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this model to represent service error/message information from the
 * application's service APIs.
 *
 * The DisplayToUser boolean value indicates whether the message should be
 * displayed to the user if desired.
 */
class ServiceError {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ServiceResponse {
    constructor() {
        this.Errors = new Array();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AngularliciousFoundationModule, ServiceBase, ActionBase, BusinessProviderBase, ComponentBase, HttpBaseService, ErrorResponse, ServiceError, ServiceResponse, AlertNotification, AlertTypes, HttpRequestOptions, HttpRequestMethod };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtZm91bmRhdGlvbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL2ZvdW5kYXRpb24ubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvc2VydmljZS1iYXNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvYWN0aW9uLWJhc2UuYWN0aW9uLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cy50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9hbGVydC1ub3RpZmljYXRpb24ubW9kZWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9jb21wb25lbnQtYmFzZS5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9odHRwLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsIENvbW1vbk1vZHVsZSwgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzRm91bmRhdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9zZXJ2aWNlLWVycm9yLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIEVycm9yUmVzcG9uc2Uge1xuICBJc1N1Y2Nlc3MgPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxuICBNZXNzYWdlOiBzdHJpbmc7XG4gIEVycm9yczogQXJyYXk8U2VydmljZUVycm9yPiA9IG5ldyBBcnJheTxTZXJ2aWNlRXJyb3I+KCk7XG4gIEV4Y2VwdGlvbjogRXJyb3I7XG59XG4iLCJpbXBvcnQge1xuICBTZXJ2aWNlQ29udGV4dCxcbiAgTWVzc2FnZVR5cGUsXG4gIFNlcnZpY2VNZXNzYWdlXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHtcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgU2V2ZXJpdHlcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcbmltcG9ydCB7IE9BdXRoRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL29hdXRoLWVycm9yLXJlc3BvbnNlLm1vZGVsJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLy8gaW1wb3J0IHsgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4vLyBpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9odHRwLXJlcXVlc3Qtb3B0aW9ucyc7XG5cbi8qKlxuICogVXNlIHRoZSBbU2VydmljZUJhc2VdIHRvIHByb3ZpZGUgY29tbW9uIGJlaGF2aW9yIGZvciBBbmd1bGFyXG4gKiBzZXJ2aWNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZpY2VCYXNlIHtcbiAgYWNjZXNzVG9rZW4gPSAnJztcbiAgc2VydmljZU5hbWU6IHN0cmluZztcbiAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0ID0gbmV3IFNlcnZpY2VDb250ZXh0KCk7XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gcHJvdmlkZSByZXF1aXJlZCBlbGVtZW50cyB0byB0aGUgYmFzZSBjbGFzcy5cbiAgICpcbiAgICogQHBhcmFtIGxvZ2dpbmdTZXJ2aWNlIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGlzIGEgcmVxdWlyZWQgZGVwZW5kZW5jeSBvZiB0aGlzXG4gICAqIGNsYXNzLiBJdCBzaG91bGQgYmUgaW5qZWN0ZWQgaW50byBhbnkgQW5ndWxhciBTZXJ2aWNlcyB0aGF0IGV4dGVuZCBmcm9tXG4gICAqIHRoaXMgYmFzZSBjbGFzcy4gSXQgd2lsbCBhbGxvdyB0aGUgbWVtYmVycyBvZiB0aGUgYmFzZSBjbGFzcyB0byBsb2cgaW5mb3JtYXRpb25cbiAgICogdXNpbmcgdGhlIGNvbW1vbiBMb2dnaW5nU2VydmljZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSkge31cblxuICAvKipcbiAgICogVXNlIHRvIGV4dHJhY3QgdGhlIGNvbnRlbnRzIG9mIHRoZSBIVFRQIGJvZHkgYW5kIHJldHVybiBhIEpTT05cbiAgICogcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEuXG4gICAqIEBwYXJhbSByZXNwb25zZTogY29udGFpbnMgdGhlIEhUVFAgcmVzcG9uc2UuXG4gICAqL1xuICBleHRyYWN0RGF0YShyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgICBjb25zdCBib2R5ID0gcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBib2R5IHx8IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBoYW5kbGUgYW4gdW5leHBlY3RlZCBlcnJvciBpbiB0aGUgYXBwbGljYXRpb24uIFRoZSBlcnJvciBzaG91bGQgaW1wbGVtZW50XG4gICAqIHRoZSBzcGVjaWZpZWQgaW50ZXJmYWNlLiBUaGUgbWV0aG9kIHdpbGwgYWRkIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlXG4gICAqIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxuICAgKiBAcGFyYW0gZXJyb3IgQW4gdW5leHBlY3RlZCBhcHBsaWNhdGlvbiBlcnJvciB0aGF0IGltcGxlbWVudHMgdGhlIFtFcnJvcl0gaW50ZXJmYWNlLlxuICAgKlxuICAgKiBpbnRlcmZhY2UgRXJyb3Ige1xuICAgKiAgbmFtZTogc3RyaW5nO1xuICAgKiAgbWVzc2FnZTogc3RyaW5nO1xuICAgKiAgc3RhY2s/OiBzdHJpbmc7XG4gICAqIH1cbiAgICovXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpXG4gICAgICAuV2l0aERpc3BsYXlUb1VzZXIodHJ1ZSlcbiAgICAgIC5XaXRoTWVzc2FnZVR5cGUoTWVzc2FnZVR5cGUuRXJyb3IpXG4gICAgICAuV2l0aFNvdXJjZSh0aGlzLnNlcnZpY2VOYW1lKTtcblxuICAgIGNvbnN0IGxvZ0l0ZW0gPSBgJHttZXNzYWdlLnRvU3RyaW5nKCl9OyAke2Vycm9yLnN0YWNrfWA7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGxvZ0l0ZW0pO1xuXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBoYW5kbGUgYW4gZXJyb3IgdGhhdCBjb250YWlucyBhIFtuYW1lXSBhbmQgYSBbbWVzc2FnZV0uXG4gICAqIEBwYXJhbSBlcnJvclxuICAgKi9cbiAgaGFuZGxlRXJyb3IoZXJyb3I6IHsgbmFtZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQgfSk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcbiAgICAgIC5XaXRoRGlzcGxheVRvVXNlcih0cnVlKVxuICAgICAgLldpdGhNZXNzYWdlVHlwZShNZXNzYWdlVHlwZS5FcnJvcilcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xuXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuRXJyb3IsXG4gICAgICBtZXNzYWdlLnRvU3RyaW5nKClcbiAgICApO1xuXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBoYW5kbGUgSFRUUCBlcnJvcnMgd2hlbiBjYWxsaW5nIHdlYiBhcGkocykuXG4gICAqL1xuICBoYW5kbGVIdHRwRXJyb3IoXG4gICAgZXJyb3I6IHsgdG9TdHJpbmc6ICgpID0+IHZvaWQ7IF9ib2R5OiBhbnk7IGpzb246ICgpID0+IEVycm9yUmVzcG9uc2UgfSxcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcbiAgICB9LCAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RPcHRpb25zLmJvZHkpfWA7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IGVycm9yLmpzb24oKTtcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXG4gICAgICAgICAgZXJyb3JSZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgICBTZXZlcml0eS5FcnJvcixcbiAgICAgICAgICBlcnJvci50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmYXVsdCByZXR1cm4gYmVoYXZpb3I7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2UoXG4gICAgICAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLidcbiAgICApO1xuICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGhhbmRsZSBhbiBlcnJvciBmcm9tIHRoZSBPQXV0aCBQcm92aWRlciBBUEkuXG4gICAqIEBwYXJhbSBlcnJvclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnNcbiAgICovXG4gIGhhbmRsZU9BdXRoRXJyb3IoXG4gICAgZXJyb3I6IE9BdXRoRXJyb3JSZXNwb25zZSxcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcbiAgICB9LCAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RPcHRpb25zLmJvZHkpfWA7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcbiAgICAgICAgICBgVW5hYmxlIHRvIHZhbGlkYXRlIGNyZWRlbnRpYWxzLmBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXG4gICAgICAgICAgZXJyb3JSZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZS50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0IHJldHVybiBiZWhhdmlvcjtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcbiAgICAgIGBVbmFibGUgdG8gdmFsaWRhdGUgY3JlZGVudGlhbHMuYFxuICAgICk7XG4gICAgY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gY3JlYXRlIGEgbmV3IFtFcnJvclJlc3BvbnNlXSB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgZm9yIHRoZSBzcGVjaWZpZWQgW0Vycm9yUmVzcG9uc2VdLlxuICAgKi9cbiAgY3JlYXRlRXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcpOiBFcnJvclJlc3BvbnNlIHtcbiAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XG4gICAgcmVzcG9uc2UuTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSBhIGdlbmVyaWMgbWV0aG9kIHRvIGZpbmlzaCBzZXJ2aWNlIHJlcXVlc3RzIHRoYXQgcmV0dXJuIFtPYnNlcnZhYmxlc10uXG4gICAqIEBwYXJhbSBzb3VyY2VOYW1lXG4gICAqL1xuICBmaW5pc2hSZXF1ZXN0KHNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFJlcXVlc3QgZm9yIFske3NvdXJjZU5hbWV9XSBieSAke3RoaXMuc2VydmljZU5hbWV9IGlzIGNvbXBsZXRlLmBcbiAgICApO1xuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgIGBQcmVwYXJpbmcgdG8gd3JpdGUgYW55IG1lc3NhZ2VzLmBcbiAgICAgICk7XG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZpbHRlcihcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvciAmJiBmLkRpc3BsYXlUb1VzZXJcbiAgICAgICkuZm9yRWFjaChlID0+XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlLnRvU3RyaW5nKCkpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVzZXQgdGhlIHNlcnZpY2UgY29udGV4dCB3aGVuIHlvdSB3YW50IHRvIGNsZWFyIG1lc3NhZ2VzIGZyb20gdGhlIFtTZXJ2aWNlQ29udGV4dF0uIElmIHlvdSB3YW50IHRvXG4gICAqIGFwcGVuZCBtZXNzYWdlcyBmcm9tIHN1YnNlcXVlbnQgc2VydmljZSBjYWxscywgZG8gbm90IHVzZSB0aGlzIG1ldGhvZC5cbiAgICovXG4gIHJlc2V0U2VydmljZUNvbnRleHQoKSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUHJlcGFyaW5nIHRvIHJlc2V0IHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcbiAgICApO1xuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0ICYmIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMpIHtcbiAgICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgICAgICBgUmVzZXR0aW5nIHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcyA9IG5ldyBBcnJheTxTZXJ2aWNlTWVzc2FnZT4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICAgIHRoaXMuc2VydmljZU5hbWUsXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgICAgYFRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgW01lc3NhZ2VzXS5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgICBTZXZlcml0eS5XYXJuaW5nLFxuICAgICAgICBgVGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XSBpcyBub3QgdmFsaWQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgRmluaXNoZWQgIHByb2Nlc3NpbmcgcmVxdWVzdCB0byBbcmVzZXRdIHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byB3cml0ZSB0aGUgY3VycmVudCBtZXNzYWdlcyBjb250YWluZWQgaW4gdGhlIFtTZXJ2aWNlQ29udGV4dF0uIFdyaXR0ZW4gbWVzc2FnZXMgYXJlIGxpbWl0ZWRcbiAgICogdG8gaXRlbXMgdGhhdCBhcmUgbWFya2VkIGFzIFtEaXNwbGF5VG9Vc2VyID0gdHJ1ZV0uXG4gICAqL1xuICB3cml0ZU1lc3NhZ2VzKCkge1xuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0ICYmIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMpIHtcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgaWYgKGUuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yICYmIGUuRGlzcGxheVRvVXNlcikge1xuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxuICAgICAgICAgICAgZS50b1N0cmluZygpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG4vLyAvLyBpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBIdHRwQmFzZVNlcnZpY2UgfSBmcm9tICcuL2h0dHAtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XG5pbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsJztcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhcHBsaWNhdGlvbidzIGJhc2UgQWN0aW9uIGNsYXNzIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgcGlwZWxpbmUgbWV0aG9kcyAtIHByZS9wb3N0XG4gKiBleGVjdXRpb24gbWV0aG9kcy5cbiAqXG4gKiBUaGUgcHJlLWV4ZWN1dGUgbWV0aG9kcyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XG4gKlx0XHQxLiBzdGFydCgpO1xuICpcdFx0Mi4gYXVkaXQoKTtcbiAqXHRcdDMuIHByZVZhbGlkYXRlQWN0aW9uKCk7XG4gKlx0XHQ0LiBldmFsdWF0ZVJ1bGVzKCk7XG4gKlx0XHQ1LiBwb3N0VmFsaWRhdGVBY3Rpb24oKTtcbiAqXHRcdDYuIHByZUV4ZWN1dGVBY3Rpb24oKTtcbiAqXG4gKklmIHRoZSBzdGF0dXMgb2YgYWN0aW9uIGlzIGdvb2QsIHRoZSBidXNpbmVzcyBsb2dpYyB3aWxsIGJlIGV4ZWN1dGVkIHVzaW5nIHRoZTpcbiAqXHRcdDEuIHByb2Nlc3NBY3Rpb24oKTtcbiAqXG4gKiBUaGUgcG9zdC1leGVjdXRpb24gbWV0aG9kcyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XG4gKlx0XHQxLiBwb3N0RXhlY3V0ZUFjdGlvbigpO1xuICpcdFx0Mi4gdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTtcbiAqXHRcdDMuIGZpbmlzaCgpO1xuICovXG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25CYXNlIGV4dGVuZHMgQWN0aW9uIHtcbiAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0O1xuICByZXNwb25zZTogT2JzZXJ2YWJsZTxhbnk+O1xuICBodHRwQmFzZTogSHR0cEJhc2VTZXJ2aWNlO1xuICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZTtcbiAgYWN0aW9uTmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgcmVxdWlyZWQgaW1wbGVtZW50YXRpb24gaWYgeW91IHdhbnQgdG8gcmVuZGVyL2V4ZWN1dGUgdGhlIHJ1bGVzIHRoYXRcbiAgICogYXJlIGFzc29jaWF0ZWQgdG8gdGhlIHNwZWNpZmllZCBhY3Rpb24uXG4gICAqL1xuICB2YWxpZGF0ZUFjdGlvbigpOiBWYWxpZGF0aW9uQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkNvbnRleHQucmVuZGVyUnVsZXMoKTtcbiAgfVxuXG4gIHBvc3RWYWxpZGF0ZUFjdGlvbigpIHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFByZXBhcmluZyB0byBkZXRlcm1pbmUgaWYgdGhlIGFjdGlvbiBjb250YWlucyB2YWxpZGF0aW9uIGVycm9ycyBpbiAke1xuICAgICAgICB0aGlzLmFjdGlvbk5hbWVcbiAgICAgIH1gXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnZhbGlkYXRpb25Db250ZXh0Lmhhc1J1bGVWaW9sYXRpb25zKCkpIHtcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICB0aGlzLmFjdGlvbk5hbWUsXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgICBgVGhlIHRhcmdldCBjb250YWlucyB2YWxpZGF0aW9uIGVycm9ycyBpbiAke3RoaXMuYWN0aW9uTmFtZX1gXG4gICAgICApO1xuXG4gICAgICAvLyBMb2FkIHRoZSBlcnJvci9ydWxlIHZpb2xhdGlvbnMgaW50byB0aGUgU2VydmljZUNvbnRleHQgc28gdGhhdCB0aGUgaW5mb3JtYXRpb24gYnViYmxlcyB1cCB0byB0aGUgY2FsbGVyIG9mIHRoZSBzZXJ2aWNlO1xuICAgICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dC5yZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZCkge1xuICAgICAgICAgIHRoaXMucHVibGlzaFJ1bGVSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICB0aGlzLnJldHJpZXZlUnVsZURldGFpbHMocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcG9zdEV4ZWN1dGVBY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuYWN0aW9uUmVzdWx0ID09PSBBY3Rpb25SZXN1bHQuRmFpbCkge1xuICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICBpZiAoZS5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uTmFtZSxcbiAgICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxuICAgICAgICAgICAgZS50b1N0cmluZygpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsbCBjb25jcmV0ZSBhY3Rpb25zIG11c3Qgb3ZlcnJpZGUgYW5kIGltcGxlbWVudCB0aGlzIG1ldGhvZC4gSXQgaXMgZGVmaW5lZCBpbiB0aGUgW0FjdGlvbl0gZnJhbWV3b3JrIGNsYXNzLlxuICAgKi9cbiAgdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTogQWN0aW9uUmVzdWx0IHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFJ1bm5pbmcgW3ZhbGlkYXRlQWN0aW9uUmVzdWx0XSBmb3IgJHt0aGlzLmFjdGlvbk5hbWV9LmBcbiAgICApO1xuICAgIC8vIGRldGVybWluZSB0aGUgc3RhdHVzIG9mIHRoZSBhY3Rpb24gYmFzZWQgb24gYW55IHJ1bGUgdmlvbGF0aW9ucztcbiAgICBpZiAodGhpcy52YWxpZGF0aW9uQ29udGV4dC5oYXNSdWxlVmlvbGF0aW9ucygpKSB7XG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgdGhpcy5hY3Rpb25OYW1lLFxuICAgICAgICBTZXZlcml0eS5FcnJvcixcbiAgICAgICAgYFRoZSAke3RoaXMuYWN0aW9uTmFtZX0gY29udGFpbnMgcnVsZSB2aW9sYXRpb25zLmBcbiAgICAgICk7XG4gICAgICB0aGlzLmFjdGlvblJlc3VsdCA9IEFjdGlvblJlc3VsdC5GYWlsO1xuXG4gICAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcbiAgICAgIGVycm9yUmVzcG9uc2UuSXNTdWNjZXNzID0gZmFsc2U7XG4gICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UgPSBgVmFsaWRhdGlvbiBlcnJvcnMgZXhpc3QuYDtcbiAgICAgIHRoaXMucmVzcG9uc2UgPSBPYnNlcnZhYmxlLnRocm93KGVycm9yUmVzcG9uc2UpO1xuICAgIH1cbiAgICB0aGlzLmFjdGlvblJlc3VsdCA9IHRoaXMuc2VydmljZUNvbnRleHQuaXNHb29kKClcbiAgICAgID8gQWN0aW9uUmVzdWx0LlN1Y2Nlc3NcbiAgICAgIDogQWN0aW9uUmVzdWx0LkZhaWw7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uUmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBwcm9jZXNzIHJ1bGUgcmVzdWx0cyBmb3IgY29tcG9zaXRlIHJ1bGVzLiBOb3RlLCB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgcmVjdXJzaXZlXG4gICAqIGFuZCB3aWxsIHByb2Nlc3MgYWxsIGNvbXBvc2l0ZSBydWxlcyBpbiB0aGUgcnVsZSBzZXQgY29udGFpbmVkIGluIHRoZSBWYWxpZGF0aW9uQ29udGV4dC5cbiAgICogQHBhcmFtIHJ1bGVSZXN1bHQgVGhlIHJlc3VsdCBvZiBhIHJlbmRlcmVkIHJ1bGUuXG4gICAqL1xuICByZXRyaWV2ZVJ1bGVEZXRhaWxzKHJ1bGVSZXN1bHQ6IFJ1bGVSZXN1bHQpIHtcbiAgICBpZiAocnVsZVJlc3VsdC5ydWxlUG9saWN5IGluc3RhbmNlb2YgQ29tcG9zaXRlUnVsZSkge1xuICAgICAgY29uc3QgY29tcG9zaXRlID0gcnVsZVJlc3VsdC5ydWxlUG9saWN5IGFzIENvbXBvc2l0ZVJ1bGU7XG4gICAgICBpZiAoY29tcG9zaXRlICYmIGNvbXBvc2l0ZS5oYXNFcnJvcnMpIHtcbiAgICAgICAgY29uc3QgZXJyb3JzID0gY29tcG9zaXRlLnJlc3VsdHMuZmlsdGVyKFxuICAgICAgICAgIHJlc3VsdCA9PiAhcmVzdWx0LmlzVmFsaWQgJiYgcmVzdWx0LnJ1bGVQb2xpY3kuaXNEaXNwbGF5YWJsZVxuICAgICAgICApO1xuXG4gICAgICAgIGVycm9ycy5mb3JFYWNoKGVycm9yUmVzdWx0ID0+IHtcbiAgICAgICAgICB0aGlzLnB1Ymxpc2hSdWxlUmVzdWx0KGVycm9yUmVzdWx0KTtcblxuICAgICAgICAgIGlmIChlcnJvclJlc3VsdC5ydWxlUG9saWN5IGluc3RhbmNlb2YgQ29tcG9zaXRlUnVsZSkge1xuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVJ1bGVEZXRhaWxzKGVycm9yUmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIGhlbHBlciBmdW5jdGlvbiB0byBwdWJsaXNoIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlIFtTZXJ2aWNlQ29udGV4dC5NZXNzYWdlc10gbGlzdC5cbiAgICogQHBhcmFtIHJ1bGVSZXN1bHRcbiAgICovXG4gIHB1Ymxpc2hSdWxlUmVzdWx0KHJ1bGVSZXN1bHQ6IFJ1bGVSZXN1bHQpIHtcbiAgICBjb25zdCBzZXJ2aWNlTWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShcbiAgICAgIHJ1bGVSZXN1bHQucnVsZVBvbGljeS5uYW1lLFxuICAgICAgcnVsZVJlc3VsdC5ydWxlUG9saWN5Lm1lc3NhZ2UsXG4gICAgICBNZXNzYWdlVHlwZS5FcnJvclxuICAgICk7XG4gICAgc2VydmljZU1lc3NhZ2UuRGlzcGxheVRvVXNlciA9IHJ1bGVSZXN1bHQucnVsZVBvbGljeS5pc0Rpc3BsYXlhYmxlO1xuICAgIHNlcnZpY2VNZXNzYWdlLlNvdXJjZSA9IHRoaXMuYWN0aW9uTmFtZTtcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLnB1c2goc2VydmljZU1lc3NhZ2UpO1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxuICAgICAgU2V2ZXJpdHkuRXJyb3IsXG4gICAgICBgJHtzZXJ2aWNlTWVzc2FnZS50b1N0cmluZygpfWBcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuXG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcblxuLyoqXG4gKiBVc2UgdGhlIGJ1c2luZXNzIHByb3ZpZGVyIGJhc2UgY2xhc3MgdG8gYWNjZXNzIGNvbW1vbiBlbGVtZW50cyBvZiB0aGUgYnVzaW5lc3MgcHJvdmlkZXIuXG4gKlxuICogc2VydmljZUNvbnRleHQ6IFRoaXMgaXMgaW5pdGlhbGl6ZWQgZm9yIGVhY2ggaW5zdGFuY2Ugb2YgYSBidXNpbmVzcyBwcm92aWRlciAtIGl0cyBwdXJwb3NlIGlzIHRvIGNvbGxlY3QgaW5mb3JtYXRpb24gZHVyaW5nIHRoZSBwcm9jZXNzaW5nIG9mIGJ1c2luZXNzIGxvZ2ljLlxuICovXG5leHBvcnQgY2xhc3MgQnVzaW5lc3NQcm92aWRlckJhc2Uge1xuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xuICBzZXJ2aWNlQ29udGV4dDogU2VydmljZUNvbnRleHQ7XG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUnVubmluZyBjb25zdHJ1Y3RvciBmb3IgdGhlIFtCdXNpbmVzc1Byb3ZpZGVyQmFzZV0uYFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGhhbmRsZSBhbiB1bmV4cGVjdGVkIGVycm9yIGluIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGVycm9yIHNob3VsZCBpbXBsZW1lbnRcbiAgICogdGhlIHNwZWNpZmllZCBpbnRlcmZhY2UuIFRoZSBtZXRob2Qgd2lsbCBhZGQgYSBuZXcgW1NlcnZpY2VNZXNzYWdlXSB0byB0aGVcbiAgICogc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXG4gICAqIEBwYXJhbSBlcnJvciBBbiB1bmV4cGVjdGVkIGFwcGxpY2F0aW9uIGVycm9yIHRoYXQgaW1wbGVtZW50cyB0aGUgW0Vycm9yXSBpbnRlcmZhY2UuXG4gICAqXG4gICAqIGludGVyZmFjZSBFcnJvciB7XG4gICAqICBuYW1lOiBzdHJpbmc7XG4gICAqICBtZXNzYWdlOiBzdHJpbmc7XG4gICAqICBzdGFjaz86IHN0cmluZztcbiAgICogfVxuICAgKi9cbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcbiAgICAgIC5XaXRoRGlzcGxheVRvVXNlcih0cnVlKVxuICAgICAgLldpdGhNZXNzYWdlVHlwZShNZXNzYWdlVHlwZS5FcnJvcilcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xuXG4gICAgY29uc3QgbG9nSXRlbSA9IGAke21lc3NhZ2UudG9TdHJpbmcoKX07ICR7ZXJyb3Iuc3RhY2t9YDtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbG9nSXRlbSk7XG5cbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICBmaW5pc2hSZXF1ZXN0KHNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFJlcXVlc3QgZm9yIFske3NvdXJjZU5hbWV9XSBieSAke3RoaXMuc2VydmljZU5hbWV9IGlzIGNvbXBsZXRlLmBcbiAgICApO1xuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgIGBQcmVwYXJpbmcgdG8gd3JpdGUgb3V0IHRoZSBlcnJvcnMuYFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZmlsdGVyKFxuICAgICAgICBmID0+IGYuRGlzcGxheVRvVXNlciAmJiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxuICAgICAgKS5mb3JFYWNoKGUgPT5cbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGUudG9TdHJpbmcoKSlcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIFVzZSB0byBwcm92aWRlIHRoZSBhbGVydCB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgQWxlcnROb3RpZmljYXRpb24gYW5kIEFsZXJ0Q29tcG9uZW50LlxuICovXG5leHBvcnQgY2xhc3MgQWxlcnRUeXBlcyB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSW5mb3JtYXRpb246IHN0cmluZyA9ICdhbGVydC1pbmZvJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBXYXJuaW5nOiBzdHJpbmcgPSAnYWxlcnQtd2FybmluZyc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGFuZ2VyOiBzdHJpbmcgPSAnYWxlcnQtZGFuZ2VyJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBTdWNjZXNzOiBzdHJpbmcgPSAnYWxlcnQtc3VjY2Vzcyc7XG59XG4iLCJpbXBvcnQgeyBBbGVydFR5cGVzIH0gZnJvbSAnLi9hbGVydC10eXBlcy5jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgQWxlcnROb3RpZmljYXRpb24ge1xuICB0eXBlOiBzdHJpbmcgPSBBbGVydFR5cGVzLkluZm9ybWF0aW9uOyAvLyBhbGVydC13YXJuaW5nLCBhbGVydC1zdWNjZXNzLCBhbGVydC1pbmZvLCBhbGVydC1kYW5nZXJcbiAgaGVhZGVyOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIG1lc3NhZ2VzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgc2hvd0FsZXJ0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgaGVhZGVyOiBzdHJpbmcsXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBtZXNzYWdlcz86IEFycmF5PHN0cmluZz4sXG4gICAgdHlwZT86IHN0cmluZ1xuICApIHtcbiAgICBpZiAodHlwZSkge1xuICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgaWYgKG1lc3NhZ2VzKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHRoaXMudGl0bGUpIHtcbiAgICAgIHRoaXMuc2hvd0FsZXJ0ID0gdHJ1ZTsgLy8gdXNlZCB0byB0cmlnZ2VyIHRoZSBkaXNwbGF5IG9mIHRoZSBub3RpZmljYXRpb24uXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIE1lc3NhZ2VUeXBlLFxuICBTZXJ2aWNlQ29udGV4dCxcbiAgU2VydmljZU1lc3NhZ2Vcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xuaW1wb3J0IHtcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgU2V2ZXJpdHlcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgQWxlcnROb3RpZmljYXRpb24gfSBmcm9tICcuL21vZGVscy9hbGVydC1ub3RpZmljYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQWxlcnRUeXBlcyB9IGZyb20gJy4vbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cyc7XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRCYXNlIHtcbiAgY29tcG9uZW50TmFtZTogc3RyaW5nO1xuICBhbGVydE5vdGlmaWNhdGlvbjogQWxlcnROb3RpZmljYXRpb247XG4gIG5hdlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbXBvbmVudE5hbWU6IHN0cmluZyxcbiAgICBwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIHRoaXMuY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XG4gICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xuXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMuZ29vZ2xlQW5hbHl0aWNzUGFnZXZpZXcoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGNvbnN0IHJvdXRlckV2ZW50ID0gdGhpcy5yb3V0ZXIuZXZlbnRzLmZpbHRlcihcbiAgICAvLyAgIGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZFxuICAgIC8vICk7XG4gICAgLy8gaWYgKHJvdXRlckV2ZW50ICYmIHJvdXRlckV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgIC8vICAgdGhpcy5nb29nbGVBbmFseXRpY3NQYWdldmlldyhyb3V0ZXJFdmVudCk7XG4gICAgLy8gfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBzZW5kIGFuIGFuYWx5dGljIGV2ZW50IHRvIFtHb29nbGUgQW5hbHl0aWNzXS5cbiAgICogQHBhcmFtIGNhdGVnb3J5IEEgY2F0ZWdvcnkgaXMgYSBuYW1lIHRoYXQgeW91IHN1cHBseSBhcyBhIHdheSB0byBncm91cCBvYmplY3RzIHRoYXQgeW91IHdhbnQgdG8gdHJhY2suIFR5cGljYWxseSwgeW91IHdpbGwgdXNlIHRoZSBzYW1lIGNhdGVnb3J5IG5hbWUgbXVsdGlwbGUgdGltZXMgb3ZlciByZWxhdGVkIFVJIGVsZW1lbnRzIHRoYXQgeW91IHdhbnQgdG8gZ3JvdXAgdW5kZXIgYSBnaXZlbiBjYXRlZ29yeS5cbiAgICogQHBhcmFtIGFjdGlvbiBVc2UgdGhlIGFjdGlvbiBwYXJhbWV0ZXIgdG8gbmFtZSB0aGUgdHlwZSBvZiBldmVudCBvciBpbnRlcmFjdGlvbiB5b3Ugd2FudCB0byB0cmFjayBmb3IgYSBwYXJ0aWN1bGFyIHdlYiBvYmplY3QgKGkuZS4sIHBsYXksIHN0b3AsIHBhdXNlLCBkb3dubG9hZCkuIEEgdW5pcXVlIGV2ZW50IGlzIGRldGVybWluZWQgYnkgYSB1bmlxdWUgYWN0aW9uIG5hbWUuIFlvdSBjYW4gdXNlIGR1cGxpY2F0ZSBhY3Rpb24gbmFtZXMgYWNyb3NzIGNhdGVnb3JpZXMsIGJ1dCB0aGlzIGNhbiBhZmZlY3QgaG93IHVuaXF1ZSBldmVudHMgYXJlIGNhbGN1bGF0ZWQuIFNlZSB0aGUgc3VnZ2VzdGlvbnMgYmVsb3cgYW5kIHRoZSBJbXBsaWNpdCBDb3VudCBzZWN0aW9uIGZvciBtb3JlIGRldGFpbHMuXG4gICAqIEBwYXJhbSBsYWJlbCBQcm92aWRlIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gZm9yIGV2ZW50cyB0aGF0IHlvdSB3YW50IHRvIHRyYWNrLCBzdWNoIGFzIHRoZSBtb3ZpZSB0aXRsZSBpbiB0aGUgdmlkZW8gZXhhbXBsZXMgYWJvdmUsIG9yIHRoZSBuYW1lIG9mIGEgZmlsZSB3aGVuIHRyYWNraW5nIGRvd25sb2Fkcy4gQWxsIGxhYmVscyBhcmUgbGlzdGVkIGluZGVwZW5kZW50bHkgZnJvbSB0aGVpciBwYXJlbnQgY2F0ZWdvcmllcyBhbmQgYWN0aW9ucy4gVGhpcyBwcm92aWRlcyB5b3Ugd2l0aCBhbm90aGVyIHVzZWZ1bCB3YXkgdG8gc2VnbWVudCB0aGUgZXZlbnQgZGF0YSBmb3IgeW91ciByZXBvcnRzLiBBbGwgbGFiZWxzIGFyZSBsaXN0ZWQgaW5kZXBlbmRlbnRseSBmcm9tIHRoZWlyIHBhcmVudCBjYXRlZ29yaWVzIGFuZCBhY3Rpb25zLiBUaGlzIHByb3ZpZGVzIHlvdSB3aXRoIGFub3RoZXIgdXNlZnVsIHdheSB0byBzZWdtZW50IHRoZSBldmVudCBkYXRhIGZvciB5b3VyIHJlcG9ydHMuXG4gICAqIEBwYXJhbSB2YWx1ZSBBbnkgbnVtZXJpYyB2YWx1ZSBpbmRpY2F0aW5nIGEgW3ZhbHVlXSB0aGF0IHdpbGwgYmUgc3VtbWFyaXplZCBmb3IgdGhlIGFuYWx5dGljIGl0ZW0ocykuXG4gICAqXG4gICAqIE1vcmUgaW5mb3JtYXRpb24gYXQ6IGh0dHBzOi8vc3VwcG9ydC5nb29nbGUuY29tL2FuYWx5dGljcy9hbnN3ZXIvMTAzMzA2OFxuICAgKiBvciBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZXZlbnRzXG4gICAqL1xuICBwdWJsaWMgZ29vZ2xlQW5hbHl0aWNzU2VuZEV2ZW50KFxuICAgIGNhdGVnb3J5OiBzdHJpbmcsXG4gICAgYWN0aW9uOiBzdHJpbmcsXG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICB2YWx1ZTogbnVtYmVyXG4gICkge1xuICAgICg8YW55PndpbmRvdykuZ3RhZygnZXZlbnQnLCBhY3Rpb24sIHtcbiAgICAgIGV2ZW50X2NhdGVnb3J5OiBjYXRlZ29yeSxcbiAgICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnb29nbGVBbmFseXRpY3NQYWdldmlldyhldmVudDogTmF2aWdhdGlvbkVuZCkge1xuICAgIGlmIChldmVudCAmJiBldmVudC51cmxBZnRlclJlZGlyZWN0cykge1xuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgIGBQcmVwYXJpbmcgdG8gc2V0IFtHb29nbGUgQW5hbHl0aWNzXSBwYWdlIHZpZXcgZm9yIFske1xuICAgICAgICAgIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzXG4gICAgICAgIH1dLmBcbiAgICAgICk7XG4gICAgICAvLyAoPGFueT53aW5kb3cpLmdhKCdzZXQnLCAncGFnZScsIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzKTtcbiAgICAgIC8vICg8YW55PndpbmRvdykuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcbiAgICAgIC8vIGdhKCdjcmVhdGUnLCAnVUEtMTEwMTk0MzQ0LTEnLCAnYXV0bycsIHRoaXMuY29tcG9uZW50TmFtZSk7XG4gICAgICAvLyBnYShgJHt0aGlzLmNvbXBvbmVudE5hbWV9LnNlbmRgLCAncGFnZXZpZXcnKTtcblxuICAgICAgLy8gaHR0cHM6Ly9ibG9nLnRoZWNvZGVjYW1wdXMuZGUvYW5ndWxhci0yLWdvb2dsZS1hbmFseXRpY3MtZ29vZ2xlLXRhZy1tYW5hZ2VyL1xuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9wYWdlc1xuICAgICAgY29uc3QgR0FfVFJBQ0tJTkdfSUQgPSAnVUEtMTEwMTk0MzQ0LTEnO1xuICAgICAgLy8gZ3RhZygnY29uZmlnJywgJ0dBX1RSQUNLSU5HX0lEJywgezxwYWdldmlld19wYXJhbWV0ZXJzPn0pO1xuICAgICAgKDxhbnk+d2luZG93KS5nYSgnY29uZmlnJywgR0FfVFJBQ0tJTkdfSUQsIHtcbiAgICAgICAgcGFnZV90aXRsZTogdGhpcy5jb21wb25lbnROYW1lLFxuICAgICAgICBwYWdlX3BhdGg6IGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcbiAgICAgICAgU2V2ZXJpdHkuV2FybmluZyxcbiAgICAgICAgYEZhaWxlZCB0byBzZXQgW0dvb2dsZSBBbmFseXRpY3NdIHBhZ2Ugdmlldy5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gY3JlYXRlIGEgc2ltcGxlIFtFcnJvclJlc3BvbnNlXSB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB0byB0aGUgdXNlci5cbiAgICovXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2UobWVzc2FnZTogc3RyaW5nKTogRXJyb3JSZXNwb25zZSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGVycm9yIHJlc3BvbnNlIGZvciBjb21wb25lbnQuYFxuICAgICk7XG4gICAgY29uc3QgZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XG4gICAgZXJyb3JSZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gaGFuZGxlIHNlcnZpY2UgZXJyb3JzLiBUaGVzZSBhcmUgZXJyb3IgcmVzcG9uc2UgW1NlZTogRXJyb3JSZXNwb25zZV0gZnJvbVxuICAgKiB0aGUgYXBwbGljYXRpb24gYnVzaW5lc3MgbGF5ZXJzIChBY3Rpb24ocykgb3IgSHR0cCkgdGhhdCB3aWxsIGJ1YmJsZSB1cCB0byB0aGVcbiAgICogY2FsbGVyIChpLmUuLCBhIGNvbXBvbmVudCkgaW4gYSBzcGVjaWZpZWQgZm9ybWF0OlxuICAgKlxuICAgKiBJc1N1Y2Nlc3M6IGJvb2xlYW4gPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxuICAgKiBNZXNzYWdlOiBzdHJpbmc7XG4gICAqIEVycm9yczogQXJyYXk8U2VydmljZUVycm9yPiA9IG5ldyBBcnJheTxTZXJ2aWNlRXJyb3I+KCk7XG4gICAqIEV4Y2VwdGlvbjogYW55O1xuICAgKi9cbiAgaGFuZGxlU2VydmljZUVycm9ycyhcbiAgICBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlLFxuICAgIHNlcnZpY2VDb250ZXh0PzogU2VydmljZUNvbnRleHRcbiAgKSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgIGBQcmVwYXJpbmcgdG8gaGFuZGxlIHNlcnZpY2UgZXJyb3JzIGZvciBjb21wb25lbnQuYFxuICAgICk7XG4gICAgaWYgKHNlcnZpY2VDb250ZXh0ICYmIHNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgICAgYFJldHJpZXZpbmcgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgU2VydmljZUNvbnRleHQvVmFsaWRhdGlvbkNvbnRleHQ7YFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5yZXRyaWV2ZVNlcnZpY2VDb250ZXh0RXJyb3JNZXNzYWdlcyhzZXJ2aWNlQ29udGV4dCk7XG4gICAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKFxuICAgICAgICAnRXJyb3JzJyxcbiAgICAgICAgZXJyb3JSZXNwb25zZS5NZXNzYWdlLFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgQWxlcnRUeXBlcy5XYXJuaW5nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZXJyb3JSZXNwb25zZSAmJiBlcnJvclJlc3BvbnNlLk1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgICAgIGBSZXRyaWV2aW5nIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIFtFcnJvclJlc3BvbnNlXS5gXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMucmV0cmlldmVSZXNwb25zZUVycm9yTWVzc2FnZXMoZXJyb3JSZXNwb25zZSk7XG4gICAgICAgIHRoaXMuYWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oXG4gICAgICAgICAgJ0Vycm9yJyxcbiAgICAgICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UsXG4gICAgICAgICAgZXJyb3JzLFxuICAgICAgICAgIEFsZXJ0VHlwZXMuV2FybmluZ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXG4gICAgICAgICAgYEVycm9yOiAke2Vycm9yUmVzcG9uc2UuTWVzc2FnZX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXG4gICAqXG4gICAqIEBwYXJtOiBzZXJ2aWNlQ29udGV4dDogQSBjb250ZXh0IG9iamVjdCBjb250YWluaW5nIG1lc3NhZ2VzIGZvciB0aGUgc3BlY2lmaWVkIHJlcXVlc3QuXG4gICAqL1xuICByZXRyaWV2ZVNlcnZpY2VDb250ZXh0RXJyb3JNZXNzYWdlcyhcbiAgICBzZXJ2aWNlQ29udGV4dDogU2VydmljZUNvbnRleHRcbiAgKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBBcnJheTxzdHJpbmc+KCk7XG4gICAgc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZm9yRWFjaChlID0+IHtcbiAgICAgIGlmIChlLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvciAmJiBlLkRpc3BsYXlUb1VzZXIpIHtcbiAgICAgICAgbWVzc2FnZXMucHVzaChlLk1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmV0cmlldmUgdGhlIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIHNwZWNpZmllZCBXZWIgQVBJIHJlc3BvbnNlLlxuICAgKi9cbiAgcmV0cmlldmVSZXNwb25zZUVycm9yTWVzc2FnZXMoZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSkge1xuICAgIGNvbnN0IGVycm9ycyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgaWYgKGVycm9yUmVzcG9uc2UgJiYgZXJyb3JSZXNwb25zZS5FcnJvcnMpIHtcbiAgICAgIGVycm9yUmVzcG9uc2UuRXJyb3JzLmZvckVhY2goZSA9PiB7XG4gICAgICAgIGlmIChlLkRpc3BsYXlUb1VzZXIpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaChlLk1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVzZXQgdGhlIFtBbGVydE5vdGlmaWNhdGlvbl0gdG8gdGhlIGluaXRpYWwgc3RhdGUuIFJlbW92ZXNcbiAgICogZXhpc3RpbmcgbWVzc2FnZXMgYW5kIGhpZGVzIHRoZSBBbGVydENvbXBvbmVudC5cbiAgICovXG4gIHJlc2V0QWxlcnROb3RpZmljYXRpb25zKCkge1xuICAgIHRoaXMuYWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oJycsICcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gbmF2aWdhdGUgdG8gdGhlIHNwZWNpZmllZCByb3V0ZS5cbiAgICogQHBhcm0gcm91dGVOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXJnZXQgcm91dGUuXG4gICAqL1xuICBwdWJsaWMgcm91dGVUbyhyb3V0ZU5hbWU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVOYW1lXSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICAgIFNldmVyaXR5LkVycm9yLFxuICAgICAgICBgRXJyb3Igd2hpbGUgYXR0ZW1wdGluZyB0byBuYXZpZ2F0ZSB0byBbJHtyb3V0ZU5hbWV9XSByb3V0ZSBmcm9tICR7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lXG4gICAgICAgIH0uIEVycm9yOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJldHJpZXZlIGFuZCBzaG93IGFueSByZXNwb25zZSBlcnJvciBtZXNzYWdlcy5cbiAgICovXG4gIHNob3dSZXNwb25zZUVycm9ycyhyZXNwb25zZTogRXJyb3JSZXNwb25zZSkge1xuICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhyZXNwb25zZSwgdW5kZWZpbmVkKTtcbiAgfVxuXG4gIGZpbmlzaFJlcXVlc3QobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgIGAke3RoaXMuY29tcG9uZW50TmFtZX06ICR7bWVzc2FnZX1gXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzaG93QWxlcnRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnLi9odHRwLXJlcXVlc3QtbWV0aG9kcy5lbnVtJztcblxuZXhwb3J0IGNsYXNzIEh0dHBSZXF1ZXN0T3B0aW9ucyB7XG4gIHJlcXVlc3RNZXRob2Q6IEh0dHBSZXF1ZXN0TWV0aG9kO1xuICBib2R5PzogYW55O1xuICBoZWFkZXJzPzogSHR0cEhlYWRlcnMgfCB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XG4gIG9ic2VydmU/OiAnYm9keSc7XG4gIHBhcmFtcz86IEh0dHBQYXJhbXMgfCB7IFtwYXJhbTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfTtcbiAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuO1xuICAvLyByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcic7XG4gIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gIHJlcXVlc3RVcmw6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgSHR0cENsaWVudCxcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGVhZGVycyxcbiAgSHR0cFBhcmFtcyxcbiAgSHR0cFJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RNZXRob2QgfSBmcm9tICcuL21vZGVscy9odHRwLXJlcXVlc3QtbWV0aG9kcy5lbnVtJztcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XG5pbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsJztcbmltcG9ydCB7IFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwnO1xuLy8gaW1wb3J0IHsgUmVxdWVzdE1ldGhvZCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG4vKipcbiAqIFVzZSB0byBjcmVhdGUgYW5kIGV4ZWN1dGUgSFRUUCBzZXJ2aWNlIHJlcXVlc3RzLlxuICogMS4gQ3JlYXRlIEh0dHBIZWFkZXJzXG4gKiAyLiBDcmVhdGUgUmVxdWVzdE9wdGlvbnNcbiAqIDMuIEV4ZWN1dGUgUmVxdWVzdFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEJhc2VTZXJ2aWNlIHtcbiAgcHVibGljIHNlcnZpY2VOYW1lID0gJ0h0dHBCYXNlU2VydmljZSc7XG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHVibGljIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciBbbXVsdGlwYXJ0L2Zvcm0tZGF0YV0uXG4gICAqL1xuICBjcmVhdGVNdWx0aXBhcnRGb3JtRGF0YUhlYWRlcihyZXF1aXJlc0F1dGhUb2tlbjogYm9vbGVhbikge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgaGVhZGVyIGZvciB0aGUgW211bHRpcGFydC9mb3JtLWRhdGFdIEhUVFAgcmVxdWVzdC4gUmVxdWlyZXNBdXRoVG9rZW46ICR7cmVxdWlyZXNBdXRoVG9rZW59LmBcbiAgICApO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBpZiAocmVxdWlyZXNBdXRoVG9rZW4pIHtcbiAgICAgIC8vIGNyZWF0ZSBoZWFkZXIgcmVxdWVzdCB3aXRoIHNlY3VyaXR5IHRva2VuO1xuICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy5hY2Nlc3NUb2tlbn1gKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciBDb250ZW50LVR5cGUgW2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZF0uXG4gICAqL1xuICBjcmVhdGVGb3JtVXJsZW5jb2RlZEhlYWRlcigpIHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGhlYWRlciBmb3IgdGhlIFthcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRdIEhUVFAgcmVxdWVzdC5gXG4gICAgKTtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgIH0pO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgdGhlIEhUVFAgcmVxdWVzdC4gSWYgdGhlIFtyZXF1aXJlc0F1dGhUb2tlbl0gaW5kaWNhdG9yXG4gICAqIGlzIHRydWUsIHRoZSByZXF1ZXN0IHdpbGwgdXNlIHRoZSBjdXJyZW50IEF1dGhvcml6YXRpb24gc2VjdXJpdHkgdG9rZW4uXG4gICAqIEBwYXJhbSBpc1NlY3VyZVxuICAgKi9cbiAgY3JlYXRlSGVhZGVyKHJlcXVpcmVzQXV0aFRva2VuOiBib29sZWFuKSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBoZWFkZXIgZm9yIHRoZSBIVFRQIHJlcXVlc3QuIFJlcXVpcmVzQXV0aFRva2VuOiAke3JlcXVpcmVzQXV0aFRva2VufS5gXG4gICAgKTtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICBpZiAocmVxdWlyZXNBdXRoVG9rZW4pIHtcbiAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMuYWNjZXNzVG9rZW59YCk7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgSHR0cFJlcXVlc3RPcHRpb25zIGl0ZW0gZm9yIGEgcmVxdWVzdC5cbiAgICogQHBhcmFtIGhlYWRlcnMgVXNlIHRvIHN1cHBseSBoZWFkZXIgaW5mb3JtYXRpb24gaW4gdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB1cmwgVXNlIHRvIGluZGljYXRlIHRoZSBVUkwgb2YgdGhlIHdlYiBhcGkuXG4gICAqIEBwYXJhbSBib2R5IFVzZSB0byBwcm92aWRlIGEgZGF0YSBwYXlsb2FkIGZvciB0aGUgcmVxdWVzdC5cbiAgICovXG4gIGNyZWF0ZVJlcXVlc3RPcHRpb25zKFxuICAgIG1ldGhvZDogSHR0cFJlcXVlc3RNZXRob2QsXG4gICAgaGVhZGVyczogSHR0cEhlYWRlcnMsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYm9keTogYW55XG4gICkge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgcmVxdWVzdCBvcHRpb25zIGZvciB0aGUgSFRUUCByZXF1ZXN0LmBcbiAgICApO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgSHR0cFJlcXVlc3RPcHRpb25zKCk7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcbiAgICBvcHRpb25zLnJlcXVlc3RVcmwgPSB1cmw7XG4gICAgb3B0aW9ucy5ib2R5ID0gYm9keTtcblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBleGVjdXRlIGFuIEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIGhlYWRlciBhbmQgVVJMLlxuICAgKi9cbiAgZXhlY3V0ZVJlcXVlc3QoXG4gICAgcmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICApOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFByZXBhcmluZyB0byBleGVjdXRlIEhUVFAgcmVxdWVzdC4gVXJsOiAke3JlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmx9YFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8U2VydmljZVJlc3BvbnNlPihcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QudG9TdHJpbmcoKSxcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmwsXG4gICAgICByZXF1ZXN0T3B0aW9uc1xuICAgICk7XG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cFxuICAgIC8vICAgLnJlcXVlc3QobmV3IFJlcXVlc3QocmVxdWVzdE9wdGlvbnMpKVxuICAgIC8vICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpIC8vIG1hcHMgdGhlIG9ic2VydmFibGUgcmVzcG9uc2UgdG8gYSBKU09OIG9iamVjdDtcbiAgICAvLyAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmhhbmRsZUh0dHBFcnJvcihlcnJvciwgcmVxdWVzdE9wdGlvbnMpKTsgLy8gdXNlIHRvIGhhbmRsZSBhbnkgZXhjZXB0aW9uIGR1cmluZyBzZXJ2aWNlIGNhbGw7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGV4ZWN1dGUgYW4gSFRUUCBbZ2V0XSByZXF1ZXN0IHVzaW5nIHRoZSBzcGVjaWZpZWQgdXJsIGFuZCBvcHRpb25zLlxuICAgKi9cbiAgZ2V0PFNlcnZpY2VSZXNwb25zZT4oXG4gICAgcmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICApOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xuICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QgPSBIdHRwUmVxdWVzdE1ldGhvZC5HRVQ7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucylcbiAgICAgIC5waXBlKCk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGV4ZWN1dGUgYW4gSFRUUCBbcG9zdF0gcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIHVybCBhbmQgb3B0aW9ucy5cbiAgICogQHBhcmFtIHJlcXVlc3RPcHRpb25zIHVzZSB0byBkZWZpbmUgdGhlIG9wdGlvbnMgZm9yIHRoZSBzcGVjaWZpZWQgcmVxdWVzdC5cbiAgICovXG4gIHBvc3Q8U2VydmljZVJlc3BvbnNlPihcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XG4gICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdE1ldGhvZCA9IEh0dHBSZXF1ZXN0TWV0aG9kLlBPU1Q7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmh0dHBcbiAgICAgIC5wb3N0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCwgcmVxdWVzdE9wdGlvbnMpXG4gICAgICAucGlwZSgpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBoYW5kbGUgSFRUUCBlcnJvcnMgd2hlbiBjYWxsaW5nIHdlYiBhcGkocykuXG4gICAqL1xuICBoYW5kbGVIdHRwRXJyb3IoXG4gICAgZXJyb3I6IGFueSxcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcbiAgICB9LCAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RPcHRpb25zLmJvZHkpfWA7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGlzIGlzIGFuIGVycm9yIHRoYXQgY29udGFpbnMgYSBib2R5IC0gYSBbUmVzcG9uc2VdIGZyb20gdGhlIGFwcGxpY2F0aW9uIHdlYiBhcGkuIEluY2x1ZGVzOlxuICAgICAgICogMS4gSXNTdWNjZXNzXG4gICAgICAgKiAyLiBNZXNzYWdlXG4gICAgICAgKiAzLiBBcnJheSBvZiBTZXJ2aWNlRXJyb3IgaXRlbXNcbiAgICAgICAqIDQuIEV4Y2VwdGlvbiAob3B0aW9uYWwpXG4gICAgICAgKi9cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gZXJyb3IuanNvbigpO1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xuICAgICAgICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE86IFJFVFJJRVZFIEVSUk9SIERFVEFJTFM7IFNUQVRVUywgTUVTU0FHRTsgRVRDLiBBTkQgUFJPVklERSBUTyBIQU5ETEVSO1xuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGNvbnN0IGVyciA9IDxFcnJvcj5leDtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7ZXJyLm5hbWV9OyAke2Vyci5tZXNzYWdlfWA7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3I/OiBFcnJvcikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKGVycm9yKTtcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY3JlYXRlRXJyb3JSZXNwb25zZShlcnJvcj86IEVycm9yKTogRXJyb3JSZXNwb25zZSB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLic7XG4gICAgY29uc3QgcmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBtZXNzYWdlID0gYCR7ZXJyb3IubmFtZX0gLSAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgICAgIHJlc3BvbnNlLkV4Y2VwdGlvbiA9IGVycm9yO1xuICAgIH1cbiAgICByZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn1cbiIsIi8qKlxuICogVXNlIHRoaXMgbW9kZWwgdG8gcmVwcmVzZW50IHNlcnZpY2UgZXJyb3IvbWVzc2FnZSBpbmZvcm1hdGlvbiBmcm9tIHRoZVxuICogYXBwbGljYXRpb24ncyBzZXJ2aWNlIEFQSXMuXG4gKlxuICogVGhlIERpc3BsYXlUb1VzZXIgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgbWVzc2FnZSBzaG91bGQgYmVcbiAqIGRpc3BsYXllZCB0byB0aGUgdXNlciBpZiBkZXNpcmVkLlxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZUVycm9yIHtcbiAgLy8gXCJ7XCJJc1N1Y2Nlc3NcIjpmYWxzZSxcbiAgLy8gXCJNZXNzYWdlXCI6XCJGYWlsZWQgdG8gY3JlYXRlIG5ldyB1c2VyIGFjY291bnQuXCIsXG4gIC8vIFwiRXJyb3JzXCI6W3tcIk5hbWVcIjpcIlBhc3N3b3JkRm9ybWF0SXNWYWxpZFwiLFxuICAvLyBcIk1lc3NhZ2VcIjpcIlRoZSBwYXNzd29yZCBmb3JtYXQgaXMgbm90IHZhbGlkLiBNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lOiBhbHBoYSwgbnVtZXJpYywgYW5kIHNwZWNpYWwgY2hhcmFjdGVyLlwiLFxuICAvLyBcIkV4Y2VwdGlvblwiOm51bGwsXCJTb3VyY2VcIjpcIkNyZWF0ZUxlYXJuZXJBY2NvdW50QWN0aW9uXCIsXG4gIC8vIERpc3BsYXlUb1VzZXJcIjp0cnVlLFwiVGFyZ2V0XCI6XCJcIn1dfVwiXG5cbiAgTmFtZTogc3RyaW5nO1xuICBNZXNzYWdlOiBzdHJpbmc7XG4gIEV4Y2VwdGlvbjogYW55O1xuICBEaXNwbGF5VG9Vc2VyOiBib29sZWFuO1xuICBTb3VyY2U6IHN0cmluZztcbiAgVGFyZ2V0OiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL3NlcnZpY2UtZXJyb3IubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZVJlc3BvbnNlIHtcbiAgSXNTdWNjZXNzOiBib29sZWFuO1xuICBNZXNzYWdlOiBzdHJpbmc7XG4gIERhdGE6IGFueTtcbiAgRXJyb3JzOiBBcnJheTxTZXJ2aWNlRXJyb3I+ID0gbmV3IEFycmF5PFNlcnZpY2VFcnJvcj4oKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7OztZQUtDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxZQUFZLEVBQUUsK0JBQStCLENBQUM7YUFDdEY7Ozs7Ozs7QUNMRDs7eUJBQ2MsS0FBSztzQkFFYSxJQUFJLEtBQUssRUFBZ0I7O0NBRXhEOzs7Ozs7QUNQRDs7OztBQXFCQTs7Ozs7Ozs7O0lBYUUsWUFBbUIsY0FBNEM7UUFBNUMsbUJBQWMsR0FBZCxjQUFjLENBQThCOzJCQVpqRCxFQUFFOzhCQUVpQixJQUFJLGNBQWMsRUFBRTtLQVVjOzs7Ozs7O0lBT25FLFdBQVcsQ0FBQyxRQUFrQjtRQUM1Qix1QkFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUNuQjs7Ozs7Ozs7Ozs7Ozs7SUFjRCxxQkFBcUIsQ0FBQyxLQUFZO1FBQ2hDLHVCQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDMUQsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2FBQ3ZCLGVBQWUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO2FBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFaEMsdUJBQU0sT0FBTyxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsY0FB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