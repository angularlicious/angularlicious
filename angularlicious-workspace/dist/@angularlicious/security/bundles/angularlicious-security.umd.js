(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angularlicious/foundation'), require('@angularlicious/rules-engine'), require('@angularlicious/logging'), require('@angular/core'), require('@angular/common/http'), require('@angular/router'), require('@angular/forms'), require('@angular/common'), require('@angularlicious/core'), require('@angularlicious/configuration')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/security', ['exports', '@angularlicious/foundation', '@angularlicious/rules-engine', '@angularlicious/logging', '@angular/core', '@angular/common/http', '@angular/router', '@angular/forms', '@angular/common', '@angularlicious/core', '@angularlicious/configuration'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.security = {}),null,null,null,global.ng.core,global.ng.common.http,global.ng.router,global.ng.forms,global.ng.common,null,null));
}(this, (function (exports,foundation,rules,logging,core,http,router,forms,common,core$1,configuration) { 'use strict';

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
    var SecurityActionBase = (function (_super) {
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
                // Provide the [SecurityBusinessProviderService], [ServiceContext], and [LoggingService] to action;
                this.businessProvider = businessProvider;
                this.serviceContext = businessProvider.serviceContext;
                this.loggingService = businessProvider.loggingService;
                this.execute();
            };
        return SecurityActionBase;
    }(foundation.ActionBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var RegisterSubscriberAction = (function (_super) {
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
     * @suppress {checkTypes} checked by tsc
     */
    var SecurityApiService = (function (_super) {
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
                var /** @type {?} */ requestUrl = 'api/subscriber/register';
                var /** @type {?} */ message = this.serviceName + " preparing to call: " + requestUrl;
                this.loggingService.log(this.serviceName, logging.Severity.Information, message);
                var /** @type {?} */ body = JSON.stringify(subscriber);
                var /** @type {?} */ options = this.httpService.createRequestOptions(foundation.HttpRequestMethod.POST, this.httpService.createHeader(false), requestUrl, body);
                return this.httpService.get(options);
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        SecurityApiService.ctorParameters = function () {
            return [
                { type: http.HttpClient, },
                { type: foundation.HttpBaseService, },
                { type: logging.AngularliciousLoggingService, },
            ];
        };
        return SecurityApiService;
    }(foundation.HttpBaseService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var SecurityBusinessProviderService = (function (_super) {
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
                var /** @type {?} */ action = new RegisterSubscriberAction(subscriber);
                action.Do(this);
                return action.response;
            };
        SecurityBusinessProviderService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        SecurityBusinessProviderService.ctorParameters = function () {
            return [
                { type: logging.AngularliciousLoggingService, },
                { type: SecurityApiService, },
            ];
        };
        return SecurityBusinessProviderService;
    }(foundation.ServiceBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Subscriber = (function () {
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
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousSecurityService = (function (_super) {
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
                var /** @type {?} */ message = "Preparing to register subscriber: " + JSON.stringify(subscriber);
                this.loggingService.log(this.serviceName, logging.Severity.Information, message);
                return this.businessProvider.registerSubscriber(subscriber);
            };
        // /**
        //  * Use to confirm a new subscriber.
        //  * @param confirmationToken contains the user name and a [Hash] value that is used to confirm the user.
        //  */
        // confirmSubscriber(confirmationToken: ConfirmationToken) {
        //   this.loggingService.log(this.serviceName, Severity.Information, `Preparing to confirm subscriber.`);
        //   return this.businessProvider.confirmSubscriber(confirmationToken)
        // }
        /**
         * @return {?}
         */
        AngularliciousSecurityService.prototype.verifyService = /**
         * @return {?}
         */
            function () {
                if (this.loggingService &&
                    this.businessProvider &&
                    this.businessProvider.securityApiService)
                    return true;
            };
        AngularliciousSecurityService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AngularliciousSecurityService.ctorParameters = function () {
            return [
                { type: logging.AngularliciousLoggingService, },
                { type: SecurityBusinessProviderService, },
            ];
        };
        return AngularliciousSecurityService;
    }(foundation.ServiceBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var RegisterSubscriberComponent = (function (_super) {
        __extends(RegisterSubscriberComponent, _super);
        function RegisterSubscriberComponent(securityService, loggingService, formBuilder, router$$1) {
            var _this = _super.call(this, 'RegisterSubscriberComponent', loggingService, router$$1) || this;
            _this.securityService = securityService;
            _this.formBuilder = formBuilder;
            _this.subscribe = new core.EventEmitter();
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
                var /** @type {?} */ functionName = 'handleSubscribeUser';
                var /** @type {?} */ logMessage = "[" + functionName + "]: Preparing to handle the response from the [SecurityService] in the " + this.componentName + ".";
                this.loggingService.log(this.componentName, logging.Severity.Information, logMessage);
                if (response) {
                    if (response.IsSuccess) {
                        var /** @type {?} */ successMessage = "Successfully processed request to create subscriber. Prepare to download...";
                        this.loggingService.log(this.componentName, logging.Severity.Information, successMessage);
                        this.subscribe.emit(/** @type {?} */ (response));
                    }
                    else {
                        this.handleServiceErrors(null, this.securityService.serviceContext);
                    }
                }
            };
        RegisterSubscriberComponent.decorators = [
            { type: core.Component, args: [{
                        // tslint:disable-next-line:component-selector
                        selector: 'bm-register-subscriber',
                        template: "<angularlicious-alert [alertNotification]=\"alertNotification\" [hasMessage]=\"alertNotification.showAlert\"></angularlicious-alert>\n<!-- SUBSCRIBE SIGN-UP FORM -->\n<form [formGroup]=\"_form\" (ngSubmit)=\"submitForm()\">\n  <!-- SUBSCRIBER NAME -->\n  <div class=\"input-group form-group-no-border\">\n    <span class=\"input-group-addon\">\n      <i class=\"now-ui-icons users_circle-08\"></i>\n    </span>\n    <input type=\"text\" formControlName=\"subscriberName\" class=\"form-control\" placeholder=\"Name...\">\n  </div>\n  <!-- SUBSCRIBER EMAIL -->\n  <div class=\"input-group form-group-no-border\">\n    <span class=\"input-group-addon\">\n      <i class=\"now-ui-icons ui-1_email-85\"></i>\n    </span>\n    <input type=\"text\" formControlName=\"emailAddress\" class=\"form-control\" placeholder=\"Email...\">\n  </div>\n  <!-- SUBSCRIBE BUTTON -->\n  <button class=\"btn btn-neutral btn-round btn-lg\">Subscribe\n    <i class=\"fa fa-check ml-1\"></i>\n  </button>\n</form>\n<!-- SUBSCRIBE SIGN-UP FORM -->",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        RegisterSubscriberComponent.ctorParameters = function () {
            return [
                { type: AngularliciousSecurityService, },
                { type: logging.AngularliciousLoggingService, },
                { type: forms.FormBuilder, },
                { type: router.Router, },
            ];
        };
        RegisterSubscriberComponent.propDecorators = {
            "subscribe": [{ type: core.Output },],
        };
        return RegisterSubscriberComponent;
    }(foundation.ComponentBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousSecurityModule = (function () {
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
            { type: core.NgModule, args: [{
                        imports: [
                            logging.AngularliciousLoggingModule,
                            foundation.AngularliciousFoundationModule,
                            core$1.AngularliciousCoreModule,
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
                            SecurityBusinessProviderService
                        ]
                    },] },
        ];
        return AngularliciousSecurityModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.AngularliciousSecurityModule = AngularliciousSecurityModule;
    exports.AngularliciousSecurityService = AngularliciousSecurityService;
    exports.RegisterSubscriberComponent = RegisterSubscriberComponent;
    exports.Subscriber = Subscriber;
    exports.ɵb = SecurityApiService;
    exports.ɵa = SecurityBusinessProviderService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtc2VjdXJpdHkudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24udHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBY3Rpb25CYXNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QWN0aW9uQmFzZSBleHRlbmRzIEFjdGlvbkJhc2Uge1xyXG4gIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2U7XHJcbiAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGUgW0RvXSBtZXRob2QgdG8gcGVyZm9ybSB0aGUgYWN0aW9uLlxyXG4gICAqL1xyXG4gIERvKGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UpIHtcclxuICAgIC8vIFByb3ZpZGUgdGhlIFtTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlXSwgW1NlcnZpY2VDb250ZXh0XSwgYW5kIFtMb2dnaW5nU2VydmljZV0gdG8gYWN0aW9uO1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyID0gYnVzaW5lc3NQcm92aWRlcjtcclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQgPSBidXNpbmVzc1Byb3ZpZGVyLnNlcnZpY2VDb250ZXh0O1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IGJ1c2luZXNzUHJvdmlkZXIubG9nZ2luZ1NlcnZpY2U7XHJcblxyXG4gICAgdGhpcy5leGVjdXRlKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyAvLyBpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XHJcbmltcG9ydCAqIGFzIHJ1bGVzIGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBIdHRwQmFzZVNlcnZpY2UsXHJcbiAgU2VydmljZVJlc3BvbnNlLFxyXG4gIEVycm9yUmVzcG9uc2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUFjdGlvbkJhc2UgfSBmcm9tICcuL3NlY3VyaXR5LWFjdGlvbi1iYXNlLmFjdGlvbic7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24gZXh0ZW5kcyBTZWN1cml0eUFjdGlvbkJhc2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3Vic2NyaWJlcjogU3Vic2NyaWJlcikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuYWN0aW9uTmFtZSA9ICdSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgZnJvbSB0aGUgYmFzZSBbQWN0aW9uXSBjbGFzcyB0byBhbGxvdyBmb3IgcnVsZXMgdG8gYmUgYWRkZWQgdG8gdGhlXHJcbiAgICogYWN0aW9uJ3MgW1ZhbGlkYXRpb25Db250ZXh0XS4gQW55IHJ1bGVzIGFkZGVkIHRvIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdIGhlcmUgd2lsbCBiZSBleGVjdXRlZCB3aGVuXHJcbiAgICogdGhlIGFjdGlvbidzIFtWYWxpZGF0ZUFjdGlvbl0gbWV0aG9kIGlzIGNhbGxlZCAtIHRoaXMgbWV0aG9kIGlzIGp1c3Qgb25lIG9mIG1hbnkgcGlwZWxpbmUgbWV0aG9kc1xyXG4gICAqIG9mIHRoZSBbQWN0aW9uXSBmcmFtZXdvcmsuXHJcbiAgICovXHJcbiAgcHJlVmFsaWRhdGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgYFJ1bm5pbmcgdGhlIFtwcmVWYWxpZGF0ZUFjdGlvbl0gZm9yIHRoZSAke3RoaXMuYWN0aW9uTmFtZX0gYWN0aW9uLmBcclxuICAgICk7XHJcbiAgICB0aGlzLnZhbGlkYXRpb25Db250ZXh0XHJcbiAgICAgIC53aXRoU291cmNlKHRoaXMuYWN0aW9uTmFtZSlcclxuICAgICAgLmFkZFJ1bGUoXHJcbiAgICAgICAgbmV3IHJ1bGVzLlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UoXHJcbiAgICAgICAgICAnTmFtZUlzVmFsaWQnLFxyXG4gICAgICAgICAgJ1RoZSBuYW1lIHZhbHVlIGlzIG5vdCB2YWxpZC4gTXVzdCBiZSBiZXR3ZWVuIDEtNDAgY2hhcmFjdGVycy4nLFxyXG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVyLk5hbWUsXHJcbiAgICAgICAgICAyLFxyXG4gICAgICAgICAgNDAsXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICAgIC5hZGRSdWxlKFxyXG4gICAgICAgIG5ldyBydWxlcy5TdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxyXG4gICAgICAgICAgJ0VtYWlsSXNWYWxpZCcsXHJcbiAgICAgICAgICAnVGhlIGVtYWlsIGFkZHJlc3MgdmFsdWUgaXMgbm90IHZhbGlkLiBNdXN0IGJlIGJldHdlZW4gNS02MCBjaGFyYWN0ZXJzLicsXHJcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZXIuRW1haWxBZGRyZXNzLFxyXG4gICAgICAgICAgNSxcclxuICAgICAgICAgIDYwLFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBwcm92aWRlIGJ1c2luZXNzIGxvZ2ljIGltcGxlbWVudGF0aW9uIC0gdGhpcyBtZXRob2QgaXMgYWxsb3dlZCB0byBleGVjdXRlIG9ubHkgaWYgdGhlIGN1cnJlbnQgYWN0aW9uXHJcbiAgICogZG9lcyBub3QgY29udGFpbiBhbnkgcnVsZSB2aW9sYXRpb25zLlxyXG4gICAqL1xyXG4gIHBlcmZvcm1BY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFJ1bm5pbmcgdGhlIFtwZXJmb3JtQWN0aW9uXSBmb3IgdGhlICR7dGhpcy5hY3Rpb25OYW1lfS5gXHJcbiAgICApO1xyXG4gICAgdGhpcy5yZXNwb25zZSA9IHRoaXMuYnVzaW5lc3NQcm92aWRlci5zZWN1cml0eUFwaVNlcnZpY2UucmVnaXN0ZXJTdWJzY3JpYmVyKFxyXG4gICAgICB0aGlzLnN1YnNjcmliZXJcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XHJcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivb2JzZXJ2ZU9uJztcclxuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSHR0cEJhc2VTZXJ2aWNlLCBTZXJ2aWNlUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7XHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICBTZXZlcml0eVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QXBpU2VydmljZSBleHRlbmRzIEh0dHBCYXNlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHVibGljIGh0dHBTZXJ2aWNlOiBIdHRwQmFzZVNlcnZpY2UsXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoaHR0cCwgbG9nZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdFVybCA9ICdhcGkvc3Vic2NyaWJlci9yZWdpc3Rlcic7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5zZXJ2aWNlTmFtZX0gcHJlcGFyaW5nIHRvIGNhbGw6ICR7cmVxdWVzdFVybH1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIG1lc3NhZ2UpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShzdWJzY3JpYmVyKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZVJlcXVlc3RPcHRpb25zKFxyXG4gICAgICBIdHRwUmVxdWVzdE1ldGhvZC5QT1NULFxyXG4gICAgICB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZUhlYWRlcihmYWxzZSksXHJcbiAgICAgIHJlcXVlc3RVcmwsXHJcbiAgICAgIGJvZHlcclxuICAgICk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQob3B0aW9ucyk7XHJcblxyXG4gICAgLyoqVEVNUE9SQVJZIElNUExFTUVOVEFUSU9OICovXHJcbiAgICAvLyBjb25zdCByZXNwb25zZSA9IG5ldyBTZXJ2aWNlUmVzcG9uc2UoKTtcclxuICAgIC8vIHJlc3BvbnNlLklzU3VjY2VzcyA9IHRydWU7XHJcbiAgICAvLyByZXNwb25zZS5NZXNzYWdlID0gYEZha2UgbWVzc2FnZSBmcm9tICR7dGhpcy5zZXJ2aWNlTmFtZX1gO1xyXG4gICAgLy8gcmVzcG9uc2UuRGF0YSA9IHRydWU7XHJcbiAgICAvLyBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgLy8gcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAvKipURU1QT1JBUlkgSU1QTEVNRU5UQVRJT04gKi9cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IFNlcnZpY2VCYXNlLCBTZXJ2aWNlUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7XHJcbiAgTG9nZ2luZ1NlcnZpY2VDb25maWcsXHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb25zL3JlZ2lzdGVyLXN1YnNjcmliZXIuYWN0aW9uJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUFwaVNlcnZpY2UgfSBmcm9tICcuL3NlY3VyaXR5LWFwaS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHB1YmxpYyBzZWN1cml0eUFwaVNlcnZpY2U6IFNlY3VyaXR5QXBpU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIobG9nZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIGFjdGlvbiB0byByZWdpc3RlciBhIG5ldyBzdWJzY3JpYmVyLlxyXG4gICAqIEBwYXJhbSBzdWJzY3JpYmVyXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gbmV3IFJlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbihzdWJzY3JpYmVyKTtcclxuICAgIGFjdGlvbi5Ebyh0aGlzKTtcclxuICAgIHJldHVybiBhY3Rpb24ucmVzcG9uc2U7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTdWJzY3JpYmVyIHtcclxuICBOYW1lOiBzdHJpbmc7XHJcbiAgRW1haWxBZGRyZXNzOiBzdHJpbmc7XHJcbiAgU3Vic2NyaXB0aW9uU3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gY3JlYXRlIGEgbmV3IHN1YnNjcmliZXIgZm9yIHRoZSBhcHBsaWNhdGlvbi4gVGhpcyBpcyBub3QgYW4gYWNjb3VudCAtIG9ubHlcclxuICAgKiBhIHN1YnNjcmlwdGlvbiB0byByZXNvdXJjZXMgZnJvbSB0aGUgYXBwbGljYXRpb24uXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXJOYW1lXFxcclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlckVtYWlsXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3Vic2NyaWJlck5hbWU6IHN0cmluZywgc3Vic2NyaWJlckVtYWlsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTmFtZSA9IHN1YnNjcmliZXJOYW1lO1xyXG4gICAgdGhpcy5FbWFpbEFkZHJlc3MgPSBzdWJzY3JpYmVyRW1haWw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlQmFzZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgU2V2ZXJpdHlcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcblxyXG4vLyBpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcbi8vIGltcG9ydCB7IFN1YnNjcmliZXJCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc3Vic2NyaWJlci1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuLy8gaW1wb3J0IHsgQ29uZmlybWF0aW9uVG9rZW4gfSBmcm9tICcuL21vZGVscy9jb25maXJtYXRpb24tdG9rZW4ubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgYnVzaW5lc3NQcm92aWRlcjogU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIobG9nZ2luZ1NlcnZpY2UpO1xyXG4gICAgdGhpcy5zZXJ2aWNlTmFtZSA9ICdBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSc7XHJcbiAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VydmljZUNvbnRleHQgPSB0aGlzLnNlcnZpY2VDb250ZXh0O1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLmxvZ2dpbmdTZXJ2aWNlID0gdGhpcy5sb2dnaW5nU2VydmljZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZWdpc3RlciBhIG5ldyBzdWJzY3JpYmVyIHRvIHRoZSBhcHBsaWNhdGlvbi5cclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlciBjb250YWlucyB0aGUgdXNlciBuYW1lIGFuZCBlbWFpbCBhZGRyZXNzIGZvciB0aGUgc3Vic2NyaWJlci5cclxuICAgKi9cclxuICByZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcik6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYFByZXBhcmluZyB0byByZWdpc3RlciBzdWJzY3JpYmVyOiAke0pTT04uc3RyaW5naWZ5KFxyXG4gICAgICBzdWJzY3JpYmVyXHJcbiAgICApfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgbWVzc2FnZSk7XHJcbiAgICByZXR1cm4gdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyKTtcclxuICB9XHJcblxyXG4gIC8vIC8qKlxyXG4gIC8vICAqIFVzZSB0byBjb25maXJtIGEgbmV3IHN1YnNjcmliZXIuXHJcbiAgLy8gICogQHBhcmFtIGNvbmZpcm1hdGlvblRva2VuIGNvbnRhaW5zIHRoZSB1c2VyIG5hbWUgYW5kIGEgW0hhc2hdIHZhbHVlIHRoYXQgaXMgdXNlZCB0byBjb25maXJtIHRoZSB1c2VyLlxyXG4gIC8vICAqL1xyXG4gIC8vIGNvbmZpcm1TdWJzY3JpYmVyKGNvbmZpcm1hdGlvblRva2VuOiBDb25maXJtYXRpb25Ub2tlbikge1xyXG4gIC8vICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGBQcmVwYXJpbmcgdG8gY29uZmlybSBzdWJzY3JpYmVyLmApO1xyXG4gIC8vICAgcmV0dXJuIHRoaXMuYnVzaW5lc3NQcm92aWRlci5jb25maXJtU3Vic2NyaWJlcihjb25maXJtYXRpb25Ub2tlbilcclxuICAvLyB9XHJcblxyXG4gIHZlcmlmeVNlcnZpY2UoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgJiZcclxuICAgICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyICYmXHJcbiAgICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5zZWN1cml0eUFwaVNlcnZpY2VcclxuICAgIClcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHtcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gIFNldmVyaXR5XHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZWN1cml0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZVJlc3BvbnNlLCBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnYm0tcmVnaXN0ZXItc3Vic2NyaWJlcicsXHJcbiAgdGVtcGxhdGU6IGA8YW5ndWxhcmxpY2lvdXMtYWxlcnQgW2FsZXJ0Tm90aWZpY2F0aW9uXT1cImFsZXJ0Tm90aWZpY2F0aW9uXCIgW2hhc01lc3NhZ2VdPVwiYWxlcnROb3RpZmljYXRpb24uc2hvd0FsZXJ0XCI+PC9hbmd1bGFybGljaW91cy1hbGVydD5cclxuPCEtLSBTVUJTQ1JJQkUgU0lHTi1VUCBGT1JNIC0tPlxyXG48Zm9ybSBbZm9ybUdyb3VwXT1cIl9mb3JtXCIgKG5nU3VibWl0KT1cInN1Ym1pdEZvcm0oKVwiPlxyXG4gIDwhLS0gU1VCU0NSSUJFUiBOQU1FIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmb3JtLWdyb3VwLW5vLWJvcmRlclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxyXG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1c2Vyc19jaXJjbGUtMDhcIj48L2k+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJzdWJzY3JpYmVyTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJOYW1lLi4uXCI+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBTVUJTQ1JJQkVSIEVNQUlMIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmb3JtLWdyb3VwLW5vLWJvcmRlclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxyXG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX2VtYWlsLTg1XCI+PC9pPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwiZW1haWxBZGRyZXNzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkVtYWlsLi4uXCI+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBTVUJTQ1JJQkUgQlVUVE9OIC0tPlxyXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLW5ldXRyYWwgYnRuLXJvdW5kIGJ0bi1sZ1wiPlN1YnNjcmliZVxyXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVjayBtbC0xXCI+PC9pPlxyXG4gIDwvYnV0dG9uPlxyXG48L2Zvcm0+XHJcbjwhLS0gU1VCU0NSSUJFIFNJR04tVVAgRk9STSAtLT5gLFxyXG4gIHN0eWxlczogW2BgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50QmFzZVxyXG4gIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAT3V0cHV0KCkgc3Vic2NyaWJlID0gbmV3IEV2ZW50RW1pdHRlcjxTZXJ2aWNlUmVzcG9uc2U+KCk7XHJcbiAgX2Zvcm06IEZvcm1Hcm91cDtcclxuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSxcclxuICAgIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHVibGljIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcclxuICAgIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcignUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50JywgbG9nZ2luZ1NlcnZpY2UsIHJvdXRlcik7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEZvcm0oKTogdm9pZCB7XHJcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHN1YnNjcmliZXJOYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICBlbWFpbEFkZHJlc3M6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3VibWl0Rm9ybSgpIHtcclxuICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnJlc2V0U2VydmljZUNvbnRleHQoKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyKFxyXG4gICAgICB0aGlzLl9mb3JtLnZhbHVlLnN1YnNjcmliZXJOYW1lLFxyXG4gICAgICB0aGlzLl9mb3JtLnZhbHVlLmVtYWlsQWRkcmVzc1xyXG4gICAgKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVXNlcih0aGlzLnN1YnNjcmliZXIpO1xyXG4gIH1cclxuXHJcbiAgc3Vic2NyaWJlVXNlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKSB7XHJcbiAgICB0aGlzLnNlY3VyaXR5U2VydmljZVxyXG4gICAgICAucmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKHJlc3BvbnNlOiBTZXJ2aWNlUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlU3Vic2NyaWJlVXNlcihyZXNwb25zZSksXHJcbiAgICAgICAgZXJyb3IgPT5cclxuICAgICAgICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhlcnJvciwgdGhpcy5zZWN1cml0eVNlcnZpY2Uuc2VydmljZUNvbnRleHQpLFxyXG4gICAgICAgICgpID0+IHRoaXMuZmluaXNoUmVxdWVzdCh0aGlzLmNvbXBvbmVudE5hbWUpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTdWJzY3JpYmVVc2VyKHJlc3BvbnNlOiBTZXJ2aWNlUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGZ1bmN0aW9uTmFtZSA9ICdoYW5kbGVTdWJzY3JpYmVVc2VyJztcclxuICAgIGNvbnN0IGxvZ01lc3NhZ2UgPSBgWyR7ZnVuY3Rpb25OYW1lfV06IFByZXBhcmluZyB0byBoYW5kbGUgdGhlIHJlc3BvbnNlIGZyb20gdGhlIFtTZWN1cml0eVNlcnZpY2VdIGluIHRoZSAke1xyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWVcclxuICAgIH0uYDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBsb2dNZXNzYWdlXHJcbiAgICApO1xyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5Jc1N1Y2Nlc3MpIHtcclxuICAgICAgICBjb25zdCBzdWNjZXNzTWVzc2FnZSA9IGBTdWNjZXNzZnVsbHkgcHJvY2Vzc2VkIHJlcXVlc3QgdG8gY3JlYXRlIHN1YnNjcmliZXIuIFByZXBhcmUgdG8gZG93bmxvYWQuLi5gO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBzdWNjZXNzTWVzc2FnZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUuZW1pdChyZXNwb25zZSBhcyBTZXJ2aWNlUmVzcG9uc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhcclxuICAgICAgICAgIC8vIHJlc3BvbnNlIGFzIEVycm9yUmVzcG9uc2UsXHJcbiAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgdGhpcy5zZWN1cml0eVNlcnZpY2Uuc2VydmljZUNvbnRleHRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9jb3JlJztcclxuaW1wb3J0IHsgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QXBpU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYXBpLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVnaXN0ZXItc3Vic2NyaWJlci9yZWdpc3Rlci1zdWJzY3JpYmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IExvZ2dpbmdDb25maWcgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvY29uZmlndXJhdGlvbic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcclxuICAgIEFuZ3VsYXJsaWNpb3VzRm91bmRhdGlvbk1vZHVsZSxcclxuICAgIEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSxcclxuICAgIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIFNlY3VyaXR5QXBpU2VydmljZSwgLy9QUk9WSURFIElOVEVSTkFMIFNFUlZJQ0VTIEZPUiBUSEUgTU9EVUxFOyBTQ09QRUQgVE8gVEhJUyBNT0RVTEU7XHJcbiAgICBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIC8vUFJPVklERSBJTlRFUk5BTCBTRVJWSUNFUyBGT1IgVEhFIE1PRFVMRTsgU0NPUEVEIFRPIFRISVMgTU9EVUxFO1xyXG4gICAgLy8gSHR0cEJhc2VTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNTZWN1cml0eU1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBMb2dnaW5nQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQW5ndWxhcmxpY2lvdXNTZWN1cml0eU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogTG9nZ2luZ0NvbmZpZyxcclxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWdcclxuICAgICAgICB9LFxyXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiQWN0aW9uQmFzZSIsInJ1bGVzLlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UiLCJTZXZlcml0eSIsImh0dHAiLCJIdHRwUmVxdWVzdE1ldGhvZCIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiSHR0cEJhc2VTZXJ2aWNlIiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSIsIlNlcnZpY2VCYXNlIiwicm91dGVyIiwiRXZlbnRFbWl0dGVyIiwiVmFsaWRhdG9ycyIsIkNvbXBvbmVudCIsIkZvcm1CdWlsZGVyIiwiUm91dGVyIiwiT3V0cHV0IiwiQ29tcG9uZW50QmFzZSIsIkxvZ2dpbmdDb25maWciLCJIdHRwQ2xpZW50TW9kdWxlIiwiTmdNb2R1bGUiLCJBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUiLCJBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUiLCJBbmd1bGFybGljaW91c0NvcmVNb2R1bGUiLCJBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsdUJBQTBCLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDdkMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDOzs7Ozs7SUN2QkQsSUFBQTtRQUF3Q0Esc0NBQVU7UUFJaEQ7bUJBQ0UsaUJBQU87U0FDUjs7Ozs7Ozs7O1FBS0QsK0JBQUU7Ozs7O1lBQUYsVUFBRyxnQkFBaUQ7O2dCQUVsRCxJ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
