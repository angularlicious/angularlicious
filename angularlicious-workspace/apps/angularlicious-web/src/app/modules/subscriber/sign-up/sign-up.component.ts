import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

/**
 * Import Analytic;
 */
import { Analytics } from '../../../models/analytics.model';
import { AnalyticCategories } from '../../../models/analytics-categories.model';
import { AnalyticActions } from '../../../models/analytics-actions.model';
import { AnalyticLabels } from '../../../models/analytics-labels.model';

import { ServiceResponse, ErrorResponse } from '@angularlicious/foundation';
import { Subscriber } from '@angularlicious/security';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends ComponentBase implements OnInit {
  subscriber: Subscriber;
  showSubscribeForm: boolean;
  showMessage: boolean;
  statusMessage: string;
  _form: FormGroup;

  constructor(
    loggingService: AngularliciousLoggingService,
    public formBuilder: FormBuilder,
    router: Router
  ) {
    super('SignUpComponent', loggingService, router);
  }

  ngOnInit() {
    this.showSubscribeForm = true;
    this.showMessage = false;
  }

  /**
   * Use to handle the service response from the [AngularliciousSecurityModule].
   * @param response the response from the security module.
   */
  handleSubscribe(response: ServiceResponse | ErrorResponse) {
    const functionName = 'handleSubscribeUser';
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `[${functionName}]: Preparing to handle the response from the [SecurityService] in the ${
        this.componentName
      }.`
    );
    if (response) {
      if (response.IsSuccess) {
        this.loggingService.log(
          this.componentName,
          Severity.Information,
          `Successfully processed request to create subscriber. Prepare to download...`
        );

        // analytic event(s);
        this.addSubscriberAnalyticEvent();
        this.setSubscriberCookie(true);

        // SHOW SUCCESS MESSAGE TO USER;
        this.showSubscribeForm = false;
        this.statusMessage = `Thanks...glad to have you along. Please check your email to complete your subscription.`;
        this.showMessage = true;
      } else {
        this.handleServiceErrors(response as ErrorResponse);
      }
    }
  }

  /**
   * Use to create a analytic event for the successful subscription.
   */
  addSubscriberAnalyticEvent() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to create analytic event: Subscription.`
    );
    const category = AnalyticCategories.Subscriptions;
    const action = AnalyticActions.Subscribed;
    const label = AnalyticLabels.SubscribeForm;
    const value = 1;
    this.googleAnalyticsSendEvent(category, action, label, value);
  }

  /**
   * Use to set cookie for new subscriber; use to check for subsequent visits to enable resources for subscribers.
   * @param isSubscriber
   */
  setSubscriberCookie(isSubscriber: boolean) {
    // TODO: LEARN HOW TO SET A COOKIE TO TRACK THE SUBSCRIBER;
    // CONSIDER SETTING A JAVASCRIPT COOKIE...YOU KNOW WHAT THAT IS, RIGHT?
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `CONSIDER SETTING A JAVASCRIPT COOKIE...YOU KNOW WHAT THAT IS, RIGHT?`
    );
  }
}
