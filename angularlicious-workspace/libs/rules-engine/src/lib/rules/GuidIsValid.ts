import { StringIsRegExMatch } from './StringIsRegExMatch';
import * as rules from '@angularlicious/rules-engine';
import { CompositeRule } from './CompositeRule';

/**
 * Use this rule to validate the target to determine if it is a valid
 * GUID value.
 */
export class GuidIsValid extends CompositeRule {
  /**
   * Construcctor for the [GuidIsValid] composite rule.
   * @param name Use to indicate the name of the rule.
   * @param message Use to indiate the message to display for a false evaluation.
   * @param target Use to specify the target value to evalute.
   * @param isDisplayable Use to indicate if the rule result is displayable.
   */
  constructor(
    name: string,
    message: string,
    private target: string,
    isDisplayable: boolean
  ) {
    super(name, message, isDisplayable);
    this.configureRules();
  }

  /**
   * Use to configure the rules for evaluation.
   */
  private configureRules() {
    const showRuleViolations = true;
    const doNotShowRuleViolation = false;

    const guidLength = 36; // Length with hyphens.
    const guidExpression = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i; // Guid RegExp (with hyphens)

    // determine if the target is a valid guid;
    this.rules.push(
      new rules.IsNotNullOrUndefined(
        'GuidStringIsNotNullOrUndefined',
        'The target value is null or undefined.',
        this.target,
        doNotShowRuleViolation
      )
    );
    if (this.target) {
      this.rules.push(
        new rules.AreEqual(
          'GuidStringLengthIsValid',
          'The length of the target value is not valid.',
          this.target.length,
          guidLength,
          doNotShowRuleViolation
        )
      );
      this.rules.push(
        new StringIsRegExMatch(
          'GuidIsValid',
          'The target value is not a valid guid.',
          this.target,
          guidExpression,
          doNotShowRuleViolation
        )
      );
    }
  }
}
