import { CompareResult } from 'typescript-dotnet-commonjs/System/CompareResult';
import { compare } from 'typescript-dotnet-commonjs/System/Compare';

import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';
import { Primitive } from './Primitive';

/**
 * Use the [Min] rule to determine if the target value is equal to or greater than the minimum
 * allowed value [comparison].
 */
export class Min extends SimpleRule {
  /**
   * The target for the rule instance.
   */
  target: Primitive;

  /**
   * The comparison item for the specified rule instance.
   */
  comparison: Primitive;

  /**
   * The constructor for the [Min] rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rules are evaluated against.
   * @param comparison The comparison target the rules are evaluated against.
   * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
   */
  constructor(
    name: string,
    message: string,
    target: Primitive,
    comparison: Primitive,
    isDisplayable: boolean = false
  ) {
    super(name, message, isDisplayable);
    this.target = target;
    this.comparison = comparison;
  }

  /**
   * Use to render the evaluated result for the specified rule. This method
   * returns a [RuleResult] with the evaluated result and rule information.
   */
  render(): RuleResult {
    const compareResult = compare(this.target, this.comparison, true);
    if (compareResult === CompareResult.Less) {
      this.isValid = false; //must be equal to or greater than the comparison value;
    }
    return new RuleResult(this, this.target);
  }
}
