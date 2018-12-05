import { CommonModule } from '@angular/common';
import { AngularliciousCoreModule } from '@angularlicious/core';
import { Router } from '@angular/router';
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
        this.businessProvider = businessProvider;
        this.serviceContext = businessProvider.serviceContext;
        this.loggingService = businessProvider.loggingService;
        this.execute();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const requestUrl = 'api/subscriber/register';
        /** @type {?} */
        const message = `${this.serviceName} preparing to call: ${requestUrl}`;
        this.loggingService.log(this.serviceName, Severity.Information, message);
        /** @type {?} */
        const body = JSON.stringify(subscriber);
        /** @type {?} */
        const options = this.httpService.createRequestOptions(HttpRequestMethod.post, this.httpService.createHeader(false), requestUrl, body);
        return this.httpService.post(options);
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
    { type: Injectable }
];
/** @nocollapse */
SecurityApiService.ctorParameters = () => [
    { type: HttpClient },
    { type: HttpBaseService },
    { type: AngularliciousLoggingService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const action = new RegisterSubscriberAction(subscriber);
        action.Do(this);
        return action.response;
    }
}
SecurityBusinessProviderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SecurityBusinessProviderService.ctorParameters = () => [
    { type: AngularliciousLoggingService },
    { type: SecurityApiService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const message = `Preparing to register subscriber: ${JSON.stringify(subscriber)}`;
        this.loggingService.log(this.serviceName, Severity.Information, message);
        return this.businessProvider.registerSubscriber(subscriber);
    }
    /**
     * Use to verify the specified service.
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
    { type: Injectable }
];
/** @nocollapse */
AngularliciousSecurityService.ctorParameters = () => [
    { type: AngularliciousLoggingService },
    { type: SecurityBusinessProviderService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const functionName = 'handleSubscribeUser';
        /** @type {?} */
        const logMessage = `[${functionName}]: Preparing to handle the response from the [SecurityService] in the ${this.componentName}.`;
        this.loggingService.log(this.componentName, Severity.Information, logMessage);
        if (response) {
            if (response.IsSuccess) {
                /** @type {?} */
                const successMessage = `Successfully processed request to create subscriber. Prepare to download...`;
                this.loggingService.log(this.componentName, Severity.Information, successMessage);
                this.subscribe.emit((/** @type {?} */ (response)));
            }
            else {
                this.handleServiceErrors(
                // response as ErrorResponse,
                null, this.securityService.serviceContext);
            }
        }
    }
}
RegisterSubscriberComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'bm-register-subscriber',
                template: "<angularlicious-alert [alertNotification]=\"alertNotification\" [hasMessage]=\"alertNotification.showAlert\"></angularlicious-alert>\r\n<!-- SUBSCRIBE SIGN-UP FORM -->\r\n<form [formGroup]=\"_form\" (ngSubmit)=\"submitForm()\">\r\n  <!-- SUBSCRIBER NAME -->\r\n  <div class=\"input-group form-group-no-border\">\r\n    <span class=\"input-group-addon\">\r\n      <i class=\"now-ui-icons users_circle-08\"></i>\r\n    </span>\r\n    <input type=\"text\" formControlName=\"subscriberName\" class=\"form-control\" placeholder=\"Name...\">\r\n  </div>\r\n  <!-- SUBSCRIBER EMAIL -->\r\n  <div class=\"input-group form-group-no-border\">\r\n    <span class=\"input-group-addon\">\r\n      <i class=\"now-ui-icons ui-1_email-85\"></i>\r\n    </span>\r\n    <input type=\"text\" formControlName=\"emailAddress\" class=\"form-control\" placeholder=\"Email...\">\r\n  </div>\r\n  <!-- SUBSCRIBE BUTTON -->\r\n  <button class=\"btn btn-neutral btn-round btn-lg\">Subscribe\r\n    <i class=\"fa fa-check ml-1\"></i>\r\n  </button>\r\n</form>\r\n<!-- SUBSCRIBE SIGN-UP FORM -->",
                styles: [""]
            }] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AngularliciousSecurityModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
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
    }
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
                    SecurityBusinessProviderService //PROVIDE INTERNAL SERVICES FOR THE MODULE; SCOPED TO THIS MODULE;
                ]
            },] }
];

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