(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angularlicious/core'), require('@angular/router'), require('@angular/core'), require('@angularlicious/foundation'), require('@angularlicious/logging'), require('@angular/forms'), require('@angular/common/http'), require('@angularlicious/rules-engine'), require('@angularlicious/configuration')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/security', ['exports', '@angular/common', '@angularlicious/core', '@angular/router', '@angular/core', '@angularlicious/foundation', '@angularlicious/logging', '@angular/forms', '@angular/common/http', '@angularlicious/rules-engine', '@angularlicious/configuration'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.security = {}),global.ng.common,global.core,global.ng.router,global.ng.core,global.foundation,global.logging,global.ng.forms,global.ng.common.http,global.rules,global.configuration));
}(this, (function (exports,common,core,router,core$1,foundation,logging,forms,http,rules,configuration) { 'use strict';

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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SecurityActionBase = /** @class */ (function (_super) {
        __extends(SecurityActionBase, _super);
        function SecurityActionBase() {
            return _super.call(this) || this;
        }
        /**
         * Use the [Do] method to perform the action.
         */
        /**
         * Use the [Do] method to perform the action.
         * @param {?} businessProvider
         * @return {?}
         */
        SecurityActionBase.prototype.Do = /**
         * Use the [Do] method to perform the action.
         * @param {?} businessProvider
         * @return {?}
         */
            function (businessProvider) {
                this.businessProvider = businessProvider;
                this.serviceContext = businessProvider.serviceContext;
                this.loggingService = businessProvider.loggingService;
                this.execute();
            };
        return SecurityActionBase;
    }(foundation.ActionBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RegisterSubscriberAction = /** @class */ (function (_super) {
        __extends(RegisterSubscriberAction, _super);
        function RegisterSubscriberAction(subscriber) {
            var _this = _super.call(this) || this;
            _this.subscriber = subscriber;
            _this.actionName = 'RegisterSubscriberAction';
            return _this;
        }
        /**
         * Override this method from the base [Action] class to allow for rules to be added to the
         * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
         * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
         * of the [Action] framework.
         */
        /**
         * Override this method from the base [Action] class to allow for rules to be added to the
         * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
         * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
         * of the [Action] framework.
         * @return {?}
         */
        RegisterSubscriberAction.prototype.preValidateAction = /**
         * Override this method from the base [Action] class to allow for rules to be added to the
         * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
         * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
         * of the [Action] framework.
         * @return {?}
         */
            function () {
                console.log("Running the [preValidateAction] for the " + this.actionName + " action.");
                this.validationContext
                    .withSource(this.actionName)
                    .addRule(new rules.StringIsNotNullEmptyRange('NameIsValid', 'The name value is not valid. Must be between 1-40 characters.', this.subscriber.Name, 2, 40, true))
                    .addRule(new rules.StringIsNotNullEmptyRange('EmailIsValid', 'The email address value is not valid. Must be between 5-60 characters.', this.subscriber.EmailAddress, 5, 60, true));
            };
        /**
         * Use this method to provide business logic implementation - this method is allowed to execute only if the current action
         * does not contain any rule violations.
         */
        /**
         * Use this method to provide business logic implementation - this method is allowed to execute only if the current action
         * does not contain any rule violations.
         * @return {?}
         */
        RegisterSubscriberAction.prototype.performAction = /**
         * Use this method to provide business logic implementation - this method is allowed to execute only if the current action
         * does not contain any rule violations.
         * @return {?}
         */
            function () {
                this.loggingService.log(this.actionName, logging.Severity.Information, "Running the [performAction] for the " + this.actionName + ".");
                this.response = this.businessProvider.securityApiService.registerSubscriber(this.subscriber);
            };
        return RegisterSubscriberAction;
    }(SecurityActionBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SecurityApiService = /** @class */ (function (_super) {
        __extends(SecurityApiService, _super);
        function SecurityApiService(http$$1, httpService, loggingService) {
            var _this = _super.call(this, http$$1, loggingService) || this;
            _this.httpService = httpService;
            return _this;
        }
        /**
         * @param {?} subscriber
         * @return {?}
         */
        SecurityApiService.prototype.registerSubscriber = /**
         * @param {?} subscriber
         * @return {?}
         */
            function (subscriber) {
                /** @type {?} */
                var requestUrl = 'api/subscriber/register';
                /** @type {?} */
                var message = this.serviceName + " preparing to call: " + requestUrl;
                this.loggingService.log(this.serviceName, logging.Severity.Information, message);
                /** @type {?} */
                var body = JSON.stringify(subscriber);
                /** @type {?} */
                var options = this.httpService.createRequestOptions(foundation.HttpRequestMethod.post, this.httpService.createHeader(false), requestUrl, body);
                return this.httpService.post(options);
                /**TEMPORARY IMPLEMENTATION */
                // const response = new ServiceResponse();
                // response.IsSuccess = true;
                // response.Message = `Fake message from ${this.serviceName}`;
                // response.Data = true;
                // const subject: BehaviorSubject<any> = new BehaviorSubject(response);
                // return subject.asObservable();
                /**TEMPORARY IMPLEMENTATION */
            };
        SecurityApiService.decorators = [
            { type: core$1.Injectable }
        ];
        /** @nocollapse */
        SecurityApiService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: foundation.HttpBaseService },
                { type: logging.AngularliciousLoggingService }
            ];
        };
        return SecurityApiService;
    }(foundation.HttpBaseService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SecurityBusinessProviderService = /** @class */ (function (_super) {
        __extends(SecurityBusinessProviderService, _super);
        function SecurityBusinessProviderService(loggingService, securityApiService) {
            var _this = _super.call(this, loggingService) || this;
            _this.securityApiService = securityApiService;
            return _this;
        }
        /**
         * Use action to register a new subscriber.
         * @param subscriber
         */
        /**
         * Use action to register a new subscriber.
         * @param {?} subscriber
         * @return {?}
         */
        SecurityBusinessProviderService.prototype.registerSubscriber = /**
         * Use action to register a new subscriber.
         * @param {?} subscriber
         * @return {?}
         */
            function (subscriber) {
                /** @type {?} */
                var action = new RegisterSubscriberAction(subscriber);
                action.Do(this);
                return action.response;
            };
        SecurityBusinessProviderService.decorators = [
            { type: core$1.Injectable }
        ];
        /** @nocollapse */
        SecurityBusinessProviderService.ctorParameters = function () {
            return [
                { type: logging.AngularliciousLoggingService },
                { type: SecurityApiService }
            ];
        };
        return SecurityBusinessProviderService;
    }(foundation.ServiceBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Subscriber = /** @class */ (function () {
        /**
         * Use to create a new subscriber for the application. This is not an account - only
         * a subscription to resources from the application.
         * @param subscriberName\
         * @param subscriberEmail
         */
        function Subscriber(subscriberName, subscriberEmail) {
            this.SubscriptionStart = new Date();
            this.Name = subscriberName;
            this.EmailAddress = subscriberEmail;
        }
        return Subscriber;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AngularliciousSecurityService = /** @class */ (function (_super) {
        __extends(AngularliciousSecurityService, _super);
        function AngularliciousSecurityService(loggingService, businessProvider) {
            var _this = _super.call(this, loggingService) || this;
            _this.businessProvider = businessProvider;
            _this.serviceName = 'AngularliciousSecurityService';
            _this.businessProvider.serviceContext = _this.serviceContext;
            _this.businessProvider.loggingService = _this.loggingService;
            return _this;
        }
        /**
         * Use to register a new subscriber to the application.
         * @param subscriber contains the user name and email address for the subscriber.
         */
        /**
         * Use to register a new subscriber to the application.
         * @param {?} subscriber contains the user name and email address for the subscriber.
         * @return {?}
         */
        AngularliciousSecurityService.prototype.registerSubscriber = /**
         * Use to register a new subscriber to the application.
         * @param {?} subscriber contains the user name and email address for the subscriber.
         * @return {?}
         */
            function (subscriber) {
                /** @type {?} */
                var message = "Preparing to register subscriber: " + JSON.stringify(subscriber);
                this.loggingService.log(this.serviceName, logging.Severity.Information, message);
                return this.businessProvider.registerSubscriber(subscriber);
            };
        /**
         * Use to verify the specified service.
         */
        /**
         * Use to verify the specified service.
         * @return {?}
         */
        AngularliciousSecurityService.prototype.verifyService = /**
         * Use to verify the specified service.
         * @return {?}
         */
            function () {
                if (this.loggingService &&
                    this.businessProvider &&
                    this.businessProvider.securityApiService)
                    return true;
            };
        AngularliciousSecurityService.decorators = [
            { type: core$1.Injectable }
        ];
        /** @nocollapse */
        AngularliciousSecurityService.ctorParameters = function () {
            return [
                { type: logging.AngularliciousLoggingService },
                { type: SecurityBusinessProviderService }
            ];
        };
        return AngularliciousSecurityService;
    }(foundation.ServiceBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RegisterSubscriberComponent = /** @class */ (function (_super) {
        __extends(RegisterSubscriberComponent, _super);
        function RegisterSubscriberComponent(securityService, loggingService, formBuilder, router$$1) {
            var _this = _super.call(this, 'RegisterSubscriberComponent', loggingService, router$$1) || this;
            _this.securityService = securityService;
            _this.formBuilder = formBuilder;
            _this.subscribe = new core$1.EventEmitter();
            return _this;
        }
        /**
         * @return {?}
         */
        RegisterSubscriberComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.buildForm();
            };
        /**
         * @return {?}
         */
        RegisterSubscriberComponent.prototype.buildForm = /**
         * @return {?}
         */
            function () {
                this._form = this.formBuilder.group({
                    subscriberName: ['', forms.Validators.required],
                    emailAddress: ['', forms.Validators.required]
                });
            };
        /**
         * @return {?}
         */
        RegisterSubscriberComponent.prototype.submitForm = /**
         * @return {?}
         */
            function () {
                this.securityService.resetServiceContext();
                this.subscriber = new Subscriber(this._form.value.subscriberName, this._form.value.emailAddress);
                this.subscribeUser(this.subscriber);
            };
        /**
         * @param {?} subscriber
         * @return {?}
         */
        RegisterSubscriberComponent.prototype.subscribeUser = /**
         * @param {?} subscriber
         * @return {?}
         */
            function (subscriber) {
                var _this = this;
                this.securityService
                    .registerSubscriber(subscriber)
                    .subscribe(function (response) { return _this.handleSubscribeUser(response); }, function (error) {
                    return _this.handleServiceErrors(error, _this.securityService.serviceContext);
                }, function () { return _this.finishRequest(_this.componentName); });
            };
        /**
         * @param {?} response
         * @return {?}
         */
        RegisterSubscriberComponent.prototype.handleSubscribeUser = /**
         * @param {?} response
         * @return {?}
         */
            function (response) {
                /** @type {?} */
                var functionName = 'handleSubscribeUser';
                /** @type {?} */
                var logMessage = "[" + functionName + "]: Preparing to handle the response from the [SecurityService] in the " + this.componentName + ".";
                this.loggingService.log(this.componentName, logging.Severity.Information, logMessage);
                if (response) {
                    if (response.IsSuccess) {
                        /** @type {?} */
                        var successMessage = "Successfully processed request to create subscriber. Prepare to download...";
                        this.loggingService.log(this.componentName, logging.Severity.Information, successMessage);
                        this.subscribe.emit(( /** @type {?} */(response)));
                    }
                    else {
                        this.handleServiceErrors(
                        // response as ErrorResponse,
                        null, this.securityService.serviceContext);
                    }
                }
            };
        RegisterSubscriberComponent.decorators = [
            { type: core$1.Component, args: [{
                        // tslint:disable-next-line:component-selector
                        selector: 'bm-register-subscriber',
                        template: "<angularlicious-alert [alertNotification]=\"alertNotification\" [hasMessage]=\"alertNotification.showAlert\"></angularlicious-alert>\r\n<!-- SUBSCRIBE SIGN-UP FORM -->\r\n<form [formGroup]=\"_form\" (ngSubmit)=\"submitForm()\">\r\n  <!-- SUBSCRIBER NAME -->\r\n  <div class=\"input-group form-group-no-border\">\r\n    <span class=\"input-group-addon\">\r\n      <i class=\"now-ui-icons users_circle-08\"></i>\r\n    </span>\r\n    <input type=\"text\" formControlName=\"subscriberName\" class=\"form-control\" placeholder=\"Name...\">\r\n  </div>\r\n  <!-- SUBSCRIBER EMAIL -->\r\n  <div class=\"input-group form-group-no-border\">\r\n    <span class=\"input-group-addon\">\r\n      <i class=\"now-ui-icons ui-1_email-85\"></i>\r\n    </span>\r\n    <input type=\"text\" formControlName=\"emailAddress\" class=\"form-control\" placeholder=\"Email...\">\r\n  </div>\r\n  <!-- SUBSCRIBE BUTTON -->\r\n  <button class=\"btn btn-neutral btn-round btn-lg\">Subscribe\r\n    <i class=\"fa fa-check ml-1\"></i>\r\n  </button>\r\n</form>\r\n<!-- SUBSCRIBE SIGN-UP FORM -->",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        RegisterSubscriberComponent.ctorParameters = function () {
            return [
                { type: AngularliciousSecurityService },
                { type: logging.AngularliciousLoggingService },
                { type: forms.FormBuilder },
                { type: router.Router }
            ];
        };
        RegisterSubscriberComponent.propDecorators = {
            subscribe: [{ type: core$1.Output }]
        };
        return RegisterSubscriberComponent;
    }(foundation.ComponentBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AngularliciousSecurityModule = /** @class */ (function () {
        function AngularliciousSecurityModule() {
        }
        /**
         * @param {?} config
         * @return {?}
         */
        AngularliciousSecurityModule.forRoot = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                return {
                    ngModule: AngularliciousSecurityModule,
                    providers: [
                        {
                            provide: configuration.LoggingConfig,
                            useValue: config
                        },
                        http.HttpClientModule
                    ]
                };
            };
        AngularliciousSecurityModule.decorators = [
            { type: core$1.NgModule, args: [{
                        imports: [
                            logging.AngularliciousLoggingModule,
                            foundation.AngularliciousFoundationModule,
                            core.AngularliciousCoreModule,
                            rules.AngularliciousRulesEngineModule,
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            http.HttpClientModule
                        ],
                        declarations: [RegisterSubscriberComponent],
                        exports: [RegisterSubscriberComponent],
                        providers: [
                            logging.AngularliciousLoggingService,
                            SecurityApiService,
                            SecurityBusinessProviderService //PROVIDE INTERNAL SERVICES FOR THE MODULE; SCOPED TO THIS MODULE;
                        ]
                    },] }
        ];
        return AngularliciousSecurityModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.AngularliciousSecurityModule = AngularliciousSecurityModule;
    exports.AngularliciousSecurityService = AngularliciousSecurityService;
    exports.RegisterSubscriberComponent = RegisterSubscriberComponent;
    exports.Subscriber = Subscriber;
    exports.ɵb = SecurityApiService;
    exports.ɵa = SecurityBusinessProviderService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=angularlicious-security.umd.js.map