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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtYWN0aW9ucy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9hY3Rpb25zL2xpYi9hY3Rpb25zLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2FjdGlvbnMvbGliL0FjdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0FuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUsIENvbW1vbk1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uc01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0U3RhdGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcbmltcG9ydCB7IElBY3Rpb24gfSBmcm9tICcuL0lBY3Rpb24nO1xuaW1wb3J0IHsgQWN0aW9uUmVzdWx0IH0gZnJvbSAnLi9BY3Rpb25SZXN1bHQnO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGZyYW1ld29yayBBY3Rpb24gY2xhc3MgdGhhdCBwcm92aWRlcyB0aGUgcGlwZWxpbmUgb2YgcHJlL3Bvc3RcbiAqIGV4ZWN1dGlvbiBtZXRob2RzLiBUaGlzIGNsYXNzIGltcGxlbWVudHMgdGhlIFtUZW1wbGF0ZSBNZXRob2RdIHBhdHRlcm4uXG4gKlxuICogVGhlIHByZS1leGVjdXRlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBhcmU6XG4gKlx0XHQxLiBzdGFydCgpO1xuICpcdFx0Mi4gYXVkaXQoKTtcbiAqXHRcdDMuIHByZVZhbGlkYXRlQWN0aW9uKCk7XG4gKlx0XHQ0LiBldmFsdWF0ZVJ1bGVzKCk7XG4gKlx0XHQ1LiBwb3N0VmFsaWRhdGVBY3Rpb24oKTtcbiAqXHRcdDYuIHByZUV4ZWN1dGVBY3Rpb24oKTtcbiAqXG4gKklmIHRoZSBzdGF0dXMgb2YgYWN0aW9uIGlzIGdvb2QsIHRoZSBidXNpbmVzcyBsb2dpYyB3aWxsIGJlIGV4ZWN1dGVkIHVzaW5nIHRoZTpcbiAqXHRcdDcuIHByb2Nlc3NBY3Rpb24oKTtcbiAqXG4gKiBUaGUgcG9zdC1leGVjdXRpb24gZnVuY3Rpb25zIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGFyZTpcbiAqXHRcdDguIHBvc3RFeGVjdXRlQWN0aW9uKCk7XG4gKlx0XHQ5LiB2YWxpZGF0ZUFjdGlvblJlc3VsdCgpO1xuICpcdFx0MTAuIGZpbmlzaCgpO1xuICovXG5leHBvcnQgY2xhc3MgQWN0aW9uIGltcGxlbWVudHMgSUFjdGlvbiB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGFjdGlvbiBpcyBhbGxvd2VkIGV4ZWN1dGlvbi4gSWYgdGhlcmUgYXJlIGFueSBydWxlXG4gICAqIHZpb2xhdGlvbnMgaW4gdGhlIHZhbGlkYXRpb24gY29udGV4dCwgdGhlIGFjdGlvbiBpcyBub3QgYWxsb3dlZCB0b1xuICAgKiBleGVjdXRlLlxuICAgKi9cbiAgYWxsb3dFeGVjdXRpb24gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgdmFsaWRhdGlvbiBjb250ZXh0IGZvciB0aGUgc3BlY2lmaWVkIGFjdGlvbiBpbnN0YW5jZS5cbiAgICovXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db250ZXh0OiBWYWxpZGF0aW9uQ29udGV4dCA9IG5ldyBWYWxpZGF0aW9uQ29udGV4dCgpO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdWx0IG9mIHRoZSBhY3Rpb24uIFRoZSBkZWZhdWx0IHZhbHVlIGlzIFtVbmtub3duXSwgdW50aWwgdGhlIGFjdGlvblxuICAgKiBpcyBleGVjdXRlZC5cbiAgICovXG4gIGFjdGlvblJlc3VsdDogQWN0aW9uUmVzdWx0ID0gQWN0aW9uUmVzdWx0LlVua25vd247XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGNvbnN0cnVjdG9yIGZvciB0aGUgY2xhc3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgW1ZhbGlkYXRpb25Db250ZXh0XSBmb3IgdGhlIHNwZWNpZmllZCBhY3Rpb24uXG4gICAqL1xuICBnZXQgdmFsaWRhdGlvbkNvbnRleHQoKTogVmFsaWRhdGlvbkNvbnRleHQge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0aW9uQ29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSBhIGNvbmNyZXRlIGFjdGlvbi4gQSBjb25jcmV0ZSBhY3Rpb24gbXVzdCBpbXBsZW1lbnRcbiAgICogdGhlIFtwcm9jZXNzQWN0aW9uXSBhbmQgdGhlIFt2YWxpZGF0ZUFjdGlvblJlc3VsdF0gZnVuY3Rpb25zIHRvIGJlIGEgdmFsaWRcbiAgICogYWN0aW9uLlxuICAgKi9cbiAgZXhlY3V0ZSgpIHtcbiAgICBjb25zb2xlLmxvZygnUHJlcGFyaW5nIHRvIGV4ZWN1dGUgYWN0aW9uLicpO1xuICAgIHRoaXMucHJvY2Vzc0FjdGlvblBpcGVsaW5lKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHByb2Nlc3MgdGhlIGFjdGlvbiBwaXBlbGluZSBtZXRob2RzLlxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzQWN0aW9uUGlwZWxpbmUoKSB7XG4gICAgdGhpcy5zdGFydEFjdGlvbigpO1xuICAgIGlmICh0aGlzLmFsbG93RXhlY3V0aW9uKSB7XG4gICAgICB0aGlzLnByb2Nlc3NBY3Rpb24oKTtcbiAgICB9XG4gICAgdGhpcy5maW5pc2hBY3Rpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gY2FsbCB0aGUgcGlwZWxpbmUgbWV0aG9kcyBmb3IgdGhlIFtzdGFydF0gb3IgYmVnaW5uaW5nXG4gICAqIHByb2Nlc3Mgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cbiAgICovXG4gIHByaXZhdGUgc3RhcnRBY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIGFjdGlvbi4nKTtcbiAgICB0aGlzLnN0YXJ0KCk7XG4gICAgdGhpcy5hdWRpdCgpO1xuICAgIHRoaXMucHJlVmFsaWRhdGVBY3Rpb24oKTtcbiAgICB0aGlzLmV2YWx1YXRlUnVsZXMoKTtcbiAgICB0aGlzLnBvc3RWYWxpZGF0ZUFjdGlvbigpO1xuICAgIHRoaXMucHJlRXhlY3V0ZUFjdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBleGVjdXRlIHRoZSBtZXRob2RzIGF0IHRoZSBlbmQgb2YgdGhlIGFjdGlvbiBwaXBlbGluZS5cbiAgICovXG4gIHByaXZhdGUgZmluaXNoQWN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdGaW5pc2hpbmcgYWN0aW9uLicpO1xuICAgIHRoaXMucG9zdEV4ZWN1dGVBY3Rpb24oKTtcbiAgICB0aGlzLnZhbGlkYXRlQWN0aW9uUmVzdWx0KCk7XG4gICAgdGhpcy5maW5pc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcHJvY2VzcyB0aGUgYWN0aW9uLiBUaGlzIHdpbGwgb25seSBiZSBjYWxsZWQgaWYgdGhlIGFjdGlvbidzXG4gICAqIHZhbGlkYXRpb24gY29udGV4dCBpcyBpbiBhIHZhbGlkIHN0YXRlIChubyBydWxlIHZpb2xhdGlvbnMpLlxuICAgKlxuICAgKiBBbGwgY29uY3JldGUgYWN0aW9ucyBhcmUgcmVxdWlyZWQgdG8gcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgW3BlcmZvcm1BY3Rpb25dXG4gICAqIG1ldGhvZCB0aGF0IGlzIGNhbGxlZCBmb3IgdGhpcyBwYXJ0IG9mIHRoZSBhY3Rpb24gcGlwZWxpbmUuXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NBY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ1Byb2Nlc3NpbmcgYWN0aW9uLicpO1xuICAgIHRoaXMucGVyZm9ybUFjdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbCBhY3Rpb24gbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbi4gVGhpcyBpcyB3aGVyZSB5b3VyXG4gICAqIFtidXNpbmVzcyBsb2dpY10gc2hvdWxkIGJlIGltcGxlbWVudGVkLiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpZlxuICAgKiB0aGVyZSBhcmUgbm8gdmFsaWRhdGlvbiBydWxlIGV4Y2VwdGlvbnMuXG4gICAqL1xuICBwZXJmb3JtQWN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdOb3QgaW1wbGVtZW50ZWQuIFJlcXVpcmVzIGltcGxlbWVudGF0aW9uIGluIGNvbmNyZXRlIGFjdGlvbi4nXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZS9JbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFuIGVhcmx5IG9wZXJhdGlvbiBpbiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxuICAgKiBUaGlzIGZ1bmN0aW9uIGJlbG9uZ3MgdG8gdGhlIHByZS1leGVjdXRlIGZ1bmN0aW9ucyBvZiB0aGUgYWN0aW9uIHBpcGVsaW5lLlxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIGFjdGlvbi4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFueSBhdWRpdGluZyBmZWF0dXJlcyBkdXJpbmcgdGhlIHByZS1leGVjdHVpb24gb2YgdGhlXG4gICAqIGJ1c2luZXNzIGxvZ2ljLlxuICAgKi9cbiAgYXVkaXQoKSB7XG4gICAgY29uc29sZS5sb2coJ0F1ZGl0aW5nIGFjdGlvbi4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBzZXR1cCBhbnkgdmFsaWRhdGlvbiBydWxlcyBiZWZvcmUgdGhlIHZhbGlkYXRpb24gaGFwcGVucy4gVGhpc1xuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgYmVmb3JlIFtldmFsdWF0ZVJ1bGVzXS5cbiAgICovXG4gIHByZVZhbGlkYXRlQWN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdQcmUtdmFsaWRhdGluZyBhY3Rpb24uJyk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gaW1wbGVtZW50IHRoZSBleGVjdXRpb24gb2YgdGhlIHZhbGlkYXRpb24gYW5kIGJ1c2luZXNzIHJ1bGVzLiBUaGlzXG4gICAqIGZ1bmN0aW9uIGlzIGNhbGxlZCBhZnRlciBbcHJlVmFsaWRhdGVBY3Rpb25dLlxuICAgKi9cbiAgZXZhbHVhdGVSdWxlcygpIHtcbiAgICBjb25zb2xlLmxvZygnRXZhbHVhdGluZyBhY3Rpb24gcnVsZXMuJyk7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMudmFsaWRhdGVBY3Rpb24oKTtcbiAgICBpZiAoY29udGV4dC5pc1ZhbGlkKSB7XG4gICAgICB0aGlzLmFsbG93RXhlY3V0aW9uID0gdHJ1ZTtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHQuc3RhdGUgPSBWYWxpZGF0aW9uQ29udGV4dFN0YXRlLlN1Y2Nlc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWxsb3dFeGVjdXRpb24gPSBmYWxzZTtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkNvbnRleHQuc3RhdGUgPSBWYWxpZGF0aW9uQ29udGV4dFN0YXRlLkZhaWx1cmU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgb3IgaGFuZGxlIHRoZSByZXN1bHRzIG9mIHRoZSBydWxlIGV2YWxhdGlvbi4gVGhpc1xuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgYWZ0ZXIgdGhlIFtldmFsdWF0ZVJ1bGVzXS5cbiAgICovXG4gIHBvc3RWYWxpZGF0ZUFjdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnUG9zdC1WYWxpZGF0aW9uIG9mIGFjdGlvbi4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFueSBzZXR1cCBiZWZvcmUgdGhlIGFjdGlvbiBpcyBleGVjdXRlZC5cbiAgICovXG4gIHByZUV4ZWN1dGVBY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ1ByZS1leGVjdXRpb24gb2YgYWN0aW9uLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGZ1bmNpdG9uIHRvIGV2YWx1YXRlIHRoZSBhY3Rpb24gYWZ0ZXIgdGhlIHRoZSBidXNpbmVzcyBsb2dpYyB3aXRoaW5cbiAgICogdGhlIFtwZXJmb3JtQWN0aW9uXSBoYXMgZXhlY3V0ZWQuXG4gICAqL1xuICBwb3N0RXhlY3V0ZUFjdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnUG9zdC1leGVjdXRpb24gb2YgYWN0aW9uJyk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiByZXF1aXJlcyBpbXBsZW1lbnRhdGlvbiB0byBkZXRlcm1pbiB0aGUgc3RhdGUgYW5kIHJlc3VsdCBvZiB0aGUgYWN0aW9uLlxuICAgKiBVc2UgdGhpcyBvcHBvcnR1bml0eSB0byB2YWxpZGF0ZSB0aGUgcmVzdWx0cy5cbiAgICovXG4gIHZhbGlkYXRlQWN0aW9uUmVzdWx0KCk6IEFjdGlvblJlc3VsdCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb25jcmV0ZSBhY3Rpb25zIHJlcXVpcmVkIHRvIGltcGxlbWVudCB0aGlzIG1ldGhvZC4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIGFueSBjbGVhbnVwLCBsb2dnaW5nLCBvciBkaXNwb3Npbmcgb2YgcmVzb3VyY2VzIHVzZWRcbiAgICogYnkgdGhlIGFjdGlvbi4gVGhpcyBpcyB0aGUgbGFzdCBmdW5jdGlvbiBjYWxsZWQgZHVyaW5nIHRoZSBwaXBlbGluZS5cbiAgICovXG4gIGZpbmlzaCgpIHtcbiAgICBjb25zb2xlLmxvZygnRmluaXNoIGFjdGlvbi4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiB0byBwZXJmb3JtIHZhbGlkYXRpb24gb2YgYnVzaW5lc3MgcnVsZXMgYW5kIGRhdGEuXG4gICAqL1xuICB2YWxpZGF0ZUFjdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnVmFsaWRhdGluZyB0aGUgYWN0aW9uLicpO1xuICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Db250ZXh0O1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmdNb2R1bGUiLCJBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiVmFsaWRhdGlvbkNvbnRleHQiLCJWYWxpZGF0aW9uQ29udGV4dFN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7b0JBSUNBLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUUsQ0FBQ0MsMkNBQStCLEVBQUVDLG1CQUFZLENBQUM7cUJBQ3pEOzs0QkFORDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQUE7Ozs7UUFzQkU7Ozs7OztrQ0FoQmlCLElBQUk7Ozs7c0NBSzJCLElBQUlDLDZCQUFpQixFQUFFOzs7OztnQ0FNMUMsWUFBWSxDQUFDLE9BQU87U0FLakM7UUFLaEIsc0JBQUkscUNBQWlCOzs7Ozs7O2dCQUFyQjtnQkFDRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUNoQzs7O1dBQUE7Ozs7Ozs7Ozs7OztRQU9ELHdCQUFPOzs7Ozs7WUFBUDtnQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxD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