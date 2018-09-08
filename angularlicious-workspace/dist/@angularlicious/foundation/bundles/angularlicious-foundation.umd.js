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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtZm91bmRhdGlvbi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9mb3VuZGF0aW9uLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL3NlcnZpY2UtYmFzZS50cyIsbnVsbCwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvYWN0aW9uLWJhc2UuYWN0aW9uLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cy50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9hbGVydC1ub3RpZmljYXRpb24ubW9kZWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9jb21wb25lbnQtYmFzZS5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uL2xpYi9odHRwLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vbGliL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbi9saWIvbW9kZWxzL3NlcnZpY2UtcmVzcG9uc2UubW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsIENvbW1vbk1vZHVsZSwgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUge31cclxuIiwiaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvclJlc3BvbnNlIHtcclxuICBJc1N1Y2Nlc3MgPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxyXG4gIE1lc3NhZ2U6IHN0cmluZztcclxuICBFcnJvcnM6IEFycmF5PFNlcnZpY2VFcnJvcj4gPSBuZXcgQXJyYXk8U2VydmljZUVycm9yPigpO1xyXG4gIEV4Y2VwdGlvbjogRXJyb3I7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBTZXJ2aWNlQ29udGV4dCxcclxuICBNZXNzYWdlVHlwZSxcclxuICBTZXJ2aWNlTWVzc2FnZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgU2V2ZXJpdHlcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IE9BdXRoRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL29hdXRoLWVycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbi8vIGltcG9ydCB7IFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vLyBpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgW1NlcnZpY2VCYXNlXSB0byBwcm92aWRlIGNvbW1vbiBiZWhhdmlvciBmb3IgQW5ndWxhclxyXG4gKiBzZXJ2aWNlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQmFzZSB7XHJcbiAgYWNjZXNzVG9rZW4gPSAnJztcclxuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dCA9IG5ldyBTZXJ2aWNlQ29udGV4dCgpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIHByb3ZpZGUgcmVxdWlyZWQgZWxlbWVudHMgdG8gdGhlIGJhc2UgY2xhc3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbG9nZ2luZ1NlcnZpY2UgVGhlIFtMb2dnaW5nU2VydmljZV0gaXMgYSByZXF1aXJlZCBkZXBlbmRlbmN5IG9mIHRoaXNcclxuICAgKiBjbGFzcy4gSXQgc2hvdWxkIGJlIGluamVjdGVkIGludG8gYW55IEFuZ3VsYXIgU2VydmljZXMgdGhhdCBleHRlbmQgZnJvbVxyXG4gICAqIHRoaXMgYmFzZSBjbGFzcy4gSXQgd2lsbCBhbGxvdyB0aGUgbWVtYmVycyBvZiB0aGUgYmFzZSBjbGFzcyB0byBsb2cgaW5mb3JtYXRpb25cclxuICAgKiB1c2luZyB0aGUgY29tbW9uIExvZ2dpbmdTZXJ2aWNlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4dHJhY3QgdGhlIGNvbnRlbnRzIG9mIHRoZSBIVFRQIGJvZHkgYW5kIHJldHVybiBhIEpTT05cclxuICAgKiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0YS5cclxuICAgKiBAcGFyYW0gcmVzcG9uc2U6IGNvbnRhaW5zIHRoZSBIVFRQIHJlc3BvbnNlLlxyXG4gICAqL1xyXG4gIGV4dHJhY3REYXRhKHJlc3BvbnNlOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgYm9keSA9IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBib2R5IHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBhbiB1bmV4cGVjdGVkIGVycm9yIGluIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGVycm9yIHNob3VsZCBpbXBsZW1lbnRcclxuICAgKiB0aGUgc3BlY2lmaWVkIGludGVyZmFjZS4gVGhlIG1ldGhvZCB3aWxsIGFkZCBhIG5ldyBbU2VydmljZU1lc3NhZ2VdIHRvIHRoZVxyXG4gICAqIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxyXG4gICAqIEBwYXJhbSBlcnJvciBBbiB1bmV4cGVjdGVkIGFwcGxpY2F0aW9uIGVycm9yIHRoYXQgaW1wbGVtZW50cyB0aGUgW0Vycm9yXSBpbnRlcmZhY2UuXHJcbiAgICpcclxuICAgKiBpbnRlcmZhY2UgRXJyb3Ige1xyXG4gICAqICBuYW1lOiBzdHJpbmc7XHJcbiAgICogIG1lc3NhZ2U6IHN0cmluZztcclxuICAgKiAgc3RhY2s/OiBzdHJpbmc7XHJcbiAgICogfVxyXG4gICAqL1xyXG4gIGhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcjogRXJyb3IpOiB2b2lkIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgU2VydmljZU1lc3NhZ2UoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSlcclxuICAgICAgLldpdGhEaXNwbGF5VG9Vc2VyKHRydWUpXHJcbiAgICAgIC5XaXRoTWVzc2FnZVR5cGUoTWVzc2FnZVR5cGUuRXJyb3IpXHJcbiAgICAgIC5XaXRoU291cmNlKHRoaXMuc2VydmljZU5hbWUpO1xyXG5cclxuICAgIGNvbnN0IGxvZ0l0ZW0gPSBgJHttZXNzYWdlLnRvU3RyaW5nKCl9OyAke2Vycm9yLnN0YWNrfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbG9nSXRlbSk7XHJcblxyXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBhbiBlcnJvciB0aGF0IGNvbnRhaW5zIGEgW25hbWVdIGFuZCBhIFttZXNzYWdlXS5cclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKi9cclxuICBoYW5kbGVFcnJvcihlcnJvcjogeyBuYW1lOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCB9KTogdm9pZCB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgIC5XaXRoRGlzcGxheVRvVXNlcih0cnVlKVxyXG4gICAgICAuV2l0aE1lc3NhZ2VUeXBlKE1lc3NhZ2VUeXBlLkVycm9yKVxyXG4gICAgICAuV2l0aFNvdXJjZSh0aGlzLnNlcnZpY2VOYW1lKTtcclxuXHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgIG1lc3NhZ2UudG9TdHJpbmcoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIEhUVFAgZXJyb3JzIHdoZW4gY2FsbGluZyB3ZWIgYXBpKHMpLlxyXG4gICAqL1xyXG4gIGhhbmRsZUh0dHBFcnJvcihcclxuICAgIGVycm9yOiB7IHRvU3RyaW5nOiAoKSA9PiB2b2lkOyBfYm9keTogYW55OyBqc29uOiAoKSA9PiBFcnJvclJlc3BvbnNlIH0sXHJcbiAgICByZXF1ZXN0T3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGAke2Vycm9yLnRvU3RyaW5nKCl9ICR7XHJcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RVcmxcclxuICAgIH0sICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuYm9keSl9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBtZXNzYWdlKTtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5fYm9keSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBlcnJvci5qc29uKCk7XHJcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgZXJyb3IudG9TdHJpbmcoKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZhdWx0IHJldHVybiBiZWhhdmlvcjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKFxyXG4gICAgICAnVW5leHBlY3RlZCBlcnJvciB3aGlsZSBwcm9jZXNzaW5nIHJlc3BvbnNlLidcclxuICAgICk7XHJcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gaGFuZGxlIGFuIGVycm9yIGZyb20gdGhlIE9BdXRoIFByb3ZpZGVyIEFQSS5cclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnNcclxuICAgKi9cclxuICBoYW5kbGVPQXV0aEVycm9yKFxyXG4gICAgZXJyb3I6IE9BdXRoRXJyb3JSZXNwb25zZSxcclxuICAgIHJlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7ZXJyb3IudG9TdHJpbmcoKX0gJHtcclxuICAgICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybFxyXG4gICAgfSwgJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0T3B0aW9ucy5ib2R5KX1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgaWYgKGVycm9yICYmIGVycm9yLl9ib2R5KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZShcclxuICAgICAgICAgIGBVbmFibGUgdG8gdmFsaWRhdGUgY3JlZGVudGlhbHMuYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgYmVoYXZpb3JTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gYmVoYXZpb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZhdWx0IHJldHVybiBiZWhhdmlvcjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlKFxyXG4gICAgICBgVW5hYmxlIHRvIHZhbGlkYXRlIGNyZWRlbnRpYWxzLmBcclxuICAgICk7XHJcbiAgICBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gY3JlYXRlIGEgbmV3IFtFcnJvclJlc3BvbnNlXSB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBmb3IgdGhlIHNwZWNpZmllZCBbRXJyb3JSZXNwb25zZV0uXHJcbiAgICovXHJcbiAgY3JlYXRlRXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcpOiBFcnJvclJlc3BvbnNlIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcclxuICAgIHJlc3BvbnNlLk1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIGEgZ2VuZXJpYyBtZXRob2QgdG8gZmluaXNoIHNlcnZpY2UgcmVxdWVzdHMgdGhhdCByZXR1cm4gW09ic2VydmFibGVzXS5cclxuICAgKiBAcGFyYW0gc291cmNlTmFtZVxyXG4gICAqL1xyXG4gIGZpbmlzaFJlcXVlc3Qoc291cmNlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSZXF1ZXN0IGZvciBbJHtzb3VyY2VOYW1lfV0gYnkgJHt0aGlzLnNlcnZpY2VOYW1lfSBpcyBjb21wbGV0ZS5gXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgUHJlcGFyaW5nIHRvIHdyaXRlIGFueSBtZXNzYWdlcy5gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IgJiYgZi5EaXNwbGF5VG9Vc2VyXHJcbiAgICAgICkuZm9yRWFjaChlID0+XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGUudG9TdHJpbmcoKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXNldCB0aGUgc2VydmljZSBjb250ZXh0IHdoZW4geW91IHdhbnQgdG8gY2xlYXIgbWVzc2FnZXMgZnJvbSB0aGUgW1NlcnZpY2VDb250ZXh0XS4gSWYgeW91IHdhbnQgdG9cclxuICAgKiBhcHBlbmQgbWVzc2FnZXMgZnJvbSBzdWJzZXF1ZW50IHNlcnZpY2UgY2FsbHMsIGRvIG5vdCB1c2UgdGhpcyBtZXRob2QuXHJcbiAgICovXHJcbiAgcmVzZXRTZXJ2aWNlQ29udGV4dCgpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byByZXNldCB0aGUgTWVzc2FnZXMgb2YgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5gXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQgJiYgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcykge1xyXG4gICAgICBpZiAodGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBgUmVzZXR0aW5nIHRoZSBNZXNzYWdlcyBvZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLmBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMgPSBuZXcgQXJyYXk8U2VydmljZU1lc3NhZ2U+KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBgVGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XSBkb2VzIG5vdCBjb250YWluIGFueSBbTWVzc2FnZXNdLmBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICAgIFNldmVyaXR5Lldhcm5pbmcsXHJcbiAgICAgICAgYFRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gaXMgbm90IHZhbGlkLmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYEZpbmlzaGVkICBwcm9jZXNzaW5nIHJlcXVlc3QgdG8gW3Jlc2V0XSB0aGUgTWVzc2FnZXMgb2YgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHdyaXRlIHRoZSBjdXJyZW50IG1lc3NhZ2VzIGNvbnRhaW5lZCBpbiB0aGUgW1NlcnZpY2VDb250ZXh0XS4gV3JpdHRlbiBtZXNzYWdlcyBhcmUgbGltaXRlZFxyXG4gICAqIHRvIGl0ZW1zIHRoYXQgYXJlIG1hcmtlZCBhcyBbRGlzcGxheVRvVXNlciA9IHRydWVdLlxyXG4gICAqL1xyXG4gIHdyaXRlTWVzc2FnZXMoKSB7XHJcbiAgICBpZiAodGhpcy5zZXJ2aWNlQ29udGV4dCAmJiB0aGlzLnNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBpZiAoZS5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IgJiYgZS5EaXNwbGF5VG9Vc2VyKSB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgICAgIGUudG9TdHJpbmcoKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuLy8gLy8gaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9hY3Rpb25zJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgU2VydmljZUNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBIdHRwQmFzZVNlcnZpY2UgfSBmcm9tICcuL2h0dHAtYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1lcnJvci5tb2RlbCc7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYXBwbGljYXRpb24ncyBiYXNlIEFjdGlvbiBjbGFzcyB0aGF0IHByb3ZpZGVzIGltcGxlbWVudGF0aW9uIG9mIHBpcGVsaW5lIG1ldGhvZHMgLSBwcmUvcG9zdFxyXG4gKiBleGVjdXRpb24gbWV0aG9kcy5cclxuICpcclxuICogVGhlIHByZS1leGVjdXRlIG1ldGhvZHMgdGhhdCBjYW4gYmUgaW1wbGVtZW50ZWQgYXJlOlxyXG4gKlx0XHQxLiBzdGFydCgpO1xyXG4gKlx0XHQyLiBhdWRpdCgpO1xyXG4gKlx0XHQzLiBwcmVWYWxpZGF0ZUFjdGlvbigpO1xyXG4gKlx0XHQ0LiBldmFsdWF0ZVJ1bGVzKCk7XHJcbiAqXHRcdDUuIHBvc3RWYWxpZGF0ZUFjdGlvbigpO1xyXG4gKlx0XHQ2LiBwcmVFeGVjdXRlQWN0aW9uKCk7XHJcbiAqXHJcbiAqSWYgdGhlIHN0YXR1cyBvZiBhY3Rpb24gaXMgZ29vZCwgdGhlIGJ1c2luZXNzIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgdXNpbmcgdGhlOlxyXG4gKlx0XHQxLiBwcm9jZXNzQWN0aW9uKCk7XHJcbiAqXHJcbiAqIFRoZSBwb3N0LWV4ZWN1dGlvbiBtZXRob2RzIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcclxuICpcdFx0MS4gcG9zdEV4ZWN1dGVBY3Rpb24oKTtcclxuICpcdFx0Mi4gdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTtcclxuICpcdFx0My4gZmluaXNoKCk7XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhc2UgZXh0ZW5kcyBBY3Rpb24ge1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dDtcclxuICByZXNwb25zZTogT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIGh0dHBCYXNlOiBIdHRwQmFzZVNlcnZpY2U7XHJcbiAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2U7XHJcbiAgYWN0aW9uTmFtZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGlzIGEgcmVxdWlyZWQgaW1wbGVtZW50YXRpb24gaWYgeW91IHdhbnQgdG8gcmVuZGVyL2V4ZWN1dGUgdGhlIHJ1bGVzIHRoYXRcclxuICAgKiBhcmUgYXNzb2NpYXRlZCB0byB0aGUgc3BlY2lmaWVkIGFjdGlvbi5cclxuICAgKi9cclxuICB2YWxpZGF0ZUFjdGlvbigpOiBWYWxpZGF0aW9uQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uQ29udGV4dC5yZW5kZXJSdWxlcygpO1xyXG4gIH1cclxuXHJcbiAgcG9zdFZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gZGV0ZXJtaW5lIGlmIHRoZSBhY3Rpb24gY29udGFpbnMgdmFsaWRhdGlvbiBlcnJvcnMgaW4gJHtcclxuICAgICAgICB0aGlzLmFjdGlvbk5hbWVcclxuICAgICAgfWBcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbkNvbnRleHQuaGFzUnVsZVZpb2xhdGlvbnMoKSkge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFRoZSB0YXJnZXQgY29udGFpbnMgdmFsaWRhdGlvbiBlcnJvcnMgaW4gJHt0aGlzLmFjdGlvbk5hbWV9YFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gTG9hZCB0aGUgZXJyb3IvcnVsZSB2aW9sYXRpb25zIGludG8gdGhlIFNlcnZpY2VDb250ZXh0IHNvIHRoYXQgdGhlIGluZm9ybWF0aW9uIGJ1YmJsZXMgdXAgdG8gdGhlIGNhbGxlciBvZiB0aGUgc2VydmljZTtcclxuICAgICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dC5yZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICB0aGlzLnB1Ymxpc2hSdWxlUmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlUnVsZURldGFpbHMocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zdEV4ZWN1dGVBY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5hY3Rpb25SZXN1bHQgPT09IEFjdGlvblJlc3VsdC5GYWlsKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBpZiAoZS5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IpIHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgICBlLnRvU3RyaW5nKClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFsbCBjb25jcmV0ZSBhY3Rpb25zIG11c3Qgb3ZlcnJpZGUgYW5kIGltcGxlbWVudCB0aGlzIG1ldGhvZC4gSXQgaXMgZGVmaW5lZCBpbiB0aGUgW0FjdGlvbl0gZnJhbWV3b3JrIGNsYXNzLlxyXG4gICAqL1xyXG4gIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk6IEFjdGlvblJlc3VsdCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFJ1bm5pbmcgW3ZhbGlkYXRlQWN0aW9uUmVzdWx0XSBmb3IgJHt0aGlzLmFjdGlvbk5hbWV9LmBcclxuICAgICk7XHJcbiAgICAvLyBkZXRlcm1pbmUgdGhlIHN0YXR1cyBvZiB0aGUgYWN0aW9uIGJhc2VkIG9uIGFueSBydWxlIHZpb2xhdGlvbnM7XHJcbiAgICBpZiAodGhpcy52YWxpZGF0aW9uQ29udGV4dC5oYXNSdWxlVmlvbGF0aW9ucygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICBgVGhlICR7dGhpcy5hY3Rpb25OYW1lfSBjb250YWlucyBydWxlIHZpb2xhdGlvbnMuYFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmFjdGlvblJlc3VsdCA9IEFjdGlvblJlc3VsdC5GYWlsO1xyXG5cclxuICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XHJcbiAgICAgIGVycm9yUmVzcG9uc2UuSXNTdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSA9IGBWYWxpZGF0aW9uIGVycm9ycyBleGlzdC5gO1xyXG4gICAgICB0aGlzLnJlc3BvbnNlID0gT2JzZXJ2YWJsZS50aHJvdyhlcnJvclJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aW9uUmVzdWx0ID0gdGhpcy5zZXJ2aWNlQ29udGV4dC5pc0dvb2QoKVxyXG4gICAgICA/IEFjdGlvblJlc3VsdC5TdWNjZXNzXHJcbiAgICAgIDogQWN0aW9uUmVzdWx0LkZhaWw7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25SZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcHJvY2VzcyBydWxlIHJlc3VsdHMgZm9yIGNvbXBvc2l0ZSBydWxlcy4gTm90ZSwgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIHJlY3Vyc2l2ZVxyXG4gICAqIGFuZCB3aWxsIHByb2Nlc3MgYWxsIGNvbXBvc2l0ZSBydWxlcyBpbiB0aGUgcnVsZSBzZXQgY29udGFpbmVkIGluIHRoZSBWYWxpZGF0aW9uQ29udGV4dC5cclxuICAgKiBAcGFyYW0gcnVsZVJlc3VsdCBUaGUgcmVzdWx0IG9mIGEgcmVuZGVyZWQgcnVsZS5cclxuICAgKi9cclxuICByZXRyaWV2ZVJ1bGVEZXRhaWxzKHJ1bGVSZXN1bHQ6IFJ1bGVSZXN1bHQpIHtcclxuICAgIGlmIChydWxlUmVzdWx0LnJ1bGVQb2xpY3kgaW5zdGFuY2VvZiBDb21wb3NpdGVSdWxlKSB7XHJcbiAgICAgIGNvbnN0IGNvbXBvc2l0ZSA9IHJ1bGVSZXN1bHQucnVsZVBvbGljeSBhcyBDb21wb3NpdGVSdWxlO1xyXG4gICAgICBpZiAoY29tcG9zaXRlICYmIGNvbXBvc2l0ZS5oYXNFcnJvcnMpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBjb21wb3NpdGUucmVzdWx0cy5maWx0ZXIoXHJcbiAgICAgICAgICByZXN1bHQgPT4gIXJlc3VsdC5pc1ZhbGlkICYmIHJlc3VsdC5ydWxlUG9saWN5LmlzRGlzcGxheWFibGVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBlcnJvcnMuZm9yRWFjaChlcnJvclJlc3VsdCA9PiB7XHJcbiAgICAgICAgICB0aGlzLnB1Ymxpc2hSdWxlUmVzdWx0KGVycm9yUmVzdWx0KTtcclxuXHJcbiAgICAgICAgICBpZiAoZXJyb3JSZXN1bHQucnVsZVBvbGljeSBpbnN0YW5jZW9mIENvbXBvc2l0ZVJ1bGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVJ1bGVEZXRhaWxzKGVycm9yUmVzdWx0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWxwZXIgZnVuY3Rpb24gdG8gcHVibGlzaCBhIG5ldyBbU2VydmljZU1lc3NhZ2VdIHRvIHRoZSBbU2VydmljZUNvbnRleHQuTWVzc2FnZXNdIGxpc3QuXHJcbiAgICogQHBhcmFtIHJ1bGVSZXN1bHRcclxuICAgKi9cclxuICBwdWJsaXNoUnVsZVJlc3VsdChydWxlUmVzdWx0OiBSdWxlUmVzdWx0KSB7XHJcbiAgICBjb25zdCBzZXJ2aWNlTWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShcclxuICAgICAgcnVsZVJlc3VsdC5ydWxlUG9saWN5Lm5hbWUsXHJcbiAgICAgIHJ1bGVSZXN1bHQucnVsZVBvbGljeS5tZXNzYWdlLFxyXG4gICAgICBNZXNzYWdlVHlwZS5FcnJvclxyXG4gICAgKTtcclxuICAgIHNlcnZpY2VNZXNzYWdlLkRpc3BsYXlUb1VzZXIgPSBydWxlUmVzdWx0LnJ1bGVQb2xpY3kuaXNEaXNwbGF5YWJsZTtcclxuICAgIHNlcnZpY2VNZXNzYWdlLlNvdXJjZSA9IHRoaXMuYWN0aW9uTmFtZTtcclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMucHVzaChzZXJ2aWNlTWVzc2FnZSk7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgYCR7c2VydmljZU1lc3NhZ2UudG9TdHJpbmcoKX1gXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuaW1wb3J0IHsgU2VydmljZUNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcblxyXG4vKipcclxuICogVXNlIHRoZSBidXNpbmVzcyBwcm92aWRlciBiYXNlIGNsYXNzIHRvIGFjY2VzcyBjb21tb24gZWxlbWVudHMgb2YgdGhlIGJ1c2luZXNzIHByb3ZpZGVyLlxyXG4gKlxyXG4gKiBzZXJ2aWNlQ29udGV4dDogVGhpcyBpcyBpbml0aWFsaXplZCBmb3IgZWFjaCBpbnN0YW5jZSBvZiBhIGJ1c2luZXNzIHByb3ZpZGVyIC0gaXRzIHB1cnBvc2UgaXMgdG8gY29sbGVjdCBpbmZvcm1hdGlvbiBkdXJpbmcgdGhlIHByb2Nlc3Npbmcgb2YgYnVzaW5lc3MgbG9naWMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnVzaW5lc3NQcm92aWRlckJhc2Uge1xyXG4gIHNlcnZpY2VOYW1lOiBzdHJpbmc7XHJcbiAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0O1xyXG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUnVubmluZyBjb25zdHJ1Y3RvciBmb3IgdGhlIFtCdXNpbmVzc1Byb3ZpZGVyQmFzZV0uYFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBoYW5kbGUgYW4gdW5leHBlY3RlZCBlcnJvciBpbiB0aGUgYXBwbGljYXRpb24uIFRoZSBlcnJvciBzaG91bGQgaW1wbGVtZW50XHJcbiAgICogdGhlIHNwZWNpZmllZCBpbnRlcmZhY2UuIFRoZSBtZXRob2Qgd2lsbCBhZGQgYSBuZXcgW1NlcnZpY2VNZXNzYWdlXSB0byB0aGVcclxuICAgKiBzcGVjaWZpZWQgW1NlcnZpY2VDb250ZXh0XS5cclxuICAgKiBAcGFyYW0gZXJyb3IgQW4gdW5leHBlY3RlZCBhcHBsaWNhdGlvbiBlcnJvciB0aGF0IGltcGxlbWVudHMgdGhlIFtFcnJvcl0gaW50ZXJmYWNlLlxyXG4gICAqXHJcbiAgICogaW50ZXJmYWNlIEVycm9yIHtcclxuICAgKiAgbmFtZTogc3RyaW5nO1xyXG4gICAqICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICogIHN0YWNrPzogc3RyaW5nO1xyXG4gICAqIH1cclxuICAgKi9cclxuICBoYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgIC5XaXRoRGlzcGxheVRvVXNlcih0cnVlKVxyXG4gICAgICAuV2l0aE1lc3NhZ2VUeXBlKE1lc3NhZ2VUeXBlLkVycm9yKVxyXG4gICAgICAuV2l0aFNvdXJjZSh0aGlzLnNlcnZpY2VOYW1lKTtcclxuXHJcbiAgICBjb25zdCBsb2dJdGVtID0gYCR7bWVzc2FnZS50b1N0cmluZygpfTsgJHtlcnJvci5zdGFja31gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGxvZ0l0ZW0pO1xyXG5cclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQuYWRkTWVzc2FnZShtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIGZpbmlzaFJlcXVlc3Qoc291cmNlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSZXF1ZXN0IGZvciBbJHtzb3VyY2VOYW1lfV0gYnkgJHt0aGlzLnNlcnZpY2VOYW1lfSBpcyBjb21wbGV0ZS5gXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgUHJlcGFyaW5nIHRvIHdyaXRlIG91dCB0aGUgZXJyb3JzLmBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5maWx0ZXIoXHJcbiAgICAgICAgZiA9PiBmLkRpc3BsYXlUb1VzZXIgJiYgZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICAgKS5mb3JFYWNoKGUgPT5cclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZS50b1N0cmluZygpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogVXNlIHRvIHByb3ZpZGUgdGhlIGFsZXJ0IHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBBbGVydE5vdGlmaWNhdGlvbiBhbmQgQWxlcnRDb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWxlcnRUeXBlcyB7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBJbmZvcm1hdGlvbjogc3RyaW5nID0gJ2FsZXJ0LWluZm8nO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgV2FybmluZzogc3RyaW5nID0gJ2FsZXJ0LXdhcm5pbmcnO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGFuZ2VyOiBzdHJpbmcgPSAnYWxlcnQtZGFuZ2VyJztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFN1Y2Nlc3M6IHN0cmluZyA9ICdhbGVydC1zdWNjZXNzJztcclxufVxyXG4iLCJpbXBvcnQgeyBBbGVydFR5cGVzIH0gZnJvbSAnLi9hbGVydC10eXBlcy5jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFsZXJ0Tm90aWZpY2F0aW9uIHtcclxuICB0eXBlOiBzdHJpbmcgPSBBbGVydFR5cGVzLkluZm9ybWF0aW9uOyAvLyBhbGVydC13YXJuaW5nLCBhbGVydC1zdWNjZXNzLCBhbGVydC1pbmZvLCBhbGVydC1kYW5nZXJcclxuICBoZWFkZXI6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIG1lc3NhZ2VzOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICBzaG93QWxlcnQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBoZWFkZXI6IHN0cmluZyxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlcz86IEFycmF5PHN0cmluZz4sXHJcbiAgICB0eXBlPzogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBpZiAodHlwZSkge1xyXG4gICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgaWYgKG1lc3NhZ2VzKSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oZWFkZXIgJiYgdGhpcy50aXRsZSkge1xyXG4gICAgICB0aGlzLnNob3dBbGVydCA9IHRydWU7IC8vIHVzZWQgdG8gdHJpZ2dlciB0aGUgZGlzcGxheSBvZiB0aGUgbm90aWZpY2F0aW9uLlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWVzc2FnZVR5cGUsXHJcbiAgU2VydmljZUNvbnRleHQsXHJcbiAgU2VydmljZU1lc3NhZ2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHtcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gIFNldmVyaXR5XHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbGVydE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vbW9kZWxzL2FsZXJ0LW5vdGlmaWNhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEFsZXJ0VHlwZXMgfSBmcm9tICcuL21vZGVscy9hbGVydC10eXBlcy5jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJhc2Uge1xyXG4gIGNvbXBvbmVudE5hbWU6IHN0cmluZztcclxuICBhbGVydE5vdGlmaWNhdGlvbjogQWxlcnROb3RpZmljYXRpb247XHJcbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29tcG9uZW50TmFtZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xyXG4gICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xyXG5cclxuICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgdGhpcy5nb29nbGVBbmFseXRpY3NQYWdldmlldyhldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gY29uc3Qgcm91dGVyRXZlbnQgPSB0aGlzLnJvdXRlci5ldmVudHMuZmlsdGVyKFxyXG4gICAgLy8gICBldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmRcclxuICAgIC8vICk7XHJcbiAgICAvLyBpZiAocm91dGVyRXZlbnQgJiYgcm91dGVyRXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAvLyAgIHRoaXMuZ29vZ2xlQW5hbHl0aWNzUGFnZXZpZXcocm91dGVyRXZlbnQpO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHNlbmQgYW4gYW5hbHl0aWMgZXZlbnQgdG8gW0dvb2dsZSBBbmFseXRpY3NdLlxyXG4gICAqIEBwYXJhbSBjYXRlZ29yeSBBIGNhdGVnb3J5IGlzIGEgbmFtZSB0aGF0IHlvdSBzdXBwbHkgYXMgYSB3YXkgdG8gZ3JvdXAgb2JqZWN0cyB0aGF0IHlvdSB3YW50IHRvIHRyYWNrLiBUeXBpY2FsbHksIHlvdSB3aWxsIHVzZSB0aGUgc2FtZSBjYXRlZ29yeSBuYW1lIG11bHRpcGxlIHRpbWVzIG92ZXIgcmVsYXRlZCBVSSBlbGVtZW50cyB0aGF0IHlvdSB3YW50IHRvIGdyb3VwIHVuZGVyIGEgZ2l2ZW4gY2F0ZWdvcnkuXHJcbiAgICogQHBhcmFtIGFjdGlvbiBVc2UgdGhlIGFjdGlvbiBwYXJhbWV0ZXIgdG8gbmFtZSB0aGUgdHlwZSBvZiBldmVudCBvciBpbnRlcmFjdGlvbiB5b3Ugd2FudCB0byB0cmFjayBmb3IgYSBwYXJ0aWN1bGFyIHdlYiBvYmplY3QgKGkuZS4sIHBsYXksIHN0b3AsIHBhdXNlLCBkb3dubG9hZCkuIEEgdW5pcXVlIGV2ZW50IGlzIGRldGVybWluZWQgYnkgYSB1bmlxdWUgYWN0aW9uIG5hbWUuIFlvdSBjYW4gdXNlIGR1cGxpY2F0ZSBhY3Rpb24gbmFtZXMgYWNyb3NzIGNhdGVnb3JpZXMsIGJ1dCB0aGlzIGNhbiBhZmZlY3QgaG93IHVuaXF1ZSBldmVudHMgYXJlIGNhbGN1bGF0ZWQuIFNlZSB0aGUgc3VnZ2VzdGlvbnMgYmVsb3cgYW5kIHRoZSBJbXBsaWNpdCBDb3VudCBzZWN0aW9uIGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICogQHBhcmFtIGxhYmVsIFByb3ZpZGUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmb3IgZXZlbnRzIHRoYXQgeW91IHdhbnQgdG8gdHJhY2ssIHN1Y2ggYXMgdGhlIG1vdmllIHRpdGxlIGluIHRoZSB2aWRlbyBleGFtcGxlcyBhYm92ZSwgb3IgdGhlIG5hbWUgb2YgYSBmaWxlIHdoZW4gdHJhY2tpbmcgZG93bmxvYWRzLiBBbGwgbGFiZWxzIGFyZSBsaXN0ZWQgaW5kZXBlbmRlbnRseSBmcm9tIHRoZWlyIHBhcmVudCBjYXRlZ29yaWVzIGFuZCBhY3Rpb25zLiBUaGlzIHByb3ZpZGVzIHlvdSB3aXRoIGFub3RoZXIgdXNlZnVsIHdheSB0byBzZWdtZW50IHRoZSBldmVudCBkYXRhIGZvciB5b3VyIHJlcG9ydHMuIEFsbCBsYWJlbHMgYXJlIGxpc3RlZCBpbmRlcGVuZGVudGx5IGZyb20gdGhlaXIgcGFyZW50IGNhdGVnb3JpZXMgYW5kIGFjdGlvbnMuIFRoaXMgcHJvdmlkZXMgeW91IHdpdGggYW5vdGhlciB1c2VmdWwgd2F5IHRvIHNlZ21lbnQgdGhlIGV2ZW50IGRhdGEgZm9yIHlvdXIgcmVwb3J0cy5cclxuICAgKiBAcGFyYW0gdmFsdWUgQW55IG51bWVyaWMgdmFsdWUgaW5kaWNhdGluZyBhIFt2YWx1ZV0gdGhhdCB3aWxsIGJlIHN1bW1hcml6ZWQgZm9yIHRoZSBhbmFseXRpYyBpdGVtKHMpLlxyXG4gICAqXHJcbiAgICogTW9yZSBpbmZvcm1hdGlvbiBhdDogaHR0cHM6Ly9zdXBwb3J0Lmdvb2dsZS5jb20vYW5hbHl0aWNzL2Fuc3dlci8xMDMzMDY4XHJcbiAgICogb3IgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2V2ZW50c1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnb29nbGVBbmFseXRpY3NTZW5kRXZlbnQoXHJcbiAgICBjYXRlZ29yeTogc3RyaW5nLFxyXG4gICAgYWN0aW9uOiBzdHJpbmcsXHJcbiAgICBsYWJlbDogc3RyaW5nLFxyXG4gICAgdmFsdWU6IG51bWJlclxyXG4gICkge1xyXG4gICAgKDxhbnk+d2luZG93KS5ndGFnKCdldmVudCcsIGFjdGlvbiwge1xyXG4gICAgICBldmVudF9jYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcclxuICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ29vZ2xlQW5hbHl0aWNzUGFnZXZpZXcoZXZlbnQ6IE5hdmlnYXRpb25FbmQpIHtcclxuICAgIGlmIChldmVudCAmJiBldmVudC51cmxBZnRlclJlZGlyZWN0cykge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFByZXBhcmluZyB0byBzZXQgW0dvb2dsZSBBbmFseXRpY3NdIHBhZ2UgdmlldyBmb3IgWyR7XHJcbiAgICAgICAgICBldmVudC51cmxBZnRlclJlZGlyZWN0c1xyXG4gICAgICAgIH1dLmBcclxuICAgICAgKTtcclxuICAgICAgLy8gKDxhbnk+d2luZG93KS5nYSgnc2V0JywgJ3BhZ2UnLCBldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XHJcbiAgICAgIC8vICg8YW55PndpbmRvdykuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcclxuICAgICAgLy8gZ2EoJ2NyZWF0ZScsICdVQS0xMTAxOTQzNDQtMScsICdhdXRvJywgdGhpcy5jb21wb25lbnROYW1lKTtcclxuICAgICAgLy8gZ2EoYCR7dGhpcy5jb21wb25lbnROYW1lfS5zZW5kYCwgJ3BhZ2V2aWV3Jyk7XHJcblxyXG4gICAgICAvLyBodHRwczovL2Jsb2cudGhlY29kZWNhbXB1cy5kZS9hbmd1bGFyLTItZ29vZ2xlLWFuYWx5dGljcy1nb29nbGUtdGFnLW1hbmFnZXIvXHJcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvcGFnZXNcclxuICAgICAgY29uc3QgR0FfVFJBQ0tJTkdfSUQgPSAnVUEtMTEwMTk0MzQ0LTEnO1xyXG4gICAgICAvLyBndGFnKCdjb25maWcnLCAnR0FfVFJBQ0tJTkdfSUQnLCB7PHBhZ2V2aWV3X3BhcmFtZXRlcnM+fSk7XHJcbiAgICAgICg8YW55PndpbmRvdykuZ2EoJ2NvbmZpZycsIEdBX1RSQUNLSU5HX0lELCB7XHJcbiAgICAgICAgcGFnZV90aXRsZTogdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIHBhZ2VfcGF0aDogZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHNcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuV2FybmluZyxcclxuICAgICAgICBgRmFpbGVkIHRvIHNldCBbR29vZ2xlIEFuYWx5dGljc10gcGFnZSB2aWV3LmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBzaW1wbGUgW0Vycm9yUmVzcG9uc2VdIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgY3JlYXRlRXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcpOiBFcnJvclJlc3BvbnNlIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBlcnJvciByZXNwb25zZSBmb3IgY29tcG9uZW50LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcclxuICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBoYW5kbGUgc2VydmljZSBlcnJvcnMuIFRoZXNlIGFyZSBlcnJvciByZXNwb25zZSBbU2VlOiBFcnJvclJlc3BvbnNlXSBmcm9tXHJcbiAgICogdGhlIGFwcGxpY2F0aW9uIGJ1c2luZXNzIGxheWVycyAoQWN0aW9uKHMpIG9yIEh0dHApIHRoYXQgd2lsbCBidWJibGUgdXAgdG8gdGhlXHJcbiAgICogY2FsbGVyIChpLmUuLCBhIGNvbXBvbmVudCkgaW4gYSBzcGVjaWZpZWQgZm9ybWF0OlxyXG4gICAqXHJcbiAgICogSXNTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7IC8vIGRlZmF1bHQgZm9yIEVycm9yUmVzcG9uc2VcclxuICAgKiBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICogRXJyb3JzOiBBcnJheTxTZXJ2aWNlRXJyb3I+ID0gbmV3IEFycmF5PFNlcnZpY2VFcnJvcj4oKTtcclxuICAgKiBFeGNlcHRpb246IGFueTtcclxuICAgKi9cclxuICBoYW5kbGVTZXJ2aWNlRXJyb3JzKFxyXG4gICAgZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSxcclxuICAgIHNlcnZpY2VDb250ZXh0PzogU2VydmljZUNvbnRleHRcclxuICApIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGhhbmRsZSBzZXJ2aWNlIGVycm9ycyBmb3IgY29tcG9uZW50LmBcclxuICAgICk7XHJcbiAgICBpZiAoc2VydmljZUNvbnRleHQgJiYgc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgIGBSZXRyaWV2aW5nIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIFNlcnZpY2VDb250ZXh0L1ZhbGlkYXRpb25Db250ZXh0O2BcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLnJldHJpZXZlU2VydmljZUNvbnRleHRFcnJvck1lc3NhZ2VzKHNlcnZpY2VDb250ZXh0KTtcclxuICAgICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbihcclxuICAgICAgICAnRXJyb3JzJyxcclxuICAgICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UsXHJcbiAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgQWxlcnRUeXBlcy5XYXJuaW5nXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZXJyb3JSZXNwb25zZSAmJiBlcnJvclJlc3BvbnNlLk1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgYFJldHJpZXZpbmcgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgW0Vycm9yUmVzcG9uc2VdLmBcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMucmV0cmlldmVSZXNwb25zZUVycm9yTWVzc2FnZXMoZXJyb3JSZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UsXHJcbiAgICAgICAgICBlcnJvcnMsXHJcbiAgICAgICAgICBBbGVydFR5cGVzLldhcm5pbmdcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgICBgRXJyb3I6ICR7ZXJyb3JSZXNwb25zZS5NZXNzYWdlfWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmV0cmlldmUgdGhlIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxyXG4gICAqXHJcbiAgICogQHBhcm06IHNlcnZpY2VDb250ZXh0OiBBIGNvbnRleHQgb2JqZWN0IGNvbnRhaW5pbmcgbWVzc2FnZXMgZm9yIHRoZSBzcGVjaWZpZWQgcmVxdWVzdC5cclxuICAgKi9cclxuICByZXRyaWV2ZVNlcnZpY2VDb250ZXh0RXJyb3JNZXNzYWdlcyhcclxuICAgIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dFxyXG4gICk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgY29uc3QgbWVzc2FnZXMgPSBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICBzZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICBpZiAoZS5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IgJiYgZS5EaXNwbGF5VG9Vc2VyKSB7XHJcbiAgICAgICAgbWVzc2FnZXMucHVzaChlLk1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtZXNzYWdlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgc3BlY2lmaWVkIFdlYiBBUEkgcmVzcG9uc2UuXHJcbiAgICovXHJcbiAgcmV0cmlldmVSZXNwb25zZUVycm9yTWVzc2FnZXMoZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSkge1xyXG4gICAgY29uc3QgZXJyb3JzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIGlmIChlcnJvclJlc3BvbnNlICYmIGVycm9yUmVzcG9uc2UuRXJyb3JzKSB7XHJcbiAgICAgIGVycm9yUmVzcG9uc2UuRXJyb3JzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgaWYgKGUuRGlzcGxheVRvVXNlcikge1xyXG4gICAgICAgICAgZXJyb3JzLnB1c2goZS5NZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVycm9ycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXNldCB0aGUgW0FsZXJ0Tm90aWZpY2F0aW9uXSB0byB0aGUgaW5pdGlhbCBzdGF0ZS4gUmVtb3Zlc1xyXG4gICAqIGV4aXN0aW5nIG1lc3NhZ2VzIGFuZCBoaWRlcyB0aGUgQWxlcnRDb21wb25lbnQuXHJcbiAgICovXHJcbiAgcmVzZXRBbGVydE5vdGlmaWNhdGlvbnMoKSB7XHJcbiAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKCcnLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gbmF2aWdhdGUgdG8gdGhlIHNwZWNpZmllZCByb3V0ZS5cclxuICAgKiBAcGFybSByb3V0ZU5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCByb3V0ZS5cclxuICAgKi9cclxuICBwdWJsaWMgcm91dGVUbyhyb3V0ZU5hbWU6IHN0cmluZykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JvdXRlTmFtZV0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgIGBFcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIG5hdmlnYXRlIHRvIFske3JvdXRlTmFtZX1dIHJvdXRlIGZyb20gJHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZVxyXG4gICAgICAgIH0uIEVycm9yOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJldHJpZXZlIGFuZCBzaG93IGFueSByZXNwb25zZSBlcnJvciBtZXNzYWdlcy5cclxuICAgKi9cclxuICBzaG93UmVzcG9uc2VFcnJvcnMocmVzcG9uc2U6IEVycm9yUmVzcG9uc2UpIHtcclxuICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhyZXNwb25zZSwgdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGZpbmlzaFJlcXVlc3QobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYCR7dGhpcy5jb21wb25lbnROYW1lfTogJHttZXNzYWdlfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2hvd0FsZXJ0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGFsZXJ0KG1lc3NhZ2UpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RNZXRob2QgfSBmcm9tICcuL2h0dHAtcmVxdWVzdC1tZXRob2RzLmVudW0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEh0dHBSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgcmVxdWVzdE1ldGhvZDogSHR0cFJlcXVlc3RNZXRob2Q7XHJcbiAgYm9keT86IGFueTtcclxuICBoZWFkZXJzPzogSHR0cEhlYWRlcnMgfCB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XHJcbiAgb2JzZXJ2ZT86ICdib2R5JztcclxuICBwYXJhbXM/OiBIdHRwUGFyYW1zIHwgeyBbcGFyYW06IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XHJcbiAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuO1xyXG4gIC8vIHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJztcclxuICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xyXG4gIHJlcXVlc3RVcmw6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIEh0dHBDbGllbnQsXHJcbiAgSHR0cEV2ZW50LFxyXG4gIEh0dHBIZWFkZXJzLFxyXG4gIEh0dHBQYXJhbXMsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9odHRwLXJlcXVlc3Qtb3B0aW9ucyc7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnLi9tb2RlbHMvaHR0cC1yZXF1ZXN0LW1ldGhvZHMuZW51bSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuaW1wb3J0IHsgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1yZXNwb25zZS5tb2RlbCc7XHJcbi8vIGltcG9ydCB7IFJlcXVlc3RNZXRob2QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gY3JlYXRlIGFuZCBleGVjdXRlIEhUVFAgc2VydmljZSByZXF1ZXN0cy5cclxuICogMS4gQ3JlYXRlIEh0dHBIZWFkZXJzXHJcbiAqIDIuIENyZWF0ZSBSZXF1ZXN0T3B0aW9uc1xyXG4gKiAzLiBFeGVjdXRlIFJlcXVlc3RcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBCYXNlU2VydmljZSB7XHJcbiAgcHVibGljIHNlcnZpY2VOYW1lID0gJ0h0dHBCYXNlU2VydmljZSc7XHJcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIFtIZWFkZXJdIGZvciBbbXVsdGlwYXJ0L2Zvcm0tZGF0YV0uXHJcbiAgICovXHJcbiAgY3JlYXRlTXVsdGlwYXJ0Rm9ybURhdGFIZWFkZXIocmVxdWlyZXNBdXRoVG9rZW46IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBjcmVhdGUgaGVhZGVyIGZvciB0aGUgW211bHRpcGFydC9mb3JtLWRhdGFdIEhUVFAgcmVxdWVzdC4gUmVxdWlyZXNBdXRoVG9rZW46ICR7cmVxdWlyZXNBdXRoVG9rZW59LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICBpZiAocmVxdWlyZXNBdXRoVG9rZW4pIHtcclxuICAgICAgLy8gY3JlYXRlIGhlYWRlciByZXF1ZXN0IHdpdGggc2VjdXJpdHkgdG9rZW47XHJcbiAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMuYWNjZXNzVG9rZW59YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBbSGVhZGVyXSBmb3IgQ29udGVudC1UeXBlIFthcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRdLlxyXG4gICAqL1xyXG4gIGNyZWF0ZUZvcm1VcmxlbmNvZGVkSGVhZGVyKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBoZWFkZXIgZm9yIHRoZSBbYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXSBIVFRQIHJlcXVlc3QuYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gY3JlYXRlIGEgW0hlYWRlcl0gZm9yIHRoZSBIVFRQIHJlcXVlc3QuIElmIHRoZSBbcmVxdWlyZXNBdXRoVG9rZW5dIGluZGljYXRvclxyXG4gICAqIGlzIHRydWUsIHRoZSByZXF1ZXN0IHdpbGwgdXNlIHRoZSBjdXJyZW50IEF1dGhvcml6YXRpb24gc2VjdXJpdHkgdG9rZW4uXHJcbiAgICogQHBhcmFtIGlzU2VjdXJlXHJcbiAgICovXHJcbiAgY3JlYXRlSGVhZGVyKHJlcXVpcmVzQXV0aFRva2VuOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGhlYWRlciBmb3IgdGhlIEhUVFAgcmVxdWVzdC4gUmVxdWlyZXNBdXRoVG9rZW46ICR7cmVxdWlyZXNBdXRoVG9rZW59LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcclxuICAgIGlmIChyZXF1aXJlc0F1dGhUb2tlbikge1xyXG4gICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLmFjY2Vzc1Rva2VufWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IEh0dHBSZXF1ZXN0T3B0aW9ucyBpdGVtIGZvciBhIHJlcXVlc3QuXHJcbiAgICogQHBhcmFtIGhlYWRlcnMgVXNlIHRvIHN1cHBseSBoZWFkZXIgaW5mb3JtYXRpb24gaW4gdGhlIHJlcXVlc3QuXHJcbiAgICogQHBhcmFtIHVybCBVc2UgdG8gaW5kaWNhdGUgdGhlIFVSTCBvZiB0aGUgd2ViIGFwaS5cclxuICAgKiBAcGFyYW0gYm9keSBVc2UgdG8gcHJvdmlkZSBhIGRhdGEgcGF5bG9hZCBmb3IgdGhlIHJlcXVlc3QuXHJcbiAgICovXHJcbiAgY3JlYXRlUmVxdWVzdE9wdGlvbnMoXHJcbiAgICBtZXRob2Q6IEh0dHBSZXF1ZXN0TWV0aG9kLFxyXG4gICAgaGVhZGVyczogSHR0cEhlYWRlcnMsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIGJvZHk6IGFueVxyXG4gICkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSByZXF1ZXN0IG9wdGlvbnMgZm9yIHRoZSBIVFRQIHJlcXVlc3QuYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgSHR0cFJlcXVlc3RPcHRpb25zKCk7XHJcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xyXG4gICAgb3B0aW9ucy5yZXF1ZXN0VXJsID0gdXJsO1xyXG4gICAgb3B0aW9ucy5ib2R5ID0gYm9keTtcclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBleGVjdXRlIGFuIEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIGhlYWRlciBhbmQgVVJMLlxyXG4gICAqL1xyXG4gIGV4ZWN1dGVSZXF1ZXN0KFxyXG4gICAgcmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gZXhlY3V0ZSBIVFRQIHJlcXVlc3QuIFVybDogJHtyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsfWBcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFNlcnZpY2VSZXNwb25zZT4oXHJcbiAgICAgIHJlcXVlc3RPcHRpb25zLnJlcXVlc3RNZXRob2QudG9TdHJpbmcoKSxcclxuICAgICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCxcclxuICAgICAgcmVxdWVzdE9wdGlvbnNcclxuICAgICk7XHJcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAvLyAgIC5yZXF1ZXN0KG5ldyBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zKSlcclxuICAgIC8vICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpIC8vIG1hcHMgdGhlIG9ic2VydmFibGUgcmVzcG9uc2UgdG8gYSBKU09OIG9iamVjdDtcclxuICAgIC8vICAgLmNhdGNoKGVycm9yID0+IHRoaXMuaGFuZGxlSHR0cEVycm9yKGVycm9yLCByZXF1ZXN0T3B0aW9ucykpOyAvLyB1c2UgdG8gaGFuZGxlIGFueSBleGNlcHRpb24gZHVyaW5nIHNlcnZpY2UgY2FsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBleGVjdXRlIGFuIEhUVFAgW2dldF0gcmVxdWVzdCB1c2luZyB0aGUgc3BlY2lmaWVkIHVybCBhbmQgb3B0aW9ucy5cclxuICAgKi9cclxuICBnZXQ8U2VydmljZVJlc3BvbnNlPihcclxuICAgIHJlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgcmVxdWVzdE9wdGlvbnMucmVxdWVzdE1ldGhvZCA9IEh0dHBSZXF1ZXN0TWV0aG9kLkdFVDtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQ8U2VydmljZVJlc3BvbnNlPihyZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgICAgLnBpcGUoKTtcclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZXhlY3V0ZSBhbiBIVFRQIFtwb3N0XSByZXF1ZXN0IHVzaW5nIHRoZSBzcGVjaWZpZWQgdXJsIGFuZCBvcHRpb25zLlxyXG4gICAqIEBwYXJhbSByZXF1ZXN0T3B0aW9ucyB1c2UgdG8gZGVmaW5lIHRoZSBvcHRpb25zIGZvciB0aGUgc3BlY2lmaWVkIHJlcXVlc3QuXHJcbiAgICovXHJcbiAgcG9zdDxTZXJ2aWNlUmVzcG9uc2U+KFxyXG4gICAgcmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0TWV0aG9kID0gSHR0cFJlcXVlc3RNZXRob2QuUE9TVDtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0PFNlcnZpY2VSZXNwb25zZT4ocmVxdWVzdE9wdGlvbnMucmVxdWVzdFVybCwgcmVxdWVzdE9wdGlvbnMpXHJcbiAgICAgIC5waXBlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBIVFRQIGVycm9ycyB3aGVuIGNhbGxpbmcgd2ViIGFwaShzKS5cclxuICAgKi9cclxuICBoYW5kbGVIdHRwRXJyb3IoXHJcbiAgICBlcnJvcjogYW55LFxyXG4gICAgcmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtlcnJvci50b1N0cmluZygpfSAke1xyXG4gICAgICByZXF1ZXN0T3B0aW9ucy5yZXF1ZXN0VXJsXHJcbiAgICB9LCAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RPcHRpb25zLmJvZHkpfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICBpZiAoZXJyb3IgJiYgZXJyb3IuX2JvZHkpIHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRoaXMgaXMgYW4gZXJyb3IgdGhhdCBjb250YWlucyBhIGJvZHkgLSBhIFtSZXNwb25zZV0gZnJvbSB0aGUgYXBwbGljYXRpb24gd2ViIGFwaS4gSW5jbHVkZXM6XHJcbiAgICAgICAqIDEuIElzU3VjY2Vzc1xyXG4gICAgICAgKiAyLiBNZXNzYWdlXHJcbiAgICAgICAqIDMuIEFycmF5IG9mIFNlcnZpY2VFcnJvciBpdGVtc1xyXG4gICAgICAgKiA0LiBFeGNlcHRpb24gKG9wdGlvbmFsKVxyXG4gICAgICAgKi9cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZTogRXJyb3JSZXNwb25zZSA9IGVycm9yLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XHJcbiAgICAgICAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gVE9ETzogUkVUUklFVkUgRVJST1IgREVUQUlMUzsgU1RBVFVTLCBNRVNTQUdFOyBFVEMuIEFORCBQUk9WSURFIFRPIEhBTkRMRVI7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICBjb25zdCBlcnIgPSA8RXJyb3I+ZXg7XHJcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7ZXJyLm5hbWV9OyAke2Vyci5tZXNzYWdlfWA7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuZXhwZWN0ZWRFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3I/OiBFcnJvcikge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2UoZXJyb3IpO1xyXG4gICAgY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcclxuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRXJyb3JSZXNwb25zZShlcnJvcj86IEVycm9yKTogRXJyb3JSZXNwb25zZSB7XHJcbiAgICBsZXQgbWVzc2FnZSA9ICdVbmV4cGVjdGVkIGVycm9yIHdoaWxlIHByb2Nlc3NpbmcgcmVzcG9uc2UuJztcclxuICAgIGNvbnN0IHJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcclxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgIG1lc3NhZ2UgPSBgJHtlcnJvci5uYW1lfSAtICR7ZXJyb3IubWVzc2FnZX1gO1xyXG4gICAgICByZXNwb25zZS5FeGNlcHRpb24gPSBlcnJvcjtcclxuICAgIH1cclxuICAgIHJlc3BvbnNlLk1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogVXNlIHRoaXMgbW9kZWwgdG8gcmVwcmVzZW50IHNlcnZpY2UgZXJyb3IvbWVzc2FnZSBpbmZvcm1hdGlvbiBmcm9tIHRoZVxyXG4gKiBhcHBsaWNhdGlvbidzIHNlcnZpY2UgQVBJcy5cclxuICpcclxuICogVGhlIERpc3BsYXlUb1VzZXIgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgbWVzc2FnZSBzaG91bGQgYmVcclxuICogZGlzcGxheWVkIHRvIHRoZSB1c2VyIGlmIGRlc2lyZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmljZUVycm9yIHtcclxuICAvLyBcIntcIklzU3VjY2Vzc1wiOmZhbHNlLFxyXG4gIC8vIFwiTWVzc2FnZVwiOlwiRmFpbGVkIHRvIGNyZWF0ZSBuZXcgdXNlciBhY2NvdW50LlwiLFxyXG4gIC8vIFwiRXJyb3JzXCI6W3tcIk5hbWVcIjpcIlBhc3N3b3JkRm9ybWF0SXNWYWxpZFwiLFxyXG4gIC8vIFwiTWVzc2FnZVwiOlwiVGhlIHBhc3N3b3JkIGZvcm1hdCBpcyBub3QgdmFsaWQuIE11c3QgY29udGFpbiBhdCBsZWFzdCBvbmU6IGFscGhhLCBudW1lcmljLCBhbmQgc3BlY2lhbCBjaGFyYWN0ZXIuXCIsXHJcbiAgLy8gXCJFeGNlcHRpb25cIjpudWxsLFwiU291cmNlXCI6XCJDcmVhdGVMZWFybmVyQWNjb3VudEFjdGlvblwiLFxyXG4gIC8vIERpc3BsYXlUb1VzZXJcIjp0cnVlLFwiVGFyZ2V0XCI6XCJcIn1dfVwiXHJcblxyXG4gIE5hbWU6IHN0cmluZztcclxuICBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgRXhjZXB0aW9uOiBhbnk7XHJcbiAgRGlzcGxheVRvVXNlcjogYm9vbGVhbjtcclxuICBTb3VyY2U6IHN0cmluZztcclxuICBUYXJnZXQ6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL3NlcnZpY2UtZXJyb3IubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VSZXNwb25zZSB7XHJcbiAgSXNTdWNjZXNzOiBib29sZWFuO1xyXG4gIE1lc3NhZ2U6IHN0cmluZztcclxuICBEYXRhOiBhbnk7XHJcbiAgRXJyb3JzOiBBcnJheTxTZXJ2aWNlRXJyb3I+ID0gbmV3IEFycmF5PFNlcnZpY2VFcnJvcj4oKTtcclxufVxyXG4iXSwibmFtZXMiOlsiTmdNb2R1bGUiLCJBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIiwiU2VydmljZUNvbnRleHQiLCJTZXJ2aWNlTWVzc2FnZSIsIk1lc3NhZ2VUeXBlIiwiU2V2ZXJpdHkiLCJCZWhhdmlvclN1YmplY3QiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIkFjdGlvblJlc3VsdCIsIk9ic2VydmFibGUiLCJDb21wb3NpdGVSdWxlIiwiQWN0aW9uIiwicm91dGVyIiwiTmF2aWdhdGlvbkVuZCIsImh0dHAiLCJIdHRwSGVhZGVycyIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O29CQUtDQSxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLENBQUNDLG1DQUEyQixFQUFFQyxtQkFBWSxFQUFFQywyQ0FBK0IsQ0FBQztxQkFDdEY7OzZDQVBEOzs7Ozs7O0FDRUEsUUFBQTs7NkJBQ2MsS0FBSzswQkFFYSxJQUFJLEtBQUssRUFBZ0I7OzRCQUx6RDtRQU9DOzs7Ozs7QUNQRDs7OztBQXFCQTs7O1FBQUE7Ozs7Ozs7OztRQWFFLHFCQUFtQixjQUE0QztZQUE1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBOEI7K0JBWmpELEVBQUU7a0NBRWlCLElBQUlDLDBCQUFjLEVBQUU7U0FVYzs7Ozs7Ozs7Ozs7O1FBT25FLGlDQUFXOzs7Ozs7WUFBWCxVQUFZLFFBQWtCO2dCQUM1QixxQkFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM3QixPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7YUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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