import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs';

// import { Response } from '@angular/http';
import { ActionResult } from '@angularlicious/actions';
import * as rules from '@angularlicious/rules-engine';

import { HttpBaseService } from '@angularlicious/foundation';
import { Severity } from '@angularlicious/logging';
import { SecurityActionBase } from './security-action-base.action';

// import action specific items:
import { ConfirmationToken } from '../../models/confirmation-token.model';

export class ConfirmUserAccountAction extends SecurityActionBase {
  
  httpBase: HttpBaseService;

  constructor(private confirmationToken: ConfirmationToken) {
    super();
    this.actionName = 'ConfirmUserAccountAction';
  }

  /**
   * Override this method from the base [Action] class to allow for rules to be added to the
   * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
   * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
   * of the [Action] framework.
   */
  preValidateAction() {
    // add some rules to validate the action;
    // required: FirstName, LastName, Password
    // rule: Password value must match the PasswordCopy value;
    this.validationContext
      .addRule(
        new rules.StringIsNotNullEmptyRange(
          'UserNameIsValid',
          'The username value is not valid. Must be between 1-25 characters.',
          this.confirmationToken.UserName,
          1,
          25,
          true
        )
      )
      .addRule(
        new rules.StringIsNotNullEmptyRange(
          'ConfirmationTokenIsValid',
          'The confirmation token value is not valid. Must be between 1-25 characters.',
          this.confirmationToken.ConfirmationToken,
          1,
          25,
          true
        )
      );
    console.log(
      `Running the [preValidateAction] for the ${this.actionName} action.`
    );
  }

  /**
   * Use this method to provice business logic implementation - this method is allowed to execute only if the current action
   * does not contain any rule violations.
   */
  performAction() {
    this.loggingService.log(
      this.actionName,
      Severity.Information,
      `Running the [performAction] for the ${this.actionName}.`
    );
    this.response = this.businessProvider.securityHttpService.confirmUserAccount(
      this.confirmationToken
    );
  }

  /**
   * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
   */
  validateActionResult(): ActionResult {
    this.loggingService.log(
      this.actionName,
      Severity.Information,
      `Running [validateActionResult] for ${this.actionName}.`
    );
    if (this.validationContext.hasRuleViolations()) {
      this.businessProvider.loggingService.log(
        this.actionName,
        Severity.Error,
        `The ${this.actionName} contains rule violations.`
      );
      this.actionResult = ActionResult.Fail;
      this.response = Observable.throw(
        new Error('There are validation error(s).')
      );
      return;
    }
    this.actionResult = this.serviceContext.isGood
      ? ActionResult.Success
      : ActionResult.Fail;
    return this.actionResult;
  }
}
