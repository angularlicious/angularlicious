import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

// // import { Response } from '@angular/http';
import { ActionResult } from '@angularlicious/actions';
import * as rules from '@angularlicious/rules-engine';

import {
  HttpBaseService,
  ServiceResponse,
  ErrorResponse
} from '@angularlicious/foundation';
import { Severity } from '@angularlicious/logging';

import { Subscriber } from './../../models/subscriber.model';
import { SecurityActionBase } from './security-action-base.action';
import { HttpResponse } from '@angular/common/http';

export class RegisterSubscriberAction extends SecurityActionBase {
  constructor(private subscriber: Subscriber) {
    super();
    this.actionName = 'RegisterSubscriberAction';
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
          'The name value is not valid. Must be between 1-40 characters.',
          this.subscriber.Name,
          2,
          40,
          true
        )
      )
      .addRule(
        new rules.StringIsNotNullEmptyRange(
          'EmailIsValid',
          'The email address value is not valid. Must be between 5-60 characters.',
          this.subscriber.EmailAddress,
          5,
          60,
          true
        )
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
    this.response = this.businessProvider.securityApiService.registerSubscriber(
      this.subscriber
    );
  }
}
