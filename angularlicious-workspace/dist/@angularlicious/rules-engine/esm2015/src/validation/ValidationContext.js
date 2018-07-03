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
export class ValidationContext {
    /**
     * The constructor for the base validation context.
     */
    constructor() {
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
     * @param {?} rule
     * @return {?}
     */
    addRule(rule) {
        if (this.source) {
            rule.source = this.source;
        }
        this.rules.push(rule);
        return this;
    }
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param {?} source
     * @return {?}
     */
    withSource(source) {
        this.source = source;
        return this;
    }
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @return {?}
     */
    renderRules() {
        this.results = new Array();
        if (this.rules && this.rules.length < 1) {
            return this;
        }
        this.rules
            .sort(r => r.priority)
            .forEach(r => this.results.push(r.execute()));
        return this;
    }
    /**
     * Use to determine if the validation context has any rule violations.
     * @return {?}
     */
    hasRuleViolations() {
        let /** @type {?} */ hasViolations = false;
        if (this.rules) {
            const /** @type {?} */ ruleViolationsCount = this.rules && this.rules.filter(r => r.isValid === false).length;
            if (ruleViolationsCount > 0) {
                hasViolations = true;
            }
        }
        return hasViolations;
    }
    /**
     * *Use to indicate if the validation context is valid - no rule violations.
     * @return {?}
     */
    get isValid() {
        let /** @type {?} */ isRuleValid = true;
        if (this.rules) {
            const /** @type {?} */ invalidRulesCount = this.rules.filter(r => r.isValid === false)
                .length;
            if (invalidRulesCount > 0) {
                isRuleValid = false;
            }
        }
        return isRuleValid;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRhdGlvbkNvbnRleHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lLyIsInNvdXJjZXMiOlsic3JjL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7OztBQVdsRSxNQUFNOzs7O0lBeUJKOzs7O3FCQXBCZ0Msc0JBQXNCLENBQUMsWUFBWTs7Ozt1QkFLdEMsSUFBSSxLQUFLLEVBQWM7Ozs7cUJBS3pCLElBQUksS0FBSyxFQUFjO1FBV2hELE9BQU8sQ0FBQyxHQUFHLENBQ1QscUZBQXFGLENBQ3RGLENBQUM7S0FDSDs7Ozs7O0lBS0QsT0FBTyxDQUFDLElBQWdCO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBTUQsVUFBVSxDQUFDLE1BQWM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiOzs7OztJQUtELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFLRCxpQkFBaUI7UUFDZixxQkFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsdUJBQU0sbUJBQW1CLEdBQ3ZCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNuRSxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1NBQ0Y7UUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQ3RCOzs7OztJQUtELElBQUksT0FBTztRQUNULHFCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZix1QkFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDO2lCQUNsRSxNQUFNLENBQUM7WUFDVixFQUFFLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQ3JCO1NBQ0Y7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQ3BCO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICcuL0lWYWxpZGF0aW9uQ29udGV4dCc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0U3RhdGUgfSBmcm9tICcuL1ZhbGlkYXRpb25Db250ZXh0U3RhdGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuLi9ydWxlcy9SdWxlUG9saWN5JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBuZXcgVmFsaWRhdGlvbiBDb250ZXh0IGZvciB5b3VyIGFwcGxpY2F0aW9uLiBXaXRoIHRoaXNcclxuICogY29udGV4dCwgeW91IGNhbiBhZGQgcnVsZXMgYW5kIGV2YWx1YXRlIHRoZSBydWxlcy5cclxuICpcclxuICogQWZ0ZXIgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQsIHlvdSBjYW4gdXNlIHRoZSBWYWxpZGF0aW9uIENvbnRleHQgdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGFyZVxyXG4gKiBhbnkgcnVsZSB2aW9sYXRpb25zLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25Db250ZXh0IGltcGxlbWVudHMgSVZhbGlkYXRpb25Db250ZXh0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBzdGF0ZSBvZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LiBcclxuICAgKi9cclxuICBzdGF0ZTogVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSA9IFZhbGlkYXRpb25Db250ZXh0U3RhdGUuTm90RXZhbHVhdGVkO1xyXG5cclxuICAvKipcclxuICAgKiBBIGxpc3Qgb2YgcmVzdWx0cyBmb3IgYWxsIGV2YWx1YXRlZCBydWxlcyB0aGF0IGJlbG9uZyB0byB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqL1xyXG4gIHJlc3VsdHM6IEFycmF5PFJ1bGVSZXN1bHQ+ID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBydWxlcyBmb3IgcmVuZGVyaW5nLlxyXG4gICAqL1xyXG4gIHJ1bGVzOiBBcnJheTxSdWxlUG9saWN5PiA9IG5ldyBBcnJheTxSdWxlUG9saWN5PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc291cmNlIG9mIHRoZSBzcGVjaWZpZWQgdmFsaWRhdGlvbiBjb250ZXh0IGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBiYXNlIHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAnVGhlIFtWYWxpZGF0aW9uQ29udGV4dF0gaXMgcmVhZHkgZm9yIGFjdGlvbihzKS4gQWxsIHRoaW5ncyBhcmUgZ29vZCB1bnRpbCBicm9rZW4uLi4nXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBhIG5ldyBydWxlIHRvIHRoZSBWYWxpZGF0aW9uQ29udGV4dC5cclxuICAgKi9cclxuICBhZGRSdWxlKHJ1bGU6IFJ1bGVQb2xpY3kpIHtcclxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICBydWxlLnNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIHNldCB0aGUgW1NvdXJjZV0gZm9yIHRoZSBjdXJyZW50IHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKiBAcGFyYW0gc291cmNlXHJcbiAgICovXHJcbiAgd2l0aFNvdXJjZShzb3VyY2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBleGVjdXRlIHRoZSBydWxlcyBhZGRlZCB0byB0aGUgW1ZhbGlkYXRpb25Db250ZXh0XS5cclxuICAgKi9cclxuICByZW5kZXJSdWxlcygpIHtcclxuICAgIHRoaXMucmVzdWx0cyA9IG5ldyBBcnJheTxSdWxlUmVzdWx0PigpO1xyXG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ydWxlc1xyXG4gICAgICAuc29ydChyID0+IHIucHJpb3JpdHkpXHJcbiAgICAgIC5mb3JFYWNoKHIgPT4gdGhpcy5yZXN1bHRzLnB1c2goci5leGVjdXRlKCkpKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0IGhhcyBhbnkgcnVsZSB2aW9sYXRpb25zLlxyXG4gICAqL1xyXG4gIGhhc1J1bGVWaW9sYXRpb25zKCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGhhc1Zpb2xhdGlvbnMgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLnJ1bGVzKSB7XHJcbiAgICAgIGNvbnN0IHJ1bGVWaW9sYXRpb25zQ291bnQgPVxyXG4gICAgICAgIHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKS5sZW5ndGg7XHJcbiAgICAgIGlmIChydWxlVmlvbGF0aW9uc0NvdW50ID4gMCkge1xyXG4gICAgICAgIGhhc1Zpb2xhdGlvbnMgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGFzVmlvbGF0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICpVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHZhbGlkYXRpb24gY29udGV4dCBpcyB2YWxpZCAtIG5vIHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgIGxldCBpc1J1bGVWYWxpZCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5ydWxlcykge1xyXG4gICAgICBjb25zdCBpbnZhbGlkUnVsZXNDb3VudCA9IHRoaXMucnVsZXMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSlcclxuICAgICAgICAubGVuZ3RoO1xyXG4gICAgICBpZiAoaW52YWxpZFJ1bGVzQ291bnQgPiAwKSB7XHJcbiAgICAgICAgaXNSdWxlVmFsaWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzUnVsZVZhbGlkO1xyXG4gIH1cclxufVxyXG4iXX0=