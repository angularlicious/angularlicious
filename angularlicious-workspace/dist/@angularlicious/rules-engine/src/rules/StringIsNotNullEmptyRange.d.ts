import { Primitive } from './Primitive';
import { CompositeRule } from './CompositeRule';
/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
export declare class StringIsNotNullEmptyRange extends CompositeRule {
    /**
     * Use to indicate the maximum length of the target value.
     */
    maxLength: number;
    /**
     * Use to indicate the minimum lenth of the target value.
     */
    minLength: number;
    /**
     * Use to provide the target [Primitive] to evaluate for the specified rule.
     */
    target: Primitive;
    /**
     * The constructor for the [StringIsNotNullEmptyRangeRule].
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rule(s) will be evaluated against.
     * @param minLength The minimum allowed length of the target value.
     * @param maxLength The maximum allowed length of the target value.
     */
    constructor(name: string, message: string, target: Primitive, minLength: number, maxLength: number, isDisplayable?: boolean);
    /**
     * A helper method to configure/add rules to the validation context.
     */
    configureRules(): void;
}
