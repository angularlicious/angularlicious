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
import { UserAccount } from '../../models/user-account.model';

export class CreateUserAccountAction extends SecurityActionBase {
  httpBase: HttpBaseService;

  constructor(private userAccount: UserAccount) {
    super();
    this.actionName = 'CreateUserAccountAction';
  }

  /**
   * Override this method from the base [Action] class to allow for rules to be added to the
   * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
   * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
   * of the [Action] framework.
   */
  preValidateAction() {
    // add some rules to validate the action;

    this.validationContext
      .addRule(
        new rules.StringIsNotNullEmptyRange(
          'FirstNameIsValid',
          'The first name value is not valid. Must be between 2-25 characters.',
          this.userAccount.FirstName,
          2,
          25,
          true
        )
      )
      .addRule(
        new rules.StringIsNotNullEmptyRange(
          'LastNameIsValid',
          'The last name value is not valid. Must be between 2-25 characters.',
          this.userAccount.LastName,
          2,
          25,
          true
        )
      )
      .addRule(
        new rules.StringIsNotNullEmptyRange(
          'PasswordIsValid',
          'The password is required.',
          this.userAccount.Password,
          6,
          25,
          true
        )
      )
      .addRule(
        new rules.AreEqual(
          'PasswordMatchesPasswordCopy',
          'The passwords do not match.',
          this.userAccount.Password,
          this.userAccount.PasswordCopy,
          true
        )
      );
    console.log(
      `Running the [preValidateAction] for the ${this.actionName} action.`
    );
  }

  /**
   * Use this method to provide business logic implementation - this method is allowed to execute only if the current action
   * does not contain any rule violations.
   */
  performAction() {
    this.loggingService.log(
      this.actionName,
      Severity.Information,
      `Running the [performAction] for the ${this.actionName}.`
    );
    this.response = this.businessProvider.securityHttpService.createUserAccount(
      this.userAccount
    );
  }
}
