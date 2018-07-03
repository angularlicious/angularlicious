(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angularlicious/foundation'), require('rxjs/add/observable/throw'), require('@angularlicious/rules-engine'), require('@angularlicious/logging'), require('@angular/core'), require('@angular/common/http'), require('rxjs/add/operator/map'), require('rxjs/add/operator/catch'), require('rxjs/add/operator/observeOn'), require('rxjs/add/operator/toPromise'), require('@angular/router'), require('@angular/forms'), require('@angular/common'), require('@angularlicious/core')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/security', ['exports', '@angularlicious/foundation', 'rxjs/add/observable/throw', '@angularlicious/rules-engine', '@angularlicious/logging', '@angular/core', '@angular/common/http', 'rxjs/add/operator/map', 'rxjs/add/operator/catch', 'rxjs/add/operator/observeOn', 'rxjs/add/operator/toPromise', '@angular/router', '@angular/forms', '@angular/common', '@angularlicious/core'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.security = {}),global.angularliciousFoundation,global.rxjs['add/observable/throw'],global.angularliciousRulesEngine,global.angularliciousLogging,global.ng.core,global.ng.common.http,global.rxjs['add/operator/map'],global.rxjs['add/operator/catch'],global.rxjs['add/operator/observeOn'],global.rxjs['add/operator/toPromise'],global.ng.router,global.ng.forms,global.ng.common,global.angularliciousCore));
}(this, (function (exports,foundation,_throw,rules,logging,core,http,map,_catch,observeOn,toPromise,router,forms,common,core$1) { 'use strict';

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
                { type: http.HttpClient },
                { type: foundation.HttpBaseService },
                { type: logging.AngularliciousLoggingService }
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
                { type: logging.AngularliciousLoggingService },
                { type: SecurityApiService }
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
                { type: logging.AngularliciousLoggingService },
                { type: SecurityBusinessProviderService }
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
                    .subscribe(function (response) { return _this.handleSubscribeUser(response); }, function (error) { return _this.handleServiceErrors(error, _this.securityService.serviceContext); }, function () { return _this.finishRequest(_this.componentName); });
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
                { type: AngularliciousSecurityService },
                { type: logging.AngularliciousLoggingService },
                { type: forms.FormBuilder },
                { type: router.Router }
            ];
        };
        RegisterSubscriberComponent.propDecorators = {
            subscribe: [{ type: core.Output }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtc2VjdXJpdHkudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9zcmMvYnVzaW5lc3MvYWN0aW9ucy9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24udHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9zcmMvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L3NyYy9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L3NyYy9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvc3JjL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvc3JjL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9zcmMvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvc3JjL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBY3Rpb25CYXNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QWN0aW9uQmFzZSBleHRlbmRzIEFjdGlvbkJhc2Uge1xyXG4gIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2U7XHJcbiAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGUgW0RvXSBtZXRob2QgdG8gcGVyZm9ybSB0aGUgYWN0aW9uLlxyXG4gICAqL1xyXG4gIERvKGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UpIHtcclxuICAgIC8vIFByb3ZpZGUgdGhlIFtTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlXSwgW1NlcnZpY2VDb250ZXh0XSwgYW5kIFtMb2dnaW5nU2VydmljZV0gdG8gYWN0aW9uO1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyID0gYnVzaW5lc3NQcm92aWRlcjtcclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQgPSBidXNpbmVzc1Byb3ZpZGVyLnNlcnZpY2VDb250ZXh0O1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IGJ1c2luZXNzUHJvdmlkZXIubG9nZ2luZ1NlcnZpY2U7XHJcblxyXG4gICAgdGhpcy5leGVjdXRlKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XHJcbmltcG9ydCAqIGFzIHJ1bGVzIGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBIdHRwQmFzZVNlcnZpY2UsXHJcbiAgU2VydmljZVJlc3BvbnNlLFxyXG4gIEVycm9yUmVzcG9uc2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUFjdGlvbkJhc2UgfSBmcm9tICcuL3NlY3VyaXR5LWFjdGlvbi1iYXNlLmFjdGlvbic7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24gZXh0ZW5kcyBTZWN1cml0eUFjdGlvbkJhc2Uge1xyXG4gIC8vIHJlc3BvbnNlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPjtcclxuICByZXNwb25zZTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmFjdGlvbk5hbWUgPSAnUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZyb20gdGhlIGJhc2UgW0FjdGlvbl0gY2xhc3MgdG8gYWxsb3cgZm9yIHJ1bGVzIHRvIGJlIGFkZGVkIHRvIHRoZVxyXG4gICAqIGFjdGlvbidzIFtWYWxpZGF0aW9uQ29udGV4dF0uIEFueSBydWxlcyBhZGRlZCB0byB0aGUgW1ZhbGlkYXRpb25Db250ZXh0XSBoZXJlIHdpbGwgYmUgZXhlY3V0ZWQgd2hlblxyXG4gICAqIHRoZSBhY3Rpb24ncyBbVmFsaWRhdGVBY3Rpb25dIG1ldGhvZCBpcyBjYWxsZWQgLSB0aGlzIG1ldGhvZCBpcyBqdXN0IG9uZSBvZiBtYW55IHBpcGVsaW5lIG1ldGhvZHNcclxuICAgKiBvZiB0aGUgW0FjdGlvbl0gZnJhbWV3b3JrLlxyXG4gICAqL1xyXG4gIHByZVZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIGBSdW5uaW5nIHRoZSBbcHJlVmFsaWRhdGVBY3Rpb25dIGZvciB0aGUgJHt0aGlzLmFjdGlvbk5hbWV9IGFjdGlvbi5gXHJcbiAgICApO1xyXG4gICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dFxyXG4gICAgICAud2l0aFNvdXJjZSh0aGlzLmFjdGlvbk5hbWUpXHJcbiAgICAgIC5hZGRSdWxlKFxyXG4gICAgICAgIG5ldyBydWxlcy5TdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxyXG4gICAgICAgICAgJ05hbWVJc1ZhbGlkJyxcclxuICAgICAgICAgICdUaGUgbmFtZSB2YWx1ZSBpcyBub3QgdmFsaWQuIE11c3QgYmUgYmV0d2VlbiAxLTQwIGNoYXJhY3RlcnMuJyxcclxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlci5OYW1lLFxyXG4gICAgICAgICAgMixcclxuICAgICAgICAgIDQwLFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgICAuYWRkUnVsZShcclxuICAgICAgICBuZXcgcnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZShcclxuICAgICAgICAgICdFbWFpbElzVmFsaWQnLFxyXG4gICAgICAgICAgJ1RoZSBlbWFpbCBhZGRyZXNzIHZhbHVlIGlzIG5vdCB2YWxpZC4gTXVzdCBiZSBiZXR3ZWVuIDUtNjAgY2hhcmFjdGVycy4nLFxyXG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVyLkVtYWlsQWRkcmVzcyxcclxuICAgICAgICAgIDUsXHJcbiAgICAgICAgICA2MCxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvdmlkZSBidXNpbmVzcyBsb2dpYyBpbXBsZW1lbnRhdGlvbiAtIHRoaXMgbWV0aG9kIGlzIGFsbG93ZWQgdG8gZXhlY3V0ZSBvbmx5IGlmIHRoZSBjdXJyZW50IGFjdGlvblxyXG4gICAqIGRvZXMgbm90IGNvbnRhaW4gYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBwZXJmb3JtQWN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSdW5uaW5nIHRoZSBbcGVyZm9ybUFjdGlvbl0gZm9yIHRoZSAke3RoaXMuYWN0aW9uTmFtZX0uYFxyXG4gICAgKTtcclxuICAgIHRoaXMucmVzcG9uc2UgPSB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VjdXJpdHlBcGlTZXJ2aWNlLnJlZ2lzdGVyU3Vic2NyaWJlcih0aGlzLnN1YnNjcmliZXIpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL29ic2VydmVPbic7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLCBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QXBpU2VydmljZSBleHRlbmRzIEh0dHBCYXNlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHVibGljIGh0dHBTZXJ2aWNlOiBIdHRwQmFzZVNlcnZpY2UsXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoaHR0cCwgbG9nZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdFVybCA9ICdhcGkvc3Vic2NyaWJlci9yZWdpc3Rlcic7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5zZXJ2aWNlTmFtZX0gcHJlcGFyaW5nIHRvIGNhbGw6ICR7cmVxdWVzdFVybH1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIG1lc3NhZ2UpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShzdWJzY3JpYmVyKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZVJlcXVlc3RPcHRpb25zKFxyXG4gICAgICBIdHRwUmVxdWVzdE1ldGhvZC5QT1NULFxyXG4gICAgICB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZUhlYWRlcihmYWxzZSksXHJcbiAgICAgIHJlcXVlc3RVcmwsXHJcbiAgICAgIGJvZHlcclxuICAgICk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQob3B0aW9ucyk7XHJcblxyXG4gICAgLyoqVEVNUE9SQVJZIElNUExFTUVOVEFUSU9OICovXHJcbiAgICAvLyBjb25zdCByZXNwb25zZSA9IG5ldyBTZXJ2aWNlUmVzcG9uc2UoKTtcclxuICAgIC8vIHJlc3BvbnNlLklzU3VjY2VzcyA9IHRydWU7XHJcbiAgICAvLyByZXNwb25zZS5NZXNzYWdlID0gYEZha2UgbWVzc2FnZSBmcm9tICR7dGhpcy5zZXJ2aWNlTmFtZX1gO1xyXG4gICAgLy8gcmVzcG9uc2UuRGF0YSA9IHRydWU7XHJcbiAgICAvLyBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgLy8gcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAvKipURU1QT1JBUlkgSU1QTEVNRU5UQVRJT04gKi9cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IFNlcnZpY2VCYXNlLCBTZXJ2aWNlUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7XHJcbiAgbG9nZ2luZ1NlcnZpY2VDb25maWcsXHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb25zL3JlZ2lzdGVyLXN1YnNjcmliZXIuYWN0aW9uJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUFwaVNlcnZpY2UgfSBmcm9tICcuL3NlY3VyaXR5LWFwaS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHB1YmxpYyBzZWN1cml0eUFwaVNlcnZpY2U6IFNlY3VyaXR5QXBpU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIobG9nZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIGFjdGlvbiB0byByZWdpc3RlciBhIG5ldyBzdWJzY3JpYmVyLlxyXG4gICAqIEBwYXJhbSBzdWJzY3JpYmVyXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gbmV3IFJlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbihzdWJzY3JpYmVyKTtcclxuICAgIGFjdGlvbi5Ebyh0aGlzKTtcclxuICAgIHJldHVybiBhY3Rpb24ucmVzcG9uc2U7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTdWJzY3JpYmVyIHtcclxuICBOYW1lOiBzdHJpbmc7XHJcbiAgRW1haWxBZGRyZXNzOiBzdHJpbmc7XHJcbiAgU3Vic2NyaXB0aW9uU3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gY3JlYXRlIGEgbmV3IHN1YnNjcmliZXIgZm9yIHRoZSBhcHBsaWNhdGlvbi4gVGhpcyBpcyBub3QgYW4gYWNjb3VudCAtIG9ubHlcclxuICAgKiBhIHN1YnNjcmlwdGlvbiB0byByZXNvdXJjZXMgZnJvbSB0aGUgYXBwbGljYXRpb24uXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXJOYW1lXFxcclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlckVtYWlsXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3Vic2NyaWJlck5hbWU6IHN0cmluZywgc3Vic2NyaWJlckVtYWlsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTmFtZSA9IHN1YnNjcmliZXJOYW1lO1xyXG4gICAgdGhpcy5FbWFpbEFkZHJlc3MgPSBzdWJzY3JpYmVyRW1haWw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlQmFzZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLCBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuXHJcbi8vIGltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuLy8gaW1wb3J0IHsgU3Vic2NyaWJlckJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zdWJzY3JpYmVyLWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG4vLyBpbXBvcnQgeyBDb25maXJtYXRpb25Ub2tlbiB9IGZyb20gJy4vbW9kZWxzL2NvbmZpcm1hdGlvbi10b2tlbi5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSBleHRlbmRzIFNlcnZpY2VCYXNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihsb2dnaW5nU2VydmljZSk7XHJcbiAgICB0aGlzLnNlcnZpY2VOYW1lID0gJ0FuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlJztcclxuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5zZXJ2aWNlQ29udGV4dCA9IHRoaXMuc2VydmljZUNvbnRleHQ7XHJcbiAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIubG9nZ2luZ1NlcnZpY2UgPSB0aGlzLmxvZ2dpbmdTZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlZ2lzdGVyIGEgbmV3IHN1YnNjcmliZXIgdG8gdGhlIGFwcGxpY2F0aW9uLlxyXG4gICAqIEBwYXJhbSBzdWJzY3JpYmVyIGNvbnRhaW5zIHRoZSB1c2VyIG5hbWUgYW5kIGVtYWlsIGFkZHJlc3MgZm9yIHRoZSBzdWJzY3JpYmVyLlxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgUHJlcGFyaW5nIHRvIHJlZ2lzdGVyIHN1YnNjcmliZXI6ICR7SlNPTi5zdHJpbmdpZnkoc3Vic2NyaWJlcil9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBtZXNzYWdlKTtcclxuICAgIHJldHVybiB0aGlzLmJ1c2luZXNzUHJvdmlkZXIucmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIpO1xyXG4gIH1cclxuXHJcbiAgLy8gLyoqXHJcbiAgLy8gICogVXNlIHRvIGNvbmZpcm0gYSBuZXcgc3Vic2NyaWJlci5cclxuICAvLyAgKiBAcGFyYW0gY29uZmlybWF0aW9uVG9rZW4gY29udGFpbnMgdGhlIHVzZXIgbmFtZSBhbmQgYSBbSGFzaF0gdmFsdWUgdGhhdCBpcyB1c2VkIHRvIGNvbmZpcm0gdGhlIHVzZXIuXHJcbiAgLy8gICovXHJcbiAgLy8gY29uZmlybVN1YnNjcmliZXIoY29uZmlybWF0aW9uVG9rZW46IENvbmZpcm1hdGlvblRva2VuKSB7XHJcbiAgLy8gICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgYFByZXBhcmluZyB0byBjb25maXJtIHN1YnNjcmliZXIuYCk7XHJcbiAgLy8gICByZXR1cm4gdGhpcy5idXNpbmVzc1Byb3ZpZGVyLmNvbmZpcm1TdWJzY3JpYmVyKGNvbmZpcm1hdGlvblRva2VuKVxyXG4gIC8vIH1cclxuXHJcbiAgdmVyaWZ5U2VydmljZSgpOiBib29sZWFuIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSAmJlxyXG4gICAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIgJiZcclxuICAgICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnNlY3VyaXR5QXBpU2VydmljZVxyXG4gICAgKVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLCBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VjdXJpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VSZXNwb25zZSwgRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ2JtLXJlZ2lzdGVyLXN1YnNjcmliZXInLFxyXG4gIHRlbXBsYXRlOiBgPGFuZ3VsYXJsaWNpb3VzLWFsZXJ0IFthbGVydE5vdGlmaWNhdGlvbl09XCJhbGVydE5vdGlmaWNhdGlvblwiIFtoYXNNZXNzYWdlXT1cImFsZXJ0Tm90aWZpY2F0aW9uLnNob3dBbGVydFwiPjwvYW5ndWxhcmxpY2lvdXMtYWxlcnQ+XHJcbjwhLS0gU1VCU0NSSUJFIFNJR04tVVAgRk9STSAtLT5cclxuPGZvcm0gW2Zvcm1Hcm91cF09XCJfZm9ybVwiIChuZ1N1Ym1pdCk9XCJzdWJtaXRGb3JtKClcIj5cclxuICA8IS0tIFNVQlNDUklCRVIgTkFNRSAtLT5cclxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZm9ybS1ncm91cC1uby1ib3JkZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cclxuICAgICAgPGkgY2xhc3M9XCJub3ctdWktaWNvbnMgdXNlcnNfY2lyY2xlLTA4XCI+PC9pPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwic3Vic2NyaWJlck5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiTmFtZS4uLlwiPlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gU1VCU0NSSUJFUiBFTUFJTCAtLT5cclxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZm9ybS1ncm91cC1uby1ib3JkZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cclxuICAgICAgPGkgY2xhc3M9XCJub3ctdWktaWNvbnMgdWktMV9lbWFpbC04NVwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cImVtYWlsQWRkcmVzc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbWFpbC4uLlwiPlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gU1VCU0NSSUJFIEJVVFRPTiAtLT5cclxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1uZXV0cmFsIGJ0bi1yb3VuZCBidG4tbGdcIj5TdWJzY3JpYmVcclxuICAgIDxpIGNsYXNzPVwiZmEgZmEtY2hlY2sgbWwtMVwiPjwvaT5cclxuICA8L2J1dHRvbj5cclxuPC9mb3JtPlxyXG48IS0tIFNVQlNDUklCRSBTSUdOLVVQIEZPUk0gLS0+YCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudEJhc2VcclxuICBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQE91dHB1dCgpIHN1YnNjcmliZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2VydmljZVJlc3BvbnNlPigpO1xyXG4gIF9mb3JtOiBGb3JtR3JvdXA7XHJcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHNlY3VyaXR5U2VydmljZTogQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UsXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHB1YmxpYyBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgc3VwZXIoJ1JlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudCcsIGxvZ2dpbmdTZXJ2aWNlLCByb3V0ZXIpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmJ1aWxkRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRGb3JtKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBzdWJzY3JpYmVyTmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgZW1haWxBZGRyZXNzOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN1Ym1pdEZvcm0oKSB7XHJcbiAgICB0aGlzLnNlY3VyaXR5U2VydmljZS5yZXNldFNlcnZpY2VDb250ZXh0KCk7XHJcbiAgICB0aGlzLnN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcihcclxuICAgICAgdGhpcy5fZm9ybS52YWx1ZS5zdWJzY3JpYmVyTmFtZSxcclxuICAgICAgdGhpcy5fZm9ybS52YWx1ZS5lbWFpbEFkZHJlc3NcclxuICAgICk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVVzZXIodGhpcy5zdWJzY3JpYmVyKTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZVVzZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcikge1xyXG4gICAgdGhpcy5zZWN1cml0eVNlcnZpY2VcclxuICAgICAgLnJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXNwb25zZTogU2VydmljZVJlc3BvbnNlKSA9PiB0aGlzLmhhbmRsZVN1YnNjcmliZVVzZXIocmVzcG9uc2UpLFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhlcnJvciwgdGhpcy5zZWN1cml0eVNlcnZpY2Uuc2VydmljZUNvbnRleHQpLFxyXG4gICAgICAgICgpID0+IHRoaXMuZmluaXNoUmVxdWVzdCh0aGlzLmNvbXBvbmVudE5hbWUpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTdWJzY3JpYmVVc2VyKHJlc3BvbnNlOiBTZXJ2aWNlUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGZ1bmN0aW9uTmFtZSA9ICdoYW5kbGVTdWJzY3JpYmVVc2VyJztcclxuICAgIGNvbnN0IGxvZ01lc3NhZ2UgPSBgWyR7ZnVuY3Rpb25OYW1lfV06IFByZXBhcmluZyB0byBoYW5kbGUgdGhlIHJlc3BvbnNlIGZyb20gdGhlIFtTZWN1cml0eVNlcnZpY2VdIGluIHRoZSAke1xyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWVcclxuICAgIH0uYDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuY29tcG9uZW50TmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGxvZ01lc3NhZ2UpO1xyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5Jc1N1Y2Nlc3MpIHtcclxuICAgICAgICBjb25zdCBzdWNjZXNzTWVzc2FnZSA9IGBTdWNjZXNzZnVsbHkgcHJvY2Vzc2VkIHJlcXVlc3QgdG8gY3JlYXRlIHN1YnNjcmliZXIuIFByZXBhcmUgdG8gZG93bmxvYWQuLi5gO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBzdWNjZXNzTWVzc2FnZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUuZW1pdChyZXNwb25zZSBhcyBTZXJ2aWNlUmVzcG9uc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhcclxuICAgICAgICAgIC8vIHJlc3BvbnNlIGFzIEVycm9yUmVzcG9uc2UsXHJcbiAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgdGhpcy5zZWN1cml0eVNlcnZpY2Uuc2VydmljZUNvbnRleHRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9jb3JlJztcclxuaW1wb3J0IHsgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QXBpU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYXBpLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVnaXN0ZXItc3Vic2NyaWJlci9yZWdpc3Rlci1zdWJzY3JpYmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBpbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNGb3VuZGF0aW9uTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBTZWN1cml0eUFwaVNlcnZpY2UsIC8vUFJPVklERSBJTlRFUk5BTCBTRVJWSUNFUyBGT1IgVEhFIE1PRFVMRTsgU0NPUEVEIFRPIFRISVMgTU9EVUxFO1xyXG4gICAgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSAvL1BST1ZJREUgSU5URVJOQUwgU0VSVklDRVMgRk9SIFRIRSBNT0RVTEU7IFNDT1BFRCBUTyBUSElTIE1PRFVMRTtcclxuICAgIC8vIEh0dHBCYXNlU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiQWN0aW9uQmFzZSIsInJ1bGVzLlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UiLCJTZXZlcml0eSIsImh0dHAiLCJIdHRwUmVxdWVzdE1ldGhvZCIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiSHR0cEJhc2VTZXJ2aWNlIiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSIsIlNlcnZpY2VCYXNlIiwicm91dGVyIiwiRXZlbnRFbWl0dGVyIiwiVmFsaWRhdG9ycyIsIkNvbXBvbmVudCIsIkZvcm1CdWlsZGVyIiwiUm91dGVyIiwiT3V0cHV0IiwiQ29tcG9uZW50QmFzZSIsIk5nTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNGb3VuZGF0aW9uTW9kdWxlIiwiQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFD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