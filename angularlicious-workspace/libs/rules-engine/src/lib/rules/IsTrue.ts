import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';

/**
 * Use to determine if the target is truthy.
 */
export class IsTrue extends SimpleRule {
  /**
   * The target for the specified rule evaluation.
   */
  target: boolean;

  /**
   * The constructor for the [IsTrue] rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rules are evaluated against.
   * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [true].
   */
  constructor(
    name: string,
    message: string,
    target: boolean,
    isDisplayable: boolean = true
  ) {
    super(name, message, isDisplayable);
    this.target = target;
  }

  /**
   * Use to render the evaluated result for the specified rule. This method
   * returns a [RuleResult] with the evaluated result and rule information.
   */
  render(): RuleResult {
    this.isValid = true;
    if (this.target === false) {
      //if(not true)-->false;
      this.isValid = false;
    }
    return new RuleResult(this, this.target);
  }
}
