import { IValidationContext } from './IValidationContext';
import { ValidationContextState } from './ValidationContextState';
import { RuleResult } from '../rules/RuleResult';
import { RulePolicy } from '../rules/RulePolicy';
/**
 * Use this class to create a new Validation Context for your application. With this
 * context, you can add rules and evaluate the rules.
 *
 * After the rules are evaluated, you can use the Validation Context to determine if there are
 * any rule violations.
 */
export declare class ValidationContext implements IValidationContext {
    /**
     * Use to indicate the state of the validation context.
     */
    state: ValidationContextState;
    /**
     * A list of results for all evaluated rules that belong to the validation context.
     */
    results: Array<RuleResult>;
    /**
     * A list of rules for rendering.
     */
    rules: Array<RulePolicy>;
    /**
     * The source of the specified validation context instance.
     */
    source: string;
    /**
     * The constructor for the base validation context.
     */
    constructor();
    /**
     * Use this method to add a new rule to the ValidationContext.
     */
    addRule(rule: RulePolicy): this;
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param source
     */
    withSource(source: string): this;
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     */
    renderRules(): this;
    /**
     * Use to determine if the validation context has any rule violations.
     */
    hasRuleViolations(): boolean;
    /**
     * *Use to indicate if the validation context is valid - no rule violations.
     */
    readonly isValid: boolean;
}
