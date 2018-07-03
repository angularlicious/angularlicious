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
    var loggingServiceConfig = (function () {
        function loggingServiceConfig() {
            this.applicationName = 'APP_NAME_NOT_PROVIDED';
        }
        return loggingServiceConfig;
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
    exports.loggingServiceConfig = loggingServiceConfig;
    exports.Severity = Severity;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtbG9nZ2luZy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9sb2dnaW5nL3NyYy9sb2dnaW5nLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvc3JjL2xvZ2dpbmcuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvc3JjL2xvZ2dpbmcuc2VydmljZS5jb25maWcudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgbG9nZ2luZ1NlcnZpY2VDb25maWcgfSBmcm9tICcuL2xvZ2dpbmcuc2VydmljZS5jb25maWcnO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJy4vc2V2ZXJpdHkuZW51bSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIHtcclxuICBhcHBsaWNhdGlvbk5hbWUgPSAnQW5ndWxhcmxpY2lvLnVzJztcclxuICBzZXJ2aWNlTmFtZSA9ICdMb2dnaW5nU2VydmljZSc7XHJcbiAgc291cmNlOiBzdHJpbmc7XHJcbiAgc2V2ZXJpdHk6IFNldmVyaXR5O1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICB0aW1lc3RhbXA6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGNvbnN0cnVjdG9yLlxyXG4gICAqL1xyXG4gIC8vIGNvbnN0cnVjdG9yKFxyXG4gIC8vICAgICAvLyBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbmZpZzogbG9nZ2luZ1NlcnZpY2VDb25maWdcclxuICAvLyAgICAgYXBwbGljYXRpb25OYW1lOiBzdHJpbmdcclxuICAvLyApIHtcclxuICAvLyAgICAgdGhpcy5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuSW5mb3JtYXRpb24sIGBTdGFydGluZyBsb2dnaW5nIHNlcnZpY2UgYXQ6ICR7dGhpcy50aW1lc3RhbXB9YCk7XHJcbiAgLy8gICAgIGlmKGFwcGxpY2F0aW9uTmFtZSkge1xyXG4gIC8vICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbk5hbWUgPSBhcHBsaWNhdGlvbk5hbWU7XHJcbiAgLy8gICAgIH1cclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBzZW5kIGEgbG9nIG1lc3NhZ2Ugd2l0aCBzZXZlcml0eSBhbmQgc291cmNlIGluZm9ybWF0aW9uXHJcbiAgICogdG8gdGhlIGFwcGxpY2F0aW9uJ3MgbG9nZ2VyLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGFwcGxpY2F0aW9uIGVudmlyb25tZW50IG1vZGUgaXMgW1Byb2R1Y3Rpb25dLCB0aGUgaW5mb3JtYXRpb24gd2lsbFxyXG4gICAqIGJlIHNlbnQgdG8gYSBjZW50cmFsaXplZCByZXBvc2l0b3J5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNvdXJjZVxyXG4gICAqIEBwYXJhbSBzZXZlcml0eVxyXG4gICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICovXHJcbiAgbG9nKHNvdXJjZTogc3RyaW5nLCBzZXZlcml0eTogU2V2ZXJpdHksIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBgJHt0aGlzLmFwcGxpY2F0aW9uTmFtZX0uJHtzb3VyY2V9YDtcclxuICAgIHRoaXMuc2V2ZXJpdHkgPSBzZXZlcml0eTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgY29uc3QgbXNnID0gYCR7dGhpcy5tZXNzYWdlfWA7XHJcblxyXG4gICAgLy8gdG9kbzogYWRkIHN3aXRjaCBiYXNlZCBvbiB0aGUgc2V2ZXJpdHkgdG86XHJcbiAgICAvLyBjb25zb2xlLmluZm9cclxuICAgIC8vIGNvbnNvbGUud2FyblxyXG4gICAgLy8gY29uc29sZS5lcnJvclxyXG4gICAgLy8gY29uc29sZS5sb2dcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgJHt0aGlzLnNldmVyaXR5fSBmcm9tICR7dGhpcy5zb3VyY2V9OiAke21zZ30gKCR7dGhpcy50aW1lc3RhbXB9KWBcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBsb2dnaW5nU2VydmljZUNvbmZpZyB7XHJcbiAgcHVibGljIGFwcGxpY2F0aW9uTmFtZSA9ICdBUFBfTkFNRV9OT1RfUFJPVklERUQnO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkluamVjdGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztvQkFHQ0EsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDQyxtQkFBWSxDQUFDO3FCQUN4Qjs7MENBTEQ7Ozs7Ozs7QUNBQTs7bUNBT29CLGlCQUFpQjsrQkFDckIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBOEI5QiwwQ0FBRzs7Ozs7Ozs7Ozs7O1lBQUgsVUFBSSxNQUFjLEVBQUUsUUFBa0IsRUFBRSxPQUFlO2dCQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFNLElBQUksQ0FBQyxlQUFlLFNBQUksTUFBUSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFFNUIscUJBQU0sR0FBRyxHQUFHLEtBQUcsSUFBSSxDQUFDLE9BQVMsQ0FBQzs7Ozs7O2dCQU85QixPQUFPLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxRQUFRLGNBQVMsSUFBSSxDQUFDLE1BQU0sVUFBSyxHQUFHLFVBQUssSUFBSSxDQUFDLFNBQVMsTUFBRyxDQUNuRSxDQUFDO2FBQ0g7O29CQWpERkMsZUFBVTs7MkNBTFg7Ozs7Ozs7QUNBQSxRQUFBOzttQ0FDMkIsdUJBQXVCOzttQ0FEbEQ7UUFFQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==