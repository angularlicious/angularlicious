import { RulePolicy } from './RulePolicy';
import { RuleResult } from './RuleResult';
/**
 * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
 * other rules.
 */
export declare class CompositeRule extends RulePolicy {
    /**
     * Indicates if the rule has any rule violations.
     */
    hasErrors: boolean;
    /**
     * A list of results for evaluated rules. Rules must be rendered/executed before
     * any results are available.
     */
    results: Array<RuleResult>;
    /**
     * A list of rules for the specified composite rule.
     */
    rules: Array<RulePolicy>;
    /**
     *
     * @param name The name of the rule.
     * @param message The message to display if the rule is violated.
     * @param isDisplayable Indicates if the rule is displayable.
     */
    constructor(name: string, message: string, isDisplayable: boolean);
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    render(): RuleResult;
    /**
     * Use to determine if the composite rule has child-rules that are
     * members of the specified rule.
     */
    hasRules(): boolean;
    /**
     * Use to process the results of the specified rule result collection. Composite
     * rules will have one or more rule results for all child-rules.
     *
     * This method will return result with the evaluation summary and rule information.
     */
    processResults(): RuleResult;
}
