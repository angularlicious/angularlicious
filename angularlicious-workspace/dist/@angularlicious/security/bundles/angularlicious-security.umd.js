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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtc2VjdXJpdHkudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24udHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBY3Rpb25CYXNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QWN0aW9uQmFzZSBleHRlbmRzIEFjdGlvbkJhc2Uge1xyXG4gIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2U7XHJcbiAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGUgW0RvXSBtZXRob2QgdG8gcGVyZm9ybSB0aGUgYWN0aW9uLlxyXG4gICAqL1xyXG4gIERvKGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UpIHtcclxuICAgIC8vIFByb3ZpZGUgdGhlIFtTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlXSwgW1NlcnZpY2VDb250ZXh0XSwgYW5kIFtMb2dnaW5nU2VydmljZV0gdG8gYWN0aW9uO1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyID0gYnVzaW5lc3NQcm92aWRlcjtcclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQgPSBidXNpbmVzc1Byb3ZpZGVyLnNlcnZpY2VDb250ZXh0O1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IGJ1c2luZXNzUHJvdmlkZXIubG9nZ2luZ1NlcnZpY2U7XHJcblxyXG4gICAgdGhpcy5leGVjdXRlKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyAvLyBpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XHJcbmltcG9ydCAqIGFzIHJ1bGVzIGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBIdHRwQmFzZVNlcnZpY2UsXHJcbiAgU2VydmljZVJlc3BvbnNlLFxyXG4gIEVycm9yUmVzcG9uc2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBY3Rpb25CYXNlIH0gZnJvbSAnLi9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24nO1xyXG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uIGV4dGVuZHMgU2VjdXJpdHlBY3Rpb25CYXNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmFjdGlvbk5hbWUgPSAnUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZyb20gdGhlIGJhc2UgW0FjdGlvbl0gY2xhc3MgdG8gYWxsb3cgZm9yIHJ1bGVzIHRvIGJlIGFkZGVkIHRvIHRoZVxyXG4gICAqIGFjdGlvbidzIFtWYWxpZGF0aW9uQ29udGV4dF0uIEFueSBydWxlcyBhZGRlZCB0byB0aGUgW1ZhbGlkYXRpb25Db250ZXh0XSBoZXJlIHdpbGwgYmUgZXhlY3V0ZWQgd2hlblxyXG4gICAqIHRoZSBhY3Rpb24ncyBbVmFsaWRhdGVBY3Rpb25dIG1ldGhvZCBpcyBjYWxsZWQgLSB0aGlzIG1ldGhvZCBpcyBqdXN0IG9uZSBvZiBtYW55IHBpcGVsaW5lIG1ldGhvZHNcclxuICAgKiBvZiB0aGUgW0FjdGlvbl0gZnJhbWV3b3JrLlxyXG4gICAqL1xyXG4gIHByZVZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIGBSdW5uaW5nIHRoZSBbcHJlVmFsaWRhdGVBY3Rpb25dIGZvciB0aGUgJHt0aGlzLmFjdGlvbk5hbWV9IGFjdGlvbi5gXHJcbiAgICApO1xyXG4gICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dFxyXG4gICAgICAud2l0aFNvdXJjZSh0aGlzLmFjdGlvbk5hbWUpXHJcbiAgICAgIC5hZGRSdWxlKFxyXG4gICAgICAgIG5ldyBydWxlcy5TdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxyXG4gICAgICAgICAgJ05hbWVJc1ZhbGlkJyxcclxuICAgICAgICAgICdUaGUgbmFtZSB2YWx1ZSBpcyBub3QgdmFsaWQuIE11c3QgYmUgYmV0d2VlbiAxLTQwIGNoYXJhY3RlcnMuJyxcclxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlci5OYW1lLFxyXG4gICAgICAgICAgMixcclxuICAgICAgICAgIDQwLFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgICAuYWRkUnVsZShcclxuICAgICAgICBuZXcgcnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZShcclxuICAgICAgICAgICdFbWFpbElzVmFsaWQnLFxyXG4gICAgICAgICAgJ1RoZSBlbWFpbCBhZGRyZXNzIHZhbHVlIGlzIG5vdCB2YWxpZC4gTXVzdCBiZSBiZXR3ZWVuIDUtNjAgY2hhcmFjdGVycy4nLFxyXG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVyLkVtYWlsQWRkcmVzcyxcclxuICAgICAgICAgIDUsXHJcbiAgICAgICAgICA2MCxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvdmlkZSBidXNpbmVzcyBsb2dpYyBpbXBsZW1lbnRhdGlvbiAtIHRoaXMgbWV0aG9kIGlzIGFsbG93ZWQgdG8gZXhlY3V0ZSBvbmx5IGlmIHRoZSBjdXJyZW50IGFjdGlvblxyXG4gICAqIGRvZXMgbm90IGNvbnRhaW4gYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBwZXJmb3JtQWN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSdW5uaW5nIHRoZSBbcGVyZm9ybUFjdGlvbl0gZm9yIHRoZSAke3RoaXMuYWN0aW9uTmFtZX0uYFxyXG4gICAgKTtcclxuICAgIHRoaXMucmVzcG9uc2UgPSB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VjdXJpdHlBcGlTZXJ2aWNlLnJlZ2lzdGVyU3Vic2NyaWJlcihcclxuICAgICAgdGhpcy5zdWJzY3JpYmVyXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xyXG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL29ic2VydmVPbic7XHJcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgU2V2ZXJpdHlcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2VjdXJpdHlBcGlTZXJ2aWNlIGV4dGVuZHMgSHR0cEJhc2VTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwdWJsaWMgaHR0cFNlcnZpY2U6IEh0dHBCYXNlU2VydmljZSxcclxuICAgIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihodHRwLCBsb2dnaW5nU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcik6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0VXJsID0gJ2FwaS9zdWJzY3JpYmVyL3JlZ2lzdGVyJztcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLnNlcnZpY2VOYW1lfSBwcmVwYXJpbmcgdG8gY2FsbDogJHtyZXF1ZXN0VXJsfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgbWVzc2FnZSk7XHJcblxyXG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHN1YnNjcmliZXIpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuaHR0cFNlcnZpY2UuY3JlYXRlUmVxdWVzdE9wdGlvbnMoXHJcbiAgICAgIEh0dHBSZXF1ZXN0TWV0aG9kLlBPU1QsXHJcbiAgICAgIHRoaXMuaHR0cFNlcnZpY2UuY3JlYXRlSGVhZGVyKGZhbHNlKSxcclxuICAgICAgcmVxdWVzdFVybCxcclxuICAgICAgYm9keVxyXG4gICAgKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChvcHRpb25zKTtcclxuXHJcbiAgICAvKipURU1QT1JBUlkgSU1QTEVNRU5UQVRJT04gKi9cclxuICAgIC8vIGNvbnN0IHJlc3BvbnNlID0gbmV3IFNlcnZpY2VSZXNwb25zZSgpO1xyXG4gICAgLy8gcmVzcG9uc2UuSXNTdWNjZXNzID0gdHJ1ZTtcclxuICAgIC8vIHJlc3BvbnNlLk1lc3NhZ2UgPSBgRmFrZSBtZXNzYWdlIGZyb20gJHt0aGlzLnNlcnZpY2VOYW1lfWA7XHJcbiAgICAvLyByZXNwb25zZS5EYXRhID0gdHJ1ZTtcclxuICAgIC8vIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XHJcbiAgICAvLyByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIC8qKlRFTVBPUkFSWSBJTVBMRU1FTlRBVElPTiAqL1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgU2VydmljZUJhc2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHtcclxuICBMb2dnaW5nU2VydmljZUNvbmZpZyxcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24gfSBmcm9tICcuL2FjdGlvbnMvcmVnaXN0ZXItc3Vic2NyaWJlci5hY3Rpb24nO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUFwaVNlcnZpY2UgfSBmcm9tICcuL3NlY3VyaXR5LWFwaS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHB1YmxpYyBzZWN1cml0eUFwaVNlcnZpY2U6IFNlY3VyaXR5QXBpU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIobG9nZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIGFjdGlvbiB0byByZWdpc3RlciBhIG5ldyBzdWJzY3JpYmVyLlxyXG4gICAqIEBwYXJhbSBzdWJzY3JpYmVyXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gbmV3IFJlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbihzdWJzY3JpYmVyKTtcclxuICAgIGFjdGlvbi5Ebyh0aGlzKTtcclxuICAgIHJldHVybiBhY3Rpb24ucmVzcG9uc2U7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTdWJzY3JpYmVyIHtcclxuICBOYW1lOiBzdHJpbmc7XHJcbiAgRW1haWxBZGRyZXNzOiBzdHJpbmc7XHJcbiAgU3Vic2NyaXB0aW9uU3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gY3JlYXRlIGEgbmV3IHN1YnNjcmliZXIgZm9yIHRoZSBhcHBsaWNhdGlvbi4gVGhpcyBpcyBub3QgYW4gYWNjb3VudCAtIG9ubHlcclxuICAgKiBhIHN1YnNjcmlwdGlvbiB0byByZXNvdXJjZXMgZnJvbSB0aGUgYXBwbGljYXRpb24uXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXJOYW1lXFxcclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlckVtYWlsXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3Vic2NyaWJlck5hbWU6IHN0cmluZywgc3Vic2NyaWJlckVtYWlsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTmFtZSA9IHN1YnNjcmliZXJOYW1lO1xyXG4gICAgdGhpcy5FbWFpbEFkZHJlc3MgPSBzdWJzY3JpYmVyRW1haWw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlQmFzZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgU2V2ZXJpdHlcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcblxyXG4vLyBpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcbi8vIGltcG9ydCB7IFN1YnNjcmliZXJCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc3Vic2NyaWJlci1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuLy8gaW1wb3J0IHsgQ29uZmlybWF0aW9uVG9rZW4gfSBmcm9tICcuL21vZGVscy9jb25maXJtYXRpb24tdG9rZW4ubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgYnVzaW5lc3NQcm92aWRlcjogU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIobG9nZ2luZ1NlcnZpY2UpO1xyXG4gICAgdGhpcy5zZXJ2aWNlTmFtZSA9ICdBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSc7XHJcbiAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VydmljZUNvbnRleHQgPSB0aGlzLnNlcnZpY2VDb250ZXh0O1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLmxvZ2dpbmdTZXJ2aWNlID0gdGhpcy5sb2dnaW5nU2VydmljZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZWdpc3RlciBhIG5ldyBzdWJzY3JpYmVyIHRvIHRoZSBhcHBsaWNhdGlvbi5cclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlciBjb250YWlucyB0aGUgdXNlciBuYW1lIGFuZCBlbWFpbCBhZGRyZXNzIGZvciB0aGUgc3Vic2NyaWJlci5cclxuICAgKi9cclxuICByZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcik6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYFByZXBhcmluZyB0byByZWdpc3RlciBzdWJzY3JpYmVyOiAke0pTT04uc3RyaW5naWZ5KFxyXG4gICAgICBzdWJzY3JpYmVyXHJcbiAgICApfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgbWVzc2FnZSk7XHJcbiAgICByZXR1cm4gdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyKTtcclxuICB9XHJcblxyXG4gIC8vIC8qKlxyXG4gIC8vICAqIFVzZSB0byBjb25maXJtIGEgbmV3IHN1YnNjcmliZXIuXHJcbiAgLy8gICogQHBhcmFtIGNvbmZpcm1hdGlvblRva2VuIGNvbnRhaW5zIHRoZSB1c2VyIG5hbWUgYW5kIGEgW0hhc2hdIHZhbHVlIHRoYXQgaXMgdXNlZCB0byBjb25maXJtIHRoZSB1c2VyLlxyXG4gIC8vICAqL1xyXG4gIC8vIGNvbmZpcm1TdWJzY3JpYmVyKGNvbmZpcm1hdGlvblRva2VuOiBDb25maXJtYXRpb25Ub2tlbikge1xyXG4gIC8vICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGBQcmVwYXJpbmcgdG8gY29uZmlybSBzdWJzY3JpYmVyLmApO1xyXG4gIC8vICAgcmV0dXJuIHRoaXMuYnVzaW5lc3NQcm92aWRlci5jb25maXJtU3Vic2NyaWJlcihjb25maXJtYXRpb25Ub2tlbilcclxuICAvLyB9XHJcblxyXG4gIHZlcmlmeVNlcnZpY2UoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgJiZcclxuICAgICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyICYmXHJcbiAgICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5zZWN1cml0eUFwaVNlcnZpY2VcclxuICAgIClcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHtcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gIFNldmVyaXR5XHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlY3VyaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlUmVzcG9uc2UsIEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdibS1yZWdpc3Rlci1zdWJzY3JpYmVyJyxcclxuICB0ZW1wbGF0ZTogYDxhbmd1bGFybGljaW91cy1hbGVydCBbYWxlcnROb3RpZmljYXRpb25dPVwiYWxlcnROb3RpZmljYXRpb25cIiBbaGFzTWVzc2FnZV09XCJhbGVydE5vdGlmaWNhdGlvbi5zaG93QWxlcnRcIj48L2FuZ3VsYXJsaWNpb3VzLWFsZXJ0PlxyXG48IS0tIFNVQlNDUklCRSBTSUdOLVVQIEZPUk0gLS0+XHJcbjxmb3JtIFtmb3JtR3JvdXBdPVwiX2Zvcm1cIiAobmdTdWJtaXQpPVwic3VibWl0Rm9ybSgpXCI+XHJcbiAgPCEtLSBTVUJTQ1JJQkVSIE5BTUUgLS0+XHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZvcm0tZ3JvdXAtbm8tYm9yZGVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVzZXJzX2NpcmNsZS0wOFwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cInN1YnNjcmliZXJOYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIk5hbWUuLi5cIj5cclxuICA8L2Rpdj5cclxuICA8IS0tIFNVQlNDUklCRVIgRU1BSUwgLS0+XHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZvcm0tZ3JvdXAtbm8tYm9yZGVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVpLTFfZW1haWwtODVcIj48L2k+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJlbWFpbEFkZHJlc3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwuLi5cIj5cclxuICA8L2Rpdj5cclxuICA8IS0tIFNVQlNDUklCRSBCVVRUT04gLS0+XHJcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbmV1dHJhbCBidG4tcm91bmQgYnRuLWxnXCI+U3Vic2NyaWJlXHJcbiAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrIG1sLTFcIj48L2k+XHJcbiAgPC9idXR0b24+XHJcbjwvZm9ybT5cclxuPCEtLSBTVUJTQ1JJQkUgU0lHTi1VUCBGT1JNIC0tPmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnRCYXNlXHJcbiAgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBPdXRwdXQoKSBzdWJzY3JpYmUgPSBuZXcgRXZlbnRFbWl0dGVyPFNlcnZpY2VSZXNwb25zZT4oKTtcclxuICBfZm9ybTogRm9ybUdyb3VwO1xyXG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzZWN1cml0eVNlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlLFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHN1cGVyKCdSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQnLCBsb2dnaW5nU2VydmljZSwgcm91dGVyKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgc3Vic2NyaWJlck5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIGVtYWlsQWRkcmVzczogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdWJtaXRGb3JtKCkge1xyXG4gICAgdGhpcy5zZWN1cml0eVNlcnZpY2UucmVzZXRTZXJ2aWNlQ29udGV4dCgpO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIoXHJcbiAgICAgIHRoaXMuX2Zvcm0udmFsdWUuc3Vic2NyaWJlck5hbWUsXHJcbiAgICAgIHRoaXMuX2Zvcm0udmFsdWUuZW1haWxBZGRyZXNzXHJcbiAgICApO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVVc2VyKHRoaXMuc3Vic2NyaWJlcik7XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmVVc2VyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcclxuICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlXHJcbiAgICAgIC5yZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcilcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAocmVzcG9uc2U6IFNlcnZpY2VSZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVTdWJzY3JpYmVVc2VyKHJlc3BvbnNlKSxcclxuICAgICAgICBlcnJvciA9PlxyXG4gICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKGVycm9yLCB0aGlzLnNlY3VyaXR5U2VydmljZS5zZXJ2aWNlQ29udGV4dCksXHJcbiAgICAgICAgKCkgPT4gdGhpcy5maW5pc2hSZXF1ZXN0KHRoaXMuY29tcG9uZW50TmFtZSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVN1YnNjcmliZVVzZXIocmVzcG9uc2U6IFNlcnZpY2VSZXNwb25zZSkge1xyXG4gICAgY29uc3QgZnVuY3Rpb25OYW1lID0gJ2hhbmRsZVN1YnNjcmliZVVzZXInO1xyXG4gICAgY29uc3QgbG9nTWVzc2FnZSA9IGBbJHtmdW5jdGlvbk5hbWV9XTogUHJlcGFyaW5nIHRvIGhhbmRsZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgW1NlY3VyaXR5U2VydmljZV0gaW4gdGhlICR7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZVxyXG4gICAgfS5gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGxvZ01lc3NhZ2VcclxuICAgICk7XHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgaWYgKHJlc3BvbnNlLklzU3VjY2Vzcykge1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3NNZXNzYWdlID0gYFN1Y2Nlc3NmdWxseSBwcm9jZXNzZWQgcmVxdWVzdCB0byBjcmVhdGUgc3Vic2NyaWJlci4gUHJlcGFyZSB0byBkb3dubG9hZC4uLmA7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZS5lbWl0KHJlc3BvbnNlIGFzIFNlcnZpY2VSZXNwb25zZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKFxyXG4gICAgICAgICAgLy8gcmVzcG9uc2UgYXMgRXJyb3JSZXNwb25zZSxcclxuICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICB0aGlzLnNlY3VyaXR5U2VydmljZS5zZXJ2aWNlQ29udGV4dFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlLFxyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzRm91bmRhdGlvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBcGlTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsXHJcbiAgICBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUsXHJcbiAgICBBbmd1bGFybGljaW91c0NvcmVNb2R1bGUsXHJcbiAgICBBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBTZWN1cml0eUFwaVNlcnZpY2UsIC8vUFJPVklERSBJTlRFUk5BTCBTRVJWSUNFUyBGT1IgVEhFIE1PRFVMRTsgU0NPUEVEIFRPIFRISVMgTU9EVUxFO1xyXG4gICAgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSAvL1BST1ZJREUgSU5URVJOQUwgU0VSVklDRVMgRk9SIFRIRSBNT0RVTEU7IFNDT1BFRCBUTyBUSElTIE1PRFVMRTtcclxuICAgIC8vIEh0dHBCYXNlU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiQWN0aW9uQmFzZSIsInJ1bGVzLlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UiLCJTZXZlcml0eSIsImh0dHAiLCJIdHRwUmVxdWVzdE1ldGhvZCIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiSHR0cEJhc2VTZXJ2aWNlIiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSIsIlNlcnZpY2VCYXNlIiwicm91dGVyIiwiRXZlbnRFbWl0dGVyIiwiVmFsaWRhdG9ycyIsIkNvbXBvbmVudCIsIkZvcm1CdWlsZGVyIiwiUm91dGVyIiwiT3V0cHV0IiwiQ29tcG9uZW50QmFzZSIsIk5nTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNGb3VuZGF0aW9uTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FB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