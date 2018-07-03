(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angularlicious/logging'), require('@angularlicious/rules-engine'), require('rxjs'), require('@angularlicious/actions'), require('@angular/router'), require('rxjs/add/operator/filter'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/foundation', ['exports', '@angular/core', '@angular/common', '@angularlicious/logging', '@angularlicious/rules-engine', 'rxjs', '@angularlicious/actions', '@angular/router', 'rxjs/add/operator/filter', '@angular/common/http'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.foundation = {}),global.ng.core,global.ng.common,global.angularliciousLogging,global.angularliciousRulesEngine,global.rxjs,global.angularliciousActions,global.ng.router,global.rxjs['add/operator/filter'],global.ng.common.http));
}(this, (function (exports,core,common,logging,rulesEngine,rxjs,actions,router,filter,http) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousFoundationModule = (function () {
        function AngularliciousFoundationModule() {
        }
        AngularliciousFoundationModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [logging.AngularliciousLoggingModule, common.CommonModule]
                    },] },
        ];
        return AngularliciousFoundationModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ErrorResponse = (function () {
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
    var /**
     * Use the [ServiceBase] to provide common behavior for Angular
     * services.
     */ ServiceBase = (function () {
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
            this.serviceContext = new rulesEngine.ServiceContext();
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
                var /** @type {?} */ message = new rulesEngine.ServiceMessage(error.name, error.message)
                    .WithDisplayToUser(true)
                    .WithMessageType(rulesEngine.MessageType.Error)
                    .WithSource(this.serviceName);
                var /** @type {?} */ logItem = message.toString() + "; " + error.stack;
                this.loggingService.log(this.serviceName, logging.Severity.Error, logItem);
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
                var /** @type {?} */ message = new rulesEngine.ServiceMessage(error.name, error.message)
                    .WithDisplayToUser(true)
                    .WithMessageType(rulesEngine.MessageType.Error)
                    .WithSource(this.serviceName);
                this.loggingService.log(this.serviceName, logging.Severity.Error, message.toString());
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
                this.loggingService.log(this.serviceName, logging.Severity.Error, message);
                if (error && error._body) {
                    try {
                        var /** @type {?} */ errorResponse = error.json();
                        var /** @type {?} */ behaviorSubject = new rxjs.BehaviorSubject(errorResponse);
                        return behaviorSubject.asObservable();
                    }
                    catch (error) {
                        this.loggingService.log(this.serviceName, logging.Severity.Error, error.toString());
                    }
                }
                // default return behavior;
                var /** @type {?} */ response = this.createErrorResponse('Unexpected error while processing response.');
                var /** @type {?} */ subject = new rxjs.BehaviorSubject(response);
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
                this.loggingService.log(this.serviceName, logging.Severity.Error, message);
                if (error && error._body) {
                    try {
                        var /** @type {?} */ errorResponse = this.createErrorResponse("Unable to validate credentials.");
                        var /** @type {?} */ behaviorSubject = new rxjs.BehaviorSubject(errorResponse);
                        return behaviorSubject.asObservable();
                    }
                    catch (e) {
                        this.loggingService.log(this.serviceName, logging.Severity.Error, e.toString());
                    }
                }
                // default return behavior;
                var /** @type {?} */ response = this.createErrorResponse("Unable to validate credentials.");
                var /** @type {?} */ subject = new rxjs.BehaviorSubject(response);
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
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Request for [" + sourceName + "] by " + this.serviceName + " is complete.");
                if (this.serviceContext.hasErrors()) {
                    this.loggingService.log(this.serviceName, logging.Severity.Information, "Preparing to write any messages.");
                    this.serviceContext.Messages.filter(function (f) { return f.MessageType === rulesEngine.MessageType.Error && f.DisplayToUser; }).forEach(function (e) {
                        return _this.loggingService.log(_this.serviceName, logging.Severity.Error, e.toString());
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
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Preparing to reset the Messages of the current [ServiceContext].");
                if (this.serviceContext && this.serviceContext.Messages) {
                    if (this.serviceContext.Messages.length > 0) {
                        this.loggingService.log(this.serviceName, logging.Severity.Information, "Resetting the Messages of the current [ServiceContext].");
                        this.serviceContext.Messages = new Array();
                    }
                    else {
                        this.loggingService.log(this.serviceName, logging.Severity.Information, "The current [ServiceContext] does not contain any [Messages].");
                    }
                }
                else {
                    this.loggingService.log(this.serviceName, logging.Severity.Warning, "The current [ServiceContext] is not valid.");
                }
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Finished  processing request to [reset] the Messages of the current [ServiceContext].");
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
                        if (e.MessageType === rulesEngine.MessageType.Error && e.DisplayToUser) {
                            _this.loggingService.log(_this.serviceName, logging.Severity.Error, e.toString());
                        }
                    });
                }
            };
        return ServiceBase;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
    var /**
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
     */ ActionBase = (function (_super) {
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
                this.loggingService.log(this.actionName, logging.Severity.Information, "Preparing to determine if the action contains validation errors in " + this.actionName);
                if (this.validationContext.hasRuleViolations()) {
                    this.loggingService.log(this.actionName, logging.Severity.Information, "The target contains validation errors in " + this.actionName);
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
                if (this.actionResult === actions.ActionResult.Fail) {
                    this.serviceContext.Messages.forEach(function (e) {
                        if (e.MessageType === rulesEngine.MessageType.Error) {
                            _this.loggingService.log(_this.actionName, logging.Severity.Error, e.toString());
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
                this.loggingService.log(this.actionName, logging.Severity.Information, "Running [validateActionResult] for " + this.actionName + ".");
                // determine the status of the action based on any rule violations;
                if (this.validationContext.hasRuleViolations()) {
                    this.loggingService.log(this.actionName, logging.Severity.Error, "The " + this.actionName + " contains rule violations.");
                    this.actionResult = actions.ActionResult.Fail;
                    var /** @type {?} */ errorResponse = new ErrorResponse();
                    errorResponse.IsSuccess = false;
                    errorResponse.Message = "Validation errors exist.";
                    this.response = rxjs.Observable.throw(errorResponse);
                }
                this.actionResult = this.serviceContext.isGood()
                    ? actions.ActionResult.Success
                    : actions.ActionResult.Fail;
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
                if (ruleResult.rulePolicy instanceof rulesEngine.CompositeRule) {
                    var /** @type {?} */ composite = (ruleResult.rulePolicy);
                    if (composite && composite.hasErrors) {
                        var /** @type {?} */ errors = composite.results.filter(function (result) { return !result.isValid && result.rulePolicy.isDisplayable; });
                        errors.forEach(function (errorResult) {
                            _this.publishRuleResult(errorResult);
                            if (errorResult.rulePolicy instanceof rulesEngine.CompositeRule) {
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
                var /** @type {?} */ serviceMessage = new rulesEngine.ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, rulesEngine.MessageType.Error);
                serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
                serviceMessage.Source = this.actionName;
                this.serviceContext.Messages.push(serviceMessage);
                this.loggingService.log(this.actionName, logging.Severity.Error, "" + serviceMessage.toString());
            };
        return ActionBase;
    }(actions.Action));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Use the business provider base class to access common elements of the business provider.
     *
     * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
     */
    var /**
     * Use the business provider base class to access common elements of the business provider.
     *
     * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
     */ BusinessProviderBase = (function () {
        function BusinessProviderBase(loggingService) {
            this.loggingService = loggingService;
            this.loggingService.log(this.serviceName, logging.Severity.Information, "Running constructor for the [BusinessProviderBase].");
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
                var /** @type {?} */ message = new rulesEngine.ServiceMessage(error.name, error.message)
                    .WithDisplayToUser(true)
                    .WithMessageType(rulesEngine.MessageType.Error)
                    .WithSource(this.serviceName);
                var /** @type {?} */ logItem = message.toString() + "; " + error.stack;
                this.loggingService.log(this.serviceName, logging.Severity.Error, logItem);
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
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Request for [" + sourceName + "] by " + this.serviceName + " is complete.");
                if (this.serviceContext.hasErrors()) {
                    this.loggingService.log(this.serviceName, logging.Severity.Information, "Preparing to write out the errors.");
                    this.serviceContext.Messages.filter(function (f) { return f.DisplayToUser && f.MessageType === rulesEngine.MessageType.Error; }).forEach(function (e) {
                        return _this.loggingService.log(_this.serviceName, logging.Severity.Error, e.toString());
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
    var AlertTypes = (function () {
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
    var AlertNotification = (function () {
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
    var ComponentBase = (function () {
        function ComponentBase(componentName, loggingService, router$$1) {
            var _this = this;
            this.loggingService = loggingService;
            this.router = router$$1;
            this.componentName = componentName;
            this.alertNotification = new AlertNotification('', '');
            this.router.events.subscribe(function (event) {
                if (event instanceof router.NavigationEnd) {
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
                ((window)).gtag('event', action, {
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
                    this.loggingService.log(this.componentName, logging.Severity.Information, "Preparing to set [Google Analytics] page view for [" + event.urlAfterRedirects + "].");
                    // (<any>window).ga('set', 'page', event.urlAfterRedirects);
                    // (<any>window).ga('send', 'pageview');
                    // ga('create', 'UA-110194344-1', 'auto', this.componentName);
                    // ga(`${this.componentName}.send`, 'pageview');
                    // https://blog.thecodecampus.de/angular-2-google-analytics-google-tag-manager/
                    // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
                    var /** @type {?} */ GA_TRACKING_ID = 'UA-110194344-1';
                    // gtag('config', 'GA_TRACKING_ID', {<pageview_parameters>});
                    ((window)).ga('config', GA_TRACKING_ID, {
                        page_title: this.componentName,
                        page_path: event.urlAfterRedirects
                    });
                }
                else {
                    this.loggingService.log(this.componentName, logging.Severity.Warning, "Failed to set [Google Analytics] page view.");
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
                this.loggingService.log(this.componentName, logging.Severity.Information, "Preparing to create error response for component.");
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
                this.loggingService.log(this.componentName, logging.Severity.Information, "Preparing to handle service errors for component.");
                if (serviceContext && serviceContext.hasErrors()) {
                    this.loggingService.log(this.componentName, logging.Severity.Information, "Retrieving error messages from the ServiceContext/ValidationContext;");
                    var /** @type {?} */ messages = this.retrieveServiceContextErrorMessages(serviceContext);
                    this.alertNotification = new AlertNotification('Errors', errorResponse.Message, messages, AlertTypes.Warning);
                }
                else {
                    if (errorResponse && errorResponse.Message) {
                        this.loggingService.log(this.componentName, logging.Severity.Information, "Retrieving error messages from the [ErrorResponse].");
                        var /** @type {?} */ errors = this.retrieveResponseErrorMessages(errorResponse);
                        this.alertNotification = new AlertNotification('Error', errorResponse.Message, errors, AlertTypes.Warning);
                        this.loggingService.log(this.componentName, logging.Severity.Error, "Error: " + errorResponse.Message);
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
                    if (e.MessageType === rulesEngine.MessageType.Error && e.DisplayToUser) {
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
                catch (error) {
                    this.loggingService.log(this.componentName, logging.Severity.Error, "Error while attempting to navigate to [" + routeName + "] route from " + this.componentName + ". Error: " + error.toString());
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
                this.loggingService.log(this.componentName, logging.Severity.Information, this.componentName + ": " + message);
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
    var HttpRequestOptions = (function () {
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
    var HttpBaseService = (function () {
        function HttpBaseService(http$$1, loggingService) {
            this.http = http$$1;
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
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Preparing to create header for the [multipart/form-data] HTTP request. RequiresAuthToken: " + requiresAuthToken + ".");
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
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Preparing to create header for the [application/x-www-form-urlencoded] HTTP request.");
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
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Preparing to create header for the HTTP request. RequiresAuthToken: " + requiresAuthToken + ".");
                var /** @type {?} */ headers = new http.HttpHeaders({ 'Content-Type': 'application/json' });
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
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Preparing to create request options for the HTTP request.");
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
                this.loggingService.log(this.serviceName, logging.Severity.Information, "Preparing to execute HTTP request. Url: " + requestOptions.requestUrl);
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
                this.loggingService.log(this.serviceName, logging.Severity.Error, message);
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
                            var /** @type {?} */ subject = new rxjs.BehaviorSubject(response);
                            return subject.asObservable();
                        }
                        else {
                            // TODO: RETRIEVE ERROR DETAILS; STATUS, MESSAGE; ETC. AND PROVIDE TO HANDLER;
                            return this.handleUnexpectedError(error);
                        }
                    }
                    catch (ex) {
                        var /** @type {?} */ err = (ex);
                        var /** @type {?} */ errorMessage = err.name + "; " + err.message;
                        this.loggingService.log(this.serviceName, logging.Severity.Error, errorMessage);
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
                var /** @type {?} */ subject = new rxjs.BehaviorSubject(response);
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        HttpBaseService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: logging.AngularliciousLoggingService }
            ];
        };
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
    var /**
     * Use this model to represent service error/message information from the
     * application's service APIs.
     *
     * The DisplayToUser boolean value indicates whether the message should be
     * displayed to the user if desired.
     */ ServiceError = (function () {
        function ServiceError() {
        }
        return ServiceError;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ServiceResponse = (function () {
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

    exports.AngularliciousFoundationModule = AngularliciousFoundationModule;
    exports.ServiceBase = ServiceBase;
    exports.ActionBase = ActionBase;
    exports.BusinessProviderBase = BusinessProviderBase;
    exports.ComponentBase = ComponentBase;
    exports.HttpBaseService = HttpBaseService;
    exports.ErrorResponse = ErrorResponse;
    exports.ServiceError = ServiceError;
    exports.ServiceResponse = ServiceResponse;
    exports.AlertNotification = AlertNotification;
    exports.AlertTypes = AlertTypes;
    exports.HttpRequestOptions = HttpRequestOptions;
    exports.HttpRequestMethod = HttpRequestMethod;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtZm91bmRhdGlvbi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL3NyYy9mb3VuZGF0aW9uLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vc3JjL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vc3JjL3NlcnZpY2UtYmFzZS50cyIsbnVsbCwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvYWN0aW9uLWJhc2UuYWN0aW9uLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cy50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vc3JjL21vZGVscy9hbGVydC1ub3RpZmljYXRpb24ubW9kZWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL3NyYy9jb21wb25lbnQtYmFzZS5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL3NyYy9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL3NyYy9odHRwLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vc3JjL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9zcmMvbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlLCBDb21tb25Nb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUge31cclxuIiwiaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvclJlc3BvbnNlIHtcclxuICBJc1N1Y2Nlc3MgPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxyXG4gIE1lc3NhZ2U6IHN0cmluZztcclxuICBFcnJvcnM6IEFycmF5PFNlcnZpY2VFcnJvcj4gPSBuZXcgQXJyYXk8U2VydmljZUVycm9yPigpO1xyXG4gIEV4Y2VwdGlvbjogRXJyb3I7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBTZXJ2aWNlQ29udGV4dCxcclxuICBNZXNzYWdlVHlwZSxcclxuICBTZXJ2aWNlTWVzc2FnZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLCBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgT0F1dGhFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvb2F1dGgtZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbi8vIGltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgW1NlcnZpY2VCYXNlXSB0byBwcm92aWRlIGNvbW1vbiBiZWhhdmlvciBmb3IgQW5ndWxhclxyXG4gKiBzZXJ2aWNlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQmFzZSB7XHJcbiAgYWNjZXNzVG9rZW4gPSAnJztcclxuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dCA9IG5ldyBTZXJ2aWNlQ29udGV4dCgpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIHByb3ZpZGUgcmVxdWlyZWQgZWxlbWVudHMgdG8gdGhlIGJhc2UgY2xhc3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbG9nZ2luZ1NlcnZpY2UgVGhlIFtMb2dnaW5nU2VydmljZV0gaXMgYSByZXF1aXJlZCBkZXBlbmRlbmN5IG9mIHRoaXNcclxuICAgKiBjbGFzcy4gSXQgc2hvdWxkIGJlIGluamVjdGVkIGludG8gYW55IEFuZ3VsYXIgU2VydmljZXMgdGhhdCBleHRlbmQgZnJvbVxyXG4gICAqIHRoaXMgYmFzZSBjbGFzcy4gSXQgd2lsbCBhbGxvdyB0aGUgbWVtYmVycyBvZiB0aGUgYmFzZSBjbGFzcyB0byBsb2cgaW5mb3JtYXRpb25cclxuICAgKiB1c2luZyB0aGUgY29tbW9uIExvZ2dpbmdTZXJ2aWNlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4dHJhY3QgdGhlIGNvbnRlbnRzIG9mIHRoZSBIVFRQIGJvZHkgYW5kIHJldHVybiBhIEpTT05cclxuICAgKiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0YS5cclxuICAgKiBAcGFyYW0gcmVzcG9uc2U6IGNvbnRhaW5zIHRoZSBIVFRQIHJlc3BvbnNlLlxyXG4gICAqL1xyXG4gIGV4dHJhY3REYXRhKHJlc3BvbnNlOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgYm9keSA9IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBib2R5LmRhdGEgfHwge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIGFuIHVuZXhwZWN0ZWQgZXJyb3IgaW4gdGhlIGFwcGxpY2F0aW9uLiBUaGUgZXJyb3Igc2hvdWxkIGltcGxlbWVudFxyXG4gICAqIHRoZSBzcGVjaWZpZWQgaW50ZXJmYWNlLiBUaGUgbWV0aG9kIHdpbGwgYWRkIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlXHJcbiAgICogc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICogQHBhcmFtIGVycm9yIEFuIHVuZXhwZWN0ZWQgYXBwbGljYXRpb24gZXJyb3IgdGhhdCBpbXBsZW1lbnRzIHRoZSBbRXJyb3JdIGludGVyZmFjZS5cclxuICAgKlxyXG4gICAqIGludGVyZmFjZSBFcnJvciB7XHJcbiAgICogIG5hbWU6IHN0cmluZztcclxuICAgKiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAqICBzdGFjaz86IHN0cmluZztcclxuICAgKiB9XHJcbiAgICovXHJcbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlKVxyXG4gICAgICAuV2l0aERpc3BsYXlUb1VzZXIodHJ1ZSlcclxuICAgICAgLldpdGhNZXNzYWdlVHlwZShNZXNzYWdlVHlwZS5FcnJvcilcclxuICAgICAgLldpdGhTb3VyY2UodGhpcy5zZXJ2aWNlTmFtZSk7XHJcblxyXG4gICAgY29uc3QgbG9nSXRlbSA9IGAke21lc3NhZ2UudG9TdHJpbmcoKX07ICR7ZXJyb3Iuc3RhY2t9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBsb2dJdGVtKTtcclxuXHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIGFuIGVycm9yIHRoYXQgY29udGFpbnMgYSBbbmFtZV0gYW5kIGEgW21lc3NhZ2VdLlxyXG4gICAqIEBwYXJhbSBlcnJvclxyXG4gICAqL1xyXG4gIGhhbmRsZUVycm9yKGVycm9yOiB7IG5hbWU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkIH0pOiB2b2lkIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcclxuICAgICAgLldpdGhEaXNwbGF5VG9Vc2VyKHRydWUpXHJcbiAgICAgIC5XaXRoTWVzc2FnZVR5cGUoTWVzc2FnZVR5cGUuRXJyb3IpXHJcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xyXG5cclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgbWVzc2FnZS50b1N0cmluZygpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQuYWRkTWVzc2FnZShtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBoYW5kbGUgSFRUUCBlcnJvcnMgd2hlbiBjYWxsaW5nIHdlYiBhcGkocykuXHJcbiAgICovXHJcbiAgaGFuZGxlSHR0cEVycm9yKFxyXG4gICAgZXJyb3I6IHsgdG9TdHJpbmc6ICgpID0+IHZvaWQ7IF9ib2R5OiBhbnk7IGpzb246ICgpID0+IEVycm9yUmVzcG9uc2UgfSxcclxuICAgIHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci50b1N0cmluZygpfSAke1xyXG4gICAgICByZXF1ZXN0T3B0aW9ucy51cmxcclxuICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBtZXNzYWdlKTtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBlcnJvci5qc29uKCk7XHJcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgZXJyb3IudG9TdHJpbmcoKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZhdWx0IHJldHVybiBiZWhhdmlvcjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKFxyXG4gICAgICAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLidcclxuICAgICk7XHJcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gaGFuZGxlIGFuIGVycm9yIGZyb20gdGhlIE9BdXRoIFByb3ZpZGVyIEFQSS5cclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnNcclxuICAgKi9cclxuICBoYW5kbGVPQXV0aEVycm9yKFxyXG4gICAgZXJyb3I6IE9BdXRoRXJyb3JSZXNwb25zZSxcclxuICAgIHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci50b1N0cmluZygpfSAke1xyXG4gICAgICByZXF1ZXN0T3B0aW9ucy51cmxcclxuICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBtZXNzYWdlKTtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2UoXHJcbiAgICAgICAgICBgVW5hYmxlIHRvIHZhbGlkYXRlIGNyZWRlbnRpYWxzLmBcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGJlaGF2aW9yU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxyXG4gICAgICAgICAgZXJyb3JSZXNwb25zZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGJlaGF2aW9yU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVmYXVsdCByZXR1cm4gYmVoYXZpb3I7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcclxuICAgICAgYFVuYWJsZSB0byB2YWxpZGF0ZSBjcmVkZW50aWFscy5gXHJcbiAgICApO1xyXG4gICAgY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcclxuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIG5ldyBbRXJyb3JSZXNwb25zZV0gd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgZm9yIHRoZSBzcGVjaWZpZWQgW0Vycm9yUmVzcG9uc2VdLlxyXG4gICAqL1xyXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2UobWVzc2FnZTogc3RyaW5nKTogRXJyb3JSZXNwb25zZSB7XHJcbiAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XHJcbiAgICByZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSBhIGdlbmVyaWMgbWV0aG9kIHRvIGZpbmlzaCBzZXJ2aWNlIHJlcXVlc3RzIHRoYXQgcmV0dXJuIFtPYnNlcnZhYmxlc10uXHJcbiAgICogQHBhcmFtIHNvdXJjZU5hbWVcclxuICAgKi9cclxuICBmaW5pc2hSZXF1ZXN0KHNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUmVxdWVzdCBmb3IgWyR7c291cmNlTmFtZX1dIGJ5ICR7dGhpcy5zZXJ2aWNlTmFtZX0gaXMgY29tcGxldGUuYFxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFByZXBhcmluZyB0byB3cml0ZSBhbnkgbWVzc2FnZXMuYFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZpbHRlcihcclxuICAgICAgICBmID0+IGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yICYmIGYuRGlzcGxheVRvVXNlclxyXG4gICAgICApLmZvckVhY2goZSA9PlxyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlLnRvU3RyaW5nKCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVzZXQgdGhlIHNlcnZpY2UgY29udGV4dCB3aGVuIHlvdSB3YW50IHRvIGNsZWFyIG1lc3NhZ2VzIGZyb20gdGhlIFtTZXJ2aWNlQ29udGV4dF0uIElmIHlvdSB3YW50IHRvXHJcbiAgICogYXBwZW5kIG1lc3NhZ2VzIGZyb20gc3Vic2VxdWVudCBzZXJ2aWNlIGNhbGxzLCBkbyBub3QgdXNlIHRoaXMgbWV0aG9kLlxyXG4gICAqL1xyXG4gIHJlc2V0U2VydmljZUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gcmVzZXQgdGhlIE1lc3NhZ2VzIG9mIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0uYFxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0ICYmIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMpIHtcclxuICAgICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgYFJlc2V0dGluZyB0aGUgTWVzc2FnZXMgb2YgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzID0gbmV3IEFycmF5PFNlcnZpY2VNZXNzYWdlPigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgYFRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgW01lc3NhZ2VzXS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5XYXJuaW5nLFxyXG4gICAgICAgIGBUaGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGlzIG5vdCB2YWxpZC5gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBGaW5pc2hlZCAgcHJvY2Vzc2luZyByZXF1ZXN0IHRvIFtyZXNldF0gdGhlIE1lc3NhZ2VzIG9mIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0uYFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byB3cml0ZSB0aGUgY3VycmVudCBtZXNzYWdlcyBjb250YWluZWQgaW4gdGhlIFtTZXJ2aWNlQ29udGV4dF0uIFdyaXR0ZW4gbWVzc2FnZXMgYXJlIGxpbWl0ZWRcclxuICAgKiB0byBpdGVtcyB0aGF0IGFyZSBtYXJrZWQgYXMgW0Rpc3BsYXlUb1VzZXIgPSB0cnVlXS5cclxuICAgKi9cclxuICB3cml0ZU1lc3NhZ2VzKCkge1xyXG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQgJiYgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcykge1xyXG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgaWYgKGUuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yICYmIGUuRGlzcGxheVRvVXNlcikge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgICBlLnRvU3RyaW5nKClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VNZXNzYWdlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IEFjdGlvblJlc3VsdCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9hY3Rpb25zJztcclxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcblxyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgSHR0cEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWJhc2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IFNlcnZpY2VFcnJvciB9IGZyb20gJy4vbW9kZWxzL3NlcnZpY2UtZXJyb3IubW9kZWwnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGFwcGxpY2F0aW9uJ3MgYmFzZSBBY3Rpb24gY2xhc3MgdGhhdCBwcm92aWRlcyBpbXBsZW1lbnRhdGlvbiBvZiBwaXBlbGluZSBtZXRob2RzIC0gcHJlL3Bvc3RcclxuICogZXhlY3V0aW9uIG1ldGhvZHMuXHJcbiAqXHJcbiAqIFRoZSBwcmUtZXhlY3V0ZSBtZXRob2RzIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcclxuICpcdFx0MS4gc3RhcnQoKTtcclxuICpcdFx0Mi4gYXVkaXQoKTtcclxuICpcdFx0My4gcHJlVmFsaWRhdGVBY3Rpb24oKTtcclxuICpcdFx0NC4gZXZhbHVhdGVSdWxlcygpO1xyXG4gKlx0XHQ1LiBwb3N0VmFsaWRhdGVBY3Rpb24oKTtcclxuICpcdFx0Ni4gcHJlRXhlY3V0ZUFjdGlvbigpO1xyXG4gKlxyXG4gKklmIHRoZSBzdGF0dXMgb2YgYWN0aW9uIGlzIGdvb2QsIHRoZSBidXNpbmVzcyBsb2dpYyB3aWxsIGJlIGV4ZWN1dGVkIHVzaW5nIHRoZTpcclxuICpcdFx0MS4gcHJvY2Vzc0FjdGlvbigpO1xyXG4gKlxyXG4gKiBUaGUgcG9zdC1leGVjdXRpb24gbWV0aG9kcyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XHJcbiAqXHRcdDEuIHBvc3RFeGVjdXRlQWN0aW9uKCk7XHJcbiAqXHRcdDIuIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk7XHJcbiAqXHRcdDMuIGZpbmlzaCgpO1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25CYXNlIGV4dGVuZHMgQWN0aW9uIHtcclxuICBzZXJ2aWNlQ29udGV4dDogU2VydmljZUNvbnRleHQ7XHJcbiAgcmVzcG9uc2U6IE9ic2VydmFibGU8YW55PjtcclxuICBodHRwQmFzZTogSHR0cEJhc2VTZXJ2aWNlO1xyXG4gIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlO1xyXG4gIGFjdGlvbk5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyBhIHJlcXVpcmVkIGltcGxlbWVudGF0aW9uIGlmIHlvdSB3YW50IHRvIHJlbmRlci9leGVjdXRlIHRoZSBydWxlcyB0aGF0XHJcbiAgICogYXJlIGFzc29jaWF0ZWQgdG8gdGhlIHNwZWNpZmllZCBhY3Rpb24uXHJcbiAgICovXHJcbiAgdmFsaWRhdGVBY3Rpb24oKTogVmFsaWRhdGlvbkNvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkNvbnRleHQucmVuZGVyUnVsZXMoKTtcclxuICB9XHJcblxyXG4gIHBvc3RWYWxpZGF0ZUFjdGlvbigpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGRldGVybWluZSBpZiB0aGUgYWN0aW9uIGNvbnRhaW5zIHZhbGlkYXRpb24gZXJyb3JzIGluICR7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25OYW1lXHJcbiAgICAgIH1gXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRpb25Db250ZXh0Lmhhc1J1bGVWaW9sYXRpb25zKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgIGBUaGUgdGFyZ2V0IGNvbnRhaW5zIHZhbGlkYXRpb24gZXJyb3JzIGluICR7dGhpcy5hY3Rpb25OYW1lfWBcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIExvYWQgdGhlIGVycm9yL3J1bGUgdmlvbGF0aW9ucyBpbnRvIHRoZSBTZXJ2aWNlQ29udGV4dCBzbyB0aGF0IHRoZSBpbmZvcm1hdGlvbiBidWJibGVzIHVwIHRvIHRoZSBjYWxsZXIgb2YgdGhlIHNlcnZpY2U7XHJcbiAgICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHQucmVzdWx0cy5mb3JFYWNoKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgdGhpcy5wdWJsaXNoUnVsZVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVJ1bGVEZXRhaWxzKHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBvc3RFeGVjdXRlQWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aW9uUmVzdWx0ID09PSBBY3Rpb25SZXN1bHQuRmFpbCkge1xyXG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgaWYgKGUuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yKSB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICAgICAgZS50b1N0cmluZygpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbGwgY29uY3JldGUgYWN0aW9ucyBtdXN0IG92ZXJyaWRlIGFuZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QuIEl0IGlzIGRlZmluZWQgaW4gdGhlIFtBY3Rpb25dIGZyYW1ld29yayBjbGFzcy5cclxuICAgKi9cclxuICB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpOiBBY3Rpb25SZXN1bHQge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSdW5uaW5nIFt2YWxpZGF0ZUFjdGlvblJlc3VsdF0gZm9yICR7dGhpcy5hY3Rpb25OYW1lfS5gXHJcbiAgICApO1xyXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBzdGF0dXMgb2YgdGhlIGFjdGlvbiBiYXNlZCBvbiBhbnkgcnVsZSB2aW9sYXRpb25zO1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbkNvbnRleHQuaGFzUnVsZVZpb2xhdGlvbnMoKSkge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgYFRoZSAke3RoaXMuYWN0aW9uTmFtZX0gY29udGFpbnMgcnVsZSB2aW9sYXRpb25zLmBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5hY3Rpb25SZXN1bHQgPSBBY3Rpb25SZXN1bHQuRmFpbDtcclxuXHJcbiAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xyXG4gICAgICBlcnJvclJlc3BvbnNlLklzU3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UgPSBgVmFsaWRhdGlvbiBlcnJvcnMgZXhpc3QuYDtcclxuICAgICAgdGhpcy5yZXNwb25zZSA9IE9ic2VydmFibGUudGhyb3coZXJyb3JSZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGlvblJlc3VsdCA9IHRoaXMuc2VydmljZUNvbnRleHQuaXNHb29kKClcclxuICAgICAgPyBBY3Rpb25SZXN1bHQuU3VjY2Vzc1xyXG4gICAgICA6IEFjdGlvblJlc3VsdC5GYWlsO1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uUmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHByb2Nlc3MgcnVsZSByZXN1bHRzIGZvciBjb21wb3NpdGUgcnVsZXMuIE5vdGUsIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyByZWN1cnNpdmVcclxuICAgKiBhbmQgd2lsbCBwcm9jZXNzIGFsbCBjb21wb3NpdGUgcnVsZXMgaW4gdGhlIHJ1bGUgc2V0IGNvbnRhaW5lZCBpbiB0aGUgVmFsaWRhdGlvbkNvbnRleHQuXHJcbiAgICogQHBhcmFtIHJ1bGVSZXN1bHQgVGhlIHJlc3VsdCBvZiBhIHJlbmRlcmVkIHJ1bGUuXHJcbiAgICovXHJcbiAgcmV0cmlldmVSdWxlRGV0YWlscyhydWxlUmVzdWx0OiBSdWxlUmVzdWx0KSB7XHJcbiAgICBpZiAocnVsZVJlc3VsdC5ydWxlUG9saWN5IGluc3RhbmNlb2YgQ29tcG9zaXRlUnVsZSkge1xyXG4gICAgICBjb25zdCBjb21wb3NpdGUgPSBydWxlUmVzdWx0LnJ1bGVQb2xpY3kgYXMgQ29tcG9zaXRlUnVsZTtcclxuICAgICAgaWYgKGNvbXBvc2l0ZSAmJiBjb21wb3NpdGUuaGFzRXJyb3JzKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gY29tcG9zaXRlLnJlc3VsdHMuZmlsdGVyKFxyXG4gICAgICAgICAgcmVzdWx0ID0+ICFyZXN1bHQuaXNWYWxpZCAmJiByZXN1bHQucnVsZVBvbGljeS5pc0Rpc3BsYXlhYmxlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZXJyb3JzLmZvckVhY2goZXJyb3JSZXN1bHQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wdWJsaXNoUnVsZVJlc3VsdChlcnJvclJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgaWYgKGVycm9yUmVzdWx0LnJ1bGVQb2xpY3kgaW5zdGFuY2VvZiBDb21wb3NpdGVSdWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0cmlldmVSdWxlRGV0YWlscyhlcnJvclJlc3VsdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgaGVscGVyIGZ1bmN0aW9uIHRvIHB1Ymxpc2ggYSBuZXcgW1NlcnZpY2VNZXNzYWdlXSB0byB0aGUgW1NlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzXSBsaXN0LlxyXG4gICAqIEBwYXJhbSBydWxlUmVzdWx0XHJcbiAgICovXHJcbiAgcHVibGlzaFJ1bGVSZXN1bHQocnVsZVJlc3VsdDogUnVsZVJlc3VsdCkge1xyXG4gICAgY29uc3Qgc2VydmljZU1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoXHJcbiAgICAgIHJ1bGVSZXN1bHQucnVsZVBvbGljeS5uYW1lLFxyXG4gICAgICBydWxlUmVzdWx0LnJ1bGVQb2xpY3kubWVzc2FnZSxcclxuICAgICAgTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICk7XHJcbiAgICBzZXJ2aWNlTWVzc2FnZS5EaXNwbGF5VG9Vc2VyID0gcnVsZVJlc3VsdC5ydWxlUG9saWN5LmlzRGlzcGxheWFibGU7XHJcbiAgICBzZXJ2aWNlTWVzc2FnZS5Tb3VyY2UgPSB0aGlzLmFjdGlvbk5hbWU7XHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLnB1c2goc2VydmljZU1lc3NhZ2UpO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgIGAke3NlcnZpY2VNZXNzYWdlLnRvU3RyaW5nKCl9YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuXHJcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VNZXNzYWdlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgYnVzaW5lc3MgcHJvdmlkZXIgYmFzZSBjbGFzcyB0byBhY2Nlc3MgY29tbW9uIGVsZW1lbnRzIG9mIHRoZSBidXNpbmVzcyBwcm92aWRlci5cclxuICpcclxuICogc2VydmljZUNvbnRleHQ6IFRoaXMgaXMgaW5pdGlhbGl6ZWQgZm9yIGVhY2ggaW5zdGFuY2Ugb2YgYSBidXNpbmVzcyBwcm92aWRlciAtIGl0cyBwdXJwb3NlIGlzIHRvIGNvbGxlY3QgaW5mb3JtYXRpb24gZHVyaW5nIHRoZSBwcm9jZXNzaW5nIG9mIGJ1c2luZXNzIGxvZ2ljLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJ1c2luZXNzUHJvdmlkZXJCYXNlIHtcclxuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dDtcclxuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFJ1bm5pbmcgY29uc3RydWN0b3IgZm9yIHRoZSBbQnVzaW5lc3NQcm92aWRlckJhc2VdLmBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIGFuIHVuZXhwZWN0ZWQgZXJyb3IgaW4gdGhlIGFwcGxpY2F0aW9uLiBUaGUgZXJyb3Igc2hvdWxkIGltcGxlbWVudFxyXG4gICAqIHRoZSBzcGVjaWZpZWQgaW50ZXJmYWNlLiBUaGUgbWV0aG9kIHdpbGwgYWRkIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlXHJcbiAgICogc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICogQHBhcmFtIGVycm9yIEFuIHVuZXhwZWN0ZWQgYXBwbGljYXRpb24gZXJyb3IgdGhhdCBpbXBsZW1lbnRzIHRoZSBbRXJyb3JdIGludGVyZmFjZS5cclxuICAgKlxyXG4gICAqIGludGVyZmFjZSBFcnJvciB7XHJcbiAgICogIG5hbWU6IHN0cmluZztcclxuICAgKiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAqICBzdGFjaz86IHN0cmluZztcclxuICAgKiB9XHJcbiAgICovXHJcbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlKVxyXG4gICAgICAuV2l0aERpc3BsYXlUb1VzZXIodHJ1ZSlcclxuICAgICAgLldpdGhNZXNzYWdlVHlwZShNZXNzYWdlVHlwZS5FcnJvcilcclxuICAgICAgLldpdGhTb3VyY2UodGhpcy5zZXJ2aWNlTmFtZSk7XHJcblxyXG4gICAgY29uc3QgbG9nSXRlbSA9IGAke21lc3NhZ2UudG9TdHJpbmcoKX07ICR7ZXJyb3Iuc3RhY2t9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBsb2dJdGVtKTtcclxuXHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBmaW5pc2hSZXF1ZXN0KHNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUmVxdWVzdCBmb3IgWyR7c291cmNlTmFtZX1dIGJ5ICR7dGhpcy5zZXJ2aWNlTmFtZX0gaXMgY29tcGxldGUuYFxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFByZXBhcmluZyB0byB3cml0ZSBvdXQgdGhlIGVycm9ycy5gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5EaXNwbGF5VG9Vc2VyICYmIGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXHJcbiAgICAgICkuZm9yRWFjaChlID0+XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGUudG9TdHJpbmcoKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFVzZSB0byBwcm92aWRlIHRoZSBhbGVydCB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgQWxlcnROb3RpZmljYXRpb24gYW5kIEFsZXJ0Q29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFsZXJ0VHlwZXMge1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSW5mb3JtYXRpb246IHN0cmluZyA9ICdhbGVydC1pbmZvJztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFdhcm5pbmc6IHN0cmluZyA9ICdhbGVydC13YXJuaW5nJztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERhbmdlcjogc3RyaW5nID0gJ2FsZXJ0LWRhbmdlcic7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBTdWNjZXNzOiBzdHJpbmcgPSAnYWxlcnQtc3VjY2Vzcyc7XHJcbn1cclxuIiwiaW1wb3J0IHsgQWxlcnRUeXBlcyB9IGZyb20gJy4vYWxlcnQtdHlwZXMuY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBbGVydE5vdGlmaWNhdGlvbiB7XHJcbiAgdHlwZTogc3RyaW5nID0gQWxlcnRUeXBlcy5JbmZvcm1hdGlvbjsgLy8gYWxlcnQtd2FybmluZywgYWxlcnQtc3VjY2VzcywgYWxlcnQtaW5mbywgYWxlcnQtZGFuZ2VyXHJcbiAgaGVhZGVyOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBtZXNzYWdlczogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgc2hvd0FsZXJ0ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaGVhZGVyOiBzdHJpbmcsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZXM/OiBBcnJheTxzdHJpbmc+LFxyXG4gICAgdHlwZT86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIGlmIChtZXNzYWdlcykge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5zaG93QWxlcnQgPSB0cnVlOyAvLyB1c2VkIHRvIHRyaWdnZXIgdGhlIGRpc3BsYXkgb2YgdGhlIG5vdGlmaWNhdGlvbi5cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWVzc2FnZVR5cGUsXHJcbiAgU2VydmljZUNvbnRleHQsXHJcbiAgU2VydmljZU1lc3NhZ2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSwgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEFsZXJ0Tm90aWZpY2F0aW9uIH0gZnJvbSAnLi9tb2RlbHMvYWxlcnQtbm90aWZpY2F0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgQWxlcnRUeXBlcyB9IGZyb20gJy4vbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmFzZSB7XHJcbiAgY29tcG9uZW50TmFtZTogc3RyaW5nO1xyXG4gIGFsZXJ0Tm90aWZpY2F0aW9uOiBBbGVydE5vdGlmaWNhdGlvbjtcclxuICBuYXZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XHJcbiAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKCcnLCAnJyk7XHJcblxyXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XHJcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICB0aGlzLmdvb2dsZUFuYWx5dGljc1BhZ2V2aWV3KGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zdCByb3V0ZXJFdmVudCA9IHRoaXMucm91dGVyLmV2ZW50cy5maWx0ZXIoXHJcbiAgICAvLyAgIGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZFxyXG4gICAgLy8gKTtcclxuICAgIC8vIGlmIChyb3V0ZXJFdmVudCAmJiByb3V0ZXJFdmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgIC8vICAgdGhpcy5nb29nbGVBbmFseXRpY3NQYWdldmlldyhyb3V0ZXJFdmVudCk7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gc2VuZCBhbiBhbmFseXRpYyBldmVudCB0byBbR29vZ2xlIEFuYWx5dGljc10uXHJcbiAgICogQHBhcmFtIGNhdGVnb3J5IEEgY2F0ZWdvcnkgaXMgYSBuYW1lIHRoYXQgeW91IHN1cHBseSBhcyBhIHdheSB0byBncm91cCBvYmplY3RzIHRoYXQgeW91IHdhbnQgdG8gdHJhY2suIFR5cGljYWxseSwgeW91IHdpbGwgdXNlIHRoZSBzYW1lIGNhdGVnb3J5IG5hbWUgbXVsdGlwbGUgdGltZXMgb3ZlciByZWxhdGVkIFVJIGVsZW1lbnRzIHRoYXQgeW91IHdhbnQgdG8gZ3JvdXAgdW5kZXIgYSBnaXZlbiBjYXRlZ29yeS5cclxuICAgKiBAcGFyYW0gYWN0aW9uIFVzZSB0aGUgYWN0aW9uIHBhcmFtZXRlciB0byBuYW1lIHRoZSB0eXBlIG9mIGV2ZW50IG9yIGludGVyYWN0aW9uIHlvdSB3YW50IHRvIHRyYWNrIGZvciBhIHBhcnRpY3VsYXIgd2ViIG9iamVjdCAoaS5lLiwgcGxheSwgc3RvcCwgcGF1c2UsIGRvd25sb2FkKS4gQSB1bmlxdWUgZXZlbnQgaXMgZGV0ZXJtaW5lZCBieSBhIHVuaXF1ZSBhY3Rpb24gbmFtZS4gWW91IGNhbiB1c2UgZHVwbGljYXRlIGFjdGlvbiBuYW1lcyBhY3Jvc3MgY2F0ZWdvcmllcywgYnV0IHRoaXMgY2FuIGFmZmVjdCBob3cgdW5pcXVlIGV2ZW50cyBhcmUgY2FsY3VsYXRlZC4gU2VlIHRoZSBzdWdnZXN0aW9ucyBiZWxvdyBhbmQgdGhlIEltcGxpY2l0IENvdW50IHNlY3Rpb24gZm9yIG1vcmUgZGV0YWlscy5cclxuICAgKiBAcGFyYW0gbGFiZWwgUHJvdmlkZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZvciBldmVudHMgdGhhdCB5b3Ugd2FudCB0byB0cmFjaywgc3VjaCBhcyB0aGUgbW92aWUgdGl0bGUgaW4gdGhlIHZpZGVvIGV4YW1wbGVzIGFib3ZlLCBvciB0aGUgbmFtZSBvZiBhIGZpbGUgd2hlbiB0cmFja2luZyBkb3dubG9hZHMuIEFsbCBsYWJlbHMgYXJlIGxpc3RlZCBpbmRlcGVuZGVudGx5IGZyb20gdGhlaXIgcGFyZW50IGNhdGVnb3JpZXMgYW5kIGFjdGlvbnMuIFRoaXMgcHJvdmlkZXMgeW91IHdpdGggYW5vdGhlciB1c2VmdWwgd2F5IHRvIHNlZ21lbnQgdGhlIGV2ZW50IGRhdGEgZm9yIHlvdXIgcmVwb3J0cy4gQWxsIGxhYmVscyBhcmUgbGlzdGVkIGluZGVwZW5kZW50bHkgZnJvbSB0aGVpciBwYXJlbnQgY2F0ZWdvcmllcyBhbmQgYWN0aW9ucy4gVGhpcyBwcm92aWRlcyB5b3Ugd2l0aCBhbm90aGVyIHVzZWZ1bCB3YXkgdG8gc2VnbWVudCB0aGUgZXZlbnQgZGF0YSBmb3IgeW91ciByZXBvcnRzLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSBBbnkgbnVtZXJpYyB2YWx1ZSBpbmRpY2F0aW5nIGEgW3ZhbHVlXSB0aGF0IHdpbGwgYmUgc3VtbWFyaXplZCBmb3IgdGhlIGFuYWx5dGljIGl0ZW0ocykuXHJcbiAgICpcclxuICAgKiBNb3JlIGluZm9ybWF0aW9uIGF0OiBodHRwczovL3N1cHBvcnQuZ29vZ2xlLmNvbS9hbmFseXRpY3MvYW5zd2VyLzEwMzMwNjhcclxuICAgKiBvciBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZXZlbnRzXHJcbiAgICovXHJcbiAgcHVibGljIGdvb2dsZUFuYWx5dGljc1NlbmRFdmVudChcclxuICAgIGNhdGVnb3J5OiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IHN0cmluZyxcclxuICAgIGxhYmVsOiBzdHJpbmcsXHJcbiAgICB2YWx1ZTogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICAoPGFueT53aW5kb3cpLmd0YWcoJ2V2ZW50JywgYWN0aW9uLCB7XHJcbiAgICAgIGV2ZW50X2NhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgZXZlbnRfbGFiZWw6IGxhYmVsLFxyXG4gICAgICB2YWx1ZTogdmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnb29nbGVBbmFseXRpY3NQYWdldmlldyhldmVudDogTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgUHJlcGFyaW5nIHRvIHNldCBbR29vZ2xlIEFuYWx5dGljc10gcGFnZSB2aWV3IGZvciBbJHtcclxuICAgICAgICAgIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzXHJcbiAgICAgICAgfV0uYFxyXG4gICAgICApO1xyXG4gICAgICAvLyAoPGFueT53aW5kb3cpLmdhKCdzZXQnLCAncGFnZScsIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzKTtcclxuICAgICAgLy8gKDxhbnk+d2luZG93KS5nYSgnc2VuZCcsICdwYWdldmlldycpO1xyXG4gICAgICAvLyBnYSgnY3JlYXRlJywgJ1VBLTExMDE5NDM0NC0xJywgJ2F1dG8nLCB0aGlzLmNvbXBvbmVudE5hbWUpO1xyXG4gICAgICAvLyBnYShgJHt0aGlzLmNvbXBvbmVudE5hbWV9LnNlbmRgLCAncGFnZXZpZXcnKTtcclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vYmxvZy50aGVjb2RlY2FtcHVzLmRlL2FuZ3VsYXItMi1nb29nbGUtYW5hbHl0aWNzLWdvb2dsZS10YWctbWFuYWdlci9cclxuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9wYWdlc1xyXG4gICAgICBjb25zdCBHQV9UUkFDS0lOR19JRCA9ICdVQS0xMTAxOTQzNDQtMSc7XHJcbiAgICAgIC8vIGd0YWcoJ2NvbmZpZycsICdHQV9UUkFDS0lOR19JRCcsIHs8cGFnZXZpZXdfcGFyYW1ldGVycz59KTtcclxuICAgICAgKDxhbnk+d2luZG93KS5nYSgnY29uZmlnJywgR0FfVFJBQ0tJTkdfSUQsIHtcclxuICAgICAgICBwYWdlX3RpdGxlOiB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgcGFnZV9wYXRoOiBldmVudC51cmxBZnRlclJlZGlyZWN0c1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICBTZXZlcml0eS5XYXJuaW5nLFxyXG4gICAgICAgIGBGYWlsZWQgdG8gc2V0IFtHb29nbGUgQW5hbHl0aWNzXSBwYWdlIHZpZXcuYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIHNpbXBsZSBbRXJyb3JSZXNwb25zZV0gd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB0byB0aGUgdXNlci5cclxuICAgKi9cclxuICBjcmVhdGVFcnJvclJlc3BvbnNlKG1lc3NhZ2U6IHN0cmluZyk6IEVycm9yUmVzcG9uc2Uge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGVycm9yIHJlc3BvbnNlIGZvciBjb21wb25lbnQuYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xyXG4gICAgZXJyb3JSZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiBlcnJvclJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBzZXJ2aWNlIGVycm9ycy4gVGhlc2UgYXJlIGVycm9yIHJlc3BvbnNlIFtTZWU6IEVycm9yUmVzcG9uc2VdIGZyb21cclxuICAgKiB0aGUgYXBwbGljYXRpb24gYnVzaW5lc3MgbGF5ZXJzIChBY3Rpb24ocykgb3IgSHR0cCkgdGhhdCB3aWxsIGJ1YmJsZSB1cCB0byB0aGVcclxuICAgKiBjYWxsZXIgKGkuZS4sIGEgY29tcG9uZW50KSBpbiBhIHNwZWNpZmllZCBmb3JtYXQ6XHJcbiAgICpcclxuICAgKiBJc1N1Y2Nlc3M6IGJvb2xlYW4gPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxyXG4gICAqIE1lc3NhZ2U6IHN0cmluZztcclxuICAgKiBFcnJvcnM6IEFycmF5PFNlcnZpY2VFcnJvcj4gPSBuZXcgQXJyYXk8U2VydmljZUVycm9yPigpO1xyXG4gICAqIEV4Y2VwdGlvbjogYW55O1xyXG4gICAqL1xyXG4gIGhhbmRsZVNlcnZpY2VFcnJvcnMoXHJcbiAgICBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlLFxyXG4gICAgc2VydmljZUNvbnRleHQ/OiBTZXJ2aWNlQ29udGV4dFxyXG4gICkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gaGFuZGxlIHNlcnZpY2UgZXJyb3JzIGZvciBjb21wb25lbnQuYFxyXG4gICAgKTtcclxuICAgIGlmIChzZXJ2aWNlQ29udGV4dCAmJiBzZXJ2aWNlQ29udGV4dC5oYXNFcnJvcnMoKSkge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFJldHJpZXZpbmcgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgU2VydmljZUNvbnRleHQvVmFsaWRhdGlvbkNvbnRleHQ7YFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IHRoaXMucmV0cmlldmVTZXJ2aWNlQ29udGV4dEVycm9yTWVzc2FnZXMoc2VydmljZUNvbnRleHQpO1xyXG4gICAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKFxyXG4gICAgICAgICdFcnJvcnMnLFxyXG4gICAgICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSxcclxuICAgICAgICBtZXNzYWdlcyxcclxuICAgICAgICBBbGVydFR5cGVzLldhcm5pbmdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChlcnJvclJlc3BvbnNlICYmIGVycm9yUmVzcG9uc2UuTWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBgUmV0cmlldmluZyBlcnJvciBtZXNzYWdlcyBmcm9tIHRoZSBbRXJyb3JSZXNwb25zZV0uYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5yZXRyaWV2ZVJlc3BvbnNlRXJyb3JNZXNzYWdlcyhlcnJvclJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKFxyXG4gICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSxcclxuICAgICAgICAgIGVycm9ycyxcclxuICAgICAgICAgIEFsZXJ0VHlwZXMuV2FybmluZ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICAgIGBFcnJvcjogJHtlcnJvclJlc3BvbnNlLk1lc3NhZ2V9YFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICpcclxuICAgKiBAcGFybTogc2VydmljZUNvbnRleHQ6IEEgY29udGV4dCBvYmplY3QgY29udGFpbmluZyBtZXNzYWdlcyBmb3IgdGhlIHNwZWNpZmllZCByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHJldHJpZXZlU2VydmljZUNvbnRleHRFcnJvck1lc3NhZ2VzKFxyXG4gICAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0XHJcbiAgKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IEFycmF5PHN0cmluZz4oKTtcclxuICAgIHNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgIGlmIChlLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvciAmJiBlLkRpc3BsYXlUb1VzZXIpIHtcclxuICAgICAgICBtZXNzYWdlcy5wdXNoKGUuTWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJldHJpZXZlIHRoZSBlcnJvciBtZXNzYWdlcyBmcm9tIHRoZSBzcGVjaWZpZWQgV2ViIEFQSSByZXNwb25zZS5cclxuICAgKi9cclxuICByZXRyaWV2ZVJlc3BvbnNlRXJyb3JNZXNzYWdlcyhlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBlcnJvcnMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgaWYgKGVycm9yUmVzcG9uc2UgJiYgZXJyb3JSZXNwb25zZS5FcnJvcnMpIHtcclxuICAgICAgZXJyb3JSZXNwb25zZS5FcnJvcnMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBpZiAoZS5EaXNwbGF5VG9Vc2VyKSB7XHJcbiAgICAgICAgICBlcnJvcnMucHVzaChlLk1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlc2V0IHRoZSBbQWxlcnROb3RpZmljYXRpb25dIHRvIHRoZSBpbml0aWFsIHN0YXRlLiBSZW1vdmVzXHJcbiAgICogZXhpc3RpbmcgbWVzc2FnZXMgYW5kIGhpZGVzIHRoZSBBbGVydENvbXBvbmVudC5cclxuICAgKi9cclxuICByZXNldEFsZXJ0Tm90aWZpY2F0aW9ucygpIHtcclxuICAgIHRoaXMuYWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oJycsICcnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBuYXZpZ2F0ZSB0byB0aGUgc3BlY2lmaWVkIHJvdXRlLlxyXG4gICAqIEBwYXJtIHJvdXRlTmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IHJvdXRlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyByb3V0ZVRvKHJvdXRlTmFtZTogc3RyaW5nKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVOYW1lXSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgYEVycm9yIHdoaWxlIGF0dGVtcHRpbmcgdG8gbmF2aWdhdGUgdG8gWyR7cm91dGVOYW1lfV0gcm91dGUgZnJvbSAke1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lXHJcbiAgICAgICAgfS4gRXJyb3I6ICR7ZXJyb3IudG9TdHJpbmcoKX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmV0cmlldmUgYW5kIHNob3cgYW55IHJlc3BvbnNlIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAqL1xyXG4gIHNob3dSZXNwb25zZUVycm9ycyhyZXNwb25zZTogRXJyb3JSZXNwb25zZSkge1xyXG4gICAgdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKHJlc3BvbnNlLCB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgZmluaXNoUmVxdWVzdChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgJHt0aGlzLmNvbXBvbmVudE5hbWV9OiAke21lc3NhZ2V9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzaG93QWxlcnRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgYWxlcnQobWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJy4vaHR0cC1yZXF1ZXN0LW1ldGhvZHMuZW51bSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSHR0cFJlcXVlc3RPcHRpb25zIHtcclxuXHJcbiAgICByZXF1ZXN0TWV0aG9kOiBIdHRwUmVxdWVzdE1ldGhvZCBcclxuICAgIGJvZHk/OiBhbnk7XHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMgfCB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdOyB9OyBcclxuICAgIG9ic2VydmU/OiAnYm9keSc7IFxyXG4gICAgcGFyYW1zPzogSHR0cFBhcmFtcyB8IHsgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXTsgfTsgXHJcbiAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW47IFxyXG4gICAgLy8gcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInOyBcclxuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XHJcbiAgICByZXF1ZXN0VXJsOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEV2ZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcywgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9odHRwLXJlcXVlc3Qtb3B0aW9ucyc7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW1ldGhvZHMuZW51bSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuaW1wb3J0IHsgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IFJlcXVlc3RNZXRob2QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gY3JlYXRlIGFuZCBleGVjdXRlIEhUVFAgc2VydmljZSByZXF1ZXN0cy5cclxuICogMS4gQ3JlYXRlIEhlYWRlcnNcclxuICogMi4gQ3JlYXRlIFJlcXVlc3RPcHRpb25zXHJcbiAqIDMuIEV4ZWN1dGUgUmVxdWVzdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEJhc2VTZXJ2aWNlIHtcclxuICBwdWJsaWMgc2VydmljZU5hbWUgPSAnSHR0cEJhc2VTZXJ2aWNlJztcclxuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHVibGljIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciBbbXVsdGlwYXJ0L2Zvcm0tZGF0YV0uXHJcbiAgICovXHJcbiAgY3JlYXRlTXVsdGlwYXJ0Rm9ybURhdGFIZWFkZXIocmVxdWlyZXNBdXRoVG9rZW46IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgaGVhZGVyIGZvciB0aGUgW211bHRpcGFydC9mb3JtLWRhdGFdIEhUVFAgcmVxdWVzdC4gUmVxdWlyZXNBdXRoVG9rZW46ICR7cmVxdWlyZXNBdXRoVG9rZW59LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgIGlmIChyZXF1aXJlc0F1dGhUb2tlbikge1xyXG4gICAgICAvLyBjcmVhdGUgaGVhZGVyIHJlcXVlc3Qgd2l0aCBzZWN1cml0eSB0b2tlbjtcclxuICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy5hY2Nlc3NUb2tlbn1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciBDb250ZW50LVR5cGUgW2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZF0uXHJcbiAgICovXHJcbiAgY3JlYXRlRm9ybVVybGVuY29kZWRIZWFkZXIoKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGhlYWRlciBmb3IgdGhlIFthcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRdIEhUVFAgcmVxdWVzdC5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciB0aGUgSFRUUCByZXF1ZXN0LiBJZiB0aGUgW3JlcXVpcmVzQXV0aFRva2VuXSBpbmRpY2F0b3JcclxuICAgKiBpcyB0cnVlLCB0aGUgcmVxdWVzdCB3aWxsIHVzZSB0aGUgY3VycmVudCBBdXRob3JpemF0aW9uIHNlY3VyaXR5IHRva2VuLlxyXG4gICAqIEBwYXJhbSBpc1NlY3VyZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUhlYWRlcihyZXF1aXJlc0F1dGhUb2tlbjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBoZWFkZXIgZm9yIHRoZSBIVFRQIHJlcXVlc3QuIFJlcXVpcmVzQXV0aFRva2VuOiAke3JlcXVpcmVzQXV0aFRva2VufS5gXHJcbiAgICApO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICBpZiAocmVxdWlyZXNBdXRoVG9rZW4pIHtcclxuICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy5hY2Nlc3NUb2tlbn1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBIdHRwUmVxdWVzdE9wdGlvbnMgaXRlbSBmb3IgYSByZXF1ZXN0LlxyXG4gICAqIEBwYXJhbSBoZWFkZXJzIFVzZSB0byBzdXBwbHkgaGVhZGVyIGluZm9ybWF0aW9uIGluIHRoZSByZXF1ZXN0LlxyXG4gICAqIEBwYXJhbSB1cmwgVXNlIHRvIGluZGljYXRlIHRoZSBVUkwgb2YgdGhlIHdlYiBhcGkuXHJcbiAgICogQHBhcmFtIGJvZHkgVXNlIHRvIHByb3ZpZGUgYSBkYXRhIHBheWxvYWQgZm9yIHRoZSByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIGNyZWF0ZVJlcXVlc3RPcHRpb25zKFxyXG4gICAgbWV0aG9kOiBIdHRwUmVxdWVzdE1ldGhvZCxcclxuICAgIGhlYWRlcnM6IEh0dHBIZWFkZXJzLFxyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBib2R5OiBhbnlcclxuICApIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgcmVxdWVzdCBvcHRpb25zIGZvciB0aGUgSFRUUCByZXF1ZXN0LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IEh0dHBSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgb3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcclxuICAgIG9wdGlvbnMucmVxdWVzdFVybCA9IHVybDtcclxuICAgIG9wdGlvbnMuYm9keSA9IGJvZHk7XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCBoZWFkZXIgYW5kIFVSTC5cclxuICAgKi9cclxuICBleGVjdXRlUmVxdWVzdChyZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBleGVjdXRlIEhUVFAgcmVxdWVzdC4gVXJsOiAke3JlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmx9YCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnMucmVxdWVzdE1ldGhvZC50b1N0cmluZygpLCByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAvLyAgIC5yZXF1ZXN0KG5ldyBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zKSlcclxuICAgIC8vICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpIC8vIG1hcHMgdGhlIG9ic2VydmFibGUgcmVzcG9uc2UgdG8gYSBKU09OIG9iamVjdDtcclxuICAgIC8vICAgLmNhdGNoKGVycm9yID0+IHRoaXMuaGFuZGxlSHR0cEVycm9yKGVycm9yLCByZXF1ZXN0T3B0aW9ucykpOyAvLyB1c2UgdG8gaGFuZGxlIGFueSBleGNlcHRpb24gZHVyaW5nIHNlcnZpY2UgY2FsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBleGVjdXRlIGFuIEhUVFAgW2dldF0gcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIHVybCBhbmQgb3B0aW9ucy5cclxuICAgKi9cclxuICBnZXQ8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QgPSBIdHRwUmVxdWVzdE1ldGhvZC5HRVQ7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuaHR0cC5nZXQ8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgIC5waXBlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgYW4gSFRUUCBbcG9zdF0gcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIHVybCBhbmQgb3B0aW9ucy5cclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnMgdXNlIHRvIGRlZmluZSB0aGUgb3B0aW9ucyBmb3IgdGhlIHNwZWNpZmllZCByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHBvc3Q8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QgPSBIdHRwUmVxdWVzdE1ldGhvZC5QT1NUO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmh0dHAucG9zdDxTZXJ2aWNlUmVzcG9uc2U+KHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgLnBpcGUoKTtcclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIEhUVFAgZXJyb3JzIHdoZW4gY2FsbGluZyB3ZWIgYXBpKHMpLlxyXG4gICAqL1xyXG4gIGhhbmRsZUh0dHBFcnJvcihcclxuICAgIGVycm9yOiBhbnksXHJcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGAke2Vycm9yLnRvU3RyaW5nKCl9ICR7XHJcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcclxuICAgICAgfSwgJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0T3B0aW9ucy5ib2R5KX1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgaWYgKGVycm9yICYmIGVycm9yLl9ib2R5KSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaGlzIGlzIGFuIGVycm9yIHRoYXQgY29udGFpbnMgYSBib2R5IC0gYSBbUmVzcG9uc2VdIGZyb20gdGhlIGFwcGxpY2F0aW9uIHdlYiBhcGkuIEluY2x1ZGVzOlxyXG4gICAgICAgKiAxLiBJc1N1Y2Nlc3NcclxuICAgICAgICogMi4gTWVzc2FnZVxyXG4gICAgICAgKiAzLiBBcnJheSBvZiBTZXJ2aWNlRXJyb3IgaXRlbXNcclxuICAgICAgICogNC4gRXhjZXB0aW9uIChvcHRpb25hbClcclxuICAgICAgICovXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBlcnJvci5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFRPRE86IFJFVFJJRVZFIEVSUk9SIERFVEFJTFM7IFNUQVRVUywgTUVTU0FHRTsgRVRDLiBBTkQgUFJPVklERSBUTyBIQU5ETEVSO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgY29uc3QgZXJyID0gPEVycm9yPmV4O1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGAke2Vyci5uYW1lfTsgJHtlcnIubWVzc2FnZX1gO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yPzogRXJyb3IpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKGVycm9yKTtcclxuICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XHJcbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2UoZXJyb3I/OiBFcnJvcik6IEVycm9yUmVzcG9uc2Uge1xyXG4gICAgbGV0IG1lc3NhZ2UgPSAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLic7XHJcbiAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICBtZXNzYWdlID0gYCR7ZXJyb3IubmFtZX0gLSAke2Vycm9yLm1lc3NhZ2V9YDtcclxuICAgICAgcmVzcG9uc2UuRXhjZXB0aW9uID0gZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFVzZSB0aGlzIG1vZGVsIHRvIHJlcHJlc2VudCBzZXJ2aWNlIGVycm9yL21lc3NhZ2UgaW5mb3JtYXRpb24gZnJvbSB0aGVcclxuICogYXBwbGljYXRpb24ncyBzZXJ2aWNlIEFQSXMuXHJcbiAqXHJcbiAqIFRoZSBEaXNwbGF5VG9Vc2VyIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIG1lc3NhZ2Ugc2hvdWxkIGJlXHJcbiAqIGRpc3BsYXllZCB0byB0aGUgdXNlciBpZiBkZXNpcmVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VFcnJvciB7XHJcbiAgLy8gXCJ7XCJJc1N1Y2Nlc3NcIjpmYWxzZSxcclxuICAvLyBcIk1lc3NhZ2VcIjpcIkZhaWxlZCB0byBjcmVhdGUgbmV3IHVzZXIgYWNjb3VudC5cIixcclxuICAvLyBcIkVycm9yc1wiOlt7XCJOYW1lXCI6XCJQYXNzd29yZEZvcm1hdElzVmFsaWRcIixcclxuICAvLyBcIk1lc3NhZ2VcIjpcIlRoZSBwYXNzd29yZCBmb3JtYXQgaXMgbm90IHZhbGlkLiBNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lOiBhbHBoYSwgbnVtZXJpYywgYW5kIHNwZWNpYWwgY2hhcmFjdGVyLlwiLFxyXG4gIC8vIFwiRXhjZXB0aW9uXCI6bnVsbCxcIlNvdXJjZVwiOlwiQ3JlYXRlTGVhcm5lckFjY291bnRBY3Rpb25cIixcclxuICAvLyBEaXNwbGF5VG9Vc2VyXCI6dHJ1ZSxcIlRhcmdldFwiOlwiXCJ9XX1cIlxyXG5cclxuICBOYW1lOiBzdHJpbmc7XHJcbiAgTWVzc2FnZTogc3RyaW5nO1xyXG4gIEV4Y2VwdGlvbjogYW55O1xyXG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XHJcbiAgU291cmNlOiBzdHJpbmc7XHJcbiAgVGFyZ2V0OiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlUmVzcG9uc2Uge1xyXG4gIElzU3VjY2VzczogYm9vbGVhbjtcclxuICBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgRGF0YTogYW55O1xyXG4gIEVycm9yczogQXJyYXk8U2VydmljZUVycm9yPiA9IG5ldyBBcnJheTxTZXJ2aWNlRXJyb3I+KCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5nTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiU2VydmljZUNvbnRleHQiLCJTZXJ2aWNlTWVzc2FnZSIsIk1lc3NhZ2VUeXBlIiwiU2V2ZXJpdHkiLCJCZWhhdmlvclN1YmplY3QiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIkFjdGlvblJlc3VsdCIsIk9ic2VydmFibGUiLCJDb21wb3NpdGVSdWxlIiwiQWN0aW9uIiwicm91dGVyIiwiTmF2aWdhdGlvbkVuZCIsImh0dHAiLCJIdHRwSGVhZGVycyIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O29CQUlDQSxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLENBQUNDLG1DQUEyQixFQUFFQyxtQkFBWSxDQUFDO3FCQUNyRDs7NkNBTkQ7Ozs7Ozs7QUNFQSxRQUFBOzs2QkFDYyxLQUFLOzBCQUVhLElBQUksS0FBSyxFQUFnQjs7NEJBTHpEO1FBT0M7Ozs7OztBQ1BEOzs7O0FBaUJBOzs7UUFBQTs7Ozs7Ozs7O1FBYUUscUJBQW1CLGNBQTRDO1lBQTVDLG1CQUFjLEdBQWQsY0FBYyxDQUE4QjsrQkFaakQsRUFBRTtrQ0FFaUIsSUFBSUMsMEJBQWMsRUFBRTtTQVVjOzs7Ozs7Ozs7Ozs7UUFPbkUsaUNBQVc7Ozs7OztZQUFYLFVBQVksUUFBa0I7Z0JBQzVCLHFCQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7YUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBY0QsMkNBQXFCOzs7Ozs7Ozs7Ozs7O1lBQXJCLFVBQXNCLEtBQVk7Z0JBQ2hDLHFCQUFNLE9BQU8sR0FBRyxJQUFJQywwQkFBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQztxQkFDMUQsaUJBQWlCLENBQUMsSUFBSSxDQUFDO3FCQUN2QixlQUFlLENBQUNDLHVCQUFXLENBQUMsS0FBSyxDQUFDO3FCQUNsQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUVoQyxxQkFBTSxPQUFPLEdBQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFLLEtBQUssQ0FBQyxLQUFPLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUVD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