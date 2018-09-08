import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularliciousLoggingModule = /** @class */ (function () {
    function AngularliciousLoggingModule() {
    }
    AngularliciousLoggingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule]
                },] },
    ];
    return AngularliciousLoggingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LoggingServiceConfig = /** @class */ (function () {
    function LoggingServiceConfig() {
        this.applicationName = 'APP_NAME_NOT_PROVIDED';
    }
    return LoggingServiceConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var Severity = {
    Information: 1,
    Warning: 2,
    Error: 3,
    Critical: 4,
    Debug: 5,
};
Severity[Severity.Information] = "Information";
Severity[Severity.Warning] = "Warning";
Severity[Severity.Error] = "Error";
Severity[Severity.Critical] = "Critical";
Severity[Severity.Debug] = "Debug";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AngularliciousLoggingModule, AngularliciousLoggingService, LoggingServiceConfig, Severity };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtbG9nZ2luZy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZ2dpbmcubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvbG9nZ2luZy9saWIvbG9nZ2luZy5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvbG9nZ2luZy9saWIvbG9nZ2luZy5zZXJ2aWNlLmNvbmZpZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZUNvbmZpZyB9IGZyb20gJy4vbG9nZ2luZy5zZXJ2aWNlLmNvbmZpZyc7XG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJy4vc2V2ZXJpdHkuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIHtcbiAgYXBwbGljYXRpb25OYW1lID0gJ0FuZ3VsYXJsaWNpby51cyc7XG4gIHNlcnZpY2VOYW1lID0gJ0xvZ2dpbmdTZXJ2aWNlJztcbiAgc291cmNlOiBzdHJpbmc7XG4gIHNldmVyaXR5OiBTZXZlcml0eTtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB0aW1lc3RhbXA6IERhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgLy8gY29uc3RydWN0b3IoXG4gIC8vICAgICAvLyBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbmZpZzogbG9nZ2luZ1NlcnZpY2VDb25maWdcbiAgLy8gICAgIGFwcGxpY2F0aW9uTmFtZTogc3RyaW5nXG4gIC8vICkge1xuICAvLyAgICAgdGhpcy5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGBTdGFydGluZyBsb2dnaW5nIHNlcnZpY2UgYXQ6ICR7dGhpcy50aW1lc3RhbXB9YCk7XG4gIC8vICAgICBpZihhcHBsaWNhdGlvbk5hbWUpIHtcbiAgLy8gICAgICAgICB0aGlzLmFwcGxpY2F0aW9uTmFtZSA9IGFwcGxpY2F0aW9uTmFtZTtcbiAgLy8gICAgIH1cbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gc2VuZCBhIGxvZyBtZXNzYWdlIHdpdGggc2V2ZXJpdHkgYW5kIHNvdXJjZSBpbmZvcm1hdGlvblxuICAgKiB0byB0aGUgYXBwbGljYXRpb24ncyBsb2dnZXIuXG4gICAqXG4gICAqIElmIHRoZSBhcHBsaWNhdGlvbiBlbnZpcm9ubWVudCBtb2RlIGlzIFtQcm9kdWN0aW9uXSwgdGhlIGluZm9ybWF0aW9uIHdpbGxcbiAgICogYmUgc2VudCB0byBhIGNlbnRyYWxpemVkIHJlcG9zaXRvcnkuXG4gICAqXG4gICAqIEBwYXJhbSBzb3VyY2VcbiAgICogQHBhcmFtIHNldmVyaXR5XG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBsb2coc291cmNlOiBzdHJpbmcsIHNldmVyaXR5OiBTZXZlcml0eSwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2UgPSBgJHt0aGlzLmFwcGxpY2F0aW9uTmFtZX0uJHtzb3VyY2V9YDtcbiAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHk7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBtc2cgPSBgJHt0aGlzLm1lc3NhZ2V9YDtcblxuICAgIC8vIHRvZG86IGFkZCBzd2l0Y2ggYmFzZWQgb24gdGhlIHNldmVyaXR5IHRvOlxuICAgIC8vIGNvbnNvbGUuaW5mb1xuICAgIC8vIGNvbnNvbGUud2FyblxuICAgIC8vIGNvbnNvbGUuZXJyb3JcbiAgICAvLyBjb25zb2xlLmxvZ1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCR7dGhpcy5zZXZlcml0eX0gZnJvbSAke3RoaXMuc291cmNlfTogJHttc2d9ICgke3RoaXMudGltZXN0YW1wfSlgXG4gICAgKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIExvZ2dpbmdTZXJ2aWNlQ29uZmlnIHtcbiAgcHVibGljIGFwcGxpY2F0aW9uTmFtZSA9ICdBUFBfTkFNRV9OT1RfUFJPVklERUQnO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztnQkFHQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2lCQUN4Qjs7c0NBTEQ7Ozs7Ozs7QUNBQTs7K0JBT29CLGlCQUFpQjsyQkFDckIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBOEI5QiwwQ0FBRzs7Ozs7Ozs7Ozs7O0lBQUgsVUFBSSxNQUFjLEVBQUUsUUFBa0IsRUFBRSxPQUFlO1FBQ3JELElBQUksQ0FBQyxNQUFNLEdBQU0sSUFBSSxDQUFDLGVBQWUsU0FBSSxNQUFRLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRTVCLHFCQUFNLEdBQUcsR0FBRyxLQUFHLElBQUksQ0FBQyxPQUFTLENBQUM7Ozs7OztRQU85QixPQUFPLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxRQUFRLGNBQVMsSUFBSSxDQUFDLE1BQU0sVUFBSyxHQUFHLFVBQUssSUFBSSxDQUFDLFNBQVMsTUFBRyxDQUNuRSxDQUFDO0tBQ0g7O2dCQWpERixVQUFVOzt1Q0FMWDs7Ozs7OztBQ0FBLElBQUE7OytCQUMyQix1QkFBdUI7OytCQURsRDtJQUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==