import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { SubscriberItem } from './../../../models/subscriber-item.model';

@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.css']
})
export class SubscriberListComponent extends ComponentBase implements OnInit {
  subscribers: Array<SubscriberItem> = new Array<SubscriberItem>();
  hasSubscribers: boolean;
  subscriberCount: number;
  isRemoved: boolean;

  constructor(loggingService: AngularliciousLoggingService, router: Router) {
    super('SignUpComponent', loggingService, router);
  }

  ngOnInit() {
    this.retrieveSubscribers();
  }

  retrieveSubscribers() {
    // this.subscriberService.retrieveSubscribers().subscribe(
    //   response => this.handleRetrieveSubscribers(response),
    //   error => this.handleServiceErrors(error, this.subscriberService.serviceContext),
    //   () => this.finishRequest(`Finish processing request to retrieve subscribers.`)
    // );
  }

  handleRetrieveSubscribers(response) {
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
          `Successfully processed request to retrieve subscribers.`
        );
        this.subscribers = response.Data;
        if (this.subscribers && this.subscribers.length > 0) {
          this.subscriberCount = this.subscribers.length;
          this.hasSubscribers = true;
        }
      } else {
        // this.handleServiceErrors(response, this.subscriberService.serviceContext);
        this.handleServiceErrors(response);
      }
    }
  }

  removeSubscriber(subscriber: SubscriberItem) {
    if (subscriber) {
      // this.subscriberService.remove(subscriber).subscribe(
      //   response => this.handleRemoveSubscriber(response),
      //   error => this.handleServiceErrors(error, this.subscriberService.serviceContext),
      //   () => this.finishRequest(`Finish processing remove subscriber.`)
      // );
    }
  }

  handleRemoveSubscriber(response) {
    const functionName = 'handleRemoveSubscriber';
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
          `Successfully processed request to remove subscriber.`
        );
        this.isRemoved = response.Data;
        this.hasSubscribers = false;
        this.retrieveSubscribers();
        this.showAlertMessage(`Successfully removed the subscriber.`);
      } else {
        // this.handleServiceErrors(response, this.subscriberService.serviceContext);
        this.handleServiceErrors(response);
      }
    }
  }
}
