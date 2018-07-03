/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This class defines the result of a single rule evaluation.
 */
export class RuleResult {
    /**
     * Constructor for the RuleResult class.
     * @param {?} rulePolicy Use to specify the rule.
     * @param {?=} target Use to specify the target to be evaluated by the rule.
     */
    constructor(rulePolicy, target) {
        /**
         * Use to indicate if the rule result is valid or not.
         */
        this.isValid = false;
        if (rulePolicy != null) {
            this.rulePolicy = rulePolicy;
            this.isValid = rulePolicy.isValid;
            this.message = rulePolicy.message;
        }
        this.target = target;
    }
}
function RuleResult_tsickle_Closure_declarations() {
    /**
     * Use to indicate if the rule result is valid or not.
     * @type {?}
     */
    RuleResult.prototype.isValid;
    /**
     * The rule that was evaluated.
     * @type {?}
     */
    RuleResult.prototype.rulePolicy;
    /**
     * The rule message to use when the evaluation [isValid] is [false].
     * @type {?}
     */
    RuleResult.prototype.message;
    /**
     * The target item that was evaluated by the specified rule policy.
     * @type {?}
     */
    RuleResult.prototype.target;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvUnVsZVJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBTUEsTUFBTTs7Ozs7O0lBc0NKLFlBQVksVUFBc0IsRUFBRSxNQUFZOzs7O3VCQWpDdEMsS0FBSztRQWtDYixFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDdEI7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnLi9Db21wb3NpdGVSdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGRlZmluZXMgdGhlIHJlc3VsdCBvZiBhIHNpbmdsZSBydWxlIGV2YWx1YXRpb24uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUnVsZVJlc3VsdCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgdmFsaWQgb3Igbm90LiBcclxuICAgKi9cclxuICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogVGhlIHJ1bGUgdGhhdCB3YXMgZXZhbHVhdGVkLlxyXG4gICAqL1xyXG4gIHJ1bGVQb2xpY3k6IFJ1bGVQb2xpY3k7XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogVGhlIHJ1bGUgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGUgZXZhbHVhdGlvbiBbaXNWYWxpZF0gaXMgW2ZhbHNlXS5cclxuICAgKi9cclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBpdGVtIHRoYXQgd2FzIGV2YWx1YXRlZCBieSB0aGUgc3BlY2lmaWVkIHJ1bGUgcG9saWN5LlxyXG4gICAqL1xyXG4gIHRhcmdldDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXHJcbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIHRhcmdldCBVc2UgdG8gc3BlY2lmeSB0aGUgdGFyZ2V0IHRvIGJlIGV2YWx1YXRlZCBieSB0aGUgcnVsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBSdWxlUG9saWN5LCB0YXJnZXQ6IGFueSk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBSdWxlUmVzdWx0IGNsYXNzLlxyXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IENvbXBvc2l0ZVJ1bGUpO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cclxuICAgKiBAcGFyYW0gcnVsZVBvbGljeSBVc2UgdG8gc3BlY2lmeSB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IFJ1bGVQb2xpY3ksIHRhcmdldD86IGFueSkge1xyXG4gICAgaWYgKHJ1bGVQb2xpY3kgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJ1bGVQb2xpY3kgPSBydWxlUG9saWN5O1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBydWxlUG9saWN5LmlzVmFsaWQ7XHJcbiAgICAgIHRoaXMubWVzc2FnZSA9IHJ1bGVQb2xpY3kubWVzc2FnZTtcclxuICAgIH1cclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iXX0=