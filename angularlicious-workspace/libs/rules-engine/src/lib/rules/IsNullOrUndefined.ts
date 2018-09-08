import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';

/**
 * Use to determine if the target is [null] or [undefined].
 */
export class IsNullOrUndefined extends SimpleRule {
  /**
   * The target for the specified rule evaluation.
   */
  target;

  /**
   * The constructor for the [IsNullOrUndefined] rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rules are evaluated against.
   * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
   */
  constructor(
    name: string,
    message: string,
    target: any,
    isDisplayable: boolean = false
  ) {
    super(name, message, isDisplayable);
    this.target = target;
  }

  /**
   * Use to render the evaluated result for the specified rule. This method
   * returns a [RuleResult] with the evaluated result and rule information.
   */
  render(): RuleResult {
    if (
      this.target == null ||
      typeof this.target === undefined ||
      typeof this.target === 'undefined'
    ) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    return new RuleResult(this, this.target);
  }
}
