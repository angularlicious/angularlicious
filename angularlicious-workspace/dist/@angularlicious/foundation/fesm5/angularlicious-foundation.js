import { CommonModule } from '@angular/common';
import { __extends } from 'tslib';
import { Action, ActionResult } from '@angularlicious/actions';
import { NavigationEnd } from '@angular/router';
import { AngularliciousRulesEngineModule, ServiceContext, MessageType, ServiceMessage, CompositeRule } from '@angularlicious/rules-engine';
import { NgModule, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularliciousLoggingModule, Severity, AngularliciousLoggingService } from '@angularlicious/logging';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularliciousFoundationModule = /** @class */ (function () {
    function AngularliciousFoundationModule() {
    }
    AngularliciousFoundationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [AngularliciousLoggingModule, CommonModule, AngularliciousRulesEngineModule],
                },] }
    ];
    return AngularliciousFoundationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ServiceResponse = /** @class */ (function () {
    function ServiceResponse() {
        this.Errors = new Array();
    }
    return ServiceResponse;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ErrorResponse = /** @class */ (function (_super) {
    __extends(ErrorResponse, _super);
    function ErrorResponse() {
        var _this = _super.call(this) || this;
        _this.IsSuccess = false;
        return _this;
    }
    return ErrorResponse;
}(ServiceResponse));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var body = response.json();
        return body || {};
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
        /** @type {?} */
        var message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        /** @type {?} */
        var tags = ["" + this.serviceName];
        /** @type {?} */
        var logItem = message.toString() + "; " + error.stack;
        this.loggingService.log(this.serviceName, Severity.Error, logItem, tags);
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
        /** @type {?} */
        var message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        /** @type {?} */
        var tags = ["" + this.serviceName];
        this.loggingService.log(this.serviceName, Severity.Error, message.toString(), tags);
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
        /** @type {?} */
        var message = error.toString() + " " + requestOptions.requestUrl + ", " + JSON.stringify(requestOptions.body);
        this.loggingService.log(this.serviceName, Severity.Error, message);
        if (error && error._body) {
            try {
                /** @type {?} */
                var errorResponse = error.json();
                /** @type {?} */
                var behaviorSubject = new BehaviorSubject(errorResponse);
                return behaviorSubject.asObservable();
            }
            catch (error) {
                this.loggingService.log(this.serviceName, Severity.Error, error.toString());
            }
        }
        // default return behavior;
        /** @type {?} */
        var response = this.createErrorResponse('Unexpected error while processing response.');
        /** @type {?} */
        var subject = new BehaviorSubject(response);
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
        /** @type {?} */
        var message = error.toString() + " " + requestOptions.requestUrl + ", " + JSON.stringify(requestOptions.body);
        this.loggingService.log(this.serviceName, Severity.Error, message);
        if (error && error._body) {
            try {
                /** @type {?} */
                var errorResponse = this.createErrorResponse("Unable to validate credentials.");
                /** @type {?} */
                var behaviorSubject = new BehaviorSubject(errorResponse);
                return behaviorSubject.asObservable();
            }
            catch (e) {
                this.loggingService.log(this.serviceName, Severity.Error, e.toString());
            }
        }
        // default return behavior;
        /** @type {?} */
        var response = this.createErrorResponse("Unable to validate credentials.");
        /** @type {?} */
        var subject = new BehaviorSubject(response);
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
        /** @type {?} */
        var response = new ErrorResponse();
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            /** @type {?} */
            var errorResponse = new ErrorResponse();
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
            /** @type {?} */
            var composite = (/** @type {?} */ (ruleResult.rulePolicy));
            if (composite && composite.hasErrors) {
                /** @type {?} */
                var errors = composite.results.filter(function (result) { return !result.isValid && result.rulePolicy.isDisplayable; });
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
        /** @type {?} */
        var serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
        serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
        serviceMessage.Source = this.actionName;
        this.serviceContext.Messages.push(serviceMessage);
        this.loggingService.log(this.actionName, Severity.Error, "" + serviceMessage.toString());
    };
    return ActionBase;
}(Action));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        /** @type {?} */
        var logItem = message.toString() + "; " + error.stack;
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertNotification = /** @class */ (function () {
    function AlertNotification(header, title, messages, type) {
        this.type = AlertTypes.Information; // alert-warning, alert-success, alert-info, alert-danger
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @param category A category is a name that you supply as a way to group objects that you want to track. Typically, you will use the same category name multiple times over related UI elements that you want to group under a given category.
     * @param action Use the action parameter to name the type of event or interaction you want to track for a particular web object (i.e., play, stop, pause, download). A unique event is determined by a unique action name. You can use duplicate action names across categories, but this can affect how unique events are calculated. See the suggestions below and the Implicit Count section for more details.
     * @param label Provide additional information for events that you want to track, such as the movie title in the video examples above, or the name of a file when tracking downloads. All labels are listed independently from their parent categories and actions. This provides you with another useful way to segment the event data for your reports. All labels are listed independently from their parent categories and actions. This provides you with another useful way to segment the event data for your reports.
     * @param value Any numeric value indicating a [value] that will be summarized for the analytic item(s).
     *
     * More information at: https://support.google.com/analytics/answer/1033068
     * or https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
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
        ((/** @type {?} */ (window))).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ComponentBase.prototype.googleAnalyticsPageview = /**
     * @private
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
            /** @type {?} */
            var GA_TRACKING_ID = 'UA-110194344-1';
            // gtag('config', 'GA_TRACKING_ID', {<pageview_parameters>});
            ((/** @type {?} */ (window))).ga('config', GA_TRACKING_ID, {
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
        /** @type {?} */
        var errorResponse = new ErrorResponse();
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
            /** @type {?} */
            var messages = this.retrieveServiceContextErrorMessages(serviceContext);
            this.alertNotification = new AlertNotification('Errors', errorResponse.Message, messages, AlertTypes.Warning);
        }
        else {
            if (errorResponse && errorResponse.Message) {
                this.loggingService.log(this.componentName, Severity.Information, "Retrieving error messages from the [ErrorResponse].");
                /** @type {?} */
                var errors = this.retrieveResponseErrorMessages(errorResponse);
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
        /** @type {?} */
        var messages = Array();
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
        /** @type {?} */
        var errors = new Array();
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
     * @parm routeName The name of the target route.
     */
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
        catch (error) {
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
     * @protected
     * @param {?} message
     * @return {?}
     */
    ComponentBase.prototype.showAlertMessage = /**
     * @protected
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HttpRequestOptions = /** @class */ (function () {
    function HttpRequestOptions() {
    }
    return HttpRequestOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var HttpRequestMethod = {
    get: 0,
    post: 1,
    put: 2,
    delete: 3,
    options: 4,
    head: 5,
    patch: 6,
};
HttpRequestMethod[HttpRequestMethod.get] = 'get';
HttpRequestMethod[HttpRequestMethod.post] = 'post';
HttpRequestMethod[HttpRequestMethod.put] = 'put';
HttpRequestMethod[HttpRequestMethod.delete] = 'delete';
HttpRequestMethod[HttpRequestMethod.options] = 'options';
HttpRequestMethod[HttpRequestMethod.head] = 'head';
HttpRequestMethod[HttpRequestMethod.patch] = 'patch';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use to create and execute HTTP service requests.
 * 1. Create HttpHeaders
 * 2. Create RequestOptions
 * 3. Execute Request
 *
 * More information at: https://angular.io/guide/http
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
        /** @type {?} */
        var headers = new HttpHeaders();
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
        /** @type {?} */
        var headers = new HttpHeaders({
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
        /** @type {?} */
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
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
        /** @type {?} */
        var options = new HttpRequestOptions();
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
        requestOptions.requestMethod = HttpRequestMethod.get;
        return this.http
            .get(requestOptions.requestUrl, requestOptions)
            .pipe(
        // catchError(error => this.handleHttpError(error, requestOptions))
        );
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
        this.http.options;
        return this.http
            .post(requestOptions.requestUrl, requestOptions.body, {
            headers: requestOptions.headers
        })
            .pipe(
        // catchError(error => this.handleHttpError(error, requestOptions))
        );
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
        /** @type {?} */
        var message = error.toString() + " " + requestOptions.requestUrl + ", " + JSON.stringify(requestOptions.body);
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
                /** @type {?} */
                var response = error.json();
                if (response) {
                    /** @type {?} */
                    var subject = new BehaviorSubject(response);
                    return subject.asObservable();
                }
                else {
                    // TODO: RETRIEVE ERROR DETAILS; STATUS, MESSAGE; ETC. AND PROVIDE TO HANDLER;
                    return this.handleUnexpectedError(error);
                }
            }
            catch (ex) {
                /** @type {?} */
                var err = (/** @type {?} */ (ex));
                /** @type {?} */
                var errorMessage = err.name + "; " + err.message;
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
        /** @type {?} */
        var response = this.createErrorResponse(error);
        /** @type {?} */
        var subject = new BehaviorSubject(response);
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
        /** @type {?} */
        var message = 'Unexpected error while processing response.';
        /** @type {?} */
        var response = new ErrorResponse();
        if (error instanceof Error) {
            message = error.name + " - " + error.message;
            response.Exception = error;
        }
        response.Message = message;
        return response;
    };
    HttpBaseService.decorators = [
        { type: Injectable }
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularliciousFoundationModule, ServiceBase, ActionBase, BusinessProviderBase, ComponentBase, HttpBaseService, ErrorResponse, ServiceError, ServiceResponse, AlertNotification, AlertTypes, HttpRequestOptions, HttpRequestMethod };

//# sourceMappingURL=angularlicious-foundation.js.map