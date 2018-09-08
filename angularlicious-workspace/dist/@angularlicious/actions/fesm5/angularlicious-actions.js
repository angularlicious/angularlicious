import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularliciousRulesEngineModule, ValidationContext, ValidationContextState } from '@angularlicious/rules-engine';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ActionsModule = /** @class */ (function () {
    function ActionsModule() {
    }
    ActionsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [AngularliciousRulesEngineModule, CommonModule]
                },] },
    ];
    return ActionsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var ActionResult = {
    /**
       * Use to indicate that the action's result is success.
       */
    Success: 1,
    /**
       * Use to indicate that the action's result is failure.
       */
    Fail: 2,
    /**
       * Use to indicate that the action's result is unknown.
       */
    Unknown: 3,
};
ActionResult[ActionResult.Success] = "Success";
ActionResult[ActionResult.Fail] = "Fail";
ActionResult[ActionResult.Unknown] = "Unknown";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
var  /**
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
Action = /** @class */ (function () {
    /**
     * The default constructor for the class.
     */
    function Action() {
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
    Object.defineProperty(Action.prototype, "validationContext", {
        /**
         * Use to retrieve the [ValidationContext] for the specified action.
         */
        get: /**
         * Use to retrieve the [ValidationContext] for the specified action.
         * @return {?}
         */
        function () {
            return this._validationContext;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Use this method to execute a concrete action. A concrete action must implement
     * the [processAction] and the [validateActionResult] functions to be a valid
     * action.
     */
    /**
     * Use this method to execute a concrete action. A concrete action must implement
     * the [processAction] and the [validateActionResult] functions to be a valid
     * action.
     * @return {?}
     */
    Action.prototype.execute = /**
     * Use this method to execute a concrete action. A concrete action must implement
     * the [processAction] and the [validateActionResult] functions to be a valid
     * action.
     * @return {?}
     */
    function () {
        console.log('Preparing to execute action.');
        this.processActionPipeline();
    };
    /**
     * Use this method to process the action pipeline methods.
     * @return {?}
     */
    Action.prototype.processActionPipeline = /**
     * Use this method to process the action pipeline methods.
     * @return {?}
     */
    function () {
        this.startAction();
        if (this.allowExecution) {
            this.processAction();
        }
        this.finishAction();
    };
    /**
     * Use this method to call the pipeline methods for the [start] or beginning
     * process of the action pipeline.
     * @return {?}
     */
    Action.prototype.startAction = /**
     * Use this method to call the pipeline methods for the [start] or beginning
     * process of the action pipeline.
     * @return {?}
     */
    function () {
        console.log('Starting action.');
        this.start();
        this.audit();
        this.preValidateAction();
        this.evaluateRules();
        this.postValidateAction();
        this.preExecuteAction();
    };
    /**
     * Use this method to execute the methods at the end of the action pipeline.
     * @return {?}
     */
    Action.prototype.finishAction = /**
     * Use this method to execute the methods at the end of the action pipeline.
     * @return {?}
     */
    function () {
        console.log('Finishing action.');
        this.postExecuteAction();
        this.validateActionResult();
        this.finish();
    };
    /**
     * Use this method to process the action. This will only be called if the action's
     * validation context is in a valid state (no rule violations).
     *
     * All concrete actions are required to provide an implementation of the [performAction]
     * method that is called for this part of the action pipeline.
     * @return {?}
     */
    Action.prototype.processAction = /**
     * Use this method to process the action. This will only be called if the action's
     * validation context is in a valid state (no rule violations).
     *
     * All concrete actions are required to provide an implementation of the [performAction]
     * method that is called for this part of the action pipeline.
     * @return {?}
     */
    function () {
        console.log('Processing action.');
        this.performAction();
    };
    /**
     * All action must implement this function. This is where your
     * [business logic] should be implemented. This function is called if
     * there are no validation rule exceptions.
     */
    /**
     * All action must implement this function. This is where your
     * [business logic] should be implemented. This function is called if
     * there are no validation rule exceptions.
     * @return {?}
     */
    Action.prototype.performAction = /**
     * All action must implement this function. This is where your
     * [business logic] should be implemented. This function is called if
     * there are no validation rule exceptions.
     * @return {?}
     */
    function () {
        throw new Error('Not implemented. Requires implementation in concrete action.');
    };
    /**
     * Override/Implement this function to perform an early operation in the action pipeline.
     * This function belongs to the pre-execute functions of the action pipeline.
     */
    /**
     * Override/Implement this function to perform an early operation in the action pipeline.
     * This function belongs to the pre-execute functions of the action pipeline.
     * @return {?}
     */
    Action.prototype.start = /**
     * Override/Implement this function to perform an early operation in the action pipeline.
     * This function belongs to the pre-execute functions of the action pipeline.
     * @return {?}
     */
    function () {
        console.log('Starting action.');
    };
    /**
     * Implement this function to perform any auditing features during the pre-exectuion of the
     * business logic.
     */
    /**
     * Implement this function to perform any auditing features during the pre-exectuion of the
     * business logic.
     * @return {?}
     */
    Action.prototype.audit = /**
     * Implement this function to perform any auditing features during the pre-exectuion of the
     * business logic.
     * @return {?}
     */
    function () {
        console.log('Auditing action.');
    };
    /**
     * Use this function to setup any validation rules before the validation happens. This
     * function is called before [evaluateRules].
     */
    /**
     * Use this function to setup any validation rules before the validation happens. This
     * function is called before [evaluateRules].
     * @return {?}
     */
    Action.prototype.preValidateAction = /**
     * Use this function to setup any validation rules before the validation happens. This
     * function is called before [evaluateRules].
     * @return {?}
     */
    function () {
        console.log('Pre-validating action.');
    };
    /**
     * Use this function to implement the execution of the validation and business rules. This
     * function is called after [preValidateAction].
     */
    /**
     * Use this function to implement the execution of the validation and business rules. This
     * function is called after [preValidateAction].
     * @return {?}
     */
    Action.prototype.evaluateRules = /**
     * Use this function to implement the execution of the validation and business rules. This
     * function is called after [preValidateAction].
     * @return {?}
     */
    function () {
        console.log('Evaluating action rules.');
        var /** @type {?} */ context = this.validateAction();
        if (context.isValid) {
            this.allowExecution = true;
            this.validationContext.state = ValidationContextState.Success;
        }
        else {
            this.allowExecution = false;
            this.validationContext.state = ValidationContextState.Failure;
        }
    };
    /**
     * Use to determine or handle the results of the rule evalation. This
     * function is called after the [evaluateRules].
     */
    /**
     * Use to determine or handle the results of the rule evalation. This
     * function is called after the [evaluateRules].
     * @return {?}
     */
    Action.prototype.postValidateAction = /**
     * Use to determine or handle the results of the rule evalation. This
     * function is called after the [evaluateRules].
     * @return {?}
     */
    function () {
        console.log('Post-Validation of action.');
    };
    /**
     * Use this function to perform any setup before the action is executed.
     */
    /**
     * Use this function to perform any setup before the action is executed.
     * @return {?}
     */
    Action.prototype.preExecuteAction = /**
     * Use this function to perform any setup before the action is executed.
     * @return {?}
     */
    function () {
        console.log('Pre-execution of action.');
    };
    /**
     * Use this funciton to evaluate the action after the the business logic within
     * the [performAction] has executed.
     */
    /**
     * Use this funciton to evaluate the action after the the business logic within
     * the [performAction] has executed.
     * @return {?}
     */
    Action.prototype.postExecuteAction = /**
     * Use this funciton to evaluate the action after the the business logic within
     * the [performAction] has executed.
     * @return {?}
     */
    function () {
        console.log('Post-execution of action');
    };
    /**
     * This function requires implementation to determin the state and result of the action.
     * Use this opportunity to validate the results.
     */
    /**
     * This function requires implementation to determin the state and result of the action.
     * Use this opportunity to validate the results.
     * @return {?}
     */
    Action.prototype.validateActionResult = /**
     * This function requires implementation to determin the state and result of the action.
     * Use this opportunity to validate the results.
     * @return {?}
     */
    function () {
        throw new Error('Concrete actions required to implement this method.');
    };
    /**
     * Use this function to perform any cleanup, logging, or disposing of resources used
     * by the action. This is the last function called during the pipeline.
     */
    /**
     * Use this function to perform any cleanup, logging, or disposing of resources used
     * by the action. This is the last function called during the pipeline.
     * @return {?}
     */
    Action.prototype.finish = /**
     * Use this function to perform any cleanup, logging, or disposing of resources used
     * by the action. This is the last function called during the pipeline.
     * @return {?}
     */
    function () {
        console.log('Finish action.');
    };
    /**
     * Implement this function to perform validation of business rules and data.
     */
    /**
     * Implement this function to perform validation of business rules and data.
     * @return {?}
     */
    Action.prototype.validateAction = /**
     * Implement this function to perform validation of business rules and data.
     * @return {?}
     */
    function () {
        console.log('Validating the action.');
        return this.validationContext;
    };
    return Action;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { ActionsModule, Action, ActionResult };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtYWN0aW9ucy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMvbGliL2FjdGlvbnMubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvYWN0aW9ucy9saWIvQWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0FuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUsIENvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGlvbnNNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBJQWN0aW9uIH0gZnJvbSAnLi9JQWN0aW9uJztcclxuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnLi9BY3Rpb25SZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGZyYW1ld29yayBBY3Rpb24gY2xhc3MgdGhhdCBwcm92aWRlcyB0aGUgcGlwZWxpbmUgb2YgcHJlL3Bvc3RcclxuICogZXhlY3V0aW9uIG1ldGhvZHMuIFRoaXMgY2xhc3MgaW1wbGVtZW50cyB0aGUgW1RlbXBsYXRlIE1ldGhvZF0gcGF0dGVybi5cclxuICpcclxuICogVGhlIHByZS1leGVjdXRlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XHJcbiAqXHRcdDEuIHN0YXJ0KCk7XHJcbiAqXHRcdDIuIGF1ZGl0KCk7XHJcbiAqXHRcdDMuIHByZVZhbGlkYXRlQWN0aW9uKCk7XHJcbiAqXHRcdDQuIGV2YWx1YXRlUnVsZXMoKTtcclxuICpcdFx0NS4gcG9zdFZhbGlkYXRlQWN0aW9uKCk7XHJcbiAqXHRcdDYuIHByZUV4ZWN1dGVBY3Rpb24oKTtcclxuICpcclxuICpJZiB0aGUgc3RhdHVzIG9mIGFjdGlvbiBpcyBnb29kLCB0aGUgYnVzaW5lc3MgbG9naWMgd2lsbCBiZSBleGVjdXRlZCB1c2luZyB0aGU6XHJcbiAqXHRcdDcuIHByb2Nlc3NBY3Rpb24oKTtcclxuICpcclxuICogVGhlIHBvc3QtZXhlY3V0aW9uIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XHJcbiAqXHRcdDguIHBvc3RFeGVjdXRlQWN0aW9uKCk7XHJcbiAqXHRcdDkuIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk7XHJcbiAqXHRcdDEwLiBmaW5pc2goKTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb24gaW1wbGVtZW50cyBJQWN0aW9uIHtcclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGFjdGlvbiBpcyBhbGxvd2VkIGV4ZWN1dGlvbi4gSWYgdGhlcmUgYXJlIGFueSBydWxlXHJcbiAgICogdmlvbGF0aW9ucyBpbiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LCB0aGUgYWN0aW9uIGlzIG5vdCBhbGxvd2VkIHRvXHJcbiAgICogZXhlY3V0ZS5cclxuICAgKi9cclxuICBhbGxvd0V4ZWN1dGlvbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB2YWxpZGF0aW9uIGNvbnRleHQgZm9yIHRoZSBzcGVjaWZpZWQgYWN0aW9uIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db250ZXh0OiBWYWxpZGF0aW9uQ29udGV4dCA9IG5ldyBWYWxpZGF0aW9uQ29udGV4dCgpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcmVzdWx0IG9mIHRoZSBhY3Rpb24uIFRoZSBkZWZhdWx0IHZhbHVlIGlzIFtVbmtub3duXSwgdW50aWwgdGhlIGFjdGlvblxyXG4gICAqIGlzIGV4ZWN1dGVkLlxyXG4gICAqL1xyXG4gIGFjdGlvblJlc3VsdDogQWN0aW9uUmVzdWx0ID0gQWN0aW9uUmVzdWx0LlVua25vd247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkZWZhdWx0IGNvbnN0cnVjdG9yIGZvciB0aGUgY2xhc3MuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmV0cmlldmUgdGhlIFtWYWxpZGF0aW9uQ29udGV4dF0gZm9yIHRoZSBzcGVjaWZpZWQgYWN0aW9uLlxyXG4gICAqL1xyXG4gIGdldCB2YWxpZGF0aW9uQ29udGV4dCgpOiBWYWxpZGF0aW9uQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGlvbkNvbnRleHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSBhIGNvbmNyZXRlIGFjdGlvbi4gQSBjb25jcmV0ZSBhY3Rpb24gbXVzdCBpbXBsZW1lbnRcclxuICAgKiB0aGUgW3Byb2Nlc3NBY3Rpb25dIGFuZCB0aGUgW3ZhbGlkYXRlQWN0aW9uUmVzdWx0XSBmdW5jdGlvbnMgdG8gYmUgYSB2YWxpZFxyXG4gICAqIGFjdGlvbi5cclxuICAgKi9cclxuICBleGVjdXRlKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1ByZXBhcmluZyB0byBleGVjdXRlIGFjdGlvbi4nKTtcclxuICAgIHRoaXMucHJvY2Vzc0FjdGlvblBpcGVsaW5lKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvY2VzcyB0aGUgYWN0aW9uIHBpcGVsaW5lIG1ldGhvZHMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwcm9jZXNzQWN0aW9uUGlwZWxpbmUoKSB7XHJcbiAgICB0aGlzLnN0YXJ0QWN0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5hbGxvd0V4ZWN1dGlvbikge1xyXG4gICAgICB0aGlzLnByb2Nlc3NBY3Rpb24oKTtcclxuICAgIH1cclxuICAgIHRoaXMuZmluaXNoQWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gY2FsbCB0aGUgcGlwZWxpbmUgbWV0aG9kcyBmb3IgdGhlIFtzdGFydF0gb3IgYmVnaW5uaW5nXHJcbiAgICogcHJvY2VzcyBvZiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhcnRBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnU3RhcnRpbmcgYWN0aW9uLicpO1xyXG4gICAgdGhpcy5zdGFydCgpO1xyXG4gICAgdGhpcy5hdWRpdCgpO1xyXG4gICAgdGhpcy5wcmVWYWxpZGF0ZUFjdGlvbigpO1xyXG4gICAgdGhpcy5ldmFsdWF0ZVJ1bGVzKCk7XHJcbiAgICB0aGlzLnBvc3RWYWxpZGF0ZUFjdGlvbigpO1xyXG4gICAgdGhpcy5wcmVFeGVjdXRlQWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSB0aGUgbWV0aG9kcyBhdCB0aGUgZW5kIG9mIHRoZSBhY3Rpb24gcGlwZWxpbmUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmaW5pc2hBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRmluaXNoaW5nIGFjdGlvbi4nKTtcclxuICAgIHRoaXMucG9zdEV4ZWN1dGVBY3Rpb24oKTtcclxuICAgIHRoaXMudmFsaWRhdGVBY3Rpb25SZXN1bHQoKTtcclxuICAgIHRoaXMuZmluaXNoKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvY2VzcyB0aGUgYWN0aW9uLiBUaGlzIHdpbGwgb25seSBiZSBjYWxsZWQgaWYgdGhlIGFjdGlvbidzXHJcbiAgICogdmFsaWRhdGlvbiBjb250ZXh0IGlzIGluIGEgdmFsaWQgc3RhdGUgKG5vIHJ1bGUgdmlvbGF0aW9ucykuXHJcbiAgICpcclxuICAgKiBBbGwgY29uY3JldGUgYWN0aW9ucyBhcmUgcmVxdWlyZWQgdG8gcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgW3BlcmZvcm1BY3Rpb25dXHJcbiAgICogbWV0aG9kIHRoYXQgaXMgY2FsbGVkIGZvciB0aGlzIHBhcnQgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cclxuICAgKi9cclxuICBwcml2YXRlIHByb2Nlc3NBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUHJvY2Vzc2luZyBhY3Rpb24uJyk7XHJcbiAgICB0aGlzLnBlcmZvcm1BY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFsbCBhY3Rpb24gbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbi4gVGhpcyBpcyB3aGVyZSB5b3VyXHJcbiAgICogW2J1c2luZXNzIGxvZ2ljXSBzaG91bGQgYmUgaW1wbGVtZW50ZWQuIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGlmXHJcbiAgICogdGhlcmUgYXJlIG5vIHZhbGlkYXRpb24gcnVsZSBleGNlcHRpb25zLlxyXG4gICAqL1xyXG4gIHBlcmZvcm1BY3Rpb24oKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICdOb3QgaW1wbGVtZW50ZWQuIFJlcXVpcmVzIGltcGxlbWVudGF0aW9uIGluIGNvbmNyZXRlIGFjdGlvbi4nXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3ZlcnJpZGUvSW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gdG8gcGVyZm9ybSBhbiBlYXJseSBvcGVyYXRpb24gaW4gdGhlIGFjdGlvbiBwaXBlbGluZS5cclxuICAgKiBUaGlzIGZ1bmN0aW9uIGJlbG9uZ3MgdG8gdGhlIHByZS1leGVjdXRlIGZ1bmN0aW9ucyBvZiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxyXG4gICAqL1xyXG4gIHN0YXJ0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIGFjdGlvbi4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW55IGF1ZGl0aW5nIGZlYXR1cmVzIGR1cmluZyB0aGUgcHJlLWV4ZWN0dWlvbiBvZiB0aGVcclxuICAgKiBidXNpbmVzcyBsb2dpYy5cclxuICAgKi9cclxuICBhdWRpdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdBdWRpdGluZyBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBzZXR1cCBhbnkgdmFsaWRhdGlvbiBydWxlcyBiZWZvcmUgdGhlIHZhbGlkYXRpb24gaGFwcGVucy4gVGhpc1xyXG4gICAqIGZ1bmN0aW9uIGlzIGNhbGxlZCBiZWZvcmUgW2V2YWx1YXRlUnVsZXNdLlxyXG4gICAqL1xyXG4gIHByZVZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1ByZS12YWxpZGF0aW5nIGFjdGlvbi4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIGltcGxlbWVudCB0aGUgZXhlY3V0aW9uIG9mIHRoZSB2YWxpZGF0aW9uIGFuZCBidXNpbmVzcyBydWxlcy4gVGhpc1xyXG4gICAqIGZ1bmN0aW9uIGlzIGNhbGxlZCBhZnRlciBbcHJlVmFsaWRhdGVBY3Rpb25dLlxyXG4gICAqL1xyXG4gIGV2YWx1YXRlUnVsZXMoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRXZhbHVhdGluZyBhY3Rpb24gcnVsZXMuJyk7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy52YWxpZGF0ZUFjdGlvbigpO1xyXG4gICAgaWYgKGNvbnRleHQuaXNWYWxpZCkge1xyXG4gICAgICB0aGlzLmFsbG93RXhlY3V0aW9uID0gdHJ1ZTtcclxuICAgICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dC5zdGF0ZSA9IFZhbGlkYXRpb25Db250ZXh0U3RhdGUuU3VjY2VzcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWxsb3dFeGVjdXRpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dC5zdGF0ZSA9IFZhbGlkYXRpb25Db250ZXh0U3RhdGUuRmFpbHVyZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgb3IgaGFuZGxlIHRoZSByZXN1bHRzIG9mIHRoZSBydWxlIGV2YWxhdGlvbi4gVGhpc1xyXG4gICAqIGZ1bmN0aW9uIGlzIGNhbGxlZCBhZnRlciB0aGUgW2V2YWx1YXRlUnVsZXNdLlxyXG4gICAqL1xyXG4gIHBvc3RWYWxpZGF0ZUFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdQb3N0LVZhbGlkYXRpb24gb2YgYWN0aW9uLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gcGVyZm9ybSBhbnkgc2V0dXAgYmVmb3JlIHRoZSBhY3Rpb24gaXMgZXhlY3V0ZWQuXHJcbiAgICovXHJcbiAgcHJlRXhlY3V0ZUFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdQcmUtZXhlY3V0aW9uIG9mIGFjdGlvbi4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGZ1bmNpdG9uIHRvIGV2YWx1YXRlIHRoZSBhY3Rpb24gYWZ0ZXIgdGhlIHRoZSBidXNpbmVzcyBsb2dpYyB3aXRoaW5cclxuICAgKiB0aGUgW3BlcmZvcm1BY3Rpb25dIGhhcyBleGVjdXRlZC5cclxuICAgKi9cclxuICBwb3N0RXhlY3V0ZUFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdQb3N0LWV4ZWN1dGlvbiBvZiBhY3Rpb24nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmVxdWlyZXMgaW1wbGVtZW50YXRpb24gdG8gZGV0ZXJtaW4gdGhlIHN0YXRlIGFuZCByZXN1bHQgb2YgdGhlIGFjdGlvbi5cclxuICAgKiBVc2UgdGhpcyBvcHBvcnR1bml0eSB0byB2YWxpZGF0ZSB0aGUgcmVzdWx0cy5cclxuICAgKi9cclxuICB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpOiBBY3Rpb25SZXN1bHQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb25jcmV0ZSBhY3Rpb25zIHJlcXVpcmVkIHRvIGltcGxlbWVudCB0aGlzIG1ldGhvZC4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW55IGNsZWFudXAsIGxvZ2dpbmcsIG9yIGRpc3Bvc2luZyBvZiByZXNvdXJjZXMgdXNlZFxyXG4gICAqIGJ5IHRoZSBhY3Rpb24uIFRoaXMgaXMgdGhlIGxhc3QgZnVuY3Rpb24gY2FsbGVkIGR1cmluZyB0aGUgcGlwZWxpbmUuXHJcbiAgICovXHJcbiAgZmluaXNoKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0ZpbmlzaCBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIHZhbGlkYXRpb24gb2YgYnVzaW5lc3MgcnVsZXMgYW5kIGRhdGEuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnVmFsaWRhdGluZyB0aGUgYWN0aW9uLicpO1xyXG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkNvbnRleHQ7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O2dCQUlDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxZQUFZLENBQUM7aUJBQ3pEOzt3QkFORDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBc0JFOzs7Ozs7OEJBaEJpQixJQUFJOzs7O2tDQUsyQixJQUFJLGlCQUFpQixFQUFFOzs7Ozs0QkFNMUMsWUFBWSxDQUFDLE9BQU87S0FLakM7SUFLaEIsc0JBQUkscUNBQWlCOzs7Ozs7OztRQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQ2hDOzs7T0FBQTs7Ozs7Ozs7Ozs7O0lBT0Qsd0JBQU87Ozs7OztJQUFQO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUtPLHNDQUFxQjs7Ozs7UUFDM0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7Ozs7SUFPZCw0QkFBVzs7Ozs7O1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7OztJQU1sQiw2QkFBWTs7Ozs7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7OztJQVVSLDhCQUFhOzs7Ozs7Ozs7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztJQVF2Qiw4QkFBYTs7Ozs7O0lBQWI7UUFDRSxNQUFNLElBQUksS0FBSyxDQUNiLDhEQUE4RCxDQUMvRCxDQUFDO0tBQ0g7Ozs7Ozs7Ozs7SUFNRCxzQkFBSzs7Ozs7SUFBTDtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNqQzs7Ozs7Ozs7OztJQU1ELHNCQUFLOzs7OztJQUFMO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0tBQ2pDOzs7Ozs7Ozs7O0lBTUQsa0NBQWlCOzs7OztJQUFqQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztLQUN2Qzs7Ozs7Ozs7OztJQU1ELDhCQUFhOzs7OztJQUFiO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3hDLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUMsT0FBTyxDQUFDO1NBQy9EO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDLE9BQU8sQ0FBQztTQUMvRDtLQUNGOzs7Ozs7Ozs7O0lBTUQsbUNBQWtCOzs7OztJQUFsQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUMzQzs7Ozs7Ozs7SUFLRCxpQ0FBZ0I7Ozs7SUFBaEI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDekM7Ozs7Ozs7Ozs7SUFNRCxrQ0FBaUI7Ozs7O0lBQWpCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQ3pDOzs7Ozs7Ozs7O0lBTUQscUNBQW9COzs7OztJQUFwQjtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztLQUN4RTs7Ozs7Ozs7OztJQU1ELHVCQUFNOzs7OztJQUFOO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQy9COzs7Ozs7OztJQUtELCtCQUFjOzs7O0lBQWQ7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7S0FDL0I7aUJBak5IO0lBa05DOzs7Ozs7Ozs7Ozs7OzsifQ==