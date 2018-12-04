import { Observable } from 'rxjs';
// import { Response } from '@angular/http';
import { ActionResult } from '@angularlicious/actions';

import { SecurityActionBase } from './security-action-base.action';
import { Severity } from '@angularlicious/logging';
import { Credentials } from './../../../security/models/credentials.model';

/**
 * Use this action to validate the user's credentials.
 */
export class ValidateCredentialsAction extends SecurityActionBase {
  

  constructor(private credentials: Credentials) {
    super();
    this.actionName = 'ValidateCredentialsAction ';
    console.log(`Running the [${this.actionName}] constructor.`);
  }

  /**
   * Override this method from the base [Action] class to allow for rules to be added to the
   * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
   * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
   * of the [Action] framework.
   */
  preValidateAction() {
    // add some rules to validate the action;
    console.log(
      `Running the [preValidateAction] for the ${this.actionName} action.`
    );
  }

  /**
   * Use this method to execute business logic - this method is allowed to execute only if the current action
   * does not contain any rule violations.
   */
  performAction() {
    console.log(`Running the [performAction] for the ${this.actionName}.`);
    this.response = this.businessProvider.securityHttpService.validateCredentials(
      this.credentials
    );
  }

  /**
   * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
   */
  validateActionResult(): ActionResult {
    console.log(
      'Running validateActionResult from action...now return an ActionResult'
    );
    if (this.validationContext.hasRuleViolations()) {
      this.businessProvider.loggingService.log(
        this.actionName,
        Severity.Error,
        `The ${this.actionName} contains rule violations.`
      );
    }

    this.actionResult = this.serviceContext.isGood
      ? ActionResult.Success
      : ActionResult.Fail;
    return this.actionResult;
  }
}
