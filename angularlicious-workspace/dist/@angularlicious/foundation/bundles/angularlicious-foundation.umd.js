(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angularlicious/logging'), require('@angularlicious/rules-engine'), require('rxjs'), require('@angularlicious/actions'), require('@angular/router'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/foundation', ['exports', '@angular/core', '@angular/common', '@angularlicious/logging', '@angularlicious/rules-engine', 'rxjs', '@angularlicious/actions', '@angular/router', '@angular/common/http'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.foundation = {}),global.ng.core,global.ng.common,null,null,global.rxjs,null,global.ng.router,global.ng.common.http));
}(this, (function (exports,core,common,logging,rulesEngine,rxjs,actions,router,http) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousFoundationModule = (function () {
        function AngularliciousFoundationModule() {
        }
        AngularliciousFoundationModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [logging.AngularliciousLoggingModule, common.CommonModule, rulesEngine.AngularliciousRulesEngineModule],
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
                var /** @type {?} */ message = error.toString() + " " + requestOptions.requestUrl + ", " + JSON.stringify(requestOptions.body);
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
                var /** @type {?} */ message = error.toString() + " " + requestOptions.requestUrl + ", " + JSON.stringify(requestOptions.body);
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
     * 1. Create HttpHeaders
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
                var /** @type {?} */ headers = new http.HttpHeaders();
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
                var /** @type {?} */ headers = new http.HttpHeaders({
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
                var /** @type {?} */ response = this.http
                    .get(requestOptions.requestUrl, requestOptions)
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
                var /** @type {?} */ response = this.http
                    .post(requestOptions.requestUrl, requestOptions)
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
                { type: http.HttpClient, },
                { type: logging.AngularliciousLoggingService, },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtZm91bmRhdGlvbi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9mb3VuZGF0aW9uLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL3NlcnZpY2UtYmFzZS50cyIsbnVsbCwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvYWN0aW9uLWJhc2UuYWN0aW9uLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cy50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9hbGVydC1ub3RpZmljYXRpb24ubW9kZWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9jb21wb25lbnQtYmFzZS5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9odHRwLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsIENvbW1vbk1vZHVsZSwgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzRm91bmRhdGlvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9zZXJ2aWNlLWVycm9yLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIEVycm9yUmVzcG9uc2Uge1xuICBJc1N1Y2Nlc3MgPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxuICBNZXNzYWdlOiBzdHJpbmc7XG4gIEVycm9yczogQXJyYXk8U2VydmljZUVycm9yPiA9IG5ldyBBcnJheTxTZXJ2aWNlRXJyb3I+KCk7XG4gIEV4Y2VwdGlvbjogRXJyb3I7XG59XG4iLCJpbXBvcnQge1xuICBTZXJ2aWNlQ29udGV4dCxcbiAgTWVzc2FnZVR5cGUsXG4gIFNlcnZpY2VNZXNzYWdlXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHtcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgU2V2ZXJpdHlcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcbmltcG9ydCB7IE9BdXRoRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL29hdXRoLWVycm9yLXJlc3BvbnNlLm1vZGVsJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLy8gaW1wb3J0IHsgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4vLyBpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9odHRwLXJlcXVlc3Qtb3B0aW9ucyc7XG5cbi8qKlxuICogVXNlIHRoZSBbU2VydmljZUJhc2VdIHRvIHByb3ZpZGUgY29tbW9uIGJlaGF2aW9yIGZvciBBbmd1bGFyXG4gKiBzZXJ2aWNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZpY2VCYXNlIHtcbiAgYWNjZXNzVG9rZW4gPSAnJztcbiAgc2VydmljZU5hbWU6IHN0cmluZztcbiAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0ID0gbmV3IFNlcnZpY2VDb250ZXh0KCk7XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gcHJvdmlkZSByZXF1aXJlZCBlbGVtZW50cyB0byB0aGUgYmFzZSBjbGFzcy5cbiAgICpcbiAgICogQHBhcmFtIGxvZ2dpbmdTZXJ2aWNlIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGlzIGEgcmVxdWlyZWQgZGVwZW5kZW5jeSBvZiB0aGlzXG4gICAqIGNsYXNzLiBJdCBzaG91bGQgYmUgaW5qZWN0ZWQgaW50byBhbnkgQW5ndWxhciBTZXJ2aWNlcyB0aGF0IGV4dGVuZCBmcm9tXG4gICAqIHRoaXMgYmFzZSBjbGFzcy4gSXQgd2lsbCBhbGxvdyB0aGUgbWVtYmVycyBvZiB0aGUgYmFzZSBjbGFzcyB0byBsb2cgaW5mb3JtYXRpb25cbiAgICogdXNpbmcgdGhlIGNvbW1vbiBMb2dnaW5nU2VydmljZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSkge31cblxuICAvKipcbiAgICogVXNlIHRvIGV4dHJhY3QgdGhlIGNvbnRlbnRzIG9mIHRoZSBIVFRQIGJvZHkgYW5kIHJldHVybiBhIEpTT05cbiAgICogcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEuXG4gICAqIEBwYXJhbSByZXNwb25zZTogY29udGFpbnMgdGhlIEhUVFAgcmVzcG9uc2UuXG4gICAqL1xuICBleHRyYWN0RGF0YShyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgICBjb25zdCBib2R5ID0gcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBib2R5IHx8IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBoYW5kbGUgYW4gdW5leHBlY3RlZCBlcnJvciBpbiB0aGUgYXBwbGljYXRpb24uIFRoZSBlcnJvciBzaG91bGQgaW1wbGVtZW50XG4gICAqIHRoZSBzcGVjaWZpZWQgaW50ZXJmYWNlLiBUaGUgbWV0aG9kIHdpbGwgYWRkIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlXG4gICAqIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxuICAgKiBAcGFyYW0gZXJyb3IgQW4gdW5leHBlY3RlZCBhcHBsaWNhdGlvbiBlcnJvciB0aGF0IGltcGxlbWVudHMgdGhlIFtFcnJvcl0gaW50ZXJmYWNlLlxuICAgKlxuICAgKiBpbnRlcmZhY2UgRXJyb3Ige1xuICAgKiAgbmFtZTogc3RyaW5nO1xuICAgKiAgbWVzc2FnZTogc3RyaW5nO1xuICAgKiAgc3RhY2s/OiBzdHJpbmc7XG4gICAqIH1cbiAgICovXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpXG4gICAgICAuV2l0aERpc3BsYXlUb1VzZXIodHJ1ZSlcbiAgICAgIC5XaXRoTWVzc2FnZVR5cGUoTWVzc2FnZVR5cGUuRXJyb3IpXG4gICAgICAuV2l0aFNvdXJjZSh0aGlzLnNlcnZpY2VOYW1lKTtcblxuICAgIGNvbnN0IGxvZ0l0ZW0gPSBgJHttZXNzYWdlLnRvU3RyaW5nKCl9OyAke2Vycm9yLnN0YWNrfWA7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGxvZ0l0ZW0pO1xuXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBoYW5kbGUgYW4gZXJyb3IgdGhhdCBjb250YWlucyBhIFtuYW1lXSBhbmQgYSBbbWVzc2FnZV0uXG4gICAqIEBwYXJhbSBlcnJvclxuICAgKi9cbiAgaGFuZGxlRXJyb3IoZXJyb3I6IHsgbmFtZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQgfSk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcbiAgICAgIC5XaXRoRGlzcGxheVRvVXNlcih0cnVlKVxuICAgICAgLldpdGhNZXNzYWdlVHlwZShNZXNzYWdlVHlwZS5FcnJvcilcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xuXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuRXJyb3IsXG4gICAgICBtZXNzYWdlLnRvU3RyaW5nKClcbiAgICApO1xuXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBoYW5kbGUgSFRUUCBlcnJvcnMgd2hlbiBjYWxsaW5nIHdlYiBhcGkocykuXG4gICAqL1xuICBoYW5kbGVIdHRwRXJyb3IoXG4gICAgZXJyb3I6IHsgdG9TdHJpbmc6ICgpID0+IHZvaWQ7IF9ib2R5OiBhbnk7IGpzb246ICgpID0+IEVycm9yUmVzcG9uc2UgfSxcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcbiAgICB9LCAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RPcHRpb25zLmJvZHkpfWA7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IGVycm9yLmpzb24oKTtcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXG4gICAgICAgICAgZXJyb3JSZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgICBTZXZlcml0eS5FcnJvcixcbiAgICAgICAgICBlcnJvci50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmYXVsdCByZXR1cm4gYmVoYXZpb3I7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2UoXG4gICAgICAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLidcbiAgICApO1xuICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGhhbmRsZSBhbiBlcnJvciBmcm9tIHRoZSBPQXV0aCBQcm92aWRlciBBUEkuXG4gICAqIEBwYXJhbSBlcnJvclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnNcbiAgICovXG4gIGhhbmRsZU9BdXRoRXJyb3IoXG4gICAgZXJyb3I6IE9BdXRoRXJyb3JSZXNwb25zZSxcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcbiAgICB9LCAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RPcHRpb25zLmJvZHkpfWA7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcbiAgICAgICAgICBgVW5hYmxlIHRvIHZhbGlkYXRlIGNyZWRlbnRpYWxzLmBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXG4gICAgICAgICAgZXJyb3JSZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZS50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0IHJldHVybiBiZWhhdmlvcjtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcbiAgICAgIGBVbmFibGUgdG8gdmFsaWRhdGUgY3JlZGVudGlhbHMuYFxuICAgICk7XG4gICAgY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gY3JlYXRlIGEgbmV3IFtFcnJvclJlc3BvbnNlXSB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgZm9yIHRoZSBzcGVjaWZpZWQgW0Vycm9yUmVzcG9uc2VdLlxuICAgKi9cbiAgY3JlYXRlRXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcpOiBFcnJvclJlc3BvbnNlIHtcbiAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XG4gICAgcmVzcG9uc2UuTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSBhIGdlbmVyaWMgbWV0aG9kIHRvIGZpbmlzaCBzZXJ2aWNlIHJlcXVlc3RzIHRoYXQgcmV0dXJuIFtPYnNlcnZhYmxlc10uXG4gICAqIEBwYXJhbSBzb3VyY2VOYW1lXG4gICAqL1xuICBmaW5pc2hSZXF1ZXN0KHNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFJlcXVlc3QgZm9yIFske3NvdXJjZU5hbWV9XSBieSAke3RoaXMuc2VydmljZU5hbWV9IGlzIGNvbXBsZXRlLmBcbiAgICApO1xuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgIGBQcmVwYXJpbmcgdG8gd3JpdGUgYW55IG1lc3NhZ2VzLmBcbiAgICAgICk7XG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZpbHRlcihcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvciAmJiBmLkRpc3BsYXlUb1VzZXJcbiAgICAgICkuZm9yRWFjaChlID0+XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBlLnRvU3RyaW5nKCkpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVzZXQgdGhlIHNlcnZpY2UgY29udGV4dCB3aGVuIHlvdSB3YW50IHRvIGNsZWFyIG1lc3NhZ2VzIGZyb20gdGhlIFtTZXJ2aWNlQ29udGV4dF0uIElmIHlvdSB3YW50IHRvXG4gICAqIGFwcGVuZCBtZXNzYWdlcyBmcm9tIHN1YnNlcXVlbnQgc2VydmljZSBjYWxscywgZG8gbm90IHVzZSB0aGlzIG1ldGhvZC5cbiAgICovXG4gIHJlc2V0U2VydmljZUNvbnRleHQoKSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUHJlcGFyaW5nIHRvIHJlc2V0IHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcbiAgICApO1xuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0ICYmIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMpIHtcbiAgICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgICAgICBgUmVzZXR0aW5nIHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcyA9IG5ldyBBcnJheTxTZXJ2aWNlTWVzc2FnZT4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICAgIHRoaXMuc2VydmljZU5hbWUsXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgICAgYFRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgW01lc3NhZ2VzXS5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgICBTZXZlcml0eS5XYXJuaW5nLFxuICAgICAgICBgVGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XSBpcyBub3QgdmFsaWQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgRmluaXNoZWQgIHByb2Nlc3NpbmcgcmVxdWVzdCB0byBbcmVzZXRdIHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byB3cml0ZSB0aGUgY3VycmVudCBtZXNzYWdlcyBjb250YWluZWQgaW4gdGhlIFtTZXJ2aWNlQ29udGV4dF0uIFdyaXR0ZW4gbWVzc2FnZXMgYXJlIGxpbWl0ZWRcbiAgICogdG8gaXRlbXMgdGhhdCBhcmUgbWFya2VkIGFzIFtEaXNwbGF5VG9Vc2VyID0gdHJ1ZV0uXG4gICAqL1xuICB3cml0ZU1lc3NhZ2VzKCkge1xuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0ICYmIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMpIHtcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgaWYgKGUuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yICYmIGUuRGlzcGxheVRvVXNlcikge1xuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxuICAgICAgICAgICAgZS50b1N0cmluZygpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbi8vIC8vIGltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9hY3Rpb25zJztcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5pbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSB9IGZyb20gJy4vaHR0cC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcbmltcG9ydCB7IFNlcnZpY2VFcnJvciB9IGZyb20gJy4vbW9kZWxzL3NlcnZpY2UtZXJyb3IubW9kZWwnO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGFwcGxpY2F0aW9uJ3MgYmFzZSBBY3Rpb24gY2xhc3MgdGhhdCBwcm92aWRlcyBpbXBsZW1lbnRhdGlvbiBvZiBwaXBlbGluZSBtZXRob2RzIC0gcHJlL3Bvc3RcbiAqIGV4ZWN1dGlvbiBtZXRob2RzLlxuICpcbiAqIFRoZSBwcmUtZXhlY3V0ZSBtZXRob2RzIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcbiAqXHRcdDEuIHN0YXJ0KCk7XG4gKlx0XHQyLiBhdWRpdCgpO1xuICpcdFx0My4gcHJlVmFsaWRhdGVBY3Rpb24oKTtcbiAqXHRcdDQuIGV2YWx1YXRlUnVsZXMoKTtcbiAqXHRcdDUuIHBvc3RWYWxpZGF0ZUFjdGlvbigpO1xuICpcdFx0Ni4gcHJlRXhlY3V0ZUFjdGlvbigpO1xuICpcbiAqSWYgdGhlIHN0YXR1cyBvZiBhY3Rpb24gaXMgZ29vZCwgdGhlIGJ1c2luZXNzIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgdXNpbmcgdGhlOlxuICpcdFx0MS4gcHJvY2Vzc0FjdGlvbigpO1xuICpcbiAqIFRoZSBwb3N0LWV4ZWN1dGlvbiBtZXRob2RzIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcbiAqXHRcdDEuIHBvc3RFeGVjdXRlQWN0aW9uKCk7XG4gKlx0XHQyLiB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpO1xuICpcdFx0My4gZmluaXNoKCk7XG4gKi9cblxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhc2UgZXh0ZW5kcyBBY3Rpb24ge1xuICBzZXJ2aWNlQ29udGV4dDogU2VydmljZUNvbnRleHQ7XG4gIHJlc3BvbnNlOiBPYnNlcnZhYmxlPGFueT47XG4gIGh0dHBCYXNlOiBIdHRwQmFzZVNlcnZpY2U7XG4gIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlO1xuICBhY3Rpb25OYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgYSByZXF1aXJlZCBpbXBsZW1lbnRhdGlvbiBpZiB5b3Ugd2FudCB0byByZW5kZXIvZXhlY3V0ZSB0aGUgcnVsZXMgdGhhdFxuICAgKiBhcmUgYXNzb2NpYXRlZCB0byB0aGUgc3BlY2lmaWVkIGFjdGlvbi5cbiAgICovXG4gIHZhbGlkYXRlQWN0aW9uKCk6IFZhbGlkYXRpb25Db250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uQ29udGV4dC5yZW5kZXJSdWxlcygpO1xuICB9XG5cbiAgcG9zdFZhbGlkYXRlQWN0aW9uKCkge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUHJlcGFyaW5nIHRvIGRldGVybWluZSBpZiB0aGUgYWN0aW9uIGNvbnRhaW5zIHZhbGlkYXRpb24gZXJyb3JzIGluICR7XG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZVxuICAgICAgfWBcbiAgICApO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbkNvbnRleHQuaGFzUnVsZVZpb2xhdGlvbnMoKSkge1xuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZSxcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgIGBUaGUgdGFyZ2V0IGNvbnRhaW5zIHZhbGlkYXRpb24gZXJyb3JzIGluICR7dGhpcy5hY3Rpb25OYW1lfWBcbiAgICAgICk7XG5cbiAgICAgIC8vIExvYWQgdGhlIGVycm9yL3J1bGUgdmlvbGF0aW9ucyBpbnRvIHRoZSBTZXJ2aWNlQ29udGV4dCBzbyB0aGF0IHRoZSBpbmZvcm1hdGlvbiBidWJibGVzIHVwIHRvIHRoZSBjYWxsZXIgb2YgdGhlIHNlcnZpY2U7XG4gICAgICB0aGlzLnZhbGlkYXRpb25Db250ZXh0LnJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xuICAgICAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKSB7XG4gICAgICAgICAgdGhpcy5wdWJsaXNoUnVsZVJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIHRoaXMucmV0cmlldmVSdWxlRGV0YWlscyhyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwb3N0RXhlY3V0ZUFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5hY3Rpb25SZXN1bHQgPT09IEFjdGlvblJlc3VsdC5GYWlsKSB7XG4gICAgICB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZvckVhY2goZSA9PiB7XG4gICAgICAgIGlmIChlLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvcikge1xuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICAgICAgdGhpcy5hY3Rpb25OYW1lLFxuICAgICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXG4gICAgICAgICAgICBlLnRvU3RyaW5nKClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsIGNvbmNyZXRlIGFjdGlvbnMgbXVzdCBvdmVycmlkZSBhbmQgaW1wbGVtZW50IHRoaXMgbWV0aG9kLiBJdCBpcyBkZWZpbmVkIGluIHRoZSBbQWN0aW9uXSBmcmFtZXdvcmsgY2xhc3MuXG4gICAqL1xuICB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpOiBBY3Rpb25SZXN1bHQge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUnVubmluZyBbdmFsaWRhdGVBY3Rpb25SZXN1bHRdIGZvciAke3RoaXMuYWN0aW9uTmFtZX0uYFxuICAgICk7XG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBzdGF0dXMgb2YgdGhlIGFjdGlvbiBiYXNlZCBvbiBhbnkgcnVsZSB2aW9sYXRpb25zO1xuICAgIGlmICh0aGlzLnZhbGlkYXRpb25Db250ZXh0Lmhhc1J1bGVWaW9sYXRpb25zKCkpIHtcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICB0aGlzLmFjdGlvbk5hbWUsXG4gICAgICAgIFNldmVyaXR5LkVycm9yLFxuICAgICAgICBgVGhlICR7dGhpcy5hY3Rpb25OYW1lfSBjb250YWlucyBydWxlIHZpb2xhdGlvbnMuYFxuICAgICAgKTtcbiAgICAgIHRoaXMuYWN0aW9uUmVzdWx0ID0gQWN0aW9uUmVzdWx0LkZhaWw7XG5cbiAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xuICAgICAgZXJyb3JSZXNwb25zZS5Jc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSA9IGBWYWxpZGF0aW9uIGVycm9ycyBleGlzdC5gO1xuICAgICAgdGhpcy5yZXNwb25zZSA9IE9ic2VydmFibGUudGhyb3coZXJyb3JSZXNwb25zZSk7XG4gICAgfVxuICAgIHRoaXMuYWN0aW9uUmVzdWx0ID0gdGhpcy5zZXJ2aWNlQ29udGV4dC5pc0dvb2QoKVxuICAgICAgPyBBY3Rpb25SZXN1bHQuU3VjY2Vzc1xuICAgICAgOiBBY3Rpb25SZXN1bHQuRmFpbDtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25SZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHByb2Nlc3MgcnVsZSByZXN1bHRzIGZvciBjb21wb3NpdGUgcnVsZXMuIE5vdGUsIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyByZWN1cnNpdmVcbiAgICogYW5kIHdpbGwgcHJvY2VzcyBhbGwgY29tcG9zaXRlIHJ1bGVzIGluIHRoZSBydWxlIHNldCBjb250YWluZWQgaW4gdGhlIFZhbGlkYXRpb25Db250ZXh0LlxuICAgKiBAcGFyYW0gcnVsZVJlc3VsdCBUaGUgcmVzdWx0IG9mIGEgcmVuZGVyZWQgcnVsZS5cbiAgICovXG4gIHJldHJpZXZlUnVsZURldGFpbHMocnVsZVJlc3VsdDogUnVsZVJlc3VsdCkge1xuICAgIGlmIChydWxlUmVzdWx0LnJ1bGVQb2xpY3kgaW5zdGFuY2VvZiBDb21wb3NpdGVSdWxlKSB7XG4gICAgICBjb25zdCBjb21wb3NpdGUgPSBydWxlUmVzdWx0LnJ1bGVQb2xpY3kgYXMgQ29tcG9zaXRlUnVsZTtcbiAgICAgIGlmIChjb21wb3NpdGUgJiYgY29tcG9zaXRlLmhhc0Vycm9ycykge1xuICAgICAgICBjb25zdCBlcnJvcnMgPSBjb21wb3NpdGUucmVzdWx0cy5maWx0ZXIoXG4gICAgICAgICAgcmVzdWx0ID0+ICFyZXN1bHQuaXNWYWxpZCAmJiByZXN1bHQucnVsZVBvbGljeS5pc0Rpc3BsYXlhYmxlXG4gICAgICAgICk7XG5cbiAgICAgICAgZXJyb3JzLmZvckVhY2goZXJyb3JSZXN1bHQgPT4ge1xuICAgICAgICAgIHRoaXMucHVibGlzaFJ1bGVSZXN1bHQoZXJyb3JSZXN1bHQpO1xuXG4gICAgICAgICAgaWYgKGVycm9yUmVzdWx0LnJ1bGVQb2xpY3kgaW5zdGFuY2VvZiBDb21wb3NpdGVSdWxlKSB7XG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlUnVsZURldGFpbHMoZXJyb3JSZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgaGVscGVyIGZ1bmN0aW9uIHRvIHB1Ymxpc2ggYSBuZXcgW1NlcnZpY2VNZXNzYWdlXSB0byB0aGUgW1NlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzXSBsaXN0LlxuICAgKiBAcGFyYW0gcnVsZVJlc3VsdFxuICAgKi9cbiAgcHVibGlzaFJ1bGVSZXN1bHQocnVsZVJlc3VsdDogUnVsZVJlc3VsdCkge1xuICAgIGNvbnN0IHNlcnZpY2VNZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKFxuICAgICAgcnVsZVJlc3VsdC5ydWxlUG9saWN5Lm5hbWUsXG4gICAgICBydWxlUmVzdWx0LnJ1bGVQb2xpY3kubWVzc2FnZSxcbiAgICAgIE1lc3NhZ2VUeXBlLkVycm9yXG4gICAgKTtcbiAgICBzZXJ2aWNlTWVzc2FnZS5EaXNwbGF5VG9Vc2VyID0gcnVsZVJlc3VsdC5ydWxlUG9saWN5LmlzRGlzcGxheWFibGU7XG4gICAgc2VydmljZU1lc3NhZ2UuU291cmNlID0gdGhpcy5hY3Rpb25OYW1lO1xuICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMucHVzaChzZXJ2aWNlTWVzc2FnZSk7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXG4gICAgICBTZXZlcml0eS5FcnJvcixcbiAgICAgIGAke3NlcnZpY2VNZXNzYWdlLnRvU3RyaW5nKCl9YFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5cbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5pbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuXG4vKipcbiAqIFVzZSB0aGUgYnVzaW5lc3MgcHJvdmlkZXIgYmFzZSBjbGFzcyB0byBhY2Nlc3MgY29tbW9uIGVsZW1lbnRzIG9mIHRoZSBidXNpbmVzcyBwcm92aWRlci5cbiAqXG4gKiBzZXJ2aWNlQ29udGV4dDogVGhpcyBpcyBpbml0aWFsaXplZCBmb3IgZWFjaCBpbnN0YW5jZSBvZiBhIGJ1c2luZXNzIHByb3ZpZGVyIC0gaXRzIHB1cnBvc2UgaXMgdG8gY29sbGVjdCBpbmZvcm1hdGlvbiBkdXJpbmcgdGhlIHByb2Nlc3Npbmcgb2YgYnVzaW5lc3MgbG9naWMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCdXNpbmVzc1Byb3ZpZGVyQmFzZSB7XG4gIHNlcnZpY2VOYW1lOiBzdHJpbmc7XG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dDtcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UpIHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgIGBSdW5uaW5nIGNvbnN0cnVjdG9yIGZvciB0aGUgW0J1c2luZXNzUHJvdmlkZXJCYXNlXS5gXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gaGFuZGxlIGFuIHVuZXhwZWN0ZWQgZXJyb3IgaW4gdGhlIGFwcGxpY2F0aW9uLiBUaGUgZXJyb3Igc2hvdWxkIGltcGxlbWVudFxuICAgKiB0aGUgc3BlY2lmaWVkIGludGVyZmFjZS4gVGhlIG1ldGhvZCB3aWxsIGFkZCBhIG5ldyBbU2VydmljZU1lc3NhZ2VdIHRvIHRoZVxuICAgKiBzcGVjaWZpZWQgW1NlcnZpY2VDb250ZXh0XS5cbiAgICogQHBhcmFtIGVycm9yIEFuIHVuZXhwZWN0ZWQgYXBwbGljYXRpb24gZXJyb3IgdGhhdCBpbXBsZW1lbnRzIHRoZSBbRXJyb3JdIGludGVyZmFjZS5cbiAgICpcbiAgICogaW50ZXJmYWNlIEVycm9yIHtcbiAgICogIG5hbWU6IHN0cmluZztcbiAgICogIG1lc3NhZ2U6IHN0cmluZztcbiAgICogIHN0YWNrPzogc3RyaW5nO1xuICAgKiB9XG4gICAqL1xuICBoYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlKVxuICAgICAgLldpdGhEaXNwbGF5VG9Vc2VyKHRydWUpXG4gICAgICAuV2l0aE1lc3NhZ2VUeXBlKE1lc3NhZ2VUeXBlLkVycm9yKVxuICAgICAgLldpdGhTb3VyY2UodGhpcy5zZXJ2aWNlTmFtZSk7XG5cbiAgICBjb25zdCBsb2dJdGVtID0gYCR7bWVzc2FnZS50b1N0cmluZygpfTsgJHtlcnJvci5zdGFja31gO1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBsb2dJdGVtKTtcblxuICAgIHRoaXMuc2VydmljZUNvbnRleHQuYWRkTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIGZpbmlzaFJlcXVlc3Qoc291cmNlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUmVxdWVzdCBmb3IgWyR7c291cmNlTmFtZX1dIGJ5ICR7dGhpcy5zZXJ2aWNlTmFtZX0gaXMgY29tcGxldGUuYFxuICAgICk7XG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgICAgYFByZXBhcmluZyB0byB3cml0ZSBvdXQgdGhlIGVycm9ycy5gXG4gICAgICApO1xuICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5maWx0ZXIoXG4gICAgICAgIGYgPT4gZi5EaXNwbGF5VG9Vc2VyICYmIGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXG4gICAgICApLmZvckVhY2goZSA9PlxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZS50b1N0cmluZygpKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVXNlIHRvIHByb3ZpZGUgdGhlIGFsZXJ0IHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBBbGVydE5vdGlmaWNhdGlvbiBhbmQgQWxlcnRDb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbGVydFR5cGVzIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBJbmZvcm1hdGlvbjogc3RyaW5nID0gJ2FsZXJ0LWluZm8nO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFdhcm5pbmc6IHN0cmluZyA9ICdhbGVydC13YXJuaW5nJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBEYW5nZXI6IHN0cmluZyA9ICdhbGVydC1kYW5nZXInO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFN1Y2Nlc3M6IHN0cmluZyA9ICdhbGVydC1zdWNjZXNzJztcbn1cbiIsImltcG9ydCB7IEFsZXJ0VHlwZXMgfSBmcm9tICcuL2FsZXJ0LXR5cGVzLmNvbnN0YW50cyc7XG5cbmV4cG9ydCBjbGFzcyBBbGVydE5vdGlmaWNhdGlvbiB7XG4gIHR5cGU6IHN0cmluZyA9IEFsZXJ0VHlwZXMuSW5mb3JtYXRpb247IC8vIGFsZXJ0LXdhcm5pbmcsIGFsZXJ0LXN1Y2Nlc3MsIGFsZXJ0LWluZm8sIGFsZXJ0LWRhbmdlclxuICBoZWFkZXI6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgbWVzc2FnZXM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICBzaG93QWxlcnQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBoZWFkZXI6IHN0cmluZyxcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG1lc3NhZ2VzPzogQXJyYXk8c3RyaW5nPixcbiAgICB0eXBlPzogc3RyaW5nXG4gICkge1xuICAgIGlmICh0eXBlKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICBpZiAobWVzc2FnZXMpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWFkZXIgJiYgdGhpcy50aXRsZSkge1xuICAgICAgdGhpcy5zaG93QWxlcnQgPSB0cnVlOyAvLyB1c2VkIHRvIHRyaWdnZXIgdGhlIGRpc3BsYXkgb2YgdGhlIG5vdGlmaWNhdGlvbi5cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgTWVzc2FnZVR5cGUsXG4gIFNlcnZpY2VDb250ZXh0LFxuICBTZXJ2aWNlTWVzc2FnZVxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XG5pbXBvcnQge1xuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxuICBTZXZlcml0eVxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBBbGVydE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vbW9kZWxzL2FsZXJ0LW5vdGlmaWNhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbGVydFR5cGVzIH0gZnJvbSAnLi9tb2RlbHMvYWxlcnQtdHlwZXMuY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJhc2Uge1xuICBjb21wb25lbnROYW1lOiBzdHJpbmc7XG4gIGFsZXJ0Tm90aWZpY2F0aW9uOiBBbGVydE5vdGlmaWNhdGlvbjtcbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29tcG9uZW50TmFtZTogc3RyaW5nLFxuICAgIHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgdGhpcy5jb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZTtcbiAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKCcnLCAnJyk7XG5cbiAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgdGhpcy5nb29nbGVBbmFseXRpY3NQYWdldmlldyhldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gY29uc3Qgcm91dGVyRXZlbnQgPSB0aGlzLnJvdXRlci5ldmVudHMuZmlsdGVyKFxuICAgIC8vICAgZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kXG4gICAgLy8gKTtcbiAgICAvLyBpZiAocm91dGVyRXZlbnQgJiYgcm91dGVyRXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgLy8gICB0aGlzLmdvb2dsZUFuYWx5dGljc1BhZ2V2aWV3KHJvdXRlckV2ZW50KTtcbiAgICAvLyB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHNlbmQgYW4gYW5hbHl0aWMgZXZlbnQgdG8gW0dvb2dsZSBBbmFseXRpY3NdLlxuICAgKiBAcGFyYW0gY2F0ZWdvcnkgQSBjYXRlZ29yeSBpcyBhIG5hbWUgdGhhdCB5b3Ugc3VwcGx5IGFzIGEgd2F5IHRvIGdyb3VwIG9iamVjdHMgdGhhdCB5b3Ugd2FudCB0byB0cmFjay4gVHlwaWNhbGx5LCB5b3Ugd2lsbCB1c2UgdGhlIHNhbWUgY2F0ZWdvcnkgbmFtZSBtdWx0aXBsZSB0aW1lcyBvdmVyIHJlbGF0ZWQgVUkgZWxlbWVudHMgdGhhdCB5b3Ugd2FudCB0byBncm91cCB1bmRlciBhIGdpdmVuIGNhdGVnb3J5LlxuICAgKiBAcGFyYW0gYWN0aW9uIFVzZSB0aGUgYWN0aW9uIHBhcmFtZXRlciB0byBuYW1lIHRoZSB0eXBlIG9mIGV2ZW50IG9yIGludGVyYWN0aW9uIHlvdSB3YW50IHRvIHRyYWNrIGZvciBhIHBhcnRpY3VsYXIgd2ViIG9iamVjdCAoaS5lLiwgcGxheSwgc3RvcCwgcGF1c2UsIGRvd25sb2FkKS4gQSB1bmlxdWUgZXZlbnQgaXMgZGV0ZXJtaW5lZCBieSBhIHVuaXF1ZSBhY3Rpb24gbmFtZS4gWW91IGNhbiB1c2UgZHVwbGljYXRlIGFjdGlvbiBuYW1lcyBhY3Jvc3MgY2F0ZWdvcmllcywgYnV0IHRoaXMgY2FuIGFmZmVjdCBob3cgdW5pcXVlIGV2ZW50cyBhcmUgY2FsY3VsYXRlZC4gU2VlIHRoZSBzdWdnZXN0aW9ucyBiZWxvdyBhbmQgdGhlIEltcGxpY2l0IENvdW50IHNlY3Rpb24gZm9yIG1vcmUgZGV0YWlscy5cbiAgICogQHBhcmFtIGxhYmVsIFByb3ZpZGUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmb3IgZXZlbnRzIHRoYXQgeW91IHdhbnQgdG8gdHJhY2ssIHN1Y2ggYXMgdGhlIG1vdmllIHRpdGxlIGluIHRoZSB2aWRlbyBleGFtcGxlcyBhYm92ZSwgb3IgdGhlIG5hbWUgb2YgYSBmaWxlIHdoZW4gdHJhY2tpbmcgZG93bmxvYWRzLiBBbGwgbGFiZWxzIGFyZSBsaXN0ZWQgaW5kZXBlbmRlbnRseSBmcm9tIHRoZWlyIHBhcmVudCBjYXRlZ29yaWVzIGFuZCBhY3Rpb25zLiBUaGlzIHByb3ZpZGVzIHlvdSB3aXRoIGFub3RoZXIgdXNlZnVsIHdheSB0byBzZWdtZW50IHRoZSBldmVudCBkYXRhIGZvciB5b3VyIHJlcG9ydHMuIEFsbCBsYWJlbHMgYXJlIGxpc3RlZCBpbmRlcGVuZGVudGx5IGZyb20gdGhlaXIgcGFyZW50IGNhdGVnb3JpZXMgYW5kIGFjdGlvbnMuIFRoaXMgcHJvdmlkZXMgeW91IHdpdGggYW5vdGhlciB1c2VmdWwgd2F5IHRvIHNlZ21lbnQgdGhlIGV2ZW50IGRhdGEgZm9yIHlvdXIgcmVwb3J0cy5cbiAgICogQHBhcmFtIHZhbHVlIEFueSBudW1lcmljIHZhbHVlIGluZGljYXRpbmcgYSBbdmFsdWVdIHRoYXQgd2lsbCBiZSBzdW1tYXJpemVkIGZvciB0aGUgYW5hbHl0aWMgaXRlbShzKS5cbiAgICpcbiAgICogTW9yZSBpbmZvcm1hdGlvbiBhdDogaHR0cHM6Ly9zdXBwb3J0Lmdvb2dsZS5jb20vYW5hbHl0aWNzL2Fuc3dlci8xMDMzMDY4XG4gICAqIG9yIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9ldmVudHNcbiAgICovXG4gIHB1YmxpYyBnb29nbGVBbmFseXRpY3NTZW5kRXZlbnQoXG4gICAgY2F0ZWdvcnk6IHN0cmluZyxcbiAgICBhY3Rpb246IHN0cmluZyxcbiAgICBsYWJlbDogc3RyaW5nLFxuICAgIHZhbHVlOiBudW1iZXJcbiAgKSB7XG4gICAgKDxhbnk+d2luZG93KS5ndGFnKCdldmVudCcsIGFjdGlvbiwge1xuICAgICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgICAgZXZlbnRfbGFiZWw6IGxhYmVsLFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvb2dsZUFuYWx5dGljc1BhZ2V2aWV3KGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzKSB7XG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgICAgYFByZXBhcmluZyB0byBzZXQgW0dvb2dsZSBBbmFseXRpY3NdIHBhZ2UgdmlldyBmb3IgWyR7XG4gICAgICAgICAgZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHNcbiAgICAgICAgfV0uYFxuICAgICAgKTtcbiAgICAgIC8vICg8YW55PndpbmRvdykuZ2EoJ3NldCcsICdwYWdlJywgZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpO1xuICAgICAgLy8gKDxhbnk+d2luZG93KS5nYSgnc2VuZCcsICdwYWdldmlldycpO1xuICAgICAgLy8gZ2EoJ2NyZWF0ZScsICdVQS0xMTAxOTQzNDQtMScsICdhdXRvJywgdGhpcy5jb21wb25lbnROYW1lKTtcbiAgICAgIC8vIGdhKGAke3RoaXMuY29tcG9uZW50TmFtZX0uc2VuZGAsICdwYWdldmlldycpO1xuXG4gICAgICAvLyBodHRwczovL2Jsb2cudGhlY29kZWNhbXB1cy5kZS9hbmd1bGFyLTItZ29vZ2xlLWFuYWx5dGljcy1nb29nbGUtdGFnLW1hbmFnZXIvXG4gICAgICAvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL3BhZ2VzXG4gICAgICBjb25zdCBHQV9UUkFDS0lOR19JRCA9ICdVQS0xMTAxOTQzNDQtMSc7XG4gICAgICAvLyBndGFnKCdjb25maWcnLCAnR0FfVFJBQ0tJTkdfSUQnLCB7PHBhZ2V2aWV3X3BhcmFtZXRlcnM+fSk7XG4gICAgICAoPGFueT53aW5kb3cpLmdhKCdjb25maWcnLCBHQV9UUkFDS0lOR19JRCwge1xuICAgICAgICBwYWdlX3RpdGxlOiB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICAgIHBhZ2VfcGF0aDogZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHNcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxuICAgICAgICBTZXZlcml0eS5XYXJuaW5nLFxuICAgICAgICBgRmFpbGVkIHRvIHNldCBbR29vZ2xlIEFuYWx5dGljc10gcGFnZSB2aWV3LmBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBjcmVhdGUgYSBzaW1wbGUgW0Vycm9yUmVzcG9uc2VdIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHRvIHRoZSB1c2VyLlxuICAgKi9cbiAgY3JlYXRlRXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcpOiBFcnJvclJlc3BvbnNlIHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgZXJyb3IgcmVzcG9uc2UgZm9yIGNvbXBvbmVudC5gXG4gICAgKTtcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcbiAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHJldHVybiBlcnJvclJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBoYW5kbGUgc2VydmljZSBlcnJvcnMuIFRoZXNlIGFyZSBlcnJvciByZXNwb25zZSBbU2VlOiBFcnJvclJlc3BvbnNlXSBmcm9tXG4gICAqIHRoZSBhcHBsaWNhdGlvbiBidXNpbmVzcyBsYXllcnMgKEFjdGlvbihzKSBvciBIdHRwKSB0aGF0IHdpbGwgYnViYmxlIHVwIHRvIHRoZVxuICAgKiBjYWxsZXIgKGkuZS4sIGEgY29tcG9uZW50KSBpbiBhIHNwZWNpZmllZCBmb3JtYXQ6XG4gICAqXG4gICAqIElzU3VjY2VzczogYm9vbGVhbiA9IGZhbHNlOyAvLyBkZWZhdWx0IGZvciBFcnJvclJlc3BvbnNlXG4gICAqIE1lc3NhZ2U6IHN0cmluZztcbiAgICogRXJyb3JzOiBBcnJheTxTZXJ2aWNlRXJyb3I+ID0gbmV3IEFycmF5PFNlcnZpY2VFcnJvcj4oKTtcbiAgICogRXhjZXB0aW9uOiBhbnk7XG4gICAqL1xuICBoYW5kbGVTZXJ2aWNlRXJyb3JzKFxuICAgIGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UsXG4gICAgc2VydmljZUNvbnRleHQ/OiBTZXJ2aWNlQ29udGV4dFxuICApIHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFByZXBhcmluZyB0byBoYW5kbGUgc2VydmljZSBlcnJvcnMgZm9yIGNvbXBvbmVudC5gXG4gICAgKTtcbiAgICBpZiAoc2VydmljZUNvbnRleHQgJiYgc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgICBgUmV0cmlldmluZyBlcnJvciBtZXNzYWdlcyBmcm9tIHRoZSBTZXJ2aWNlQ29udGV4dC9WYWxpZGF0aW9uQ29udGV4dDtgXG4gICAgICApO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLnJldHJpZXZlU2VydmljZUNvbnRleHRFcnJvck1lc3NhZ2VzKHNlcnZpY2VDb250ZXh0KTtcbiAgICAgIHRoaXMuYWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oXG4gICAgICAgICdFcnJvcnMnLFxuICAgICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBBbGVydFR5cGVzLldhcm5pbmdcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlcnJvclJlc3BvbnNlICYmIGVycm9yUmVzcG9uc2UuTWVzc2FnZSkge1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgICAgYFJldHJpZXZpbmcgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgW0Vycm9yUmVzcG9uc2VdLmBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5yZXRyaWV2ZVJlc3BvbnNlRXJyb3JNZXNzYWdlcyhlcnJvclJlc3BvbnNlKTtcbiAgICAgICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbihcbiAgICAgICAgICAnRXJyb3InLFxuICAgICAgICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSxcbiAgICAgICAgICBlcnJvcnMsXG4gICAgICAgICAgQWxlcnRUeXBlcy5XYXJuaW5nXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcbiAgICAgICAgICBTZXZlcml0eS5FcnJvcixcbiAgICAgICAgICBgRXJyb3I6ICR7ZXJyb3JSZXNwb25zZS5NZXNzYWdlfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJldHJpZXZlIHRoZSBlcnJvciBtZXNzYWdlcyBmcm9tIHRoZSBzcGVjaWZpZWQgW1NlcnZpY2VDb250ZXh0XS5cbiAgICpcbiAgICogQHBhcm06IHNlcnZpY2VDb250ZXh0OiBBIGNvbnRleHQgb2JqZWN0IGNvbnRhaW5pbmcgbWVzc2FnZXMgZm9yIHRoZSBzcGVjaWZpZWQgcmVxdWVzdC5cbiAgICovXG4gIHJldHJpZXZlU2VydmljZUNvbnRleHRFcnJvck1lc3NhZ2VzKFxuICAgIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dFxuICApOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IEFycmF5PHN0cmluZz4oKTtcbiAgICBzZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgaWYgKGUuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yICYmIGUuRGlzcGxheVRvVXNlcikge1xuICAgICAgICBtZXNzYWdlcy5wdXNoKGUuTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgc3BlY2lmaWVkIFdlYiBBUEkgcmVzcG9uc2UuXG4gICAqL1xuICByZXRyaWV2ZVJlc3BvbnNlRXJyb3JNZXNzYWdlcyhlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlKSB7XG4gICAgY29uc3QgZXJyb3JzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICBpZiAoZXJyb3JSZXNwb25zZSAmJiBlcnJvclJlc3BvbnNlLkVycm9ycykge1xuICAgICAgZXJyb3JSZXNwb25zZS5FcnJvcnMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgaWYgKGUuRGlzcGxheVRvVXNlcikge1xuICAgICAgICAgIGVycm9ycy5wdXNoKGUuTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3JzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZXNldCB0aGUgW0FsZXJ0Tm90aWZpY2F0aW9uXSB0byB0aGUgaW5pdGlhbCBzdGF0ZS4gUmVtb3Zlc1xuICAgKiBleGlzdGluZyBtZXNzYWdlcyBhbmQgaGlkZXMgdGhlIEFsZXJ0Q29tcG9uZW50LlxuICAgKi9cbiAgcmVzZXRBbGVydE5vdGlmaWNhdGlvbnMoKSB7XG4gICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBuYXZpZ2F0ZSB0byB0aGUgc3BlY2lmaWVkIHJvdXRlLlxuICAgKiBAcGFybSByb3V0ZU5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCByb3V0ZS5cbiAgICovXG4gIHB1YmxpYyByb3V0ZVRvKHJvdXRlTmFtZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtyb3V0ZU5hbWVdKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcbiAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXG4gICAgICAgIGBFcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIG5hdmlnYXRlIHRvIFske3JvdXRlTmFtZX1dIHJvdXRlIGZyb20gJHtcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWVcbiAgICAgICAgfS4gRXJyb3I6ICR7ZXJyb3IudG9TdHJpbmcoKX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmV0cmlldmUgYW5kIHNob3cgYW55IHJlc3BvbnNlIGVycm9yIG1lc3NhZ2VzLlxuICAgKi9cbiAgc2hvd1Jlc3BvbnNlRXJyb3JzKHJlc3BvbnNlOiBFcnJvclJlc3BvbnNlKSB7XG4gICAgdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKHJlc3BvbnNlLCB1bmRlZmluZWQpO1xuICB9XG5cbiAgZmluaXNoUmVxdWVzdChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYCR7dGhpcy5jb21wb25lbnROYW1lfTogJHttZXNzYWdlfWBcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNob3dBbGVydE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgYWxlcnQobWVzc2FnZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RNZXRob2QgfSBmcm9tICcuL2h0dHAtcmVxdWVzdC1tZXRob2RzLmVudW0nO1xuXG5leHBvcnQgY2xhc3MgSHR0cFJlcXVlc3RPcHRpb25zIHtcbiAgcmVxdWVzdE1ldGhvZDogSHR0cFJlcXVlc3RNZXRob2Q7XG4gIGJvZHk/OiBhbnk7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycyB8IHsgW2hlYWRlcjogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfTtcbiAgb2JzZXJ2ZT86ICdib2R5JztcbiAgcGFyYW1zPzogSHR0cFBhcmFtcyB8IHsgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xuICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW47XG4gIC8vIHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgcmVxdWVzdFVybDogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBIdHRwQ2xpZW50LFxuICBIdHRwRXZlbnQsXG4gIEh0dHBIZWFkZXJzLFxuICBIdHRwUGFyYW1zLFxuICBIdHRwUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9odHRwLXJlcXVlc3Qtb3B0aW9ucyc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJy4vbW9kZWxzL2h0dHAtcmVxdWVzdC1tZXRob2RzLmVudW0nO1xuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcbmltcG9ydCB7IFNlcnZpY2VFcnJvciB9IGZyb20gJy4vbW9kZWxzL3NlcnZpY2UtZXJyb3IubW9kZWwnO1xuaW1wb3J0IHsgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1yZXNwb25zZS5tb2RlbCc7XG4vLyBpbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbi8qKlxuICogVXNlIHRvIGNyZWF0ZSBhbmQgZXhlY3V0ZSBIVFRQIHNlcnZpY2UgcmVxdWVzdHMuXG4gKiAxLiBDcmVhdGUgSHR0cEhlYWRlcnNcbiAqIDIuIENyZWF0ZSBSZXF1ZXN0T3B0aW9uc1xuICogMy4gRXhlY3V0ZSBSZXF1ZXN0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwQmFzZVNlcnZpY2Uge1xuICBwdWJsaWMgc2VydmljZU5hbWUgPSAnSHR0cEJhc2VTZXJ2aWNlJztcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICBwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gY3JlYXRlIGEgW0hlYWRlcl0gZm9yIFttdWx0aXBhcnQvZm9ybS1kYXRhXS5cbiAgICovXG4gIGNyZWF0ZU11bHRpcGFydEZvcm1EYXRhSGVhZGVyKHJlcXVpcmVzQXV0aFRva2VuOiBib29sZWFuKSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBoZWFkZXIgZm9yIHRoZSBbbXVsdGlwYXJ0L2Zvcm0tZGF0YV0gSFRUUCByZXF1ZXN0LiBSZXF1aXJlc0F1dGhUb2tlbjogJHtyZXF1aXJlc0F1dGhUb2tlbn0uYFxuICAgICk7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIGlmIChyZXF1aXJlc0F1dGhUb2tlbikge1xuICAgICAgLy8gY3JlYXRlIGhlYWRlciByZXF1ZXN0IHdpdGggc2VjdXJpdHkgdG9rZW47XG4gICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLmFjY2Vzc1Rva2VufWApO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gY3JlYXRlIGEgW0hlYWRlcl0gZm9yIENvbnRlbnQtVHlwZSBbYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXS5cbiAgICovXG4gIGNyZWF0ZUZvcm1VcmxlbmNvZGVkSGVhZGVyKCkge1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgaGVhZGVyIGZvciB0aGUgW2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZF0gSFRUUCByZXF1ZXN0LmBcbiAgICApO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgfSk7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciB0aGUgSFRUUCByZXF1ZXN0LiBJZiB0aGUgW3JlcXVpcmVzQXV0aFRva2VuXSBpbmRpY2F0b3JcbiAgICogaXMgdHJ1ZSwgdGhlIHJlcXVlc3Qgd2lsbCB1c2UgdGhlIGN1cnJlbnQgQXV0aG9yaXphdGlvbiBzZWN1cml0eSB0b2tlbi5cbiAgICogQHBhcmFtIGlzU2VjdXJlXG4gICAqL1xuICBjcmVhdGVIZWFkZXIocmVxdWlyZXNBdXRoVG9rZW46IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGhlYWRlciBmb3IgdGhlIEhUVFAgcmVxdWVzdC4gUmVxdWlyZXNBdXRoVG9rZW46ICR7cmVxdWlyZXNBdXRoVG9rZW59LmBcbiAgICApO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIGlmIChyZXF1aXJlc0F1dGhUb2tlbikge1xuICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy5hY2Nlc3NUb2tlbn1gKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBIdHRwUmVxdWVzdE9wdGlvbnMgaXRlbSBmb3IgYSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gaGVhZGVycyBVc2UgdG8gc3VwcGx5IGhlYWRlciBpbmZvcm1hdGlvbiBpbiB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHVybCBVc2UgdG8gaW5kaWNhdGUgdGhlIFVSTCBvZiB0aGUgd2ViIGFwaS5cbiAgICogQHBhcmFtIGJvZHkgVXNlIHRvIHByb3ZpZGUgYSBkYXRhIHBheWxvYWQgZm9yIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgY3JlYXRlUmVxdWVzdE9wdGlvbnMoXG4gICAgbWV0aG9kOiBIdHRwUmVxdWVzdE1ldGhvZCxcbiAgICBoZWFkZXJzOiBIdHRwSGVhZGVycyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBib2R5OiBhbnlcbiAgKSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSByZXF1ZXN0IG9wdGlvbnMgZm9yIHRoZSBIVFRQIHJlcXVlc3QuYFxuICAgICk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBIdHRwUmVxdWVzdE9wdGlvbnMoKTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIG9wdGlvbnMucmVxdWVzdFVybCA9IHVybDtcbiAgICBvcHRpb25zLmJvZHkgPSBib2R5O1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGV4ZWN1dGUgYW4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBzcGVjaWZpZWQgaGVhZGVyIGFuZCBVUkwuXG4gICAqL1xuICBleGVjdXRlUmVxdWVzdChcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBgUHJlcGFyaW5nIHRvIGV4ZWN1dGUgSFRUUCByZXF1ZXN0LiBVcmw6ICR7cmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybH1gXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxTZXJ2aWNlUmVzcG9uc2U+KFxuICAgICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdE1ldGhvZC50b1N0cmluZygpLFxuICAgICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCxcbiAgICAgIHJlcXVlc3RPcHRpb25zXG4gICAgKTtcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwXG4gICAgLy8gICAucmVxdWVzdChuZXcgUmVxdWVzdChyZXF1ZXN0T3B0aW9ucykpXG4gICAgLy8gICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkgLy8gbWFwcyB0aGUgb2JzZXJ2YWJsZSByZXNwb25zZSB0byBhIEpTT04gb2JqZWN0O1xuICAgIC8vICAgLmNhdGNoKGVycm9yID0+IHRoaXMuaGFuZGxlSHR0cEVycm9yKGVycm9yLCByZXF1ZXN0T3B0aW9ucykpOyAvLyB1c2UgdG8gaGFuZGxlIGFueSBleGNlcHRpb24gZHVyaW5nIHNlcnZpY2UgY2FsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIFtnZXRdIHJlcXVlc3QgdXNpbmcgdGhlIHNwZWNpZmllZCB1cmwgYW5kIG9wdGlvbnMuXG4gICAqL1xuICBnZXQ8U2VydmljZVJlc3BvbnNlPihcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XG4gICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdE1ldGhvZCA9IEh0dHBSZXF1ZXN0TWV0aG9kLkdFVDtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuaHR0cFxuICAgICAgLmdldDxTZXJ2aWNlUmVzcG9uc2U+KHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmwsIHJlcXVlc3RPcHRpb25zKVxuICAgICAgLnBpcGUoKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIFtwb3N0XSByZXF1ZXN0IHVzaW5nIHRoZSBzcGVjaWZpZWQgdXJsIGFuZCBvcHRpb25zLlxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnMgdXNlIHRvIGRlZmluZSB0aGUgb3B0aW9ucyBmb3IgdGhlIHNwZWNpZmllZCByZXF1ZXN0LlxuICAgKi9cbiAgcG9zdDxTZXJ2aWNlUmVzcG9uc2U+KFxuICAgIHJlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcbiAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0TWV0aG9kID0gSHR0cFJlcXVlc3RNZXRob2QuUE9TVDtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucylcbiAgICAgIC5waXBlKCk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGhhbmRsZSBIVFRQIGVycm9ycyB3aGVuIGNhbGxpbmcgd2ViIGFwaShzKS5cbiAgICovXG4gIGhhbmRsZUh0dHBFcnJvcihcbiAgICBlcnJvcjogYW55LFxuICAgIHJlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci50b1N0cmluZygpfSAke1xuICAgICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybFxuICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbWVzc2FnZSk7XG4gICAgaWYgKGVycm9yICYmIGVycm9yLl9ib2R5KSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoaXMgaXMgYW4gZXJyb3IgdGhhdCBjb250YWlucyBhIGJvZHkgLSBhIFtSZXNwb25zZV0gZnJvbSB0aGUgYXBwbGljYXRpb24gd2ViIGFwaS4gSW5jbHVkZXM6XG4gICAgICAgKiAxLiBJc1N1Y2Nlc3NcbiAgICAgICAqIDIuIE1lc3NhZ2VcbiAgICAgICAqIDMuIEFycmF5IG9mIFNlcnZpY2VFcnJvciBpdGVtc1xuICAgICAgICogNC4gRXhjZXB0aW9uIChvcHRpb25hbClcbiAgICAgICAqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBlcnJvci5qc29uKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVE9ETzogUkVUUklFVkUgRVJST1IgREVUQUlMUzsgU1RBVFVTLCBNRVNTQUdFOyBFVEMuIEFORCBQUk9WSURFIFRPIEhBTkRMRVI7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgY29uc3QgZXJyID0gPEVycm9yPmV4O1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgJHtlcnIubmFtZX07ICR7ZXJyLm1lc3NhZ2V9YDtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcj86IEVycm9yKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2UoZXJyb3IpO1xuICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjcmVhdGVFcnJvclJlc3BvbnNlKGVycm9yPzogRXJyb3IpOiBFcnJvclJlc3BvbnNlIHtcbiAgICBsZXQgbWVzc2FnZSA9ICdVbmV4cGVjdGVkIGVycm9yIHdoaWxlIHByb2Nlc3NpbmcgcmVzcG9uc2UuJztcbiAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIG1lc3NhZ2UgPSBgJHtlcnJvci5uYW1lfSAtICR7ZXJyb3IubWVzc2FnZX1gO1xuICAgICAgcmVzcG9uc2UuRXhjZXB0aW9uID0gZXJyb3I7XG4gICAgfVxuICAgIHJlc3BvbnNlLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxufVxuIiwiLyoqXG4gKiBVc2UgdGhpcyBtb2RlbCB0byByZXByZXNlbnQgc2VydmljZSBlcnJvci9tZXNzYWdlIGluZm9ybWF0aW9uIGZyb20gdGhlXG4gKiBhcHBsaWNhdGlvbidzIHNlcnZpY2UgQVBJcy5cbiAqXG4gKiBUaGUgRGlzcGxheVRvVXNlciBib29sZWFuIHZhbHVlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBtZXNzYWdlIHNob3VsZCBiZVxuICogZGlzcGxheWVkIHRvIHRoZSB1c2VyIGlmIGRlc2lyZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlRXJyb3Ige1xuICAvLyBcIntcIklzU3VjY2Vzc1wiOmZhbHNlLFxuICAvLyBcIk1lc3NhZ2VcIjpcIkZhaWxlZCB0byBjcmVhdGUgbmV3IHVzZXIgYWNjb3VudC5cIixcbiAgLy8gXCJFcnJvcnNcIjpbe1wiTmFtZVwiOlwiUGFzc3dvcmRGb3JtYXRJc1ZhbGlkXCIsXG4gIC8vIFwiTWVzc2FnZVwiOlwiVGhlIHBhc3N3b3JkIGZvcm1hdCBpcyBub3QgdmFsaWQuIE11c3QgY29udGFpbiBhdCBsZWFzdCBvbmU6IGFscGhhLCBudW1lcmljLCBhbmQgc3BlY2lhbCBjaGFyYWN0ZXIuXCIsXG4gIC8vIFwiRXhjZXB0aW9uXCI6bnVsbCxcIlNvdXJjZVwiOlwiQ3JlYXRlTGVhcm5lckFjY291bnRBY3Rpb25cIixcbiAgLy8gRGlzcGxheVRvVXNlclwiOnRydWUsXCJUYXJnZXRcIjpcIlwifV19XCJcblxuICBOYW1lOiBzdHJpbmc7XG4gIE1lc3NhZ2U6IHN0cmluZztcbiAgRXhjZXB0aW9uOiBhbnk7XG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XG4gIFNvdXJjZTogc3RyaW5nO1xuICBUYXJnZXQ6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IFNlcnZpY2VFcnJvciB9IGZyb20gJy4vc2VydmljZS1lcnJvci5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlUmVzcG9uc2Uge1xuICBJc1N1Y2Nlc3M6IGJvb2xlYW47XG4gIE1lc3NhZ2U6IHN0cmluZztcbiAgRGF0YTogYW55O1xuICBFcnJvcnM6IEFycmF5PFNlcnZpY2VFcnJvcj4gPSBuZXcgQXJyYXk8U2VydmljZUVycm9yPigpO1xufVxuIl0sIm5hbWVzIjpbIk5nTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSIsIlNlcnZpY2VDb250ZXh0IiwiU2VydmljZU1lc3NhZ2UiLCJNZXNzYWdlVHlwZSIsIlNldmVyaXR5IiwiQmVoYXZpb3JTdWJqZWN0IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJBY3Rpb25SZXN1bHQiLCJPYnNlcnZhYmxlIiwiQ29tcG9zaXRlUnVsZSIsIkFjdGlvbiIsInJvdXRlciIsIk5hdmlnYXRpb25FbmQiLCJodHRwIiwiSHR0cEhlYWRlcnMiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIkFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztvQkFLQ0EsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDQyxtQ0FBMkIsRUFBRUMsbUJBQVksRUFBRUMsMkNBQStCLENBQUM7cUJBQ3RGOzs2Q0FQRDs7Ozs7OztBQ0VBLFFBQUE7OzZCQUNjLEtBQUs7MEJBRWEsSUFBSSxLQUFLLEVBQWdCOzs0QkFMekQ7UUFPQzs7Ozs7O0FDUEQ7Ozs7QUFxQkE7OztRQUFBOzs7Ozs7Ozs7UUFhRSxxQkFBbUIsY0FBNEM7WUFBNUMsbUJBQWMsR0FBZCxjQUFjLENBQThCOytCQVpqRCxFQUFFO2tDQUVpQixJQUFJQywwQkFBYyxFQUFFO1NBVWM7Ozs7Ozs7Ozs7OztRQU9uRSxpQ0FBVzs7Ozs7O1lBQVgsVUFBWSxRQUFrQjtnQkFDNUIscUJBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDN0IsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO2FBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWNELDJDQUFxQjs7Ozs7Ozs7Ozs7OztZQUFyQixVQUFzQixLQUFZO2dCQUNoQyxxQkFBTSxPQUFPLEdBQUcsSUFBSUMsMEJBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7cUJBQzFELGlCQUFpQixDQUFDLElBQUksQ0FBQztxQkFDdkIsZUFBZSxDQUFDQyx1QkFBVyxDQUFDLEtBQUssQ0FBQztxQkFDbEMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFaEMscUJBQU0sT0FBTyxHQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBSyxLQUFLLENBQUMsS0FBTyxDQUFD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