import { IRuleComponent } from './IRuleComponent';
import { RuleResult } from './RuleResult';
import { RenderType } from './RenderType';
import { Severity } from './Severity';

/**
 * This is the base class for all rules. All rules will extend from this class. New rules
 * should extend [SimpleRule] or [CompositeRule] - these rule abstractions extend [RulePolicy].
 */
export class RulePolicy implements IRuleComponent {
  /** Use to indicate the status of the rule. Value is false when the rule contains violations. */
  isValid = true;

  /** Use to indicate the display message for a rule violation. */
  message: string;

  /** Use to indicate the name of the specified rule. */
  name: string;

  /** Use to indicate the priority value of the rule. Higher priority values are evaluated first. */
  priority: number;

  /** The specified rules result. */
  result: RuleResult;

  /** Use to indicate if the rule result is displayable. */
  isDisplayable: boolean;

  /** Use to determine how the rule is evaluated. */
  renderType: RenderType = RenderType.EvaluateAllRules;

  /** Use to indicate the severity for a rule violation. The default severity is [Exception]. */
  severity: Severity = Severity.Exception;

  /** Use to indicate the source of the specified rule. */
  source: string;

  /**
   * Overloaded constructor for the [RulePolicy] class.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param isDisplayable: Indicates if the rule violation is displayble.
   */
  constructor(name: string, message: string, isDisplayable: boolean);
  /**
   * Overloaded constructor for the [RulePolicy] class.
   * @param name The name of the rule.
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param isDisplayable: Indicates if the rule violation is displayble.
   * @param severity (Optional) Use to indicate the rule violation severity. Default is [Exception].
   * @param priority (Optional) Use to indciate the rule's evaluation priority. Higher numeric values are priority. 0 is default and lowest priority.
   */
  constructor(
    name: string,
    message: string,
    isDisplayable: boolean = false,
    severity: Severity = Severity.Exception,
    priority: number = 0
  ) {
    this.name = name;
    this.message = message;
    this.isDisplayable = isDisplayable;
    this.priority = priority;
    this.severity = severity;
  }

  /**
   * Use to execute the rule. This is the [template] method of the [template method] design
   * pattern. It will coordindate the execution of any required methods in the processing
   * pipeline.
   */
  execute(): RuleResult {
    return this.render();
  }

  /**
   * Each rule must implement this function and return a valid [RuleResult].
   */
  render(): RuleResult {
    throw new Error(
      'Each concrete rule must implement this function and return a valid Result.'
    );
  }
}
