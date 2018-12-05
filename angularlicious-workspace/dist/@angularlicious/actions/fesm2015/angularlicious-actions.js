import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularliciousRulesEngineModule, ValidationContext, ValidationContextState } from '@angularlicious/rules-engine';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ActionsModule {
}
ActionsModule.decorators = [
    { type: NgModule, args: [{
                imports: [AngularliciousRulesEngineModule, CommonModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const ActionResult = {
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
ActionResult[ActionResult.Success] = 'Success';
ActionResult[ActionResult.Fail] = 'Fail';
ActionResult[ActionResult.Unknown] = 'Unknown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
class Action {
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
     * @private
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
     * @private
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
     * @private
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
     * @private
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
        /** @type {?} */
        const context = this.validateAction();
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ActionsModule, Action, ActionResult };

//# sourceMappingURL=angularlicious-actions.js.map