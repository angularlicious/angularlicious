import { ActionBase, HttpBaseService, HttpRequestMethod, ServiceBase, ComponentBase, AngularliciousFoundationModule } from '@angularlicious/foundation';
import 'rxjs/add/observable/throw';
import { StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';
import { Severity, AngularliciousLoggingService, AngularliciousLoggingModule } from '@angularlicious/logging';
import { Injectable, Component, Output, EventEmitter, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/toPromise';
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
    { type: HttpClient },
    { type: HttpBaseService },
    { type: AngularliciousLoggingService }
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
    { type: AngularliciousLoggingService },
    { type: SecurityApiService }
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
    { type: AngularliciousLoggingService },
    { type: SecurityBusinessProviderService }
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
    { type: AngularliciousSecurityService },
    { type: AngularliciousLoggingService },
    { type: FormBuilder },
    { type: Router }
];
RegisterSubscriberComponent.propDecorators = {
    subscribe: [{ type: Output }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtc2VjdXJpdHkuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9zcmMvYnVzaW5lc3MvYWN0aW9ucy9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24udHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9zcmMvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L3NyYy9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5L3NyYy9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvc3JjL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvc3JjL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS9zcmMvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvc3JjL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQWN0aW9uQmFzZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUFjdGlvbkJhc2UgZXh0ZW5kcyBBY3Rpb25CYXNlIHtcclxuICBidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlO1xyXG4gIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIFtEb10gbWV0aG9kIHRvIHBlcmZvcm0gdGhlIGFjdGlvbi5cclxuICAgKi9cclxuICBEbyhidXNpbmVzc1Byb3ZpZGVyOiBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlKSB7XHJcbiAgICAvLyBQcm92aWRlIHRoZSBbU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZV0sIFtTZXJ2aWNlQ29udGV4dF0sIGFuZCBbTG9nZ2luZ1NlcnZpY2VdIHRvIGFjdGlvbjtcclxuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlciA9IGJ1c2luZXNzUHJvdmlkZXI7XHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0ID0gYnVzaW5lc3NQcm92aWRlci5zZXJ2aWNlQ29udGV4dDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBidXNpbmVzc1Byb3ZpZGVyLmxvZ2dpbmdTZXJ2aWNlO1xyXG5cclxuICAgIHRoaXMuZXhlY3V0ZSgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyBydWxlcyBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSHR0cEJhc2VTZXJ2aWNlLFxyXG4gIFNlcnZpY2VSZXNwb25zZSxcclxuICBFcnJvclJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBY3Rpb25CYXNlIH0gZnJvbSAnLi9zZWN1cml0eS1hY3Rpb24tYmFzZS5hY3Rpb24nO1xyXG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uIGV4dGVuZHMgU2VjdXJpdHlBY3Rpb25CYXNlIHtcclxuICAvLyByZXNwb25zZTogT2JzZXJ2YWJsZTxSZXNwb25zZT47XHJcbiAgcmVzcG9uc2U6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5hY3Rpb25OYW1lID0gJ1JlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbic7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBmcm9tIHRoZSBiYXNlIFtBY3Rpb25dIGNsYXNzIHRvIGFsbG93IGZvciBydWxlcyB0byBiZSBhZGRlZCB0byB0aGVcclxuICAgKiBhY3Rpb24ncyBbVmFsaWRhdGlvbkNvbnRleHRdLiBBbnkgcnVsZXMgYWRkZWQgdG8gdGhlIFtWYWxpZGF0aW9uQ29udGV4dF0gaGVyZSB3aWxsIGJlIGV4ZWN1dGVkIHdoZW5cclxuICAgKiB0aGUgYWN0aW9uJ3MgW1ZhbGlkYXRlQWN0aW9uXSBtZXRob2QgaXMgY2FsbGVkIC0gdGhpcyBtZXRob2QgaXMganVzdCBvbmUgb2YgbWFueSBwaXBlbGluZSBtZXRob2RzXHJcbiAgICogb2YgdGhlIFtBY3Rpb25dIGZyYW1ld29yay5cclxuICAgKi9cclxuICBwcmVWYWxpZGF0ZUFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgUnVubmluZyB0aGUgW3ByZVZhbGlkYXRlQWN0aW9uXSBmb3IgdGhlICR7dGhpcy5hY3Rpb25OYW1lfSBhY3Rpb24uYFxyXG4gICAgKTtcclxuICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHRcclxuICAgICAgLndpdGhTb3VyY2UodGhpcy5hY3Rpb25OYW1lKVxyXG4gICAgICAuYWRkUnVsZShcclxuICAgICAgICBuZXcgcnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZShcclxuICAgICAgICAgICdOYW1lSXNWYWxpZCcsXHJcbiAgICAgICAgICAnVGhlIG5hbWUgdmFsdWUgaXMgbm90IHZhbGlkLiBNdXN0IGJlIGJldHdlZW4gMS00MCBjaGFyYWN0ZXJzLicsXHJcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZXIuTmFtZSxcclxuICAgICAgICAgIDIsXHJcbiAgICAgICAgICA0MCxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICAgLmFkZFJ1bGUoXHJcbiAgICAgICAgbmV3IHJ1bGVzLlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UoXHJcbiAgICAgICAgICAnRW1haWxJc1ZhbGlkJyxcclxuICAgICAgICAgICdUaGUgZW1haWwgYWRkcmVzcyB2YWx1ZSBpcyBub3QgdmFsaWQuIE11c3QgYmUgYmV0d2VlbiA1LTYwIGNoYXJhY3RlcnMuJyxcclxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlci5FbWFpbEFkZHJlc3MsXHJcbiAgICAgICAgICA1LFxyXG4gICAgICAgICAgNjAsXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHByb3ZpZGUgYnVzaW5lc3MgbG9naWMgaW1wbGVtZW50YXRpb24gLSB0aGlzIG1ldGhvZCBpcyBhbGxvd2VkIHRvIGV4ZWN1dGUgb25seSBpZiB0aGUgY3VycmVudCBhY3Rpb25cclxuICAgKiBkb2VzIG5vdCBjb250YWluIGFueSBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgcGVyZm9ybUFjdGlvbigpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUnVubmluZyB0aGUgW3BlcmZvcm1BY3Rpb25dIGZvciB0aGUgJHt0aGlzLmFjdGlvbk5hbWV9LmBcclxuICAgICk7XHJcbiAgICB0aGlzLnJlc3BvbnNlID0gdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnNlY3VyaXR5QXBpU2VydmljZS5yZWdpc3RlclN1YnNjcmliZXIodGhpcy5zdWJzY3JpYmVyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9vYnNlcnZlT24nO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBIdHRwQmFzZVNlcnZpY2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSwgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RNZXRob2QgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUFwaVNlcnZpY2UgZXh0ZW5kcyBIdHRwQmFzZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHB1YmxpYyBodHRwU2VydmljZTogSHR0cEJhc2VTZXJ2aWNlLFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGh0dHAsIGxvZ2dpbmdTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RVcmwgPSAnYXBpL3N1YnNjcmliZXIvcmVnaXN0ZXInO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMuc2VydmljZU5hbWV9IHByZXBhcmluZyB0byBjYWxsOiAke3JlcXVlc3RVcmx9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBtZXNzYWdlKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoc3Vic2NyaWJlcik7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5odHRwU2VydmljZS5jcmVhdGVSZXF1ZXN0T3B0aW9ucyhcclxuICAgICAgSHR0cFJlcXVlc3RNZXRob2QuUE9TVCxcclxuICAgICAgdGhpcy5odHRwU2VydmljZS5jcmVhdGVIZWFkZXIoZmFsc2UpLFxyXG4gICAgICByZXF1ZXN0VXJsLFxyXG4gICAgICBib2R5XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KG9wdGlvbnMpO1xyXG5cclxuICAgIC8qKlRFTVBPUkFSWSBJTVBMRU1FTlRBVElPTiAqL1xyXG4gICAgLy8gY29uc3QgcmVzcG9uc2UgPSBuZXcgU2VydmljZVJlc3BvbnNlKCk7XHJcbiAgICAvLyByZXNwb25zZS5Jc1N1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgLy8gcmVzcG9uc2UuTWVzc2FnZSA9IGBGYWtlIG1lc3NhZ2UgZnJvbSAke3RoaXMuc2VydmljZU5hbWV9YDtcclxuICAgIC8vIHJlc3BvbnNlLkRhdGEgPSB0cnVlO1xyXG4gICAgLy8gY29uc3Qgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHJlc3BvbnNlKTtcclxuICAgIC8vIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgLyoqVEVNUE9SQVJZIElNUExFTUVOVEFUSU9OICovXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBTZXJ2aWNlQmFzZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIGxvZ2dpbmdTZXJ2aWNlQ29uZmlnLFxyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFJlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbiB9IGZyb20gJy4vYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbic7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBcGlTZXJ2aWNlIH0gZnJvbSAnLi9zZWN1cml0eS1hcGkuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgc2VjdXJpdHlBcGlTZXJ2aWNlOiBTZWN1cml0eUFwaVNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGxvZ2dpbmdTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSBhY3Rpb24gdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlci5cclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlclxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24oc3Vic2NyaWJlcik7XHJcbiAgICBhY3Rpb24uRG8odGhpcyk7XHJcbiAgICByZXR1cm4gYWN0aW9uLnJlc3BvbnNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgU3Vic2NyaWJlciB7XHJcbiAgTmFtZTogc3RyaW5nO1xyXG4gIEVtYWlsQWRkcmVzczogc3RyaW5nO1xyXG4gIFN1YnNjcmlwdGlvblN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIG5ldyBzdWJzY3JpYmVyIGZvciB0aGUgYXBwbGljYXRpb24uIFRoaXMgaXMgbm90IGFuIGFjY291bnQgLSBvbmx5XHJcbiAgICogYSBzdWJzY3JpcHRpb24gdG8gcmVzb3VyY2VzIGZyb20gdGhlIGFwcGxpY2F0aW9uLlxyXG4gICAqIEBwYXJhbSBzdWJzY3JpYmVyTmFtZVxcXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXJFbWFpbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIHN1YnNjcmliZXJFbWFpbDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBzdWJzY3JpYmVyTmFtZTtcclxuICAgIHRoaXMuRW1haWxBZGRyZXNzID0gc3Vic2NyaWJlckVtYWlsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2VydmljZUJhc2UsIFNlcnZpY2VSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSwgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcblxyXG4vLyBpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcbi8vIGltcG9ydCB7IFN1YnNjcmliZXJCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc3Vic2NyaWJlci1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuLy8gaW1wb3J0IHsgQ29uZmlybWF0aW9uVG9rZW4gfSBmcm9tICcuL21vZGVscy9jb25maXJtYXRpb24tdG9rZW4ubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgYnVzaW5lc3NQcm92aWRlcjogU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIobG9nZ2luZ1NlcnZpY2UpO1xyXG4gICAgdGhpcy5zZXJ2aWNlTmFtZSA9ICdBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSc7XHJcbiAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VydmljZUNvbnRleHQgPSB0aGlzLnNlcnZpY2VDb250ZXh0O1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLmxvZ2dpbmdTZXJ2aWNlID0gdGhpcy5sb2dnaW5nU2VydmljZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZWdpc3RlciBhIG5ldyBzdWJzY3JpYmVyIHRvIHRoZSBhcHBsaWNhdGlvbi5cclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlciBjb250YWlucyB0aGUgdXNlciBuYW1lIGFuZCBlbWFpbCBhZGRyZXNzIGZvciB0aGUgc3Vic2NyaWJlci5cclxuICAgKi9cclxuICByZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcik6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYFByZXBhcmluZyB0byByZWdpc3RlciBzdWJzY3JpYmVyOiAke0pTT04uc3RyaW5naWZ5KHN1YnNjcmliZXIpfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgbWVzc2FnZSk7XHJcbiAgICByZXR1cm4gdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyKTtcclxuICB9XHJcblxyXG4gIC8vIC8qKlxyXG4gIC8vICAqIFVzZSB0byBjb25maXJtIGEgbmV3IHN1YnNjcmliZXIuXHJcbiAgLy8gICogQHBhcmFtIGNvbmZpcm1hdGlvblRva2VuIGNvbnRhaW5zIHRoZSB1c2VyIG5hbWUgYW5kIGEgW0hhc2hdIHZhbHVlIHRoYXQgaXMgdXNlZCB0byBjb25maXJtIHRoZSB1c2VyLlxyXG4gIC8vICAqL1xyXG4gIC8vIGNvbmZpcm1TdWJzY3JpYmVyKGNvbmZpcm1hdGlvblRva2VuOiBDb25maXJtYXRpb25Ub2tlbikge1xyXG4gIC8vICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGBQcmVwYXJpbmcgdG8gY29uZmlybSBzdWJzY3JpYmVyLmApO1xyXG4gIC8vICAgcmV0dXJuIHRoaXMuYnVzaW5lc3NQcm92aWRlci5jb25maXJtU3Vic2NyaWJlcihjb25maXJtYXRpb25Ub2tlbilcclxuICAvLyB9XHJcblxyXG4gIHZlcmlmeVNlcnZpY2UoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgJiZcclxuICAgICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyICYmXHJcbiAgICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5zZWN1cml0eUFwaVNlcnZpY2VcclxuICAgIClcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSwgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlY3VyaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlUmVzcG9uc2UsIEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdibS1yZWdpc3Rlci1zdWJzY3JpYmVyJyxcclxuICB0ZW1wbGF0ZTogYDxhbmd1bGFybGljaW91cy1hbGVydCBbYWxlcnROb3RpZmljYXRpb25dPVwiYWxlcnROb3RpZmljYXRpb25cIiBbaGFzTWVzc2FnZV09XCJhbGVydE5vdGlmaWNhdGlvbi5zaG93QWxlcnRcIj48L2FuZ3VsYXJsaWNpb3VzLWFsZXJ0PlxyXG48IS0tIFNVQlNDUklCRSBTSUdOLVVQIEZPUk0gLS0+XHJcbjxmb3JtIFtmb3JtR3JvdXBdPVwiX2Zvcm1cIiAobmdTdWJtaXQpPVwic3VibWl0Rm9ybSgpXCI+XHJcbiAgPCEtLSBTVUJTQ1JJQkVSIE5BTUUgLS0+XHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZvcm0tZ3JvdXAtbm8tYm9yZGVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVzZXJzX2NpcmNsZS0wOFwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cInN1YnNjcmliZXJOYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIk5hbWUuLi5cIj5cclxuICA8L2Rpdj5cclxuICA8IS0tIFNVQlNDUklCRVIgRU1BSUwgLS0+XHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZvcm0tZ3JvdXAtbm8tYm9yZGVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVpLTFfZW1haWwtODVcIj48L2k+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJlbWFpbEFkZHJlc3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwuLi5cIj5cclxuICA8L2Rpdj5cclxuICA8IS0tIFNVQlNDUklCRSBCVVRUT04gLS0+XHJcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbmV1dHJhbCBidG4tcm91bmQgYnRuLWxnXCI+U3Vic2NyaWJlXHJcbiAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrIG1sLTFcIj48L2k+XHJcbiAgPC9idXR0b24+XHJcbjwvZm9ybT5cclxuPCEtLSBTVUJTQ1JJQkUgU0lHTi1VUCBGT1JNIC0tPmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnRCYXNlXHJcbiAgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBPdXRwdXQoKSBzdWJzY3JpYmUgPSBuZXcgRXZlbnRFbWl0dGVyPFNlcnZpY2VSZXNwb25zZT4oKTtcclxuICBfZm9ybTogRm9ybUdyb3VwO1xyXG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzZWN1cml0eVNlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlLFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHN1cGVyKCdSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQnLCBsb2dnaW5nU2VydmljZSwgcm91dGVyKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgc3Vic2NyaWJlck5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIGVtYWlsQWRkcmVzczogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdWJtaXRGb3JtKCkge1xyXG4gICAgdGhpcy5zZWN1cml0eVNlcnZpY2UucmVzZXRTZXJ2aWNlQ29udGV4dCgpO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIoXHJcbiAgICAgIHRoaXMuX2Zvcm0udmFsdWUuc3Vic2NyaWJlck5hbWUsXHJcbiAgICAgIHRoaXMuX2Zvcm0udmFsdWUuZW1haWxBZGRyZXNzXHJcbiAgICApO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVVc2VyKHRoaXMuc3Vic2NyaWJlcik7XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmVVc2VyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcclxuICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlXHJcbiAgICAgIC5yZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcilcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAocmVzcG9uc2U6IFNlcnZpY2VSZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVTdWJzY3JpYmVVc2VyKHJlc3BvbnNlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmhhbmRsZVNlcnZpY2VFcnJvcnMoZXJyb3IsIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnNlcnZpY2VDb250ZXh0KSxcclxuICAgICAgICAoKSA9PiB0aGlzLmZpbmlzaFJlcXVlc3QodGhpcy5jb21wb25lbnROYW1lKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlU3Vic2NyaWJlVXNlcihyZXNwb25zZTogU2VydmljZVJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSAnaGFuZGxlU3Vic2NyaWJlVXNlcic7XHJcbiAgICBjb25zdCBsb2dNZXNzYWdlID0gYFske2Z1bmN0aW9uTmFtZX1dOiBQcmVwYXJpbmcgdG8gaGFuZGxlIHRoZSByZXNwb25zZSBmcm9tIHRoZSBbU2VjdXJpdHlTZXJ2aWNlXSBpbiB0aGUgJHtcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lXHJcbiAgICB9LmA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLmNvbXBvbmVudE5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBsb2dNZXNzYWdlKTtcclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBpZiAocmVzcG9uc2UuSXNTdWNjZXNzKSB7XHJcbiAgICAgICAgY29uc3Qgc3VjY2Vzc01lc3NhZ2UgPSBgU3VjY2Vzc2Z1bGx5IHByb2Nlc3NlZCByZXF1ZXN0IHRvIGNyZWF0ZSBzdWJzY3JpYmVyLiBQcmVwYXJlIHRvIGRvd25sb2FkLi4uYDtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgc3VjY2Vzc01lc3NhZ2VcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlLmVtaXQocmVzcG9uc2UgYXMgU2VydmljZVJlc3BvbnNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZpY2VFcnJvcnMoXHJcbiAgICAgICAgICAvLyByZXNwb25zZSBhcyBFcnJvclJlc3BvbnNlLFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnNlcnZpY2VDb250ZXh0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsXHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG59IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNGb3VuZGF0aW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0NvcmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvY29yZSc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUFwaVNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3NlY3VyaXR5LWFwaS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlZ2lzdGVyLXN1YnNjcmliZXIvcmVnaXN0ZXItc3Vic2NyaWJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuLy8gaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBIdHRwQmFzZVNlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcclxuICAgIEFuZ3VsYXJsaWNpb3VzRm91bmRhdGlvbk1vZHVsZSxcclxuICAgIEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1JlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1JlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgU2VjdXJpdHlBcGlTZXJ2aWNlLCAvL1BST1ZJREUgSU5URVJOQUwgU0VSVklDRVMgRk9SIFRIRSBNT0RVTEU7IFNDT1BFRCBUTyBUSElTIE1PRFVMRTtcclxuICAgIFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgLy9QUk9WSURFIElOVEVSTkFMIFNFUlZJQ0VTIEZPUiBUSEUgTU9EVUxFOyBTQ09QRUQgVE8gVEhJUyBNT0RVTEU7XHJcbiAgICAvLyBIdHRwQmFzZVNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c1NlY3VyaXR5TW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJydWxlcy5TdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsd0JBRWdDLFNBQVEsVUFBVTtJQUloRDtRQUNFLEtBQUssRUFBRSxDQUFDO0tBQ1Q7Ozs7OztJQUtELEVBQUUsQ0FBQyxnQkFBaUQ7O1FBRWxELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztRQUV0RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDaEI7Q0FDRjs7Ozs7O0FDdEJELDhCQWtCc0MsU0FBUSxrQkFBa0I7Ozs7SUFJOUQsWUFBb0IsVUFBc0I7UUFDeEMsS0FBSyxFQUFFLENBQUM7UUFEVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcs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