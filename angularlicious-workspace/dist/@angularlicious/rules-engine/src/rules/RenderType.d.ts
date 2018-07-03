/**
 * Use to indicate how the rule-set is rendered.
 */
export declare enum RenderType {
    /**
     * Use to indicate the rule rendering stops when a rule's evaluation is false - rule contains violations.
     */
    ExitOnFirstFalseEvaluation = 0,
    /**
     * Use to indicate the rule rendering stops when a rule's evalution is true (no rule violations).
     */
    ExitOnFirstTrueEvaluation = 1,
    /**
     * Use to indicate that all rules of the rule set are rendered - returns all rule results.
     */
    EvaluateAllRules = 2,
}
