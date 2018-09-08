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
class SecurityActionBase extends ActionBase {
    constructor() {
        super();
    }
    /**
     * Use the [Do] method to perform the action.
     * @param {?} businessProvider
     * @return {?}
     */
    Do(businessProvider) {
        // Provide the [SecurityBusinessProviderService], [ServiceContext], and [LoggingService] to action;
        this.businessProvider = businessProvider;
        this.serviceContext = businessProvider.serviceContext;
        this.loggingService = businessProvider.loggingService;
        this.execute();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RegisterSubscriberAction extends SecurityActionBase {
    /**
     * @param {?} subscriber
     */
    constructor(subscriber) {
        super();
        this.subscriber = subscriber;
        this.actionName = 'RegisterSubscriberAction';
    }
    /**
     * Override this method from the base [Action] class to allow for rules to be added to the
     * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
     * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
     * of the [Action] framework.
     * @return {?}
     */
    preValidateAction() {
        console.log(`Running the [preValidateAction] for the ${this.actionName} action.`);
        this.validationContext
            .withSource(this.actionName)
            .addRule(new StringIsNotNullEmptyRange('NameIsValid', 'The name value is not valid. Must be between 1-40 characters.', this.subscriber.Name, 2, 40, true))
            .addRule(new StringIsNotNullEmptyRange('EmailIsValid', 'The email address value is not valid. Must be between 5-60 characters.', this.subscriber.EmailAddress, 5, 60, true));
    }
    /**
     * Use this method to provide business logic implementation - this method is allowed to execute only if the current action
     * does not contain any rule violations.
     * @return {?}
     */
    performAction() {
        this.loggingService.log(this.actionName, Severity.Information, `Running the [performAction] for the ${this.actionName}.`);
        this.response = this.businessProvider.securityApiService.registerSubscriber(this.subscriber);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SecurityApiService extends HttpBaseService {
    /**
     * @param {?} http
     * @param {?} httpService
     * @param {?} loggingService
     */
    constructor(http, httpService, loggingService) {
        super(http, loggingService);
        this.httpService = httpService;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    registerSubscriber(subscriber) {
        const /** @type {?} */ requestUrl = 'api/subscriber/register';
        const /** @type {?} */ message = `${this.serviceName} preparing to call: ${requestUrl}`;
        this.loggingService.log(this.serviceName, Severity.Information, message);
        const /** @type {?} */ body = JSON.stringify(subscriber);
        const /** @type {?} */ options = this.httpService.createRequestOptions(HttpRequestMethod.POST, this.httpService.createHeader(false), requestUrl, body);
        return this.httpService.get(options);
        /**TEMPORARY IMPLEMENTATION */
        // const response = new ServiceResponse();
        // response.IsSuccess = true;
        // response.Message = `Fake message from ${this.serviceName}`;
        // response.Data = true;
        // const subject: BehaviorSubject<any> = new BehaviorSubject(response);
        // return subject.asObservable();
        /**TEMPORARY IMPLEMENTATION */
    }
}
SecurityApiService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SecurityApiService.ctorParameters = () => [
    { type: HttpClient, },
    { type: HttpBaseService, },
    { type: AngularliciousLoggingService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SecurityBusinessProviderService extends ServiceBase {
    /**
     * @param {?} loggingService
     * @param {?} securityApiService
     */
    constructor(loggingService, securityApiService) {
        super(loggingService);
        this.securityApiService = securityApiService;
    }
    /**
     * Use action to register a new subscriber.
     * @param {?} subscriber
     * @return {?}
     */
    registerSubscriber(subscriber) {
        const /** @type {?} */ action = new RegisterSubscriberAction(subscriber);
        action.Do(this);
        return action.response;
    }
}
SecurityBusinessProviderService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SecurityBusinessProviderService.ctorParameters = () => [
    { type: AngularliciousLoggingService, },
    { type: SecurityApiService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Subscriber {
    /**
     * Use to create a new subscriber for the application. This is not an account - only
     * a subscription to resources from the application.
     * @param {?} subscriberName
     * @param {?} subscriberEmail
     */
    constructor(subscriberName, subscriberEmail) {
        this.SubscriptionStart = new Date();
        this.Name = subscriberName;
        this.EmailAddress = subscriberEmail;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularliciousSecurityService extends ServiceBase {
    /**
     * @param {?} loggingService
     * @param {?} businessProvider
     */
    constructor(loggingService, businessProvider) {
        super(loggingService);
        this.businessProvider = businessProvider;
        this.serviceName = 'AngularliciousSecurityService';
        this.businessProvider.serviceContext = this.serviceContext;
        this.businessProvider.loggingService = this.loggingService;
    }
    /**
     * Use to register a new subscriber to the application.
     * @param {?} subscriber contains the user name and email address for the subscriber.
     * @return {?}
     */
    registerSubscriber(subscriber) {
        const /** @type {?} */ message = `Preparing to register subscriber: ${JSON.stringify(subscriber)}`;
        this.loggingService.log(this.serviceName, Severity.Information, message);
        return this.businessProvider.registerSubscriber(subscriber);
    }
    /**
     * @return {?}
     */
    verifyService() {
        if (this.loggingService &&
            this.businessProvider &&
            this.businessProvider.securityApiService)
            return true;
    }
}
AngularliciousSecurityService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AngularliciousSecurityService.ctorParameters = () => [
    { type: AngularliciousLoggingService, },
    { type: SecurityBusinessProviderService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RegisterSubscriberComponent extends ComponentBase {
    /**
     * @param {?} securityService
     * @param {?} loggingService
     * @param {?} formBuilder
     * @param {?} router
     */
    constructor(securityService, loggingService, formBuilder, router) {
        super('RegisterSubscriberComponent', loggingService, router);
        this.securityService = securityService;
        this.formBuilder = formBuilder;
        this.subscribe = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.buildForm();
    }
    /**
     * @return {?}
     */
    buildForm() {
        this._form = this.formBuilder.group({
            subscriberName: ['', Validators.required],
            emailAddress: ['', Validators.required]
        });
    }
    /**
     * @return {?}
     */
    submitForm() {
        this.securityService.resetServiceContext();
        this.subscriber = new Subscriber(this._form.value.subscriberName, this._form.value.emailAddress);
        this.subscribeUser(this.subscriber);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    subscribeUser(subscriber) {
        this.securityService
            .registerSubscriber(subscriber)
            .subscribe((response) => this.handleSubscribeUser(response), error => this.handleServiceErrors(error, this.securityService.serviceContext), () => this.finishRequest(this.componentName));
    }
    /**
     * @param {?} response
     * @return {?}
     */
    handleSubscribeUser(response) {
        const /** @type {?} */ functionName = 'handleSubscribeUser';
        const /** @type {?} */ logMessage = `[${functionName}]: Preparing to handle the response from the [SecurityService] in the ${this.componentName}.`;
        this.loggingService.log(this.componentName, Severity.Information, logMessage);
        if (response) {
            if (response.IsSuccess) {
                const /** @type {?} */ successMessage = `Successfully processed request to create subscriber. Prepare to download...`;
                this.loggingService.log(this.componentName, Severity.Information, successMessage);
                this.subscribe.emit(/** @type {?} */ (response));
            }
            else {
                this.handleServiceErrors(null, this.securityService.serviceContext);
            }
        }
    }
}
RegisterSubscriberComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'bm-register-subscriber',
                template: `<angularlicious-alert [alertNotification]="alertNotification" [hasMessage]="alertNotification.showAlert"></angularlicious-alert>
<!-- SUBSCRIBE SIGN-UP FORM -->
<form [formGroup]="_form" (ngSubmit)="submitForm()">
  <!-- SUBSCRIBER NAME -->
  <div class="input-group form-group-no-border">
    <span class="input-group-addon">
      <i class="now-ui-icons users_circle-08"></i>
    </span>
    <input type="text" formControlName="subscriberName" class="form-control" placeholder="Name...">
  </div>
  <!-- SUBSCRIBER EMAIL -->
  <div class="input-group form-group-no-border">
    <span class="input-group-addon">
      <i class="now-ui-icons ui-1_email-85"></i>
    </span>
    <input type="text" formControlName="emailAddress" class="form-control" placeholder="Email...">
  </div>
  <!-- SUBSCRIBE BUTTON -->
  <button class="btn btn-neutral btn-round btn-lg">Subscribe
    <i class="fa fa-check ml-1"></i>
  </button>
</form>
<!-- SUBSCRIBE SIGN-UP FORM -->`,
                styles: [``]
            },] },
];
/** @nocollapse */
RegisterSubscriberComponent.ctorParameters = () => [
    { type: AngularliciousSecurityService, },
    { type: AngularliciousLoggingService, },
    { type: FormBuilder, },
    { type: Router, },
];
RegisterSubscriberComponent.propDecorators = {
    "subscribe": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularliciousSecurityModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AngularliciousSecurityModule, AngularliciousSecurityService, RegisterSubscriberComponent, Subscriber, SecurityApiService as ɵb, SecurityBusinessProviderService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtc2VjdXJpdHkuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24udHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L2xpYi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9saWIvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvbGliL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQWN0aW9uQmFzZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUFjdGlvbkJhc2UgZXh0ZW5kcyBBY3Rpb25CYXNlIHtcclxuICBidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlO1xyXG4gIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIFtEb10gbWV0aG9kIHRvIHBlcmZvcm0gdGhlIGFjdGlvbi5cclxuICAgKi9cclxuICBEbyhidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlKSB7XHJcbiAgICAvLyBQcm92aWRlIHRoZSBbU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZV0sIFtTZXJ2aWNlQ29udGV4dF0sIGFuZCBbTG9nZ2luZ1NlcnZpY2VdIHRvIGFjdGlvbjtcclxuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlciA9IGJ1c2luZXNzUHJvdmlkZXI7XHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0ID0gYnVzaW5lc3NQcm92aWRlci5zZXJ2aWNlQ29udGV4dDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBidXNpbmVzc1Byb3ZpZGVyLmxvZ2dpbmdTZXJ2aWNlO1xyXG5cclxuICAgIHRoaXMuZXhlY3V0ZSgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gLy8gaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyBydWxlcyBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSHR0cEJhc2VTZXJ2aWNlLFxyXG4gIFNlcnZpY2VSZXNwb25zZSxcclxuICBFcnJvclJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBY3Rpb25CYXNlIH0gZnJvbSAnLi9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24nO1xyXG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uIGV4dGVuZHMgU2VjdXJpdHlBY3Rpb25CYXNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmFjdGlvbk5hbWUgPSAnUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZyb20gdGhlIGJhc2UgW0FjdGlvbl0gY2xhc3MgdG8gYWxsb3cgZm9yIHJ1bGVzIHRvIGJlIGFkZGVkIHRvIHRoZVxyXG4gICAqIGFjdGlvbidzIFtWYWxpZGF0aW9uQ29udGV4dF0uIEFueSBydWxlcyBhZGRlZCB0byB0aGUgW1ZhbGlkYXRpb25Db250ZXh0XSBoZXJlIHdpbGwgYmUgZXhlY3V0ZWQgd2hlblxyXG4gICAqIHRoZSBhY3Rpb24ncyBbVmFsaWRhdGVBY3Rpb25dIG1ldGhvZCBpcyBjYWxsZWQgLSB0aGlzIG1ldGhvZCBpcyBqdXN0IG9uZSBvZiBtYW55IHBpcGVsaW5lIG1ldGhvZHNcclxuICAgKiBvZiB0aGUgW0FjdGlvbl0gZnJhbWV3b3JrLlxyXG4gICAqL1xyXG4gIHByZVZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIGBSdW5uaW5nIHRoZSBbcHJlVmFsaWRhdGVBY3Rpb25dIGZvciB0aGUgJHt0aGlzLmFjdGlvbk5hbWV9IGFjdGlvbi5gXHJcbiAgICApO1xyXG4gICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dFxyXG4gICAgICAud2l0aFNvdXJjZSh0aGlzLmFjdGlvbk5hbWUpXHJcbiAgICAgIC5hZGRSdWxlKFxyXG4gICAgICAgIG5ldyBydWxlcy5TdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxyXG4gICAgICAgICAgJ05hbWVJc1ZhbGlkJyxcclxuICAgICAgICAgICdUaGUgbmFtZSB2YWx1ZSBpcyBub3QgdmFsaWQuIE11c3QgYmUgYmV0d2VlbiAxLTQwIGNoYXJhY3RlcnMuJyxcclxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlci5OYW1lLFxyXG4gICAgICAgICAgMixcclxuICAgICAgICAgIDQwLFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgICAuYWRkUnVsZShcclxuICAgICAgICBuZXcgcnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZShcclxuICAgICAgICAgICdFbWFpbElzVmFsaWQnLFxyXG4gICAgICAgICAgJ1RoZSBlbWFpbCBhZGRyZXNzIHZhbHVlIGlzIG5vdCB2YWxpZC4gTXVzdCBiZSBiZXR3ZWVuIDUtNjAgY2hhcmFjdGVycy4nLFxyXG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVyLkVtYWlsQWRkcmVzcyxcclxuICAgICAgICAgIDUsXHJcbiAgICAgICAgICA2MCxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvdmlkZSBidXNpbmVzcyBsb2dpYyBpbXBsZW1lbnRhdGlvbiAtIHRoaXMgbWV0aG9kIGlzIGFsbG93ZWQgdG8gZXhlY3V0ZSBvbmx5IGlmIHRoZSBjdXJyZW50IGFjdGlvblxyXG4gICAqIGRvZXMgbm90IGNvbnRhaW4gYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBwZXJmb3JtQWN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSdW5uaW5nIHRoZSBbcGVyZm9ybUFjdGlvbl0gZm9yIHRoZSAke3RoaXMuYWN0aW9uTmFtZX0uYFxyXG4gICAgKTtcclxuICAgIHRoaXMucmVzcG9uc2UgPSB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VjdXJpdHlBcGlTZXJ2aWNlLnJlZ2lzdGVyU3Vic2NyaWJlcihcclxuICAgICAgdGhpcy5zdWJzY3JpYmVyXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xyXG4vLyBpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL29ic2VydmVPbic7XHJcbi8vIGltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgU2V2ZXJpdHlcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RNZXRob2QgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUFwaVNlcnZpY2UgZXh0ZW5kcyBIdHRwQmFzZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHB1YmxpYyBodHRwU2VydmljZTogSHR0cEJhc2VTZXJ2aWNlLFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGh0dHAsIGxvZ2dpbmdTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RVcmwgPSAnYXBpL3N1YnNjcmliZXIvcmVnaXN0ZXInO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMuc2VydmljZU5hbWV9IHByZXBhcmluZyB0byBjYWxsOiAke3JlcXVlc3RVcmx9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBtZXNzYWdlKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoc3Vic2NyaWJlcik7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5odHRwU2VydmljZS5jcmVhdGVSZXF1ZXN0T3B0aW9ucyhcclxuICAgICAgSHR0cFJlcXVlc3RNZXRob2QuUE9TVCxcclxuICAgICAgdGhpcy5odHRwU2VydmljZS5jcmVhdGVIZWFkZXIoZmFsc2UpLFxyXG4gICAgICByZXF1ZXN0VXJsLFxyXG4gICAgICBib2R5XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KG9wdGlvbnMpO1xyXG5cclxuICAgIC8qKlRFTVBPUkFSWSBJTVBMRU1FTlRBVElPTiAqL1xyXG4gICAgLy8gY29uc3QgcmVzcG9uc2UgPSBuZXcgU2VydmljZVJlc3BvbnNlKCk7XHJcbiAgICAvLyByZXNwb25zZS5Jc1N1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgLy8gcmVzcG9uc2UuTWVzc2FnZSA9IGBGYWtlIG1lc3NhZ2UgZnJvbSAke3RoaXMuc2VydmljZU5hbWV9YDtcclxuICAgIC8vIHJlc3BvbnNlLkRhdGEgPSB0cnVlO1xyXG4gICAgLy8gY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcclxuICAgIC8vIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgLyoqVEVNUE9SQVJZIElNUExFTUVOVEFUSU9OICovXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBTZXJ2aWNlQmFzZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIExvZ2dpbmdTZXJ2aWNlQ29uZmlnLFxyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFJlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbiB9IGZyb20gJy4vYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbic7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBcGlTZXJ2aWNlIH0gZnJvbSAnLi9zZWN1cml0eS1hcGkuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgc2VjdXJpdHlBcGlTZXJ2aWNlOiBTZWN1cml0eUFwaVNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGxvZ2dpbmdTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSBhY3Rpb24gdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlci5cclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlclxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24oc3Vic2NyaWJlcik7XHJcbiAgICBhY3Rpb24uRG8odGhpcyk7XHJcbiAgICByZXR1cm4gYWN0aW9uLnJlc3BvbnNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgU3Vic2NyaWJlciB7XHJcbiAgTmFtZTogc3RyaW5nO1xyXG4gIEVtYWlsQWRkcmVzczogc3RyaW5nO1xyXG4gIFN1YnNjcmlwdGlvblN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIG5ldyBzdWJzY3JpYmVyIGZvciB0aGUgYXBwbGljYXRpb24uIFRoaXMgaXMgbm90IGFuIGFjY291bnQgLSBvbmx5XHJcbiAgICogYSBzdWJzY3JpcHRpb24gdG8gcmVzb3VyY2VzIGZyb20gdGhlIGFwcGxpY2F0aW9uLlxyXG4gICAqIEBwYXJhbSBzdWJzY3JpYmVyTmFtZVxcXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXJFbWFpbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIHN1YnNjcmliZXJFbWFpbDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBzdWJzY3JpYmVyTmFtZTtcclxuICAgIHRoaXMuRW1haWxBZGRyZXNzID0gc3Vic2NyaWJlckVtYWlsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2VydmljZUJhc2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHtcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gIFNldmVyaXR5XHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5cclxuLy8gaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG4vLyBpbXBvcnQgeyBTdWJzY3JpYmVyQnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3N1YnNjcmliZXItYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbi8vIGltcG9ydCB7IENvbmZpcm1hdGlvblRva2VuIH0gZnJvbSAnLi9tb2RlbHMvY29uZmlybWF0aW9uLXRva2VuLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGxvZ2dpbmdTZXJ2aWNlKTtcclxuICAgIHRoaXMuc2VydmljZU5hbWUgPSAnQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UnO1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnNlcnZpY2VDb250ZXh0ID0gdGhpcy5zZXJ2aWNlQ29udGV4dDtcclxuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5sb2dnaW5nU2VydmljZSA9IHRoaXMubG9nZ2luZ1NlcnZpY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlciB0byB0aGUgYXBwbGljYXRpb24uXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXIgY29udGFpbnMgdGhlIHVzZXIgbmFtZSBhbmQgZW1haWwgYWRkcmVzcyBmb3IgdGhlIHN1YnNjcmliZXIuXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGBQcmVwYXJpbmcgdG8gcmVnaXN0ZXIgc3Vic2NyaWJlcjogJHtKU09OLnN0cmluZ2lmeShcclxuICAgICAgc3Vic2NyaWJlclxyXG4gICAgKX1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIHRoaXMuYnVzaW5lc3NQcm92aWRlci5yZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcik7XHJcbiAgfVxyXG5cclxuICAvLyAvKipcclxuICAvLyAgKiBVc2UgdG8gY29uZmlybSBhIG5ldyBzdWJzY3JpYmVyLlxyXG4gIC8vICAqIEBwYXJhbSBjb25maXJtYXRpb25Ub2tlbiBjb250YWlucyB0aGUgdXNlciBuYW1lIGFuZCBhIFtIYXNoXSB2YWx1ZSB0aGF0IGlzIHVzZWQgdG8gY29uZmlybSB0aGUgdXNlci5cclxuICAvLyAgKi9cclxuICAvLyBjb25maXJtU3Vic2NyaWJlcihjb25maXJtYXRpb25Ub2tlbjogQ29uZmlybWF0aW9uVG9rZW4pIHtcclxuICAvLyAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBgUHJlcGFyaW5nIHRvIGNvbmZpcm0gc3Vic2NyaWJlci5gKTtcclxuICAvLyAgIHJldHVybiB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuY29uZmlybVN1YnNjcmliZXIoY29uZmlybWF0aW9uVG9rZW4pXHJcbiAgLy8gfVxyXG5cclxuICB2ZXJpZnlTZXJ2aWNlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlICYmXHJcbiAgICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlciAmJlxyXG4gICAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VjdXJpdHlBcGlTZXJ2aWNlXHJcbiAgICApXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7XHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICBTZXZlcml0eVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VjdXJpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VSZXNwb25zZSwgRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ2JtLXJlZ2lzdGVyLXN1YnNjcmliZXInLFxyXG4gIHRlbXBsYXRlOiBgPGFuZ3VsYXJsaWNpb3VzLWFsZXJ0IFthbGVydE5vdGlmaWNhdGlvbl09XCJhbGVydE5vdGlmaWNhdGlvblwiIFtoYXNNZXNzYWdlXT1cImFsZXJ0Tm90aWZpY2F0aW9uLnNob3dBbGVydFwiPjwvYW5ndWxhcmxpY2lvdXMtYWxlcnQ+XHJcbjwhLS0gU1VCU0NSSUJFIFNJR04tVVAgRk9STSAtLT5cclxuPGZvcm0gW2Zvcm1Hcm91cF09XCJfZm9ybVwiIChuZ1N1Ym1pdCk9XCJzdWJtaXRGb3JtKClcIj5cclxuICA8IS0tIFNVQlNDUklCRVIgTkFNRSAtLT5cclxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZm9ybS1ncm91cC1uby1ib3JkZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cclxuICAgICAgPGkgY2xhc3M9XCJub3ctdWktaWNvbnMgdXNlcnNfY2lyY2xlLTA4XCI+PC9pPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwic3Vic2NyaWJlck5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiTmFtZS4uLlwiPlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gU1VCU0NSSUJFUiBFTUFJTCAtLT5cclxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZm9ybS1ncm91cC1uby1ib3JkZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cclxuICAgICAgPGkgY2xhc3M9XCJub3ctdWktaWNvbnMgdWktMV9lbWFpbC04NVwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cImVtYWlsQWRkcmVzc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbWFpbC4uLlwiPlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gU1VCU0NSSUJFIEJVVFRPTiAtLT5cclxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1uZXV0cmFsIGJ0bi1yb3VuZCBidG4tbGdcIj5TdWJzY3JpYmVcclxuICAgIDxpIGNsYXNzPVwiZmEgZmEtY2hlY2sgbWwtMVwiPjwvaT5cclxuICA8L2J1dHRvbj5cclxuPC9mb3JtPlxyXG48IS0tIFNVQlNDUklCRSBTSUdOLVVQIEZPUk0gLS0+YCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudEJhc2VcclxuICBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQE91dHB1dCgpIHN1YnNjcmliZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2VydmljZVJlc3BvbnNlPigpO1xyXG4gIF9mb3JtOiBGb3JtR3JvdXA7XHJcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHNlY3VyaXR5U2VydmljZTogQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UsXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHB1YmxpYyBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgc3VwZXIoJ1JlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudCcsIGxvZ2dpbmdTZXJ2aWNlLCByb3V0ZXIpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmJ1aWxkRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRGb3JtKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBzdWJzY3JpYmVyTmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgZW1haWxBZGRyZXNzOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN1Ym1pdEZvcm0oKSB7XHJcbiAgICB0aGlzLnNlY3VyaXR5U2VydmljZS5yZXNldFNlcnZpY2VDb250ZXh0KCk7XHJcbiAgICB0aGlzLnN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcihcclxuICAgICAgdGhpcy5fZm9ybS52YWx1ZS5zdWJzY3JpYmVyTmFtZSxcclxuICAgICAgdGhpcy5fZm9ybS52YWx1ZS5lbWFpbEFkZHJlc3NcclxuICAgICk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVVzZXIodGhpcy5zdWJzY3JpYmVyKTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZVVzZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcikge1xyXG4gICAgdGhpcy5zZWN1cml0eVNlcnZpY2VcclxuICAgICAgLnJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXNwb25zZTogU2VydmljZVJlc3BvbnNlKSA9PiB0aGlzLmhhbmRsZVN1YnNjcmliZVVzZXIocmVzcG9uc2UpLFxyXG4gICAgICAgIGVycm9yID0+XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlcnZpY2VFcnJvcnMoZXJyb3IsIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnNlcnZpY2VDb250ZXh0KSxcclxuICAgICAgICAoKSA9PiB0aGlzLmZpbmlzaFJlcXVlc3QodGhpcy5jb21wb25lbnROYW1lKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlU3Vic2NyaWJlVXNlcihyZXNwb25zZTogU2VydmljZVJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSAnaGFuZGxlU3Vic2NyaWJlVXNlcic7XHJcbiAgICBjb25zdCBsb2dNZXNzYWdlID0gYFske2Z1bmN0aW9uTmFtZX1dOiBQcmVwYXJpbmcgdG8gaGFuZGxlIHRoZSByZXNwb25zZSBmcm9tIHRoZSBbU2VjdXJpdHlTZXJ2aWNlXSBpbiB0aGUgJHtcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lXHJcbiAgICB9LmA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgbG9nTWVzc2FnZVxyXG4gICAgKTtcclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBpZiAocmVzcG9uc2UuSXNTdWNjZXNzKSB7XHJcbiAgICAgICAgY29uc3Qgc3VjY2Vzc01lc3NhZ2UgPSBgU3VjY2Vzc2Z1bGx5IHByb2Nlc3NlZCByZXF1ZXN0IHRvIGNyZWF0ZSBzdWJzY3JpYmVyLiBQcmVwYXJlIHRvIGRvd25sb2FkLi4uYDtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgc3VjY2Vzc01lc3NhZ2VcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlLmVtaXQocmVzcG9uc2UgYXMgU2VydmljZVJlc3BvbnNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZpY2VFcnJvcnMoXHJcbiAgICAgICAgICAvLyByZXNwb25zZSBhcyBFcnJvclJlc3BvbnNlLFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnNlcnZpY2VDb250ZXh0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsXHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNGb3VuZGF0aW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0NvcmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvY29yZSc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUFwaVNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWFwaS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlZ2lzdGVyLXN1YnNjcmliZXIvcmVnaXN0ZXItc3Vic2NyaWJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSHR0cEJhc2VTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcclxuICAgIEFuZ3VsYXJsaWNpb3VzRm91bmRhdGlvbk1vZHVsZSxcclxuICAgIEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSxcclxuICAgIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIFNlY3VyaXR5QXBpU2VydmljZSwgLy9QUk9WSURFIElOVEVSTkFMIFNFUlZJQ0VTIEZPUiBUSEUgTU9EVUxFOyBTQ09QRUQgVE8gVEhJUyBNT0RVTEU7XHJcbiAgICBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIC8vUFJPVklERSBJTlRFUk5BTCBTRVJWSUNFUyBGT1IgVEhFIE1PRFVMRTsgU0NPUEVEIFRPIFRISVMgTU9EVUxFO1xyXG4gICAgLy8gSHR0cEJhc2VTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNTZWN1cml0eU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsicnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSx3QkFFZ0MsU0FBUSxVQUFVO0lBSWhEO1FBQ0UsS0FBSyxFQUFFLENBQUM7S0FDVDs7Ozs7O0lBS0QsRUFBRSxDQUFDLGdCQUFpRDs7UUFFbEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1FBRXRELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQjtDQUNGOzs7Ozs7QUNsQkQsOEJBYXNDLFNBQVEsa0JBQWtCOzs7O0lBQzlELFlB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