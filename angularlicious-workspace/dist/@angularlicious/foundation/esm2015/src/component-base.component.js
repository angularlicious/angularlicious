/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { MessageType } from '@angularlicious/rules-engine';
import { ErrorResponse } from './models/error-response.model';
import { Severity } from '@angularlicious/logging';
import { AlertNotification } from './models/alert-notification.model';
import { AlertTypes } from './models/alert-types.constants';
export class ComponentBase {
    /**
     * @param {?} componentName
     * @param {?} loggingService
     * @param {?} router
     */
    constructor(componentName, loggingService, router) {
        this.loggingService = loggingService;
        this.router = router;
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
     * @param {?} category A category is a name that you supply as a way to group objects that you want to track. Typically, you will use the same category name multiple times over related UI elements that you want to group under a given category.
     * @param {?} action Use the action parameter to name the type of event or interaction you want to track for a particular web object (i.e., play, stop, pause, download). A unique event is determined by a unique action name. You can use duplicate action names across categories, but this can affect how unique events are calculated. See the suggestions below and the Implicit Count section for more details.
     * @param {?} label Provide additional information for events that you want to track, such as the movie title in the video examples above, or the name of a file when tracking downloads. All labels are listed independently from their parent categories and actions. This provides you with another useful way to segment the event data for your reports. All labels are listed independently from their parent categories and actions. This provides you with another useful way to segment the event data for your reports.
     * @param {?} value Any numeric value indicating a [value] that will be summarized for the analytic item(s).
     *
     * More information at: https://support.google.com/analytics/answer/1033068
     * or https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     * @return {?}
     */
    googleAnalyticsSendEvent(category, action, label, value) {
        (/** @type {?} */ (window)).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    googleAnalyticsPageview(event) {
        if (event && event.urlAfterRedirects) {
            this.loggingService.log(this.componentName, Severity.Information, `Preparing to set [Google Analytics] page view for [${event.urlAfterRedirects}].`);
            // (<any>window).ga('set', 'page', event.urlAfterRedirects);
            // (<any>window).ga('send', 'pageview');
            // ga('create', 'UA-110194344-1', 'auto', this.componentName);
            // ga(`${this.componentName}.send`, 'pageview');
            // https://blog.thecodecampus.de/angular-2-google-analytics-google-tag-manager/
            // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
            const /** @type {?} */ GA_TRACKING_ID = 'UA-110194344-1';
            // gtag('config', 'GA_TRACKING_ID', {<pageview_parameters>});
            (/** @type {?} */ (window)).ga('config', GA_TRACKING_ID, {
                page_title: this.componentName,
                page_path: event.urlAfterRedirects
            });
        }
        else {
            this.loggingService.log(this.componentName, Severity.Warning, `Failed to set [Google Analytics] page view.`);
        }
    }
    /**
     * Use to create a simple [ErrorResponse] with the specified message.
     * @param {?} message The message to display to the user.
     * @return {?}
     */
    createErrorResponse(message) {
        this.loggingService.log(this.componentName, Severity.Information, `Preparing to create error response for component.`);
        const /** @type {?} */ errorResponse = new ErrorResponse();
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
     * @param {?} errorResponse
     * @param {?=} serviceContext
     * @return {?}
     */
    handleServiceErrors(errorResponse, serviceContext) {
        this.loggingService.log(this.componentName, Severity.Information, `Preparing to handle service errors for component.`);
        if (serviceContext && serviceContext.hasErrors()) {
            this.loggingService.log(this.componentName, Severity.Information, `Retrieving error messages from the ServiceContext/ValidationContext;`);
            const /** @type {?} */ messages = this.retrieveServiceContextErrorMessages(serviceContext);
            this.alertNotification = new AlertNotification('Errors', errorResponse.Message, messages, AlertTypes.Warning);
        }
        else {
            if (errorResponse && errorResponse.Message) {
                this.loggingService.log(this.componentName, Severity.Information, `Retrieving error messages from the [ErrorResponse].`);
                const /** @type {?} */ errors = this.retrieveResponseErrorMessages(errorResponse);
                this.alertNotification = new AlertNotification('Error', errorResponse.Message, errors, AlertTypes.Warning);
                this.loggingService.log(this.componentName, Severity.Error, `Error: ${errorResponse.Message}`);
            }
        }
    }
    /**
     * Use to retrieve the error messages from the specified [ServiceContext].
     *
     * \@parm: serviceContext: A context object containing messages for the specified request.
     * @param {?} serviceContext
     * @return {?}
     */
    retrieveServiceContextErrorMessages(serviceContext) {
        const /** @type {?} */ messages = Array();
        serviceContext.Messages.forEach(e => {
            if (e.MessageType === MessageType.Error && e.DisplayToUser) {
                messages.push(e.Message);
            }
        });
        return messages;
    }
    /**
     * Use to retrieve the error messages from the specified Web API response.
     * @param {?} errorResponse
     * @return {?}
     */
    retrieveResponseErrorMessages(errorResponse) {
        const /** @type {?} */ errors = new Array();
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
     * @return {?}
     */
    resetAlertNotifications() {
        this.alertNotification = new AlertNotification('', '');
    }
    /**
     * Use to navigate to the specified route.
     * \@parm routeName The name of the target route.
     * @param {?} routeName
     * @return {?}
     */
    routeTo(routeName) {
        try {
            this.router.navigate([routeName]);
        }
        catch (/** @type {?} */ error) {
            this.loggingService.log(this.componentName, Severity.Error, `Error while attempting to navigate to [${routeName}] route from ${this.componentName}. Error: ${error.toString()}`);
        }
    }
    /**
     * Use to retrieve and show any response error messages.
     * @param {?} response
     * @return {?}
     */
    showResponseErrors(response) {
        this.handleServiceErrors(response, undefined);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    finishRequest(message) {
        this.loggingService.log(this.componentName, Severity.Information, `${this.componentName}: ${message}`);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    showAlertMessage(message) {
        alert(message);
    }
}
function ComponentBase_tsickle_Closure_declarations() {
    /** @type {?} */
    ComponentBase.prototype.componentName;
    /** @type {?} */
    ComponentBase.prototype.alertNotification;
    /** @type {?} */
    ComponentBase.prototype.navSubscription;
    /** @type {?} */
    ComponentBase.prototype.loggingService;
    /** @type {?} */
    ComponentBase.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50LWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQVUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTywwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQ0wsV0FBVyxFQUdaLE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBZ0MsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTVELE1BQU07Ozs7OztJQUtKLFlBQ0UsYUFBcUIsRUFDZCxnQkFDQTtRQURBLG1CQUFjLEdBQWQsY0FBYztRQUNkLFdBQU0sR0FBTixNQUFNO1FBRWIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JDO1NBQ0YsQ0FBQyxDQUFDOzs7Ozs7O0tBT0o7Ozs7Ozs7Ozs7OztJQVlNLHdCQUF3QixDQUM3QixRQUFnQixFQUNoQixNQUFjLEVBQ2QsS0FBYSxFQUNiLEtBQWE7UUFFYixtQkFBTSxNQUFNLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUNsQyxjQUFjLEVBQUUsUUFBUTtZQUN4QixXQUFXLEVBQUUsS0FBSztZQUNsQixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQzs7Ozs7O0lBR0csdUJBQXVCLENBQUMsS0FBb0I7UUFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLHNEQUNFLEtBQUssQ0FBQyxpQkFDUixJQUFJLENBQ0wsQ0FBQzs7Ozs7OztZQVFGLHVCQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQzs7WUFFeEMsbUJBQU0sTUFBTSxFQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUU7Z0JBQ3pDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDOUIsU0FBUyxFQUFFLEtBQUssQ0FBQyxpQkFBaUI7YUFDbkMsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsYUFBYSxFQUNsQixRQUFRLENBQUMsT0FBTyxFQUNoQiw2Q0FBNkMsQ0FDOUMsQ0FBQztTQUNIOzs7Ozs7O0lBT0gsbUJBQW1CLENBQUMsT0FBZTtRQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIsbURBQW1ELENBQ3BELENBQUM7UUFDRix1QkFBTSxhQUFhLEdBQWtCLElBQUksYUFBYSxFQUFFLENBQUM7UUFDekQsYUFBYSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQztLQUN0Qjs7Ozs7Ozs7Ozs7Ozs7SUFZRCxtQkFBbUIsQ0FDakIsYUFBNEIsRUFDNUIsY0FBK0I7UUFFL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLG1EQUFtRCxDQUNwRCxDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLHNFQUFzRSxDQUN2RSxDQUFDO1lBQ0YsdUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsQ0FDNUMsUUFBUSxFQUNSLGFBQWEsQ0FBQyxPQUFPLEVBQ3JCLFFBQVEsRUFDUixVQUFVLENBQUMsT0FBTyxDQUNuQixDQUFDO1NBQ0g7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLHFEQUFxRCxDQUN0RCxDQUFDO2dCQUNGLHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixDQUM1QyxPQUFPLEVBQ1AsYUFBYSxDQUFDLE9BQU8sRUFDckIsTUFBTSxFQUNOLFVBQVUsQ0FBQyxPQUFPLENBQ25CLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLFFBQVEsQ0FBQyxLQUFLLEVBQ2QsVUFBVSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQ2xDLENBQUM7YUFDSDtTQUNGO0tBQ0Y7Ozs7Ozs7O0lBT0QsbUNBQW1DLENBQ2pDLGNBQThCO1FBRTlCLHVCQUFNLFFBQVEsR0FBRyxLQUFLLEVBQVUsQ0FBQztRQUNqQyxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUNqQjs7Ozs7O0lBS0QsNkJBQTZCLENBQUMsYUFBNEI7UUFDeEQsdUJBQU0sTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2Y7Ozs7OztJQU1ELHVCQUF1QjtRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDeEQ7Ozs7Ozs7SUFNTSxPQUFPLENBQUMsU0FBaUI7UUFDOUIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsS0FBSyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsUUFBUSxDQUFDLEtBQUssRUFDZCwwQ0FBMEMsU0FBUyxnQkFDakQsSUFBSSxDQUFDLGFBQ1AsWUFBWSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FDL0IsQ0FBQztTQUNIOzs7Ozs7O0lBTUgsa0JBQWtCLENBQUMsUUFBdUI7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUMvQzs7Ozs7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIsR0FBRyxJQUFJLENBQUMsYUFBYSxLQUFLLE9BQU8sRUFBRSxDQUNwQyxDQUFDO0tBQ0g7Ozs7O0lBRVMsZ0JBQWdCLENBQUMsT0FBZTtRQUN4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEI7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2ZpbHRlcic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1lc3NhZ2VUeXBlLFxyXG4gIFNlcnZpY2VDb250ZXh0LFxyXG4gIFNlcnZpY2VNZXNzYWdlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsIFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbGVydE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vbW9kZWxzL2FsZXJ0LW5vdGlmaWNhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEFsZXJ0VHlwZXMgfSBmcm9tICcuL21vZGVscy9hbGVydC10eXBlcy5jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJhc2Uge1xyXG4gIGNvbXBvbmVudE5hbWU6IHN0cmluZztcclxuICBhbGVydE5vdGlmaWNhdGlvbjogQWxlcnROb3RpZmljYXRpb247XHJcbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29tcG9uZW50TmFtZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xyXG4gICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xyXG5cclxuICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgdGhpcy5nb29nbGVBbmFseXRpY3NQYWdldmlldyhldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gY29uc3Qgcm91dGVyRXZlbnQgPSB0aGlzLnJvdXRlci5ldmVudHMuZmlsdGVyKFxyXG4gICAgLy8gICBldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmRcclxuICAgIC8vICk7XHJcbiAgICAvLyBpZiAocm91dGVyRXZlbnQgJiYgcm91dGVyRXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAvLyAgIHRoaXMuZ29vZ2xlQW5hbHl0aWNzUGFnZXZpZXcocm91dGVyRXZlbnQpO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHNlbmQgYW4gYW5hbHl0aWMgZXZlbnQgdG8gW0dvb2dsZSBBbmFseXRpY3NdLlxyXG4gICAqIEBwYXJhbSBjYXRlZ29yeSBBIGNhdGVnb3J5IGlzIGEgbmFtZSB0aGF0IHlvdSBzdXBwbHkgYXMgYSB3YXkgdG8gZ3JvdXAgb2JqZWN0cyB0aGF0IHlvdSB3YW50IHRvIHRyYWNrLiBUeXBpY2FsbHksIHlvdSB3aWxsIHVzZSB0aGUgc2FtZSBjYXRlZ29yeSBuYW1lIG11bHRpcGxlIHRpbWVzIG92ZXIgcmVsYXRlZCBVSSBlbGVtZW50cyB0aGF0IHlvdSB3YW50IHRvIGdyb3VwIHVuZGVyIGEgZ2l2ZW4gY2F0ZWdvcnkuXHJcbiAgICogQHBhcmFtIGFjdGlvbiBVc2UgdGhlIGFjdGlvbiBwYXJhbWV0ZXIgdG8gbmFtZSB0aGUgdHlwZSBvZiBldmVudCBvciBpbnRlcmFjdGlvbiB5b3Ugd2FudCB0byB0cmFjayBmb3IgYSBwYXJ0aWN1bGFyIHdlYiBvYmplY3QgKGkuZS4sIHBsYXksIHN0b3AsIHBhdXNlLCBkb3dubG9hZCkuIEEgdW5pcXVlIGV2ZW50IGlzIGRldGVybWluZWQgYnkgYSB1bmlxdWUgYWN0aW9uIG5hbWUuIFlvdSBjYW4gdXNlIGR1cGxpY2F0ZSBhY3Rpb24gbmFtZXMgYWNyb3NzIGNhdGVnb3JpZXMsIGJ1dCB0aGlzIGNhbiBhZmZlY3QgaG93IHVuaXF1ZSBldmVudHMgYXJlIGNhbGN1bGF0ZWQuIFNlZSB0aGUgc3VnZ2VzdGlvbnMgYmVsb3cgYW5kIHRoZSBJbXBsaWNpdCBDb3VudCBzZWN0aW9uIGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICogQHBhcmFtIGxhYmVsIFByb3ZpZGUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmb3IgZXZlbnRzIHRoYXQgeW91IHdhbnQgdG8gdHJhY2ssIHN1Y2ggYXMgdGhlIG1vdmllIHRpdGxlIGluIHRoZSB2aWRlbyBleGFtcGxlcyBhYm92ZSwgb3IgdGhlIG5hbWUgb2YgYSBmaWxlIHdoZW4gdHJhY2tpbmcgZG93bmxvYWRzLiBBbGwgbGFiZWxzIGFyZSBsaXN0ZWQgaW5kZXBlbmRlbnRseSBmcm9tIHRoZWlyIHBhcmVudCBjYXRlZ29yaWVzIGFuZCBhY3Rpb25zLiBUaGlzIHByb3ZpZGVzIHlvdSB3aXRoIGFub3RoZXIgdXNlZnVsIHdheSB0byBzZWdtZW50IHRoZSBldmVudCBkYXRhIGZvciB5b3VyIHJlcG9ydHMuIEFsbCBsYWJlbHMgYXJlIGxpc3RlZCBpbmRlcGVuZGVudGx5IGZyb20gdGhlaXIgcGFyZW50IGNhdGVnb3JpZXMgYW5kIGFjdGlvbnMuIFRoaXMgcHJvdmlkZXMgeW91IHdpdGggYW5vdGhlciB1c2VmdWwgd2F5IHRvIHNlZ21lbnQgdGhlIGV2ZW50IGRhdGEgZm9yIHlvdXIgcmVwb3J0cy5cclxuICAgKiBAcGFyYW0gdmFsdWUgQW55IG51bWVyaWMgdmFsdWUgaW5kaWNhdGluZyBhIFt2YWx1ZV0gdGhhdCB3aWxsIGJlIHN1bW1hcml6ZWQgZm9yIHRoZSBhbmFseXRpYyBpdGVtKHMpLlxyXG4gICAqXHJcbiAgICogTW9yZSBpbmZvcm1hdGlvbiBhdDogaHR0cHM6Ly9zdXBwb3J0Lmdvb2dsZS5jb20vYW5hbHl0aWNzL2Fuc3dlci8xMDMzMDY4XHJcbiAgICogb3IgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2V2ZW50c1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnb29nbGVBbmFseXRpY3NTZW5kRXZlbnQoXHJcbiAgICBjYXRlZ29yeTogc3RyaW5nLFxyXG4gICAgYWN0aW9uOiBzdHJpbmcsXHJcbiAgICBsYWJlbDogc3RyaW5nLFxyXG4gICAgdmFsdWU6IG51bWJlclxyXG4gICkge1xyXG4gICAgKDxhbnk+d2luZG93KS5ndGFnKCdldmVudCcsIGFjdGlvbiwge1xyXG4gICAgICBldmVudF9jYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcclxuICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ29vZ2xlQW5hbHl0aWNzUGFnZXZpZXcoZXZlbnQ6IE5hdmlnYXRpb25FbmQpIHtcclxuICAgIGlmIChldmVudCAmJiBldmVudC51cmxBZnRlclJlZGlyZWN0cykge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFByZXBhcmluZyB0byBzZXQgW0dvb2dsZSBBbmFseXRpY3NdIHBhZ2UgdmlldyBmb3IgWyR7XHJcbiAgICAgICAgICBldmVudC51cmxBZnRlclJlZGlyZWN0c1xyXG4gICAgICAgIH1dLmBcclxuICAgICAgKTtcclxuICAgICAgLy8gKDxhbnk+d2luZG93KS5nYSgnc2V0JywgJ3BhZ2UnLCBldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XHJcbiAgICAgIC8vICg8YW55PndpbmRvdykuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcclxuICAgICAgLy8gZ2EoJ2NyZWF0ZScsICdVQS0xMTAxOTQzNDQtMScsICdhdXRvJywgdGhpcy5jb21wb25lbnROYW1lKTtcclxuICAgICAgLy8gZ2EoYCR7dGhpcy5jb21wb25lbnROYW1lfS5zZW5kYCwgJ3BhZ2V2aWV3Jyk7XHJcblxyXG4gICAgICAvLyBodHRwczovL2Jsb2cudGhlY29kZWNhbXB1cy5kZS9hbmd1bGFyLTItZ29vZ2xlLWFuYWx5dGljcy1nb29nbGUtdGFnLW1hbmFnZXIvXHJcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvcGFnZXNcclxuICAgICAgY29uc3QgR0FfVFJBQ0tJTkdfSUQgPSAnVUEtMTEwMTk0MzQ0LTEnO1xyXG4gICAgICAvLyBndGFnKCdjb25maWcnLCAnR0FfVFJBQ0tJTkdfSUQnLCB7PHBhZ2V2aWV3X3BhcmFtZXRlcnM+fSk7XHJcbiAgICAgICg8YW55PndpbmRvdykuZ2EoJ2NvbmZpZycsIEdBX1RSQUNLSU5HX0lELCB7XHJcbiAgICAgICAgcGFnZV90aXRsZTogdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIHBhZ2VfcGF0aDogZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHNcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuV2FybmluZyxcclxuICAgICAgICBgRmFpbGVkIHRvIHNldCBbR29vZ2xlIEFuYWx5dGljc10gcGFnZSB2aWV3LmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBjcmVhdGUgYSBzaW1wbGUgW0Vycm9yUmVzcG9uc2VdIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgY3JlYXRlRXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcpOiBFcnJvclJlc3BvbnNlIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGNyZWF0ZSBlcnJvciByZXNwb25zZSBmb3IgY29tcG9uZW50LmBcclxuICAgICk7XHJcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoKTtcclxuICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBoYW5kbGUgc2VydmljZSBlcnJvcnMuIFRoZXNlIGFyZSBlcnJvciByZXNwb25zZSBbU2VlOiBFcnJvclJlc3BvbnNlXSBmcm9tXHJcbiAgICogdGhlIGFwcGxpY2F0aW9uIGJ1c2luZXNzIGxheWVycyAoQWN0aW9uKHMpIG9yIEh0dHApIHRoYXQgd2lsbCBidWJibGUgdXAgdG8gdGhlXHJcbiAgICogY2FsbGVyIChpLmUuLCBhIGNvbXBvbmVudCkgaW4gYSBzcGVjaWZpZWQgZm9ybWF0OlxyXG4gICAqXHJcbiAgICogSXNTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7IC8vIGRlZmF1bHQgZm9yIEVycm9yUmVzcG9uc2VcclxuICAgKiBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICogRXJyb3JzOiBBcnJheTxTZXJ2aWNlRXJyb3I+ID0gbmV3IEFycmF5PFNlcnZpY2VFcnJvcj4oKTtcclxuICAgKiBFeGNlcHRpb246IGFueTtcclxuICAgKi9cclxuICBoYW5kbGVTZXJ2aWNlRXJyb3JzKFxyXG4gICAgZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSxcclxuICAgIHNlcnZpY2VDb250ZXh0PzogU2VydmljZUNvbnRleHRcclxuICApIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUHJlcGFyaW5nIHRvIGhhbmRsZSBzZXJ2aWNlIGVycm9ycyBmb3IgY29tcG9uZW50LmBcclxuICAgICk7XHJcbiAgICBpZiAoc2VydmljZUNvbnRleHQgJiYgc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgIGBSZXRyaWV2aW5nIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIFNlcnZpY2VDb250ZXh0L1ZhbGlkYXRpb25Db250ZXh0O2BcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLnJldHJpZXZlU2VydmljZUNvbnRleHRFcnJvck1lc3NhZ2VzKHNlcnZpY2VDb250ZXh0KTtcclxuICAgICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbihcclxuICAgICAgICAnRXJyb3JzJyxcclxuICAgICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UsXHJcbiAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgQWxlcnRUeXBlcy5XYXJuaW5nXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZXJyb3JSZXNwb25zZSAmJiBlcnJvclJlc3BvbnNlLk1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgYFJldHJpZXZpbmcgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgW0Vycm9yUmVzcG9uc2VdLmBcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMucmV0cmlldmVSZXNwb25zZUVycm9yTWVzc2FnZXMoZXJyb3JSZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5hbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICBlcnJvclJlc3BvbnNlLk1lc3NhZ2UsXHJcbiAgICAgICAgICBlcnJvcnMsXHJcbiAgICAgICAgICBBbGVydFR5cGVzLldhcm5pbmdcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgICBgRXJyb3I6ICR7ZXJyb3JSZXNwb25zZS5NZXNzYWdlfWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmV0cmlldmUgdGhlIGVycm9yIG1lc3NhZ2VzIGZyb20gdGhlIHNwZWNpZmllZCBbU2VydmljZUNvbnRleHRdLlxyXG4gICAqXHJcbiAgICogQHBhcm06IHNlcnZpY2VDb250ZXh0OiBBIGNvbnRleHQgb2JqZWN0IGNvbnRhaW5pbmcgbWVzc2FnZXMgZm9yIHRoZSBzcGVjaWZpZWQgcmVxdWVzdC5cclxuICAgKi9cclxuICByZXRyaWV2ZVNlcnZpY2VDb250ZXh0RXJyb3JNZXNzYWdlcyhcclxuICAgIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dFxyXG4gICk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgY29uc3QgbWVzc2FnZXMgPSBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICBzZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICBpZiAoZS5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3IgJiYgZS5EaXNwbGF5VG9Vc2VyKSB7XHJcbiAgICAgICAgbWVzc2FnZXMucHVzaChlLk1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtZXNzYWdlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgc3BlY2lmaWVkIFdlYiBBUEkgcmVzcG9uc2UuXHJcbiAgICovXHJcbiAgcmV0cmlldmVSZXNwb25zZUVycm9yTWVzc2FnZXMoZXJyb3JSZXNwb25zZTogRXJyb3JSZXNwb25zZSkge1xyXG4gICAgY29uc3QgZXJyb3JzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIGlmIChlcnJvclJlc3BvbnNlICYmIGVycm9yUmVzcG9uc2UuRXJyb3JzKSB7XHJcbiAgICAgIGVycm9yUmVzcG9uc2UuRXJyb3JzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgaWYgKGUuRGlzcGxheVRvVXNlcikge1xyXG4gICAgICAgICAgZXJyb3JzLnB1c2goZS5NZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVycm9ycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXNldCB0aGUgW0FsZXJ0Tm90aWZpY2F0aW9uXSB0byB0aGUgaW5pdGlhbCBzdGF0ZS4gUmVtb3Zlc1xyXG4gICAqIGV4aXN0aW5nIG1lc3NhZ2VzIGFuZCBoaWRlcyB0aGUgQWxlcnRDb21wb25lbnQuXHJcbiAgICovXHJcbiAgcmVzZXRBbGVydE5vdGlmaWNhdGlvbnMoKSB7XHJcbiAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKCcnLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gbmF2aWdhdGUgdG8gdGhlIHNwZWNpZmllZCByb3V0ZS5cclxuICAgKiBAcGFybSByb3V0ZU5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCByb3V0ZS5cclxuICAgKi9cclxuICBwdWJsaWMgcm91dGVUbyhyb3V0ZU5hbWU6IHN0cmluZykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JvdXRlTmFtZV0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgIFNldmVyaXR5LkVycm9yLFxyXG4gICAgICAgIGBFcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIG5hdmlnYXRlIHRvIFske3JvdXRlTmFtZX1dIHJvdXRlIGZyb20gJHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50TmFtZVxyXG4gICAgICAgIH0uIEVycm9yOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJldHJpZXZlIGFuZCBzaG93IGFueSByZXNwb25zZSBlcnJvciBtZXNzYWdlcy5cclxuICAgKi9cclxuICBzaG93UmVzcG9uc2VFcnJvcnMocmVzcG9uc2U6IEVycm9yUmVzcG9uc2UpIHtcclxuICAgIHRoaXMuaGFuZGxlU2VydmljZUVycm9ycyhyZXNwb25zZSwgdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGZpbmlzaFJlcXVlc3QobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYCR7dGhpcy5jb21wb25lbnROYW1lfTogJHttZXNzYWdlfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2hvd0FsZXJ0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGFsZXJ0KG1lc3NhZ2UpO1xyXG4gIH1cclxufVxyXG4iXX0=