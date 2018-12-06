import { CommonModule } from '@angular/common';
import { AngularliciousCoreModule } from '@angularlicious/core';
import { Router } from '@angular/router';
import { __extends } from 'tslib';
import { Injectable, Component, Output, EventEmitter, NgModule } from '@angular/core';
import { ActionBase, HttpBaseService, HttpRequestMethod, ServiceBase, ComponentBase, AngularliciousFoundationModule } from '@angularlicious/foundation';
import { Severity, AngularliciousLoggingService, AngularliciousLoggingModule } from '@angularlicious/logging';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularliciousRulesEngineModule, StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';
import { LoggingConfig } from '@angularlicious/configuration';

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
}(ActionBase));

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
            .addRule(new StringIsNotNullEmptyRange('NameIsValid', 'The name value is not valid. Must be between 1-40 characters.', this.subscriber.Name, 2, 40, true))
            .addRule(new StringIsNotNullEmptyRange('EmailIsValid', 'The email address value is not valid. Must be between 5-60 characters.', this.subscriber.EmailAddress, 5, 60, true));
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
        this.loggingService.log(this.actionName, Severity.Information, "Running the [performAction] for the " + this.actionName + ".");
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
    function SecurityApiService(http, httpService, loggingService) {
        var _this = _super.call(this, http, loggingService) || this;
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
        this.loggingService.log(this.serviceName, Severity.Information, message);
        /** @type {?} */
        var body = JSON.stringify(subscriber);
        /** @type {?} */
        var options = this.httpService.createRequestOptions(HttpRequestMethod.post, this.httpService.createHeader(false), requestUrl, body);
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
        { type: Injectable }
    ];
    /** @nocollapse */
    SecurityApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: HttpBaseService },
        { type: AngularliciousLoggingService }
    ]; };
    return SecurityApiService;
}(HttpBaseService));

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
        { type: Injectable }
    ];
    /** @nocollapse */
    SecurityBusinessProviderService.ctorParameters = function () { return [
        { type: AngularliciousLoggingService },
        { type: SecurityApiService }
    ]; };
    return SecurityBusinessProviderService;
}(ServiceBase));

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
        this.loggingService.log(this.serviceName, Severity.Information, message);
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
        { type: Injectable }
    ];
    /** @nocollapse */
    AngularliciousSecurityService.ctorParameters = function () { return [
        { type: AngularliciousLoggingService },
        { type: SecurityBusinessProviderService }
    ]; };
    return AngularliciousSecurityService;
}(ServiceBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RegisterSubscriberComponent = /** @class */ (function (_super) {
    __extends(RegisterSubscriberComponent, _super);
    function RegisterSubscriberComponent(securityService, loggingService, formBuilder, router) {
        var _this = _super.call(this, 'RegisterSubscriberComponent', loggingService, router) || this;
        _this.securityService = securityService;
        _this.formBuilder = formBuilder;
        _this.subscribe = new EventEmitter();
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
            subscriberName: ['', Validators.required],
            emailAddress: ['', Validators.required]
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
        this.loggingService.log(this.componentName, Severity.Information, logMessage);
        if (response) {
            if (response.IsSuccess) {
                /** @type {?} */
                var successMessage = "Successfully processed request to create subscriber. Prepare to download...";
                this.loggingService.log(this.componentName, Severity.Information, successMessage);
                this.subscribe.emit((/** @type {?} */ (response)));
            }
            else {
                this.handleServiceErrors(
                // response as ErrorResponse,
                null, this.securityService.serviceContext);
            }
        }
    };
    RegisterSubscriberComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'bm-register-subscriber',
                    template: "<angularlicious-alert [alertNotification]=\"alertNotification\" [hasMessage]=\"alertNotification.showAlert\"></angularlicious-alert>\r\n<!-- SUBSCRIBE SIGN-UP FORM -->\r\n<form [formGroup]=\"_form\" (ngSubmit)=\"submitForm()\">\r\n  <!-- SUBSCRIBER NAME -->\r\n  <div class=\"input-group form-group-no-border\">\r\n    <span class=\"input-group-addon\">\r\n      <i class=\"now-ui-icons users_circle-08\"></i>\r\n    </span>\r\n    <input type=\"text\" formControlName=\"subscriberName\" class=\"form-control\" placeholder=\"Name...\">\r\n  </div>\r\n  <!-- SUBSCRIBER EMAIL -->\r\n  <div class=\"input-group form-group-no-border\">\r\n    <span class=\"input-group-addon\">\r\n      <i class=\"now-ui-icons ui-1_email-85\"></i>\r\n    </span>\r\n    <input type=\"text\" formControlName=\"emailAddress\" class=\"form-control\" placeholder=\"Email...\">\r\n  </div>\r\n  <!-- SUBSCRIBE BUTTON -->\r\n  <button class=\"btn btn-neutral btn-round btn-lg\">Subscribe\r\n    <i class=\"fa fa-check ml-1\"></i>\r\n  </button>\r\n</form>\r\n<!-- SUBSCRIBE SIGN-UP FORM -->",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    RegisterSubscriberComponent.ctorParameters = function () { return [
        { type: AngularliciousSecurityService },
        { type: AngularliciousLoggingService },
        { type: FormBuilder },
        { type: Router }
    ]; };
    RegisterSubscriberComponent.propDecorators = {
        subscribe: [{ type: Output }]
    };
    return RegisterSubscriberComponent;
}(ComponentBase));

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
                    provide: LoggingConfig,
                    useValue: config
                },
                HttpClientModule
            ]
        };
    };
    AngularliciousSecurityModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        AngularliciousLoggingModule,
                        AngularliciousFoundationModule,
                        AngularliciousCoreModule,
                        AngularliciousRulesEngineModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        HttpClientModule
                    ],
                    declarations: [RegisterSubscriberComponent],
                    exports: [RegisterSubscriberComponent],
                    providers: [
                        AngularliciousLoggingService,
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

export { AngularliciousSecurityModule, AngularliciousSecurityService, RegisterSubscriberComponent, Subscriber, SecurityApiService as ɵb, SecurityBusinessProviderService as ɵa };

//# sourceMappingURL=angularlicious-security.js.map