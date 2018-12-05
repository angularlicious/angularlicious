(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angularlicious/rules-engine')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/actions', ['exports', '@angular/core', '@angular/common', '@angularlicious/rules-engine'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.actions = {}),global.ng.core,global.ng.common,global.rulesEngine));
}(this, (function (exports,core,common,rulesEngine) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ActionsModule = /** @class */ (function () {
        function ActionsModule() {
        }
        ActionsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [rulesEngine.AngularliciousRulesEngineModule, common.CommonModule]
                    },] }
        ];
        return ActionsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    var /**
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
     */ Action = /** @class */ (function () {
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
            this._validationContext = new rulesEngine.ValidationContext();
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
             */ function () {
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
         */
        /**
         * Use this method to process the action pipeline methods.
         * @private
         * @return {?}
         */
        Action.prototype.processActionPipeline = /**
         * Use this method to process the action pipeline methods.
         * @private
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
         */
        /**
         * Use this method to call the pipeline methods for the [start] or beginning
         * process of the action pipeline.
         * @private
         * @return {?}
         */
        Action.prototype.startAction = /**
         * Use this method to call the pipeline methods for the [start] or beginning
         * process of the action pipeline.
         * @private
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
         */
        /**
         * Use this method to execute the methods at the end of the action pipeline.
         * @private
         * @return {?}
         */
        Action.prototype.finishAction = /**
         * Use this method to execute the methods at the end of the action pipeline.
         * @private
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
         */
        /**
         * Use this method to process the action. This will only be called if the action's
         * validation context is in a valid state (no rule violations).
         *
         * All concrete actions are required to provide an implementation of the [performAction]
         * method that is called for this part of the action pipeline.
         * @private
         * @return {?}
         */
        Action.prototype.processAction = /**
         * Use this method to process the action. This will only be called if the action's
         * validation context is in a valid state (no rule violations).
         *
         * All concrete actions are required to provide an implementation of the [performAction]
         * method that is called for this part of the action pipeline.
         * @private
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
                /** @type {?} */
                var context = this.validateAction();
                if (context.isValid) {
                    this.allowExecution = true;
                    this.validationContext.state = rulesEngine.ValidationContextState.Success;
                }
                else {
                    this.allowExecution = false;
                    this.validationContext.state = rulesEngine.ValidationContextState.Failure;
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.ActionsModule = ActionsModule;
    exports.Action = Action;
    exports.ActionResult = ActionResult;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=angularlicious-actions.umd.js.map