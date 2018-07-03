/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class ActionBase extends Action {
    /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     * @return {?}
     */
    validateAction() {
        return this.validationContext.renderRules();
    }
    /**
     * @return {?}
     */
    postValidateAction() {
        this.loggingService.log(this.actionName, Severity.Information, `Preparing to determine if the action contains validation errors in ${this.actionName}`);
        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, Severity.Information, `The target contains validation errors in ${this.actionName}`);
            // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
            this.validationContext.results.forEach(result => {
                if (!result.isValid) {
                    this.publishRuleResult(result);
                    this.retrieveRuleDetails(result);
                }
            });
        }
    }
    /**
     * @return {?}
     */
    postExecuteAction() {
        if (this.actionResult === ActionResult.Fail) {
            this.serviceContext.Messages.forEach(e => {
                if (e.MessageType === MessageType.Error) {
                    this.loggingService.log(this.actionName, Severity.Error, e.toString());
                }
            });
        }
    }
    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     * @return {?}
     */
    validateActionResult() {
        this.loggingService.log(this.actionName, Severity.Information, `Running [validateActionResult] for ${this.actionName}.`);
        // determine the status of the action based on any rule violations;
        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, Severity.Error, `The ${this.actionName} contains rule violations.`);
            this.actionResult = ActionResult.Fail;
            const /** @type {?} */ errorResponse = new ErrorResponse();
            errorResponse.IsSuccess = false;
            errorResponse.Message = `Validation errors exist.`;
            this.response = Observable.throw(errorResponse);
        }
        this.actionResult = this.serviceContext.isGood()
            ? ActionResult.Success
            : ActionResult.Fail;
        return this.actionResult;
    }
    /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param {?} ruleResult The result of a rendered rule.
     * @return {?}
     */
    retrieveRuleDetails(ruleResult) {
        if (ruleResult.rulePolicy instanceof CompositeRule) {
            const /** @type {?} */ composite = /** @type {?} */ (ruleResult.rulePolicy);
            if (composite && composite.hasErrors) {
                const /** @type {?} */ errors = composite.results.filter(result => !result.isValid && result.rulePolicy.isDisplayable);
                errors.forEach(errorResult => {
                    this.publishRuleResult(errorResult);
                    if (errorResult.rulePolicy instanceof CompositeRule) {
                        this.retrieveRuleDetails(errorResult);
                    }
                });
            }
        }
    }
    /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param {?} ruleResult
     * @return {?}
     */
    publishRuleResult(ruleResult) {
        const /** @type {?} */ serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
        serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
        serviceMessage.Source = this.actionName;
        this.serviceContext.Messages.push(serviceMessage);
        this.loggingService.log(this.actionName, Severity.Error, `${serviceMessage.toString()}`);
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhc2UuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vIiwic291cmNlcyI6WyJzcmMvYWN0aW9uLWJhc2UuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFJN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0I5RCxNQUFNLGlCQUFrQixTQUFRLE1BQU07Ozs7OztJQVdwQyxjQUFjO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM3Qzs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFVBQVUsRUFDZixRQUFRLENBQUMsV0FBVyxFQUNwQixzRUFDRSxJQUFJLENBQUMsVUFDUCxFQUFFLENBQ0gsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFVBQVUsRUFDZixRQUFRLENBQUMsV0FBVyxFQUNwQiw0Q0FBNEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUM5RCxDQUFDOztZQUdGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbEM7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGOzs7O0lBRUQsaUJBQWlCO1FBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsVUFBVSxFQUNmLFFBQVEsQ0FBQyxLQUFLLEVBQ2QsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNiLENBQUM7aUJBQ0g7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGOzs7OztJQUtELG9CQUFvQjtRQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFVBQVUsRUFDZixRQUFRLENBQUMsV0FBVyxFQUNwQixzQ0FBc0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUN6RCxDQUFDOztRQUVGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFVBQVUsRUFDZixRQUFRLENBQUMsS0FBSyxFQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsNEJBQTRCLENBQ25ELENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFFdEMsdUJBQU0sYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDMUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDaEMsYUFBYSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQzlDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTztZQUN0QixDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7Ozs7OztJQU9ELG1CQUFtQixDQUFDLFVBQXNCO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLFlBQVksYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNuRCx1QkFBTSxTQUFTLHFCQUFHLFVBQVUsQ0FBQyxVQUEyQixDQUFBLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyx1QkFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUM3RCxDQUFDO2dCQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFFcEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ3ZDO2lCQUNGLENBQUMsQ0FBQzthQUNKO1NBQ0Y7S0FDRjs7Ozs7O0lBTUQsaUJBQWlCLENBQUMsVUFBc0I7UUFDdEMsdUJBQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUN2QyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksRUFDMUIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQzdCLFdBQVcsQ0FBQyxLQUFLLENBQ2xCLENBQUM7UUFDRixjQUFjLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ25FLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQ2YsUUFBUSxDQUFDLEtBQUssRUFDZCxHQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUMvQixDQUFDO0tBQ0g7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9hY3Rpb25zJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgU2VydmljZUNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBIdHRwQmFzZVNlcnZpY2UgfSBmcm9tICcuL2h0dHAtYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgU2VydmljZUVycm9yIH0gZnJvbSAnLi9tb2RlbHMvc2VydmljZS1lcnJvci5tb2RlbCc7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYXBwbGljYXRpb24ncyBiYXNlIEFjdGlvbiBjbGFzcyB0aGF0IHByb3ZpZGVzIGltcGxlbWVudGF0aW9uIG9mIHBpcGVsaW5lIG1ldGhvZHMgLSBwcmUvcG9zdFxyXG4gKiBleGVjdXRpb24gbWV0aG9kcy5cclxuICpcclxuICogVGhlIHByZS1leGVjdXRlIG1ldGhvZHMgdGhhdCBjYW4gYmUgaW1wbGVtZW50ZWQgYXJlOlxyXG4gKlx0XHQxLiBzdGFydCgpO1xyXG4gKlx0XHQyLiBhdWRpdCgpO1xyXG4gKlx0XHQzLiBwcmVWYWxpZGF0ZUFjdGlvbigpO1xyXG4gKlx0XHQ0LiBldmFsdWF0ZVJ1bGVzKCk7XHJcbiAqXHRcdDUuIHBvc3RWYWxpZGF0ZUFjdGlvbigpO1xyXG4gKlx0XHQ2LiBwcmVFeGVjdXRlQWN0aW9uKCk7XHJcbiAqXHJcbiAqSWYgdGhlIHN0YXR1cyBvZiBhY3Rpb24gaXMgZ29vZCwgdGhlIGJ1c2luZXNzIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgdXNpbmcgdGhlOlxyXG4gKlx0XHQxLiBwcm9jZXNzQWN0aW9uKCk7XHJcbiAqXHJcbiAqIFRoZSBwb3N0LWV4ZWN1dGlvbiBtZXRob2RzIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcclxuICpcdFx0MS4gcG9zdEV4ZWN1dGVBY3Rpb24oKTtcclxuICpcdFx0Mi4gdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTtcclxuICpcdFx0My4gZmluaXNoKCk7XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhc2UgZXh0ZW5kcyBBY3Rpb24ge1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dDtcclxuICByZXNwb25zZTogT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIGh0dHBCYXNlOiBIdHRwQmFzZVNlcnZpY2U7XHJcbiAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2U7XHJcbiAgYWN0aW9uTmFtZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGlzIGEgcmVxdWlyZWQgaW1wbGVtZW50YXRpb24gaWYgeW91IHdhbnQgdG8gcmVuZGVyL2V4ZWN1dGUgdGhlIHJ1bGVzIHRoYXRcclxuICAgKiBhcmUgYXNzb2NpYXRlZCB0byB0aGUgc3BlY2lmaWVkIGFjdGlvbi5cclxuICAgKi9cclxuICB2YWxpZGF0ZUFjdGlvbigpOiBWYWxpZGF0aW9uQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uQ29udGV4dC5yZW5kZXJSdWxlcygpO1xyXG4gIH1cclxuXHJcbiAgcG9zdFZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gZGV0ZXJtaW5lIGlmIHRoZSBhY3Rpb24gY29udGFpbnMgdmFsaWRhdGlvbiBlcnJvcnMgaW4gJHtcclxuICAgICAgICB0aGlzLmFjdGlvbk5hbWVcclxuICAgICAgfWBcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbkNvbnRleHQuaGFzUnVsZVZpb2xhdGlvbnMoKSkge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFRoZSB0YXJnZXQgY29udGFpbnMgdmFsaWRhdGlvbiBlcnJvcnMgaW4gJHt0aGlzLmFjdGlvbk5hbWV9YFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gTG9hZCB0aGUgZXJyb3IvcnVsZSB2aW9sYXRpb25zIGludG8gdGhlIFNlcnZpY2VDb250ZXh0IHNvIHRoYXQgdGhlIGluZm9ybWF0aW9uIGJ1YmJsZXMgdXAgdG8gdGhlIGNhbGxlciBvZiB0aGUgc2VydmljZTtcclxuICAgICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dC5yZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICB0aGlzLnB1Ymxpc2hSdWxlUmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlUnVsZURldGFpbHMocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zdEV4ZWN1dGVBY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5hY3Rpb25SZXN1bHQgPT09IEFjdGlvblJlc3VsdC5GYWlsKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBpZiAoZS5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IpIHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbk5hbWUsXHJcbiAgICAgICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgICAgICBlLnRvU3RyaW5nKClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFsbCBjb25jcmV0ZSBhY3Rpb25zIG11c3Qgb3ZlcnJpZGUgYW5kIGltcGxlbWVudCB0aGlzIG1ldGhvZC4gSXQgaXMgZGVmaW5lZCBpbiB0aGUgW0FjdGlvbl0gZnJhbWV3b3JrIGNsYXNzLlxyXG4gICAqL1xyXG4gIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk6IEFjdGlvblJlc3VsdCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFJ1bm5pbmcgW3ZhbGlkYXRlQWN0aW9uUmVzdWx0XSBmb3IgJHt0aGlzLmFjdGlvbk5hbWV9LmBcclxuICAgICk7XHJcbiAgICAvLyBkZXRlcm1pbmUgdGhlIHN0YXR1cyBvZiB0aGUgYWN0aW9uIGJhc2VkIG9uIGFueSBydWxlIHZpb2xhdGlvbnM7XHJcbiAgICBpZiAodGhpcy52YWxpZGF0aW9uQ29udGV4dC5oYXNSdWxlVmlvbGF0aW9ucygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICBgVGhlICR7dGhpcy5hY3Rpb25OYW1lfSBjb250YWlucyBydWxlIHZpb2xhdGlvbnMuYFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmFjdGlvblJlc3VsdCA9IEFjdGlvblJlc3VsdC5GYWlsO1xyXG5cclxuICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKCk7XHJcbiAgICAgIGVycm9yUmVzcG9uc2UuSXNTdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSA9IGBWYWxpZGF0aW9uIGVycm9ycyBleGlzdC5gO1xyXG4gICAgICB0aGlzLnJlc3BvbnNlID0gT2JzZXJ2YWJsZS50aHJvdyhlcnJvclJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aW9uUmVzdWx0ID0gdGhpcy5zZXJ2aWNlQ29udGV4dC5pc0dvb2QoKVxyXG4gICAgICA/IEFjdGlvblJlc3VsdC5TdWNjZXNzXHJcbiAgICAgIDogQWN0aW9uUmVzdWx0LkZhaWw7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25SZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcHJvY2VzcyBydWxlIHJlc3VsdHMgZm9yIGNvbXBvc2l0ZSBydWxlcy4gTm90ZSwgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIHJlY3Vyc2l2ZVxyXG4gICAqIGFuZCB3aWxsIHByb2Nlc3MgYWxsIGNvbXBvc2l0ZSBydWxlcyBpbiB0aGUgcnVsZSBzZXQgY29udGFpbmVkIGluIHRoZSBWYWxpZGF0aW9uQ29udGV4dC5cclxuICAgKiBAcGFyYW0gcnVsZVJlc3VsdCBUaGUgcmVzdWx0IG9mIGEgcmVuZGVyZWQgcnVsZS5cclxuICAgKi9cclxuICByZXRyaWV2ZVJ1bGVEZXRhaWxzKHJ1bGVSZXN1bHQ6IFJ1bGVSZXN1bHQpIHtcclxuICAgIGlmIChydWxlUmVzdWx0LnJ1bGVQb2xpY3kgaW5zdGFuY2VvZiBDb21wb3NpdGVSdWxlKSB7XHJcbiAgICAgIGNvbnN0IGNvbXBvc2l0ZSA9IHJ1bGVSZXN1bHQucnVsZVBvbGljeSBhcyBDb21wb3NpdGVSdWxlO1xyXG4gICAgICBpZiAoY29tcG9zaXRlICYmIGNvbXBvc2l0ZS5oYXNFcnJvcnMpIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSBjb21wb3NpdGUucmVzdWx0cy5maWx0ZXIoXHJcbiAgICAgICAgICByZXN1bHQgPT4gIXJlc3VsdC5pc1ZhbGlkICYmIHJlc3VsdC5ydWxlUG9saWN5LmlzRGlzcGxheWFibGVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBlcnJvcnMuZm9yRWFjaChlcnJvclJlc3VsdCA9PiB7XHJcbiAgICAgICAgICB0aGlzLnB1Ymxpc2hSdWxlUmVzdWx0KGVycm9yUmVzdWx0KTtcclxuXHJcbiAgICAgICAgICBpZiAoZXJyb3JSZXN1bHQucnVsZVBvbGljeSBpbnN0YW5jZW9mIENvbXBvc2l0ZVJ1bGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVJ1bGVEZXRhaWxzKGVycm9yUmVzdWx0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWxwZXIgZnVuY3Rpb24gdG8gcHVibGlzaCBhIG5ldyBbU2VydmljZU1lc3NhZ2VdIHRvIHRoZSBbU2VydmljZUNvbnRleHQuTWVzc2FnZXNdIGxpc3QuXHJcbiAgICogQHBhcmFtIHJ1bGVSZXN1bHRcclxuICAgKi9cclxuICBwdWJsaXNoUnVsZVJlc3VsdChydWxlUmVzdWx0OiBSdWxlUmVzdWx0KSB7XHJcbiAgICBjb25zdCBzZXJ2aWNlTWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShcclxuICAgICAgcnVsZVJlc3VsdC5ydWxlUG9saWN5Lm5hbWUsXHJcbiAgICAgIHJ1bGVSZXN1bHQucnVsZVBvbGljeS5tZXNzYWdlLFxyXG4gICAgICBNZXNzYWdlVHlwZS5FcnJvclxyXG4gICAgKTtcclxuICAgIHNlcnZpY2VNZXNzYWdlLkRpc3BsYXlUb1VzZXIgPSBydWxlUmVzdWx0LnJ1bGVQb2xpY3kuaXNEaXNwbGF5YWJsZTtcclxuICAgIHNlcnZpY2VNZXNzYWdlLlNvdXJjZSA9IHRoaXMuYWN0aW9uTmFtZTtcclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMucHVzaChzZXJ2aWNlTWVzc2FnZSk7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5hY3Rpb25OYW1lLFxyXG4gICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgYCR7c2VydmljZU1lc3NhZ2UudG9TdHJpbmcoKX1gXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=