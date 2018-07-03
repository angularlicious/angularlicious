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
var ComponentBase = /** @class */ (function () {
    function ComponentBase(componentName, loggingService, router) {
        var _this = this;
        this.loggingService = loggingService;
        this.router = router;
        this.componentName = componentName;
        this.alertNotification = new AlertNotification('', '');
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                _this.googleAnalyticsPageview(event);
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
    ComponentBase.prototype.googleAnalyticsSendEvent = /**
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
    function (category, action, label, value) {
        (/** @type {?} */ (window)).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ComponentBase.prototype.googleAnalyticsPageview = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && event.urlAfterRedirects) {
            this.loggingService.log(this.componentName, Severity.Information, "Preparing to set [Google Analytics] page view for [" + event.urlAfterRedirects + "].");
            // (<any>window).ga('set', 'page', event.urlAfterRedirects);
            // (<any>window).ga('send', 'pageview');
            // ga('create', 'UA-110194344-1', 'auto', this.componentName);
            // ga(`${this.componentName}.send`, 'pageview');
            // https://blog.thecodecampus.de/angular-2-google-analytics-google-tag-manager/
            // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
            var /** @type {?} */ GA_TRACKING_ID = 'UA-110194344-1';
            // gtag('config', 'GA_TRACKING_ID', {<pageview_parameters>});
            (/** @type {?} */ (window)).ga('config', GA_TRACKING_ID, {
                page_title: this.componentName,
                page_path: event.urlAfterRedirects
            });
        }
        else {
            this.loggingService.log(this.componentName, Severity.Warning, "Failed to set [Google Analytics] page view.");
        }
    };
    /**
     * Use to create a simple [ErrorResponse] with the specified message.
     * @param message The message to display to the user.
     */
    /**
     * Use to create a simple [ErrorResponse] with the specified message.
     * @param {?} message The message to display to the user.
     * @return {?}
     */
    ComponentBase.prototype.createErrorResponse = /**
     * Use to create a simple [ErrorResponse] with the specified message.
     * @param {?} message The message to display to the user.
     * @return {?}
     */
    function (message) {
        this.loggingService.log(this.componentName, Severity.Information, "Preparing to create error response for component.");
        var /** @type {?} */ errorResponse = new ErrorResponse();
        errorResponse.Message = message;
        return errorResponse;
    };
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
    ComponentBase.prototype.handleServiceErrors = /**
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
    function (errorResponse, serviceContext) {
        this.loggingService.log(this.componentName, Severity.Information, "Preparing to handle service errors for component.");
        if (serviceContext && serviceContext.hasErrors()) {
            this.loggingService.log(this.componentName, Severity.Information, "Retrieving error messages from the ServiceContext/ValidationContext;");
            var /** @type {?} */ messages = this.retrieveServiceContextErrorMessages(serviceContext);
            this.alertNotification = new AlertNotification('Errors', errorResponse.Message, messages, AlertTypes.Warning);
        }
        else {
            if (errorResponse && errorResponse.Message) {
                this.loggingService.log(this.componentName, Severity.Information, "Retrieving error messages from the [ErrorResponse].");
                var /** @type {?} */ errors = this.retrieveResponseErrorMessages(errorResponse);
                this.alertNotification = new AlertNotification('Error', errorResponse.Message, errors, AlertTypes.Warning);
                this.loggingService.log(this.componentName, Severity.Error, "Error: " + errorResponse.Message);
            }
        }
    };
    /**
     * Use to retrieve the error messages from the specified [ServiceContext].
     *
     * @parm: serviceContext: A context object containing messages for the specified request.
     */
    /**
     * Use to retrieve the error messages from the specified [ServiceContext].
     *
     * \@parm: serviceContext: A context object containing messages for the specified request.
     * @param {?} serviceContext
     * @return {?}
     */
    ComponentBase.prototype.retrieveServiceContextErrorMessages = /**
     * Use to retrieve the error messages from the specified [ServiceContext].
     *
     * \@parm: serviceContext: A context object containing messages for the specified request.
     * @param {?} serviceContext
     * @return {?}
     */
    function (serviceContext) {
        var /** @type {?} */ messages = Array();
        serviceContext.Messages.forEach(function (e) {
            if (e.MessageType === MessageType.Error && e.DisplayToUser) {
                messages.push(e.Message);
            }
        });
        return messages;
    };
    /**
     * Use to retrieve the error messages from the specified Web API response.
     */
    /**
     * Use to retrieve the error messages from the specified Web API response.
     * @param {?} errorResponse
     * @return {?}
     */
    ComponentBase.prototype.retrieveResponseErrorMessages = /**
     * Use to retrieve the error messages from the specified Web API response.
     * @param {?} errorResponse
     * @return {?}
     */
    function (errorResponse) {
        var /** @type {?} */ errors = new Array();
        if (errorResponse && errorResponse.Errors) {
            errorResponse.Errors.forEach(function (e) {
                if (e.DisplayToUser) {
                    errors.push(e.Message);
                }
            });
        }
        return errors;
    };
    /**
     * Use to reset the [AlertNotification] to the initial state. Removes
     * existing messages and hides the AlertComponent.
     */
    /**
     * Use to reset the [AlertNotification] to the initial state. Removes
     * existing messages and hides the AlertComponent.
     * @return {?}
     */
    ComponentBase.prototype.resetAlertNotifications = /**
     * Use to reset the [AlertNotification] to the initial state. Removes
     * existing messages and hides the AlertComponent.
     * @return {?}
     */
    function () {
        this.alertNotification = new AlertNotification('', '');
    };
    /**
     * Use to navigate to the specified route.
     * \@parm routeName The name of the target route.
     * @param {?} routeName
     * @return {?}
     */
    ComponentBase.prototype.routeTo = /**
     * Use to navigate to the specified route.
     * \@parm routeName The name of the target route.
     * @param {?} routeName
     * @return {?}
     */
    function (routeName) {
        try {
            this.router.navigate([routeName]);
        }
        catch (/** @type {?} */ error) {
            this.loggingService.log(this.componentName, Severity.Error, "Error while attempting to navigate to [" + routeName + "] route from " + this.componentName + ". Error: " + error.toString());
        }
    };
    /**
     * Use to retrieve and show any response error messages.
     */
    /**
     * Use to retrieve and show any response error messages.
     * @param {?} response
     * @return {?}
     */
    ComponentBase.prototype.showResponseErrors = /**
     * Use to retrieve and show any response error messages.
     * @param {?} response
     * @return {?}
     */
    function (response) {
        this.handleServiceErrors(response, undefined);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ComponentBase.prototype.finishRequest = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.loggingService.log(this.componentName, Severity.Information, this.componentName + ": " + message);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ComponentBase.prototype.showAlertMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        alert(message);
    };
    return ComponentBase;
}());
export { ComponentBase };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50LWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQVUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTywwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQ0wsV0FBVyxFQUdaLE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBZ0MsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTVELElBQUE7SUFLRSx1QkFDRSxhQUFxQixFQUNkLGdCQUNBO1FBSFQsaUJBbUJDO1FBakJRLG1CQUFjLEdBQWQsY0FBYztRQUNkLFdBQU0sR0FBTixNQUFNO1FBRWIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDaEMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQztTQUNGLENBQUMsQ0FBQzs7Ozs7OztLQU9KOzs7Ozs7Ozs7Ozs7SUFZTSxnREFBd0I7Ozs7Ozs7Ozs7O2NBQzdCLFFBQWdCLEVBQ2hCLE1BQWMsRUFDZCxLQUFh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RUFBRSxDQUFDLENBQUM7S0FDeEQ7Ozs7Ozs7SUFNTSwrQkFBTzs7Ozs7O2NBQUMsU0FBaUI7UUFDOUIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsS0FBSyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsUUFBUSxDQUFDLEtBQUssRUFDZCw0Q0FBMEMsU0FBUyxxQkFDakQsSUFBSSxDQUFDLGFBQWEsaUJBQ1IsS0FBSyxDQUFDLFFBQVEsRUFBSSxDQUMvQixDQUFDO1NBQ0g7O0lBR0g7O09BRUc7Ozs7OztJQUNILDBDQUFrQjs7Ozs7SUFBbEIsVUFBbUIsUUFBdUI7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUMvQzs7Ozs7SUFFRCxxQ0FBYTs7OztJQUFiLFVBQWMsT0FBZTtRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsUUFBUSxDQUFDLFdBQVcsRUFDakIsSUFBSSxDQUFDLGFBQWEsVUFBSyxPQUFTLENBQ3BDLENBQUM7S0FDSDs7Ozs7SUFFUyx3Q0FBZ0I7Ozs7SUFBMUIsVUFBMkIsT0FBZTtRQUN4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEI7d0JBL09IO0lBZ1BDLENBQUE7QUFsT0QseUJBa09DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWVzc2FnZVR5cGUsXHJcbiAgU2VydmljZUNvbnRleHQsXHJcbiAgU2VydmljZU1lc3NhZ2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSwgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEFsZXJ0Tm90aWZpY2F0aW9uIH0gZnJvbSAnLi9tb2RlbHMvYWxlcnQtbm90aWZpY2F0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgQWxlcnRUeXBlcyB9IGZyb20gJy4vbW9kZWxzL2FsZXJ0LXR5cGVzLmNvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmFzZSB7XHJcbiAgY29tcG9uZW50TmFtZTogc3RyaW5nO1xyXG4gIGFsZXJ0Tm90aWZpY2F0aW9uOiBBbGVydE5vdGlmaWNhdGlvbjtcclxuICBuYXZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XHJcbiAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKCcnLCAnJyk7XHJcblxyXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XHJcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICB0aGlzLmdvb2dsZUFuYWx5dGljc1BhZ2V2aWV3KGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zdCByb3V0ZXJFdmVudCA9IHRoaXMucm91dGVyLmV2ZW50cy5maWx0ZXIoXHJcbiAgICAvLyAgIGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZFxyXG4gICAgLy8gKTtcclxuICAgIC8vIGlmIChyb3V0ZXJFdmVudCAmJiByb3V0ZXJFdmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgIC8vICAgdGhpcy5nb29nbGVBbmFseXRpY3NQYWdldmlldyhyb3V0ZXJFdmVudCk7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gc2VuZCBhbiBhbmFseXRpYyBldmVudCB0byBbR29vZ2xlIEFuYWx5dGljc10uXHJcbiAgICogQHBhcmFtIGNhdGVnb3J5IEEgY2F0ZWdvcnkgaXMgYSBuYW1lIHRoYXQgeW91IHN1cHBseSBhcyBhIHdheSB0byBncm91cCBvYmplY3RzIHRoYXQgeW91IHdhbnQgdG8gdHJhY2suIFR5cGljYWxseSwgeW91IHdpbGwgdXNlIHRoZSBzYW1lIGNhdGVnb3J5IG5hbWUgbXVsdGlwbGUgdGltZXMgb3ZlciByZWxhdGVkIFVJIGVsZW1lbnRzIHRoYXQgeW91IHdhbnQgdG8gZ3JvdXAgdW5kZXIgYSBnaXZlbiBjYXRlZ29yeS5cclxuICAgKiBAcGFyYW0gYWN0aW9uIFVzZSB0aGUgYWN0aW9uIHBhcmFtZXRlciB0byBuYW1lIHRoZSB0eXBlIG9mIGV2ZW50IG9yIGludGVyYWN0aW9uIHlvdSB3YW50IHRvIHRyYWNrIGZvciBhIHBhcnRpY3VsYXIgd2ViIG9iamVjdCAoaS5lLiwgcGxheSwgc3RvcCwgcGF1c2UsIGRvd25sb2FkKS4gQSB1bmlxdWUgZXZlbnQgaXMgZGV0ZXJtaW5lZCBieSBhIHVuaXF1ZSBhY3Rpb24gbmFtZS4gWW91IGNhbiB1c2UgZHVwbGljYXRlIGFjdGlvbiBuYW1lcyBhY3Jvc3MgY2F0ZWdvcmllcywgYnV0IHRoaXMgY2FuIGFmZmVjdCBob3cgdW5pcXVlIGV2ZW50cyBhcmUgY2FsY3VsYXRlZC4gU2VlIHRoZSBzdWdnZXN0aW9ucyBiZWxvdyBhbmQgdGhlIEltcGxpY2l0IENvdW50IHNlY3Rpb24gZm9yIG1vcmUgZGV0YWlscy5cclxuICAgKiBAcGFyYW0gbGFiZWwgUHJvdmlkZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZvciBldmVudHMgdGhhdCB5b3Ugd2FudCB0byB0cmFjaywgc3VjaCBhcyB0aGUgbW92aWUgdGl0bGUgaW4gdGhlIHZpZGVvIGV4YW1wbGVzIGFib3ZlLCBvciB0aGUgbmFtZSBvZiBhIGZpbGUgd2hlbiB0cmFja2luZyBkb3dubG9hZHMuIEFsbCBsYWJlbHMgYXJlIGxpc3RlZCBpbmRlcGVuZGVudGx5IGZyb20gdGhlaXIgcGFyZW50IGNhdGVnb3JpZXMgYW5kIGFjdGlvbnMuIFRoaXMgcHJvdmlkZXMgeW91IHdpdGggYW5vdGhlciB1c2VmdWwgd2F5IHRvIHNlZ21lbnQgdGhlIGV2ZW50IGRhdGEgZm9yIHlvdXIgcmVwb3J0cy4gQWxsIGxhYmVscyBhcmUgbGlzdGVkIGluZGVwZW5kZW50bHkgZnJvbSB0aGVpciBwYXJlbnQgY2F0ZWdvcmllcyBhbmQgYWN0aW9ucy4gVGhpcyBwcm92aWRlcyB5b3Ugd2l0aCBhbm90aGVyIHVzZWZ1bCB3YXkgdG8gc2VnbWVudCB0aGUgZXZlbnQgZGF0YSBmb3IgeW91ciByZXBvcnRzLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSBBbnkgbnVtZXJpYyB2YWx1ZSBpbmRpY2F0aW5nIGEgW3ZhbHVlXSB0aGF0IHdpbGwgYmUgc3VtbWFyaXplZCBmb3IgdGhlIGFuYWx5dGljIGl0ZW0ocykuXHJcbiAgICpcclxuICAgKiBNb3JlIGluZm9ybWF0aW9uIGF0OiBodHRwczovL3N1cHBvcnQuZ29vZ2xlLmNvbS9hbmFseXRpY3MvYW5zd2VyLzEwMzMwNjhcclxuICAgKiBvciBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZXZlbnRzXHJcbiAgICovXHJcbiAgcHVibGljIGdvb2dsZUFuYWx5dGljc1NlbmRFdmVudChcclxuICAgIGNhdGVnb3J5OiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IHN0cmluZyxcclxuICAgIGxhYmVsOiBzdHJpbmcsXHJcbiAgICB2YWx1ZTogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICAoPGFueT53aW5kb3cpLmd0YWcoJ2V2ZW50JywgYWN0aW9uLCB7XHJcbiAgICAgIGV2ZW50X2NhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgZXZlbnRfbGFiZWw6IGxhYmVsLFxyXG4gICAgICB2YWx1ZTogdmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnb29nbGVBbmFseXRpY3NQYWdldmlldyhldmVudDogTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgUHJlcGFyaW5nIHRvIHNldCBbR29vZ2xlIEFuYWx5dGljc10gcGFnZSB2aWV3IGZvciBbJHtcclxuICAgICAgICAgIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzXHJcbiAgICAgICAgfV0uYFxyXG4gICAgICApO1xyXG4gICAgICAvLyAoPGFueT53aW5kb3cpLmdhKCdzZXQnLCAncGFnZScsIGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzKTtcclxuICAgICAgLy8gKDxhbnk+d2luZG93KS5nYSgnc2VuZCcsICdwYWdldmlldycpO1xyXG4gICAgICAvLyBnYSgnY3JlYXRlJywgJ1VBLTExMDE5NDM0NC0xJywgJ2F1dG8nLCB0aGlzLmNvbXBvbmVudE5hbWUpO1xyXG4gICAgICAvLyBnYShgJHt0aGlzLmNvbXBvbmVudE5hbWV9LnNlbmRgLCAncGFnZXZpZXcnKTtcclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vYmxvZy50aGVjb2RlY2FtcHVzLmRlL2FuZ3VsYXItMi1nb29nbGUtYW5hbHl0aWNzLWdvb2dsZS10YWctbWFuYWdlci9cclxuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9wYWdlc1xyXG4gICAgICBjb25zdCBHQV9UUkFDS0lOR19JRCA9ICdVQS0xMTAxOTQzNDQtMSc7XHJcbiAgICAgIC8vIGd0YWcoJ2NvbmZpZycsICdHQV9UUkFDS0lOR19JRCcsIHs8cGFnZXZpZXdfcGFyYW1ldGVycz59KTtcclxuICAgICAgKDxhbnk+d2luZG93KS5nYSgnY29uZmlnJywgR0FfVFJBQ0tJTkdfSUQsIHtcclxuICAgICAgICBwYWdlX3RpdGxlOiB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgcGFnZV9wYXRoOiBldmVudC51cmxBZnRlclJlZGlyZWN0c1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgICBTZXZlcml0eS5XYXJuaW5nLFxyXG4gICAgICAgIGBGYWlsZWQgdG8gc2V0IFtHb29nbGUgQW5hbHl0aWNzXSBwYWdlIHZpZXcuYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGNyZWF0ZSBhIHNpbXBsZSBbRXJyb3JSZXNwb25zZV0gd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB0byB0aGUgdXNlci5cclxuICAgKi9cclxuICBjcmVhdGVFcnJvclJlc3BvbnNlKG1lc3NhZ2U6IHN0cmluZyk6IEVycm9yUmVzcG9uc2Uge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gY3JlYXRlIGVycm9yIHJlc3BvbnNlIGZvciBjb21wb25lbnQuYFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGVycm9yUmVzcG9uc2U6IEVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZSgpO1xyXG4gICAgZXJyb3JSZXNwb25zZS5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiBlcnJvclJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGhhbmRsZSBzZXJ2aWNlIGVycm9ycy4gVGhlc2UgYXJlIGVycm9yIHJlc3BvbnNlIFtTZWU6IEVycm9yUmVzcG9uc2VdIGZyb21cclxuICAgKiB0aGUgYXBwbGljYXRpb24gYnVzaW5lc3MgbGF5ZXJzIChBY3Rpb24ocykgb3IgSHR0cCkgdGhhdCB3aWxsIGJ1YmJsZSB1cCB0byB0aGVcclxuICAgKiBjYWxsZXIgKGkuZS4sIGEgY29tcG9uZW50KSBpbiBhIHNwZWNpZmllZCBmb3JtYXQ6XHJcbiAgICpcclxuICAgKiBJc1N1Y2Nlc3M6IGJvb2xlYW4gPSBmYWxzZTsgLy8gZGVmYXVsdCBmb3IgRXJyb3JSZXNwb25zZVxyXG4gICAqIE1lc3NhZ2U6IHN0cmluZztcclxuICAgKiBFcnJvcnM6IEFycmF5PFNlcnZpY2VFcnJvcj4gPSBuZXcgQXJyYXk8U2VydmljZUVycm9yPigpO1xyXG4gICAqIEV4Y2VwdGlvbjogYW55O1xyXG4gICAqL1xyXG4gIGhhbmRsZVNlcnZpY2VFcnJvcnMoXHJcbiAgICBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlLFxyXG4gICAgc2VydmljZUNvbnRleHQ/OiBTZXJ2aWNlQ29udGV4dFxyXG4gICkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuY29tcG9uZW50TmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBQcmVwYXJpbmcgdG8gaGFuZGxlIHNlcnZpY2UgZXJyb3JzIGZvciBjb21wb25lbnQuYFxyXG4gICAgKTtcclxuICAgIGlmIChzZXJ2aWNlQ29udGV4dCAmJiBzZXJ2aWNlQ29udGV4dC5oYXNFcnJvcnMoKSkge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFJldHJpZXZpbmcgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgU2VydmljZUNvbnRleHQvVmFsaWRhdGlvbkNvbnRleHQ7YFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IHRoaXMucmV0cmlldmVTZXJ2aWNlQ29udGV4dEVycm9yTWVzc2FnZXMoc2VydmljZUNvbnRleHQpO1xyXG4gICAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKFxyXG4gICAgICAgICdFcnJvcnMnLFxyXG4gICAgICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSxcclxuICAgICAgICBtZXNzYWdlcyxcclxuICAgICAgICBBbGVydFR5cGVzLldhcm5pbmdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChlcnJvclJlc3BvbnNlICYmIGVycm9yUmVzcG9uc2UuTWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lLFxyXG4gICAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgICBgUmV0cmlldmluZyBlcnJvciBtZXNzYWdlcyBmcm9tIHRoZSBbRXJyb3JSZXNwb25zZV0uYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5yZXRyaWV2ZVJlc3BvbnNlRXJyb3JNZXNzYWdlcyhlcnJvclJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLmFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKFxyXG4gICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgIGVycm9yUmVzcG9uc2UuTWVzc2FnZSxcclxuICAgICAgICAgIGVycm9ycyxcclxuICAgICAgICAgIEFsZXJ0VHlwZXMuV2FybmluZ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgICBTZXZlcml0eS5FcnJvcixcclxuICAgICAgICAgIGBFcnJvcjogJHtlcnJvclJlc3BvbnNlLk1lc3NhZ2V9YFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZXRyaWV2ZSB0aGUgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICpcclxuICAgKiBAcGFybTogc2VydmljZUNvbnRleHQ6IEEgY29udGV4dCBvYmplY3QgY29udGFpbmluZyBtZXNzYWdlcyBmb3IgdGhlIHNwZWNpZmllZCByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHJldHJpZXZlU2VydmljZUNvbnRleHRFcnJvck1lc3NhZ2VzKFxyXG4gICAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0XHJcbiAgKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IEFycmF5PHN0cmluZz4oKTtcclxuICAgIHNlcnZpY2VDb250ZXh0Lk1lc3NhZ2VzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgIGlmIChlLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvciAmJiBlLkRpc3BsYXlUb1VzZXIpIHtcclxuICAgICAgICBtZXNzYWdlcy5wdXNoKGUuTWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJldHJpZXZlIHRoZSBlcnJvciBtZXNzYWdlcyBmcm9tIHRoZSBzcGVjaWZpZWQgV2ViIEFQSSByZXNwb25zZS5cclxuICAgKi9cclxuICByZXRyaWV2ZVJlc3BvbnNlRXJyb3JNZXNzYWdlcyhlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBlcnJvcnMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgaWYgKGVycm9yUmVzcG9uc2UgJiYgZXJyb3JSZXNwb25zZS5FcnJvcnMpIHtcclxuICAgICAgZXJyb3JSZXNwb25zZS5FcnJvcnMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBpZiAoZS5EaXNwbGF5VG9Vc2VyKSB7XHJcbiAgICAgICAgICBlcnJvcnMucHVzaChlLk1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlc2V0IHRoZSBbQWxlcnROb3RpZmljYXRpb25dIHRvIHRoZSBpbml0aWFsIHN0YXRlLiBSZW1vdmVzXHJcbiAgICogZXhpc3RpbmcgbWVzc2FnZXMgYW5kIGhpZGVzIHRoZSBBbGVydENvbXBvbmVudC5cclxuICAgKi9cclxuICByZXNldEFsZXJ0Tm90aWZpY2F0aW9ucygpIHtcclxuICAgIHRoaXMuYWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oJycsICcnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBuYXZpZ2F0ZSB0byB0aGUgc3BlY2lmaWVkIHJvdXRlLlxyXG4gICAqIEBwYXJtIHJvdXRlTmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IHJvdXRlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyByb3V0ZVRvKHJvdXRlTmFtZTogc3RyaW5nKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVOYW1lXSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuRXJyb3IsXHJcbiAgICAgICAgYEVycm9yIHdoaWxlIGF0dGVtcHRpbmcgdG8gbmF2aWdhdGUgdG8gWyR7cm91dGVOYW1lfV0gcm91dGUgZnJvbSAke1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnROYW1lXHJcbiAgICAgICAgfS4gRXJyb3I6ICR7ZXJyb3IudG9TdHJpbmcoKX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmV0cmlldmUgYW5kIHNob3cgYW55IHJlc3BvbnNlIGVycm9yIG1lc3NhZ2VzLlxyXG4gICAqL1xyXG4gIHNob3dSZXNwb25zZUVycm9ycyhyZXNwb25zZTogRXJyb3JSZXNwb25zZSkge1xyXG4gICAgdGhpcy5oYW5kbGVTZXJ2aWNlRXJyb3JzKHJlc3BvbnNlLCB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgZmluaXNoUmVxdWVzdChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLmNvbXBvbmVudE5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgJHt0aGlzLmNvbXBvbmVudE5hbWV9OiAke21lc3NhZ2V9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzaG93QWxlcnRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgYWxlcnQobWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==