/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { SecurityBusinessProviderService } from './business/security-business-provider.service';
var AngularliciousSecurityService = /** @class */ (function (_super) {
    tslib_1.__extends(AngularliciousSecurityService, _super);
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
        { type: AngularliciousLoggingService },
        { type: SecurityBusinessProviderService }
    ]; };
    return AngularliciousSecurityService;
}(ServiceBase));
export { AngularliciousSecurityService };
function AngularliciousSecurityService_tsickle_Closure_declarations() {
    /** @type {?} */
    AngularliciousSecurityService.prototype.businessProvider;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS8iLCJzb3VyY2VzIjpbInNyYy9zZWN1cml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLDRCQUE0QixDQUFDO0FBQzFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQzs7SUFRN0MseURBQVc7SUFDNUQsdUNBQ0UsY0FBNEMsRUFDcEM7UUFGVixZQUlFLGtCQUFNLGNBQWMsQ0FBQyxTQUl0QjtRQU5TLHNCQUFnQixHQUFoQixnQkFBZ0I7UUFHeEIsS0FBSSxDQUFDLFdBQVcsR0FBRywrQkFBK0IsQ0FBQztRQUNuRCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUM7UUFDM0QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDOztLQUM1RDtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsMERBQWtCOzs7OztJQUFsQixVQUFtQixVQUFzQjtRQUN2QyxxQkFBTSxPQUFPLEdBQUcsdUNBQXFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFHLENBQUM7UUFDbEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0Q7SUFFRCxNQUFNO0lBQ04sc0NBQXNDO0lBQ3RDLDBHQUEwRztJQUMxRyxNQUFNO0lBQ04sNERBQTREO0lBQzVELHlHQUF5RztJQUN6RyxzRUFBc0U7SUFDdEUsSUFBSTs7OztJQUVKLHFEQUFhOzs7SUFBYjtRQUNFLEVBQUUsQ0FBQyxDQUNELElBQUksQ0FBQyxjQUFjO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0I7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUN4QixDQUFDO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOztnQkF0Q0YsVUFBVTs7OztnQkFSRiw0QkFBNEI7Z0JBQzVCLCtCQUErQjs7d0NBSnhDO0VBWW1ELFdBQVc7U0FBakQsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlcnZpY2VCYXNlLCBTZXJ2aWNlUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsIFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5cclxuLy8gaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG4vLyBpbXBvcnQgeyBTdWJzY3JpYmVyQnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL2J1c2luZXNzL3N1YnNjcmliZXItYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbi8vIGltcG9ydCB7IENvbmZpcm1hdGlvblRva2VuIH0gZnJvbSAnLi9tb2RlbHMvY29uZmlybWF0aW9uLXRva2VuLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGxvZ2dpbmdTZXJ2aWNlKTtcclxuICAgIHRoaXMuc2VydmljZU5hbWUgPSAnQW5ndWxhcmxpY2lvdXNTZWN1cml0eVNlcnZpY2UnO1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyLnNlcnZpY2VDb250ZXh0ID0gdGhpcy5zZXJ2aWNlQ29udGV4dDtcclxuICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlci5sb2dnaW5nU2VydmljZSA9IHRoaXMubG9nZ2luZ1NlcnZpY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlciB0byB0aGUgYXBwbGljYXRpb24uXHJcbiAgICogQHBhcmFtIHN1YnNjcmliZXIgY29udGFpbnMgdGhlIHVzZXIgbmFtZSBhbmQgZW1haWwgYWRkcmVzcyBmb3IgdGhlIHN1YnNjcmliZXIuXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGBQcmVwYXJpbmcgdG8gcmVnaXN0ZXIgc3Vic2NyaWJlcjogJHtKU09OLnN0cmluZ2lmeShzdWJzY3JpYmVyKX1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIHRoaXMuYnVzaW5lc3NQcm92aWRlci5yZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcik7XHJcbiAgfVxyXG5cclxuICAvLyAvKipcclxuICAvLyAgKiBVc2UgdG8gY29uZmlybSBhIG5ldyBzdWJzY3JpYmVyLlxyXG4gIC8vICAqIEBwYXJhbSBjb25maXJtYXRpb25Ub2tlbiBjb250YWlucyB0aGUgdXNlciBuYW1lIGFuZCBhIFtIYXNoXSB2YWx1ZSB0aGF0IGlzIHVzZWQgdG8gY29uZmlybSB0aGUgdXNlci5cclxuICAvLyAgKi9cclxuICAvLyBjb25maXJtU3Vic2NyaWJlcihjb25maXJtYXRpb25Ub2tlbjogQ29uZmlybWF0aW9uVG9rZW4pIHtcclxuICAvLyAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBgUHJlcGFyaW5nIHRvIGNvbmZpcm0gc3Vic2NyaWJlci5gKTtcclxuICAvLyAgIHJldHVybiB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuY29uZmlybVN1YnNjcmliZXIoY29uZmlybWF0aW9uVG9rZW4pXHJcbiAgLy8gfVxyXG5cclxuICB2ZXJpZnlTZXJ2aWNlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlICYmXHJcbiAgICAgIHRoaXMuYnVzaW5lc3NQcm92aWRlciAmJlxyXG4gICAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VjdXJpdHlBcGlTZXJ2aWNlXHJcbiAgICApXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=