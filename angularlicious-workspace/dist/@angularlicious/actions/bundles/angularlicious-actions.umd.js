(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angularlicious/rules-engine')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/actions', ['exports', '@angular/core', '@angular/common', '@angularlicious/rules-engine'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.actions = {}),global.ng.core,global.ng.common,null));
}(this, (function (exports,core,common,rulesEngine) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ActionsModule = (function () {
        function ActionsModule() {
        }
        ActionsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [rulesEngine.AngularliciousRulesEngineModule, common.CommonModule]
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
     */ Action = (function () {
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
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.ActionsModule = ActionsModule;
    exports.Action = Action;
    exports.ActionResult = ActionResult;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtYWN0aW9ucy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9hY3Rpb25zL2xpYi9hY3Rpb25zLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMvbGliL0FjdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlLCBDb21tb25Nb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25zTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0U3RhdGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgSUFjdGlvbiB9IGZyb20gJy4vSUFjdGlvbic7XHJcbmltcG9ydCB7IEFjdGlvblJlc3VsdCB9IGZyb20gJy4vQWN0aW9uUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBmcmFtZXdvcmsgQWN0aW9uIGNsYXNzIHRoYXQgcHJvdmlkZXMgdGhlIHBpcGVsaW5lIG9mIHByZS9wb3N0XHJcbiAqIGV4ZWN1dGlvbiBtZXRob2RzLiBUaGlzIGNsYXNzIGltcGxlbWVudHMgdGhlIFtUZW1wbGF0ZSBNZXRob2RdIHBhdHRlcm4uXHJcbiAqXHJcbiAqIFRoZSBwcmUtZXhlY3V0ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgaW1wbGVtZW50ZWQgYXJlOlxyXG4gKlx0XHQxLiBzdGFydCgpO1xyXG4gKlx0XHQyLiBhdWRpdCgpO1xyXG4gKlx0XHQzLiBwcmVWYWxpZGF0ZUFjdGlvbigpO1xyXG4gKlx0XHQ0LiBldmFsdWF0ZVJ1bGVzKCk7XHJcbiAqXHRcdDUuIHBvc3RWYWxpZGF0ZUFjdGlvbigpO1xyXG4gKlx0XHQ2LiBwcmVFeGVjdXRlQWN0aW9uKCk7XHJcbiAqXHJcbiAqSWYgdGhlIHN0YXR1cyBvZiBhY3Rpb24gaXMgZ29vZCwgdGhlIGJ1c2luZXNzIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgdXNpbmcgdGhlOlxyXG4gKlx0XHQ3LiBwcm9jZXNzQWN0aW9uKCk7XHJcbiAqXHJcbiAqIFRoZSBwb3N0LWV4ZWN1dGlvbiBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgaW1wbGVtZW50ZWQgYXJlOlxyXG4gKlx0XHQ4LiBwb3N0RXhlY3V0ZUFjdGlvbigpO1xyXG4gKlx0XHQ5LiB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpO1xyXG4gKlx0XHQxMC4gZmluaXNoKCk7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0aW9uIGltcGxlbWVudHMgSUFjdGlvbiB7XHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBhY3Rpb24gaXMgYWxsb3dlZCBleGVjdXRpb24uIElmIHRoZXJlIGFyZSBhbnkgcnVsZVxyXG4gICAqIHZpb2xhdGlvbnMgaW4gdGhlIHZhbGlkYXRpb24gY29udGV4dCwgdGhlIGFjdGlvbiBpcyBub3QgYWxsb3dlZCB0b1xyXG4gICAqIGV4ZWN1dGUuXHJcbiAgICovXHJcbiAgYWxsb3dFeGVjdXRpb24gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdmFsaWRhdGlvbiBjb250ZXh0IGZvciB0aGUgc3BlY2lmaWVkIGFjdGlvbiBpbnN0YW5jZS5cclxuICAgKi9cclxuICBwcml2YXRlIF92YWxpZGF0aW9uQ29udGV4dDogVmFsaWRhdGlvbkNvbnRleHQgPSBuZXcgVmFsaWRhdGlvbkNvbnRleHQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHJlc3VsdCBvZiB0aGUgYWN0aW9uLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBbVW5rbm93bl0sIHVudGlsIHRoZSBhY3Rpb25cclxuICAgKiBpcyBleGVjdXRlZC5cclxuICAgKi9cclxuICBhY3Rpb25SZXN1bHQ6IEFjdGlvblJlc3VsdCA9IEFjdGlvblJlc3VsdC5Vbmtub3duO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGVmYXVsdCBjb25zdHJ1Y3RvciBmb3IgdGhlIGNsYXNzLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJldHJpZXZlIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdIGZvciB0aGUgc3BlY2lmaWVkIGFjdGlvbi5cclxuICAgKi9cclxuICBnZXQgdmFsaWRhdGlvbkNvbnRleHQoKTogVmFsaWRhdGlvbkNvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRpb25Db250ZXh0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgYSBjb25jcmV0ZSBhY3Rpb24uIEEgY29uY3JldGUgYWN0aW9uIG11c3QgaW1wbGVtZW50XHJcbiAgICogdGhlIFtwcm9jZXNzQWN0aW9uXSBhbmQgdGhlIFt2YWxpZGF0ZUFjdGlvblJlc3VsdF0gZnVuY3Rpb25zIHRvIGJlIGEgdmFsaWRcclxuICAgKiBhY3Rpb24uXHJcbiAgICovXHJcbiAgZXhlY3V0ZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdQcmVwYXJpbmcgdG8gZXhlY3V0ZSBhY3Rpb24uJyk7XHJcbiAgICB0aGlzLnByb2Nlc3NBY3Rpb25QaXBlbGluZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHByb2Nlc3MgdGhlIGFjdGlvbiBwaXBlbGluZSBtZXRob2RzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJvY2Vzc0FjdGlvblBpcGVsaW5lKCkge1xyXG4gICAgdGhpcy5zdGFydEFjdGlvbigpO1xyXG4gICAgaWYgKHRoaXMuYWxsb3dFeGVjdXRpb24pIHtcclxuICAgICAgdGhpcy5wcm9jZXNzQWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpbmlzaEFjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGNhbGwgdGhlIHBpcGVsaW5lIG1ldGhvZHMgZm9yIHRoZSBbc3RhcnRdIG9yIGJlZ2lubmluZ1xyXG4gICAqIHByb2Nlc3Mgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cclxuICAgKi9cclxuICBwcml2YXRlIHN0YXJ0QWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIGFjdGlvbi4nKTtcclxuICAgIHRoaXMuc3RhcnQoKTtcclxuICAgIHRoaXMuYXVkaXQoKTtcclxuICAgIHRoaXMucHJlVmFsaWRhdGVBY3Rpb24oKTtcclxuICAgIHRoaXMuZXZhbHVhdGVSdWxlcygpO1xyXG4gICAgdGhpcy5wb3N0VmFsaWRhdGVBY3Rpb24oKTtcclxuICAgIHRoaXMucHJlRXhlY3V0ZUFjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgdGhlIG1ldGhvZHMgYXQgdGhlIGVuZCBvZiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZmluaXNoQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0ZpbmlzaGluZyBhY3Rpb24uJyk7XHJcbiAgICB0aGlzLnBvc3RFeGVjdXRlQWN0aW9uKCk7XHJcbiAgICB0aGlzLnZhbGlkYXRlQWN0aW9uUmVzdWx0KCk7XHJcbiAgICB0aGlzLmZpbmlzaCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHByb2Nlc3MgdGhlIGFjdGlvbi4gVGhpcyB3aWxsIG9ubHkgYmUgY2FsbGVkIGlmIHRoZSBhY3Rpb24nc1xyXG4gICAqIHZhbGlkYXRpb24gY29udGV4dCBpcyBpbiBhIHZhbGlkIHN0YXRlIChubyBydWxlIHZpb2xhdGlvbnMpLlxyXG4gICAqXHJcbiAgICogQWxsIGNvbmNyZXRlIGFjdGlvbnMgYXJlIHJlcXVpcmVkIHRvIHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlIFtwZXJmb3JtQWN0aW9uXVxyXG4gICAqIG1ldGhvZCB0aGF0IGlzIGNhbGxlZCBmb3IgdGhpcyBwYXJ0IG9mIHRoZSBhY3Rpb24gcGlwZWxpbmUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwcm9jZXNzQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1Byb2Nlc3NpbmcgYWN0aW9uLicpO1xyXG4gICAgdGhpcy5wZXJmb3JtQWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbGwgYWN0aW9uIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24uIFRoaXMgaXMgd2hlcmUgeW91clxyXG4gICAqIFtidXNpbmVzcyBsb2dpY10gc2hvdWxkIGJlIGltcGxlbWVudGVkLiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpZlxyXG4gICAqIHRoZXJlIGFyZSBubyB2YWxpZGF0aW9uIHJ1bGUgZXhjZXB0aW9ucy5cclxuICAgKi9cclxuICBwZXJmb3JtQWN0aW9uKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAnTm90IGltcGxlbWVudGVkLiBSZXF1aXJlcyBpbXBsZW1lbnRhdGlvbiBpbiBjb25jcmV0ZSBhY3Rpb24uJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlL0ltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW4gZWFybHkgb3BlcmF0aW9uIGluIHRoZSBhY3Rpb24gcGlwZWxpbmUuXHJcbiAgICogVGhpcyBmdW5jdGlvbiBiZWxvbmdzIHRvIHRoZSBwcmUtZXhlY3V0ZSBmdW5jdGlvbnMgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cclxuICAgKi9cclxuICBzdGFydCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFueSBhdWRpdGluZyBmZWF0dXJlcyBkdXJpbmcgdGhlIHByZS1leGVjdHVpb24gb2YgdGhlXHJcbiAgICogYnVzaW5lc3MgbG9naWMuXHJcbiAgICovXHJcbiAgYXVkaXQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnQXVkaXRpbmcgYWN0aW9uLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gc2V0dXAgYW55IHZhbGlkYXRpb24gcnVsZXMgYmVmb3JlIHRoZSB2YWxpZGF0aW9uIGhhcHBlbnMuIFRoaXNcclxuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgYmVmb3JlIFtldmFsdWF0ZVJ1bGVzXS5cclxuICAgKi9cclxuICBwcmVWYWxpZGF0ZUFjdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdQcmUtdmFsaWRhdGluZyBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBpbXBsZW1lbnQgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgdmFsaWRhdGlvbiBhbmQgYnVzaW5lc3MgcnVsZXMuIFRoaXNcclxuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgYWZ0ZXIgW3ByZVZhbGlkYXRlQWN0aW9uXS5cclxuICAgKi9cclxuICBldmFsdWF0ZVJ1bGVzKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0V2YWx1YXRpbmcgYWN0aW9uIHJ1bGVzLicpO1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMudmFsaWRhdGVBY3Rpb24oKTtcclxuICAgIGlmIChjb250ZXh0LmlzVmFsaWQpIHtcclxuICAgICAgdGhpcy5hbGxvd0V4ZWN1dGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHQuc3RhdGUgPSBWYWxpZGF0aW9uQ29udGV4dFN0YXRlLlN1Y2Nlc3M7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFsbG93RXhlY3V0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHQuc3RhdGUgPSBWYWxpZGF0aW9uQ29udGV4dFN0YXRlLkZhaWx1cmU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIG9yIGhhbmRsZSB0aGUgcmVzdWx0cyBvZiB0aGUgcnVsZSBldmFsYXRpb24uIFRoaXNcclxuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgYWZ0ZXIgdGhlIFtldmFsdWF0ZVJ1bGVzXS5cclxuICAgKi9cclxuICBwb3N0VmFsaWRhdGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUG9zdC1WYWxpZGF0aW9uIG9mIGFjdGlvbi4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW55IHNldHVwIGJlZm9yZSB0aGUgYWN0aW9uIGlzIGV4ZWN1dGVkLlxyXG4gICAqL1xyXG4gIHByZUV4ZWN1dGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUHJlLWV4ZWN1dGlvbiBvZiBhY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jaXRvbiB0byBldmFsdWF0ZSB0aGUgYWN0aW9uIGFmdGVyIHRoZSB0aGUgYnVzaW5lc3MgbG9naWMgd2l0aGluXHJcbiAgICogdGhlIFtwZXJmb3JtQWN0aW9uXSBoYXMgZXhlY3V0ZWQuXHJcbiAgICovXHJcbiAgcG9zdEV4ZWN1dGVBY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUG9zdC1leGVjdXRpb24gb2YgYWN0aW9uJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJlcXVpcmVzIGltcGxlbWVudGF0aW9uIHRvIGRldGVybWluIHRoZSBzdGF0ZSBhbmQgcmVzdWx0IG9mIHRoZSBhY3Rpb24uXHJcbiAgICogVXNlIHRoaXMgb3Bwb3J0dW5pdHkgdG8gdmFsaWRhdGUgdGhlIHJlc3VsdHMuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVBY3Rpb25SZXN1bHQoKTogQWN0aW9uUmVzdWx0IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignQ29uY3JldGUgYWN0aW9ucyByZXF1aXJlZCB0byBpbXBsZW1lbnQgdGhpcyBtZXRob2QuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFueSBjbGVhbnVwLCBsb2dnaW5nLCBvciBkaXNwb3Npbmcgb2YgcmVzb3VyY2VzIHVzZWRcclxuICAgKiBieSB0aGUgYWN0aW9uLiBUaGlzIGlzIHRoZSBsYXN0IGZ1bmN0aW9uIGNhbGxlZCBkdXJpbmcgdGhlIHBpcGVsaW5lLlxyXG4gICAqL1xyXG4gIGZpbmlzaCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdGaW5pc2ggYWN0aW9uLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gdG8gcGVyZm9ybSB2YWxpZGF0aW9uIG9mIGJ1c2luZXNzIHJ1bGVzIGFuZCBkYXRhLlxyXG4gICAqL1xyXG4gIHZhbGlkYXRlQWN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJ1ZhbGlkYXRpbmcgdGhlIGFjdGlvbi4nKTtcclxuICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Db250ZXh0O1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmdNb2R1bGUiLCJBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiVmFsaWRhdGlvbkNvbnRleHQiLCJWYWxpZGF0aW9uQ29udGV4dFN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7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