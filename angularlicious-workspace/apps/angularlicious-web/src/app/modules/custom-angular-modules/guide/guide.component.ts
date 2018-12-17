import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

/**
 * Import Analytic Constants;
 */
import { Analytics } from './../../../models/analytics.model';
import { AnalyticCategories } from './../../../models/analytics-categories.model';
import { AnalyticActions } from './../../../models/analytics-actions.model';
import { AnalyticLabels } from './../../../models/analytics-labels.model';

import { Subscriber } from '@angularlicious/security';
import { ServiceResponse, ErrorResponse } from '@angularlicious/foundation';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html'
})
export class GuideComponent extends ComponentBase implements OnInit {
  _form: FormGroup;
  subscriber: Subscriber;
  showSubscribeForm: boolean;
  showDownloadButton: boolean;

  constructor(
    loggingService: AngularliciousLoggingService,
    public formBuilder: FormBuilder,
    router: Router
  ) {
    super('GuideComponent', loggingService, router);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.showSubscribeForm = true;
    this._form = this.formBuilder.group({
      subscriberName: ['', Validators.required],
      emailAddress: ['', Validators.required]
    });
  }

  submitForm() {
    this.subscriber = new Subscriber(
      this._form.value.subscriberName,
      this._form.value.emailAddress
    );
    this.subscribeUser(this.subscriber);
  }

  subscribeUser(subscriber: Subscriber) {
    // this.subscriberService.registerSubscriber(subscriber).subscribe(
    //   response => this.handleSubscribeUser(response),
    //   error => this.handleServiceErrors(error, this.subscriberService.serviceContext),
    //   () => this.finishRequest(this.componentName)
    // );
  }

  handleSubscribeUser(response) {
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
        this.showDownloadButton = true;
        this.showSubscribeForm = false;
      } else {
        this.handleServiceErrors(response);
      }
    }
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
        this.showDownloadButton = true;
        this.showSubscribeForm = false;
        this.downloadBook();
      } else {
        // this.handleServiceErrors(response as ErrorResponse, this.subscriberService.serviceContext);
        this.handleServiceErrors(response as ErrorResponse);
      }
    }
  }

  downloadBook() {
    this.createDownloadAnalyticEvent();
    const ebookUrl =
      'https://drive.google.com/file/d/19J8eWKc1ff7CA2KgGTHxMOFYe9UVsmg2/view?usp=sharing';
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to open new window: ${ebookUrl}.`
    );
    window.open(ebookUrl, '_blank');
  }

  createDownloadAnalyticEvent() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to create analytic event. Downloading...the guide.`
    );
    const category = AnalyticCategories.Downloads;
    const action = AnalyticActions.Downloaded;
    const label = AnalyticLabels.AngularModulesGuide;
    const value = 1;
    this.googleAnalyticsSendEvent(category, action, label, value);
  }
}
