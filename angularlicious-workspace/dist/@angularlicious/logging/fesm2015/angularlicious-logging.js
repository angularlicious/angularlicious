import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularliciousLoggingModule {
}
AngularliciousLoggingModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularliciousLoggingService {
    constructor() {
        this.applicationName = 'Angularlicio.us';
        this.serviceName = 'LoggingService';
    }
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
    log(source, severity, message) {
        this.source = `${this.applicationName}.${source}`;
        this.severity = severity;
        this.message = message;
        this.timestamp = new Date();
        const /** @type {?} */ msg = `${this.message}`;
        // todo: add switch based on the severity to:
        // console.info
        // console.warn
        // console.error
        // console.log
        console.log(`${this.severity} from ${this.source}: ${msg} (${this.timestamp})`);
    }
}
AngularliciousLoggingService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LoggingServiceConfig {
    constructor() {
        this.applicationName = 'APP_NAME_NOT_PROVIDED';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const Severity = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtbG9nZ2luZy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZ2dpbmcubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvbG9nZ2luZy9saWIvbG9nZ2luZy5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvbG9nZ2luZy9saWIvbG9nZ2luZy5zZXJ2aWNlLmNvbmZpZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZUNvbmZpZyB9IGZyb20gJy4vbG9nZ2luZy5zZXJ2aWNlLmNvbmZpZyc7XG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJy4vc2V2ZXJpdHkuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIHtcbiAgYXBwbGljYXRpb25OYW1lID0gJ0FuZ3VsYXJsaWNpby51cyc7XG4gIHNlcnZpY2VOYW1lID0gJ0xvZ2dpbmdTZXJ2aWNlJztcbiAgc291cmNlOiBzdHJpbmc7XG4gIHNldmVyaXR5OiBTZXZlcml0eTtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB0aW1lc3RhbXA6IERhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgLy8gY29uc3RydWN0b3IoXG4gIC8vICAgICAvLyBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbmZpZzogbG9nZ2luZ1NlcnZpY2VDb25maWdcbiAgLy8gICAgIGFwcGxpY2F0aW9uTmFtZTogc3RyaW5nXG4gIC8vICkge1xuICAvLyAgICAgdGhpcy5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGBTdGFydGluZyBsb2dnaW5nIHNlcnZpY2UgYXQ6ICR7dGhpcy50aW1lc3RhbXB9YCk7XG4gIC8vICAgICBpZihhcHBsaWNhdGlvbk5hbWUpIHtcbiAgLy8gICAgICAgICB0aGlzLmFwcGxpY2F0aW9uTmFtZSA9IGFwcGxpY2F0aW9uTmFtZTtcbiAgLy8gICAgIH1cbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gc2VuZCBhIGxvZyBtZXNzYWdlIHdpdGggc2V2ZXJpdHkgYW5kIHNvdXJjZSBpbmZvcm1hdGlvblxuICAgKiB0byB0aGUgYXBwbGljYXRpb24ncyBsb2dnZXIuXG4gICAqXG4gICAqIElmIHRoZSBhcHBsaWNhdGlvbiBlbnZpcm9ubWVudCBtb2RlIGlzIFtQcm9kdWN0aW9uXSwgdGhlIGluZm9ybWF0aW9uIHdpbGxcbiAgICogYmUgc2VudCB0byBhIGNlbnRyYWxpemVkIHJlcG9zaXRvcnkuXG4gICAqXG4gICAqIEBwYXJhbSBzb3VyY2VcbiAgICogQHBhcmFtIHNldmVyaXR5XG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBsb2coc291cmNlOiBzdHJpbmcsIHNldmVyaXR5OiBTZXZlcml0eSwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2UgPSBgJHt0aGlzLmFwcGxpY2F0aW9uTmFtZX0uJHtzb3VyY2V9YDtcbiAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHk7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBtc2cgPSBgJHt0aGlzLm1lc3NhZ2V9YDtcblxuICAgIC8vIHRvZG86IGFkZCBzd2l0Y2ggYmFzZWQgb24gdGhlIHNldmVyaXR5IHRvOlxuICAgIC8vIGNvbnNvbGUuaW5mb1xuICAgIC8vIGNvbnNvbGUud2FyblxuICAgIC8vIGNvbnNvbGUuZXJyb3JcbiAgICAvLyBjb25zb2xlLmxvZ1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCR7dGhpcy5zZXZlcml0eX0gZnJvbSAke3RoaXMuc291cmNlfTogJHttc2d9ICgke3RoaXMudGltZXN0YW1wfSlgXG4gICAgKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIExvZ2dpbmdTZXJ2aWNlQ29uZmlnIHtcbiAgcHVibGljIGFwcGxpY2F0aW9uTmFtZSA9ICdBUFBfTkFNRV9OT1RfUFJPVklERUQnO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7O1lBR0MsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4Qjs7Ozs7OztBQ0xEOzsrQkFPb0IsaUJBQWlCOzJCQUNyQixnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7O0lBOEI5QixHQUFHLENBQUMsTUFBYyxFQUFFLFFBQWtCLEVBQUUsT0FBZTtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFNUIsdUJBQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7Ozs7UUFPOUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxHQUFHLElBQUksQ0FBQyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUNuRSxDQUFDO0tBQ0g7OztZQWpERixVQUFVOzs7Ozs7O0FDTFg7OytCQUMyQix1QkFBdUI7O0NBQ2pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==