import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@angularlicious/foundation';
import {
  AngularliciousLoggingService,
  Severity
} from '@angularlicious/logging';
import { Subscriber } from '../../models/subscriber.model';
import { AngularliciousSecurityService } from '../../security.service';
import { ServiceResponse, ErrorResponse } from '@angularlicious/foundation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bm-register-subscriber',
  templateUrl: './register-subscriber.component.html',
  styleUrls: ['./register-subscriber.component.css']
})
export class RegisterSubscriberComponent extends ComponentBase
  implements OnInit {
  @Output() subscribe = new EventEmitter<ServiceResponse>();
  _form: FormGroup;
  subscriber: Subscriber;

  constructor(
    private securityService: AngularliciousSecurityService,
    loggingService: AngularliciousLoggingService,
    public formBuilder: FormBuilder,
    router: Router
  ) {
    super('RegisterSubscriberComponent', loggingService, router);
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
    this.securityService.resetServiceContext();
    this.subscriber = new Subscriber(
      this._form.value.subscriberName,
      this._form.value.emailAddress
    );
    this.subscribeUser(this.subscriber);
  }

  subscribeUser(subscriber: Subscriber) {
    this.securityService
      .registerSubscriber(subscriber)
      .subscribe(
        (response: ServiceResponse) => this.handleSubscribeUser(response),
        error =>
          this.handleServiceErrors(error, this.securityService.serviceContext),
        () => this.finishRequest(this.componentName)
      );
  }

  handleSubscribeUser(response: ServiceResponse) {
    const functionName = 'handleSubscribeUser';
    const logMessage = `[${functionName}]: Preparing to handle the response from the [SecurityService] in the ${
      this.componentName
    }.`;
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      logMessage
    );
    if (response) {
      if (response.IsSuccess) {
        const successMessage = `Successfully processed request to create subscriber. Prepare to download...`;
        this.loggingService.log(
          this.componentName,
          Severity.Information,
          successMessage
        );
        this.subscribe.emit(response as ServiceResponse);
      } else {
        this.handleServiceErrors(
          // response as ErrorResponse,
          null,
          this.securityService.serviceContext
        );
      }
    }
  }
}
