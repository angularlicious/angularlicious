import { IRuleComponent } from './IRuleComponent';
import { RuleResult } from './RuleResult';
import { RenderType } from './RenderType';
import { Severity } from './Severity';
/**
 * This is the base class for all rules. All rules will extend from this class. New rules
 * should extend [SimpleRule] or [CompositeRule] - these rule abstractions extend [RulePolicy].
 */
export declare class RulePolicy implements IRuleComponent {
    /** Use to indicate the status of the rule. Value is false when the rule contains violations. */
    isValid: boolean;
    /** Use to indicate the display message for a rule violation. */
    message: string;
    /** Use to indicate the name of the specified rule. */
    name: string;
    /** Use to indicate the priority value of the rule. Higher priority values are evaluated first. */
    priority: number;
    /** The specified rules result. */
    result: RuleResult;
    /** Use to indicate if the rule result is displayable. */
    isDisplayable: boolean;
    /** Use to determine how the rule is evaluated. */
    renderType: RenderType;
    /** Use to indicate the severity for a rule violation. The default severity is [Exception]. */
    severity: Severity;
    /** Use to indicate the source of the specified rule. */
    source: string;
    /**
     * Overloaded constructor for the [RulePolicy] class.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param isDisplayable: Indicates if the rule violation is displayble.
     */
    constructor(name: string, message: string, isDisplayable: boolean);
    /**
     * Use to execute the rule. This is the [template] method of the [template method] design
     * pattern. It will coordindate the execution of any required methods in the processing
     * pipeline.
     */
    execute(): RuleResult;
    /**
     * Each rule must implement this function and return a valid [RuleResult].
     */
    render(): RuleResult;
}
