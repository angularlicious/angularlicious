/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import 'rxjs/add/observable/throw';
import * as rules from '@angularlicious/rules-engine';
import { Severity } from '@angularlicious/logging';
import { SecurityActionBase } from './security-action-base.action';
var RegisterSubscriberAction = /** @class */ (function (_super) {
    tslib_1.__extends(RegisterSubscriberAction, _super);
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
            .addRule(new rules.StringIsNotNullEmptyRange('NameIsValid', 'The name value is not valid. Must be between 1-40 characters.', this.subscriber.Name, 2, 40, true))
            .addRule(new rules.StringIsNotNullEmptyRange('EmailIsValid', 'The email address value is not valid. Must be between 5-60 characters.', this.subscriber.EmailAddress, 5, 60, true));
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
export { RegisterSubscriberAction };
function RegisterSubscriberAction_tsickle_Closure_declarations() {
    /** @type {?} */
    RegisterSubscriberAction.prototype.response;
    /** @type {?} */
    RegisterSubscriberAction.prototype.subscriber;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItc3Vic2NyaWJlci5hY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvIiwic291cmNlcyI6WyJzcmMvYnVzaW5lc3MvYWN0aW9ucy9yZWdpc3Rlci1zdWJzY3JpYmVyLmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sMkJBQTJCLENBQUM7QUFLbkMsT0FBTyxLQUFLLEtBQUssTUFBTSw4QkFBOEIsQ0FBQztBQU90RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFHbkUsSUFBQTtJQUE4QyxvREFBa0I7SUFJOUQsa0NBQW9CLFVBQXNCO1FBQTFDLFlBQ0UsaUJBQU8sU0FFUjtRQUhtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQUV4QyxLQUFJLENBQUMsVUFBVSxHQUFHLDBCQUEwQixDQUFDOztLQUM5QztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILG9EQUFpQjs7Ozs7OztJQUFqQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQ1QsNkNBQTJDLElBQUksQ0FBQyxVQUFVLGFBQVUsQ0FDckUsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUI7YUFDbkIsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDM0IsT0FBTyxDQUNOLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUNqQyxhQUFhLEVBQ2IsK0RBQStELEVBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUNwQixDQUFDLEVBQ0QsRUFBRSxFQUNGLElBQUksQ0FDTCxDQUNGO2FBQ0EsT0FBTyxDQUNOLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUNqQyxjQUFjLEVBQ2Qsd0VBQXdFLEVBQ3hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUM1QixDQUFDLEVBQ0QsRUFBRSxFQUNGLElBQUksQ0FDTCxDQUNGLENBQUM7S0FDTDtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsZ0RBQWE7Ozs7O0lBQWI7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFVBQVUsRUFDZixRQUFRLENBQUMsV0FBVyxFQUNwQix5Q0FBdUMsSUFBSSxDQUFDLFVBQVUsTUFBRyxDQUMxRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzlGO21DQXpFSDtFQW1COEMsa0JBQWtCLEVBdUQvRCxDQUFBO0FBdkRELG9DQXVEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XHJcbmltcG9ydCAqIGFzIHJ1bGVzIGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBIdHRwQmFzZVNlcnZpY2UsXHJcbiAgU2VydmljZVJlc3BvbnNlLFxyXG4gIEVycm9yUmVzcG9uc2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3N1YnNjcmliZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUFjdGlvbkJhc2UgfSBmcm9tICcuL3NlY3VyaXR5LWFjdGlvbi1iYXNlLmFjdGlvbic7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlclN1YnNjcmliZXJBY3Rpb24gZXh0ZW5kcyBTZWN1cml0eUFjdGlvbkJhc2Uge1xyXG4gIC8vIHJlc3BvbnNlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPjtcclxuICByZXNwb25zZTogT2JzZXJ2YWJsZTxTZXJ2aWNlUmVzcG9uc2U+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmFjdGlvbk5hbWUgPSAnUmVnaXN0ZXJTdWJzY3JpYmVyQWN0aW9uJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZyb20gdGhlIGJhc2UgW0FjdGlvbl0gY2xhc3MgdG8gYWxsb3cgZm9yIHJ1bGVzIHRvIGJlIGFkZGVkIHRvIHRoZVxyXG4gICAqIGFjdGlvbidzIFtWYWxpZGF0aW9uQ29udGV4dF0uIEFueSBydWxlcyBhZGRlZCB0byB0aGUgW1ZhbGlkYXRpb25Db250ZXh0XSBoZXJlIHdpbGwgYmUgZXhlY3V0ZWQgd2hlblxyXG4gICAqIHRoZSBhY3Rpb24ncyBbVmFsaWRhdGVBY3Rpb25dIG1ldGhvZCBpcyBjYWxsZWQgLSB0aGlzIG1ldGhvZCBpcyBqdXN0IG9uZSBvZiBtYW55IHBpcGVsaW5lIG1ldGhvZHNcclxuICAgKiBvZiB0aGUgW0FjdGlvbl0gZnJhbWV3b3JrLlxyXG4gICAqL1xyXG4gIHByZVZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIGBSdW5uaW5nIHRoZSBbcHJlVmFsaWRhdGVBY3Rpb25dIGZvciB0aGUgJHt0aGlzLmFjdGlvbk5hbWV9IGFjdGlvbi5gXHJcbiAgICApO1xyXG4gICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dFxyXG4gICAgICAud2l0aFNvdXJjZSh0aGlzLmFjdGlvbk5hbWUpXHJcbiAgICAgIC5hZGRSdWxlKFxyXG4gICAgICAgIG5ldyBydWxlcy5TdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxyXG4gICAgICAgICAgJ05hbWVJc1ZhbGlkJyxcclxuICAgICAgICAgICdUaGUgbmFtZSB2YWx1ZSBpcyBub3QgdmFsaWQuIE11c3QgYmUgYmV0d2VlbiAxLTQwIGNoYXJhY3RlcnMuJyxcclxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlci5OYW1lLFxyXG4gICAgICAgICAgMixcclxuICAgICAgICAgIDQwLFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgICAuYWRkUnVsZShcclxuICAgICAgICBuZXcgcnVsZXMuU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZShcclxuICAgICAgICAgICdFbWFpbElzVmFsaWQnLFxyXG4gICAgICAgICAgJ1RoZSBlbWFpbCBhZGRyZXNzIHZhbHVlIGlzIG5vdCB2YWxpZC4gTXVzdCBiZSBiZXR3ZWVuIDUtNjAgY2hhcmFjdGVycy4nLFxyXG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVyLkVtYWlsQWRkcmVzcyxcclxuICAgICAgICAgIDUsXHJcbiAgICAgICAgICA2MCxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvdmlkZSBidXNpbmVzcyBsb2dpYyBpbXBsZW1lbnRhdGlvbiAtIHRoaXMgbWV0aG9kIGlzIGFsbG93ZWQgdG8gZXhlY3V0ZSBvbmx5IGlmIHRoZSBjdXJyZW50IGFjdGlvblxyXG4gICAqIGRvZXMgbm90IGNvbnRhaW4gYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBwZXJmb3JtQWN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSdW5uaW5nIHRoZSBbcGVyZm9ybUFjdGlvbl0gZm9yIHRoZSAke3RoaXMuYWN0aW9uTmFtZX0uYFxyXG4gICAgKTtcclxuICAgIHRoaXMucmVzcG9uc2UgPSB0aGlzLmJ1c2luZXNzUHJvdmlkZXIuc2VjdXJpdHlBcGlTZXJ2aWNlLnJlZ2lzdGVyU3Vic2NyaWJlcih0aGlzLnN1YnNjcmliZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=