import * as rules from '@angularlicious/rules-engine';
import { Severity } from '@angularlicious/logging';
import { CrossCuttingActionBase } from './cross-cutting-action-base.action';

export class CreateHttpApiErrorAction extends CrossCuttingActionBase {
  constructor(
      private errorName: string) {
    super();
    this.actionName = 'CreateHttpApiErrorAction';
  }

  /**
   * Override this method from the base [Action] class to allow for rules to be added to the
   * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
   * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
   * of the [Action] framework.
   */
  preValidateAction() {
    console.log(
      `Running the [preValidateAction] for the ${this.actionName} action.`
    );
    this.validationContext
      .withSource(this.actionName)
      .addRule(
        new rules.StringIsNotNullEmptyRange(
          'NameIsValid',
          'The error name value is not valid. Must be between 1-40 characters.',
          this.errorName,
          2,
          40,
          true
        )
      )
      .addRule(
        new rules.IsFalse(
          'ErrorNameCannotBeLukka',
          'The error name value is not valid. Cannot be [Lukka].',
          (this.errorName.toLowerCase() === 'lukka'),
          true
        )
      );
  }

  /**
   * Use this method to provide business logic implementation - this method is allowed to execute only if the current action
   * does not contain any rule violations.
   */
  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Running the [performAction] for the ${this.actionName}.`);
    this.response = this.businessProvider.apiService.createHttpApiError(this.errorName);;
  }
}
