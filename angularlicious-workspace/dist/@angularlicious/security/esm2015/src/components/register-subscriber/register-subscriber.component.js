/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { Subscriber } from './../../models/subscriber.model';
import { AngularliciousSecurityService } from './../../security.service';
export class RegisterSubscriberComponent extends ComponentBase {
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
function RegisterSubscriberComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    RegisterSubscriberComponent.prototype.subscribe;
    /** @type {?} */
    RegisterSubscriberComponent.prototype._form;
    /** @type {?} */
    RegisterSubscriberComponent.prototype.subscriber;
    /** @type {?} */
    RegisterSubscriberComponent.prototype.securityService;
    /** @type {?} */
    RegisterSubscriberComponent.prototype.formBuilder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItc3Vic2NyaWJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULE1BQU0sRUFFTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUErQnpFLE1BQU0sa0NBQW1DLFNBQVEsYUFBYTs7Ozs7OztJQU01RCxZQUNVLGlCQUNSLGNBQTRDLEVBQ3JDLGFBQ1AsTUFBYztRQUVkLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFMckQsb0JBQWUsR0FBZixlQUFlO1FBRWhCLGdCQUFXLEdBQVgsV0FBVzt5QkFQRSxJQUFJLFlBQVksRUFBbUI7S0FXeEQ7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ2xCOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEMsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDekMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDeEMsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDckM7Ozs7O0lBRUQsYUFBYSxDQUFDLFVBQXNCO1FBQ2xDLElBQUksQ0FBQyxlQUFlO2FBQ2pCLGtCQUFrQixDQUFDLFVBQVUsQ0FBQzthQUM5QixTQUFTLENBQ1IsQ0FBQyxRQUF5QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEVBQ2pFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxFQUM3RSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FDN0MsQ0FBQztLQUNMOzs7OztJQUVELG1CQUFtQixDQUFDLFFBQXlCO1FBQzNDLHVCQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQztRQUMzQyx1QkFBTSxVQUFVLEdBQUcsSUFBSSxZQUFZLHlFQUNqQyxJQUFJLENBQUMsYUFDUCxHQUFHLENBQUM7UUFDSixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2Qix1QkFBTSxjQUFjLEdBQUcsNkVBQTZFLENBQUM7Z0JBQ3JHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsYUFBYSxFQUNsQixRQUFRLENBQUMsV0FBVyxFQUNwQixjQUFjLENBQ2YsQ0FBQztnQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksbUJBQUMsUUFBMkIsRUFBQyxDQUFDO2FBQ2xEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLG1CQUFtQixDQUV0QixJQUFJLEVBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQ3BDLENBQUM7YUFDSDtTQUNGO0tBQ0Y7OztZQWhHRixTQUFTLFNBQUM7O2dCQUVULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FzQm9CO2dCQUM5QixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7OztZQTlCUSw2QkFBNkI7WUFGN0IsNEJBQTRCO1lBRjVCLFdBQVc7WUFGWCxNQUFNOzs7d0JBdUNaLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsIFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZWN1cml0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZVJlc3BvbnNlLCBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnYm0tcmVnaXN0ZXItc3Vic2NyaWJlcicsXHJcbiAgdGVtcGxhdGU6IGA8YW5ndWxhcmxpY2lvdXMtYWxlcnQgW2FsZXJ0Tm90aWZpY2F0aW9uXT1cImFsZXJ0Tm90aWZpY2F0aW9uXCIgW2hhc01lc3NhZ2VdPVwiYWxlcnROb3RpZmljYXRpb24uc2hvd0FsZXJ0XCI+PC9hbmd1bGFybGljaW91cy1hbGVydD5cclxuPCEtLSBTVUJTQ1JJQkUgU0lHTi1VUCBGT1JNIC0tPlxyXG48Zm9ybSBbZm9ybUdyb3VwXT1cIl9mb3JtXCIgKG5nU3VibWl0KT1cInN1Ym1pdEZvcm0oKVwiPlxyXG4gIDwhLS0gU1VCU0NSSUJFUiBOQU1FIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmb3JtLWdyb3VwLW5vLWJvcmRlclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxyXG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1c2Vyc19jaXJjbGUtMDhcIj48L2k+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJzdWJzY3JpYmVyTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJOYW1lLi4uXCI+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBTVUJTQ1JJQkVSIEVNQUlMIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmb3JtLWdyb3VwLW5vLWJvcmRlclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxyXG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX2VtYWlsLTg1XCI+PC9pPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwiZW1haWxBZGRyZXNzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkVtYWlsLi4uXCI+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBTVUJTQ1JJQkUgQlVUVE9OIC0tPlxyXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLW5ldXRyYWwgYnRuLXJvdW5kIGJ0bi1sZ1wiPlN1YnNjcmliZVxyXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVjayBtbC0xXCI+PC9pPlxyXG4gIDwvYnV0dG9uPlxyXG48L2Zvcm0+XHJcbjwhLS0gU1VCU0NSSUJFIFNJR04tVVAgRk9STSAtLT5gLFxyXG4gIHN0eWxlczogW2BgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50QmFzZVxyXG4gIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAT3V0cHV0KCkgc3Vic2NyaWJlID0gbmV3IEV2ZW50RW1pdHRlcjxTZXJ2aWNlUmVzcG9uc2U+KCk7XHJcbiAgX2Zvcm06IEZvcm1Hcm91cDtcclxuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBBbmd1bGFybGljaW91c1NlY3VyaXR5U2VydmljZSxcclxuICAgIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHVibGljIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcclxuICAgIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcignUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50JywgbG9nZ2luZ1NlcnZpY2UsIHJvdXRlcik7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEZvcm0oKTogdm9pZCB7XHJcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHN1YnNjcmliZXJOYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICBlbWFpbEFkZHJlc3M6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3VibWl0Rm9ybSgpIHtcclxuICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnJlc2V0U2VydmljZUNvbnRleHQoKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyKFxyXG4gICAgICB0aGlzLl9mb3JtLnZhbHVlLnN1YnNjcmliZXJOYW1lLFxyXG4gICAgICB0aGlzLl9mb3JtLnZhbHVlLmVtYWlsQWRkcmVzc1xyXG4gICAgKTtcclxuICAgIHRoaXMuc3Vic2NyaWJlVXNlcih0aGlzLnN1YnNjcmliZXIpO1xyXG4gIH1cclxuXHJcbiAgc3Vic2NyaWJlVXNlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKSB7XHJcbiAgICB0aGlzLnNlY3VyaXR5U2VydmljZVxyXG4gICAgICAucmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKHJlc3BvbnNlOiBTZXJ2aWNlUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlU3Vic2NyaWJlVXNlcihyZXNwb25zZSksXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKGVycm9yLCB0aGlzLnNlY3VyaXR5U2VydmljZS5zZXJ2aWNlQ29udGV4dCksXHJcbiAgICAgICAgKCkgPT4gdGhpcy5maW5pc2hSZXF1ZXN0KHRoaXMuY29tcG9uZW50TmFtZSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVN1YnNjcmliZVVzZXIocmVzcG9uc2U6IFNlcnZpY2VSZXNwb25zZSkge1xyXG4gICAgY29uc3QgZnVuY3Rpb25OYW1lID0gJ2hhbmRsZVN1YnNjcmliZVVzZXInO1xyXG4gICAgY29uc3QgbG9nTWVzc2FnZSA9IGBbJHtmdW5jdGlvbk5hbWV9XTogUHJlcGFyaW5nIHRvIGhhbmRsZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgW1NlY3VyaXR5U2VydmljZV0gaW4gdGhlICR7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZVxyXG4gICAgfS5gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5jb21wb25lbnROYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgbG9nTWVzc2FnZSk7XHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgaWYgKHJlc3BvbnNlLklzU3VjY2Vzcykge1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3NNZXNzYWdlID0gYFN1Y2Nlc3NmdWxseSBwcm9jZXNzZWQgcmVxdWVzdCB0byBjcmVhdGUgc3Vic2NyaWJlci4gUHJlcGFyZSB0byBkb3dubG9hZC4uLmA7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZS5lbWl0KHJlc3BvbnNlIGFzIFNlcnZpY2VSZXNwb25zZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKFxyXG4gICAgICAgICAgLy8gcmVzcG9uc2UgYXMgRXJyb3JSZXNwb25zZSxcclxuICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICB0aGlzLnNlY3VyaXR5U2VydmljZS5zZXJ2aWNlQ29udGV4dFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19