/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/toPromise';
import { HttpBaseService } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { HttpRequestMethod } from '@angularlicious/foundation';
var SecurityApiService = /** @class */ (function (_super) {
    tslib_1.__extends(SecurityApiService, _super);
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
        { type: HttpClient },
        { type: HttpBaseService },
        { type: AngularliciousLoggingService }
    ]; };
    return SecurityApiService;
}(HttpBaseService));
export { SecurityApiService };
function SecurityApiService_tsickle_Closure_declarations() {
    /** @type {?} */
    SecurityApiService.prototype.httpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHktYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvIiwic291cmNlcyI6WyJzcmMvYnVzaW5lc3Mvc2VjdXJpdHktYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQVUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sNkJBQTZCLENBQUM7QUFDckMsT0FBTyw2QkFBNkIsQ0FBQztBQUlyQyxPQUFPLEVBQUUsZUFBZSxFQUFtQixNQUFNLDRCQUE0QixDQUFDO0FBQzlFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUFHdkIsOENBQWU7SUFDckQsNEJBQ0UsSUFBZ0IsRUFDVCxhQUNQLGNBQTRDO1FBSDlDLFlBS0Usa0JBQU0sSUFBSSxFQUFFLGNBQWMsQ0FBQyxTQUM1QjtRQUpRLGlCQUFXLEdBQVgsV0FBVzs7S0FJbkI7Ozs7O0lBRUQsK0NBQWtCOzs7O0lBQWxCLFVBQW1CLFVBQXNCO1FBQ3ZDLHFCQUFNLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQztRQUM3QyxxQkFBTSxPQUFPLEdBQU0sSUFBSSxDQUFDLFdBQVcsNEJBQXVCLFVBQVksQ0FBQztRQUN2RSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekUscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQ25ELGlCQUFpQixDQUFDLElBQUksRUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQ3BDLFVBQVUsRUFDVixJQUFJLENBQ0wsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7O0tBVXRDOztnQkFoQ0YsVUFBVTs7OztnQkFiRixVQUFVO2dCQVFWLGVBQWU7Z0JBQ2YsNEJBQTRCOzs2QkFWckM7RUFld0MsZUFBZTtTQUExQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL29ic2VydmVPbic7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLCBTZXZlcml0eSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1ldGhvZCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QXBpU2VydmljZSBleHRlbmRzIEh0dHBCYXNlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHVibGljIGh0dHBTZXJ2aWNlOiBIdHRwQmFzZVNlcnZpY2UsXHJcbiAgICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoaHR0cCwgbG9nZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpOiBPYnNlcnZhYmxlPFNlcnZpY2VSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdFVybCA9ICdhcGkvc3Vic2NyaWJlci9yZWdpc3Rlcic7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5zZXJ2aWNlTmFtZX0gcHJlcGFyaW5nIHRvIGNhbGw6ICR7cmVxdWVzdFVybH1gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIG1lc3NhZ2UpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShzdWJzY3JpYmVyKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZVJlcXVlc3RPcHRpb25zKFxyXG4gICAgICBIdHRwUmVxdWVzdE1ldGhvZC5QT1NULFxyXG4gICAgICB0aGlzLmh0dHBTZXJ2aWNlLmNyZWF0ZUhlYWRlcihmYWxzZSksXHJcbiAgICAgIHJlcXVlc3RVcmwsXHJcbiAgICAgIGJvZHlcclxuICAgICk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQob3B0aW9ucyk7XHJcblxyXG4gICAgLyoqVEVNUE9SQVJZIElNUExFTUVOVEFUSU9OICovXHJcbiAgICAvLyBjb25zdCByZXNwb25zZSA9IG5ldyBTZXJ2aWNlUmVzcG9uc2UoKTtcclxuICAgIC8vIHJlc3BvbnNlLklzU3VjY2VzcyA9IHRydWU7XHJcbiAgICAvLyByZXNwb25zZS5NZXNzYWdlID0gYEZha2UgbWVzc2FnZSBmcm9tICR7dGhpcy5zZXJ2aWNlTmFtZX1gO1xyXG4gICAgLy8gcmVzcG9uc2UuRGF0YSA9IHRydWU7XHJcbiAgICAvLyBjb25zdCBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QocmVzcG9uc2UpO1xyXG4gICAgLy8gcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAvKipURU1QT1JBUlkgSU1QTEVNRU5UQVRJT04gKi9cclxuICB9XHJcbn1cclxuIl19