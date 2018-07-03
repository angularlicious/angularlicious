/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This class defines the result of a single rule evaluation.
 */
var /**
 * This class defines the result of a single rule evaluation.
 */
RuleResult = /** @class */ (function () {
    /**
     * Constructor for the RuleResult class.
     * @param rulePolicy Use to specify the rule.
     * @param target Use to specify the target to be evaluated by the rule.
     */
    function RuleResult(rulePolicy, target) {
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
    return RuleResult;
}());
/**
 * This class defines the result of a single rule evaluation.
 */
export { RuleResult };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvUnVsZVJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBTUE7OztBQUFBO0lBaUNFOzs7O09BSUc7SUFDSCxvQkFBWSxVQUFzQixFQUFFLE1BQVk7Ozs7dUJBakN0QyxLQUFLO1FBa0NiLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0QjtxQkFuREg7SUFvREMsQ0FBQTs7OztBQTlDRCxzQkE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi9SdWxlUG9saWN5JztcclxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBkZWZpbmVzIHRoZSByZXN1bHQgb2YgYSBzaW5nbGUgcnVsZSBldmFsdWF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJ1bGVSZXN1bHQge1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHJ1bGUgcmVzdWx0IGlzIHZhbGlkIG9yIG5vdC4gXHJcbiAgICovXHJcbiAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFRoZSBydWxlIHRoYXQgd2FzIGV2YWx1YXRlZC5cclxuICAgKi9cclxuICBydWxlUG9saWN5OiBSdWxlUG9saWN5O1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFRoZSBydWxlIG1lc3NhZ2UgdG8gdXNlIHdoZW4gdGhlIGV2YWx1YXRpb24gW2lzVmFsaWRdIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgaXRlbSB0aGF0IHdhcyBldmFsdWF0ZWQgYnkgdGhlIHNwZWNpZmllZCBydWxlIHBvbGljeS5cclxuICAgKi9cclxuICB0YXJnZXQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBSdWxlUmVzdWx0IGNsYXNzLlxyXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVXNlIHRvIHNwZWNpZnkgdGhlIHRhcmdldCB0byBiZSBldmFsdWF0ZWQgYnkgdGhlIHJ1bGUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogUnVsZVBvbGljeSwgdGFyZ2V0OiBhbnkpO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cclxuICAgKiBAcGFyYW0gcnVsZVBvbGljeSBVc2UgdG8gc3BlY2lmeSB0aGUgcnVsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBDb21wb3NpdGVSdWxlKTtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXHJcbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIHRhcmdldCBVc2UgdG8gc3BlY2lmeSB0aGUgdGFyZ2V0IHRvIGJlIGV2YWx1YXRlZCBieSB0aGUgcnVsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBSdWxlUG9saWN5LCB0YXJnZXQ/OiBhbnkpIHtcclxuICAgIGlmIChydWxlUG9saWN5ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ydWxlUG9saWN5ID0gcnVsZVBvbGljeTtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gcnVsZVBvbGljeS5pc1ZhbGlkO1xyXG4gICAgICB0aGlzLm1lc3NhZ2UgPSBydWxlUG9saWN5Lm1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcbn1cclxuIl19