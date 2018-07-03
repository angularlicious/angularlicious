import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularliciousLoggingModule, Severity, AngularliciousLoggingService } from '@angularlicious/logging';
import { ServiceContext, MessageType, ServiceMessage, CompositeRule } from '@angularlicious/rules-engine';
import { BehaviorSubject, Observable } from 'rxjs';
import { __extends } from 'tslib';
import { Action, ActionResult } from '@angularlicious/actions';
import { NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularliciousFoundationModule = /** @class */ (function () {
    function AngularliciousFoundationModule() {
    }
    AngularliciousFoundationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [AngularliciousLoggingModule, CommonModule]
                },] },
    ];
    return AngularliciousFoundationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ErrorResponse = /** @class */ (function () {
    function ErrorResponse() {
        this.IsSuccess = false;
        this.Errors = new Array();
    }
    return ErrorResponse;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the [ServiceBase] to provide common behavior for Angular
 * services.
 */
var  /**
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
var  /**
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
ActionBase = /** @class */ (function (_super) {
    __extends(ActionBase, _super);
    function ActionBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     */
    /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     * @return {?}
     */
    ActionBase.prototype.validateAction = /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     * @return {?}
     */
    function () {
        return this.validationContext.renderRules();
    };
    /**
     * @return {?}
     */
    ActionBase.prototype.postValidateAction = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.loggingService.log(this.actionName, Severity.Information, "Preparing to determine if the action contains validation errors in " + this.actionName);
        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, Severity.Information, "The target contains validation errors in " + this.actionName);
            // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
            this.validationContext.results.forEach(function (result) {
                if (!result.isValid) {
                    _this.publishRuleResult(result);
                    _this.retrieveRuleDetails(result);
                }
            });
        }
    };
    /**
     * @return {?}
     */
    ActionBase.prototype.postExecuteAction = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.actionResult === ActionResult.Fail) {
            this.serviceContext.Messages.forEach(function (e) {
                if (e.MessageType === MessageType.Error) {
                    _this.loggingService.log(_this.actionName, Severity.Error, e.toString());
                }
            });
        }
    };
    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     */
    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     * @return {?}
     */
    ActionBase.prototype.validateActionResult = /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     * @return {?}
     */
    function () {
        this.loggingService.log(this.actionName, Severity.Information, "Running [validateActionResult] for " + this.actionName + ".");
        // determine the status of the action based on any rule violations;
        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, Severity.Error, "The " + this.actionName + " contains rule violations.");
            this.actionResult = ActionResult.Fail;
            var /** @type {?} */ errorResponse = new ErrorResponse();
            errorResponse.IsSuccess = false;
            errorResponse.Message = "Validation errors exist.";
            this.response = Observable.throw(errorResponse);
        }
        this.actionResult = this.serviceContext.isGood()
            ? ActionResult.Success
            : ActionResult.Fail;
        return this.actionResult;
    };
    /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param ruleResult The result of a rendered rule.
     */
    /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param {?} ruleResult The result of a rendered rule.
     * @return {?}
     */
    ActionBase.prototype.retrieveRuleDetails = /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param {?} ruleResult The result of a rendered rule.
     * @return {?}
     */
    function (ruleResult) {
        var _this = this;
        if (ruleResult.rulePolicy instanceof CompositeRule) {
            var /** @type {?} */ composite = /** @type {?} */ (ruleResult.rulePolicy);
            if (composite && composite.hasErrors) {
                var /** @type {?} */ errors = composite.results.filter(function (result) { return !result.isValid && result.rulePolicy.isDisplayable; });
                errors.forEach(function (errorResult) {
                    _this.publishRuleResult(errorResult);
                    if (errorResult.rulePolicy instanceof CompositeRule) {
                        _this.retrieveRuleDetails(errorResult);
                    }
                });
            }
        }
    };
    /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param ruleResult
     */
    /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param {?} ruleResult
     * @return {?}
     */
    ActionBase.prototype.publishRuleResult = /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param {?} ruleResult
     * @return {?}
     */
    function (ruleResult) {
        var /** @type {?} */ serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
        serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
        serviceMessage.Source = this.actionName;
        this.serviceContext.Messages.push(serviceMessage);
        this.loggingService.log(this.actionName, Severity.Error, "" + serviceMessage.toString());
    };
    return ActionBase;
}(Action));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the business provider base class to access common elements of the business provider.
 *
 * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
 */
var  /**
 * Use the business provider base class to access common elements of the business provider.
 *
 * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
 */
