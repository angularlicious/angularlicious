import { RuleResult } from './RuleResult';

/**
 * An interface that defines the required shape/structure for all rules. The rule engine
 * implements a Composite pattern for the rules.
 */
export interface IRuleComponent {
  /**
   * Implement this method to begin the execution of a rule. The return value
   * is a [RuleResult].
   */
  execute(): RuleResult;
}
