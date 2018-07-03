/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var AngularliciousLoggingService = /** @class */ (function () {
    function AngularliciousLoggingService() {
        this.applicationName = 'Angularlicio.us';
        this.serviceName = 'LoggingService';
    }
    /**
     * The [LoggingService] constructor.
     */
    // constructor(
    //     // @Optional() private config: loggingServiceConfig
    //     applicationName: string
    // ) {
    //     this.log(this.serviceName, Severity.Information, `Starting logging service at: ${this.timestamp}`);
    //     if(applicationName) {
    //         this.applicationName = applicationName;
    //     }
    // }
    /**
     * Use this method to send a log message with severity and source information
     * to the application's logger.
     *
     * If the application environment mode is [Production], the information will
     * be sent to a centralized repository.
     *
     * @param source
     * @param severity
     * @param message
     */
    /**
     * Use this method to send a log message with severity and source information
     * to the application's logger.
     *
     * If the application environment mode is [Production], the information will
     * be sent to a centralized repository.
     *
     * @param {?} source
     * @param {?} severity
     * @param {?} message
     * @return {?}
     */
    AngularliciousLoggingService.prototype.log = /**
     * Use this method to send a log message with severity and source information
     * to the application's logger.
     *
     * If the application environment mode is [Production], the information will
     * be sent to a centralized repository.
     *
     * @param {?} source
     * @param {?} severity
     * @param {?} message
     * @return {?}
     */
    function (source, severity, message) {
        this.source = this.applicationName + "." + source;
        this.severity = severity;
        this.message = message;
        this.timestamp = new Date();
        var /** @type {?} */ msg = "" + this.message;
        // todo: add switch based on the severity to:
        // console.info
        // console.warn
        // console.error
        // console.log
        console.log(this.severity + " from " + this.source + ": " + msg + " (" + this.timestamp + ")");
    };
    AngularliciousLoggingService.decorators = [
        { type: Injectable },
    ];
    return AngularliciousLoggingService;
}());
export { AngularliciousLoggingService };
function AngularliciousLoggingService_tsickle_Closure_declarations() {
    /** @type {?} */
    AngularliciousLoggingService.prototype.applicationName;
    /** @type {?} */
    AngularliciousLoggingService.prototype.serviceName;
    /** @type {?} */
    AngularliciousLoggingService.prototype.source;
    /** @type {?} */
    AngularliciousLoggingService.prototype.severity;
    /** @type {?} */
    AngularliciousLoggingService.prototype.message;
    /** @type {?} */
    AngularliciousLoggingService.prototype.timestamp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvIiwic291cmNlcyI6WyJzcmMvbG9nZ2luZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDOzs7K0JBT2pDLGlCQUFpQjsyQkFDckIsZ0JBQWdCOztJQU05Qjs7T0FFRztJQUNILGVBQWU7SUFDZiwwREFBMEQ7SUFDMUQsOEJBQThCO0lBQzlCLE1BQU07SUFDTiwwR0FBMEc7SUFDMUcsNEJBQTRCO0lBQzVCLGtEQUFrRDtJQUNsRCxRQUFRO0lBQ1IsSUFBSTtJQUVKOzs7Ozs7Ozs7O09BVUc7Ozs7Ozs7Ozs7Ozs7SUFDSCwwQ0FBRzs7Ozs7Ozs7Ozs7O0lBQUgsVUFBSSxNQUFjLEVBQUUsUUFBa0IsRUFBRSxPQUFlO1FBQ3JELElBQUksQ0FBQyxNQUFNLEdBQU0sSUFBSSxDQUFDLGVBQWUsU0FBSSxNQUFRLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRTVCLHFCQUFNLEdBQUcsR0FBRyxLQUFHLElBQUksQ0FBQyxPQUFTLENBQUM7Ozs7OztRQU85QixPQUFPLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxRQUFRLGNBQVMsSUFBSSxDQUFDLE1BQU0sVUFBSyxHQUFHLFVBQUssSUFBSSxDQUFDLFNBQVMsTUFBRyxDQUNuRSxDQUFDO0tBQ0g7O2dCQWpERixVQUFVOzt1Q0FMWDs7U0FNYSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgbG9nZ2luZ1NlcnZpY2VDb25maWcgfSBmcm9tICcuL2xvZ2dpbmcuc2VydmljZS5jb25maWcnO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJy4vc2V2ZXJpdHkuZW51bSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIHtcclxuICBhcHBsaWNhdGlvbk5hbWUgPSAnQW5ndWxhcmxpY2lvLnVzJztcclxuICBzZXJ2aWNlTmFtZSA9ICdMb2dnaW5nU2VydmljZSc7XHJcbiAgc291cmNlOiBzdHJpbmc7XHJcbiAgc2V2ZXJpdHk6IFNldmVyaXR5O1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICB0aW1lc3RhbXA6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGNvbnN0cnVjdG9yLlxyXG4gICAqL1xyXG4gIC8vIGNvbnN0cnVjdG9yKFxyXG4gIC8vICAgICAvLyBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbmZpZzogbG9nZ2luZ1NlcnZpY2VDb25maWdcclxuICAvLyAgICAgYXBwbGljYXRpb25OYW1lOiBzdHJpbmdcclxuICAvLyApIHtcclxuICAvLyAgICAgdGhpcy5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGBTdGFydGluZyBsb2dnaW5nIHNlcnZpY2UgYXQ6ICR7dGhpcy50aW1lc3RhbXB9YCk7XHJcbiAgLy8gICAgIGlmKGFwcGxpY2F0aW9uTmFtZSkge1xyXG4gIC8vICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbk5hbWUgPSBhcHBsaWNhdGlvbk5hbWU7XHJcbiAgLy8gICAgIH1cclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBzZW5kIGEgbG9nIG1lc3NhZ2Ugd2l0aCBzZXZlcml0eSBhbmQgc291cmNlIGluZm9ybWF0aW9uXHJcbiAgICogdG8gdGhlIGFwcGxpY2F0aW9uJ3MgbG9nZ2VyLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGFwcGxpY2F0aW9uIGVudmlyb25tZW50IG1vZGUgaXMgW1Byb2R1Y3Rpb25dLCB0aGUgaW5mb3JtYXRpb24gd2lsbFxyXG4gICAqIGJlIHNlbnQgdG8gYSBjZW50cmFsaXplZCByZXBvc2l0b3J5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNvdXJjZVxyXG4gICAqIEBwYXJhbSBzZXZlcml0eVxyXG4gICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICovXHJcbiAgbG9nKHNvdXJjZTogc3RyaW5nLCBzZXZlcml0eTogU2V2ZXJpdHksIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBgJHt0aGlzLmFwcGxpY2F0aW9uTmFtZX0uJHtzb3VyY2V9YDtcclxuICAgIHRoaXMuc2V2ZXJpdHkgPSBzZXZlcml0eTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgY29uc3QgbXNnID0gYCR7dGhpcy5tZXNzYWdlfWA7XHJcblxyXG4gICAgLy8gdG9kbzogYWRkIHN3aXRjaCBiYXNlZCBvbiB0aGUgc2V2ZXJpdHkgdG86XHJcbiAgICAvLyBjb25zb2xlLmluZm9cclxuICAgIC8vIGNvbnNvbGUud2FyblxyXG4gICAgLy8gY29uc29sZS5lcnJvclxyXG4gICAgLy8gY29uc29sZS5sb2dcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgJHt0aGlzLnNldmVyaXR5fSBmcm9tICR7dGhpcy5zb3VyY2V9OiAke21zZ30gKCR7dGhpcy50aW1lc3RhbXB9KWBcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==