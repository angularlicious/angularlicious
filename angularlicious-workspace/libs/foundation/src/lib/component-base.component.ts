import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  MessageType,
  ServiceContext,
  ServiceMessage
} from '@angularlicious/rules-engine';
import { ErrorResponse } from './models/error-response.model';
import {
  AngularliciousLoggingService,
  Severity
} from '@angularlicious/logging';
import { AlertNotification } from './models/alert-notification.model';
import { AlertTypes } from './models/alert-types.constants';

export class ComponentBase {
  componentName: string;
  alertNotification: AlertNotification;
  navSubscription: Subscription;

  constructor(
    componentName: string,
    public loggingService: AngularliciousLoggingService,
    public router: Router
  ) {
    this.componentName = componentName;
    this.alertNotification = new AlertNotification('', '');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.googleAnalyticsPageview(event);
      }
    });
    // const routerEvent = this.router.events.filter(
    //   event => event instanceof NavigationEnd
    // );
    // if (routerEvent && routerEvent instanceof NavigationEnd) {
    //   this.googleAnalyticsPageview(routerEvent);
    // }
  }

  /**
   * Use to send an analytic event to [Google Analytics].
   * @param category A category is a name that you supply as a way to group objects that you want to track. Typically, you will use the same category name multiple times over related UI elements that you want to group under a given category.
   * @param action Use the action parameter to name the type of event or interaction you want to track for a particular web object (i.e., play, stop, pause, download). A unique event is determined by a unique action name. You can use duplicate action names across categories, but this can affect how unique events are calculated. See the suggestions below and the Implicit Count section for more details.
   * @param label Provide additional information for events that you want to track, such as the movie title in the video examples above, or the name of a file when tracking downloads. All labels are listed independently from their parent categories and actions. This provides you with another useful way to segment the event data for your reports. All labels are listed independently from their parent categories and actions. This provides you with another useful way to segment the event data for your reports.
   * @param value Any numeric value indicating a [value] that will be summarized for the analytic item(s).
   *
   * More information at: https://support.google.com/analytics/answer/1033068
   * or https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  public googleAnalyticsSendEvent(
    category: string,
    action: string,
    label: string,
    value: number
  ) {
    (<any>window).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }

  private googleAnalyticsPageview(event: NavigationEnd) {
    if (event && event.urlAfterRedirects) {
      this.loggingService.log(
        this.componentName,
        Severity.Information,
        `Preparing to set [Google Analytics] page view for [${
          event.urlAfterRedirects
        }].`
      );
      // (<any>window).ga('set', 'page', event.urlAfterRedirects);
      // (<any>window).ga('send', 'pageview');
      // ga('create', 'UA-110194344-1', 'auto', this.componentName);
      // ga(`${this.componentName}.send`, 'pageview');

      // https://blog.thecodecampus.de/angular-2-google-analytics-google-tag-manager/
      // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
      const GA_TRACKING_ID = 'UA-110194344-1';
      // gtag('config', 'GA_TRACKING_ID', {<pageview_parameters>});
      (<any>window).ga('config', GA_TRACKING_ID, {
        page_title: this.componentName,
        page_path: event.urlAfterRedirects
      });
    } else {
      this.loggingService.log(
        this.componentName,
        Severity.Warning,
        `Failed to set [Google Analytics] page view.`
      );
    }
  }

  /**
   * Use to create a simple [ErrorResponse] with the specified message.
   * @param message The message to display to the user.
   */
  createErrorResponse(message: string): ErrorResponse {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to create error response for component.`
    );
    const errorResponse: ErrorResponse = new ErrorResponse();
    errorResponse.Message = message;
    return errorResponse;
  }

  /**
   * Use to handle service errors. These are error response [See: ErrorResponse] from
   * the application business layers (Action(s) or Http) that will bubble up to the
   * caller (i.e., a component) in a specified format:
   *
   * IsSuccess: boolean = false; // default for ErrorResponse
   * Message: string;
   * Errors: Array<ServiceError> = new Array<ServiceError>();
   * Exception: any;
   */
  handleServiceErrors(
    errorResponse: ErrorResponse,
    serviceContext?: ServiceContext
  ) {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to handle service errors for component.`
    );
    if (serviceContext && serviceContext.hasErrors()) {
      this.loggingService.log(
        this.componentName,
        Severity.Information,
        `Retrieving error messages from the ServiceContext/ValidationContext;`
      );
      const messages = this.retrieveServiceContextErrorMessages(serviceContext);
      this.alertNotification = new AlertNotification(
        'Errors',
        errorResponse.Message,
        messages,
        AlertTypes.Warning
      );
    } else {
      if (errorResponse && errorResponse.Message) {
        this.loggingService.log(
          this.componentName,
          Severity.Information,
          `Retrieving error messages from the [ErrorResponse].`
        );
        const errors = this.retrieveResponseErrorMessages(errorResponse);
        this.alertNotification = new AlertNotification(
          'Error',
          errorResponse.Message,
          errors,
          AlertTypes.Warning
        );
        this.loggingService.log(
          this.componentName,
          Severity.Error,
          `Error: ${errorResponse.Message}`
        );
      }
    }
  }

  /**
   * Use to retrieve the error messages from the specified [ServiceContext].
   *
   * @parm: serviceContext: A context object containing messages for the specified request.
   */
  retrieveServiceContextErrorMessages(
    serviceContext: ServiceContext
  ): Array<string> {
    const messages = Array<string>();
    serviceContext.Messages.forEach(e => {
      if (e.MessageType === MessageType.Error && e.DisplayToUser) {
        messages.push(e.Message);
      }
    });
    return messages;
  }

  /**
   * Use to retrieve the error messages from the specified Web API response.
   */
  retrieveResponseErrorMessages(errorResponse: ErrorResponse) {
    const errors = new Array<string>();
    if (errorResponse && errorResponse.Errors) {
      errorResponse.Errors.forEach(e => {
        if (e.DisplayToUser) {
          errors.push(e.Message);
        }
      });
    }
    return errors;
  }

  /**
   * Use to reset the [AlertNotification] to the initial state. Removes
   * existing messages and hides the AlertComponent.
   */
  resetAlertNotifications() {
    this.alertNotification = new AlertNotification('', '');
  }

  /**
   * Use to navigate to the specified route.
   * @parm routeName The name of the target route.
   */
  public routeTo(routeName: string) {
    try {
      this.router.navigate([routeName]);
    } catch (error) {
      this.loggingService.log(
        this.componentName,
        Severity.Error,
        `Error while attempting to navigate to [${routeName}] route from ${
          this.componentName
        }. Error: ${error.toString()}`
      );
    }
  }

  /**
   * Use to retrieve and show any response error messages.
   */
  showResponseErrors(response: ErrorResponse) {
    this.handleServiceErrors(response, undefined);
  }

  finishRequest(message: string): void {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `${this.componentName}: ${message}`
    );
  }

  protected showAlertMessage(message: string): void {
    alert(message);
  }
}
