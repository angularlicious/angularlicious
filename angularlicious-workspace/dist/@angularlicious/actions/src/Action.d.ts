import { ValidationContext } from '@angularlicious/rules-engine';
import { IAction } from './IAction';
import { ActionResult } from './ActionResult';
/**
 * This is the framework Action class that provides the pipeline of pre/post
 * execution methods. This class implements the [Template Method] pattern.
 *
 * The pre-execute functions that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		7. processAction();
 *
 * The post-execution functions that can be implemented are:
 *		8. postExecuteAction();
 *		9. validateActionResult();
 *		10. finish();
 */
export declare class Action implements IAction {
    /**
     * Indicates if the action is allowed execution. If there are any rule
     * violations in the validation context, the action is not allowed to
     * execute.
     */
    allowExecution: boolean;
    /**
     * The validation context for the specified action instance.
     */
    private _validationContext;
    /**
     * The result of the action. The default value is [Unknown], until the action
     * is executed.
     */
    actionResult: ActionResult;
    /**
     * The default constructor for the class.
     */
    constructor();
    /**
     * Use to retrieve the [ValidationContext] for the specified action.
     */
    readonly validationContext: ValidationContext;
    /**
     * Use this method to execute a concrete action. A concrete action must implement
     * the [processAction] and the [validateActionResult] functions to be a valid
     * action.
     */
    execute(): void;
    /**
     * Use this method to process the action pipeline methods.
     */
    private processActionPipeline();
    /**
     * Use this method to call the pipeline methods for the [start] or beginning
     * process of the action pipeline.
     */
    private startAction();
    /**
     * Use this method to execute the methods at the end of the action pipeline.
     */
    private finishAction();
    /**
     * Use this method to process the action. This will only be called if the action's
     * validation context is in a valid state (no rule violations).
     *
     * All concrete actions are required to provide an implementation of the [performAction]
     * method that is called for this part of the action pipeline.
     */
    private processAction();
    /**
     * All action must implement this function. This is where your
     * [business logic] should be implemented. This function is called if
     * there are no validation rule exceptions.
     */
    performAction(): void;
    /**
     * Override/Implement this function to perform an early operation in the action pipeline.
     * This function belongs to the pre-execute functions of the action pipeline.
     */
    start(): void;
    /**
     * Implement this function to perform any auditing features during the pre-exectuion of the
     * business logic.
     */
    audit(): void;
    /**
     * Use this function to setup any validation rules before the validation happens. This
     * function is called before [evaluateRules].
     */
    preValidateAction(): void;
    /**
     * Use this function to implement the execution of the validation and business rules. This
     * function is called after [preValidateAction].
     */
    evaluateRules(): void;
    /**
     * Use to determine or handle the results of the rule evalation. This
     * function is called after the [evaluateRules].
     */
    postValidateAction(): void;
    /**
     * Use this function to perform any setup before the action is executed.
     */
    preExecuteAction(): void;
    /**
     * Use this funciton to evaluate the action after the the business logic within
     * the [performAction] has executed.
     */
    postExecuteAction(): void;
    /**
     * This function requires implementation to determin the state and result of the action.
     * Use this opportunity to validate the results.
     */
    validateActionResult(): ActionResult;
    /**
     * Use this function to perform any cleanup, logging, or disposing of resources used
     * by the action. This is the last function called during the pipeline.
     */
    finish(): void;
    /**
     * Implement this function to perform validation of business rules and data.
     */
    validateAction(): ValidationContext;
}
