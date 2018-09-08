(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angularlicious/foundation'), require('@angularlicious/rules-engine'), require('@angularlicious/logging'), require('@angular/core'), require('@angular/common/http'), require('@angular/router'), require('@angular/forms'), require('@angular/common'), require('@angularlicious/core')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/security', ['exports', '@angularlicious/foundation', '@angularlicious/rules-engine', '@angularlicious/logging', '@angular/core', '@angular/common/http', '@angular/router', '@angular/forms', '@angular/common', '@angularlicious/core'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.security = {}),null,null,null,global.ng.core,global.ng.common.http,global.ng.router,global.ng.forms,global.ng.common,null));
}(this, (function (exports,foundation,rules,logging,core,http,router,forms,common,core$1) { 'use strict';

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtc2VjdXJpdHkudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24udHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcbmltcG9ydCB7IEFjdGlvbkJhc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBTZWN1cml0eUFjdGlvbkJhc2UgZXh0ZW5kcyBBY3Rpb25CYXNlIHtcbiAgYnVzaW5lc3NQcm92aWRlcjogU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZTtcbiAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIFtEb10gbWV0aG9kIHRvIHBlcmZvcm0gdGhlIGFjdGlvbi5cbiAgICovXG4gIERvKGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UpIHtcbiAgICAvLyBQcm92aWRlIHRoZSBbU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZV0sIFtTZXJ2aWNlQ29udGV4dF0sIGFuZCBbTG9nZ2luZ1NlcnZpY2VdIHRvIGFjdGlvbjtcbiAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIgPSBidXNpbmVzc1Byb3ZpZGVyO1xuICAgIHRoaXMuc2VydmljZUNvbnRleHQgPSBidXNpbmVzc1Byb3ZpZGVyLnNlcnZpY2VDb250ZXh0O1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBidXNpbmVzc1Byb3ZpZGVyLmxvZ2dpbmdTZXJ2aWNlO1xuXG4gICAgdGhpcy5leGVjdXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vLyAvLyBpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xuaW1wb3J0ICogYXMgcnVsZXMgZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XG5cbmltcG9ydCB7XG4gIEh0dHBCYXNlU2VydmljZSxcbiAgU2VydmljZVJlc3BvbnNlLFxuICBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XG5pbXBvcnQgeyBTZWN1cml0eUFjdGlvbkJhc2UgfSBmcm9tICcuL3NlY3VyaXR5LWFjdGlvbi1iYXNlLmFjdGlvbic7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmV4cG9ydCBjbGFzcyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24gZXh0ZW5kcyBTZWN1cml0eUFjdGlvbkJhc2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWN0aW9uTmFtZSA9ICdSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZyb20gdGhlIGJhc2UgW0FjdGlvbl0gY2xhc3MgdG8gYWxsb3cgZm9yIHJ1bGVzIHRvIGJlIGFkZGVkIHRvIHRoZVxuICAgKiBhY3Rpb24ncyBbVmFsaWRhdGlvbkNvbnRleHRdLiBBbnkgcnVsZXMgYWRkZWQgdG8gdGhlIFtWYWxpZGF0aW9uQ29udGV4dF0gaGVyZSB3aWxsIGJlIGV4ZWN1dGVkIHdoZW5cbiAgICogdGhlIGFjdGlvbidzIFtWYWxpZGF0ZUFjdGlvbl0gbWV0aG9kIGlzIGNhbGxlZCAtIHRoaXMgbWV0aG9kIGlzIGp1c3Qgb25lIG9mIG1hbnkgcGlwZWxpbmUgbWV0aG9kc1xuICAgKiBvZiB0aGUgW0FjdGlvbl0gZnJhbWV3b3JrLlxuICAgKi9cbiAgcHJlVmFsaWRhdGVBY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUnVubmluZyB0aGUgW3ByZVZhbGlkYXRlQWN0aW9uXSBmb3IgdGhlICR7dGhpcy5hY3Rpb25OYW1lfSBhY3Rpb24uYFxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dFxuICAgICAgLndpdGhTb3VyY2UodGhpcy5hY3Rpb25OYW1lKVxuICAgICAgLmFkZFJ1bGUoXG4gICAgICAgIG5ldyBydWxlcy5TdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxuICAgICAgICAgICdOYW1lSXNWYWxpZCcsXG4gICAgICAgICAgJ1RoZSBuYW1lIHZhbHVlIGlzIG5vdCB2YWxpZC4gTXVzdCBiZSBiZXR3ZWVuIDEtNDAgY2hhcmFjdGVycy4nLFxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlci5OYW1lLFxuICAgICAgICAgIDIsXG4gICAgICAgICAgNDAsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICApXG4gICAgICAuYWRkUnVsZShcbiAgICAgICAgbmV3IHJ1bGVzLlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UoXG4gICAgICAgICAgJ0VtYWlsSXNWYWxpZCcsXG4gICAgICAgICAgJ1RoZSBlbWFpbCBhZGRyZXNzIHZhbHVlIGlzIG5vdCB2YWxpZC4gTXVzdCBiZSBiZXR3ZWVuIDUtNjAgY2hhcmFjdGVycy4nLFxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlci5FbWFpbEFkZHJlc3MsXG4gICAgICAgICAgNSxcbiAgICAgICAgICA2MCxcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHByb3ZpZGUgYnVzaW5lc3MgbG9naWMgaW1wbGVtZW50YXRpb24gLSB0aGlzIG1ldGhvZCBpcyBhbGxvd2VkIHRvIGV4ZWN1dGUgb25seSBpZiB0aGUgY3VycmVudCBhY3Rpb25cbiAgICogZG9lcyBub3QgY29udGFpbiBhbnkgcnVsZSB2aW9sYXRpb25zLlxuICAgKi9cbiAgcGVyZm9ybUFjdGlvbigpIHtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgYFJ1bm5pbmcgdGhlIFtwZXJmb3JtQWN0aW9uXSBmb3IgdGhlICR7dGhpcy5hY3Rpb25OYW1lfS5gXG4gICAgKTtcbiAgICB0aGlzLnJlc3BvbnNlID0gdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnNlY3VyaXR5QXBpU2VydmljZS5yZWdpc3RlclN1YnNjcmliZXIoXG4gICAgICB0aGlzLnN1YnNjcmliZXJcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9vYnNlcnZlT24nO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgU2V2ZXJpdHlcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RNZXRob2QgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUFwaVNlcnZpY2UgZXh0ZW5kcyBIdHRwQmFzZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHB1YmxpYyBodHRwU2VydmljZTogSHR0cEJhc2VTZXJ2aWNlLFxuICAgIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGh0dHAsIGxvZ2dpbmdTZXJ2aWNlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXF1ZXN0VXJsID0gJ2FwaS9zdWJzY3JpYmVyL3JlZ2lzdGVyJztcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5zZXJ2aWNlTmFtZX0gcHJlcGFyaW5nIHRvIGNhbGw6ICR7cmVxdWVzdFVybH1gO1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBtZXNzYWdlKTtcblxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShzdWJzY3JpYmVyKTtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5odHRwU2VydmljZS5jcmVhdGVSZXF1ZXN0T3B0aW9ucyhcbiAgICAgIEh0dHBSZXF1ZXN0TWV0aG9kLlBPU1QsXG4gICAgICB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZUhlYWRlcihmYWxzZSksXG4gICAgICByZXF1ZXN0VXJsLFxuICAgICAgYm9keVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KG9wdGlvbnMpO1xuXG4gICAgLyoqVEVNUE9SQVJZIElNUExFTUVOVEFUSU9OICovXG4gICAgLy8gY29uc3QgcmVzcG9uc2UgPSBuZXcgU2VydmljZVJlc3BvbnNlKCk7XG4gICAgLy8gcmVzcG9uc2UuSXNTdWNjZXNzID0gdHJ1ZTtcbiAgICAvLyByZXNwb25zZS5NZXNzYWdlID0gYEZha2UgbWVzc2FnZSBmcm9tICR7dGhpcy5zZXJ2aWNlTmFtZX1gO1xuICAgIC8vIHJlc3BvbnNlLkRhdGEgPSB0cnVlO1xuICAgIC8vIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XG4gICAgLy8gcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgLyoqVEVNUE9SQVJZIElNUExFTUVOVEFUSU9OICovXG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgU2VydmljZUJhc2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcbmltcG9ydCB7XG4gIExvZ2dpbmdTZXJ2aWNlQ29uZmlnLFxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcbmltcG9ydCB7IFJlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbiB9IGZyb20gJy4vYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XG5pbXBvcnQgeyBTZWN1cml0eUFwaVNlcnZpY2UgfSBmcm9tICcuL3NlY3VyaXR5LWFwaS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlQmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxuICAgIHB1YmxpYyBzZWN1cml0eUFwaVNlcnZpY2U6IFNlY3VyaXR5QXBpU2VydmljZVxuICApIHtcbiAgICBzdXBlcihsb2dnaW5nU2VydmljZSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIGFjdGlvbiB0byByZWdpc3RlciBhIG5ldyBzdWJzY3JpYmVyLlxuICAgKiBAcGFyYW0gc3Vic2NyaWJlclxuICAgKi9cbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xuICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24oc3Vic2NyaWJlcik7XG4gICAgYWN0aW9uLkRvKHRoaXMpO1xuICAgIHJldHVybiBhY3Rpb24ucmVzcG9uc2U7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTdWJzY3JpYmVyIHtcbiAgTmFtZTogc3RyaW5nO1xuICBFbWFpbEFkZHJlc3M6IHN0cmluZztcbiAgU3Vic2NyaXB0aW9uU3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIC8qKlxuICAgKiBVc2UgdG8gY3JlYXRlIGEgbmV3IHN1YnNjcmliZXIgZm9yIHRoZSBhcHBsaWNhdGlvbi4gVGhpcyBpcyBub3QgYW4gYWNjb3VudCAtIG9ubHlcbiAgICogYSBzdWJzY3JpcHRpb24gdG8gcmVzb3VyY2VzIGZyb20gdGhlIGFwcGxpY2F0aW9uLlxuICAgKiBAcGFyYW0gc3Vic2NyaWJlck5hbWVcXFxuICAgKiBAcGFyYW0gc3Vic2NyaWJlckVtYWlsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBzdWJzY3JpYmVyRW1haWw6IHN0cmluZykge1xuICAgIHRoaXMuTmFtZSA9IHN1YnNjcmliZXJOYW1lO1xuICAgIHRoaXMuRW1haWxBZGRyZXNzID0gc3Vic2NyaWJlckVtYWlsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZXJ2aWNlQmFzZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgU2V2ZXJpdHlcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XG5cbi8vIGltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcbi8vIGltcG9ydCB7IFN1YnNjcmliZXJCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc3Vic2NyaWJlci1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcbi8vIGltcG9ydCB7IENvbmZpcm1hdGlvblRva2VuIH0gZnJvbSAnLi9tb2RlbHMvY29uZmlybWF0aW9uLXRva2VuLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgICBwcml2YXRlIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIobG9nZ2luZ1NlcnZpY2UpO1xuICAgIHRoaXMuc2VydmljZU5hbWUgPSAnQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UnO1xuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5zZXJ2aWNlQ29udGV4dCA9IHRoaXMuc2VydmljZUNvbnRleHQ7XG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLmxvZ2dpbmdTZXJ2aWNlID0gdGhpcy5sb2dnaW5nU2VydmljZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlciB0byB0aGUgYXBwbGljYXRpb24uXG4gICAqIEBwYXJhbSBzdWJzY3JpYmVyIGNvbnRhaW5zIHRoZSB1c2VyIG5hbWUgYW5kIGVtYWlsIGFkZHJlc3MgZm9yIHRoZSBzdWJzY3JpYmVyLlxuICAgKi9cbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgUHJlcGFyaW5nIHRvIHJlZ2lzdGVyIHN1YnNjcmliZXI6ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICBzdWJzY3JpYmVyXG4gICAgKX1gO1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBtZXNzYWdlKTtcbiAgICByZXR1cm4gdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBVc2UgdG8gY29uZmlybSBhIG5ldyBzdWJzY3JpYmVyLlxuICAvLyAgKiBAcGFyYW0gY29uZmlybWF0aW9uVG9rZW4gY29udGFpbnMgdGhlIHVzZXIgbmFtZSBhbmQgYSBbSGFzaF0gdmFsdWUgdGhhdCBpcyB1c2VkIHRvIGNvbmZpcm0gdGhlIHVzZXIuXG4gIC8vICAqL1xuICAvLyBjb25maXJtU3Vic2NyaWJlcihjb25maXJtYXRpb25Ub2tlbjogQ29uZmlybWF0aW9uVG9rZW4pIHtcbiAgLy8gICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgYFByZXBhcmluZyB0byBjb25maXJtIHN1YnNjcmliZXIuYCk7XG4gIC8vICAgcmV0dXJuIHRoaXMuYnVzaW5lc3NQcm92aWRlci5jb25maXJtU3Vic2NyaWJlcihjb25maXJtYXRpb25Ub2tlbilcbiAgLy8gfVxuXG4gIHZlcmlmeVNlcnZpY2UoKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSAmJlxuICAgICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyICYmXG4gICAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VjdXJpdHlBcGlTZXJ2aWNlXG4gICAgKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XG5pbXBvcnQge1xuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxuICBTZXZlcml0eVxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VjdXJpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBTZXJ2aWNlUmVzcG9uc2UsIEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnYm0tcmVnaXN0ZXItc3Vic2NyaWJlcicsXG4gIHRlbXBsYXRlOiBgPGFuZ3VsYXJsaWNpb3VzLWFsZXJ0IFthbGVydE5vdGlmaWNhdGlvbl09XCJhbGVydE5vdGlmaWNhdGlvblwiIFtoYXNNZXNzYWdlXT1cImFsZXJ0Tm90aWZpY2F0aW9uLnNob3dBbGVydFwiPjwvYW5ndWxhcmxpY2lvdXMtYWxlcnQ+XG48IS0tIFNVQlNDUklCRSBTSUdOLVVQIEZPUk0gLS0+XG48Zm9ybSBbZm9ybUdyb3VwXT1cIl9mb3JtXCIgKG5nU3VibWl0KT1cInN1Ym1pdEZvcm0oKVwiPlxuICA8IS0tIFNVQlNDUklCRVIgTkFNRSAtLT5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZvcm0tZ3JvdXAtbm8tYm9yZGVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuICAgICAgPGkgY2xhc3M9XCJub3ctdWktaWNvbnMgdXNlcnNfY2lyY2xlLTA4XCI+PC9pPlxuICAgIDwvc3Bhbj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJzdWJzY3JpYmVyTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJOYW1lLi4uXCI+XG4gIDwvZGl2PlxuICA8IS0tIFNVQlNDUklCRVIgRU1BSUwgLS0+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmb3JtLWdyb3VwLW5vLWJvcmRlclwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVpLTFfZW1haWwtODVcIj48L2k+XG4gICAgPC9zcGFuPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cImVtYWlsQWRkcmVzc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbWFpbC4uLlwiPlxuICA8L2Rpdj5cbiAgPCEtLSBTVUJTQ1JJQkUgQlVUVE9OIC0tPlxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1uZXV0cmFsIGJ0bi1yb3VuZCBidG4tbGdcIj5TdWJzY3JpYmVcbiAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrIG1sLTFcIj48L2k+XG4gIDwvYnV0dG9uPlxuPC9mb3JtPlxuPCEtLSBTVUJTQ1JJQkUgU0lHTi1VUCBGT1JNIC0tPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnRCYXNlXG4gIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQE91dHB1dCgpIHN1YnNjcmliZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2VydmljZVJlc3BvbnNlPigpO1xuICBfZm9ybTogRm9ybUdyb3VwO1xuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSxcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgICBwdWJsaWMgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIHN1cGVyKCdSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQnLCBsb2dnaW5nU2VydmljZSwgcm91dGVyKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYnVpbGRGb3JtKCk7XG4gIH1cblxuICBidWlsZEZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgc3Vic2NyaWJlck5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBlbWFpbEFkZHJlc3M6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICB9KTtcbiAgfVxuXG4gIHN1Ym1pdEZvcm0oKSB7XG4gICAgdGhpcy5zZWN1cml0eVNlcnZpY2UucmVzZXRTZXJ2aWNlQ29udGV4dCgpO1xuICAgIHRoaXMuc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyKFxuICAgICAgdGhpcy5fZm9ybS52YWx1ZS5zdWJzY3JpYmVyTmFtZSxcbiAgICAgIHRoaXMuX2Zvcm0udmFsdWUuZW1haWxBZGRyZXNzXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmliZVVzZXIodGhpcy5zdWJzY3JpYmVyKTtcbiAgfVxuXG4gIHN1YnNjcmliZVVzZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcikge1xuICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlXG4gICAgICAucmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocmVzcG9uc2U6IFNlcnZpY2VSZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVTdWJzY3JpYmVVc2VyKHJlc3BvbnNlKSxcbiAgICAgICAgZXJyb3IgPT5cbiAgICAgICAgICB0aGlzLmhhbmRsZVNlcnZpY2VFcnJvcnMoZXJyb3IsIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnNlcnZpY2VDb250ZXh0KSxcbiAgICAgICAgKCkgPT4gdGhpcy5maW5pc2hSZXF1ZXN0KHRoaXMuY29tcG9uZW50TmFtZSlcbiAgICAgICk7XG4gIH1cblxuICBoYW5kbGVTdWJzY3JpYmVVc2VyKHJlc3BvbnNlOiBTZXJ2aWNlUmVzcG9uc2UpIHtcbiAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSAnaGFuZGxlU3Vic2NyaWJlVXNlcic7XG4gICAgY29uc3QgbG9nTWVzc2FnZSA9IGBbJHtmdW5jdGlvbk5hbWV9XTogUHJlcGFyaW5nIHRvIGhhbmRsZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgW1NlY3VyaXR5U2VydmljZV0gaW4gdGhlICR7XG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWVcbiAgICB9LmA7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgIGxvZ01lc3NhZ2VcbiAgICApO1xuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLklzU3VjY2Vzcykge1xuICAgICAgICBjb25zdCBzdWNjZXNzTWVzc2FnZSA9IGBTdWNjZXNzZnVsbHkgcHJvY2Vzc2VkIHJlcXVlc3QgdG8gY3JlYXRlIHN1YnNjcmliZXIuIFByZXBhcmUgdG8gZG93bmxvYWQuLi5gO1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICAgICAgc3VjY2Vzc01lc3NhZ2VcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUuZW1pdChyZXNwb25zZSBhcyBTZXJ2aWNlUmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKFxuICAgICAgICAgIC8vIHJlc3BvbnNlIGFzIEVycm9yUmVzcG9uc2UsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB0aGlzLnNlY3VyaXR5U2VydmljZS5zZXJ2aWNlQ29udGV4dFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0NvcmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvY29yZSc7XG5pbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlY3VyaXR5QXBpU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlZ2lzdGVyLXN1YnNjcmliZXIvcmVnaXN0ZXItc3Vic2NyaWJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cEJhc2VTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlLFxuICAgIEFuZ3VsYXJsaWNpb3VzRm91bmRhdGlvbk1vZHVsZSxcbiAgICBBbmd1bGFybGljaW91c0NvcmVNb2R1bGUsXG4gICAgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1JlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxuICAgIFNlY3VyaXR5QXBpU2VydmljZSwgLy9QUk9WSURFIElOVEVSTkFMIFNFUlZJQ0VTIEZPUiBUSEUgTU9EVUxFOyBTQ09QRUQgVE8gVEhJUyBNT0RVTEU7XG4gICAgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSAvL1BST1ZJREUgSU5URVJOQUwgU0VSVklDRVMgRk9SIFRIRSBNT0RVTEU7IFNDT1BFRCBUTyBUSElTIE1PRFVMRTtcbiAgICAvLyBIdHRwQmFzZVNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c1NlY3VyaXR5TW9kdWxlIHt9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJBY3Rpb25CYXNlIiwicnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZSIsIlNldmVyaXR5IiwiaHR0cCIsIkh0dHBSZXF1ZXN0TWV0aG9kIiwiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJIdHRwQmFzZVNlcnZpY2UiLCJBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIiwiU2VydmljZUJhc2UiLCJyb3V0ZXIiLCJFdmVudEVtaXR0ZXIiLCJWYWxpZGF0b3JzIiwiQ29tcG9uZW50IiwiRm9ybUJ1aWxkZXIiLCJSb3V0ZXIiLCJPdXRwdXQiLCJDb21wb25lbnRCYXNlIiwiTmdNb2R1bGUiLCJBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUiLCJBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUiLCJBbmd1bGFybGljaW91c0NvcmVNb2R1bGUiLCJBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FB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