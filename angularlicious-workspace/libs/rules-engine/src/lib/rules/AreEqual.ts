import { CompareResult } from 'typescript-dotnet-commonjs/System/CompareResult';
import { compare } from 'typescript-dotnet-commonjs/System/Compare';

import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';
import { Primitive } from './Primitive';

/**
 * Use to determine if the target is equal to the comparison target.
 */
export class AreEqual extends SimpleRule {
  /**
   * The target for the rule instance.
   */
  target: Primitive;

  /**
   * The comparison item for the specified rule instance.
   */
  comparison: Primitive;

  /**
   * The constructor for the [AreEqualRule] rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rules are evaluated against.
   * @param comparison The comparison target the rules are evaluated against.
   * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [true].
   */
  constructor(
    name: string,
    message: string,
    target: Primitive,
    comparison: Primitive,
    isDisplayable: boolean = true
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
    if (compare(this.target, this.comparison, true) !== CompareResult.Equal) {
      this.isValid = false;
    }
    return new RuleResult(this, this.target);
  }
}