BusinessProviderBase = /** @class */ (function () {
    function BusinessProviderBase(loggingService) {
        this.loggingService = loggingService;
        this.loggingService.log(this.serviceName, Severity.Information, "Running constructor for the [BusinessProviderBase].");
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
    BusinessProviderBase.prototype.handleUnexpectedError = /**
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
     * @param {?} sourceName
     * @return {?}
     */
    BusinessProviderBase.prototype.finishRequest = /**
     * @param {?} sourceName
     * @return {?}
     */
    function (sourceName) {
        var _this = this;
        this.loggingService.log(this.serviceName, Severity.Information, "Request for [" + sourceName + "] by " + this.serviceName + " is complete.");
        if (this.serviceContext.hasErrors()) {
            this.loggingService.log(this.serviceName, Severity.Information, "Preparing to write out the errors.");
            this.serviceContext.Messages.filter(function (f) { return f.DisplayToUser && f.MessageType === MessageType.Error; }).forEach(function (e) {
                return _this.loggingService.log(_this.serviceName, Severity.Error, e.toString());
            });
        }
    };
    return BusinessProviderBase;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to provide the alert type information for the AlertNotification and AlertComponent.
 */
var AlertTypes = /** @class */ (function () {
    function AlertTypes() {
    }
    AlertTypes.Information = 'alert-info';
    AlertTypes.Warning = 'alert-warning';
    AlertTypes.Danger = 'alert-danger';
    AlertTypes.Success = 'alert-success';
    return AlertTypes;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AlertNotification = /** @class */ (function () {
    function AlertNotification(header, title, messages, type) {
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
    return AlertNotification;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ComponentBase = /** @class */ (function () {
    function ComponentBase(componentName, loggingService, router) {
        var _this = this;
        this.loggingService = loggingService;
        this.router = router;
        this.componentName = componentName;
        this.alertNotification = new AlertNotification('', '');
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                _this.googleAnalyticsPageview(event);
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
    ComponentBase.prototype.googleAnalyticsSendEvent = /**
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
    function (category, action, label, value) {
        (/** @type {?} */ (window)).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ComponentBase.prototype.googleAnalyticsPageview = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && event.urlAfterRedirects) {
            this.loggingService.log(this.componentName, Severity.Information, "Preparing to set [Google Analytics] page view for [" + event.urlAfterRedirects + "].");
            // (<any>window).ga('set', 'page', event.urlAfterRedirects);
            // (<any>window).ga('send', 'pageview');
            // ga('create', 'UA-110194344-1', 'auto', this.componentName);
            // ga(`${this.componentName}.send`, 'pageview');
            // https://blog.thecodecampus.de/angular-2-google-analytics-google-tag-manager/
            // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
            var /** @type {?} */ GA_TRACKING_ID = 'UA-110194344-1';
            // gtag('config', 'GA_TRACKING_ID', {<pageview_parameters>});
            (/** @type {?} */ (window)).ga('config', GA_TRACKING_ID, {
                page_title: this.componentName,
                page_path: event.urlAfterRedirects
            });
        }
        else {
            this.loggingService.log(this.componentName, Severity.Warning, "Failed to set [Google Analytics] page view.");
        }
    };
    /**
     * Use to create a simple [ErrorResponse] with the specified message.
     * @param message The message to display to the user.
     */
    /**
     * Use to create a simple [ErrorResponse] with the specified message.
     * @param {?} message The message to display to the user.
     * @return {?}
     */
    ComponentBase.prototype.createErrorResponse = /**
     * Use to create a simple [ErrorResponse] with the specified message.
     * @param {?} message The message to display to the user.
     * @return {?}
     */
    function (message) {
        this.loggingService.log(this.componentName, Severity.Information, "Preparing to create error response for component.");
        var /** @type {?} */ errorResponse = new ErrorResponse();
        errorResponse.Message = message;
        return errorResponse;
    };
    /**
     * Use to handle service errors. These are error response [See: ErrorResponse] from
     * the application business layers (Action(s) or Http) that will bubble up to the
     * caller (i.e., a component) in a specified format:
     *
     * IsSuccess: boolean = false; // default for ErrorResponse
     * Message: string;
     * Errors: Array<ServiceError> = new Array<ServiceError>();
     * Exception: any;
     */
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
    ComponentBase.prototype.handleServiceErrors = /**
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
    function (errorResponse, serviceContext) {
        this.loggingService.log(this.componentName, Severity.Information, "Preparing to handle service errors for component.");
        if (serviceContext && serviceContext.hasErrors()) {
            this.loggingService.log(this.componentName, Severity.Information, "Retrieving error messages from the ServiceContext/ValidationContext;");
            var /** @type {?} */ messages = this.retrieveServiceContextErrorMessages(serviceContext);
            this.alertNotification = new AlertNotification('Errors', errorResponse.Message, messages, AlertTypes.Warning);
        }
        else {
            if (errorResponse && errorResponse.Message) {
                this.loggingService.log(this.componentName, Severity.Information, "Retrieving error messages from the [ErrorResponse].");
                var /** @type {?} */ errors = this.retrieveResponseErrorMessages(errorResponse);
                this.alertNotification = new AlertNotification('Error', errorResponse.Message, errors, AlertTypes.Warning);
                this.loggingService.log(this.componentName, Severity.Error, "Error: " + errorResponse.Message);
            }
        }
    };
    /**
     * Use to retrieve the error messages from the specified [ServiceContext].
     *
     * @parm: serviceContext: A context object containing messages for the specified request.
     */
    /**
     * Use to retrieve the error messages from the specified [ServiceContext].
     *
     * \@parm: serviceContext: A context object containing messages for the specified request.
     * @param {?} serviceContext
     * @return {?}
     */
    ComponentBase.prototype.retrieveServiceContextErrorMessages = /**
     * Use to retrieve the error messages from the specified [ServiceContext].
     *
     * \@parm: serviceContext: A context object containing messages for the specified request.
     * @param {?} serviceContext
     * @return {?}
     */
    function (serviceContext) {
        var /** @type {?} */ messages = Array();
        serviceContext.Messages.forEach(function (e) {
            if (e.MessageType === MessageType.Error && e.DisplayToUser) {
                messages.push(e.Message);
            }
        });
        return messages;
    };
    /**
     * Use to retrieve the error messages from the specified Web API response.
     */
    /**
     * Use to retrieve the error messages from the specified Web API response.
     * @param {?} errorResponse
     * @return {?}
     */
    ComponentBase.prototype.retrieveResponseErrorMessages = /**
     * Use to retrieve the error messages from the specified Web API response.
     * @param {?} errorResponse
     * @return {?}
     */
    function (errorResponse) {
        var /** @type {?} */ errors = new Array();
        if (errorResponse && errorResponse.Errors) {
            errorResponse.Errors.forEach(function (e) {
                if (e.DisplayToUser) {
                    errors.push(e.Message);
                }
            });
        }
        return errors;
    };
    /**
     * Use to reset the [AlertNotification] to the initial state. Removes
     * existing messages and hides the AlertComponent.
     */
    /**
     * Use to reset the [AlertNotification] to the initial state. Removes
     * existing messages and hides the AlertComponent.
     * @return {?}
     */
    ComponentBase.prototype.resetAlertNotifications = /**
     * Use to reset the [AlertNotification] to the initial state. Removes
     * existing messages and hides the AlertComponent.
     * @return {?}
     */
    function () {
        this.alertNotification = new AlertNotification('', '');
    };
    /**
     * Use to navigate to the specified route.
     * \@parm routeName The name of the target route.
     * @param {?} routeName
     * @return {?}
     */
    ComponentBase.prototype.routeTo = /**
     * Use to navigate to the specified route.
     * \@parm routeName The name of the target route.
     * @param {?} routeName
     * @return {?}
     */
    function (routeName) {
        try {
            this.router.navigate([routeName]);
        }
        catch (/** @type {?} */ error) {
            this.loggingService.log(this.componentName, Severity.Error, "Error while attempting to navigate to [" + routeName + "] route from " + this.componentName + ". Error: " + error.toString());
        }
    };
    /**
     * Use to retrieve and show any response error messages.
     */
    /**
     * Use to retrieve and show any response error messages.
     * @param {?} response
     * @return {?}
     */
    ComponentBase.prototype.showResponseErrors = /**
     * Use to retrieve and show any response error messages.
     * @param {?} response
     * @return {?}
     */
    function (response) {
        this.handleServiceErrors(response, undefined);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ComponentBase.prototype.finishRequest = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.loggingService.log(this.componentName, Severity.Information, this.componentName + ": " + message);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ComponentBase.prototype.showAlertMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        alert(message);
    };
    return ComponentBase;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HttpRequestOptions = /** @class */ (function () {
    function HttpRequestOptions() {
    }
    return HttpRequestOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var HttpRequestMethod = {
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
var  /**
 * Use this model to represent service error/message information from the
 * application's service APIs.
 *
 * The DisplayToUser boolean value indicates whether the message should be
 * displayed to the user if desired.
 */
ServiceError = /** @class */ (function () {
    function ServiceError() {
    }
    return ServiceError;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ServiceResponse = /** @class */ (function () {
    function ServiceResponse() {
        this.Errors = new Array();
    }
    return ServiceResponse;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AngularliciousFoundationModule, ServiceBase, ActionBase, BusinessProviderBase, ComponentBase, HttpBaseService, ErrorResponse, ServiceError, ServiceResponse, AlertNotification, AlertTypes, HttpRequestOptions, HttpRequestMethod };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtZm91bmRhdGlvbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vc3JjL2ZvdW5kYXRpb24ubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvc2VydmljZS1iYXNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvYWN0aW9uLWJhc2UuYWN0aW9uLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cy50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vc3JjL21vZGVscy9hbGVydC1ub3RpZmljYXRpb24ubW9kZWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL3NyYy9jb21wb25lbnQtYmFzZS5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL3NyYy9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL3NyYy9odHRwLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vc3JjL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlLCBDb21tb25Nb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUge31cclxuIiwiaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvclJlc3BvbnNlIHtcclxuICBJc1N1Y2Nlc3MgPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxyXG4gIE1lc3NhZ2U6IHN0cmluZztcclxuICBFcnJvcnM6IEFycmF5PFNlcnZpY2VFcnJvcj4gPSBuZXcgQXJyYXk8U2VydmljZUVycm9yPigpO1xyXG4gIEV4Y2VwdGlvbjogRXJyb3I7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBTZXJ2aWNlQ29udGV4dCxcclxuICBNZXNzYWdlVHlwZSxcclxuICBTZXJ2aWNlTWVzc2FnZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLCBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgT0F1dGhFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvb2F1dGgtZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbi8vIGltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgW1NlcnZpY2VCYXNlXSB0byBwcm92aWRlIGNvbW1vbiBiZWhhdmlvciBmb3IgQW5ndWxhclxyXG4gKiBzZXJ2aWNlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQmFzZSB7XHJcbiAgYWNjZXNzVG9rZW4gPSAnJztcclxuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dCA9IG5ldyBTZXJ2aWNlQ29udGV4dCgpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIHByb3ZpZGUgcmVxdWlyZWQgZWxlbWVudHMgdG8gdGhlIGJhc2UgY2xhc3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbG9nZ2luZ1NlcnZpY2UgVGhlIFtMb2dnaW5nU2VydmljZV0gaXMgYSByZXF1aXJlZCBkZXBlbmRlbmN5IG9mIHRoaXNcclxuICAgKiBjbGFzcy4gSXQgc2hvdWxkIGJlIGluamVjdGVkIGludG8gYW55IEFuZ3VsYXIgU2VydmljZXMgdGhhdCBleHRlbmQgZnJvbVxyXG4gICAqIHRoaXMgYmFzZSBjbGFzcy4gSXQgd2lsbCBhbGxvdyB0aGUgbWVtYmVycyBvZiB0aGUgYmFzZSBjbGFzcyB0byBsb2cgaW5mb3JtYXRpb25cclxuICAgKiB1c2luZyB0aGUgY29tbW9uIExvZ2dpbmdTZXJ2aWNlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4dHJhY3QgdGhlIGNvbnRlbnRzIG9mIHRoZSBIVFRQIGJvZHkgYW5kIHJldHVybiBhIEpTT05cclxuICAgKiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0YS5cclxuICAgKiBAcGFyYW0gcmVzcG9uc2U6IGNvbnRhaW5zIHRoZSBIVFRQIHJlc3BvbnNlLlxyXG4gICAqL1xyXG4gIGV4dHJhY3REYXRhKHJlc3BvbnNlOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgYm9keSA9IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBib2R5LmRhdGEgfHwge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIGFuIHVuZXhwZWN0ZWQgZXJyb3IgaW4gdGhlIGFwcGxpY2F0aW9uLiBUaGUgZXJyb3Igc2hvdWxkIGltcGxlbWVudFxyXG4gICAqIHRoZSBzcGVjaWZpZWQgaW50ZXJmYWNlLiBUaGUgbWV0aG9kIHdpbGwgYWRkIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlXHJcbiAgICogc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICogQHBhcmFtIGVycm9yIEFuIHVuZXhwZWN0ZWQgYXBwbGljYXRpb24gZXJyb3IgdGhhdCBpbXBsZW1lbnRzIHRoZSBbRXJyb3JdIGludGVyZmFjZS5cclxuICAgKlxyXG4gICAqIGludGVyZmFjZSBFcnJvciB7XHJcbiAgICogIG5hbWU6IHN0cmluZztcclxuICAgKiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAqICBzdGFjaz86IHN0cmluZztcclxuICAgKiB9XHJcbiAgICovXHJcbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlKVxyXG4gICAgICAuV2l0aERpc3BsYXlUb1VzZXIodHJ1ZSlcclxuICAgICAgLldpdGhNZXNzYWdlVHlwZShNZXNzYWdlVHlwZS5FcnJvcilcclxuICAgICAgLldpdGhTb3VyY2UodGhpcy5zZXJ2aWNlTmFtZSk7XHJcblxyXG4gICAgY29uc3QgbG9nSXRlbSA9IGAke21lc3NhZ2UudG9TdHJpbmcoKX07ICR7ZXJyb3Iuc3RhY2t9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBsb2dJdGVtKTtcclxuXHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIGFuIGVycm9yIHRoYXQgY29udGFpbnMgYSBbbmFtZV0gYW5kIGEgW21lc3NhZ2VdLlxyXG4gICAqIEBwYXJhbSBlcnJvclxyXG4gICAqL1xyXG4gIGhhbmRsZUVycm9yKGVycm9yOiB7IG5hbWU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkIH0pOiB2b2lkIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcclxuICAgICAgLldpdGhEaXNwbGF5VG9Vc2VyKHRydWUpXHJcbiAgICAgIC5XaXRoTWVzc2FnZVR5cGUoTWVzc2FnZVR5cGUuRXJyb3IpXHJcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xyXG5cclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgbWVzc2FnZS50b1N0cmluZygpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQuYWRkTWVzc2FnZShtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBoYW5kbGUgSFRUUCBlcnJvcnMgd2hlbiBjYWxsaW5nIHdlYiBhcGkocykuXHJcbiAgICovXHJcbiAgaGFuZGxlSHR0cEVycm9yKFxyXG4gICAgZXJyb3I6IHsgdG9TdHJpbmc6ICgpID0+IHZvaWQ7IF9ib2R5OiBhbnk7IGpzb246ICgpID0+IEVycm9yUmVzcG9uc2UgfSxcclxuICAgIHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci50b1N0cmluZygpfSAke1xyXG4gICAgICByZXF1ZXN0T3B0aW9ucy51cmxcclxuICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBtZXNzYWdlKTtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBlcnJvci5qc29uKCk7XHJcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgZXJyb3IudG9TdHJpbmcoKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZhdWx0IHJldHVybiBiZWhhdmlvcjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKFxyXG4gICAgICAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLidcclxuICAgICk7XHJcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gaGFuZGxlIGFuIGVycm9yIGZyb20gdGhlIE9BdXRoIFByb3ZpZGVyIEFQSS5cclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnNcclxuICAgKi9cclxuICBoYW5kbGVPQXV0aEVycm9yKFxyXG4gICAgZXJyb3I6IE9BdXRoRXJyb3JSZXNwb25zZSxcclxuICAgIHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci50b1N0cmluZygpfSAke1xyXG4gICAgICByZXF1ZXN0T3B0aW9ucy51cmxcclxuICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBtZXNzYWdlKTtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2UoXHJcbiAgICAgICAgICBgVW5hYmxlIHRvIHZhbGlkYXRlIGNyZWRlbnRpYWxzLmBcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGJlaGF2aW9yU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxyXG4gICAgICAgICAgZXJyb3JSZXNwb25zZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGJlaGF2aW9yU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVmYXVsdCByZXR1cm4gYmVoYXZpb3I7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcclxuICAgICAgYFVuYWJsZSB0byB2YWxpZGF0ZSBjcmVkZW50aWFscy5gXHJcbiAgICApO1xyXG4gICAgY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcclxuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIG5ldyBbRXJyb3JSZXNwb25zZV0gd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgZm9yIHRoZSBzcGVjaWZpZWQgW0Vycm9yUmVzcG9uc2VdLlxyXG4gICAqL1xyXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2UobWVzc2FnZTogc3RyaW5nKTogRXJyb3JSZXNwb25zZSB7XHJcbiAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XHJcbiAgICByZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSBhIGdlbmVyaWMgbWV0aG9kIHRvIGZpbmlzaCBzZXJ2aWNlIHJlcXVlc3RzIHRoYXQgcmV0dXJuIFtPYnNlcnZhYmxlc10uXHJcbiAgICogQHBhcmFtIHNvdXJjZU5hbWVcclxuICAgKi9cclxuICBmaW5pc2hSZXF1ZXN0KHNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUmVxdWVzdCBmb3IgWyR7c291cmNlTmFtZX1dIGJ5ICR7dGhpcy5zZXJ2aWNlTmFtZX0gaXMgY29tcGxldGUuYFxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFByZXBhcmluZyB0byB3cml0ZSBhbnkgbWVzc2FnZXMuYFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZpbHRlcihcclxuICAgICAgICBmID0+IGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yICYmIGYuRGlzcGxheVRvVXNlclxyXG4gICAgICApLmZvckVhY2goZSA9PlxyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlLnRvU3RyaW5nKCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVzZXQgdGhlIHNlcnZpY2UgY29udGV4dCB3aGVuIHlvdSB3YW50IHRvIGNsZWFyIG1lc3NhZ2VzIGZyb20gdGhlIFtTZXJ2aWNlQ29udGV4dF0uIElmIHlvdSB3YW50IHRvXHJcbiAgICogYXBwZW5kIG1lc3NhZ2VzIGZyb20gc3Vic2VxdWVudCBzZXJ2aWNlIGNhbGxzLCBkbyBub3QgdXNlIHRoaXMgbWV0aG9kLlxyXG4gICAqL1xyXG4gIHJlc2V0U2VydmljZUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gcmVzZXQgdGhlIE1lc3NhZ2VzIG9mIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0uYFxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0ICYmIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMpIHtcclxuICAgICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgYFJlc2V0dGluZyB0aGUgTWVzc2FnZXMgb2YgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzID0gbmV3IEFycmF5PFNlcnZpY2VNZXNzYWdlPigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgYFRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgW01lc3NhZ2VzXS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5XYXJuaW5nLFxyXG4gICAgICAgIGBUaGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGlzIG5vdCB2YWxpZC5gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBGaW5pc2hlZCAgcHJvY2Vzc2luZyByZXF1ZXN0IHRvIFtyZXNldF0gdGhlIE1lc3NhZ2VzIG9mIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0uYFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byB3cml0ZSB0aGUgY3VycmVudCBtZXNzYWdlcyBjb250YWluZWQgaW4gdGhlIFtTZXJ2aWNlQ29udGV4dF0uIFdyaXR0ZW4gbWVzc2FnZXMgYXJlIGxpbWl0ZWRcclxuICAgKiB0byBpdGVtcyB0aGF0IGFyZSBtYXJrZWQgYXMgW0Rpc3BsYXlUb1VzZXIgPSB0cnVlXS5cclxuICAgKi9cclxuICB3cml0ZU1lc3NhZ2VzKCkge1xyXG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQgJiYgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcykge1xyXG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgaWYgKGUuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yICYmIGUuRGlzcGxheVRvVXNlcikge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgICBlLnRvU3RyaW5nKClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSB9IGZyb20gJy4vaHR0cC1iYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBhcHBsaWNhdGlvbidzIGJhc2UgQWN0aW9uIGNsYXNzIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgcGlwZWxpbmUgbWV0aG9kcyAtIHByZS9wb3N0XHJcbiAqIGV4ZWN1dGlvbiBtZXRob2RzLlxyXG4gKlxyXG4gKiBUaGUgcHJlLWV4ZWN1dGUgbWV0aG9kcyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XHJcbiAqXHRcdDEuIHN0YXJ0KCk7XHJcbiAqXHRcdDIuIGF1ZGl0KCk7XHJcbiAqXHRcdDMuIHByZVZhbGlkYXRlQWN0aW9uKCk7XHJcbiAqXHRcdDQuIGV2YWx1YXRlUnVsZXMoKTtcclxuICpcdFx0NS4gcG9zdFZhbGlkYXRlQWN0aW9uKCk7XHJcbiAqXHRcdDYuIHByZUV4ZWN1dGVBY3Rpb24oKTtcclxuICpcclxuICpJZiB0aGUgc3RhdHVzIG9mIGFjdGlvbiBpcyBnb29kLCB0aGUgYnVzaW5lc3MgbG9naWMgd2lsbCBiZSBleGVjdXRlZCB1c2luZyB0aGU6XHJcbiAqXHRcdDEuIHByb2Nlc3NBY3Rpb24oKTtcclxuICpcclxuICogVGhlIHBvc3QtZXhlY3V0aW9uIG1ldGhvZHMgdGhhdCBjYW4gYmUgaW1wbGVtZW50ZWQgYXJlOlxyXG4gKlx0XHQxLiBwb3N0RXhlY3V0ZUFjdGlvbigpO1xyXG4gKlx0XHQyLiB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpO1xyXG4gKlx0XHQzLiBmaW5pc2goKTtcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uQmFzZSBleHRlbmRzIEFjdGlvbiB7XHJcbiAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0O1xyXG4gIHJlc3BvbnNlOiBPYnNlcnZhYmxlPGFueT47XHJcbiAgaHR0cEJhc2U6IEh0dHBCYXNlU2VydmljZTtcclxuICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZTtcclxuICBhY3Rpb25OYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgaXMgYSByZXF1aXJlZCBpbXBsZW1lbnRhdGlvbiBpZiB5b3Ugd2FudCB0byByZW5kZXIvZXhlY3V0ZSB0aGUgcnVsZXMgdGhhdFxyXG4gICAqIGFyZSBhc3NvY2lhdGVkIHRvIHRoZSBzcGVjaWZpZWQgYWN0aW9uLlxyXG4gICAqL1xyXG4gIHZhbGlkYXRlQWN0aW9uKCk6IFZhbGlkYXRpb25Db250ZXh0IHtcclxuICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Db250ZXh0LnJlbmRlclJ1bGVzKCk7XHJcbiAgfVxyXG5cclxuICBwb3N0VmFsaWRhdGVBY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBkZXRlcm1pbmUgaWYgdGhlIGFjdGlvbiBjb250YWlucyB2YWxpZGF0aW9uIGVycm9ycyBpbiAke1xyXG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZVxyXG4gICAgICB9YFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0aW9uQ29udGV4dC5oYXNSdWxlVmlvbGF0aW9ucygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgVGhlIHRhcmdldCBjb250YWlucyB2YWxpZGF0aW9uIGVycm9ycyBpbiAke3RoaXMuYWN0aW9uTmFtZX1gXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBMb2FkIHRoZSBlcnJvci9ydWxlIHZpb2xhdGlvbnMgaW50byB0aGUgU2VydmljZUNvbnRleHQgc28gdGhhdCB0aGUgaW5mb3JtYXRpb24gYnViYmxlcyB1cCB0byB0aGUgY2FsbGVyIG9mIHRoZSBzZXJ2aWNlO1xyXG4gICAgICB0aGlzLnZhbGlkYXRpb25Db250ZXh0LnJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQpIHtcclxuICAgICAgICAgIHRoaXMucHVibGlzaFJ1bGVSZXN1bHQocmVzdWx0KTtcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVSdWxlRGV0YWlscyhyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3N0RXhlY3V0ZUFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLmFjdGlvblJlc3VsdCA9PT0gQWN0aW9uUmVzdWx0LkZhaWwpIHtcclxuICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgIGlmIChlLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvcikge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgICAgIGUudG9TdHJpbmcoKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWxsIGNvbmNyZXRlIGFjdGlvbnMgbXVzdCBvdmVycmlkZSBhbmQgaW1wbGVtZW50IHRoaXMgbWV0aG9kLiBJdCBpcyBkZWZpbmVkIGluIHRoZSBbQWN0aW9uXSBmcmFtZXdvcmsgY2xhc3MuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTogQWN0aW9uUmVzdWx0IHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUnVubmluZyBbdmFsaWRhdGVBY3Rpb25SZXN1bHRdIGZvciAke3RoaXMuYWN0aW9uTmFtZX0uYFxyXG4gICAgKTtcclxuICAgIC8vIGRldGVybWluZSB0aGUgc3RhdHVzIG9mIHRoZSBhY3Rpb24gYmFzZWQgb24gYW55IHJ1bGUgdmlvbGF0aW9ucztcclxuICAgIGlmICh0aGlzLnZhbGlkYXRpb25Db250ZXh0Lmhhc1J1bGVWaW9sYXRpb25zKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgIGBUaGUgJHt0aGlzLmFjdGlvbk5hbWV9IGNvbnRhaW5zIHJ1bGUgdmlvbGF0aW9ucy5gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuYWN0aW9uUmVzdWx0ID0gQWN0aW9uUmVzdWx0LkZhaWw7XHJcblxyXG4gICAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcclxuICAgICAgZXJyb3JSZXNwb25zZS5Jc1N1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgZXJyb3JSZXNwb25zZS5NZXNzYWdlID0gYFZhbGlkYXRpb24gZXJyb3JzIGV4aXN0LmA7XHJcbiAgICAgIHRoaXMucmVzcG9uc2UgPSBPYnNlcnZhYmxlLnRocm93KGVycm9yUmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3Rpb25SZXN1bHQgPSB0aGlzLnNlcnZpY2VDb250ZXh0LmlzR29vZCgpXHJcbiAgICAgID8gQWN0aW9uUmVzdWx0LlN1Y2Nlc3NcclxuICAgICAgOiBBY3Rpb25SZXN1bHQuRmFpbDtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvblJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBwcm9jZXNzIHJ1bGUgcmVzdWx0cyBmb3IgY29tcG9zaXRlIHJ1bGVzLiBOb3RlLCB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgcmVjdXJzaXZlXHJcbiAgICogYW5kIHdpbGwgcHJvY2VzcyBhbGwgY29tcG9zaXRlIHJ1bGVzIGluIHRoZSBydWxlIHNldCBjb250YWluZWQgaW4gdGhlIFZhbGlkYXRpb25Db250ZXh0LlxyXG4gICAqIEBwYXJhbSBydWxlUmVzdWx0IFRoZSByZXN1bHQgb2YgYSByZW5kZXJlZCBydWxlLlxyXG4gICAqL1xyXG4gIHJldHJpZXZlUnVsZURldGFpbHMocnVsZVJlc3VsdDogUnVsZVJlc3VsdCkge1xyXG4gICAgaWYgKHJ1bGVSZXN1bHQucnVsZVBvbGljeSBpbnN0YW5jZW9mIENvbXBvc2l0ZVJ1bGUpIHtcclxuICAgICAgY29uc3QgY29tcG9zaXRlID0gcnVsZVJlc3VsdC5ydWxlUG9saWN5IGFzIENvbXBvc2l0ZVJ1bGU7XHJcbiAgICAgIGlmIChjb21wb3NpdGUgJiYgY29tcG9zaXRlLmhhc0Vycm9ycykge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IGNvbXBvc2l0ZS5yZXN1bHRzLmZpbHRlcihcclxuICAgICAgICAgIHJlc3VsdCA9PiAhcmVzdWx0LmlzVmFsaWQgJiYgcmVzdWx0LnJ1bGVQb2xpY3kuaXNEaXNwbGF5YWJsZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGVycm9ycy5mb3JFYWNoKGVycm9yUmVzdWx0ID0+IHtcclxuICAgICAgICAgIHRoaXMucHVibGlzaFJ1bGVSZXN1bHQoZXJyb3JSZXN1bHQpO1xyXG5cclxuICAgICAgICAgIGlmIChlcnJvclJlc3VsdC5ydWxlUG9saWN5IGluc3RhbmNlb2YgQ29tcG9zaXRlUnVsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlUnVsZURldGFpbHMoZXJyb3JSZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIGhlbHBlciBmdW5jdGlvbiB0byBwdWJsaXNoIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlIFtTZXJ2aWNlQ29udGV4dC5NZXNzYWdlc10gbGlzdC5cclxuICAgKiBAcGFyYW0gcnVsZVJlc3VsdFxyXG4gICAqL1xyXG4gIHB1Ymxpc2hSdWxlUmVzdWx0KHJ1bGVSZXN1bHQ6IFJ1bGVSZXN1bHQpIHtcclxuICAgIGNvbnN0IHNlcnZpY2VNZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKFxyXG4gICAgICBydWxlUmVzdWx0LnJ1bGVQb2xpY3kubmFtZSxcclxuICAgICAgcnVsZVJlc3VsdC5ydWxlUG9saWN5Lm1lc3NhZ2UsXHJcbiAgICAgIE1lc3NhZ2VUeXBlLkVycm9yXHJcbiAgICApO1xyXG4gICAgc2VydmljZU1lc3NhZ2UuRGlzcGxheVRvVXNlciA9IHJ1bGVSZXN1bHQucnVsZVBvbGljeS5pc0Rpc3BsYXlhYmxlO1xyXG4gICAgc2VydmljZU1lc3NhZ2UuU291cmNlID0gdGhpcy5hY3Rpb25OYW1lO1xyXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5wdXNoKHNlcnZpY2VNZXNzYWdlKTtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICBgJHtzZXJ2aWNlTWVzc2FnZS50b1N0cmluZygpfWBcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcblxyXG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIGJ1c2luZXNzIHByb3ZpZGVyIGJhc2UgY2xhc3MgdG8gYWNjZXNzIGNvbW1vbiBlbGVtZW50cyBvZiB0aGUgYnVzaW5lc3MgcHJvdmlkZXIuXHJcbiAqXHJcbiAqIHNlcnZpY2VDb250ZXh0OiBUaGlzIGlzIGluaXRpYWxpemVkIGZvciBlYWNoIGluc3RhbmNlIG9mIGEgYnVzaW5lc3MgcHJvdmlkZXIgLSBpdHMgcHVycG9zZSBpcyB0byBjb2xsZWN0IGluZm9ybWF0aW9uIGR1cmluZyB0aGUgcHJvY2Vzc2luZyBvZiBidXNpbmVzcyBsb2dpYy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdXNpbmVzc1Byb3ZpZGVyQmFzZSB7XHJcbiAgc2VydmljZU5hbWU6IHN0cmluZztcclxuICBzZXJ2aWNlQ29udGV4dDogU2VydmljZUNvbnRleHQ7XHJcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSdW5uaW5nIGNvbnN0cnVjdG9yIGZvciB0aGUgW0J1c2luZXNzUHJvdmlkZXJCYXNlXS5gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBhbiB1bmV4cGVjdGVkIGVycm9yIGluIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGVycm9yIHNob3VsZCBpbXBsZW1lbnRcclxuICAgKiB0aGUgc3BlY2lmaWVkIGludGVyZmFjZS4gVGhlIG1ldGhvZCB3aWxsIGFkZCBhIG5ldyBbU2VydmljZU1lc3NhZ2VdIHRvIHRoZVxyXG4gICAqIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxyXG4gICAqIEBwYXJhbSBlcnJvciBBbiB1bmV4cGVjdGVkIGFwcGxpY2F0aW9uIGVycm9yIHRoYXQgaW1wbGVtZW50cyB0aGUgW0Vycm9yXSBpbnRlcmZhY2UuXHJcbiAgICpcclxuICAgKiBpbnRlcmZhY2UgRXJyb3Ige1xyXG4gICAqICBuYW1lOiBzdHJpbmc7XHJcbiAgICogIG1lc3NhZ2U6IHN0cmluZztcclxuICAgKiAgc3RhY2s/OiBzdHJpbmc7XHJcbiAgICogfVxyXG4gICAqL1xyXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcclxuICAgICAgLldpdGhEaXNwbGF5VG9Vc2VyKHRydWUpXHJcbiAgICAgIC5XaXRoTWVzc2FnZVR5cGUoTWVzc2FnZVR5cGUuRXJyb3IpXHJcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xyXG5cclxuICAgIGNvbnN0IGxvZ0l0ZW0gPSBgJHttZXNzYWdlLnRvU3RyaW5nKCl9OyAke2Vycm9yLnN0YWNrfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbG9nSXRlbSk7XHJcblxyXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgZmluaXNoUmVxdWVzdChzb3VyY2VOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFJlcXVlc3QgZm9yIFske3NvdXJjZU5hbWV9XSBieSAke3RoaXMuc2VydmljZU5hbWV9IGlzIGNvbXBsZXRlLmBcclxuICAgICk7XHJcbiAgICBpZiAodGhpcy5zZXJ2aWNlQ29udGV4dC5oYXNFcnJvcnMoKSkge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgIGBQcmVwYXJpbmcgdG8gd3JpdGUgb3V0IHRoZSBlcnJvcnMuYFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZpbHRlcihcclxuICAgICAgICBmID0+IGYuRGlzcGxheVRvVXNlciAmJiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxyXG4gICAgICApLmZvckVhY2goZSA9PlxyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlLnRvU3RyaW5nKCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBVc2UgdG8gcHJvdmlkZSB0aGUgYWxlcnQgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIEFsZXJ0Tm90aWZpY2F0aW9uIGFuZCBBbGVydENvbXBvbmVudC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBbGVydFR5cGVzIHtcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEluZm9ybWF0aW9uOiBzdHJpbmcgPSAnYWxlcnQtaW5mbyc7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBXYXJuaW5nOiBzdHJpbmcgPSAnYWxlcnQtd2FybmluZyc7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBEYW5nZXI6IHN0cmluZyA9ICdhbGVydC1kYW5nZXInO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU3VjY2Vzczogc3RyaW5nID0gJ2FsZXJ0LXN1Y2Nlc3MnO1xyXG59XHJcbiIsImltcG9ydCB7IEFsZXJ0VHlwZXMgfSBmcm9tICcuL2FsZXJ0LXR5cGVzLmNvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQWxlcnROb3RpZmljYXRpb24ge1xyXG4gIHR5cGU6IHN0cmluZyA9IEFsZXJ0VHlwZXMuSW5mb3JtYXRpb247IC8vIGFsZXJ0LXdhcm5pbmcsIGFsZXJ0LXN1Y2Nlc3MsIGFsZXJ0LWluZm8sIGFsZXJ0LWRhbmdlclxyXG4gIGhlYWRlcjogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgbWVzc2FnZXM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gIHNob3dBbGVydCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGhlYWRlcjogc3RyaW5nLFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2VzPzogQXJyYXk8c3RyaW5nPixcclxuICAgIHR5cGU/OiBzdHJpbmdcclxuICApIHtcclxuICAgIGlmICh0eXBlKSB7XHJcbiAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICBpZiAobWVzc2FnZXMpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmhlYWRlciAmJiB0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0FsZXJ0ID0gdHJ1ZTsgLy8gdXNlZCB0byB0cmlnZ2VyIHRoZSBkaXNwbGF5IG9mIHRoZSBub3RpZmljYXRpb24uXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2ZpbHRlcic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1lc3NhZ2VUeXBlLFxyXG4gIFNlcnZpY2VDb250ZXh0LFxyXG4gIFNlcnZpY2VNZXNzYWdlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsIFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbGVydE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vbW9kZWxzL2FsZXJ0LW5vdGlmaWNhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEFsZXJ0VHlwZXMgfSBmcm9tICcuL21vZGVscy9hbGVydC10eXBlcy5jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJhc2Uge1xyXG4gIGNvbXBvbmVudE5hbWU6IHN0cmluZztcclxuICBhbGVydE5vdGlmaWNhdGlvbjogQWxlcnROb3RpZmljYXRpb247XHJcbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29tcG9uZW50TmFtZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xyXG4gICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xyXG5cclxuICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgdGhpcy5nb29nbGVBbmFseXRpY3NQYWdldmlldyhldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gY29uc3Qgcm91dGVyRXZlbnQgPSB0aGlzLnJvdXRlci5ldmVudHMuZmlsdGVyKFxyXG4gICAgLy8gICBldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmRcclxuICAgIC8vICk7XHJcbiAgICAvLyBpZiAocm91dGVyRXZlbnQgJiYgcm91dGVyRXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAvLyAgIHRoaXMuZ29vZ2xlQW5hbHl0aWNzUGFnZXZpZXcocm91dGVyRXZlbnQpO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHNlbmQgYW4gYW5hbHl0aWMgZXZlbnQgdG8gW0dvb2dsZSBBbmFseXRpY3NdLlxyXG4gICAqIEBwYXJhbSBjYXRlZ29yeSBBIGNhdGVnb3J5IGlzIGEgbmFtZSB0aGF0IHlvdSBzdXBwbHkgYXMgYSB3YXkgdG8gZ3JvdXAgb2JqZWN0cyB0aGF0IHlvdSB3YW50IHRvIHRyYWNrLiBUeXBpY2FsbHksIHlvdSB3aWxsIHVzZSB0aGUgc2FtZSBjYXRlZ29yeSBuYW1lIG11bHRpcGxlIHRpbWVzIG92ZXIgcmVsYXRlZCBVSSBlbGVtZW50cyB0aGF0IHlvdSB3YW50IHRvIGdyb3VwIHVuZGVyIGEgZ2l2ZW4gY2F0ZWdvcnkuXHJcbiAgICogQHBhcmFtIGFjdGlvbiBVc2UgdGhlIGFjdGlvbiBwYXJhbWV0ZXIgdG8gbmFtZSB0aGUgdHlwZSBvZiBldmVudCBvciBpbnRlcmFjdGlvbiB5b3Ugd2FudCB0byB0cmFjayBmb3IgYSBwYXJ0aWN1bGFyIHdlYiBvYmplY3QgKGkuZS4sIHBsYXksIHN0b3AsIHBhdXNlLCBkb3dubG9hZCkuIEEgdW5pcXVlIGV2ZW50IGlzIGRldGVybWluZWQgYnkgYSB1bmlxdWUgYWN0aW9uIG5hbWUuIFlvdSBjYW4gdXNlIGR1cGxpY2F0ZSBhY3Rpb24gbmFtZXMgYWNyb3NzIGNhdGVnb3JpZXMsIGJ1dCB0aGlzIGNhbiBhZmZlY3QgaG93IHVuaXF1ZSBldmVudHMgYXJlIGNhbGN1bGF0ZWQuIFNlZSB0aGUgc3VnZ2VzdGlvbnMgYmVsb3cgYW5kIHRoZSBJbXBsaWNpdCBDb3VudCBzZWN0aW9uIGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICogQHBhcmFtIGxhYmVsIFByb3ZpZGUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmb3IgZXZlbnRzIHRoYXQgeW91IHdhbnQgdG8gdHJhY2ssIHN1Y2ggYXMgdGhlIG1vdmllIHRpdGxlIGluIHRoZSB2aWRlbyBleGFtcGxlcyBhYm92ZSwgb3IgdGhlIG5hbWUgb2YgYSBmaWxlIHdoZW4gdHJhY2tpbmcgZG93bmxvYWRzLiBBbGwgbGFiZWxzIGFyZSBsaXN0ZWQgaW5kZXBlbmRlbnRseSBmcm9tIHRoZWlyIHBhcmVudCBjYXRlZ29yaWVzIGFuZCBhY3Rpb25zLiBUaGlzIHByb3ZpZGVzIHlvdSB3aXRoIGFub3RoZXIgdXNlZnVsIHdheSB0byBzZWdtZW50IHRoZSBldmVudCBkYXRhIGZvciB5b3VyIHJlcG9ydHMuIEFsbCBsYWJlbHMgYXJlIGxpc3RlZCBpbmRlcGVuZGVudGx5IGZyb20gdGhlaXIgcGFyZW50IGNhdGVnb3JpZXMgYW5kIGFjdGlvbnMuIFRoaXMgcHJvdmlkZXMgeW91IHdpdGggYW5vdGhlciB1c2VmdWwgd2F5IHRvIHNlZ21lbnQgdGhlIGV2ZW50IGRhdGEgZm9yIHlvdXIgcmVwb3J0cy5cclxuICAgKiBAcGFyYW0gdmFsdWUgQW55IG51bWVyaWMgdmFsdWUgaW5kaWNhdGluZyBhIFt2YWx1ZV0gdGhhdCB3aWxsIGJlIHN1bW1hcml6ZWQgZm9yIHRoZSBhbmFseXRpYyBpdGVtKHMpLlxyXG4gICAqXHJcbiAgICogTW9yZSBpbmZvcm1hdGlvbiBhdDogaHR0cHM6Ly9zdXBwb3J0Lmdvb2dsZS5jb20vYW5hbHl0aWNzL2Fuc3dlci8xMDMzMDY4XHJcbiAgICogb3IgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2V2ZW50c1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnb29nbGVBbmFseXRpY3NTZW5kRXZlbnQoXHJcbiAgICBjYXRlZ29yeTogc3RyaW5nLFxyXG4gICAgYWN0aW9uOiBzdHJpbmcsXHJcbiAgICBsYWJlbDogc3RyaW5nLFxyXG4gICAgdmFsdWU6IG51bWJlclxyXG4gICkge1xyXG4gICAgKDxhbnk+d2luZG93KS5ndGFnKCdldmVudCcsIGFjdGlvbiwge1xyXG4gICAgICBldmVudF9jYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcclxuICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ29vZ2xlQW5hbHl0aWNzUGFnZXZpZXcoZXZlbnQ6IE5hdmlnYXRpb25FbmQpIHtcclxuICAgIGlmIChldmVudCAmJiBldmVudC51cmxBZnRlclJlZGlyZWN0cykge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFByZXBhcmluZyB0byBzZXQgW0dvb2dsZSBBbmFseXRpY3NdIHBhZ2UgdmlldyBmb3IgWyR7XHJcbiAgICAgICAgICBldmVudC51cmxBZnRlclJlZGlyZWN0c1xyXG4gICAgICAgIH1dLmBcclxuICAgICAgKTtcclxuICAgICAgLy8gKDxhbnk+d2luZG93KS5nYSgnc2V0JywgJ3BhZ2UnLCBldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XHJcbiAgICAgIC8vICg8YW55PndpbmRvdykuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcclxuICAgICAgLy8gZ2EoJ2NyZWF0ZScsICdVQS0xMTAxOTQzNDQtMScsICdhdXRvJywgdGhpcy5jb21wb25lbnROYW1lKTtcclxuICAgICAgLy8gZ2EoYCR7dGhpcy5jb21wb25lbnROYW1lfS5zZW5kYCwgJ3BhZ2V2aWV3Jyk7XHJcblxyXG4gICAgICAvLyBodHRwczovL2Jsb2cudGhlY29kZWNhbXB1cy5kZS9hbmd1bGFyLTItZ29vZ2xlLWFuYWx5dGljcy1nb29nbGUtdGFnLW1hbmFnZXIvXHJcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvcGFnZXNcclxuICAgICAgY29uc3QgR0FfVFJBQ0tJTkdfSUQgPSAnVUEtMTEwMTk0MzQ0LTEnO1xyXG4gICAgICAvLyBndGFnKCdjb25maWcnLCAnR0FfVFJBQ0tJTkdfSUQnLCB7PHBhZ2V2aWV3X3BhcmFtZXRlcnM+fSk7XHJcbiAgICAgICg8YW55PndpbmRvdykuZ2EoJ2NvbmZpZycsIEdBX1RSQUNLSU5HX0lELCB7XHJcbiAgICAgICAgcGFnZV90aXRsZTogdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIHBhZ2VfcGF0aDogZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHNcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuV2FybmluZyxcclxuICAgICAgICBgRmFpbGVkIHRvIHNldCBbR29vZ2xlIEFuYWx5dGljc10gcGFnZSB2aWV3LmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBzaW1wbGUgW0Vycm9yUmVzcG9uc2VdIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgY3JlYXRlRXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcpOiBFcnJvclJlc3BvbnNlIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBlcnJvciByZXNwb25zZSBmb3IgY29tcG9uZW50LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcclxuICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBoYW5kbGUgc2VydmljZSBlcnJvcnMuIFRoZXNlIGFyZSBlcnJvciByZXNwb25zZSBbU2VlOiBFcnJvclJlc3BvbnNlXSBmcm9tXHJcbiAgICogdGhlIGFwcGxpY2F0aW9uIGJ1c2luZXNzIGxheWVycyAoQWN0aW9uKHMpIG9yIEh0dHApIHRoYXQgd2lsbCBidWJibGUgdXAgdG8gdGhlXHJcbiAgICogY2FsbGVyIChpLmUuLCBhIGNvbXBvbmVudCkgaW4gYSBzcGVjaWZpZWQgZm9ybWF0OlxyXG4gICAqXHJcbiAgICogSXNTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7IC8vIGRlZmF1bHQgZm9yIEVycm9yUmVzcG9uc2VcclxuICAgKiBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICogRXJyb3JzOiBBcnJheTxTZXJ2aWNlRXJyb3I+ID0gbmV3IEFycmF5PFNlcnZpY2VFcnJvcj4oKTtcclxuICAgKiBFeGNlcHRpb246IGFueTtcclxuICAgKi9cclxuICBoYW5kbGVTZXJ2aWNlRXJyb3JzKFxyXG4gICAgZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSxcclxuICAgIHNlcnZpY2VDb250ZXh0PzogU2VydmljZUNvbnRleHRcclxuICApIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGhhbmRsZSBzZXJ2aWNlIGVycm9ycyBmb3IgY29tcG9uZW50LmBcclxuICAgICk7XHJcbiAgICBpZiAoc2VydmljZUNvbnRleHQgJiYgc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgIGBSZXRyaWV2aW5nIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIFNlcnZpY2VDb250ZXh0L1ZhbGlkYXRpb25Db250ZXh0O2BcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLnJldHJpZXZlU2VydmljZUNvbnRleHRFcnJvck1lc3NhZ2VzKHNlcnZpY2VDb250ZXh0KTtcclxuICAgICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbihcclxuICAgICAgICAnRXJyb3JzJyxcclxuICAgICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UsXHJcbiAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgQWxlcnRUeXBlcy5XYXJuaW5nXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZXJyb3JSZXNwb25zZSAmJiBlcnJvclJlc3BvbnNlLk1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgYFJldHJpZXZpbmcgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgW0Vycm9yUmVzcG9uc2VdLmBcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMucmV0cmlldmVSZXNwb25zZUVycm9yTWVzc2FnZXMoZXJyb3JSZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UsXHJcbiAgICAgICAgICBlcnJvcnMsXHJcbiAgICAgICAgICBBbGVydFR5cGVzLldhcm5pbmdcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgICBgRXJyb3I6ICR7ZXJyb3JSZXNwb25zZS5NZXNzYWdlfWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmV0cmlldmUgdGhlIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxyXG4gICAqXHJcbiAgICogQHBhcm06IHNlcnZpY2VDb250ZXh0OiBBIGNvbnRleHQgb2JqZWN0IGNvbnRhaW5pbmcgbWVzc2FnZXMgZm9yIHRoZSBzcGVjaWZpZWQgcmVxdWVzdC5cclxuICAgKi9cclxuICByZXRyaWV2ZVNlcnZpY2VDb250ZXh0RXJyb3JNZXNzYWdlcyhcclxuICAgIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dFxyXG4gICk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgY29uc3QgbWVzc2FnZXMgPSBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICBzZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICBpZiAoZS5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IgJiYgZS5EaXNwbGF5VG9Vc2VyKSB7XHJcbiAgICAgICAgbWVzc2FnZXMucHVzaChlLk1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtZXNzYWdlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgc3BlY2lmaWVkIFdlYiBBUEkgcmVzcG9uc2UuXHJcbiAgICovXHJcbiAgcmV0cmlldmVSZXNwb25zZUVycm9yTWVzc2FnZXMoZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSkge1xyXG4gICAgY29uc3QgZXJyb3JzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIGlmIChlcnJvclJlc3BvbnNlICYmIGVycm9yUmVzcG9uc2UuRXJyb3JzKSB7XHJcbiAgICAgIGVycm9yUmVzcG9uc2UuRXJyb3JzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgaWYgKGUuRGlzcGxheVRvVXNlcikge1xyXG4gICAgICAgICAgZXJyb3JzLnB1c2goZS5NZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVycm9ycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXNldCB0aGUgW0FsZXJ0Tm90aWZpY2F0aW9uXSB0byB0aGUgaW5pdGlhbCBzdGF0ZS4gUmVtb3Zlc1xyXG4gICAqIGV4aXN0aW5nIG1lc3NhZ2VzIGFuZCBoaWRlcyB0aGUgQWxlcnRDb21wb25lbnQuXHJcbiAgICovXHJcbiAgcmVzZXRBbGVydE5vdGlmaWNhdGlvbnMoKSB7XHJcbiAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKCcnLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gbmF2aWdhdGUgdG8gdGhlIHNwZWNpZmllZCByb3V0ZS5cclxuICAgKiBAcGFybSByb3V0ZU5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCByb3V0ZS5cclxuICAgKi9cclxuICBwdWJsaWMgcm91dGVUbyhyb3V0ZU5hbWU6IHN0cmluZykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JvdXRlTmFtZV0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgIGBFcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIG5hdmlnYXRlIHRvIFske3JvdXRlTmFtZX1dIHJvdXRlIGZyb20gJHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZVxyXG4gICAgICAgIH0uIEVycm9yOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJldHJpZXZlIGFuZCBzaG93IGFueSByZXNwb25zZSBlcnJvciBtZXNzYWdlcy5cclxuICAgKi9cclxuICBzaG93UmVzcG9uc2VFcnJvcnMocmVzcG9uc2U6IEVycm9yUmVzcG9uc2UpIHtcclxuICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhyZXNwb25zZSwgdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGZpbmlzaFJlcXVlc3QobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYCR7dGhpcy5jb21wb25lbnROYW1lfTogJHttZXNzYWdlfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2hvd0FsZXJ0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGFsZXJ0KG1lc3NhZ2UpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RNZXRob2QgfSBmcm9tICcuL2h0dHAtcmVxdWVzdC1tZXRob2RzLmVudW0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEh0dHBSZXF1ZXN0T3B0aW9ucyB7XHJcblxyXG4gICAgcmVxdWVzdE1ldGhvZDogSHR0cFJlcXVlc3RNZXRob2QgXHJcbiAgICBib2R5PzogYW55O1xyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzIHwgeyBbaGVhZGVyOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXTsgfTsgXHJcbiAgICBvYnNlcnZlPzogJ2JvZHknOyBcclxuICAgIHBhcmFtcz86IEh0dHBQYXJhbXMgfCB7IFtwYXJhbTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW107IH07IFxyXG4gICAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuOyBcclxuICAgIC8vIHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJzsgXHJcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xyXG4gICAgcmVxdWVzdFVybDogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFdmVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJy4vbW9kZWxzL2h0dHAtcmVxdWVzdC1tZXRob2RzLmVudW0nO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1lcnJvci5tb2RlbCc7XHJcbmltcG9ydCB7IFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGNyZWF0ZSBhbmQgZXhlY3V0ZSBIVFRQIHNlcnZpY2UgcmVxdWVzdHMuXHJcbiAqIDEuIENyZWF0ZSBIZWFkZXJzXHJcbiAqIDIuIENyZWF0ZSBSZXF1ZXN0T3B0aW9uc1xyXG4gKiAzLiBFeGVjdXRlIFJlcXVlc3RcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBCYXNlU2VydmljZSB7XHJcbiAgcHVibGljIHNlcnZpY2VOYW1lID0gJ0h0dHBCYXNlU2VydmljZSc7XHJcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgW211bHRpcGFydC9mb3JtLWRhdGFdLlxyXG4gICAqL1xyXG4gIGNyZWF0ZU11bHRpcGFydEZvcm1EYXRhSGVhZGVyKHJlcXVpcmVzQXV0aFRva2VuOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGhlYWRlciBmb3IgdGhlIFttdWx0aXBhcnQvZm9ybS1kYXRhXSBIVFRQIHJlcXVlc3QuIFJlcXVpcmVzQXV0aFRva2VuOiAke3JlcXVpcmVzQXV0aFRva2VufS5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICBpZiAocmVxdWlyZXNBdXRoVG9rZW4pIHtcclxuICAgICAgLy8gY3JlYXRlIGhlYWRlciByZXF1ZXN0IHdpdGggc2VjdXJpdHkgdG9rZW47XHJcbiAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMuYWNjZXNzVG9rZW59YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgQ29udGVudC1UeXBlIFthcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRdLlxyXG4gICAqL1xyXG4gIGNyZWF0ZUZvcm1VcmxlbmNvZGVkSGVhZGVyKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBoZWFkZXIgZm9yIHRoZSBbYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXSBIVFRQIHJlcXVlc3QuYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgdGhlIEhUVFAgcmVxdWVzdC4gSWYgdGhlIFtyZXF1aXJlc0F1dGhUb2tlbl0gaW5kaWNhdG9yXHJcbiAgICogaXMgdHJ1ZSwgdGhlIHJlcXVlc3Qgd2lsbCB1c2UgdGhlIGN1cnJlbnQgQXV0aG9yaXphdGlvbiBzZWN1cml0eSB0b2tlbi5cclxuICAgKiBAcGFyYW0gaXNTZWN1cmVcclxuICAgKi9cclxuICBjcmVhdGVIZWFkZXIocmVxdWlyZXNBdXRoVG9rZW46IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgaGVhZGVyIGZvciB0aGUgSFRUUCByZXF1ZXN0LiBSZXF1aXJlc0F1dGhUb2tlbjogJHtyZXF1aXJlc0F1dGhUb2tlbn0uYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgaWYgKHJlcXVpcmVzQXV0aFRva2VuKSB7XHJcbiAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMuYWNjZXNzVG9rZW59YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgSHR0cFJlcXVlc3RPcHRpb25zIGl0ZW0gZm9yIGEgcmVxdWVzdC5cclxuICAgKiBAcGFyYW0gaGVhZGVycyBVc2UgdG8gc3VwcGx5IGhlYWRlciBpbmZvcm1hdGlvbiBpbiB0aGUgcmVxdWVzdC5cclxuICAgKiBAcGFyYW0gdXJsIFVzZSB0byBpbmRpY2F0ZSB0aGUgVVJMIG9mIHRoZSB3ZWIgYXBpLlxyXG4gICAqIEBwYXJhbSBib2R5IFVzZSB0byBwcm92aWRlIGEgZGF0YSBwYXlsb2FkIGZvciB0aGUgcmVxdWVzdC5cclxuICAgKi9cclxuICBjcmVhdGVSZXF1ZXN0T3B0aW9ucyhcclxuICAgIG1ldGhvZDogSHR0cFJlcXVlc3RNZXRob2QsXHJcbiAgICBoZWFkZXJzOiBIdHRwSGVhZGVycyxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgYm9keTogYW55XHJcbiAgKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIHJlcXVlc3Qgb3B0aW9ucyBmb3IgdGhlIEhUVFAgcmVxdWVzdC5gXHJcbiAgICApO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBIdHRwUmVxdWVzdE9wdGlvbnMoKTtcclxuICAgIG9wdGlvbnMuaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICBvcHRpb25zLnJlcXVlc3RVcmwgPSB1cmw7XHJcbiAgICBvcHRpb25zLmJvZHkgPSBib2R5O1xyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgYW4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBzcGVjaWZpZWQgaGVhZGVyIGFuZCBVUkwuXHJcbiAgICovXHJcbiAgZXhlY3V0ZVJlcXVlc3QocmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gZXhlY3V0ZSBIVFRQIHJlcXVlc3QuIFVybDogJHtyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsfWApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxTZXJ2aWNlUmVzcG9uc2U+KHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QudG9TdHJpbmcoKSwgcmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCwgcmVxdWVzdE9wdGlvbnMpO1xyXG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgLy8gICAucmVxdWVzdChuZXcgUmVxdWVzdChyZXF1ZXN0T3B0aW9ucykpXHJcbiAgICAvLyAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKSAvLyBtYXBzIHRoZSBvYnNlcnZhYmxlIHJlc3BvbnNlIHRvIGEgSlNPTiBvYmplY3Q7XHJcbiAgICAvLyAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmhhbmRsZUh0dHBFcnJvcihlcnJvciwgcmVxdWVzdE9wdGlvbnMpKTsgLy8gdXNlIHRvIGhhbmRsZSBhbnkgZXhjZXB0aW9uIGR1cmluZyBzZXJ2aWNlIGNhbGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIFtnZXRdIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCB1cmwgYW5kIG9wdGlvbnMuXHJcbiAgICovXHJcbiAgZ2V0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0TWV0aG9kID0gSHR0cFJlcXVlc3RNZXRob2QuR0VUO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmh0dHAuZ2V0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCwgcmVxdWVzdE9wdGlvbnMpXHJcbiAgICAucGlwZSgpO1xyXG5cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBleGVjdXRlIGFuIEhUVFAgW3Bvc3RdIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCB1cmwgYW5kIG9wdGlvbnMuXHJcbiAgICogQHBhcmFtIHJlcXVlc3RPcHRpb25zIHVzZSB0byBkZWZpbmUgdGhlIG9wdGlvbnMgZm9yIHRoZSBzcGVjaWZpZWQgcmVxdWVzdC5cclxuICAgKi9cclxuICBwb3N0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0TWV0aG9kID0gSHR0cFJlcXVlc3RNZXRob2QuUE9TVDtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5odHRwLnBvc3Q8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgIC5waXBlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBIVFRQIGVycm9ycyB3aGVuIGNhbGxpbmcgd2ViIGFwaShzKS5cclxuICAgKi9cclxuICBoYW5kbGVIdHRwRXJyb3IoXHJcbiAgICBlcnJvcjogYW55LFxyXG4gICAgcmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci50b1N0cmluZygpfSAke1xyXG4gICAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsXHJcbiAgICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBtZXNzYWdlKTtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xyXG4gICAgICAvKipcclxuICAgICAgICogVGhpcyBpcyBhbiBlcnJvciB0aGF0IGNvbnRhaW5zIGEgYm9keSAtIGEgW1Jlc3BvbnNlXSBmcm9tIHRoZSBhcHBsaWNhdGlvbiB3ZWIgYXBpLiBJbmNsdWRlczpcclxuICAgICAgICogMS4gSXNTdWNjZXNzXHJcbiAgICAgICAqIDIuIE1lc3NhZ2VcclxuICAgICAgICogMy4gQXJyYXkgb2YgU2VydmljZUVycm9yIGl0ZW1zXHJcbiAgICAgICAqIDQuIEV4Y2VwdGlvbiAob3B0aW9uYWwpXHJcbiAgICAgICAqL1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gZXJyb3IuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBUT0RPOiBSRVRSSUVWRSBFUlJPUiBERVRBSUxTOyBTVEFUVVMsIE1FU1NBR0U7IEVUQy4gQU5EIFBST1ZJREUgVE8gSEFORExFUjtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgIGNvbnN0IGVyciA9IDxFcnJvcj5leDtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgJHtlcnIubmFtZX07ICR7ZXJyLm1lc3NhZ2V9YDtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcj86IEVycm9yKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShlcnJvcik7XHJcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFcnJvclJlc3BvbnNlKGVycm9yPzogRXJyb3IpOiBFcnJvclJlc3BvbnNlIHtcclxuICAgIGxldCBtZXNzYWdlID0gJ1VuZXhwZWN0ZWQgZXJyb3Igd2hpbGUgcHJvY2Vzc2luZyByZXNwb25zZS4nO1xyXG4gICAgY29uc3QgcmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xyXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgbWVzc2FnZSA9IGAke2Vycm9yLm5hbWV9IC0gJHtlcnJvci5tZXNzYWdlfWA7XHJcbiAgICAgIHJlc3BvbnNlLkV4Y2VwdGlvbiA9IGVycm9yO1xyXG4gICAgfVxyXG4gICAgcmVzcG9uc2UuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBVc2UgdGhpcyBtb2RlbCB0byByZXByZXNlbnQgc2VydmljZSBlcnJvci9tZXNzYWdlIGluZm9ybWF0aW9uIGZyb20gdGhlXHJcbiAqIGFwcGxpY2F0aW9uJ3Mgc2VydmljZSBBUElzLlxyXG4gKlxyXG4gKiBUaGUgRGlzcGxheVRvVXNlciBib29sZWFuIHZhbHVlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBtZXNzYWdlIHNob3VsZCBiZVxyXG4gKiBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIgaWYgZGVzaXJlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlRXJyb3Ige1xyXG4gIC8vIFwie1wiSXNTdWNjZXNzXCI6ZmFsc2UsXHJcbiAgLy8gXCJNZXNzYWdlXCI6XCJGYWlsZWQgdG8gY3JlYXRlIG5ldyB1c2VyIGFjY291bnQuXCIsXHJcbiAgLy8gXCJFcnJvcnNcIjpbe1wiTmFtZVwiOlwiUGFzc3dvcmRGb3JtYXRJc1ZhbGlkXCIsXHJcbiAgLy8gXCJNZXNzYWdlXCI6XCJUaGUgcGFzc3dvcmQgZm9ybWF0IGlzIG5vdCB2YWxpZC4gTXVzdCBjb250YWluIGF0IGxlYXN0IG9uZTogYWxwaGEsIG51bWVyaWMsIGFuZCBzcGVjaWFsIGNoYXJhY3Rlci5cIixcclxuICAvLyBcIkV4Y2VwdGlvblwiOm51bGwsXCJTb3VyY2VcIjpcIkNyZWF0ZUxlYXJuZXJBY2NvdW50QWN0aW9uXCIsXHJcbiAgLy8gRGlzcGxheVRvVXNlclwiOnRydWUsXCJUYXJnZXRcIjpcIlwifV19XCJcclxuXHJcbiAgTmFtZTogc3RyaW5nO1xyXG4gIE1lc3NhZ2U6IHN0cmluZztcclxuICBFeGNlcHRpb246IGFueTtcclxuICBEaXNwbGF5VG9Vc2VyOiBib29sZWFuO1xyXG4gIFNvdXJjZTogc3RyaW5nO1xyXG4gIFRhcmdldDogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IFNlcnZpY2VFcnJvciB9IGZyb20gJy4vc2VydmljZS1lcnJvci5tb2RlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmljZVJlc3BvbnNlIHtcclxuICBJc1N1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgTWVzc2FnZTogc3RyaW5nO1xyXG4gIERhdGE6IGFueTtcclxuICBFcnJvcnM6IEFycmF5PFNlcnZpY2VFcnJvcj4gPSBuZXcgQXJyYXk8U2VydmljZUVycm9yPigpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Z0JBSUMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixFQUFFLFlBQVksQ0FBQztpQkFDckQ7O3lDQU5EOzs7Ozs7O0FDRUEsSUFBQTs7eUJBQ2MsS0FBSztzQkFFYSxJQUFJLEtBQUssRUFBZ0I7O3dCQUx6RDtJQU9DOzs7Ozs7QUNQRDs7OztBQWlCQTs7OztBQUFBOzs7Ozs7Ozs7SUFhRSxxQkFBbUIsY0FBNEM7UUFBNUMsbUJBQWMsR0FBZCxjQUFjLENBQThCOzJCQVpqRCxFQUFFOzhCQUVpQixJQUFJLGNBQWMsRUFBRTtLQVVjOzs7Ozs7Ozs7Ozs7SUFPbkUsaUNBQVc7Ozs7OztJQUFYLFVBQVksUUFBa0I7UUFDNUIscUJBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWNELDJDQUFxQjs7Ozs7Ozs7Ozs7OztJQUFyQixVQUFzQixLQUFZO1FBQ2hDLHFCQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDMUQsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2FBQ3ZCLGVBQWUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO2FBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFaEMscUJBQU0sT0FBTyxHQUFN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