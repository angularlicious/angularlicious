import { __extends } from 'tslib';
import { ActionBase, HttpBaseService, HttpRequestMethod, ServiceBase, ComponentBase, AngularliciousFoundationModule } from '@angularlicious/foundation';
import { AngularliciousRulesEngineModule, StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';
import { Severity, AngularliciousLoggingService, AngularliciousLoggingModule } from '@angularlicious/logging';
import { Injectable, Component, Output, EventEmitter, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularliciousCoreModule } from '@angularlicious/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        // Provide the [SecurityBusinessProviderService], [ServiceContext], and [LoggingService] to action;
        this.businessProvider = businessProvider;
        this.serviceContext = businessProvider.serviceContext;
        this.loggingService = businessProvider.loggingService;
        this.execute();
    };
    return SecurityActionBase;
}(ActionBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ requestUrl = 'api/subscriber/register';
        var /** @type {?} */ message = this.serviceName + " preparing to call: " + requestUrl;
        this.loggingService.log(this.serviceName, Severity.Information, message);
        var /** @type {?} */ body = JSON.stringify(subscriber);
        var /** @type {?} */ options = this.httpService.createRequestOptions(HttpRequestMethod.POST, this.httpService.createHeader(false), requestUrl, body);
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
        { type: Injectable },
    ];
    /** @nocollapse */
    SecurityApiService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: HttpBaseService, },
        { type: AngularliciousLoggingService, },
    ]; };
    return SecurityApiService;
}(HttpBaseService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ action = new RegisterSubscriberAction(subscriber);
        action.Do(this);
        return action.response;
    };
    SecurityBusinessProviderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SecurityBusinessProviderService.ctorParameters = function () { return [
        { type: AngularliciousLoggingService, },
        { type: SecurityApiService, },
    ]; };
    return SecurityBusinessProviderService;
}(ServiceBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ message = "Preparing to register subscriber: " + JSON.stringify(subscriber);
        this.loggingService.log(this.serviceName, Severity.Information, message);
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
        { type: Injectable },
    ];
    /** @nocollapse */
    AngularliciousSecurityService.ctorParameters = function () { return [
        { type: AngularliciousLoggingService, },
        { type: SecurityBusinessProviderService, },
    ]; };
    return AngularliciousSecurityService;
}(ServiceBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ functionName = 'handleSubscribeUser';
        var /** @type {?} */ logMessage = "[" + functionName + "]: Preparing to handle the response from the [SecurityService] in the " + this.componentName + ".";
        this.loggingService.log(this.componentName, Severity.Information, logMessage);
        if (response) {
            if (response.IsSuccess) {
                var /** @type {?} */ successMessage = "Successfully processed request to create subscriber. Prepare to download...";
                this.loggingService.log(this.componentName, Severity.Information, successMessage);
                this.subscribe.emit(/** @type {?} */ (response));
            }
            else {
                this.handleServiceErrors(null, this.securityService.serviceContext);
            }
        }
    };
    RegisterSubscriberComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'bm-register-subscriber',
                    template: "<angularlicious-alert [alertNotification]=\"alertNotification\" [hasMessage]=\"alertNotification.showAlert\"></angularlicious-alert>\n<!-- SUBSCRIBE SIGN-UP FORM -->\n<form [formGroup]=\"_form\" (ngSubmit)=\"submitForm()\">\n  <!-- SUBSCRIBER NAME -->\n  <div class=\"input-group form-group-no-border\">\n    <span class=\"input-group-addon\">\n      <i class=\"now-ui-icons users_circle-08\"></i>\n    </span>\n    <input type=\"text\" formControlName=\"subscriberName\" class=\"form-control\" placeholder=\"Name...\">\n  </div>\n  <!-- SUBSCRIBER EMAIL -->\n  <div class=\"input-group form-group-no-border\">\n    <span class=\"input-group-addon\">\n      <i class=\"now-ui-icons ui-1_email-85\"></i>\n    </span>\n    <input type=\"text\" formControlName=\"emailAddress\" class=\"form-control\" placeholder=\"Email...\">\n  </div>\n  <!-- SUBSCRIBE BUTTON -->\n  <button class=\"btn btn-neutral btn-round btn-lg\">Subscribe\n    <i class=\"fa fa-check ml-1\"></i>\n  </button>\n</form>\n<!-- SUBSCRIBE SIGN-UP FORM -->",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    RegisterSubscriberComponent.ctorParameters = function () { return [
        { type: AngularliciousSecurityService, },
        { type: AngularliciousLoggingService, },
        { type: FormBuilder, },
        { type: Router, },
    ]; };
    RegisterSubscriberComponent.propDecorators = {
        "subscribe": [{ type: Output },],
    };
    return RegisterSubscriberComponent;
}(ComponentBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularliciousSecurityModule = /** @class */ (function () {
    function AngularliciousSecurityModule() {
    }
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

export { AngularliciousSecurityModule, AngularliciousSecurityService, RegisterSubscriberComponent, Subscriber, SecurityApiService as ɵb, SecurityBusinessProviderService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtc2VjdXJpdHkuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24udHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQWN0aW9uQmFzZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUFjdGlvbkJhc2UgZXh0ZW5kcyBBY3Rpb25CYXNlIHtcclxuICBidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlO1xyXG4gIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIFtEb10gbWV0aG9kIHRvIHBlcmZvcm0gdGhlIGFjdGlvbi5cclxuICAgKi9cclxuICBEbyhidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlKSB7XHJcbiAgICAvLyBQcm92aWRlIHRoZSBbU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZV0sIFtTZXJ2aWNlQ29udGV4dF0sIGFuZCBbTG9nZ2luZ1NlcnZpY2VdIHRvIGFjdGlvbjtcclxuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlciA9IGJ1c2luZXNzUHJvdmlkZXI7XHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0ID0gYnVzaW5lc3NQcm92aWRlci5zZXJ2aWNlQ29udGV4dDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBidXNpbmVzc1Byb3ZpZGVyLmxvZ2dpbmdTZXJ2aWNlO1xyXG5cclxuICAgIHRoaXMuZXhlY3V0ZSgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gLy8gaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyBydWxlcyBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSHR0cEJhc2VTZXJ2aWNlLFxyXG4gIFNlcnZpY2VSZXNwb25zZSxcclxuICBFcnJvclJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QWN0aW9uQmFzZSB9IGZyb20gJy4vc2VjdXJpdHktYWN0aW9uLWJhc2UuYWN0aW9uJztcclxuaW1wb3J0IHsgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbiBleHRlbmRzIFNlY3VyaXR5QWN0aW9uQmFzZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5hY3Rpb25OYW1lID0gJ1JlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbic7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBmcm9tIHRoZSBiYXNlIFtBY3Rpb25dIGNsYXNzIHRvIGFsbG93IGZvciBydWxlcyB0byBiZSBhZGRlZCB0byB0aGVcclxuICAgKiBhY3Rpb24ncyBbVmFsaWRhdGlvbkNvbnRleHRdLiBBbnkgcnVsZXMgYWRkZWQgdG8gdGhlIFtWYWxpZGF0aW9uQ29udGV4dF0gaGVyZSB3aWxsIGJlIGV4ZWN1dGVkIHdoZW5cclxuICAgKiB0aGUgYWN0aW9uJ3MgW1ZhbGlkYXRlQWN0aW9uXSBtZXRob2QgaXMgY2FsbGVkIC0gdGhpcyBtZXRob2QgaXMganVzdCBvbmUgb2YgbWFueSBwaXBlbGluZSBtZXRob2RzXHJcbiAgICogb2YgdGhlIFtBY3Rpb25dIGZyYW1ld29yay5cclxuICAgKi9cclxuICBwcmVWYWxpZGF0ZUFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgUnVubmluZyB0aGUgW3ByZVZhbGlkYXRlQWN0aW9uXSBmb3IgdGhlICR7dGhpcy5hY3Rpb25OYW1lfSBhY3Rpb24uYFxyXG4gICAgKTtcclxuICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHRcclxuICAgICAgLndpdGhTb3VyY2UodGhpcy5hY3Rpb25OYW1lKVxyXG4gICAgICAuYWRkUnVsZShcclxuICAgICAgICBuZXcgcnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZShcclxuICAgICAgICAgICdOYW1lSXNWYWxpZCcsXHJcbiAgICAgICAgICAnVGhlIG5hbWUgdmFsdWUgaXMgbm90IHZhbGlkLiBNdXN0IGJlIGJldHdlZW4gMS00MCBjaGFyYWN0ZXJzLicsXHJcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZXIuTmFtZSxcclxuICAgICAgICAgIDIsXHJcbiAgICAgICAgICA0MCxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICAgLmFkZFJ1bGUoXHJcbiAgICAgICAgbmV3IHJ1bGVzLlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UoXHJcbiAgICAgICAgICAnRW1haWxJc1ZhbGlkJyxcclxuICAgICAgICAgICdUaGUgZW1haWwgYWRkcmVzcyB2YWx1ZSBpcyBub3QgdmFsaWQuIE11c3QgYmUgYmV0d2VlbiA1LTYwIGNoYXJhY3RlcnMuJyxcclxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlci5FbWFpbEFkZHJlc3MsXHJcbiAgICAgICAgICA1LFxyXG4gICAgICAgICAgNjAsXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHByb3ZpZGUgYnVzaW5lc3MgbG9naWMgaW1wbGVtZW50YXRpb24gLSB0aGlzIG1ldGhvZCBpcyBhbGxvd2VkIHRvIGV4ZWN1dGUgb25seSBpZiB0aGUgY3VycmVudCBhY3Rpb25cclxuICAgKiBkb2VzIG5vdCBjb250YWluIGFueSBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgcGVyZm9ybUFjdGlvbigpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUnVubmluZyB0aGUgW3BlcmZvcm1BY3Rpb25dIGZvciB0aGUgJHt0aGlzLmFjdGlvbk5hbWV9LmBcclxuICAgICk7XHJcbiAgICB0aGlzLnJlc3BvbnNlID0gdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnNlY3VyaXR5QXBpU2VydmljZS5yZWdpc3RlclN1YnNjcmliZXIoXHJcbiAgICAgIHRoaXMuc3Vic2NyaWJlclxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcclxuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9vYnNlcnZlT24nO1xyXG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBIdHRwQmFzZVNlcnZpY2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHtcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gIFNldmVyaXR5XHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QXBpU2VydmljZSBleHRlbmRzIEh0dHBCYXNlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHVibGljIGh0dHBTZXJ2aWNlOiBIdHRwQmFzZVNlcnZpY2UsXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoaHR0cCwgbG9nZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdFVybCA9ICdhcGkvc3Vic2NyaWJlci9yZWdpc3Rlcic7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5zZXJ2aWNlTmFtZX0gcHJlcGFyaW5nIHRvIGNhbGw6ICR7cmVxdWVzdFVybH1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIG1lc3NhZ2UpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShzdWJzY3JpYmVyKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZVJlcXVlc3RPcHRpb25zKFxyXG4gICAgICBIdHRwUmVxdWVzdE1ldGhvZC5QT1NULFxyXG4gICAgICB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZUhlYWRlcihmYWxzZSksXHJcbiAgICAgIHJlcXVlc3RVcmwsXHJcbiAgICAgIGJvZHlcclxuICAgICk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQob3B0aW9ucyk7XHJcblxyXG4gICAgLyoqVEVNUE9SQVJZIElNUExFTUVOVEFUSU9OICovXHJcbiAgICAvLyBjb25zdCByZXNwb25zZSA9IG5ldyBTZXJ2aWNlUmVzcG9uc2UoKTtcclxuICAgIC8vIHJlc3BvbnNlLklzU3VjY2VzcyA9IHRydWU7XHJcbiAgICAvLyByZXNwb25zZS5NZXNzYWdlID0gYEZha2UgbWVzc2FnZSBmcm9tICR7dGhpcy5zZXJ2aWNlTmFtZX1gO1xyXG4gICAgLy8gcmVzcG9uc2UuRGF0YSA9IHRydWU7XHJcbiAgICAvLyBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgLy8gcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAvKipURU1QT1JBUlkgSU1QTEVNRU5UQVRJT04gKi9cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IFNlcnZpY2VCYXNlLCBTZXJ2aWNlUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7XHJcbiAgTG9nZ2luZ1NlcnZpY2VDb25maWcsXHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb25zL3JlZ2lzdGVyLXN1YnNjcmliZXIuYWN0aW9uJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBcGlTZXJ2aWNlIH0gZnJvbSAnLi9zZWN1cml0eS1hcGkuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgc2VjdXJpdHlBcGlTZXJ2aWNlOiBTZWN1cml0eUFwaVNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGxvZ2dpbmdTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSBhY3Rpb24gdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlci5cclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlclxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24oc3Vic2NyaWJlcik7XHJcbiAgICBhY3Rpb24uRG8odGhpcyk7XHJcbiAgICByZXR1cm4gYWN0aW9uLnJlc3BvbnNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgU3Vic2NyaWJlciB7XHJcbiAgTmFtZTogc3RyaW5nO1xyXG4gIEVtYWlsQWRkcmVzczogc3RyaW5nO1xyXG4gIFN1YnNjcmlwdGlvblN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIG5ldyBzdWJzY3JpYmVyIGZvciB0aGUgYXBwbGljYXRpb24uIFRoaXMgaXMgbm90IGFuIGFjY291bnQgLSBvbmx5XHJcbiAgICogYSBzdWJzY3JpcHRpb24gdG8gcmVzb3VyY2VzIGZyb20gdGhlIGFwcGxpY2F0aW9uLlxyXG4gICAqIEBwYXJhbSBzdWJzY3JpYmVyTmFtZVxcXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXJFbWFpbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIHN1YnNjcmliZXJFbWFpbDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBzdWJzY3JpYmVyTmFtZTtcclxuICAgIHRoaXMuRW1haWxBZGRyZXNzID0gc3Vic2NyaWJlckVtYWlsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2VydmljZUJhc2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHtcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gIFNldmVyaXR5XHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5cclxuLy8gaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG4vLyBpbXBvcnQgeyBTdWJzY3JpYmVyQnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3N1YnNjcmliZXItYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbi8vIGltcG9ydCB7IENvbmZpcm1hdGlvblRva2VuIH0gZnJvbSAnLi9tb2RlbHMvY29uZmlybWF0aW9uLXRva2VuLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGxvZ2dpbmdTZXJ2aWNlKTtcclxuICAgIHRoaXMuc2VydmljZU5hbWUgPSAnQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UnO1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnNlcnZpY2VDb250ZXh0ID0gdGhpcy5zZXJ2aWNlQ29udGV4dDtcclxuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5sb2dnaW5nU2VydmljZSA9IHRoaXMubG9nZ2luZ1NlcnZpY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlciB0byB0aGUgYXBwbGljYXRpb24uXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXIgY29udGFpbnMgdGhlIHVzZXIgbmFtZSBhbmQgZW1haWwgYWRkcmVzcyBmb3IgdGhlIHN1YnNjcmliZXIuXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGBQcmVwYXJpbmcgdG8gcmVnaXN0ZXIgc3Vic2NyaWJlcjogJHtKU09OLnN0cmluZ2lmeShcclxuICAgICAgc3Vic2NyaWJlclxyXG4gICAgKX1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIHRoaXMuYnVzaW5lc3NQcm92aWRlci5yZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcik7XHJcbiAgfVxyXG5cclxuICAvLyAvKipcclxuICAvLyAgKiBVc2UgdG8gY29uZmlybSBhIG5ldyBzdWJzY3JpYmVyLlxyXG4gIC8vICAqIEBwYXJhbSBjb25maXJtYXRpb25Ub2tlbiBjb250YWlucyB0aGUgdXNlciBuYW1lIGFuZCBhIFtIYXNoXSB2YWx1ZSB0aGF0IGlzIHVzZWQgdG8gY29uZmlybSB0aGUgdXNlci5cclxuICAvLyAgKi9cclxuICAvLyBjb25maXJtU3Vic2NyaWJlcihjb25maXJtYXRpb25Ub2tlbjogQ29uZmlybWF0aW9uVG9rZW4pIHtcclxuICAvLyAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBgUHJlcGFyaW5nIHRvIGNvbmZpcm0gc3Vic2NyaWJlci5gKTtcclxuICAvLyAgIHJldHVybiB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuY29uZmlybVN1YnNjcmliZXIoY29uZmlybWF0aW9uVG9rZW4pXHJcbiAgLy8gfVxyXG5cclxuICB2ZXJpZnlTZXJ2aWNlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlICYmXHJcbiAgICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlciAmJlxyXG4gICAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VjdXJpdHlBcGlTZXJ2aWNlXHJcbiAgICApXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7XHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICBTZXZlcml0eVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZWN1cml0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZVJlc3BvbnNlLCBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnYm0tcmVnaXN0ZXItc3Vic2NyaWJlcicsXHJcbiAgdGVtcGxhdGU6IGA8YW5ndWxhcmxpY2lvdXMtYWxlcnQgW2FsZXJ0Tm90aWZpY2F0aW9uXT1cImFsZXJ0Tm90aWZpY2F0aW9uXCIgW2hhc01lc3NhZ2VdPVwiYWxlcnROb3RpZmljYXRpb24uc2hvd0FsZXJ0XCI+PC9hbmd1bGFybGljaW91cy1hbGVydD5cclxuPCEtLSBTVUJTQ1JJQkUgU0lHTi1VUCBGT1JNIC0tPlxyXG48Zm9ybSBbZm9ybUdyb3VwXT1cIl9mb3JtXCIgKG5nU3VibWl0KT1cInN1Ym1pdEZvcm0oKVwiPlxyXG4gIDwhLS0gU1VCU0NSSUJFUiBOQU1FIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmb3JtLWdyb3VwLW5vLWJvcmRlclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxyXG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1c2Vyc19jaXJjbGUtMDhcIj48L2k+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJzdWJzY3JpYmVyTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJOYW1lLi4uXCI+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBTVUJTQ1JJQkVSIEVNQUlMIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmb3JtLWdyb3VwLW5vLWJvcmRlclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxyXG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX2VtYWlsLTg1XCI+PC9pPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwiZW1haWxBZGRyZXNzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkVtYWlsLi4uXCI+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBTVUJTQ1JJQkUgQlVUVE9OIC0tPlxyXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLW5ldXRyYWwgYnRuLXJvdW5kIGJ0bi1sZ1wiPlN1YnNjcmliZVxyXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVjayBtbC0xXCI+PC9pPlxyXG4gIDwvYnV0dG9uPlxyXG48L2Zvcm0+XHJcbjwhLS0gU1VCU0NSSUJFIFNJR04tVVAgRk9STSAtLT5gLFxyXG4gIHN0eWxlczogW2BgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50QmFzZVxyXG4gIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAT3V0cHV0KCkgc3Vic2NyaWJlID0gbmV3IEV2ZW50RW1pdHRlcjxTZXJ2aWNlUmVzcG9uc2U+KCk7XHJcbiAgX2Zvcm06IEZvcm1Hcm91cDtcclxuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSxcclxuICAgIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHVibGljIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcclxuICAgIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcignUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50JywgbG9nZ2luZ1NlcnZpY2UsIHJvdXRlcik7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEZvcm0oKTogdm9pZCB7XHJcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHN1YnNjcmliZXJOYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICBlbWFpbEFkZHJlc3M6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3VibWl0Rm9ybSgpIHtcclxuICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnJlc2V0U2VydmljZUNvbnRleHQoKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyKFxyXG4gICAgICB0aGlzLl9mb3JtLnZhbHVlLnN1YnNjcmliZXJOYW1lLFxyXG4gICAgICB0aGlzLl9mb3JtLnZhbHVlLmVtYWlsQWRkcmVzc1xyXG4gICAgKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVXNlcih0aGlzLnN1YnNjcmliZXIpO1xyXG4gIH1cclxuXHJcbiAgc3Vic2NyaWJlVXNlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKSB7XHJcbiAgICB0aGlzLnNlY3VyaXR5U2VydmljZVxyXG4gICAgICAucmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKHJlc3BvbnNlOiBTZXJ2aWNlUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlU3Vic2NyaWJlVXNlcihyZXNwb25zZSksXHJcbiAgICAgICAgZXJyb3IgPT5cclxuICAgICAgICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhlcnJvciwgdGhpcy5zZWN1cml0eVNlcnZpY2Uuc2VydmljZUNvbnRleHQpLFxyXG4gICAgICAgICgpID0+IHRoaXMuZmluaXNoUmVxdWVzdCh0aGlzLmNvbXBvbmVudE5hbWUpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTdWJzY3JpYmVVc2VyKHJlc3BvbnNlOiBTZXJ2aWNlUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGZ1bmN0aW9uTmFtZSA9ICdoYW5kbGVTdWJzY3JpYmVVc2VyJztcclxuICAgIGNvbnN0IGxvZ01lc3NhZ2UgPSBgWyR7ZnVuY3Rpb25OYW1lfV06IFByZXBhcmluZyB0byBoYW5kbGUgdGhlIHJlc3BvbnNlIGZyb20gdGhlIFtTZWN1cml0eVNlcnZpY2VdIGluIHRoZSAke1xyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWVcclxuICAgIH0uYDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBsb2dNZXNzYWdlXHJcbiAgICApO1xyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5Jc1N1Y2Nlc3MpIHtcclxuICAgICAgICBjb25zdCBzdWNjZXNzTWVzc2FnZSA9IGBTdWNjZXNzZnVsbHkgcHJvY2Vzc2VkIHJlcXVlc3QgdG8gY3JlYXRlIHN1YnNjcmliZXIuIFByZXBhcmUgdG8gZG93bmxvYWQuLi5gO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBzdWNjZXNzTWVzc2FnZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUuZW1pdChyZXNwb25zZSBhcyBTZXJ2aWNlUmVzcG9uc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhcclxuICAgICAgICAgIC8vIHJlc3BvbnNlIGFzIEVycm9yUmVzcG9uc2UsXHJcbiAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgdGhpcy5zZWN1cml0eVNlcnZpY2Uuc2VydmljZUNvbnRleHRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9jb3JlJztcclxuaW1wb3J0IHsgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QXBpU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYXBpLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVnaXN0ZXItc3Vic2NyaWJlci9yZWdpc3Rlci1zdWJzY3JpYmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBIdHRwQmFzZVNlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNGb3VuZGF0aW9uTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1JlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1JlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgU2VjdXJpdHlBcGlTZXJ2aWNlLCAvL1BST1ZJREUgSU5URVJOQUwgU0VSVklDRVMgRk9SIFRIRSBNT0RVTEU7IFNDT1BFRCBUTyBUSElTIE1PRFVMRTtcclxuICAgIFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgLy9QUk9WSURFIElOVEVSTkFMIFNFUlZJQ0VTIEZPUiBUSEUgTU9EVUxFOyBTQ09QRUQgVE8gVEhJUyBNT0RVTEU7XHJcbiAgICAvLyBIdHRwQmFzZVNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c1NlY3VyaXR5TW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsInJ1bGVzLlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQUE7SUFBd0NBLHNDQUFVO0lBSWhEO2VBQ0UsaUJBQU87S0FDUjs7Ozs7Ozs7O0lBS0QsK0JBQUU7Ozs7O0lBQUYsVUFBRyxnQkFBaUQ7O1FBRWxELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztRQUV0RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDaEI7NkJBdEJIO0VBSXdDLFVBQVUsRUFtQmpELENBQUE7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