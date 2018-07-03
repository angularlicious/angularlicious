/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { Subscriber } from './../../models/subscriber.model';
import { AngularliciousSecurityService } from './../../security.service';
var RegisterSubscriberComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RegisterSubscriberComponent, _super);
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
export { RegisterSubscriberComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItc3Vic2NyaWJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxNQUFNLEVBRU4sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQStCeEIsdURBQWE7SUFNNUQscUNBQ1UsaUJBQ1IsY0FBNEMsRUFDckMsYUFDUCxNQUFjO1FBSmhCLFlBTUUsa0JBQU0sNkJBQTZCLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxTQUM3RDtRQU5TLHFCQUFlLEdBQWYsZUFBZTtRQUVoQixpQkFBVyxHQUFYLFdBQVc7MEJBUEUsSUFBSSxZQUFZLEVBQW1COztLQVd4RDs7OztJQUVELDhDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNsQjs7OztJQUVELCtDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEMsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDekMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDeEMsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxnREFBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQzlCLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFFRCxtREFBYTs7OztJQUFiLFVBQWMsVUFBc0I7UUFBcEMsaUJBUUM7UUFQQyxJQUFJLENBQUMsZUFBZTthQUNqQixrQkFBa0IsQ0FBQyxVQUFVLENBQUM7YUFDOUIsU0FBUyxDQUNSLFVBQUMsUUFBeUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsRUFBbEMsQ0FBa0MsRUFDakUsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEVBQXBFLENBQW9FLEVBQzdFLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsRUFBdEMsQ0FBc0MsQ0FDN0MsQ0FBQztLQUNMOzs7OztJQUVELHlEQUFtQjs7OztJQUFuQixVQUFvQixRQUF5QjtRQUMzQyxxQkFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUM7UUFDM0MscUJBQU0sVUFBVSxHQUFHLE1BQUksWUFBWSw4RUFDakMsSUFBSSxDQUFDLGFBQWEsTUFDakIsQ0FBQztRQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM5RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLHFCQUFNLGNBQWMsR0FBRyw2RUFBNkUsQ0FBQztnQkFDckcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLGNBQWMsQ0FDZixDQUFDO2dCQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxtQkFBQyxRQUEyQixFQUFDLENBQUM7YUFDbEQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsbUJBQW1CLENBRXRCLElBQUksRUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FDcEMsQ0FBQzthQUNIO1NBQ0Y7S0FDRjs7Z0JBaEdGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLCsvQkFzQm9CO29CQUM5QixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7Z0JBOUJRLDZCQUE2QjtnQkFGN0IsNEJBQTRCO2dCQUY1QixXQUFXO2dCQUZYLE1BQU07Ozs0QkF1Q1osTUFBTTs7c0NBOUNUO0VBNENpRCxhQUFhO1NBQWpELDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSwgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlY3VyaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlUmVzcG9uc2UsIEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdibS1yZWdpc3Rlci1zdWJzY3JpYmVyJyxcclxuICB0ZW1wbGF0ZTogYDxhbmd1bGFybGljaW91cy1hbGVydCBbYWxlcnROb3RpZmljYXRpb25dPVwiYWxlcnROb3RpZmljYXRpb25cIiBbaGFzTWVzc2FnZV09XCJhbGVydE5vdGlmaWNhdGlvbi5zaG93QWxlcnRcIj48L2FuZ3VsYXJsaWNpb3VzLWFsZXJ0PlxyXG48IS0tIFNVQlNDUklCRSBTSUdOLVVQIEZPUk0gLS0+XHJcbjxmb3JtIFtmb3JtR3JvdXBdPVwiX2Zvcm1cIiAobmdTdWJtaXQpPVwic3VibWl0Rm9ybSgpXCI+XHJcbiAgPCEtLSBTVUJTQ1JJQkVSIE5BTUUgLS0+XHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZvcm0tZ3JvdXAtbm8tYm9yZGVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVzZXJzX2NpcmNsZS0wOFwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cInN1YnNjcmliZXJOYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIk5hbWUuLi5cIj5cclxuICA8L2Rpdj5cclxuICA8IS0tIFNVQlNDUklCRVIgRU1BSUwgLS0+XHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZvcm0tZ3JvdXAtbm8tYm9yZGVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVpLTFfZW1haWwtODVcIj48L2k+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJlbWFpbEFkZHJlc3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwuLi5cIj5cclxuICA8L2Rpdj5cclxuICA8IS0tIFNVQlNDUklCRSBCVVRUT04gLS0+XHJcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbmV1dHJhbCBidG4tcm91bmQgYnRuLWxnXCI+U3Vic2NyaWJlXHJcbiAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrIG1sLTFcIj48L2k+XHJcbiAgPC9idXR0b24+XHJcbjwvZm9ybT5cclxuPCEtLSBTVUJTQ1JJQkUgU0lHTi1VUCBGT1JNIC0tPmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnRCYXNlXHJcbiAgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBPdXRwdXQoKSBzdWJzY3JpYmUgPSBuZXcgRXZlbnRFbWl0dGVyPFNlcnZpY2VSZXNwb25zZT4oKTtcclxuICBfZm9ybTogRm9ybUdyb3VwO1xyXG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzZWN1cml0eVNlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlLFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHN1cGVyKCdSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQnLCBsb2dnaW5nU2VydmljZSwgcm91dGVyKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgc3Vic2NyaWJlck5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIGVtYWlsQWRkcmVzczogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdWJtaXRGb3JtKCkge1xyXG4gICAgdGhpcy5zZWN1cml0eVNlcnZpY2UucmVzZXRTZXJ2aWNlQ29udGV4dCgpO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIoXHJcbiAgICAgIHRoaXMuX2Zvcm0udmFsdWUuc3Vic2NyaWJlck5hbWUsXHJcbiAgICAgIHRoaXMuX2Zvcm0udmFsdWUuZW1haWxBZGRyZXNzXHJcbiAgICApO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVVc2VyKHRoaXMuc3Vic2NyaWJlcik7XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmVVc2VyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcclxuICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlXHJcbiAgICAgIC5yZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcilcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAocmVzcG9uc2U6IFNlcnZpY2VSZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVTdWJzY3JpYmVVc2VyKHJlc3BvbnNlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmhhbmRsZVNlcnZpY2VFcnJvcnMoZXJyb3IsIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnNlcnZpY2VDb250ZXh0KSxcclxuICAgICAgICAoKSA9PiB0aGlzLmZpbmlzaFJlcXVlc3QodGhpcy5jb21wb25lbnROYW1lKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlU3Vic2NyaWJlVXNlcihyZXNwb25zZTogU2VydmljZVJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSAnaGFuZGxlU3Vic2NyaWJlVXNlcic7XHJcbiAgICBjb25zdCBsb2dNZXNzYWdlID0gYFske2Z1bmN0aW9uTmFtZX1dOiBQcmVwYXJpbmcgdG8gaGFuZGxlIHRoZSByZXNwb25zZSBmcm9tIHRoZSBbU2VjdXJpdHlTZXJ2aWNlXSBpbiB0aGUgJHtcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lXHJcbiAgICB9LmA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLmNvbXBvbmVudE5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBsb2dNZXNzYWdlKTtcclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBpZiAocmVzcG9uc2UuSXNTdWNjZXNzKSB7XHJcbiAgICAgICAgY29uc3Qgc3VjY2Vzc01lc3NhZ2UgPSBgU3VjY2Vzc2Z1bGx5IHByb2Nlc3NlZCByZXF1ZXN0IHRvIGNyZWF0ZSBzdWJzY3JpYmVyLiBQcmVwYXJlIHRvIGRvd25sb2FkLi4uYDtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgc3VjY2Vzc01lc3NhZ2VcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlLmVtaXQocmVzcG9uc2UgYXMgU2VydmljZVJlc3BvbnNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZpY2VFcnJvcnMoXHJcbiAgICAgICAgICAvLyByZXNwb25zZSBhcyBFcnJvclJlc3BvbnNlLFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnNlcnZpY2VDb250ZXh0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=