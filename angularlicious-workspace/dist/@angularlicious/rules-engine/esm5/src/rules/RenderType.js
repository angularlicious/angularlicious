/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var RenderType = {
    /**
       * Use to indicate the rule rendering stops when a rule's evaluation is false - rule contains violations.
       */
    ExitOnFirstFalseEvaluation: 0,
    /**
       * Use to indicate the rule rendering stops when a rule's evalution is true (no rule violations).
       */
    ExitOnFirstTrueEvaluation: 1,
    /**
       * Use to indicate that all rules of the rule set are rendered - returns all rule results.
       */
    EvaluateAllRules: 2,
};
export { RenderType };
RenderType[RenderType.ExitOnFirstFalseEvaluation] = "ExitOnFirstFalseEvaluation";
RenderType[RenderType.ExitOnFirstTrueEvaluation] = "ExitOnFirstTrueEvaluation";
RenderType[RenderType.EvaluateAllRules] = "EvaluateAllRules";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvUmVuZGVyVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFVzZSB0byBpbmRpY2F0ZSBob3cgdGhlIHJ1bGUtc2V0IGlzIHJlbmRlcmVkLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gUmVuZGVyVHlwZSB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBydWxlIHJlbmRlcmluZyBzdG9wcyB3aGVuIGEgcnVsZSdzIGV2YWx1YXRpb24gaXMgZmFsc2UgLSBydWxlIGNvbnRhaW5zIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgRXhpdE9uRmlyc3RGYWxzZUV2YWx1YXRpb24sXHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgcnVsZSByZW5kZXJpbmcgc3RvcHMgd2hlbiBhIHJ1bGUncyBldmFsdXRpb24gaXMgdHJ1ZSAobm8gcnVsZSB2aW9sYXRpb25zKS5cclxuICAgKi9cclxuICBFeGl0T25GaXJzdFRydWVFdmFsdWF0aW9uLFxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhhdCBhbGwgcnVsZXMgb2YgdGhlIHJ1bGUgc2V0IGFyZSByZW5kZXJlZCAtIHJldHVybnMgYWxsIHJ1bGUgcmVzdWx0cy5cclxuICAgKi9cclxuICBFdmFsdWF0ZUFsbFJ1bGVzXHJcbn1cclxuIl19