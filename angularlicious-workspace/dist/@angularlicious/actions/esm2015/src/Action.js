/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ValidationContext } from '@angularlicious/rules-engine';
import { ValidationContextState } from '@angularlicious/rules-engine';
import { ActionResult } from './ActionResult';
/**
 * This is the framework Action class that provides the pipeline of pre/post
 * execution methods. This class implements the [Template Method] pattern.
 *
 * The pre-execute functions that can be implemented are:
 * 		1. start();
 * 		2. audit();
 * 		3. preValidateAction();
 * 		4. evaluateRules();
 * 		5. postValidateAction();
 * 		6. preExecuteAction();
 *
 * If the status of action is good, the business logic will be executed using the:
 * 		7. processAction();
 *
 * The post-execution functions that can be implemented are:
 * 		8. postExecuteAction();
 * 		9. validateActionResult();
 * 		10. finish();
 */
export class Action {
    /**
     * The default constructor for the class.
     */
    constructor() {
        /**
         * Indicates if the action is allowed execution. If there are any rule
         * violations in the validation context, the action is not allowed to
         * execute.
         */
        this.allowExecution = true;
        /**
         * The validation context for the specified action instance.
         */
        this._validationContext = new ValidationContext();
        /**
         * The result of the action. The default value is [Unknown], until the action
         * is executed.
         */
        this.actionResult = ActionResult.Unknown;
    }
    /**
     * Use to retrieve the [ValidationContext] for the specified action.
     * @return {?}
     */
    get validationContext() {
        return this._validationContext;
    }
    /**
     * Use this method to execute a concrete action. A concrete action must implement
     * the [processAction] and the [validateActionResult] functions to be a valid
     * action.
     * @return {?}
     */
    execute() {
        console.log('Preparing to execute action.');
        this.processActionPipeline();
    }
    /**
     * Use this method to process the action pipeline methods.
     * @return {?}
     */
    processActionPipeline() {
        this.startAction();
        if (this.allowExecution) {
            this.processAction();
        }
        this.finishAction();
    }
    /**
     * Use this method to call the pipeline methods for the [start] or beginning
     * process of the action pipeline.
     * @return {?}
     */
    startAction() {
        console.log('Starting action.');
        this.start();
        this.audit();
        this.preValidateAction();
        this.evaluateRules();
        this.postValidateAction();
        this.preExecuteAction();
    }
    /**
     * Use this method to execute the methods at the end of the action pipeline.
     * @return {?}
     */
    finishAction() {
        console.log('Finishing action.');
        this.postExecuteAction();
        this.validateActionResult();
        this.finish();
    }
    /**
     * Use this method to process the action. This will only be called if the action's
     * validation context is in a valid state (no rule violations).
     *
     * All concrete actions are required to provide an implementation of the [performAction]
     * method that is called for this part of the action pipeline.
     * @return {?}
     */
    processAction() {
        console.log('Processing action.');
        this.performAction();
    }
    /**
     * All action must implement this function. This is where your
     * [business logic] should be implemented. This function is called if
     * there are no validation rule exceptions.
     * @return {?}
     */
    performAction() {
        throw new Error('Not implemented. Requires implementation in concrete action.');
    }
    /**
     * Override/Implement this function to perform an early operation in the action pipeline.
     * This function belongs to the pre-execute functions of the action pipeline.
     * @return {?}
     */
    start() {
        console.log('Starting action.');
    }
    /**
     * Implement this function to perform any auditing features during the pre-exectuion of the
     * business logic.
     * @return {?}
     */
    audit() {
        console.log('Auditing action.');
    }
    /**
     * Use this function to setup any validation rules before the validation happens. This
     * function is called before [evaluateRules].
     * @return {?}
     */
    preValidateAction() {
        console.log('Pre-validating action.');
    }
    /**
     * Use this function to implement the execution of the validation and business rules. This
     * function is called after [preValidateAction].
     * @return {?}
     */
    evaluateRules() {
        console.log('Evaluating action rules.');
        const /** @type {?} */ context = this.validateAction();
        if (context.isValid) {
            this.allowExecution = true;
            this.validationContext.state = ValidationContextState.Success;
        }
        else {
            this.allowExecution = false;
            this.validationContext.state = ValidationContextState.Failure;
        }
    }
    /**
     * Use to determine or handle the results of the rule evalation. This
     * function is called after the [evaluateRules].
     * @return {?}
     */
    postValidateAction() {
        console.log('Post-Validation of action.');
    }
    /**
     * Use this function to perform any setup before the action is executed.
     * @return {?}
     */
    preExecuteAction() {
        console.log('Pre-execution of action.');
    }
    /**
     * Use this funciton to evaluate the action after the the business logic within
     * the [performAction] has executed.
     * @return {?}
     */
    postExecuteAction() {
        console.log('Post-execution of action');
    }
    /**
     * This function requires implementation to determin the state and result of the action.
     * Use this opportunity to validate the results.
     * @return {?}
     */
    validateActionResult() {
        throw new Error('Concrete actions required to implement this method.');
    }
    /**
     * Use this function to perform any cleanup, logging, or disposing of resources used
     * by the action. This is the last function called during the pipeline.
     * @return {?}
     */
    finish() {
        console.log('Finish action.');
    }
    /**
     * Implement this function to perform validation of business rules and data.
     * @return {?}
     */
    validateAction() {
        console.log('Validating the action.');
        return this.validationContext;
    }
}
function Action_tsickle_Closure_declarations() {
    /**
     * Indicates if the action is allowed execution. If there are any rule
     * violations in the validation context, the action is not allowed to
     * execute.
     * @type {?}
     */
    Action.prototype.allowExecution;
    /**
     * The validation context for the specified action instance.
     * @type {?}
     */
    Action.prototype._validationContext;
    /**
     * The result of the action. The default value is [Unknown], until the action
     * is executed.
     * @type {?}
     */
    Action.prototype.actionResult;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMvIiwic291cmNlcyI6WyJzcmMvQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCOUMsTUFBTTs7OztJQXVCSjs7Ozs7OzhCQWhCaUIsSUFBSTs7OztrQ0FLMkIsSUFBSSxpQkFBaUIsRUFBRTs7Ozs7NEJBTTFDLFlBQVksQ0FBQyxPQUFPO0tBS2pDOzs7OztJQUtoQixJQUFJLGlCQUFpQjtRQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0tBQ2hDOzs7Ozs7O0lBT0QsT0FBTztRQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFLTyxxQkFBcUI7UUFDM0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7Ozs7OztJQU9kLFdBQVc7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7Ozs7O0lBTWxCLFlBQVk7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7OztJQVVSLGFBQWE7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7Ozs7SUFRdkIsYUFBYTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQ2IsOERBQThELENBQy9ELENBQUM7S0FDSDs7Ozs7O0lBTUQsS0FBSztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNqQzs7Ozs7O0lBTUQsS0FBSztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNqQzs7Ozs7O0lBTUQsaUJBQWlCO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQ3ZDOzs7Ozs7SUFNRCxhQUFhO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3hDLHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLENBQUM7U0FDL0Q7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUMsT0FBTyxDQUFDO1NBQy9EO0tBQ0Y7Ozs7OztJQU1ELGtCQUFrQjtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7S0FDM0M7Ozs7O0lBS0QsZ0JBQWdCO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQ3pDOzs7Ozs7SUFNRCxpQkFBaUI7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDekM7Ozs7OztJQU1ELG9CQUFvQjtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7S0FDeEU7Ozs7OztJQU1ELE1BQU07UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDL0I7Ozs7O0lBS0QsY0FBYztRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQy9CO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dFN0YXRlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IElBY3Rpb24gfSBmcm9tICcuL0lBY3Rpb24nO1xyXG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICcuL0FjdGlvblJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZnJhbWV3b3JrIEFjdGlvbiBjbGFzcyB0aGF0IHByb3ZpZGVzIHRoZSBwaXBlbGluZSBvZiBwcmUvcG9zdFxyXG4gKiBleGVjdXRpb24gbWV0aG9kcy4gVGhpcyBjbGFzcyBpbXBsZW1lbnRzIHRoZSBbVGVtcGxhdGUgTWV0aG9kXSBwYXR0ZXJuLlxyXG4gKlxyXG4gKiBUaGUgcHJlLWV4ZWN1dGUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcclxuICpcdFx0MS4gc3RhcnQoKTtcclxuICpcdFx0Mi4gYXVkaXQoKTtcclxuICpcdFx0My4gcHJlVmFsaWRhdGVBY3Rpb24oKTtcclxuICpcdFx0NC4gZXZhbHVhdGVSdWxlcygpO1xyXG4gKlx0XHQ1LiBwb3N0VmFsaWRhdGVBY3Rpb24oKTtcclxuICpcdFx0Ni4gcHJlRXhlY3V0ZUFjdGlvbigpO1xyXG4gKlxyXG4gKklmIHRoZSBzdGF0dXMgb2YgYWN0aW9uIGlzIGdvb2QsIHRoZSBidXNpbmVzcyBsb2dpYyB3aWxsIGJlIGV4ZWN1dGVkIHVzaW5nIHRoZTpcclxuICpcdFx0Ny4gcHJvY2Vzc0FjdGlvbigpO1xyXG4gKlxyXG4gKiBUaGUgcG9zdC1leGVjdXRpb24gZnVuY3Rpb25zIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcclxuICpcdFx0OC4gcG9zdEV4ZWN1dGVBY3Rpb24oKTtcclxuICpcdFx0OS4gdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTtcclxuICpcdFx0MTAuIGZpbmlzaCgpO1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFjdGlvbiBpbXBsZW1lbnRzIElBY3Rpb24ge1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGFjdGlvbiBpcyBhbGxvd2VkIGV4ZWN1dGlvbi4gSWYgdGhlcmUgYXJlIGFueSBydWxlIFxyXG4gICAqIHZpb2xhdGlvbnMgaW4gdGhlIHZhbGlkYXRpb24gY29udGV4dCwgdGhlIGFjdGlvbiBpcyBub3QgYWxsb3dlZCB0byBcclxuICAgKiBleGVjdXRlLiBcclxuICAgKi9cclxuICBhbGxvd0V4ZWN1dGlvbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB2YWxpZGF0aW9uIGNvbnRleHQgZm9yIHRoZSBzcGVjaWZpZWQgYWN0aW9uIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db250ZXh0OiBWYWxpZGF0aW9uQ29udGV4dCA9IG5ldyBWYWxpZGF0aW9uQ29udGV4dCgpO1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFRoZSByZXN1bHQgb2YgdGhlIGFjdGlvbi4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgW1Vua25vd25dLCB1bnRpbCB0aGUgYWN0aW9uXHJcbiAgICogaXMgZXhlY3V0ZWQuXHJcbiAgICovXHJcbiAgYWN0aW9uUmVzdWx0OiBBY3Rpb25SZXN1bHQgPSBBY3Rpb25SZXN1bHQuVW5rbm93bjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRlZmF1bHQgY29uc3RydWN0b3IgZm9yIHRoZSBjbGFzcy5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgW1ZhbGlkYXRpb25Db250ZXh0XSBmb3IgdGhlIHNwZWNpZmllZCBhY3Rpb24uXHJcbiAgICovXHJcbiAgZ2V0IHZhbGlkYXRpb25Db250ZXh0KCk6IFZhbGlkYXRpb25Db250ZXh0IHtcclxuICAgIHJldHVybiB0aGlzLl92YWxpZGF0aW9uQ29udGV4dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBleGVjdXRlIGEgY29uY3JldGUgYWN0aW9uLiBBIGNvbmNyZXRlIGFjdGlvbiBtdXN0IGltcGxlbWVudFxyXG4gICAqIHRoZSBbcHJvY2Vzc0FjdGlvbl0gYW5kIHRoZSBbdmFsaWRhdGVBY3Rpb25SZXN1bHRdIGZ1bmN0aW9ucyB0byBiZSBhIHZhbGlkXHJcbiAgICogYWN0aW9uLlxyXG4gICAqL1xyXG4gIGV4ZWN1dGUoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUHJlcGFyaW5nIHRvIGV4ZWN1dGUgYWN0aW9uLicpO1xyXG4gICAgdGhpcy5wcm9jZXNzQWN0aW9uUGlwZWxpbmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBwcm9jZXNzIHRoZSBhY3Rpb24gcGlwZWxpbmUgbWV0aG9kcy4gXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwcm9jZXNzQWN0aW9uUGlwZWxpbmUoKSB7XHJcbiAgICB0aGlzLnN0YXJ0QWN0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5hbGxvd0V4ZWN1dGlvbikge1xyXG4gICAgICB0aGlzLnByb2Nlc3NBY3Rpb24oKTtcclxuICAgIH1cclxuICAgIHRoaXMuZmluaXNoQWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gY2FsbCB0aGUgcGlwZWxpbmUgbWV0aG9kcyBmb3IgdGhlIFtzdGFydF0gb3IgYmVnaW5uaW5nIFxyXG4gICAqIHByb2Nlc3Mgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cclxuICAgKi9cclxuICBwcml2YXRlIHN0YXJ0QWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIGFjdGlvbi4nKTtcclxuICAgIHRoaXMuc3RhcnQoKTtcclxuICAgIHRoaXMuYXVkaXQoKTtcclxuICAgIHRoaXMucHJlVmFsaWRhdGVBY3Rpb24oKTtcclxuICAgIHRoaXMuZXZhbHVhdGVSdWxlcygpO1xyXG4gICAgdGhpcy5wb3N0VmFsaWRhdGVBY3Rpb24oKTtcclxuICAgIHRoaXMucHJlRXhlY3V0ZUFjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgdGhlIG1ldGhvZHMgYXQgdGhlIGVuZCBvZiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZmluaXNoQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0ZpbmlzaGluZyBhY3Rpb24uJyk7XHJcbiAgICB0aGlzLnBvc3RFeGVjdXRlQWN0aW9uKCk7XHJcbiAgICB0aGlzLnZhbGlkYXRlQWN0aW9uUmVzdWx0KCk7XHJcbiAgICB0aGlzLmZpbmlzaCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHByb2Nlc3MgdGhlIGFjdGlvbi4gVGhpcyB3aWxsIG9ubHkgYmUgY2FsbGVkIGlmIHRoZSBhY3Rpb24ncyBcclxuICAgKiB2YWxpZGF0aW9uIGNvbnRleHQgaXMgaW4gYSB2YWxpZCBzdGF0ZSAobm8gcnVsZSB2aW9sYXRpb25zKS5cclxuICAgKiBcclxuICAgKiBBbGwgY29uY3JldGUgYWN0aW9ucyBhcmUgcmVxdWlyZWQgdG8gcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgW3BlcmZvcm1BY3Rpb25dIFxyXG4gICAqIG1ldGhvZCB0aGF0IGlzIGNhbGxlZCBmb3IgdGhpcyBwYXJ0IG9mIHRoZSBhY3Rpb24gcGlwZWxpbmUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwcm9jZXNzQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1Byb2Nlc3NpbmcgYWN0aW9uLicpO1xyXG4gICAgdGhpcy5wZXJmb3JtQWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbGwgYWN0aW9uIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24uIFRoaXMgaXMgd2hlcmUgeW91clxyXG4gICAqIFtidXNpbmVzcyBsb2dpY10gc2hvdWxkIGJlIGltcGxlbWVudGVkLiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpZlxyXG4gICAqIHRoZXJlIGFyZSBubyB2YWxpZGF0aW9uIHJ1bGUgZXhjZXB0aW9ucy5cclxuICAgKi9cclxuICBwZXJmb3JtQWN0aW9uKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAnTm90IGltcGxlbWVudGVkLiBSZXF1aXJlcyBpbXBsZW1lbnRhdGlvbiBpbiBjb25jcmV0ZSBhY3Rpb24uJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlL0ltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW4gZWFybHkgb3BlcmF0aW9uIGluIHRoZSBhY3Rpb24gcGlwZWxpbmUuXHJcbiAgICogVGhpcyBmdW5jdGlvbiBiZWxvbmdzIHRvIHRoZSBwcmUtZXhlY3V0ZSBmdW5jdGlvbnMgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cclxuICAgKi9cclxuICBzdGFydCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFueSBhdWRpdGluZyBmZWF0dXJlcyBkdXJpbmcgdGhlIHByZS1leGVjdHVpb24gb2YgdGhlXHJcbiAgICogYnVzaW5lc3MgbG9naWMuXHJcbiAgICovXHJcbiAgYXVkaXQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnQXVkaXRpbmcgYWN0aW9uLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gc2V0dXAgYW55IHZhbGlkYXRpb24gcnVsZXMgYmVmb3JlIHRoZSB2YWxpZGF0aW9uIGhhcHBlbnMuIFRoaXNcclxuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgYmVmb3JlIFtldmFsdWF0ZVJ1bGVzXS5cclxuICAgKi9cclxuICBwcmVWYWxpZGF0ZUFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdQcmUtdmFsaWRhdGluZyBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBpbXBsZW1lbnQgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgdmFsaWRhdGlvbiBhbmQgYnVzaW5lc3MgcnVsZXMuIFRoaXNcclxuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgYWZ0ZXIgW3ByZVZhbGlkYXRlQWN0aW9uXS5cclxuICAgKi9cclxuICBldmFsdWF0ZVJ1bGVzKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0V2YWx1YXRpbmcgYWN0aW9uIHJ1bGVzLicpO1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMudmFsaWRhdGVBY3Rpb24oKTtcclxuICAgIGlmIChjb250ZXh0LmlzVmFsaWQpIHtcclxuICAgICAgdGhpcy5hbGxvd0V4ZWN1dGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHQuc3RhdGUgPSBWYWxpZGF0aW9uQ29udGV4dFN0YXRlLlN1Y2Nlc3M7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFsbG93RXhlY3V0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHQuc3RhdGUgPSBWYWxpZGF0aW9uQ29udGV4dFN0YXRlLkZhaWx1cmU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIG9yIGhhbmRsZSB0aGUgcmVzdWx0cyBvZiB0aGUgcnVsZSBldmFsYXRpb24uIFRoaXNcclxuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgYWZ0ZXIgdGhlIFtldmFsdWF0ZVJ1bGVzXS5cclxuICAgKi9cclxuICBwb3N0VmFsaWRhdGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUG9zdC1WYWxpZGF0aW9uIG9mIGFjdGlvbi4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW55IHNldHVwIGJlZm9yZSB0aGUgYWN0aW9uIGlzIGV4ZWN1dGVkLlxyXG4gICAqL1xyXG4gIHByZUV4ZWN1dGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUHJlLWV4ZWN1dGlvbiBvZiBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jaXRvbiB0byBldmFsdWF0ZSB0aGUgYWN0aW9uIGFmdGVyIHRoZSB0aGUgYnVzaW5lc3MgbG9naWMgd2l0aGluXHJcbiAgICogdGhlIFtwZXJmb3JtQWN0aW9uXSBoYXMgZXhlY3V0ZWQuXHJcbiAgICovXHJcbiAgcG9zdEV4ZWN1dGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUG9zdC1leGVjdXRpb24gb2YgYWN0aW9uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJlcXVpcmVzIGltcGxlbWVudGF0aW9uIHRvIGRldGVybWluIHRoZSBzdGF0ZSBhbmQgcmVzdWx0IG9mIHRoZSBhY3Rpb24uXHJcbiAgICogVXNlIHRoaXMgb3Bwb3J0dW5pdHkgdG8gdmFsaWRhdGUgdGhlIHJlc3VsdHMuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTogQWN0aW9uUmVzdWx0IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignQ29uY3JldGUgYWN0aW9ucyByZXF1aXJlZCB0byBpbXBsZW1lbnQgdGhpcyBtZXRob2QuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFueSBjbGVhbnVwLCBsb2dnaW5nLCBvciBkaXNwb3Npbmcgb2YgcmVzb3VyY2VzIHVzZWRcclxuICAgKiBieSB0aGUgYWN0aW9uLiBUaGlzIGlzIHRoZSBsYXN0IGZ1bmN0aW9uIGNhbGxlZCBkdXJpbmcgdGhlIHBpcGVsaW5lLlxyXG4gICAqL1xyXG4gIGZpbmlzaCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdGaW5pc2ggYWN0aW9uLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gdG8gcGVyZm9ybSB2YWxpZGF0aW9uIG9mIGJ1c2luZXNzIHJ1bGVzIGFuZCBkYXRhLlxyXG4gICAqL1xyXG4gIHZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1ZhbGlkYXRpbmcgdGhlIGFjdGlvbi4nKTtcclxuICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Db250ZXh0O1xyXG4gIH1cclxufVxyXG4iXX0=