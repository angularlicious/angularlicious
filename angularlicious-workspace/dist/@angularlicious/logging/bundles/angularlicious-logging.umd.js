(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/logging', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.logging = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousLoggingModule = (function () {
        function AngularliciousLoggingModule() {
        }
        AngularliciousLoggingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule]
                    },] },
        ];
        return AngularliciousLoggingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousLoggingService = (function () {
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
            { type: core.Injectable },
        ];
        return AngularliciousLoggingService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var LoggingServiceConfig = (function () {
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

    exports.AngularliciousLoggingModule = AngularliciousLoggingModule;
    exports.AngularliciousLoggingService = AngularliciousLoggingService;
    exports.LoggingServiceConfig = LoggingServiceConfig;
    exports.Severity = Severity;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtbG9nZ2luZy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9sb2dnaW5nL2xpYi9sb2dnaW5nLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZ2dpbmcuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZ2dpbmcuc2VydmljZS5jb25maWcudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2VDb25maWcgfSBmcm9tICcuL2xvZ2dpbmcuc2VydmljZS5jb25maWcnO1xuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICcuL3NldmVyaXR5LmVudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB7XG4gIGFwcGxpY2F0aW9uTmFtZSA9ICdBbmd1bGFybGljaW8udXMnO1xuICBzZXJ2aWNlTmFtZSA9ICdMb2dnaW5nU2VydmljZSc7XG4gIHNvdXJjZTogc3RyaW5nO1xuICBzZXZlcml0eTogU2V2ZXJpdHk7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgdGltZXN0YW1wOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBUaGUgW0xvZ2dpbmdTZXJ2aWNlXSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gIC8vIGNvbnN0cnVjdG9yKFxuICAvLyAgICAgLy8gQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb25maWc6IGxvZ2dpbmdTZXJ2aWNlQ29uZmlnXG4gIC8vICAgICBhcHBsaWNhdGlvbk5hbWU6IHN0cmluZ1xuICAvLyApIHtcbiAgLy8gICAgIHRoaXMubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkluZm9ybWF0aW9uLCBgU3RhcnRpbmcgbG9nZ2luZyBzZXJ2aWNlIGF0OiAke3RoaXMudGltZXN0YW1wfWApO1xuICAvLyAgICAgaWYoYXBwbGljYXRpb25OYW1lKSB7XG4gIC8vICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbk5hbWUgPSBhcHBsaWNhdGlvbk5hbWU7XG4gIC8vICAgICB9XG4gIC8vIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHNlbmQgYSBsb2cgbWVzc2FnZSB3aXRoIHNldmVyaXR5IGFuZCBzb3VyY2UgaW5mb3JtYXRpb25cbiAgICogdG8gdGhlIGFwcGxpY2F0aW9uJ3MgbG9nZ2VyLlxuICAgKlxuICAgKiBJZiB0aGUgYXBwbGljYXRpb24gZW52aXJvbm1lbnQgbW9kZSBpcyBbUHJvZHVjdGlvbl0sIHRoZSBpbmZvcm1hdGlvbiB3aWxsXG4gICAqIGJlIHNlbnQgdG8gYSBjZW50cmFsaXplZCByZXBvc2l0b3J5LlxuICAgKlxuICAgKiBAcGFyYW0gc291cmNlXG4gICAqIEBwYXJhbSBzZXZlcml0eVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgbG9nKHNvdXJjZTogc3RyaW5nLCBzZXZlcml0eTogU2V2ZXJpdHksIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMuc291cmNlID0gYCR7dGhpcy5hcHBsaWNhdGlvbk5hbWV9LiR7c291cmNlfWA7XG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy50aW1lc3RhbXAgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3QgbXNnID0gYCR7dGhpcy5tZXNzYWdlfWA7XG5cbiAgICAvLyB0b2RvOiBhZGQgc3dpdGNoIGJhc2VkIG9uIHRoZSBzZXZlcml0eSB0bzpcbiAgICAvLyBjb25zb2xlLmluZm9cbiAgICAvLyBjb25zb2xlLndhcm5cbiAgICAvLyBjb25zb2xlLmVycm9yXG4gICAgLy8gY29uc29sZS5sb2dcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAke3RoaXMuc2V2ZXJpdHl9IGZyb20gJHt0aGlzLnNvdXJjZX06ICR7bXNnfSAoJHt0aGlzLnRpbWVzdGFtcH0pYFxuICAgICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBMb2dnaW5nU2VydmljZUNvbmZpZyB7XG4gIHB1YmxpYyBhcHBsaWNhdGlvbk5hbWUgPSAnQVBQX05BTUVfTk9UX1BST1ZJREVEJztcbn1cbiJdLCJuYW1lcyI6WyJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkluamVjdGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztvQkFHQ0EsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDQyxtQkFBWSxDQUFDO3FCQUN4Qjs7MENBTEQ7Ozs7Ozs7QUNBQTs7bUNBT29CLGlCQUFpQjsrQkFDckIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBOEI5QiwwQ0FBRzs7Ozs7Ozs7Ozs7O1lBQUgsVUFBSSxNQUFjLEVBQUUsUUFBa0IsRUFBRSxPQUFlO2dCQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFNLElBQUksQ0FBQyxlQUFlLFNBQUksTUFBUSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFFNUIscUJBQU0sR0FBRyxHQUFHLEtBQUcsSUFBSSxDQUFDLE9BQVMsQ0FBQzs7Ozs7O2dCQU85QixPQUFPLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxRQUFRLGNBQVMsSUFBSSxDQUFDLE1BQU0sVUFBSyxHQUFHLFVBQUssSUFBSSxDQUFDLFNBQVMsTUFBRyxDQUNuRSxDQUFDO2FBQ0g7O29CQWpERkMsZUFBVTs7MkNBTFg7Ozs7Ozs7QUNBQSxRQUFBOzttQ0FDMkIsdUJBQXVCOzttQ0FEbEQ7UUFFQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==