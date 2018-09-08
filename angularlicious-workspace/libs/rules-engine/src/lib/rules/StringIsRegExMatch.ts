import * as rules from '@angularlicious/rules-engine';
import { CompositeRule } from './CompositeRule';

/**
 * Use this rule to determine if the string value matches the specified
 * regular expression.
 */
export class StringIsRegExMatch extends CompositeRule {
  /**
   * The constructor for the [IsNotNullOrUndefined] rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rules are evaluated against.
   * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
   */
  constructor(
    name: string,
    message: string,
    private target: string,
    private expression: RegExp,
    isDisplayable: boolean
  ) {
    super(name, message, isDisplayable);
    this.configureRules();
  }

  /**
   * Use to configure the rules to be evaluated.
   */
  private configureRules() {
    const showRuleViolations = true;
    const doNotShowRuleViolation = false;

    // determine if the target is a valid object;
    this.rules.push(
      new rules.IsNotNullOrUndefined(
        'StringIsNotNullOrUndefined',
        'The target value is null or undefined.',
        this.target,
        doNotShowRuleViolation
      )
    );
    if (this.target) {
      this.rules.push(
        new rules.IsTrue(
          'StringIsRegExpMatch',
          'The target value is not a match.',
          this.expression.test(this.target),
          doNotShowRuleViolation
        )
      );
    }
  }
}
