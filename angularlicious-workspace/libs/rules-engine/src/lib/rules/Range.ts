import { CompareResult } from 'typescript-dotnet-commonjs/System/CompareResult';
import { compare } from 'typescript-dotnet-commonjs/System/Compare';

import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';
import { Primitive } from './Primitive';

import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';
import { Min } from './Min';
import { Max } from './Max';

/**
 * Use this rule to determine if the specified target is within the specified range (start and end) values.
 *
 * The range values are inclusive.
 *
 * Ex: 1 is within 1 and 3. The target is valid.
 * Ex: 2 is within 1 and 3. The target is valid.
 * Ex: 0 is not within 1 and 3. The target is not valid.
 * Ex: 4 is not within 1 and 3. The target is not valid.
 */
export class Range extends CompositeRule {
  /**
   * Use to indicate the end value of the range.
   */
  end: number;
  /**
   * Use to indicate the start value of the range.
   */
  start: number;
  /**
   * Use to indicate the [primitive] value that will be evaluated. The value
   * must be within the [start] and the [end] value to be valid.
   */
  target: Primitive;

  /**
   * Constructor for the [Range] rule.
   * @param name The name of the rule.
   * @param message: A message to display if the rule is violated.
   * @param target The target object that the rules will be applied to.
   * @param start The start range value - the lowest allowed boundary value.
   * @param end The end range value - the highest allowed boundary value.
   * @param isDisplayable: (Optional) Indicates if the rule violation may be displayed or visible to the caller or client. Default is [false].
   */
  constructor(
    name: string,
    message: string,
    target: Primitive,
    start: number,
    end: number,
    isDisplayable: boolean = false
  ) {
    super(name, message, isDisplayable);
    this.target = target;
    this.start = start;
    this.end = end;
    this.isDisplayable = isDisplayable;

    this.rules.push(
      new IsNotNullOrUndefined(
        'TargetIsNotNull',
        'The target is null or undefined.',
        this.target
      )
    );

    if (this.target != null) {
      this.rules.push(
        new Min(
          'MinValue',
          'The value must be equal to or greater than the start range value.',
          this.target,
          this.start
        )
      );
      this.rules.push(
        new Max(
          'MaxValue',
          'The value must be equal to or less than the end range value.',
          this.target,
          this.end
        )
      );
    }
  }
}
