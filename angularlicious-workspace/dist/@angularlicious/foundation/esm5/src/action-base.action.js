/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Observable } from 'rxjs';
import { Action } from '@angularlicious/actions';
import { ServiceMessage } from '@angularlicious/rules-engine';
import { MessageType } from '@angularlicious/rules-engine';
import { ActionResult } from '@angularlicious/actions';
import { CompositeRule } from '@angularlicious/rules-engine';
import { Severity } from '@angularlicious/logging';
import { ErrorResponse } from './models/error-response.model';
/**
 * This is the application's base Action class that provides implementation of pipeline methods - pre/post
 * execution methods.
 *
 * The pre-execute methods that can be implemented are:
 * 		1. start();
 * 		2. audit();
 * 		3. preValidateAction();
 * 		4. evaluateRules();
 * 		5. postValidateAction();
 * 		6. preExecuteAction();
 *
 * If the status of action is good, the business logic will be executed using the:
 * 		1. processAction();
 *
 * The post-execution methods that can be implemented are:
 * 		1. postExecuteAction();
 * 		2. validateActionResult();
 * 		3. finish();
 */
var /**
 * This is the application's base Action class that provides implementation of pipeline methods - pre/post
 * execution methods.
 *
 * The pre-execute methods that can be implemented are:
 * 		1. start();
 * 		2. audit();
 * 		3. preValidateAction();
 * 		4. evaluateRules();
 * 		5. postValidateAction();
 * 		6. preExecuteAction();
 *
 * If the status of action is good, the business logic will be executed using the:
 * 		1. processAction();
 *
 * The post-execution methods that can be implemented are:
 * 		1. postExecuteAction();
 * 		2. validateActionResult();
 * 		3. finish();
 */
ActionBase = /** @class */ (function (_super) {
    tslib_1.__extends(ActionBase, _super);
    function ActionBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     */
    /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     * @return {?}
     */
    ActionBase.prototype.validateAction = /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     * @return {?}
     */
    function () {
        return this.validationContext.renderRules();
    };
    /**
     * @return {?}
     */
    ActionBase.prototype.postValidateAction = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.loggingService.log(this.actionName, Severity.Information, "Preparing to determine if the action contains validation errors in " + this.actionName);
        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, Severity.Information, "The target contains validation errors in " + this.actionName);
            // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
            this.validationContext.results.forEach(function (result) {
                if (!result.isValid) {
                    _this.publishRuleResult(result);
                    _this.retrieveRuleDetails(result);
                }
            });
        }
    };
    /**
     * @return {?}
     */
    ActionBase.prototype.postExecuteAction = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.actionResult === ActionResult.Fail) {
            this.serviceContext.Messages.forEach(function (e) {
                if (e.MessageType === MessageType.Error) {
                    _this.loggingService.log(_this.actionName, Severity.Error, e.toString());
                }
            });
        }
    };
    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     */
    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     * @return {?}
     */
    ActionBase.prototype.validateActionResult = /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     * @return {?}
     */
    function () {
        this.loggingService.log(this.actionName, Severity.Information, "Running [validateActionResult] for " + this.actionName + ".");
        // determine the status of the action based on any rule violations;
        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, Severity.Error, "The " + this.actionName + " contains rule violations.");
            this.actionResult = ActionResult.Fail;
            var /** @type {?} */ errorResponse = new ErrorResponse();
            errorResponse.IsSuccess = false;
            errorResponse.Message = "Validation errors exist.";
            this.response = Observable.throw(errorResponse);
        }
        this.actionResult = this.serviceContext.isGood()
            ? ActionResult.Success
            : ActionResult.Fail;
        return this.actionResult;
    };
    /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param ruleResult The result of a rendered rule.
     */
    /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param {?} ruleResult The result of a rendered rule.
     * @return {?}
     */
    ActionBase.prototype.retrieveRuleDetails = /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param {?} ruleResult The result of a rendered rule.
     * @return {?}
     */
    function (ruleResult) {
        var _this = this;
        if (ruleResult.rulePolicy instanceof CompositeRule) {
            var /** @type {?} */ composite = /** @type {?} */ (ruleResult.rulePolicy);
            if (composite && composite.hasErrors) {
                var /** @type {?} */ errors = composite.results.filter(function (result) { return !result.isValid && result.rulePolicy.isDisplayable; });
                errors.forEach(function (errorResult) {
                    _this.publishRuleResult(errorResult);
                    if (errorResult.rulePolicy instanceof CompositeRule) {
                        _this.retrieveRuleDetails(errorResult);
                    }
                });
            }
        }
    };
    /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param ruleResult
     */
    /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param {?} ruleResult
     * @return {?}
     */
    ActionBase.prototype.publishRuleResult = /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param {?} ruleResult
     * @return {?}
     */
    function (ruleResult) {
        var /** @type {?} */ serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
        serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
        serviceMessage.Source = this.actionName;
        this.serviceContext.Messages.push(serviceMessage);
        this.loggingService.log(this.actionName, Severity.Error, "" + serviceMessage.toString());
    };
    return ActionBase;
}(Action));
/**
 * This is the application's base Action class that provides implementation of pipeline methods - pre/post
 * execution methods.
 *
 * The pre-execute methods that can be implemented are:
 * 		1. start();
 * 		2. audit();
 * 		3. preValidateAction();
 * 		4. evaluateRules();
 * 		5. postValidateAction();
 * 		6. preExecuteAction();
 *
 * If the status of action is good, the business logic will be executed using the:
 * 		1. processAction();
 *
 * The post-execution methods that can be implemented are:
 * 		1. postExecuteAction();
 * 		2. validateActionResult();
 * 		3. finish();
 */
