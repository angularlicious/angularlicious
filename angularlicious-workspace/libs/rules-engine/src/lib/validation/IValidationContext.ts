import { ValidationContextState } from './ValidationContextState';
import { RuleResult } from '../rules/RuleResult';
import { RulePolicy } from '../rules/RulePolicy';

/**
 * Use this interface class to define the structure of a Validation Context.
 */
export interface IValidationContext {
  /**
   * Use to indicate the status of the validation context. The value is [true] when
   * all rules are evaluated without violations.
   */
  isValid: boolean;
  /**
   * Use to indicate the state of the validation context.
   */
  state: ValidationContextState;
  /**
   * A list of results for all rules evaluated.
   */
  results: Array<RuleResult>;
  /**
   * A list of rules that will be evaluated.
   */
  rules: RulePolicy[];

  /**
   * Implement this method to indicate if the validation context contains any rule violations. Returns [true]
   * when there are one or more rule violations.
   */
  hasRuleViolations(): boolean;

  /**
   * Implement this method to render the rules contained in the validation context.
   */
  renderRules(): IValidationContext;
}
