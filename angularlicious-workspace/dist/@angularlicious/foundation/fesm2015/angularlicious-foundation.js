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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtZm91bmRhdGlvbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL2ZvdW5kYXRpb24ubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvc2VydmljZS1iYXNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvYWN0aW9uLWJhc2UuYWN0aW9uLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cy50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9hbGVydC1ub3RpZmljYXRpb24ubW9kZWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9jb21wb25lbnQtYmFzZS5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9odHRwLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsIENvbW1vbk1vZHVsZSwgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUge31cclxuIiwiaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvclJlc3BvbnNlIHtcclxuICBJc1N1Y2Nlc3MgPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxyXG4gIE1lc3NhZ2U6IHN0cmluZztcclxuICBFcnJvcnM6IEFycmF5PFNlcnZpY2VFcnJvcj4gPSBuZXcgQXJyYXk8U2VydmljZUVycm9yPigpO1xyXG4gIEV4Y2VwdGlvbjogRXJyb3I7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBTZXJ2aWNlQ29udGV4dCxcclxuICBNZXNzYWdlVHlwZSxcclxuICBTZXJ2aWNlTWVzc2FnZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgU2V2ZXJpdHlcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IE9BdXRoRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL29hdXRoLWVycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbi8vIGltcG9ydCB7IFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vLyBpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgW1NlcnZpY2VCYXNlXSB0byBwcm92aWRlIGNvbW1vbiBiZWhhdmlvciBmb3IgQW5ndWxhclxyXG4gKiBzZXJ2aWNlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQmFzZSB7XHJcbiAgYWNjZXNzVG9rZW4gPSAnJztcclxuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dCA9IG5ldyBTZXJ2aWNlQ29udGV4dCgpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIHByb3ZpZGUgcmVxdWlyZWQgZWxlbWVudHMgdG8gdGhlIGJhc2UgY2xhc3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbG9nZ2luZ1NlcnZpY2UgVGhlIFtMb2dnaW5nU2VydmljZV0gaXMgYSByZXF1aXJlZCBkZXBlbmRlbmN5IG9mIHRoaXNcclxuICAgKiBjbGFzcy4gSXQgc2hvdWxkIGJlIGluamVjdGVkIGludG8gYW55IEFuZ3VsYXIgU2VydmljZXMgdGhhdCBleHRlbmQgZnJvbVxyXG4gICAqIHRoaXMgYmFzZSBjbGFzcy4gSXQgd2lsbCBhbGxvdyB0aGUgbWVtYmVycyBvZiB0aGUgYmFzZSBjbGFzcyB0byBsb2cgaW5mb3JtYXRpb25cclxuICAgKiB1c2luZyB0aGUgY29tbW9uIExvZ2dpbmdTZXJ2aWNlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4dHJhY3QgdGhlIGNvbnRlbnRzIG9mIHRoZSBIVFRQIGJvZHkgYW5kIHJldHVybiBhIEpTT05cclxuICAgKiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0YS5cclxuICAgKiBAcGFyYW0gcmVzcG9uc2U6IGNvbnRhaW5zIHRoZSBIVFRQIHJlc3BvbnNlLlxyXG4gICAqL1xyXG4gIGV4dHJhY3REYXRhKHJlc3BvbnNlOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgYm9keSA9IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBib2R5IHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBhbiB1bmV4cGVjdGVkIGVycm9yIGluIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGVycm9yIHNob3VsZCBpbXBsZW1lbnRcclxuICAgKiB0aGUgc3BlY2lmaWVkIGludGVyZmFjZS4gVGhlIG1ldGhvZCB3aWxsIGFkZCBhIG5ldyBbU2VydmljZU1lc3NhZ2VdIHRvIHRoZVxyXG4gICAqIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxyXG4gICAqIEBwYXJhbSBlcnJvciBBbiB1bmV4cGVjdGVkIGFwcGxpY2F0aW9uIGVycm9yIHRoYXQgaW1wbGVtZW50cyB0aGUgW0Vycm9yXSBpbnRlcmZhY2UuXHJcbiAgICpcclxuICAgKiBpbnRlcmZhY2UgRXJyb3Ige1xyXG4gICAqICBuYW1lOiBzdHJpbmc7XHJcbiAgICogIG1lc3NhZ2U6IHN0cmluZztcclxuICAgKiAgc3RhY2s/OiBzdHJpbmc7XHJcbiAgICogfVxyXG4gICAqL1xyXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcclxuICAgICAgLldpdGhEaXNwbGF5VG9Vc2VyKHRydWUpXHJcbiAgICAgIC5XaXRoTWVzc2FnZVR5cGUoTWVzc2FnZVR5cGUuRXJyb3IpXHJcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xyXG5cclxuICAgIGNvbnN0IGxvZ0l0ZW0gPSBgJHttZXNzYWdlLnRvU3RyaW5nKCl9OyAke2Vycm9yLnN0YWNrfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbG9nSXRlbSk7XHJcblxyXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBhbiBlcnJvciB0aGF0IGNvbnRhaW5zIGEgW25hbWVdIGFuZCBhIFttZXNzYWdlXS5cclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKi9cclxuICBoYW5kbGVFcnJvcihlcnJvcjogeyBuYW1lOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCB9KTogdm9pZCB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgIC5XaXRoRGlzcGxheVRvVXNlcih0cnVlKVxyXG4gICAgICAuV2l0aE1lc3NhZ2VUeXBlKE1lc3NhZ2VUeXBlLkVycm9yKVxyXG4gICAgICAuV2l0aFNvdXJjZSh0aGlzLnNlcnZpY2VOYW1lKTtcclxuXHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgIG1lc3NhZ2UudG9TdHJpbmcoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIEhUVFAgZXJyb3JzIHdoZW4gY2FsbGluZyB3ZWIgYXBpKHMpLlxyXG4gICAqL1xyXG4gIGhhbmRsZUh0dHBFcnJvcihcclxuICAgIGVycm9yOiB7IHRvU3RyaW5nOiAoKSA9PiB2b2lkOyBfYm9keTogYW55OyBqc29uOiAoKSA9PiBFcnJvclJlc3BvbnNlIH0sXHJcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGAke2Vycm9yLnRvU3RyaW5nKCl9ICR7XHJcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcclxuICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBtZXNzYWdlKTtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBlcnJvci5qc29uKCk7XHJcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgZXJyb3IudG9TdHJpbmcoKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZhdWx0IHJldHVybiBiZWhhdmlvcjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKFxyXG4gICAgICAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLidcclxuICAgICk7XHJcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gaGFuZGxlIGFuIGVycm9yIGZyb20gdGhlIE9BdXRoIFByb3ZpZGVyIEFQSS5cclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnNcclxuICAgKi9cclxuICBoYW5kbGVPQXV0aEVycm9yKFxyXG4gICAgZXJyb3I6IE9BdXRoRXJyb3JSZXNwb25zZSxcclxuICAgIHJlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcclxuICAgICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybFxyXG4gICAgfSwgJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0T3B0aW9ucy5ib2R5KX1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgaWYgKGVycm9yICYmIGVycm9yLl9ib2R5KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcclxuICAgICAgICAgIGBVbmFibGUgdG8gdmFsaWRhdGUgY3JlZGVudGlhbHMuYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZhdWx0IHJldHVybiBiZWhhdmlvcjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKFxyXG4gICAgICBgVW5hYmxlIHRvIHZhbGlkYXRlIGNyZWRlbnRpYWxzLmBcclxuICAgICk7XHJcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gY3JlYXRlIGEgbmV3IFtFcnJvclJlc3BvbnNlXSB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBmb3IgdGhlIHNwZWNpZmllZCBbRXJyb3JSZXNwb25zZV0uXHJcbiAgICovXHJcbiAgY3JlYXRlRXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcpOiBFcnJvclJlc3BvbnNlIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcclxuICAgIHJlc3BvbnNlLk1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIGEgZ2VuZXJpYyBtZXRob2QgdG8gZmluaXNoIHNlcnZpY2UgcmVxdWVzdHMgdGhhdCByZXR1cm4gW09ic2VydmFibGVzXS5cclxuICAgKiBAcGFyYW0gc291cmNlTmFtZVxyXG4gICAqL1xyXG4gIGZpbmlzaFJlcXVlc3Qoc291cmNlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSZXF1ZXN0IGZvciBbJHtzb3VyY2VOYW1lfV0gYnkgJHt0aGlzLnNlcnZpY2VOYW1lfSBpcyBjb21wbGV0ZS5gXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgUHJlcGFyaW5nIHRvIHdyaXRlIGFueSBtZXNzYWdlcy5gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IgJiYgZi5EaXNwbGF5VG9Vc2VyXHJcbiAgICAgICkuZm9yRWFjaChlID0+XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGUudG9TdHJpbmcoKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXNldCB0aGUgc2VydmljZSBjb250ZXh0IHdoZW4geW91IHdhbnQgdG8gY2xlYXIgbWVzc2FnZXMgZnJvbSB0aGUgW1NlcnZpY2VDb250ZXh0XS4gSWYgeW91IHdhbnQgdG9cclxuICAgKiBhcHBlbmQgbWVzc2FnZXMgZnJvbSBzdWJzZXF1ZW50IHNlcnZpY2UgY2FsbHMsIGRvIG5vdCB1c2UgdGhpcyBtZXRob2QuXHJcbiAgICovXHJcbiAgcmVzZXRTZXJ2aWNlQ29udGV4dCgpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byByZXNldCB0aGUgTWVzc2FnZXMgb2YgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5gXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQgJiYgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcykge1xyXG4gICAgICBpZiAodGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBgUmVzZXR0aW5nIHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMgPSBuZXcgQXJyYXk8U2VydmljZU1lc3NhZ2U+KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBgVGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XSBkb2VzIG5vdCBjb250YWluIGFueSBbTWVzc2FnZXNdLmBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgIFNldmVyaXR5Lldhcm5pbmcsXHJcbiAgICAgICAgYFRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gaXMgbm90IHZhbGlkLmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYEZpbmlzaGVkICBwcm9jZXNzaW5nIHJlcXVlc3QgdG8gW3Jlc2V0XSB0aGUgTWVzc2FnZXMgb2YgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHdyaXRlIHRoZSBjdXJyZW50IG1lc3NhZ2VzIGNvbnRhaW5lZCBpbiB0aGUgW1NlcnZpY2VDb250ZXh0XS4gV3JpdHRlbiBtZXNzYWdlcyBhcmUgbGltaXRlZFxyXG4gICAqIHRvIGl0ZW1zIHRoYXQgYXJlIG1hcmtlZCBhcyBbRGlzcGxheVRvVXNlciA9IHRydWVdLlxyXG4gICAqL1xyXG4gIHdyaXRlTWVzc2FnZXMoKSB7XHJcbiAgICBpZiAodGhpcy5zZXJ2aWNlQ29udGV4dCAmJiB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBpZiAoZS5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IgJiYgZS5EaXNwbGF5VG9Vc2VyKSB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgICAgIGUudG9TdHJpbmcoKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbi8vIC8vIGltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VNZXNzYWdlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IEFjdGlvblJlc3VsdCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9hY3Rpb25zJztcclxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcblxyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgSHR0cEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWJhc2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IFNlcnZpY2VFcnJvciB9IGZyb20gJy4vbW9kZWxzL3NlcnZpY2UtZXJyb3IubW9kZWwnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGFwcGxpY2F0aW9uJ3MgYmFzZSBBY3Rpb24gY2xhc3MgdGhhdCBwcm92aWRlcyBpbXBsZW1lbnRhdGlvbiBvZiBwaXBlbGluZSBtZXRob2RzIC0gcHJlL3Bvc3RcclxuICogZXhlY3V0aW9uIG1ldGhvZHMuXHJcbiAqXHJcbiAqIFRoZSBwcmUtZXhlY3V0ZSBtZXRob2RzIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcclxuICpcdFx0MS4gc3RhcnQoKTtcclxuICpcdFx0Mi4gYXVkaXQoKTtcclxuICpcdFx0My4gcHJlVmFsaWRhdGVBY3Rpb24oKTtcclxuICpcdFx0NC4gZXZhbHVhdGVSdWxlcygpO1xyXG4gKlx0XHQ1LiBwb3N0VmFsaWRhdGVBY3Rpb24oKTtcclxuICpcdFx0Ni4gcHJlRXhlY3V0ZUFjdGlvbigpO1xyXG4gKlxyXG4gKklmIHRoZSBzdGF0dXMgb2YgYWN0aW9uIGlzIGdvb2QsIHRoZSBidXNpbmVzcyBsb2dpYyB3aWxsIGJlIGV4ZWN1dGVkIHVzaW5nIHRoZTpcclxuICpcdFx0MS4gcHJvY2Vzc0FjdGlvbigpO1xyXG4gKlxyXG4gKiBUaGUgcG9zdC1leGVjdXRpb24gbWV0aG9kcyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XHJcbiAqXHRcdDEuIHBvc3RFeGVjdXRlQWN0aW9uKCk7XHJcbiAqXHRcdDIuIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk7XHJcbiAqXHRcdDMuIGZpbmlzaCgpO1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25CYXNlIGV4dGVuZHMgQWN0aW9uIHtcclxuICBzZXJ2aWNlQ29udGV4dDogU2VydmljZUNvbnRleHQ7XHJcbiAgcmVzcG9uc2U6IE9ic2VydmFibGU8YW55PjtcclxuICBodHRwQmFzZTogSHR0cEJhc2VTZXJ2aWNlO1xyXG4gIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlO1xyXG4gIGFjdGlvbk5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyBhIHJlcXVpcmVkIGltcGxlbWVudGF0aW9uIGlmIHlvdSB3YW50IHRvIHJlbmRlci9leGVjdXRlIHRoZSBydWxlcyB0aGF0XHJcbiAgICogYXJlIGFzc29jaWF0ZWQgdG8gdGhlIHNwZWNpZmllZCBhY3Rpb24uXHJcbiAgICovXHJcbiAgdmFsaWRhdGVBY3Rpb24oKTogVmFsaWRhdGlvbkNvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkNvbnRleHQucmVuZGVyUnVsZXMoKTtcclxuICB9XHJcblxyXG4gIHBvc3RWYWxpZGF0ZUFjdGlvbigpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGRldGVybWluZSBpZiB0aGUgYWN0aW9uIGNvbnRhaW5zIHZhbGlkYXRpb24gZXJyb3JzIGluICR7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25OYW1lXHJcbiAgICAgIH1gXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRpb25Db250ZXh0Lmhhc1J1bGVWaW9sYXRpb25zKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgIGBUaGUgdGFyZ2V0IGNvbnRhaW5zIHZhbGlkYXRpb24gZXJyb3JzIGluICR7dGhpcy5hY3Rpb25OYW1lfWBcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIExvYWQgdGhlIGVycm9yL3J1bGUgdmlvbGF0aW9ucyBpbnRvIHRoZSBTZXJ2aWNlQ29udGV4dCBzbyB0aGF0IHRoZSBpbmZvcm1hdGlvbiBidWJibGVzIHVwIHRvIHRoZSBjYWxsZXIgb2YgdGhlIHNlcnZpY2U7XHJcbiAgICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHQucmVzdWx0cy5mb3JFYWNoKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgdGhpcy5wdWJsaXNoUnVsZVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVJ1bGVEZXRhaWxzKHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBvc3RFeGVjdXRlQWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aW9uUmVzdWx0ID09PSBBY3Rpb25SZXN1bHQuRmFpbCkge1xyXG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgaWYgKGUuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yKSB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICAgICAgZS50b1N0cmluZygpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbGwgY29uY3JldGUgYWN0aW9ucyBtdXN0IG92ZXJyaWRlIGFuZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QuIEl0IGlzIGRlZmluZWQgaW4gdGhlIFtBY3Rpb25dIGZyYW1ld29yayBjbGFzcy5cclxuICAgKi9cclxuICB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpOiBBY3Rpb25SZXN1bHQge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSdW5uaW5nIFt2YWxpZGF0ZUFjdGlvblJlc3VsdF0gZm9yICR7dGhpcy5hY3Rpb25OYW1lfS5gXHJcbiAgICApO1xyXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBzdGF0dXMgb2YgdGhlIGFjdGlvbiBiYXNlZCBvbiBhbnkgcnVsZSB2aW9sYXRpb25zO1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbkNvbnRleHQuaGFzUnVsZVZpb2xhdGlvbnMoKSkge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgYFRoZSAke3RoaXMuYWN0aW9uTmFtZX0gY29udGFpbnMgcnVsZSB2aW9sYXRpb25zLmBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5hY3Rpb25SZXN1bHQgPSBBY3Rpb25SZXN1bHQuRmFpbDtcclxuXHJcbiAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xyXG4gICAgICBlcnJvclJlc3BvbnNlLklzU3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UgPSBgVmFsaWRhdGlvbiBlcnJvcnMgZXhpc3QuYDtcclxuICAgICAgdGhpcy5yZXNwb25zZSA9IE9ic2VydmFibGUudGhyb3coZXJyb3JSZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGlvblJlc3VsdCA9IHRoaXMuc2VydmljZUNvbnRleHQuaXNHb29kKClcclxuICAgICAgPyBBY3Rpb25SZXN1bHQuU3VjY2Vzc1xyXG4gICAgICA6IEFjdGlvblJlc3VsdC5GYWlsO1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uUmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHByb2Nlc3MgcnVsZSByZXN1bHRzIGZvciBjb21wb3NpdGUgcnVsZXMuIE5vdGUsIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyByZWN1cnNpdmVcclxuICAgKiBhbmQgd2lsbCBwcm9jZXNzIGFsbCBjb21wb3NpdGUgcnVsZXMgaW4gdGhlIHJ1bGUgc2V0IGNvbnRhaW5lZCBpbiB0aGUgVmFsaWRhdGlvbkNvbnRleHQuXHJcbiAgICogQHBhcmFtIHJ1bGVSZXN1bHQgVGhlIHJlc3VsdCBvZiBhIHJlbmRlcmVkIHJ1bGUuXHJcbiAgICovXHJcbiAgcmV0cmlldmVSdWxlRGV0YWlscyhydWxlUmVzdWx0OiBSdWxlUmVzdWx0KSB7XHJcbiAgICBpZiAocnVsZVJlc3VsdC5ydWxlUG9saWN5IGluc3RhbmNlb2YgQ29tcG9zaXRlUnVsZSkge1xyXG4gICAgICBjb25zdCBjb21wb3NpdGUgPSBydWxlUmVzdWx0LnJ1bGVQb2xpY3kgYXMgQ29tcG9zaXRlUnVsZTtcclxuICAgICAgaWYgKGNvbXBvc2l0ZSAmJiBjb21wb3NpdGUuaGFzRXJyb3JzKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gY29tcG9zaXRlLnJlc3VsdHMuZmlsdGVyKFxyXG4gICAgICAgICAgcmVzdWx0ID0+ICFyZXN1bHQuaXNWYWxpZCAmJiByZXN1bHQucnVsZVBvbGljeS5pc0Rpc3BsYXlhYmxlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZXJyb3JzLmZvckVhY2goZXJyb3JSZXN1bHQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wdWJsaXNoUnVsZVJlc3VsdChlcnJvclJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgaWYgKGVycm9yUmVzdWx0LnJ1bGVQb2xpY3kgaW5zdGFuY2VvZiBDb21wb3NpdGVSdWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0cmlldmVSdWxlRGV0YWlscyhlcnJvclJlc3VsdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgaGVscGVyIGZ1bmN0aW9uIHRvIHB1Ymxpc2ggYSBuZXcgW1NlcnZpY2VNZXNzYWdlXSB0byB0aGUgW1NlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzXSBsaXN0LlxyXG4gICAqIEBwYXJhbSBydWxlUmVzdWx0XHJcbiAgICovXHJcbiAgcHVibGlzaFJ1bGVSZXN1bHQocnVsZVJlc3VsdDogUnVsZVJlc3VsdCkge1xyXG4gICAgY29uc3Qgc2VydmljZU1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoXHJcbiAgICAgIHJ1bGVSZXN1bHQucnVsZVBvbGljeS5uYW1lLFxyXG4gICAgICBydWxlUmVzdWx0LnJ1bGVQb2xpY3kubWVzc2FnZSxcclxuICAgICAgTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICk7XHJcbiAgICBzZXJ2aWNlTWVzc2FnZS5EaXNwbGF5VG9Vc2VyID0gcnVsZVJlc3VsdC5ydWxlUG9saWN5LmlzRGlzcGxheWFibGU7XHJcbiAgICBzZXJ2aWNlTWVzc2FnZS5Tb3VyY2UgPSB0aGlzLmFjdGlvbk5hbWU7XHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLnB1c2goc2VydmljZU1lc3NhZ2UpO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgIGAke3NlcnZpY2VNZXNzYWdlLnRvU3RyaW5nKCl9YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuXHJcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VNZXNzYWdlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgYnVzaW5lc3MgcHJvdmlkZXIgYmFzZSBjbGFzcyB0byBhY2Nlc3MgY29tbW9uIGVsZW1lbnRzIG9mIHRoZSBidXNpbmVzcyBwcm92aWRlci5cclxuICpcclxuICogc2VydmljZUNvbnRleHQ6IFRoaXMgaXMgaW5pdGlhbGl6ZWQgZm9yIGVhY2ggaW5zdGFuY2Ugb2YgYSBidXNpbmVzcyBwcm92aWRlciAtIGl0cyBwdXJwb3NlIGlzIHRvIGNvbGxlY3QgaW5mb3JtYXRpb24gZHVyaW5nIHRoZSBwcm9jZXNzaW5nIG9mIGJ1c2luZXNzIGxvZ2ljLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJ1c2luZXNzUHJvdmlkZXJCYXNlIHtcclxuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dDtcclxuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFJ1bm5pbmcgY29uc3RydWN0b3IgZm9yIHRoZSBbQnVzaW5lc3NQcm92aWRlckJhc2VdLmBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIGFuIHVuZXhwZWN0ZWQgZXJyb3IgaW4gdGhlIGFwcGxpY2F0aW9uLiBUaGUgZXJyb3Igc2hvdWxkIGltcGxlbWVudFxyXG4gICAqIHRoZSBzcGVjaWZpZWQgaW50ZXJmYWNlLiBUaGUgbWV0aG9kIHdpbGwgYWRkIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlXHJcbiAgICogc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICogQHBhcmFtIGVycm9yIEFuIHVuZXhwZWN0ZWQgYXBwbGljYXRpb24gZXJyb3IgdGhhdCBpbXBsZW1lbnRzIHRoZSBbRXJyb3JdIGludGVyZmFjZS5cclxuICAgKlxyXG4gICAqIGludGVyZmFjZSBFcnJvciB7XHJcbiAgICogIG5hbWU6IHN0cmluZztcclxuICAgKiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAqICBzdGFjaz86IHN0cmluZztcclxuICAgKiB9XHJcbiAgICovXHJcbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlKVxyXG4gICAgICAuV2l0aERpc3BsYXlUb1VzZXIodHJ1ZSlcclxuICAgICAgLldpdGhNZXNzYWdlVHlwZShNZXNzYWdlVHlwZS5FcnJvcilcclxuICAgICAgLldpdGhTb3VyY2UodGhpcy5zZXJ2aWNlTmFtZSk7XHJcblxyXG4gICAgY29uc3QgbG9nSXRlbSA9IGAke21lc3NhZ2UudG9TdHJpbmcoKX07ICR7ZXJyb3Iuc3RhY2t9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBsb2dJdGVtKTtcclxuXHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBmaW5pc2hSZXF1ZXN0KHNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUmVxdWVzdCBmb3IgWyR7c291cmNlTmFtZX1dIGJ5ICR7dGhpcy5zZXJ2aWNlTmFtZX0gaXMgY29tcGxldGUuYFxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFByZXBhcmluZyB0byB3cml0ZSBvdXQgdGhlIGVycm9ycy5gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5EaXNwbGF5VG9Vc2VyICYmIGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXHJcbiAgICAgICkuZm9yRWFjaChlID0+XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGUudG9TdHJpbmcoKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFVzZSB0byBwcm92aWRlIHRoZSBhbGVydCB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgQWxlcnROb3RpZmljYXRpb24gYW5kIEFsZXJ0Q29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFsZXJ0VHlwZXMge1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSW5mb3JtYXRpb246IHN0cmluZyA9ICdhbGVydC1pbmZvJztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFdhcm5pbmc6IHN0cmluZyA9ICdhbGVydC13YXJuaW5nJztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERhbmdlcjogc3RyaW5nID0gJ2FsZXJ0LWRhbmdlcic7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBTdWNjZXNzOiBzdHJpbmcgPSAnYWxlcnQtc3VjY2Vzcyc7XHJcbn1cclxuIiwiaW1wb3J0IHsgQWxlcnRUeXBlcyB9IGZyb20gJy4vYWxlcnQtdHlwZXMuY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBbGVydE5vdGlmaWNhdGlvbiB7XHJcbiAgdHlwZTogc3RyaW5nID0gQWxlcnRUeXBlcy5JbmZvcm1hdGlvbjsgLy8gYWxlcnQtd2FybmluZywgYWxlcnQtc3VjY2VzcywgYWxlcnQtaW5mbywgYWxlcnQtZGFuZ2VyXHJcbiAgaGVhZGVyOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBtZXNzYWdlczogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgc2hvd0FsZXJ0ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaGVhZGVyOiBzdHJpbmcsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZXM/OiBBcnJheTxzdHJpbmc+LFxyXG4gICAgdHlwZT86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIGlmIChtZXNzYWdlcykge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5zaG93QWxlcnQgPSB0cnVlOyAvLyB1c2VkIHRvIHRyaWdnZXIgdGhlIGRpc3BsYXkgb2YgdGhlIG5vdGlmaWNhdGlvbi5cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1lc3NhZ2VUeXBlLFxyXG4gIFNlcnZpY2VDb250ZXh0LFxyXG4gIFNlcnZpY2VNZXNzYWdlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7XHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICBTZXZlcml0eVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQWxlcnROb3RpZmljYXRpb24gfSBmcm9tICcuL21vZGVscy9hbGVydC1ub3RpZmljYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBBbGVydFR5cGVzIH0gZnJvbSAnLi9tb2RlbHMvYWxlcnQtdHlwZXMuY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRCYXNlIHtcclxuICBjb21wb25lbnROYW1lOiBzdHJpbmc7XHJcbiAgYWxlcnROb3RpZmljYXRpb246IEFsZXJ0Tm90aWZpY2F0aW9uO1xyXG4gIG5hdlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvbXBvbmVudE5hbWU6IHN0cmluZyxcclxuICAgIHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZTtcclxuICAgIHRoaXMuYWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oJycsICcnKTtcclxuXHJcbiAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgICAgIHRoaXMuZ29vZ2xlQW5hbHl0aWNzUGFnZXZpZXcoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnN0IHJvdXRlckV2ZW50ID0gdGhpcy5yb3V0ZXIuZXZlbnRzLmZpbHRlcihcclxuICAgIC8vICAgZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kXHJcbiAgICAvLyApO1xyXG4gICAgLy8gaWYgKHJvdXRlckV2ZW50ICYmIHJvdXRlckV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgLy8gICB0aGlzLmdvb2dsZUFuYWx5dGljc1BhZ2V2aWV3KHJvdXRlckV2ZW50KTtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBzZW5kIGFuIGFuYWx5dGljIGV2ZW50IHRvIFtHb29nbGUgQW5hbHl0aWNzXS5cclxuICAgKiBAcGFyYW0gY2F0ZWdvcnkgQSBjYXRlZ29yeSBpcyBhIG5hbWUgdGhhdCB5b3Ugc3VwcGx5IGFzIGEgd2F5IHRvIGdyb3VwIG9iamVjdHMgdGhhdCB5b3Ugd2FudCB0byB0cmFjay4gVHlwaWNhbGx5LCB5b3Ugd2lsbCB1c2UgdGhlIHNhbWUgY2F0ZWdvcnkgbmFtZSBtdWx0aXBsZSB0aW1lcyBvdmVyIHJlbGF0ZWQgVUkgZWxlbWVudHMgdGhhdCB5b3Ugd2FudCB0byBncm91cCB1bmRlciBhIGdpdmVuIGNhdGVnb3J5LlxyXG4gICAqIEBwYXJhbSBhY3Rpb24gVXNlIHRoZSBhY3Rpb24gcGFyYW1ldGVyIHRvIG5hbWUgdGhlIHR5cGUgb2YgZXZlbnQgb3IgaW50ZXJhY3Rpb24geW91IHdhbnQgdG8gdHJhY2sgZm9yIGEgcGFydGljdWxhciB3ZWIgb2JqZWN0IChpLmUuLCBwbGF5LCBzdG9wLCBwYXVzZSwgZG93bmxvYWQpLiBBIHVuaXF1ZSBldmVudCBpcyBkZXRlcm1pbmVkIGJ5IGEgdW5pcXVlIGFjdGlvbiBuYW1lLiBZb3UgY2FuIHVzZSBkdXBsaWNhdGUgYWN0aW9uIG5hbWVzIGFjcm9zcyBjYXRlZ29yaWVzLCBidXQgdGhpcyBjYW4gYWZmZWN0IGhvdyB1bmlxdWUgZXZlbnRzIGFyZSBjYWxjdWxhdGVkLiBTZWUgdGhlIHN1Z2dlc3Rpb25zIGJlbG93IGFuZCB0aGUgSW1wbGljaXQgQ291bnQgc2VjdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxyXG4gICAqIEBwYXJhbSBsYWJlbCBQcm92aWRlIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gZm9yIGV2ZW50cyB0aGF0IHlvdSB3YW50IHRvIHRyYWNrLCBzdWNoIGFzIHRoZSBtb3ZpZSB0aXRsZSBpbiB0aGUgdmlkZW8gZXhhbXBsZXMgYWJvdmUsIG9yIHRoZSBuYW1lIG9mIGEgZmlsZSB3aGVuIHRyYWNraW5nIGRvd25sb2Fkcy4gQWxsIGxhYmVscyBhcmUgbGlzdGVkIGluZGVwZW5kZW50bHkgZnJvbSB0aGVpciBwYXJlbnQgY2F0ZWdvcmllcyBhbmQgYWN0aW9ucy4gVGhpcyBwcm92aWRlcyB5b3Ugd2l0aCBhbm90aGVyIHVzZWZ1bCB3YXkgdG8gc2VnbWVudCB0aGUgZXZlbnQgZGF0YSBmb3IgeW91ciByZXBvcnRzLiBBbGwgbGFiZWxzIGFyZSBsaXN0ZWQgaW5kZXBlbmRlbnRseSBmcm9tIHRoZWlyIHBhcmVudCBjYXRlZ29yaWVzIGFuZCBhY3Rpb25zLiBUaGlzIHByb3ZpZGVzIHlvdSB3aXRoIGFub3RoZXIgdXNlZnVsIHdheSB0byBzZWdtZW50IHRoZSBldmVudCBkYXRhIGZvciB5b3VyIHJlcG9ydHMuXHJcbiAgICogQHBhcmFtIHZhbHVlIEFueSBudW1lcmljIHZhbHVlIGluZGljYXRpbmcgYSBbdmFsdWVdIHRoYXQgd2lsbCBiZSBzdW1tYXJpemVkIGZvciB0aGUgYW5hbHl0aWMgaXRlbShzKS5cclxuICAgKlxyXG4gICAqIE1vcmUgaW5mb3JtYXRpb24gYXQ6IGh0dHBzOi8vc3VwcG9ydC5nb29nbGUuY29tL2FuYWx5dGljcy9hbnN3ZXIvMTAzMzA2OFxyXG4gICAqIG9yIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9ldmVudHNcclxuICAgKi9cclxuICBwdWJsaWMgZ29vZ2xlQW5hbHl0aWNzU2VuZEV2ZW50KFxyXG4gICAgY2F0ZWdvcnk6IHN0cmluZyxcclxuICAgIGFjdGlvbjogc3RyaW5nLFxyXG4gICAgbGFiZWw6IHN0cmluZyxcclxuICAgIHZhbHVlOiBudW1iZXJcclxuICApIHtcclxuICAgICg8YW55PndpbmRvdykuZ3RhZygnZXZlbnQnLCBhY3Rpb24sIHtcclxuICAgICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxyXG4gICAgICBldmVudF9sYWJlbDogbGFiZWwsXHJcbiAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdvb2dsZUFuYWx5dGljc1BhZ2V2aWV3KGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgIGBQcmVwYXJpbmcgdG8gc2V0IFtHb29nbGUgQW5hbHl0aWNzXSBwYWdlIHZpZXcgZm9yIFske1xyXG4gICAgICAgICAgZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHNcclxuICAgICAgICB9XS5gXHJcbiAgICAgICk7XHJcbiAgICAgIC8vICg8YW55PndpbmRvdykuZ2EoJ3NldCcsICdwYWdlJywgZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpO1xyXG4gICAgICAvLyAoPGFueT53aW5kb3cpLmdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7XHJcbiAgICAgIC8vIGdhKCdjcmVhdGUnLCAnVUEtMTEwMTk0MzQ0LTEnLCAnYXV0bycsIHRoaXMuY29tcG9uZW50TmFtZSk7XHJcbiAgICAgIC8vIGdhKGAke3RoaXMuY29tcG9uZW50TmFtZX0uc2VuZGAsICdwYWdldmlldycpO1xyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9ibG9nLnRoZWNvZGVjYW1wdXMuZGUvYW5ndWxhci0yLWdvb2dsZS1hbmFseXRpY3MtZ29vZ2xlLXRhZy1tYW5hZ2VyL1xyXG4gICAgICAvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL3BhZ2VzXHJcbiAgICAgIGNvbnN0IEdBX1RSQUNLSU5HX0lEID0gJ1VBLTExMDE5NDM0NC0xJztcclxuICAgICAgLy8gZ3RhZygnY29uZmlnJywgJ0dBX1RSQUNLSU5HX0lEJywgezxwYWdldmlld19wYXJhbWV0ZXJzPn0pO1xyXG4gICAgICAoPGFueT53aW5kb3cpLmdhKCdjb25maWcnLCBHQV9UUkFDS0lOR19JRCwge1xyXG4gICAgICAgIHBhZ2VfdGl0bGU6IHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICBwYWdlX3BhdGg6IGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIFNldmVyaXR5Lldhcm5pbmcsXHJcbiAgICAgICAgYEZhaWxlZCB0byBzZXQgW0dvb2dsZSBBbmFseXRpY3NdIHBhZ2Ugdmlldy5gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gY3JlYXRlIGEgc2ltcGxlIFtFcnJvclJlc3BvbnNlXSB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHRvIHRoZSB1c2VyLlxyXG4gICAqL1xyXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2UobWVzc2FnZTogc3RyaW5nKTogRXJyb3JSZXNwb25zZSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgZXJyb3IgcmVzcG9uc2UgZm9yIGNvbXBvbmVudC5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XHJcbiAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgcmV0dXJuIGVycm9yUmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIHNlcnZpY2UgZXJyb3JzLiBUaGVzZSBhcmUgZXJyb3IgcmVzcG9uc2UgW1NlZTogRXJyb3JSZXNwb25zZV0gZnJvbVxyXG4gICAqIHRoZSBhcHBsaWNhdGlvbiBidXNpbmVzcyBsYXllcnMgKEFjdGlvbihzKSBvciBIdHRwKSB0aGF0IHdpbGwgYnViYmxlIHVwIHRvIHRoZVxyXG4gICAqIGNhbGxlciAoaS5lLiwgYSBjb21wb25lbnQpIGluIGEgc3BlY2lmaWVkIGZvcm1hdDpcclxuICAgKlxyXG4gICAqIElzU3VjY2VzczogYm9vbGVhbiA9IGZhbHNlOyAvLyBkZWZhdWx0IGZvciBFcnJvclJlc3BvbnNlXHJcbiAgICogTWVzc2FnZTogc3RyaW5nO1xyXG4gICAqIEVycm9yczogQXJyYXk8U2VydmljZUVycm9yPiA9IG5ldyBBcnJheTxTZXJ2aWNlRXJyb3I+KCk7XHJcbiAgICogRXhjZXB0aW9uOiBhbnk7XHJcbiAgICovXHJcbiAgaGFuZGxlU2VydmljZUVycm9ycyhcclxuICAgIGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UsXHJcbiAgICBzZXJ2aWNlQ29udGV4dD86IFNlcnZpY2VDb250ZXh0XHJcbiAgKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBoYW5kbGUgc2VydmljZSBlcnJvcnMgZm9yIGNvbXBvbmVudC5gXHJcbiAgICApO1xyXG4gICAgaWYgKHNlcnZpY2VDb250ZXh0ICYmIHNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgUmV0cmlldmluZyBlcnJvciBtZXNzYWdlcyBmcm9tIHRoZSBTZXJ2aWNlQ29udGV4dC9WYWxpZGF0aW9uQ29udGV4dDtgXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5yZXRyaWV2ZVNlcnZpY2VDb250ZXh0RXJyb3JNZXNzYWdlcyhzZXJ2aWNlQ29udGV4dCk7XHJcbiAgICAgIHRoaXMuYWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oXHJcbiAgICAgICAgJ0Vycm9ycycsXHJcbiAgICAgICAgZXJyb3JSZXNwb25zZS5NZXNzYWdlLFxyXG4gICAgICAgIG1lc3NhZ2VzLFxyXG4gICAgICAgIEFsZXJ0VHlwZXMuV2FybmluZ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGVycm9yUmVzcG9uc2UgJiYgZXJyb3JSZXNwb25zZS5NZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICAgIGBSZXRyaWV2aW5nIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIFtFcnJvclJlc3BvbnNlXS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLnJldHJpZXZlUmVzcG9uc2VFcnJvck1lc3NhZ2VzKGVycm9yUmVzcG9uc2UpO1xyXG4gICAgICAgIHRoaXMuYWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgZXJyb3JSZXNwb25zZS5NZXNzYWdlLFxyXG4gICAgICAgICAgZXJyb3JzLFxyXG4gICAgICAgICAgQWxlcnRUeXBlcy5XYXJuaW5nXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgYEVycm9yOiAke2Vycm9yUmVzcG9uc2UuTWVzc2FnZX1gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJldHJpZXZlIHRoZSBlcnJvciBtZXNzYWdlcyBmcm9tIHRoZSBzcGVjaWZpZWQgW1NlcnZpY2VDb250ZXh0XS5cclxuICAgKlxyXG4gICAqIEBwYXJtOiBzZXJ2aWNlQ29udGV4dDogQSBjb250ZXh0IG9iamVjdCBjb250YWluaW5nIG1lc3NhZ2VzIGZvciB0aGUgc3BlY2lmaWVkIHJlcXVlc3QuXHJcbiAgICovXHJcbiAgcmV0cmlldmVTZXJ2aWNlQ29udGV4dEVycm9yTWVzc2FnZXMoXHJcbiAgICBzZXJ2aWNlQ29udGV4dDogU2VydmljZUNvbnRleHRcclxuICApOiBBcnJheTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2VzID0gQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZm9yRWFjaChlID0+IHtcclxuICAgICAgaWYgKGUuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yICYmIGUuRGlzcGxheVRvVXNlcikge1xyXG4gICAgICAgIG1lc3NhZ2VzLnB1c2goZS5NZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWVzc2FnZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmV0cmlldmUgdGhlIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIHNwZWNpZmllZCBXZWIgQVBJIHJlc3BvbnNlLlxyXG4gICAqL1xyXG4gIHJldHJpZXZlUmVzcG9uc2VFcnJvck1lc3NhZ2VzKGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGVycm9ycyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICBpZiAoZXJyb3JSZXNwb25zZSAmJiBlcnJvclJlc3BvbnNlLkVycm9ycykge1xyXG4gICAgICBlcnJvclJlc3BvbnNlLkVycm9ycy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgIGlmIChlLkRpc3BsYXlUb1VzZXIpIHtcclxuICAgICAgICAgIGVycm9ycy5wdXNoKGUuTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVzZXQgdGhlIFtBbGVydE5vdGlmaWNhdGlvbl0gdG8gdGhlIGluaXRpYWwgc3RhdGUuIFJlbW92ZXNcclxuICAgKiBleGlzdGluZyBtZXNzYWdlcyBhbmQgaGlkZXMgdGhlIEFsZXJ0Q29tcG9uZW50LlxyXG4gICAqL1xyXG4gIHJlc2V0QWxlcnROb3RpZmljYXRpb25zKCkge1xyXG4gICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIG5hdmlnYXRlIHRvIHRoZSBzcGVjaWZpZWQgcm91dGUuXHJcbiAgICogQHBhcm0gcm91dGVOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXJnZXQgcm91dGUuXHJcbiAgICovXHJcbiAgcHVibGljIHJvdXRlVG8ocm91dGVOYW1lOiBzdHJpbmcpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtyb3V0ZU5hbWVdKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICBgRXJyb3Igd2hpbGUgYXR0ZW1wdGluZyB0byBuYXZpZ2F0ZSB0byBbJHtyb3V0ZU5hbWV9XSByb3V0ZSBmcm9tICR7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWVcclxuICAgICAgICB9LiBFcnJvcjogJHtlcnJvci50b1N0cmluZygpfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXRyaWV2ZSBhbmQgc2hvdyBhbnkgcmVzcG9uc2UgZXJyb3IgbWVzc2FnZXMuXHJcbiAgICovXHJcbiAgc2hvd1Jlc3BvbnNlRXJyb3JzKHJlc3BvbnNlOiBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICB0aGlzLmhhbmRsZVNlcnZpY2VFcnJvcnMocmVzcG9uc2UsIHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBmaW5pc2hSZXF1ZXN0KG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGAke3RoaXMuY29tcG9uZW50TmFtZX06ICR7bWVzc2FnZX1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNob3dBbGVydE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBhbGVydChtZXNzYWdlKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnLi9odHRwLXJlcXVlc3QtbWV0aG9kcy5lbnVtJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIdHRwUmVxdWVzdE9wdGlvbnMge1xyXG4gIHJlcXVlc3RNZXRob2Q6IEh0dHBSZXF1ZXN0TWV0aG9kO1xyXG4gIGJvZHk/OiBhbnk7XHJcbiAgaGVhZGVycz86IEh0dHBIZWFkZXJzIHwgeyBbaGVhZGVyOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xyXG4gIG9ic2VydmU/OiAnYm9keSc7XHJcbiAgcGFyYW1zPzogSHR0cFBhcmFtcyB8IHsgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xyXG4gIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbjtcclxuICAvLyByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcic7XHJcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcclxuICByZXF1ZXN0VXJsOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBIdHRwQ2xpZW50LFxyXG4gIEh0dHBFdmVudCxcclxuICBIdHRwSGVhZGVycyxcclxuICBIdHRwUGFyYW1zLFxyXG4gIEh0dHBSZXNwb25zZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJy4vbW9kZWxzL2h0dHAtcmVxdWVzdC1tZXRob2RzLmVudW0nO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1lcnJvci5tb2RlbCc7XHJcbmltcG9ydCB7IFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwnO1xyXG4vLyBpbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGNyZWF0ZSBhbmQgZXhlY3V0ZSBIVFRQIHNlcnZpY2UgcmVxdWVzdHMuXHJcbiAqIDEuIENyZWF0ZSBIdHRwSGVhZGVyc1xyXG4gKiAyLiBDcmVhdGUgUmVxdWVzdE9wdGlvbnNcclxuICogMy4gRXhlY3V0ZSBSZXF1ZXN0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwQmFzZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBzZXJ2aWNlTmFtZSA9ICdIdHRwQmFzZVNlcnZpY2UnO1xyXG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgW211bHRpcGFydC9mb3JtLWRhdGFdLlxyXG4gICAqL1xyXG4gIGNyZWF0ZU11bHRpcGFydEZvcm1EYXRhSGVhZGVyKHJlcXVpcmVzQXV0aFRva2VuOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGhlYWRlciBmb3IgdGhlIFttdWx0aXBhcnQvZm9ybS1kYXRhXSBIVFRQIHJlcXVlc3QuIFJlcXVpcmVzQXV0aFRva2VuOiAke3JlcXVpcmVzQXV0aFRva2VufS5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgaWYgKHJlcXVpcmVzQXV0aFRva2VuKSB7XHJcbiAgICAgIC8vIGNyZWF0ZSBoZWFkZXIgcmVxdWVzdCB3aXRoIHNlY3VyaXR5IHRva2VuO1xyXG4gICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLmFjY2Vzc1Rva2VufWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gY3JlYXRlIGEgW0hlYWRlcl0gZm9yIENvbnRlbnQtVHlwZSBbYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXS5cclxuICAgKi9cclxuICBjcmVhdGVGb3JtVXJsZW5jb2RlZEhlYWRlcigpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgaGVhZGVyIGZvciB0aGUgW2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZF0gSFRUUCByZXF1ZXN0LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciB0aGUgSFRUUCByZXF1ZXN0LiBJZiB0aGUgW3JlcXVpcmVzQXV0aFRva2VuXSBpbmRpY2F0b3JcclxuICAgKiBpcyB0cnVlLCB0aGUgcmVxdWVzdCB3aWxsIHVzZSB0aGUgY3VycmVudCBBdXRob3JpemF0aW9uIHNlY3VyaXR5IHRva2VuLlxyXG4gICAqIEBwYXJhbSBpc1NlY3VyZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUhlYWRlcihyZXF1aXJlc0F1dGhUb2tlbjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBoZWFkZXIgZm9yIHRoZSBIVFRQIHJlcXVlc3QuIFJlcXVpcmVzQXV0aFRva2VuOiAke3JlcXVpcmVzQXV0aFRva2VufS5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICBpZiAocmVxdWlyZXNBdXRoVG9rZW4pIHtcclxuICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy5hY2Nlc3NUb2tlbn1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBIdHRwUmVxdWVzdE9wdGlvbnMgaXRlbSBmb3IgYSByZXF1ZXN0LlxyXG4gICAqIEBwYXJhbSBoZWFkZXJzIFVzZSB0byBzdXBwbHkgaGVhZGVyIGluZm9ybWF0aW9uIGluIHRoZSByZXF1ZXN0LlxyXG4gICAqIEBwYXJhbSB1cmwgVXNlIHRvIGluZGljYXRlIHRoZSBVUkwgb2YgdGhlIHdlYiBhcGkuXHJcbiAgICogQHBhcmFtIGJvZHkgVXNlIHRvIHByb3ZpZGUgYSBkYXRhIHBheWxvYWQgZm9yIHRoZSByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIGNyZWF0ZVJlcXVlc3RPcHRpb25zKFxyXG4gICAgbWV0aG9kOiBIdHRwUmVxdWVzdE1ldGhvZCxcclxuICAgIGhlYWRlcnM6IEh0dHBIZWFkZXJzLFxyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBib2R5OiBhbnlcclxuICApIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgcmVxdWVzdCBvcHRpb25zIGZvciB0aGUgSFRUUCByZXF1ZXN0LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IEh0dHBSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgb3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcclxuICAgIG9wdGlvbnMucmVxdWVzdFVybCA9IHVybDtcclxuICAgIG9wdGlvbnMuYm9keSA9IGJvZHk7XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCBoZWFkZXIgYW5kIFVSTC5cclxuICAgKi9cclxuICBleGVjdXRlUmVxdWVzdChcclxuICAgIHJlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGV4ZWN1dGUgSFRUUCByZXF1ZXN0LiBVcmw6ICR7cmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybH1gXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxTZXJ2aWNlUmVzcG9uc2U+KFxyXG4gICAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0TWV0aG9kLnRvU3RyaW5nKCksXHJcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmwsXHJcbiAgICAgIHJlcXVlc3RPcHRpb25zXHJcbiAgICApO1xyXG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgLy8gICAucmVxdWVzdChuZXcgUmVxdWVzdChyZXF1ZXN0T3B0aW9ucykpXHJcbiAgICAvLyAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKSAvLyBtYXBzIHRoZSBvYnNlcnZhYmxlIHJlc3BvbnNlIHRvIGEgSlNPTiBvYmplY3Q7XHJcbiAgICAvLyAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmhhbmRsZUh0dHBFcnJvcihlcnJvciwgcmVxdWVzdE9wdGlvbnMpKTsgLy8gdXNlIHRvIGhhbmRsZSBhbnkgZXhjZXB0aW9uIGR1cmluZyBzZXJ2aWNlIGNhbGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIFtnZXRdIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCB1cmwgYW5kIG9wdGlvbnMuXHJcbiAgICovXHJcbiAgZ2V0PFNlcnZpY2VSZXNwb25zZT4oXHJcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QgPSBIdHRwUmVxdWVzdE1ldGhvZC5HRVQ7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCwgcmVxdWVzdE9wdGlvbnMpXHJcbiAgICAgIC5waXBlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgYW4gSFRUUCBbcG9zdF0gcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIHVybCBhbmQgb3B0aW9ucy5cclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnMgdXNlIHRvIGRlZmluZSB0aGUgb3B0aW9ucyBmb3IgdGhlIHNwZWNpZmllZCByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHBvc3Q8U2VydmljZVJlc3BvbnNlPihcclxuICAgIHJlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdE1ldGhvZCA9IEh0dHBSZXF1ZXN0TWV0aG9kLlBPU1Q7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuaHR0cFxyXG4gICAgICAucG9zdDxTZXJ2aWNlUmVzcG9uc2U+KHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgICAucGlwZSgpO1xyXG5cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBoYW5kbGUgSFRUUCBlcnJvcnMgd2hlbiBjYWxsaW5nIHdlYiBhcGkocykuXHJcbiAgICovXHJcbiAgaGFuZGxlSHR0cEVycm9yKFxyXG4gICAgZXJyb3I6IGFueSxcclxuICAgIHJlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcclxuICAgICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybFxyXG4gICAgfSwgJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0T3B0aW9ucy5ib2R5KX1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgaWYgKGVycm9yICYmIGVycm9yLl9ib2R5KSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaGlzIGlzIGFuIGVycm9yIHRoYXQgY29udGFpbnMgYSBib2R5IC0gYSBbUmVzcG9uc2VdIGZyb20gdGhlIGFwcGxpY2F0aW9uIHdlYiBhcGkuIEluY2x1ZGVzOlxyXG4gICAgICAgKiAxLiBJc1N1Y2Nlc3NcclxuICAgICAgICogMi4gTWVzc2FnZVxyXG4gICAgICAgKiAzLiBBcnJheSBvZiBTZXJ2aWNlRXJyb3IgaXRlbXNcclxuICAgICAgICogNC4gRXhjZXB0aW9uIChvcHRpb25hbClcclxuICAgICAgICovXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBlcnJvci5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFRPRE86IFJFVFJJRVZFIEVSUk9SIERFVEFJTFM7IFNUQVRVUywgTUVTU0FHRTsgRVRDLiBBTkQgUFJPVklERSBUTyBIQU5ETEVSO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgY29uc3QgZXJyID0gPEVycm9yPmV4O1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGAke2Vyci5uYW1lfTsgJHtlcnIubWVzc2FnZX1gO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yPzogRXJyb3IpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKGVycm9yKTtcclxuICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XHJcbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2UoZXJyb3I/OiBFcnJvcik6IEVycm9yUmVzcG9uc2Uge1xyXG4gICAgbGV0IG1lc3NhZ2UgPSAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLic7XHJcbiAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICBtZXNzYWdlID0gYCR7ZXJyb3IubmFtZX0gLSAke2Vycm9yLm1lc3NhZ2V9YDtcclxuICAgICAgcmVzcG9uc2UuRXhjZXB0aW9uID0gZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFVzZSB0aGlzIG1vZGVsIHRvIHJlcHJlc2VudCBzZXJ2aWNlIGVycm9yL21lc3NhZ2UgaW5mb3JtYXRpb24gZnJvbSB0aGVcclxuICogYXBwbGljYXRpb24ncyBzZXJ2aWNlIEFQSXMuXHJcbiAqXHJcbiAqIFRoZSBEaXNwbGF5VG9Vc2VyIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIG1lc3NhZ2Ugc2hvdWxkIGJlXHJcbiAqIGRpc3BsYXllZCB0byB0aGUgdXNlciBpZiBkZXNpcmVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VFcnJvciB7XHJcbiAgLy8gXCJ7XCJJc1N1Y2Nlc3NcIjpmYWxzZSxcclxuICAvLyBcIk1lc3NhZ2VcIjpcIkZhaWxlZCB0byBjcmVhdGUgbmV3IHVzZXIgYWNjb3VudC5cIixcclxuICAvLyBcIkVycm9yc1wiOlt7XCJOYW1lXCI6XCJQYXNzd29yZEZvcm1hdElzVmFsaWRcIixcclxuICAvLyBcIk1lc3NhZ2VcIjpcIlRoZSBwYXNzd29yZCBmb3JtYXQgaXMgbm90IHZhbGlkLiBNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lOiBhbHBoYSwgbnVtZXJpYywgYW5kIHNwZWNpYWwgY2hhcmFjdGVyLlwiLFxyXG4gIC8vIFwiRXhjZXB0aW9uXCI6bnVsbCxcIlNvdXJjZVwiOlwiQ3JlYXRlTGVhcm5lckFjY291bnRBY3Rpb25cIixcclxuICAvLyBEaXNwbGF5VG9Vc2VyXCI6dHJ1ZSxcIlRhcmdldFwiOlwiXCJ9XX1cIlxyXG5cclxuICBOYW1lOiBzdHJpbmc7XHJcbiAgTWVzc2FnZTogc3RyaW5nO1xyXG4gIEV4Y2VwdGlvbjogYW55O1xyXG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XHJcbiAgU291cmNlOiBzdHJpbmc7XHJcbiAgVGFyZ2V0OiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlUmVzcG9uc2Uge1xyXG4gIElzU3VjY2VzczogYm9vbGVhbjtcclxuICBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgRGF0YTogYW55O1xyXG4gIEVycm9yczogQXJyYXk8U2VydmljZUVycm9yPiA9IG5ldyBBcnJheTxTZXJ2aWNlRXJyb3I+KCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O1lBS0MsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixFQUFFLFlBQVksRUFBRSwrQkFBK0IsQ0FBQzthQUN0Rjs7Ozs7OztBQ0xEOzt5QkFDYyxLQUFLO3NCQUVhLElBQUksS0FBSyxFQUFnQjs7Q0FFeEQ7Ozs7OztBQ1BEOzs7O0FBcUJBOzs7Ozs7Ozs7SUFhRSxZQUFtQixjQUE0QztRQUE1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBOEI7MkJBWmpELEVBQUU7OEJBRWlCLElBQUksY0FBYyxFQUFFO0tBVWM7Ozs7Ozs7SUFPbkUsV0FBVyxDQUFDLFFBQWtCO1FBQzVCLHVCQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ25COzs7Ozs7Ozs7Ozs7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