export { ActionBase };
function ActionBase_tsickle_Closure_declarations() {
    /** @type {?} */
    ActionBase.prototype.serviceContext;
    /** @type {?} */
    ActionBase.prototype.response;
    /** @type {?} */
    ActionBase.prototype.httpBase;
    /** @type {?} */
    ActionBase.prototype.loggingService;
    /** @type {?} */
    ActionBase.prototype.actionName;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhc2UuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vIiwic291cmNlcyI6WyJzcmMvYWN0aW9uLWJhc2UuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBSTdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBZ0Msc0NBQU07Ozs7SUFPcEM7OztPQUdHOzs7Ozs7SUFDSCxtQ0FBYzs7Ozs7SUFBZDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDN0M7Ozs7SUFFRCx1Q0FBa0I7OztJQUFsQjtRQUFBLGlCQXdCQztRQXZCQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFVBQVUsRUFDZixRQUFRLENBQUMsV0FBVyxFQUNwQix3RUFDRSxJQUFJLENBQUMsVUFDTCxDQUNILENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FB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LENBQUM7Z0JBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFdBQVc7b0JBQ3hCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFFcEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxLQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ3ZDO2lCQUNGLENBQUMsQ0FBQzthQUNKO1NBQ0Y7S0FDRjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsc0NBQWlCOzs7OztJQUFqQixVQUFrQixVQUFzQjtRQUN0QyxxQkFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQ3ZDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUMxQixVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDN0IsV0FBVyxDQUFDLEtBQUssQ0FDbEIsQ0FBQztRQUNGLGNBQWMsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDbkUsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFVBQVUsRUFDZixRQUFRLENBQUMsS0FBSyxFQUNkLEtBQUcsY0FBYyxDQUFDLFFBQVEsRUFBSSxDQUMvQixDQUFDO0tBQ0g7cUJBcktIO0VBdUNnQyxNQUFNLEVBK0hyQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEvSEQsc0JBK0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvYWN0aW9ucyc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSB9IGZyb20gJy4vaHR0cC1iYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9tb2RlbHMvZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlRXJyb3IgfSBmcm9tICcuL21vZGVscy9zZXJ2aWNlLWVycm9yLm1vZGVsJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBhcHBsaWNhdGlvbidzIGJhc2UgQWN0aW9uIGNsYXNzIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgcGlwZWxpbmUgbWV0aG9kcyAtIHByZS9wb3N0XHJcbiAqIGV4ZWN1dGlvbiBtZXRob2RzLlxyXG4gKlxyXG4gKiBUaGUgcHJlLWV4ZWN1dGUgbWV0aG9kcyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XHJcbiAqXHRcdDEuIHN0YXJ0KCk7XHJcbiAqXHRcdDIuIGF1ZGl0KCk7XHJcbiAqXHRcdDMuIHByZVZhbGlkYXRlQWN0aW9uKCk7XHJcbiAqXHRcdDQuIGV2YWx1YXRlUnVsZXMoKTtcclxuICpcdFx0NS4gcG9zdFZhbGlkYXRlQWN0aW9uKCk7XHJcbiAqXHRcdDYuIHByZUV4ZWN1dGVBY3Rpb24oKTtcclxuICpcclxuICpJZiB0aGUgc3RhdHVzIG9mIGFjdGlvbiBpcyBnb29kLCB0aGUgYnVzaW5lc3MgbG9naWMgd2lsbCBiZSBleGVjdXRlZCB1c2luZyB0aGU6XHJcbiAqXHRcdDEuIHByb2Nlc3NBY3Rpb24oKTtcclxuICpcclxuICogVGhlIHBvc3QtZXhlY3V0aW9uIG1ldGhvZHMgdGhhdCBjYW4gYmUgaW1wbGVtZW50ZWQgYXJlOlxyXG4gKlx0XHQxLiBwb3N0RXhlY3V0ZUFjdGlvbigpO1xyXG4gKlx0XHQyLiB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpO1xyXG4gKlx0XHQzLiBmaW5pc2goKTtcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uQmFzZSBleHRlbmRzIEFjdGlvbiB7XHJcbiAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0O1xyXG4gIHJlc3BvbnNlOiBPYnNlcnZhYmxlPGFueT47XHJcbiAgaHR0cEJhc2U6IEh0dHBCYXNlU2VydmljZTtcclxuICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZTtcclxuICBhY3Rpb25OYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgaXMgYSByZXF1aXJlZCBpbXBsZW1lbnRhdGlvbiBpZiB5b3Ugd2FudCB0byByZW5kZXIvZXhlY3V0ZSB0aGUgcnVsZXMgdGhhdFxyXG4gICAqIGFyZSBhc3NvY2lhdGVkIHRvIHRoZSBzcGVjaWZpZWQgYWN0aW9uLlxyXG4gICAqL1xyXG4gIHZhbGlkYXRlQWN0aW9uKCk6IFZhbGlkYXRpb25Db250ZXh0IHtcclxuICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Db250ZXh0LnJlbmRlclJ1bGVzKCk7XHJcbiAgfVxyXG5cclxuICBwb3N0VmFsaWRhdGVBY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFByZXBhcmluZyB0byBkZXRlcm1pbmUgaWYgdGhlIGFjdGlvbiBjb250YWlucyB2YWxpZGF0aW9uIGVycm9ycyBpbiAke1xyXG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZVxyXG4gICAgICB9YFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0aW9uQ29udGV4dC5oYXNSdWxlVmlvbGF0aW9ucygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgVGhlIHRhcmdldCBjb250YWlucyB2YWxpZGF0aW9uIGVycm9ycyBpbiAke3RoaXMuYWN0aW9uTmFtZX1gXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBMb2FkIHRoZSBlcnJvci9ydWxlIHZpb2xhdGlvbnMgaW50byB0aGUgU2VydmljZUNvbnRleHQgc28gdGhhdCB0aGUgaW5mb3JtYXRpb24gYnViYmxlcyB1cCB0byB0aGUgY2FsbGVyIG9mIHRoZSBzZXJ2aWNlO1xyXG4gICAgICB0aGlzLnZhbGlkYXRpb25Db250ZXh0LnJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQpIHtcclxuICAgICAgICAgIHRoaXMucHVibGlzaFJ1bGVSZXN1bHQocmVzdWx0KTtcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVSdWxlRGV0YWlscyhyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3N0RXhlY3V0ZUFjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLmFjdGlvblJlc3VsdCA9PT0gQWN0aW9uUmVzdWx0LkZhaWwpIHtcclxuICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgIGlmIChlLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvcikge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgICAgIGUudG9TdHJpbmcoKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWxsIGNvbmNyZXRlIGFjdGlvbnMgbXVzdCBvdmVycmlkZSBhbmQgaW1wbGVtZW50IHRoaXMgbWV0aG9kLiBJdCBpcyBkZWZpbmVkIGluIHRoZSBbQWN0aW9uXSBmcmFtZXdvcmsgY2xhc3MuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTogQWN0aW9uUmVzdWx0IHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUnVubmluZyBbdmFsaWRhdGVBY3Rpb25SZXN1bHRdIGZvciAke3RoaXMuYWN0aW9uTmFtZX0uYFxyXG4gICAgKTtcclxuICAgIC8vIGRldGVybWluZSB0aGUgc3RhdHVzIG9mIHRoZSBhY3Rpb24gYmFzZWQgb24gYW55IHJ1bGUgdmlvbGF0aW9ucztcclxuICAgIGlmICh0aGlzLnZhbGlkYXRpb25Db250ZXh0Lmhhc1J1bGVWaW9sYXRpb25zKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgIGBUaGUgJHt0aGlzLmFjdGlvbk5hbWV9IGNvbnRhaW5zIHJ1bGUgdmlvbGF0aW9ucy5gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuYWN0aW9uUmVzdWx0ID0gQWN0aW9uUmVzdWx0LkZhaWw7XHJcblxyXG4gICAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcclxuICAgICAgZXJyb3JSZXNwb25zZS5Jc1N1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgZXJyb3JSZXNwb25zZS5NZXNzYWdlID0gYFZhbGlkYXRpb24gZXJyb3JzIGV4aXN0LmA7XHJcbiAgICAgIHRoaXMucmVzcG9uc2UgPSBPYnNlcnZhYmxlLnRocm93KGVycm9yUmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3Rpb25SZXN1bHQgPSB0aGlzLnNlcnZpY2VDb250ZXh0LmlzR29vZCgpXHJcbiAgICAgID8gQWN0aW9uUmVzdWx0LlN1Y2Nlc3NcclxuICAgICAgOiBBY3Rpb25SZXN1bHQuRmFpbDtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvblJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBwcm9jZXNzIHJ1bGUgcmVzdWx0cyBmb3IgY29tcG9zaXRlIHJ1bGVzLiBOb3RlLCB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgcmVjdXJzaXZlXHJcbiAgICogYW5kIHdpbGwgcHJvY2VzcyBhbGwgY29tcG9zaXRlIHJ1bGVzIGluIHRoZSBydWxlIHNldCBjb250YWluZWQgaW4gdGhlIFZhbGlkYXRpb25Db250ZXh0LlxyXG4gICAqIEBwYXJhbSBydWxlUmVzdWx0IFRoZSByZXN1bHQgb2YgYSByZW5kZXJlZCBydWxlLlxyXG4gICAqL1xyXG4gIHJldHJpZXZlUnVsZURldGFpbHMocnVsZVJlc3VsdDogUnVsZVJlc3VsdCkge1xyXG4gICAgaWYgKHJ1bGVSZXN1bHQucnVsZVBvbGljeSBpbnN0YW5jZW9mIENvbXBvc2l0ZVJ1bGUpIHtcclxuICAgICAgY29uc3QgY29tcG9zaXRlID0gcnVsZVJlc3VsdC5ydWxlUG9saWN5IGFzIENvbXBvc2l0ZVJ1bGU7XHJcbiAgICAgIGlmIChjb21wb3NpdGUgJiYgY29tcG9zaXRlLmhhc0Vycm9ycykge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IGNvbXBvc2l0ZS5yZXN1bHRzLmZpbHRlcihcclxuICAgICAgICAgIHJlc3VsdCA9PiAhcmVzdWx0LmlzVmFsaWQgJiYgcmVzdWx0LnJ1bGVQb2xpY3kuaXNEaXNwbGF5YWJsZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGVycm9ycy5mb3JFYWNoKGVycm9yUmVzdWx0ID0+IHtcclxuICAgICAgICAgIHRoaXMucHVibGlzaFJ1bGVSZXN1bHQoZXJyb3JSZXN1bHQpO1xyXG5cclxuICAgICAgICAgIGlmIChlcnJvclJlc3VsdC5ydWxlUG9saWN5IGluc3RhbmNlb2YgQ29tcG9zaXRlUnVsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlUnVsZURldGFpbHMoZXJyb3JSZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIGhlbHBlciBmdW5jdGlvbiB0byBwdWJsaXNoIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlIFtTZXJ2aWNlQ29udGV4dC5NZXNzYWdlc10gbGlzdC5cclxuICAgKiBAcGFyYW0gcnVsZVJlc3VsdFxyXG4gICAqL1xyXG4gIHB1Ymxpc2hSdWxlUmVzdWx0KHJ1bGVSZXN1bHQ6IFJ1bGVSZXN1bHQpIHtcclxuICAgIGNvbnN0IHNlcnZpY2VNZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKFxyXG4gICAgICBydWxlUmVzdWx0LnJ1bGVQb2xpY3kubmFtZSxcclxuICAgICAgcnVsZVJlc3VsdC5ydWxlUG9saWN5Lm1lc3NhZ2UsXHJcbiAgICAgIE1lc3NhZ2VUeXBlLkVycm9yXHJcbiAgICApO1xyXG4gICAgc2VydmljZU1lc3NhZ2UuRGlzcGxheVRvVXNlciA9IHJ1bGVSZXN1bHQucnVsZVBvbGljeS5pc0Rpc3BsYXlhYmxlO1xyXG4gICAgc2VydmljZU1lc3NhZ2UuU291cmNlID0gdGhpcy5hY3Rpb25OYW1lO1xyXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5wdXNoKHNlcnZpY2VNZXNzYWdlKTtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICBgJHtzZXJ2aWNlTWVzc2FnZS50b1N0cmluZygpfWBcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==