import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertComponent } from '@angularlicious/core';
import {
  AlertNotification,
  AlertTypes,
  ComponentBase
} from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
// import { SecurityService } from './../../../modules/security/security.service';
import { ConfirmationToken } from './../../../modules/security/models/confirmation-token.model';

@Component({
  selector: 'app-subscriber-confirmation',
  templateUrl: './subscriber-confirmation.component.html',
  styleUrls: ['./subscriber-confirmation.component.css']
})
export class SubscriberConfirmationComponent extends ComponentBase
  implements OnInit {
  _form: FormGroup;
  formTitle: string;
  email = '';
  confirmationToken = '';

  constructor(
    public formBuilder: FormBuilder,
    loggingService: AngularliciousLoggingService,
    // private securityService: SecurityService,
    private route: ActivatedRoute,
    router: Router
  ) {
    super('SubscriberConfirmationComponent', loggingService, router);
  }

  ngOnInit() {
    this.loggingService.log(
      this.componentName,
      Severity.Warning,
      `Running [ngOnInit] for ${this.componentName}`
    );
    this.retrieveQueryParams();
  }

  retrieveQueryParams() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to retrieve the [queryParams] from ${this.componentName}.`
    );
    try {
      this.route.params
        .pipe((params: Params) => params['email'])
        .subscribe(
          response => this.handleEmailParam(response),
          error => this.handleServiceErrors(error),
          () => this.finishRequest('retrieveQueryParams')
        );

      this.route.params
        .pipe((params: Params) => params['confirmationToken'])
        .subscribe(
          response => this.handleConfirmationTokenParam(response),
          error => this.handleServiceErrors(error),
          () => this.finishRequest('retrieveQueryParams')
        );
    } catch (error) {
      this.handleServiceErrors(error);
    }
  }

  handleConfirmationTokenParam(response) {
    if (response) {
      this.confirmationToken = response;
      this.buildForm(); // begin form build after the params are retrieved from the url;
    }
  }

  handleEmailParam(response) {
    if (response) {
      this.email = response;
    }
  }

  /**
   * Use to build the form for the specified target entity.
   */
  buildForm() {
    this.formTitle = 'Confirm Subscription';
    this._form = this.formBuilder.group({
      // Add form members here:
      UserName: [this.email, Validators.required],
      ConfirmationToken: [this.confirmationToken, Validators.required]
    });
  }

  submitForm() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Form: {form | json}`
    );
    this.resetAlertNotifications();
    const token = new ConfirmationToken(
      this._form.value.UserName,
      this._form.value.ConfirmationToken
    );
    // this.securityService.confirmSubscription(token).subscribe(
    //   response => this.handleSubmit(response),
    //   error => this.handleServiceErrors(error, this.securityService.serviceContext),
    //   () => this.finishRequest(this.componentName)
    // );
  }

  handleSubmit(response) {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to handle the response.`
    );
    if (response) {
      if (response.IsSuccess) {
        this.routeTo('home');
      } else {
        this.loggingService.log(
          this.componentName,
          Severity.Error,
          `${this.componentName}; Status is fail.`
        );
        this.showResponseErrors(response);
      }
    } else {
      this.loggingService.log(
        this.componentName,
        Severity.Error,
        'Unexpected service error...I guess the application pooped its pants, ouch!!'
      );
    }
  }
}
