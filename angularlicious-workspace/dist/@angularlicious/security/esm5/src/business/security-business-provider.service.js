/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { RegisterSubscriberAction } from './actions/register-subscriber.action';
import { SecurityApiService } from './security-api.service';
var SecurityBusinessProviderService = /** @class */ (function (_super) {
    tslib_1.__extends(SecurityBusinessProviderService, _super);
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
        { type: AngularliciousLoggingService },
        { type: SecurityApiService }
    ]; };
    return SecurityBusinessProviderService;
}(ServiceBase));
export { SecurityBusinessProviderService };
function SecurityBusinessProviderService_tsickle_Closure_declarations() {
    /** @type {?} */
    SecurityBusinessProviderService.prototype.securityApiService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9zZWN1cml0eS8iLCJzb3VyY2VzIjpbInNyYy9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLDRCQUE0QixDQUFDO0FBQzFFLE9BQU8sRUFFTCw0QkFBNEIsRUFDN0IsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7SUFHUCwyREFBVztJQUM5RCx5Q0FDRSxjQUE0QyxFQUNyQztRQUZULFlBSUUsa0JBQU0sY0FBYyxDQUFDLFNBQ3RCO1FBSFEsd0JBQWtCLEdBQWxCLGtCQUFrQjs7S0FHMUI7SUFFRDs7O09BR0c7Ozs7OztJQUNILDREQUFrQjs7Ozs7SUFBbEIsVUFBbUIsVUFBc0I7UUFDdkMscUJBQU0sTUFBTSxHQUFHLElBQUksd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUN4Qjs7Z0JBakJGLFVBQVU7Ozs7Z0JBTlQsNEJBQTRCO2dCQUlyQixrQkFBa0I7OzBDQVgzQjtFQWNxRCxXQUFXO1NBQW5ELCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBTZXJ2aWNlQmFzZSwgU2VydmljZVJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIGxvZ2dpbmdTZXJ2aWNlQ29uZmlnLFxyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFJlZ2lzdGVyU3Vic2NyaWJlckFjdGlvbiB9IGZyb20gJy4vYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbic7XHJcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLy4uL21vZGVscy9zdWJzY3JpYmVyLm1vZGVsJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBcGlTZXJ2aWNlIH0gZnJvbSAnLi9zZWN1cml0eS1hcGkuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIGV4dGVuZHMgU2VydmljZUJhc2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgc2VjdXJpdHlBcGlTZXJ2aWNlOiBTZWN1cml0eUFwaVNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKGxvZ2dpbmdTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSBhY3Rpb24gdG8gcmVnaXN0ZXIgYSBuZXcgc3Vic2NyaWJlci5cclxuICAgKiBAcGFyYW0gc3Vic2NyaWJlclxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24oc3Vic2NyaWJlcik7XHJcbiAgICBhY3Rpb24uRG8odGhpcyk7XHJcbiAgICByZXR1cm4gYWN0aW9uLnJlc3BvbnNlO1xyXG4gIH1cclxufVxyXG4iXX0=