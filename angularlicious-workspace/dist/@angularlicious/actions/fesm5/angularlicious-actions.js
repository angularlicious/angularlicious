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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtYWN0aW9ucy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMvc3JjL2FjdGlvbnMubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvYWN0aW9ucy9zcmMvQWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0FuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUsIENvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGlvbnNNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5pbXBvcnQgeyBJQWN0aW9uIH0gZnJvbSAnLi9JQWN0aW9uJztcclxuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnLi9BY3Rpb25SZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGZyYW1ld29yayBBY3Rpb24gY2xhc3MgdGhhdCBwcm92aWRlcyB0aGUgcGlwZWxpbmUgb2YgcHJlL3Bvc3RcclxuICogZXhlY3V0aW9uIG1ldGhvZHMuIFRoaXMgY2xhc3MgaW1wbGVtZW50cyB0aGUgW1RlbXBsYXRlIE1ldGhvZF0gcGF0dGVybi5cclxuICpcclxuICogVGhlIHByZS1leGVjdXRlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XHJcbiAqXHRcdDEuIHN0YXJ0KCk7XHJcbiAqXHRcdDIuIGF1ZGl0KCk7XHJcbiAqXHRcdDMuIHByZVZhbGlkYXRlQWN0aW9uKCk7XHJcbiAqXHRcdDQuIGV2YWx1YXRlUnVsZXMoKTtcclxuICpcdFx0NS4gcG9zdFZhbGlkYXRlQWN0aW9uKCk7XHJcbiAqXHRcdDYuIHByZUV4ZWN1dGVBY3Rpb24oKTtcclxuICpcclxuICpJZiB0aGUgc3RhdHVzIG9mIGFjdGlvbiBpcyBnb29kLCB0aGUgYnVzaW5lc3MgbG9naWMgd2lsbCBiZSBleGVjdXRlZCB1c2luZyB0aGU6XHJcbiAqXHRcdDcuIHByb2Nlc3NBY3Rpb24oKTtcclxuICpcclxuICogVGhlIHBvc3QtZXhlY3V0aW9uIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XHJcbiAqXHRcdDguIHBvc3RFeGVjdXRlQWN0aW9uKCk7XHJcbiAqXHRcdDkuIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk7XHJcbiAqXHRcdDEwLiBmaW5pc2goKTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb24gaW1wbGVtZW50cyBJQWN0aW9uIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBhY3Rpb24gaXMgYWxsb3dlZCBleGVjdXRpb24uIElmIHRoZXJlIGFyZSBhbnkgcnVsZSBcclxuICAgKiB2aW9sYXRpb25zIGluIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQsIHRoZSBhY3Rpb24gaXMgbm90IGFsbG93ZWQgdG8gXHJcbiAgICogZXhlY3V0ZS4gXHJcbiAgICovXHJcbiAgYWxsb3dFeGVjdXRpb24gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdmFsaWRhdGlvbiBjb250ZXh0IGZvciB0aGUgc3BlY2lmaWVkIGFjdGlvbiBpbnN0YW5jZS5cclxuICAgKi9cclxuICBwcml2YXRlIF92YWxpZGF0aW9uQ29udGV4dDogVmFsaWRhdGlvbkNvbnRleHQgPSBuZXcgVmFsaWRhdGlvbkNvbnRleHQoKTtcclxuICBcclxuICAvKipcclxuICAgKiBUaGUgcmVzdWx0IG9mIHRoZSBhY3Rpb24uIFRoZSBkZWZhdWx0IHZhbHVlIGlzIFtVbmtub3duXSwgdW50aWwgdGhlIGFjdGlvblxyXG4gICAqIGlzIGV4ZWN1dGVkLlxyXG4gICAqL1xyXG4gIGFjdGlvblJlc3VsdDogQWN0aW9uUmVzdWx0ID0gQWN0aW9uUmVzdWx0LlVua25vd247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkZWZhdWx0IGNvbnN0cnVjdG9yIGZvciB0aGUgY2xhc3MuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmV0cmlldmUgdGhlIFtWYWxpZGF0aW9uQ29udGV4dF0gZm9yIHRoZSBzcGVjaWZpZWQgYWN0aW9uLlxyXG4gICAqL1xyXG4gIGdldCB2YWxpZGF0aW9uQ29udGV4dCgpOiBWYWxpZGF0aW9uQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGlvbkNvbnRleHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSBhIGNvbmNyZXRlIGFjdGlvbi4gQSBjb25jcmV0ZSBhY3Rpb24gbXVzdCBpbXBsZW1lbnRcclxuICAgKiB0aGUgW3Byb2Nlc3NBY3Rpb25dIGFuZCB0aGUgW3ZhbGlkYXRlQWN0aW9uUmVzdWx0XSBmdW5jdGlvbnMgdG8gYmUgYSB2YWxpZFxyXG4gICAqIGFjdGlvbi5cclxuICAgKi9cclxuICBleGVjdXRlKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1ByZXBhcmluZyB0byBleGVjdXRlIGFjdGlvbi4nKTtcclxuICAgIHRoaXMucHJvY2Vzc0FjdGlvblBpcGVsaW5lKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvY2VzcyB0aGUgYWN0aW9uIHBpcGVsaW5lIG1ldGhvZHMuIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJvY2Vzc0FjdGlvblBpcGVsaW5lKCkge1xyXG4gICAgdGhpcy5zdGFydEFjdGlvbigpO1xyXG4gICAgaWYgKHRoaXMuYWxsb3dFeGVjdXRpb24pIHtcclxuICAgICAgdGhpcy5wcm9jZXNzQWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpbmlzaEFjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGNhbGwgdGhlIHBpcGVsaW5lIG1ldGhvZHMgZm9yIHRoZSBbc3RhcnRdIG9yIGJlZ2lubmluZyBcclxuICAgKiBwcm9jZXNzIG9mIHRoZSBhY3Rpb24gcGlwZWxpbmUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGFydEFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBhY3Rpb24uJyk7XHJcbiAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgICB0aGlzLmF1ZGl0KCk7XHJcbiAgICB0aGlzLnByZVZhbGlkYXRlQWN0aW9uKCk7XHJcbiAgICB0aGlzLmV2YWx1YXRlUnVsZXMoKTtcclxuICAgIHRoaXMucG9zdFZhbGlkYXRlQWN0aW9uKCk7XHJcbiAgICB0aGlzLnByZUV4ZWN1dGVBY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBleGVjdXRlIHRoZSBtZXRob2RzIGF0IHRoZSBlbmQgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cclxuICAgKi9cclxuICBwcml2YXRlIGZpbmlzaEFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdGaW5pc2hpbmcgYWN0aW9uLicpO1xyXG4gICAgdGhpcy5wb3N0RXhlY3V0ZUFjdGlvbigpO1xyXG4gICAgdGhpcy52YWxpZGF0ZUFjdGlvblJlc3VsdCgpO1xyXG4gICAgdGhpcy5maW5pc2goKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBwcm9jZXNzIHRoZSBhY3Rpb24uIFRoaXMgd2lsbCBvbmx5IGJlIGNhbGxlZCBpZiB0aGUgYWN0aW9uJ3MgXHJcbiAgICogdmFsaWRhdGlvbiBjb250ZXh0IGlzIGluIGEgdmFsaWQgc3RhdGUgKG5vIHJ1bGUgdmlvbGF0aW9ucykuXHJcbiAgICogXHJcbiAgICogQWxsIGNvbmNyZXRlIGFjdGlvbnMgYXJlIHJlcXVpcmVkIHRvIHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlIFtwZXJmb3JtQWN0aW9uXSBcclxuICAgKiBtZXRob2QgdGhhdCBpcyBjYWxsZWQgZm9yIHRoaXMgcGFydCBvZiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJvY2Vzc0FjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdQcm9jZXNzaW5nIGFjdGlvbi4nKTtcclxuICAgIHRoaXMucGVyZm9ybUFjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWxsIGFjdGlvbiBtdXN0IGltcGxlbWVudCB0aGlzIGZ1bmN0aW9uLiBUaGlzIGlzIHdoZXJlIHlvdXJcclxuICAgKiBbYnVzaW5lc3MgbG9naWNdIHNob3VsZCBiZSBpbXBsZW1lbnRlZC4gVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaWZcclxuICAgKiB0aGVyZSBhcmUgbm8gdmFsaWRhdGlvbiBydWxlIGV4Y2VwdGlvbnMuXHJcbiAgICovXHJcbiAgcGVyZm9ybUFjdGlvbigpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgJ05vdCBpbXBsZW1lbnRlZC4gUmVxdWlyZXMgaW1wbGVtZW50YXRpb24gaW4gY29uY3JldGUgYWN0aW9uLidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPdmVycmlkZS9JbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFuIGVhcmx5IG9wZXJhdGlvbiBpbiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYmVsb25ncyB0byB0aGUgcHJlLWV4ZWN1dGUgZnVuY3Rpb25zIG9mIHRoZSBhY3Rpb24gcGlwZWxpbmUuXHJcbiAgICovXHJcbiAgc3RhcnQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnU3RhcnRpbmcgYWN0aW9uLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gdG8gcGVyZm9ybSBhbnkgYXVkaXRpbmcgZmVhdHVyZXMgZHVyaW5nIHRoZSBwcmUtZXhlY3R1aW9uIG9mIHRoZVxyXG4gICAqIGJ1c2luZXNzIGxvZ2ljLlxyXG4gICAqL1xyXG4gIGF1ZGl0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ0F1ZGl0aW5nIGFjdGlvbi4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIHNldHVwIGFueSB2YWxpZGF0aW9uIHJ1bGVzIGJlZm9yZSB0aGUgdmFsaWRhdGlvbiBoYXBwZW5zLiBUaGlzXHJcbiAgICogZnVuY3Rpb24gaXMgY2FsbGVkIGJlZm9yZSBbZXZhbHVhdGVSdWxlc10uXHJcbiAgICovXHJcbiAgcHJlVmFsaWRhdGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUHJlLXZhbGlkYXRpbmcgYWN0aW9uLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gaW1wbGVtZW50IHRoZSBleGVjdXRpb24gb2YgdGhlIHZhbGlkYXRpb24gYW5kIGJ1c2luZXNzIHJ1bGVzLiBUaGlzXHJcbiAgICogZnVuY3Rpb24gaXMgY2FsbGVkIGFmdGVyIFtwcmVWYWxpZGF0ZUFjdGlvbl0uXHJcbiAgICovXHJcbiAgZXZhbHVhdGVSdWxlcygpIHtcclxuICAgIGNvbnNvbGUubG9nKCdFdmFsdWF0aW5nIGFjdGlvbiBydWxlcy4nKTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLnZhbGlkYXRlQWN0aW9uKCk7XHJcbiAgICBpZiAoY29udGV4dC5pc1ZhbGlkKSB7XHJcbiAgICAgIHRoaXMuYWxsb3dFeGVjdXRpb24gPSB0cnVlO1xyXG4gICAgICB0aGlzLnZhbGlkYXRpb25Db250ZXh0LnN0YXRlID0gVmFsaWRhdGlvbkNvbnRleHRTdGF0ZS5TdWNjZXNzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hbGxvd0V4ZWN1dGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnZhbGlkYXRpb25Db250ZXh0LnN0YXRlID0gVmFsaWRhdGlvbkNvbnRleHRTdGF0ZS5GYWlsdXJlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBvciBoYW5kbGUgdGhlIHJlc3VsdHMgb2YgdGhlIHJ1bGUgZXZhbGF0aW9uLiBUaGlzXHJcbiAgICogZnVuY3Rpb24gaXMgY2FsbGVkIGFmdGVyIHRoZSBbZXZhbHVhdGVSdWxlc10uXHJcbiAgICovXHJcbiAgcG9zdFZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1Bvc3QtVmFsaWRhdGlvbiBvZiBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFueSBzZXR1cCBiZWZvcmUgdGhlIGFjdGlvbiBpcyBleGVjdXRlZC5cclxuICAgKi9cclxuICBwcmVFeGVjdXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1ByZS1leGVjdXRpb24gb2YgYWN0aW9uLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZnVuY2l0b24gdG8gZXZhbHVhdGUgdGhlIGFjdGlvbiBhZnRlciB0aGUgdGhlIGJ1c2luZXNzIGxvZ2ljIHdpdGhpblxyXG4gICAqIHRoZSBbcGVyZm9ybUFjdGlvbl0gaGFzIGV4ZWN1dGVkLlxyXG4gICAqL1xyXG4gIHBvc3RFeGVjdXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1Bvc3QtZXhlY3V0aW9uIG9mIGFjdGlvbicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXF1aXJlcyBpbXBsZW1lbnRhdGlvbiB0byBkZXRlcm1pbiB0aGUgc3RhdGUgYW5kIHJlc3VsdCBvZiB0aGUgYWN0aW9uLlxyXG4gICAqIFVzZSB0aGlzIG9wcG9ydHVuaXR5IHRvIHZhbGlkYXRlIHRoZSByZXN1bHRzLlxyXG4gICAqL1xyXG4gIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk6IEFjdGlvblJlc3VsdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmNyZXRlIGFjdGlvbnMgcmVxdWlyZWQgdG8gaW1wbGVtZW50IHRoaXMgbWV0aG9kLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gcGVyZm9ybSBhbnkgY2xlYW51cCwgbG9nZ2luZywgb3IgZGlzcG9zaW5nIG9mIHJlc291cmNlcyB1c2VkXHJcbiAgICogYnkgdGhlIGFjdGlvbi4gVGhpcyBpcyB0aGUgbGFzdCBmdW5jdGlvbiBjYWxsZWQgZHVyaW5nIHRoZSBwaXBlbGluZS5cclxuICAgKi9cclxuICBmaW5pc2goKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRmluaXNoIGFjdGlvbi4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gdmFsaWRhdGlvbiBvZiBidXNpbmVzcyBydWxlcyBhbmQgZGF0YS5cclxuICAgKi9cclxuICB2YWxpZGF0ZUFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdWYWxpZGF0aW5nIHRoZSBhY3Rpb24uJyk7XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uQ29udGV4dDtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Z0JBSUMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLCtCQUErQixFQUFFLFlBQVksQ0FBQztpQkFDekQ7O3dCQU5EOzs7Ozs7Ozs7Ozs7Ozs7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