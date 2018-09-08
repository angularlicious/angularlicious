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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtc2VjdXJpdHkuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24udHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBBY3Rpb25CYXNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgU2VjdXJpdHlBY3Rpb25CYXNlIGV4dGVuZHMgQWN0aW9uQmFzZSB7XG4gIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2U7XG4gIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBbRG9dIG1ldGhvZCB0byBwZXJmb3JtIHRoZSBhY3Rpb24uXG4gICAqL1xuICBEbyhidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlKSB7XG4gICAgLy8gUHJvdmlkZSB0aGUgW1NlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2VdLCBbU2VydmljZUNvbnRleHRdLCBhbmQgW0xvZ2dpbmdTZXJ2aWNlXSB0byBhY3Rpb247XG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyID0gYnVzaW5lc3NQcm92aWRlcjtcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0ID0gYnVzaW5lc3NQcm92aWRlci5zZXJ2aWNlQ29udGV4dDtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gYnVzaW5lc3NQcm92aWRlci5sb2dnaW5nU2VydmljZTtcblxuICAgIHRoaXMuZXhlY3V0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLy8gLy8gaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IEFjdGlvblJlc3VsdCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9hY3Rpb25zJztcbmltcG9ydCAqIGFzIHJ1bGVzIGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuXG5pbXBvcnQge1xuICBIdHRwQmFzZVNlcnZpY2UsXG4gIFNlcnZpY2VSZXNwb25zZSxcbiAgRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcblxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xuaW1wb3J0IHsgU2VjdXJpdHlBY3Rpb25CYXNlIH0gZnJvbSAnLi9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24nO1xuaW1wb3J0IHsgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uIGV4dGVuZHMgU2VjdXJpdHlBY3Rpb25CYXNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFjdGlvbk5hbWUgPSAnUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBmcm9tIHRoZSBiYXNlIFtBY3Rpb25dIGNsYXNzIHRvIGFsbG93IGZvciBydWxlcyB0byBiZSBhZGRlZCB0byB0aGVcbiAgICogYWN0aW9uJ3MgW1ZhbGlkYXRpb25Db250ZXh0XS4gQW55IHJ1bGVzIGFkZGVkIHRvIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdIGhlcmUgd2lsbCBiZSBleGVjdXRlZCB3aGVuXG4gICAqIHRoZSBhY3Rpb24ncyBbVmFsaWRhdGVBY3Rpb25dIG1ldGhvZCBpcyBjYWxsZWQgLSB0aGlzIG1ldGhvZCBpcyBqdXN0IG9uZSBvZiBtYW55IHBpcGVsaW5lIG1ldGhvZHNcbiAgICogb2YgdGhlIFtBY3Rpb25dIGZyYW1ld29yay5cbiAgICovXG4gIHByZVZhbGlkYXRlQWN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFJ1bm5pbmcgdGhlIFtwcmVWYWxpZGF0ZUFjdGlvbl0gZm9yIHRoZSAke3RoaXMuYWN0aW9uTmFtZX0gYWN0aW9uLmBcbiAgICApO1xuICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHRcbiAgICAgIC53aXRoU291cmNlKHRoaXMuYWN0aW9uTmFtZSlcbiAgICAgIC5hZGRSdWxlKFxuICAgICAgICBuZXcgcnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZShcbiAgICAgICAgICAnTmFtZUlzVmFsaWQnLFxuICAgICAgICAgICdUaGUgbmFtZSB2YWx1ZSBpcyBub3QgdmFsaWQuIE11c3QgYmUgYmV0d2VlbiAxLTQwIGNoYXJhY3RlcnMuJyxcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZXIuTmFtZSxcbiAgICAgICAgICAyLFxuICAgICAgICAgIDQwLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmFkZFJ1bGUoXG4gICAgICAgIG5ldyBydWxlcy5TdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxuICAgICAgICAgICdFbWFpbElzVmFsaWQnLFxuICAgICAgICAgICdUaGUgZW1haWwgYWRkcmVzcyB2YWx1ZSBpcyBub3QgdmFsaWQuIE11c3QgYmUgYmV0d2VlbiA1LTYwIGNoYXJhY3RlcnMuJyxcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZXIuRW1haWxBZGRyZXNzLFxuICAgICAgICAgIDUsXG4gICAgICAgICAgNjAsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBwcm92aWRlIGJ1c2luZXNzIGxvZ2ljIGltcGxlbWVudGF0aW9uIC0gdGhpcyBtZXRob2QgaXMgYWxsb3dlZCB0byBleGVjdXRlIG9ubHkgaWYgdGhlIGN1cnJlbnQgYWN0aW9uXG4gICAqIGRvZXMgbm90IGNvbnRhaW4gYW55IHJ1bGUgdmlvbGF0aW9ucy5cbiAgICovXG4gIHBlcmZvcm1BY3Rpb24oKSB7XG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcbiAgICAgIGBSdW5uaW5nIHRoZSBbcGVyZm9ybUFjdGlvbl0gZm9yIHRoZSAke3RoaXMuYWN0aW9uTmFtZX0uYFxuICAgICk7XG4gICAgdGhpcy5yZXNwb25zZSA9IHRoaXMuYnVzaW5lc3NQcm92aWRlci5zZWN1cml0eUFwaVNlcnZpY2UucmVnaXN0ZXJTdWJzY3JpYmVyKFxuICAgICAgdGhpcy5zdWJzY3JpYmVyXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivb2JzZXJ2ZU9uJztcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBIdHRwQmFzZVNlcnZpY2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcbmltcG9ydCB7XG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXG4gIFNldmVyaXR5XG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VjdXJpdHlBcGlTZXJ2aWNlIGV4dGVuZHMgSHR0cEJhc2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgaHR0cDogSHR0cENsaWVudCxcbiAgICBwdWJsaWMgaHR0cFNlcnZpY2U6IEh0dHBCYXNlU2VydmljZSxcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxuICApIHtcbiAgICBzdXBlcihodHRwLCBsb2dnaW5nU2VydmljZSk7XG4gIH1cblxuICByZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcik6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9ICdhcGkvc3Vic2NyaWJlci9yZWdpc3Rlcic7XG4gICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMuc2VydmljZU5hbWV9IHByZXBhcmluZyB0byBjYWxsOiAke3JlcXVlc3RVcmx9YDtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgbWVzc2FnZSk7XG5cbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoc3Vic2NyaWJlcik7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuaHR0cFNlcnZpY2UuY3JlYXRlUmVxdWVzdE9wdGlvbnMoXG4gICAgICBIdHRwUmVxdWVzdE1ldGhvZC5QT1NULFxuICAgICAgdGhpcy5odHRwU2VydmljZS5jcmVhdGVIZWFkZXIoZmFsc2UpLFxuICAgICAgcmVxdWVzdFVybCxcbiAgICAgIGJvZHlcbiAgICApO1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChvcHRpb25zKTtcblxuICAgIC8qKlRFTVBPUkFSWSBJTVBMRU1FTlRBVElPTiAqL1xuICAgIC8vIGNvbnN0IHJlc3BvbnNlID0gbmV3IFNlcnZpY2VSZXNwb25zZSgpO1xuICAgIC8vIHJlc3BvbnNlLklzU3VjY2VzcyA9IHRydWU7XG4gICAgLy8gcmVzcG9uc2UuTWVzc2FnZSA9IGBGYWtlIG1lc3NhZ2UgZnJvbSAke3RoaXMuc2VydmljZU5hbWV9YDtcbiAgICAvLyByZXNwb25zZS5EYXRhID0gdHJ1ZTtcbiAgICAvLyBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xuICAgIC8vIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIC8qKlRFTVBPUkFSWSBJTVBMRU1FTlRBVElPTiAqL1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IFNlcnZpY2VCYXNlLCBTZXJ2aWNlUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XG5pbXBvcnQge1xuICBMb2dnaW5nU2VydmljZUNvbmZpZyxcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XG5pbXBvcnQgeyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24gfSBmcm9tICcuL2FjdGlvbnMvcmVnaXN0ZXItc3Vic2NyaWJlci5hY3Rpb24nO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xuaW1wb3J0IHsgU2VjdXJpdHlBcGlTZXJ2aWNlIH0gZnJvbSAnLi9zZWN1cml0eS1hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgICBwdWJsaWMgc2VjdXJpdHlBcGlTZXJ2aWNlOiBTZWN1cml0eUFwaVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIobG9nZ2luZ1NlcnZpY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSBhY3Rpb24gdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlci5cbiAgICogQHBhcmFtIHN1YnNjcmliZXJcbiAgICovXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcbiAgICBjb25zdCBhY3Rpb24gPSBuZXcgUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uKHN1YnNjcmliZXIpO1xuICAgIGFjdGlvbi5Ebyh0aGlzKTtcbiAgICByZXR1cm4gYWN0aW9uLnJlc3BvbnNlO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU3Vic2NyaWJlciB7XG4gIE5hbWU6IHN0cmluZztcbiAgRW1haWxBZGRyZXNzOiBzdHJpbmc7XG4gIFN1YnNjcmlwdGlvblN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKTtcblxuICAvKipcbiAgICogVXNlIHRvIGNyZWF0ZSBhIG5ldyBzdWJzY3JpYmVyIGZvciB0aGUgYXBwbGljYXRpb24uIFRoaXMgaXMgbm90IGFuIGFjY291bnQgLSBvbmx5XG4gICAqIGEgc3Vic2NyaXB0aW9uIHRvIHJlc291cmNlcyBmcm9tIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQHBhcmFtIHN1YnNjcmliZXJOYW1lXFxcbiAgICogQHBhcmFtIHN1YnNjcmliZXJFbWFpbFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3Vic2NyaWJlck5hbWU6IHN0cmluZywgc3Vic2NyaWJlckVtYWlsOiBzdHJpbmcpIHtcbiAgICB0aGlzLk5hbWUgPSBzdWJzY3JpYmVyTmFtZTtcbiAgICB0aGlzLkVtYWlsQWRkcmVzcyA9IHN1YnNjcmliZXJFbWFpbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VydmljZUJhc2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcbmltcG9ydCB7XG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXG4gIFNldmVyaXR5XG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcbmltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xuXG4vLyBpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XG4vLyBpbXBvcnQgeyBTdWJzY3JpYmVyQnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3N1YnNjcmliZXItYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XG4vLyBpbXBvcnQgeyBDb25maXJtYXRpb25Ub2tlbiB9IGZyb20gJy4vbW9kZWxzL2NvbmZpcm1hdGlvbi10b2tlbi5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSBleHRlbmRzIFNlcnZpY2VCYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGxvZ2dpbmdTZXJ2aWNlKTtcbiAgICB0aGlzLnNlcnZpY2VOYW1lID0gJ0FuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlJztcbiAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VydmljZUNvbnRleHQgPSB0aGlzLnNlcnZpY2VDb250ZXh0O1xuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5sb2dnaW5nU2VydmljZSA9IHRoaXMubG9nZ2luZ1NlcnZpY2U7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJlZ2lzdGVyIGEgbmV3IHN1YnNjcmliZXIgdG8gdGhlIGFwcGxpY2F0aW9uLlxuICAgKiBAcGFyYW0gc3Vic2NyaWJlciBjb250YWlucyB0aGUgdXNlciBuYW1lIGFuZCBlbWFpbCBhZGRyZXNzIGZvciB0aGUgc3Vic2NyaWJlci5cbiAgICovXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYFByZXBhcmluZyB0byByZWdpc3RlciBzdWJzY3JpYmVyOiAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgc3Vic2NyaWJlclxuICAgICl9YDtcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgbWVzc2FnZSk7XG4gICAgcmV0dXJuIHRoaXMuYnVzaW5lc3NQcm92aWRlci5yZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcik7XG4gIH1cblxuICAvLyAvKipcbiAgLy8gICogVXNlIHRvIGNvbmZpcm0gYSBuZXcgc3Vic2NyaWJlci5cbiAgLy8gICogQHBhcmFtIGNvbmZpcm1hdGlvblRva2VuIGNvbnRhaW5zIHRoZSB1c2VyIG5hbWUgYW5kIGEgW0hhc2hdIHZhbHVlIHRoYXQgaXMgdXNlZCB0byBjb25maXJtIHRoZSB1c2VyLlxuICAvLyAgKi9cbiAgLy8gY29uZmlybVN1YnNjcmliZXIoY29uZmlybWF0aW9uVG9rZW46IENvbmZpcm1hdGlvblRva2VuKSB7XG4gIC8vICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGBQcmVwYXJpbmcgdG8gY29uZmlybSBzdWJzY3JpYmVyLmApO1xuICAvLyAgIHJldHVybiB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuY29uZmlybVN1YnNjcmliZXIoY29uZmlybWF0aW9uVG9rZW4pXG4gIC8vIH1cblxuICB2ZXJpZnlTZXJ2aWNlKCk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgJiZcbiAgICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlciAmJlxuICAgICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnNlY3VyaXR5QXBpU2VydmljZVxuICAgIClcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgU2V2ZXJpdHlcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlY3VyaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VydmljZVJlc3BvbnNlLCBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2JtLXJlZ2lzdGVyLXN1YnNjcmliZXInLFxuICB0ZW1wbGF0ZTogYDxhbmd1bGFybGljaW91cy1hbGVydCBbYWxlcnROb3RpZmljYXRpb25dPVwiYWxlcnROb3RpZmljYXRpb25cIiBbaGFzTWVzc2FnZV09XCJhbGVydE5vdGlmaWNhdGlvbi5zaG93QWxlcnRcIj48L2FuZ3VsYXJsaWNpb3VzLWFsZXJ0PlxuPCEtLSBTVUJTQ1JJQkUgU0lHTi1VUCBGT1JNIC0tPlxuPGZvcm0gW2Zvcm1Hcm91cF09XCJfZm9ybVwiIChuZ1N1Ym1pdCk9XCJzdWJtaXRGb3JtKClcIj5cbiAgPCEtLSBTVUJTQ1JJQkVSIE5BTUUgLS0+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmb3JtLWdyb3VwLW5vLWJvcmRlclwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVzZXJzX2NpcmNsZS0wOFwiPjwvaT5cbiAgICA8L3NwYW4+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwic3Vic2NyaWJlck5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiTmFtZS4uLlwiPlxuICA8L2Rpdj5cbiAgPCEtLSBTVUJTQ1JJQkVSIEVNQUlMIC0tPlxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZm9ybS1ncm91cC1uby1ib3JkZXJcIj5cbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX2VtYWlsLTg1XCI+PC9pPlxuICAgIDwvc3Bhbj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJlbWFpbEFkZHJlc3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwuLi5cIj5cbiAgPC9kaXY+XG4gIDwhLS0gU1VCU0NSSUJFIEJVVFRPTiAtLT5cbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbmV1dHJhbCBidG4tcm91bmQgYnRuLWxnXCI+U3Vic2NyaWJlXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVjayBtbC0xXCI+PC9pPlxuICA8L2J1dHRvbj5cbjwvZm9ybT5cbjwhLS0gU1VCU0NSSUJFIFNJR04tVVAgRk9STSAtLT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50QmFzZVxuICBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBzdWJzY3JpYmUgPSBuZXcgRXZlbnRFbWl0dGVyPFNlcnZpY2VSZXNwb25zZT4oKTtcbiAgX2Zvcm06IEZvcm1Hcm91cDtcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlY3VyaXR5U2VydmljZTogQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UsXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXG4gICAgcHVibGljIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBzdXBlcignUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50JywgbG9nZ2luZ1NlcnZpY2UsIHJvdXRlcik7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmJ1aWxkRm9ybSgpO1xuICB9XG5cbiAgYnVpbGRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHN1YnNjcmliZXJOYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgZW1haWxBZGRyZXNzOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSk7XG4gIH1cblxuICBzdWJtaXRGb3JtKCkge1xuICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnJlc2V0U2VydmljZUNvbnRleHQoKTtcbiAgICB0aGlzLnN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcihcbiAgICAgIHRoaXMuX2Zvcm0udmFsdWUuc3Vic2NyaWJlck5hbWUsXG4gICAgICB0aGlzLl9mb3JtLnZhbHVlLmVtYWlsQWRkcmVzc1xuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpYmVVc2VyKHRoaXMuc3Vic2NyaWJlcik7XG4gIH1cblxuICBzdWJzY3JpYmVVc2VyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcbiAgICB0aGlzLnNlY3VyaXR5U2VydmljZVxuICAgICAgLnJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3BvbnNlOiBTZXJ2aWNlUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlU3Vic2NyaWJlVXNlcihyZXNwb25zZSksXG4gICAgICAgIGVycm9yID0+XG4gICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKGVycm9yLCB0aGlzLnNlY3VyaXR5U2VydmljZS5zZXJ2aWNlQ29udGV4dCksXG4gICAgICAgICgpID0+IHRoaXMuZmluaXNoUmVxdWVzdCh0aGlzLmNvbXBvbmVudE5hbWUpXG4gICAgICApO1xuICB9XG5cbiAgaGFuZGxlU3Vic2NyaWJlVXNlcihyZXNwb25zZTogU2VydmljZVJlc3BvbnNlKSB7XG4gICAgY29uc3QgZnVuY3Rpb25OYW1lID0gJ2hhbmRsZVN1YnNjcmliZVVzZXInO1xuICAgIGNvbnN0IGxvZ01lc3NhZ2UgPSBgWyR7ZnVuY3Rpb25OYW1lfV06IFByZXBhcmluZyB0byBoYW5kbGUgdGhlIHJlc3BvbnNlIGZyb20gdGhlIFtTZWN1cml0eVNlcnZpY2VdIGluIHRoZSAke1xuICAgICAgdGhpcy5jb21wb25lbnROYW1lXG4gICAgfS5gO1xuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxuICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXG4gICAgICBsb2dNZXNzYWdlXG4gICAgKTtcbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5Jc1N1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3Qgc3VjY2Vzc01lc3NhZ2UgPSBgU3VjY2Vzc2Z1bGx5IHByb2Nlc3NlZCByZXF1ZXN0IHRvIGNyZWF0ZSBzdWJzY3JpYmVyLiBQcmVwYXJlIHRvIGRvd25sb2FkLi4uYDtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxuICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlLmVtaXQocmVzcG9uc2UgYXMgU2VydmljZVJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhcbiAgICAgICAgICAvLyByZXNwb25zZSBhcyBFcnJvclJlc3BvbnNlLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgdGhpcy5zZWN1cml0eVNlcnZpY2Uuc2VydmljZUNvbnRleHRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICBBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2Vcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNGb3VuZGF0aW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2NvcmUnO1xuaW1wb3J0IHsgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZWN1cml0eUFwaVNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcbiAgICBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUsXG4gICAgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlLFxuICAgIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcbiAgICBTZWN1cml0eUFwaVNlcnZpY2UsIC8vUFJPVklERSBJTlRFUk5BTCBTRVJWSUNFUyBGT1IgVEhFIE1PRFVMRTsgU0NPUEVEIFRPIFRISVMgTU9EVUxFO1xuICAgIFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgLy9QUk9WSURFIElOVEVSTkFMIFNFUlZJQ0VTIEZPUiBUSEUgTU9EVUxFOyBTQ09QRUQgVE8gVEhJUyBNT0RVTEU7XG4gICAgLy8gSHR0cEJhc2VTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNTZWN1cml0eU1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwicnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsSUFBQTtJQUF3Q0Esc0NBQVU7SUFJaEQ7ZUFDRSxpQkFBTztLQUNSOzs7Ozs7Ozs7SUFLRCwrQkFBRTs7Ozs7SUFBRixVQUFHLGdCQUFpRDs7UUFFbEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JB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