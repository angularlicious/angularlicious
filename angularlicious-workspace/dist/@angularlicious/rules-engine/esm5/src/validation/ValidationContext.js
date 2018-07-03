/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ValidationContextState } from './ValidationContextState';
/**
 * Use this class to create a new Validation Context for your application. With this
 * context, you can add rules and evaluate the rules.
 *
 * After the rules are evaluated, you can use the Validation Context to determine if there are
 * any rule violations.
 */
var /**
 * Use this class to create a new Validation Context for your application. With this
 * context, you can add rules and evaluate the rules.
 *
 * After the rules are evaluated, you can use the Validation Context to determine if there are
 * any rule violations.
 */
ValidationContext = /** @class */ (function () {
    /**
     * The constructor for the base validation context.
     */
    function ValidationContext() {
        /**
         * Use to indicate the state of the validation context.
         */
        this.state = ValidationContextState.NotEvaluated;
        /**
         * A list of results for all evaluated rules that belong to the validation context.
         */
        this.results = new Array();
        /**
         * A list of rules for rendering.
         */
        this.rules = new Array();
        console.log('The [ValidationContext] is ready for action(s). All things are good until broken...');
    }
    /**
     * Use this method to add a new rule to the ValidationContext.
     */
    /**
     * Use this method to add a new rule to the ValidationContext.
     * @param {?} rule
     * @return {?}
     */
    ValidationContext.prototype.addRule = /**
     * Use this method to add a new rule to the ValidationContext.
     * @param {?} rule
     * @return {?}
     */
    function (rule) {
        if (this.source) {
            rule.source = this.source;
        }
        this.rules.push(rule);
        return this;
    };
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param source
     */
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param {?} source
     * @return {?}
     */
    ValidationContext.prototype.withSource = /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param {?} source
     * @return {?}
     */
    function (source) {
        this.source = source;
        return this;
    };
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     */
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @return {?}
     */
    ValidationContext.prototype.renderRules = /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @return {?}
     */
    function () {
        var _this = this;
        this.results = new Array();
        if (this.rules && this.rules.length < 1) {
            return this;
        }
        this.rules
            .sort(function (r) { return r.priority; })
            .forEach(function (r) { return _this.results.push(r.execute()); });
        return this;
    };
    /**
     * Use to determine if the validation context has any rule violations.
     */
    /**
     * Use to determine if the validation context has any rule violations.
     * @return {?}
     */
    ValidationContext.prototype.hasRuleViolations = /**
     * Use to determine if the validation context has any rule violations.
     * @return {?}
     */
    function () {
        var /** @type {?} */ hasViolations = false;
        if (this.rules) {
            var /** @type {?} */ ruleViolationsCount = this.rules && this.rules.filter(function (r) { return r.isValid === false; }).length;
            if (ruleViolationsCount > 0) {
                hasViolations = true;
            }
        }
        return hasViolations;
    };
    Object.defineProperty(ValidationContext.prototype, "isValid", {
        /**
         * *Use to indicate if the validation context is valid - no rule violations.
         */
        get: /**
         * *Use to indicate if the validation context is valid - no rule violations.
         * @return {?}
         */
        function () {
            var /** @type {?} */ isRuleValid = true;
            if (this.rules) {
                var /** @type {?} */ invalidRulesCount = this.rules.filter(function (r) { return r.isValid === false; })
                    .length;
                if (invalidRulesCount > 0) {
                    isRuleValid = false;
                }
            }
            return isRuleValid;
        },
        enumerable: true,
        configurable: true
    });
    return ValidationContext;
}());
/**
 * Use this class to create a new Validation Context for your application. With this
 * context, you can add rules and evaluate the rules.
 *
 * After the rules are evaluated, you can use the Validation Context to determine if there are
 * any rule violations.
 */
