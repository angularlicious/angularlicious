import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';

/**
 * Use to indicate if the value is falsy.
 */
export class IsFalse extends SimpleRule {
  /**
   * Use to indicate the target value to evaluate.
   */
  target: boolean;

  /**
   * The constructor for the [IsFalse] rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rules are evaluated against.
   * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
   */
  constructor(
    name: string,
    message: string,
    target: boolean,
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
    if (this.target) {
      //if(true)-->false;
      this.isValid = false;
    }
    return new RuleResult(this, this.target);
  }
}
