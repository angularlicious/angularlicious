import { CompareResult } from 'typescript-dotnet-commonjs/System/CompareResult';
import { compare } from 'typescript-dotnet-commonjs/System/Compare';

import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';
import { Primitive } from './Primitive';

import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';
import { Range } from './Range';

/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
export class StringIsNotNullEmptyRange extends CompositeRule {
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
  constructor(
    name: string,
    message: string,
    target: Primitive,
    minLength: number,
    maxLength: number,
    isDisplayable: boolean = false
  ) {
    super(name, message, isDisplayable);
    this.target = target;
    this.minLength = minLength;
    this.maxLength = maxLength;

    this.configureRules();
  }

  /**
   * A helper method to configure/add rules to the validation context.
   */

  configureRules() {
    this.rules.push(
      new IsNotNullOrUndefined(
        'StringIsNotNull',
        'The string target is null or undefined.',
        this.target
      )
    );
    if (this.target != null) {
      this.rules.push(
        new Range(
          'TargetLengthIsWithinRange',
          'The string value is not within the specified range.',
          this.target.toString().length,
          this.minLength,
          this.maxLength
        )
      );
    }
  }
}
