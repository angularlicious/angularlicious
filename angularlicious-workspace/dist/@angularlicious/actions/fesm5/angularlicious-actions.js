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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtYWN0aW9ucy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMvbGliL2FjdGlvbnMubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvYWN0aW9ucy9saWIvQWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSwgQ29tbW9uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBY3Rpb25zTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xuaW1wb3J0IHsgSUFjdGlvbiB9IGZyb20gJy4vSUFjdGlvbic7XG5pbXBvcnQgeyBBY3Rpb25SZXN1bHQgfSBmcm9tICcuL0FjdGlvblJlc3VsdCc7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgZnJhbWV3b3JrIEFjdGlvbiBjbGFzcyB0aGF0IHByb3ZpZGVzIHRoZSBwaXBlbGluZSBvZiBwcmUvcG9zdFxuICogZXhlY3V0aW9uIG1ldGhvZHMuIFRoaXMgY2xhc3MgaW1wbGVtZW50cyB0aGUgW1RlbXBsYXRlIE1ldGhvZF0gcGF0dGVybi5cbiAqXG4gKiBUaGUgcHJlLWV4ZWN1dGUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcbiAqXHRcdDEuIHN0YXJ0KCk7XG4gKlx0XHQyLiBhdWRpdCgpO1xuICpcdFx0My4gcHJlVmFsaWRhdGVBY3Rpb24oKTtcbiAqXHRcdDQuIGV2YWx1YXRlUnVsZXMoKTtcbiAqXHRcdDUuIHBvc3RWYWxpZGF0ZUFjdGlvbigpO1xuICpcdFx0Ni4gcHJlRXhlY3V0ZUFjdGlvbigpO1xuICpcbiAqSWYgdGhlIHN0YXR1cyBvZiBhY3Rpb24gaXMgZ29vZCwgdGhlIGJ1c2luZXNzIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgdXNpbmcgdGhlOlxuICpcdFx0Ny4gcHJvY2Vzc0FjdGlvbigpO1xuICpcbiAqIFRoZSBwb3N0LWV4ZWN1dGlvbiBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgaW1wbGVtZW50ZWQgYXJlOlxuICpcdFx0OC4gcG9zdEV4ZWN1dGVBY3Rpb24oKTtcbiAqXHRcdDkuIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk7XG4gKlx0XHQxMC4gZmluaXNoKCk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBY3Rpb24gaW1wbGVtZW50cyBJQWN0aW9uIHtcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgYWN0aW9uIGlzIGFsbG93ZWQgZXhlY3V0aW9uLiBJZiB0aGVyZSBhcmUgYW55IHJ1bGVcbiAgICogdmlvbGF0aW9ucyBpbiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LCB0aGUgYWN0aW9uIGlzIG5vdCBhbGxvd2VkIHRvXG4gICAqIGV4ZWN1dGUuXG4gICAqL1xuICBhbGxvd0V4ZWN1dGlvbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSB2YWxpZGF0aW9uIGNvbnRleHQgZm9yIHRoZSBzcGVjaWZpZWQgYWN0aW9uIGluc3RhbmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbkNvbnRleHQ6IFZhbGlkYXRpb25Db250ZXh0ID0gbmV3IFZhbGlkYXRpb25Db250ZXh0KCk7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN1bHQgb2YgdGhlIGFjdGlvbi4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgW1Vua25vd25dLCB1bnRpbCB0aGUgYWN0aW9uXG4gICAqIGlzIGV4ZWN1dGVkLlxuICAgKi9cbiAgYWN0aW9uUmVzdWx0OiBBY3Rpb25SZXN1bHQgPSBBY3Rpb25SZXN1bHQuVW5rbm93bjtcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgY29uc3RydWN0b3IgZm9yIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogVXNlIHRvIHJldHJpZXZlIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdIGZvciB0aGUgc3BlY2lmaWVkIGFjdGlvbi5cbiAgICovXG4gIGdldCB2YWxpZGF0aW9uQ29udGV4dCgpOiBWYWxpZGF0aW9uQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRpb25Db250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBleGVjdXRlIGEgY29uY3JldGUgYWN0aW9uLiBBIGNvbmNyZXRlIGFjdGlvbiBtdXN0IGltcGxlbWVudFxuICAgKiB0aGUgW3Byb2Nlc3NBY3Rpb25dIGFuZCB0aGUgW3ZhbGlkYXRlQWN0aW9uUmVzdWx0XSBmdW5jdGlvbnMgdG8gYmUgYSB2YWxpZFxuICAgKiBhY3Rpb24uXG4gICAqL1xuICBleGVjdXRlKCkge1xuICAgIGNvbnNvbGUubG9nKCdQcmVwYXJpbmcgdG8gZXhlY3V0ZSBhY3Rpb24uJyk7XG4gICAgdGhpcy5wcm9jZXNzQWN0aW9uUGlwZWxpbmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvY2VzcyB0aGUgYWN0aW9uIHBpcGVsaW5lIG1ldGhvZHMuXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NBY3Rpb25QaXBlbGluZSgpIHtcbiAgICB0aGlzLnN0YXJ0QWN0aW9uKCk7XG4gICAgaWYgKHRoaXMuYWxsb3dFeGVjdXRpb24pIHtcbiAgICAgIHRoaXMucHJvY2Vzc0FjdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLmZpbmlzaEFjdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBjYWxsIHRoZSBwaXBlbGluZSBtZXRob2RzIGZvciB0aGUgW3N0YXJ0XSBvciBiZWdpbm5pbmdcbiAgICogcHJvY2VzcyBvZiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxuICAgKi9cbiAgcHJpdmF0ZSBzdGFydEFjdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnU3RhcnRpbmcgYWN0aW9uLicpO1xuICAgIHRoaXMuc3RhcnQoKTtcbiAgICB0aGlzLmF1ZGl0KCk7XG4gICAgdGhpcy5wcmVWYWxpZGF0ZUFjdGlvbigpO1xuICAgIHRoaXMuZXZhbHVhdGVSdWxlcygpO1xuICAgIHRoaXMucG9zdFZhbGlkYXRlQWN0aW9uKCk7XG4gICAgdGhpcy5wcmVFeGVjdXRlQWN0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgdGhlIG1ldGhvZHMgYXQgdGhlIGVuZCBvZiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxuICAgKi9cbiAgcHJpdmF0ZSBmaW5pc2hBY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ0ZpbmlzaGluZyBhY3Rpb24uJyk7XG4gICAgdGhpcy5wb3N0RXhlY3V0ZUFjdGlvbigpO1xuICAgIHRoaXMudmFsaWRhdGVBY3Rpb25SZXN1bHQoKTtcbiAgICB0aGlzLmZpbmlzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBwcm9jZXNzIHRoZSBhY3Rpb24uIFRoaXMgd2lsbCBvbmx5IGJlIGNhbGxlZCBpZiB0aGUgYWN0aW9uJ3NcbiAgICogdmFsaWRhdGlvbiBjb250ZXh0IGlzIGluIGEgdmFsaWQgc3RhdGUgKG5vIHJ1bGUgdmlvbGF0aW9ucykuXG4gICAqXG4gICAqIEFsbCBjb25jcmV0ZSBhY3Rpb25zIGFyZSByZXF1aXJlZCB0byBwcm92aWRlIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBbcGVyZm9ybUFjdGlvbl1cbiAgICogbWV0aG9kIHRoYXQgaXMgY2FsbGVkIGZvciB0aGlzIHBhcnQgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0FjdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnUHJvY2Vzc2luZyBhY3Rpb24uJyk7XG4gICAgdGhpcy5wZXJmb3JtQWN0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsIGFjdGlvbiBtdXN0IGltcGxlbWVudCB0aGlzIGZ1bmN0aW9uLiBUaGlzIGlzIHdoZXJlIHlvdXJcbiAgICogW2J1c2luZXNzIGxvZ2ljXSBzaG91bGQgYmUgaW1wbGVtZW50ZWQuIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGlmXG4gICAqIHRoZXJlIGFyZSBubyB2YWxpZGF0aW9uIHJ1bGUgZXhjZXB0aW9ucy5cbiAgICovXG4gIHBlcmZvcm1BY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ05vdCBpbXBsZW1lbnRlZC4gUmVxdWlyZXMgaW1wbGVtZW50YXRpb24gaW4gY29uY3JldGUgYWN0aW9uLidcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlL0ltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW4gZWFybHkgb3BlcmF0aW9uIGluIHRoZSBhY3Rpb24gcGlwZWxpbmUuXG4gICAqIFRoaXMgZnVuY3Rpb24gYmVsb25ncyB0byB0aGUgcHJlLWV4ZWN1dGUgZnVuY3Rpb25zIG9mIHRoZSBhY3Rpb24gcGlwZWxpbmUuXG4gICAqL1xuICBzdGFydCgpIHtcbiAgICBjb25zb2xlLmxvZygnU3RhcnRpbmcgYWN0aW9uLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW55IGF1ZGl0aW5nIGZlYXR1cmVzIGR1cmluZyB0aGUgcHJlLWV4ZWN0dWlvbiBvZiB0aGVcbiAgICogYnVzaW5lc3MgbG9naWMuXG4gICAqL1xuICBhdWRpdCgpIHtcbiAgICBjb25zb2xlLmxvZygnQXVkaXRpbmcgYWN0aW9uLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIHNldHVwIGFueSB2YWxpZGF0aW9uIHJ1bGVzIGJlZm9yZSB0aGUgdmFsaWRhdGlvbiBoYXBwZW5zLiBUaGlzXG4gICAqIGZ1bmN0aW9uIGlzIGNhbGxlZCBiZWZvcmUgW2V2YWx1YXRlUnVsZXNdLlxuICAgKi9cbiAgcHJlVmFsaWRhdGVBY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ1ByZS12YWxpZGF0aW5nIGFjdGlvbi4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBpbXBsZW1lbnQgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgdmFsaWRhdGlvbiBhbmQgYnVzaW5lc3MgcnVsZXMuIFRoaXNcbiAgICogZnVuY3Rpb24gaXMgY2FsbGVkIGFmdGVyIFtwcmVWYWxpZGF0ZUFjdGlvbl0uXG4gICAqL1xuICBldmFsdWF0ZVJ1bGVzKCkge1xuICAgIGNvbnNvbGUubG9nKCdFdmFsdWF0aW5nIGFjdGlvbiBydWxlcy4nKTtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy52YWxpZGF0ZUFjdGlvbigpO1xuICAgIGlmIChjb250ZXh0LmlzVmFsaWQpIHtcbiAgICAgIHRoaXMuYWxsb3dFeGVjdXRpb24gPSB0cnVlO1xuICAgICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dC5zdGF0ZSA9IFZhbGlkYXRpb25Db250ZXh0U3RhdGUuU3VjY2VzcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hbGxvd0V4ZWN1dGlvbiA9IGZhbHNlO1xuICAgICAgdGhpcy52YWxpZGF0aW9uQ29udGV4dC5zdGF0ZSA9IFZhbGlkYXRpb25Db250ZXh0U3RhdGUuRmFpbHVyZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGRldGVybWluZSBvciBoYW5kbGUgdGhlIHJlc3VsdHMgb2YgdGhlIHJ1bGUgZXZhbGF0aW9uLiBUaGlzXG4gICAqIGZ1bmN0aW9uIGlzIGNhbGxlZCBhZnRlciB0aGUgW2V2YWx1YXRlUnVsZXNdLlxuICAgKi9cbiAgcG9zdFZhbGlkYXRlQWN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdQb3N0LVZhbGlkYXRpb24gb2YgYWN0aW9uLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW55IHNldHVwIGJlZm9yZSB0aGUgYWN0aW9uIGlzIGV4ZWN1dGVkLlxuICAgKi9cbiAgcHJlRXhlY3V0ZUFjdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnUHJlLWV4ZWN1dGlvbiBvZiBhY3Rpb24uJyk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZnVuY2l0b24gdG8gZXZhbHVhdGUgdGhlIGFjdGlvbiBhZnRlciB0aGUgdGhlIGJ1c2luZXNzIGxvZ2ljIHdpdGhpblxuICAgKiB0aGUgW3BlcmZvcm1BY3Rpb25dIGhhcyBleGVjdXRlZC5cbiAgICovXG4gIHBvc3RFeGVjdXRlQWN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdQb3N0LWV4ZWN1dGlvbiBvZiBhY3Rpb24nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHJlcXVpcmVzIGltcGxlbWVudGF0aW9uIHRvIGRldGVybWluIHRoZSBzdGF0ZSBhbmQgcmVzdWx0IG9mIHRoZSBhY3Rpb24uXG4gICAqIFVzZSB0aGlzIG9wcG9ydHVuaXR5IHRvIHZhbGlkYXRlIHRoZSByZXN1bHRzLlxuICAgKi9cbiAgdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTogQWN0aW9uUmVzdWx0IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmNyZXRlIGFjdGlvbnMgcmVxdWlyZWQgdG8gaW1wbGVtZW50IHRoaXMgbWV0aG9kLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW55IGNsZWFudXAsIGxvZ2dpbmcsIG9yIGRpc3Bvc2luZyBvZiByZXNvdXJjZXMgdXNlZFxuICAgKiBieSB0aGUgYWN0aW9uLiBUaGlzIGlzIHRoZSBsYXN0IGZ1bmN0aW9uIGNhbGxlZCBkdXJpbmcgdGhlIHBpcGVsaW5lLlxuICAgKi9cbiAgZmluaXNoKCkge1xuICAgIGNvbnNvbGUubG9nKCdGaW5pc2ggYWN0aW9uLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gdmFsaWRhdGlvbiBvZiBidXNpbmVzcyBydWxlcyBhbmQgZGF0YS5cbiAgICovXG4gIHZhbGlkYXRlQWN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdWYWxpZGF0aW5nIHRoZSBhY3Rpb24uJyk7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkNvbnRleHQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O2dCQUlDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxZQUFZLENBQUM7aUJBQ3pEOzt3QkFORDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBc0JFOzs7Ozs7OEJBaEJpQixJQUFJOzs7O2tDQUsyQixJQUFJLGlCQUFpQixFQUFFOzs7Ozs0QkFNMUMsWUFBWSxDQUFDLE9BQU87S0FLakM7SUFLaEIsc0JBQUkscUNBQWlCOzs7Ozs7OztRQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQ2hDOzs7T0FBQTs7Ozs7Ozs7Ozs7O0lBT0Qsd0JBQU87Ozs7OztJQUFQO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUtPLHNDQUFxQjs7Ozs7UUFDM0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFF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