export { ValidationContext };
function ValidationContext_tsickle_Closure_declarations() {
    /**
     * Use to indicate the state of the validation context.
     * @type {?}
     */
    ValidationContext.prototype.state;
    /**
     * A list of results for all evaluated rules that belong to the validation context.
     * @type {?}
     */
    ValidationContext.prototype.results;
    /**
     * A list of rules for rendering.
     * @type {?}
     */
    ValidationContext.prototype.rules;
    /**
     * The source of the specified validation context instance.
     * @type {?}
     */
    ValidationContext.prototype.source;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRhdGlvbkNvbnRleHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lLyIsInNvdXJjZXMiOlsic3JjL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7OztBQVdsRTs7Ozs7OztBQUFBO0lBc0JFOztPQUVHO0lBQ0g7Ozs7cUJBcEJnQyxzQkFBc0IsQ0FBQyxZQUFZOzs7O3VCQUt0QyxJQUFJLEtBQUssRUFBYzs7OztxQkFLekIsSUFBSSxLQUFLLEVBQWM7UUFXaEQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxxRkFBcUYsQ0FDdEYsQ0FBQztLQUNIO0lBRUQ7O09BRUc7Ozs7OztJQUNILG1DQUFPOzs7OztJQUFQLFVBQVEsSUFBZ0I7UUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxzQ0FBVTs7Ozs7SUFBVixVQUFXLE1BQWM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQVc7Ozs7SUFBWDtRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsS0FBSzthQUNQLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNkNBQWlCOzs7O0lBQWpCO1FBQ0UscUJBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLHFCQUFNLG1CQUFtQixHQUN2QixJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDbkUsRUFBRSxDQUFDLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQzthQUN0QjtTQUNGO1FBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztLQUN0QjtJQUtELHNCQUFJLHNDQUFPO1FBSFg7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxxQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHFCQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQW5CLENBQW1CLENBQUM7cUJBQ2xFLE1BQU0sQ0FBQztnQkFDVixFQUFFLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixXQUFXLEdBQUcsS0FBSyxDQUFDO2lCQUNyQjthQUNGO1lBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUNwQjs7O09BQUE7NEJBekdIO0lBMEdDLENBQUE7Ozs7Ozs7O0FBOUZELDZCQThGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElWYWxpZGF0aW9uQ29udGV4dCB9IGZyb20gJy4vSVZhbGlkYXRpb25Db250ZXh0JztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSB9IGZyb20gJy4vVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuLi9ydWxlcy9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4uL3J1bGVzL1J1bGVQb2xpY3knO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIHRvIGNyZWF0ZSBhIG5ldyBWYWxpZGF0aW9uIENvbnRleHQgZm9yIHlvdXIgYXBwbGljYXRpb24uIFdpdGggdGhpc1xyXG4gKiBjb250ZXh0LCB5b3UgY2FuIGFkZCBydWxlcyBhbmQgZXZhbHVhdGUgdGhlIHJ1bGVzLlxyXG4gKlxyXG4gKiBBZnRlciB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCwgeW91IGNhbiB1c2UgdGhlIFZhbGlkYXRpb24gQ29udGV4dCB0byBkZXRlcm1pbmUgaWYgdGhlcmUgYXJlXHJcbiAqIGFueSBydWxlIHZpb2xhdGlvbnMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkNvbnRleHQgaW1wbGVtZW50cyBJVmFsaWRhdGlvbkNvbnRleHQge1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXRlIG9mIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuIFxyXG4gICAqL1xyXG4gIHN0YXRlOiBWYWxpZGF0aW9uQ29udGV4dFN0YXRlID0gVmFsaWRhdGlvbkNvbnRleHRTdGF0ZS5Ob3RFdmFsdWF0ZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiByZXN1bHRzIGZvciBhbGwgZXZhbHVhdGVkIHJ1bGVzIHRoYXQgYmVsb25nIHRvIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICovXHJcbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciByZW5kZXJpbmcuXHJcbiAgICovXHJcbiAgcnVsZXM6IEFycmF5PFJ1bGVQb2xpY3k+ID0gbmV3IEFycmF5PFJ1bGVQb2xpY3k+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCB2YWxpZGF0aW9uIGNvbnRleHQgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgc291cmNlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGJhc2UgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgICdUaGUgW1ZhbGlkYXRpb25Db250ZXh0XSBpcyByZWFkeSBmb3IgYWN0aW9uKHMpLiBBbGwgdGhpbmdzIGFyZSBnb29kIHVudGlsIGJyb2tlbi4uLidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYWRkIGEgbmV3IHJ1bGUgdG8gdGhlIFZhbGlkYXRpb25Db250ZXh0LlxyXG4gICAqL1xyXG4gIGFkZFJ1bGUocnVsZTogUnVsZVBvbGljeSkge1xyXG4gICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgIHJ1bGUuc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBmb3IgdGhlIGN1cnJlbnQgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqIEBwYXJhbSBzb3VyY2VcclxuICAgKi9cclxuICB3aXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgdGhlIHJ1bGVzIGFkZGVkIHRvIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdLlxyXG4gICAqL1xyXG4gIHJlbmRlclJ1bGVzKCkge1xyXG4gICAgdGhpcy5yZXN1bHRzID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XHJcbiAgICBpZiAodGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJ1bGVzXHJcbiAgICAgIC5zb3J0KHIgPT4gci5wcmlvcml0eSlcclxuICAgICAgLmZvckVhY2gociA9PiB0aGlzLnJlc3VsdHMucHVzaChyLmV4ZWN1dGUoKSkpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQgaGFzIGFueSBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgaGFzUnVsZVZpb2xhdGlvbnMoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaGFzVmlvbGF0aW9ucyA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMucnVsZXMpIHtcclxuICAgICAgY29uc3QgcnVsZVZpb2xhdGlvbnNDb3VudCA9XHJcbiAgICAgICAgdGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmZpbHRlcihyID0+IHIuaXNWYWxpZCA9PT0gZmFsc2UpLmxlbmd0aDtcclxuICAgICAgaWYgKHJ1bGVWaW9sYXRpb25zQ291bnQgPiAwKSB7XHJcbiAgICAgICAgaGFzVmlvbGF0aW9ucyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBoYXNWaW9sYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogKlVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0IGlzIHZhbGlkIC0gbm8gcnVsZSB2aW9sYXRpb25zLlxyXG4gICAqL1xyXG4gIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzUnVsZVZhbGlkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnJ1bGVzKSB7XHJcbiAgICAgIGNvbnN0IGludmFsaWRSdWxlc0NvdW50ID0gdGhpcy5ydWxlcy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKVxyXG4gICAgICAgIC5sZW5ndGg7XHJcbiAgICAgIGlmIChpbnZhbGlkUnVsZXNDb3VudCA+IDApIHtcclxuICAgICAgICBpc1J1bGVWYWxpZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNSdWxlVmFsaWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==