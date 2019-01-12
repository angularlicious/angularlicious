import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { Subscriber } from '@angularlicious/security';

@Component({
  selector: 'app-modal-large',
  templateUrl: './modal-large.component.html',
  styleUrls: ['./modal-large.component.css']
})
export class ModalLargeComponent extends ComponentBase implements OnInit {
  _form: FormGroup;
  subscriber: Subscriber;
  showDownloadButton: boolean;
  // @ViewChild('staticModal') public staticModal: any;

  constructor(
    loggingService: AngularliciousLoggingService,
    public formBuilder: FormBuilder,
    router: Router
  ) {
    super('ModalLargeComponent', loggingService, router);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
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
    console.log(`subscribing user...`);
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
        this.downloadBook();
      } else {
        // this.handleServiceErrors(response, this.subscriberService.serviceContext);
        this.handleServiceErrors(response);
      }
    }
  }

  downloadBook() {
    const ebookUrl =
      'https://drive.google.com/file/d/19J8eWKc1ff7CA2KgGTHxMOFYe9UVsmg2/view?usp=sharing';
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to open new window: ${ebookUrl}.`
    );
    window.open(ebookUrl, '_blank');
  }
}
