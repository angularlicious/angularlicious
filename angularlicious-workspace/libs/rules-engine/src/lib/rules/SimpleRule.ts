import { RulePolicy } from './RulePolicy';

/**
 * Use this class as a base [extends] class for simple rules. A simple contains
 * a single rule and target to evaluate.
 *
 * If you require a rule that will contain more than one rule, you should
 * use extend the [CompositeRule] class.
 */
export class SimpleRule extends RulePolicy {
  /**
   * The constructor for the simple rule.
   * @param name The name of the rule.
   * @param message The message to display if the rule is violated.
   */
  constructor(name: string, message: string, isDisplayable: boolean) {
    super(name, message, isDisplayable);
  }
}
