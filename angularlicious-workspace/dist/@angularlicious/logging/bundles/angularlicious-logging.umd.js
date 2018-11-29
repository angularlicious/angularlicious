(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('ngx-loggly-logger'), require('@angularlicious/rules-engine'), require('@angularlicious/configuration'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/logging', ['exports', '@angular/core', '@angular/common', 'ngx-loggly-logger', '@angularlicious/rules-engine', '@angularlicious/configuration', 'rxjs'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.logging = {}),global.ng.core,global.ng.common,null,null,null,global.rxjs));
}(this, (function (exports,core,common,ngxLogglyLogger,rulesEngine,configuration,rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousLoggingModule = (function () {
        function AngularliciousLoggingModule() {
        }
        AngularliciousLoggingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule,
                            rulesEngine.AngularliciousRulesEngineModule,
                            ngxLogglyLogger.NgxLogglyModule.forRoot()],
                        providers: []
                    },] },
        ];
        return AngularliciousLoggingModule;
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
    var LogEntry = (function () {
        function LogEntry(application, source, severity, message, tags) {
            this.application = application;
            this.source = source;
            this.severity = severity;
            this.message = message;
            this.timestamp = new Date(Date.now());
            tags = tags;
        }
        return LogEntry;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousLoggingService = (function () {
        /**
         * The [LoggingService] constructor.
         */
        function AngularliciousLoggingService(config) {
            var _this = this;
            this.config = config;
            this.serviceName = 'LoggingService';
            this.applicationName = 'application';
            this.version = '0.0.0';
            this.logEntries$ = new rxjs.ReplaySubject(1);
            this.timestamp = new Date(Date.now());
            this.log(this.serviceName, Severity.Information, "Starting logging service at: " + this.timestamp);
            if (config) {
                this.config.settings$.subscribe(function (settings) { return _this.setupConfiguration(settings); });
            }
        }
        /**
         * @param {?} settings
         * @return {?}
         */
        AngularliciousLoggingService.prototype.setupConfiguration = /**
         * @param {?} settings
         * @return {?}
         */
            function (settings) {
                if (this.config && this.config.settings && this.config.settings.logging) {
                    this.loggingConfig = this.config.settings.logging;
                    this.applicationName = (this.loggingConfig && this.loggingConfig.applicationName) ? this.loggingConfig.applicationName : 'application';
                    this.version = (this.loggingConfig && this.loggingConfig.version) ? this.loggingConfig.version : '0.0.0';
                    this.isProduction = (this.loggingConfig && this.loggingConfig.isProduction) ? this.loggingConfig.isProduction : false;
                }
            };
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
         * @param {?=} tags
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
         * @param {?=} tags
         * @return {?}
         */
            function (source, severity, message, tags) {
                this.source = this.applicationName + "." + source;
                this.severity = severity;
                this.message = message;
                this.timestamp = new Date(Date.now());
                var /** @type {?} */ logEntry = new LogEntry(this.applicationName, this.source, this.severity, this.message, tags);
                this.logEntries$.next(logEntry);
            };
        AngularliciousLoggingService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AngularliciousLoggingService.ctorParameters = function () {
            return [
                { type: configuration.ConfigurationService, decorators: [{ type: core.Optional },] },
            ];
        };
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
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ LogWriter = (function () {
        function LogWriter() {
        }
        /**
         * Use this method to execute the write process for the
         * specified [Log Entry] item.
         */
        /**
         * Use this method to execute the write process for the
         * specified [Log Entry] item.
         * @return {?}
         */
        LogWriter.prototype.execute = /**
         * Use this method to execute the write process for the
         * specified [Log Entry] item.
         * @return {?}
         */
            function () {
                this.setup();
                if (this.validateEntry()) {
                    this.write();
                }
                this.finish();
            };
        /**
         * Use to validate the [log entry] before attempting to write
         * using the specified [log writer].
         *
         * Returns a [false] boolean to indicate the item is not valid.
         * @return {?}
         */
        LogWriter.prototype.validateEntry = /**
         * Use to validate the [log entry] before attempting to write
         * using the specified [log writer].
         *
         * Returns a [false] boolean to indicate the item is not valid.
         * @return {?}
         */
            function () {
                var /** @type {?} */ validationContext = new rulesEngine.ValidationContext();
                validationContext.addRule(new rulesEngine.IsTrue('LogWriterExists', 'The log writer is not configured.', this.hasWriter));
                validationContext.addRule(new rulesEngine.IsNotNullOrUndefined('EntryIsNotNull', 'The entry cannot be null.', this.targetEntry));
                validationContext.addRule(new rulesEngine.StringIsNotNullEmptyRange('SourceIsRequired', 'The entry source is not valid.', this.targetEntry.source, 1, 100));
                validationContext.addRule(new rulesEngine.StringIsNotNullEmptyRange('MessageIsValid', 'The message is required for the [Log Entry].', this.targetEntry.message, 1, 2000));
                validationContext.addRule(new rulesEngine.IsNotNullOrUndefined('TimestampIsRequired', 'The timestamp must be a valid DateTime value.', this.targetEntry.timestamp));
                return validationContext.renderRules().isValid;
            };
        /**
         * Use to finish the process or clean-up any resources.
         * @return {?}
         */
        LogWriter.prototype.finish = /**
         * Use to finish the process or clean-up any resources.
         * @return {?}
         */
            function () {
            };
        return LogWriter;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Use this writer to log information to the browser console.
     */
    var ConsoleWriter = (function (_super) {
        __extends(ConsoleWriter, _super);
        function ConsoleWriter(loggingService) {
            var _this = _super.call(this) || this;
            _this.loggingService = loggingService;
            console.log('hi');
            _this.loggingService.logEntries$.subscribe(function (logEntry) { return _this.handleLogEntry(logEntry); });
            return _this;
        }
        /**
         * @param {?} logEntry
         * @return {?}
         */
        ConsoleWriter.prototype.handleLogEntry = /**
         * @param {?} logEntry
         * @return {?}
         */
            function (logEntry) {
                this.targetEntry = logEntry;
                this.execute();
            };
        /**
         * No setup required for the console writer.
         * @return {?}
         */
        ConsoleWriter.prototype.setup = /**
         * No setup required for the console writer.
         * @return {?}
         */
            function () {
            };
        /**
         * Implementation of the abstract method. This will perform the
         * actual `write` action for the specified writer.
         * @return {?}
         */
        ConsoleWriter.prototype.write = /**
         * Implementation of the abstract method. This will perform the
         * actual `write` action for the specified writer.
         * @return {?}
         */
            function () {
                switch (this.targetEntry.severity) {
                    case Severity.Debug:
                        console.debug(this.targetEntry);
                        break;
                    case Severity.Information:
                        console.info(this.targetEntry);
                        break;
                    case Severity.Warning:
                        console.warn(this.targetEntry);
                        break;
                    case Severity.Error:
                        console.error(this.targetEntry);
                        break;
                    case Severity.Critical:
                        console.error(this.targetEntry);
                        break;
                    default:
                        break;
                }
            };
        ConsoleWriter.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        ConsoleWriter.ctorParameters = function () {
            return [
                { type: AngularliciousLoggingService, },
            ];
        };
        return ConsoleWriter;
    }(LogWriter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var LogglyWriter = (function (_super) {
        __extends(LogglyWriter, _super);
        function LogglyWriter(configService, loggingService, loggly) {
            var _this = _super.call(this) || this;
            _this.configService = configService;
            _this.loggingService = loggingService;
            _this.loggly = loggly;
            if (_this.configService && _this.loggingService) {
                _this.configService.settings$.subscribe(function (settings) { return _this.handleSettings(settings); });
                _this.loggingService.logEntries$.subscribe(function (entry) { return _this.handleLogEntry(entry); });
            }
            return _this;
        }
        /**
         * @param {?} settings
         * @return {?}
         */
        LogglyWriter.prototype.handleSettings = /**
         * @param {?} settings
         * @return {?}
         */
            function (settings) {
                if (settings) {
                    this.hasWriter = true;
                    this.logglyConfig = settings.loggly;
                }
            };
        /**
         * @param {?} entry
         * @return {?}
         */
        LogglyWriter.prototype.handleLogEntry = /**
         * @param {?} entry
         * @return {?}
         */
            function (entry) {
                if (this.hasWriter) {
                    this.targetEntry = entry;
                    this.execute();
                }
            };
        /**
         * This method is part of the [execute] pipeline. Do not call
         * this method outside of the context of the execution pipeline.
         *
         * Use to setup the [Loggly] writer with an [apiKey] from the
         * configuration service.
         *
         * It will use the configuration service to configure and initialize
         * and setup a new call to log the information to the writer.
         * @return {?}
         */
        LogglyWriter.prototype.setup = /**
         * This method is part of the [execute] pipeline. Do not call
         * this method outside of the context of the execution pipeline.
         *
         * Use to setup the [Loggly] writer with an [apiKey] from the
         * configuration service.
         *
         * It will use the configuration service to configure and initialize
         * and setup a new call to log the information to the writer.
         * @return {?}
         */
            function () {
                if (this.hasWriter) {
                    this.loggly.push({
                        logglyKey: this.logglyConfig.apiKey,
                        sendConsoleErrors: this.logglyConfig.sendConsoleErrors
                    });
                    if (this.targetEntry.tags && this.targetEntry.tags.length > 0) {
                        var /** @type {?} */ tags = this.targetEntry.tags.join(',');
                        this.loggly.push({ tag: tags });
                    }
                }
            };
        /**
         * This method is part of the [execute] pipeline - it will be called if the
         * current [Log Entry] item is valid and the writer is initialized and ready.
         * @return {?}
         */
        LogglyWriter.prototype.write = /**
         * This method is part of the [execute] pipeline - it will be called if the
         * current [Log Entry] item is valid and the writer is initialized and ready.
         * @return {?}
         */
            function () {
                this.loggly.push(this.formatEntry(this.targetEntry));
            };
        /**
         * Use this function to format a specified [Log Entry] item. This should be moved
         * to a specific [formatter] service that can be injected into the specified
         * writer.
         * @param logEntry
         */
        /**
         * Use this function to format a specified [Log Entry] item. This should be moved
         * to a specific [formatter] service that can be injected into the specified
         * writer.
         * @param {?} logEntry
         * @return {?}
         */
        LogglyWriter.prototype.formatEntry = /**
         * Use this function to format a specified [Log Entry] item. This should be moved
         * to a specific [formatter] service that can be injected into the specified
         * writer.
         * @param {?} logEntry
         * @return {?}
         */
            function (logEntry) {
                return "application:" + logEntry.application + "; source:" + logEntry.source + "; timestamp:" + logEntry.timestamp.toUTCString() + "; message:" + logEntry.message;
            };
        /** @nocollapse */
        LogglyWriter.ctorParameters = function () {
            return [
                { type: configuration.ConfigurationService, decorators: [{ type: core.Optional },] },
                { type: AngularliciousLoggingService, },
                { type: ngxLogglyLogger.LogglyService, },
            ];
        };
        return LogglyWriter;
    }(LogWriter));

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
    exports.LogWriter = LogWriter;
    exports.ConsoleWriter = ConsoleWriter;
    exports.LogglyWriter = LogglyWriter;
    exports.LogEntry = LogEntry;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtbG9nZ2luZy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9sb2dnaW5nL2xpYi9sb2dnaW5nLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZy1lbnRyeS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZ2dpbmcuc2VydmljZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZ2dpbmcuc2VydmljZS5jb25maWcudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9sb2dnaW5nL2xpYi9sb2ctd3JpdGVycy9sb2ctd3JpdGVyLnRzIixudWxsLCJuZzovL0Bhbmd1bGFybGljaW91cy9sb2dnaW5nL2xpYi9sb2ctd3JpdGVycy9jb25zb2xlLXdyaXRlci50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZy13cml0ZXJzL2xvZ2dseS13cml0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmd4TG9nZ2x5TW9kdWxlfSBmcm9tICduZ3gtbG9nZ2x5LWxvZ2dlcidcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSxcclxuICAgIE5neExvZ2dseU1vZHVsZS5mb3JSb290KCldLFxyXG4gIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSB7XHJcbn1cclxuIiwiaW1wb3J0IHsgSUxvZ0VudHJ5IH0gZnJvbSBcIi4vaS1sb2ctZW50cnlcIjtcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tIFwiLi9zZXZlcml0eS5lbnVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nRW50cnkgaW1wbGVtZW50cyBJTG9nRW50cnkge1xyXG4gICAgYXBwbGljYXRpb246IHN0cmluZztcclxuICAgIHNvdXJjZTogc3RyaW5nOyAgICBcclxuICAgIHNldmVyaXR5OiBTZXZlcml0eTtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIHRpbWVzdGFtcDogRGF0ZTtcclxuICAgIHRhZ3M/OiBzdHJpbmdbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbjogc3RyaW5nLCBzb3VyY2U6IHN0cmluZywgc2V2ZXJpdHk6IFNldmVyaXR5LCBtZXNzYWdlOiBzdHJpbmcsIHRhZ3M/OiBzdHJpbmdbXSB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XHJcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSBuZXcgRGF0ZShEYXRlLm5vdygpKTtcclxuICAgICAgICB0YWdzID0gdGFncztcclxuICAgIH1cclxufSIsImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJy4vc2V2ZXJpdHkuZW51bSc7XHJcbmltcG9ydCB7IElMb2dnaW5nQ29uZmlnLCBJQ29uZmlndXJhdGlvbiB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IExvZ0VudHJ5IH0gZnJvbSAnLi9sb2ctZW50cnknO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElMb2dFbnRyeSB9IGZyb20gJy4vaS1sb2ctZW50cnknO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB7XHJcbiAgc2VydmljZU5hbWUgPSAnTG9nZ2luZ1NlcnZpY2UnO1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG4gIHNldmVyaXR5OiBTZXZlcml0eTtcclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgdGltZXN0YW1wOiBEYXRlO1xyXG4gIGFwcGxpY2F0aW9uTmFtZTogc3RyaW5nID0gJ2FwcGxpY2F0aW9uJztcclxuICB2ZXJzaW9uOiBzdHJpbmcgPSAnMC4wLjAnO1xyXG4gIGlzUHJvZHVjdGlvbjogYm9vbGVhbjtcclxuICBsb2dnaW5nQ29uZmlnOiBJTG9nZ2luZ0NvbmZpZztcclxuXHJcbiAgbG9nRW50cmllcyQ6IFN1YmplY3Q8SUxvZ0VudHJ5PiA9IG5ldyBSZXBsYXlTdWJqZWN0PElMb2dFbnRyeT4oMSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGNvbnN0cnVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIGNvbmZpZzogQ29uZmlndXJhdGlvblNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMudGltZXN0YW1wID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XHJcbiAgICB0aGlzLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgYFN0YXJ0aW5nIGxvZ2dpbmcgc2VydmljZSBhdDogJHt0aGlzLnRpbWVzdGFtcH1gKTtcclxuXHJcbiAgICBpZihjb25maWcpIHtcclxuICAgICAgdGhpcy5jb25maWcuc2V0dGluZ3MkLnN1YnNjcmliZShcclxuICAgICAgICBzZXR0aW5ncyA9PiB0aGlzLnNldHVwQ29uZmlndXJhdGlvbihzZXR0aW5ncylcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldHVwQ29uZmlndXJhdGlvbihzZXR0aW5nczogSUNvbmZpZ3VyYXRpb24pIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5zZXR0aW5ncyAmJiB0aGlzLmNvbmZpZy5zZXR0aW5ncy5sb2dnaW5nKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ0NvbmZpZyA9IHRoaXMuY29uZmlnLnNldHRpbmdzLmxvZ2dpbmc7XHJcbiAgICAgIHRoaXMuYXBwbGljYXRpb25OYW1lID0gKHRoaXMubG9nZ2luZ0NvbmZpZyAmJiB0aGlzLmxvZ2dpbmdDb25maWcuYXBwbGljYXRpb25OYW1lKSA/IHRoaXMubG9nZ2luZ0NvbmZpZy5hcHBsaWNhdGlvbk5hbWUgOiAnYXBwbGljYXRpb24nO1xyXG4gICAgICB0aGlzLnZlcnNpb24gPSAodGhpcy5sb2dnaW5nQ29uZmlnICYmIHRoaXMubG9nZ2luZ0NvbmZpZy52ZXJzaW9uKSA/IHRoaXMubG9nZ2luZ0NvbmZpZy52ZXJzaW9uIDogJzAuMC4wJztcclxuICAgICAgdGhpcy5pc1Byb2R1Y3Rpb24gPSAodGhpcy5sb2dnaW5nQ29uZmlnICYmIHRoaXMubG9nZ2luZ0NvbmZpZy5pc1Byb2R1Y3Rpb24pID8gdGhpcy5sb2dnaW5nQ29uZmlnLmlzUHJvZHVjdGlvbiA6IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHNlbmQgYSBsb2cgbWVzc2FnZSB3aXRoIHNldmVyaXR5IGFuZCBzb3VyY2UgaW5mb3JtYXRpb25cclxuICAgKiB0byB0aGUgYXBwbGljYXRpb24ncyBsb2dnZXIuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgYXBwbGljYXRpb24gZW52aXJvbm1lbnQgbW9kZSBpcyBbUHJvZHVjdGlvbl0sIHRoZSBpbmZvcm1hdGlvbiB3aWxsXHJcbiAgICogYmUgc2VudCB0byBhIGNlbnRyYWxpemVkIHJlcG9zaXRvcnkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc291cmNlXHJcbiAgICogQHBhcmFtIHNldmVyaXR5XHJcbiAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgKi9cclxuICBsb2coc291cmNlOiBzdHJpbmcsIHNldmVyaXR5OiBTZXZlcml0eSwgbWVzc2FnZTogc3RyaW5nLCB0YWdzPzogc3RyaW5nW10pIHtcclxuICAgIHRoaXMuc291cmNlID0gYCR7dGhpcy5hcHBsaWNhdGlvbk5hbWV9LiR7c291cmNlfWA7XHJcbiAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHk7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgdGhpcy50aW1lc3RhbXAgPSBuZXcgRGF0ZShEYXRlLm5vdygpKTtcclxuXHJcbiAgICBjb25zdCBsb2dFbnRyeSA9IG5ldyBMb2dFbnRyeSh0aGlzLmFwcGxpY2F0aW9uTmFtZSwgdGhpcy5zb3VyY2UsIHRoaXMuc2V2ZXJpdHksIHRoaXMubWVzc2FnZSwgdGFncyk7XHJcbiAgICB0aGlzLmxvZ0VudHJpZXMkLm5leHQobG9nRW50cnkpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2luZ1NlcnZpY2VDb25maWcge1xyXG4gIHB1YmxpYyBhcHBsaWNhdGlvbk5hbWUgPSAnQVBQX05BTUVfTk9UX1BST1ZJREVEJztcclxuICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IElMb2dXcml0ZXIgfSBmcm9tIFwiLi9pLWxvZy13cml0ZXJcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0LCBJc1RydWUsIElzTm90TnVsbE9yVW5kZWZpbmVkLCBTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlIH0gZnJvbSBcIkBhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmVcIjtcclxuaW1wb3J0IHsgSUxvZ0VudHJ5IH0gZnJvbSBcIi4uL2ktbG9nLWVudHJ5XCI7XHJcblxyXG4vLyBASW5qZWN0YWJsZSgpXHJcbiBleHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9nV3JpdGVyIGltcGxlbWVudHMgSUxvZ1dyaXRlciB7XHJcbiAgICBoYXNXcml0ZXI6IGJvb2xlYW47Ly8gPSBmYWxzZTtcclxuICAgIHRhcmdldEVudHJ5OiBJTG9nRW50cnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSB0aGUgd3JpdGUgcHJvY2VzcyBmb3IgdGhlXHJcbiAgICAgKiBzcGVjaWZpZWQgW0xvZyBFbnRyeV0gaXRlbS5cclxuICAgICAqL1xyXG4gICAgZXhlY3V0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVFbnRyeSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5maW5pc2goKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZSB0byBwZXJmb3JtIGFuIHNldHVwIG9yIGNvbmZpZ3VyYXRpb24gb2YgdGhlIFt3cml0ZXJdLiBcclxuICAgICAqIFRoZSBbc2V0dXBdIG1ldGhvZCBydW5zIG9uIGFsbCBleGVjdXRpb25zIG9mIHRoZSB3cml0ZXIgLSBhbmRcclxuICAgICAqIGlzIGNhbGxlZCBiZWZvcmUgdGhlIFt3cml0ZV0gbWV0aG9kLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0dXAoKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZSB0byB2YWxpZGF0ZSB0aGUgW2xvZyBlbnRyeV0gYmVmb3JlIGF0dGVtcHRpbmcgdG8gd3JpdGVcclxuICAgICAqIHVzaW5nIHRoZSBzcGVjaWZpZWQgW2xvZyB3cml0ZXJdLiBcclxuICAgICAqIFxyXG4gICAgICogUmV0dXJucyBhIFtmYWxzZV0gYm9vbGVhbiB0byBpbmRpY2F0ZSB0aGUgaXRlbSBpcyBub3QgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2YWxpZGF0ZUVudHJ5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25Db250ZXh0ID0gbmV3IFZhbGlkYXRpb25Db250ZXh0KCk7XHJcbiAgICAgICAgdmFsaWRhdGlvbkNvbnRleHQuYWRkUnVsZShcclxuICAgICAgICAgIG5ldyBJc1RydWUoXHJcbiAgICAgICAgICAgICdMb2dXcml0ZXJFeGlzdHMnLFxyXG4gICAgICAgICAgICAnVGhlIGxvZyB3cml0ZXIgaXMgbm90IGNvbmZpZ3VyZWQuJyxcclxuICAgICAgICAgICAgdGhpcy5oYXNXcml0ZXJcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICAgIHZhbGlkYXRpb25Db250ZXh0LmFkZFJ1bGUoXHJcbiAgICAgICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXHJcbiAgICAgICAgICAgICdFbnRyeUlzTm90TnVsbCcsXHJcbiAgICAgICAgICAgICdUaGUgZW50cnkgY2Fubm90IGJlIG51bGwuJyxcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRFbnRyeVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdmFsaWRhdGlvbkNvbnRleHQuYWRkUnVsZShcclxuICAgICAgICAgIG5ldyBTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxyXG4gICAgICAgICAgICAnU291cmNlSXNSZXF1aXJlZCcsXHJcbiAgICAgICAgICAgICdUaGUgZW50cnkgc291cmNlIGlzIG5vdCB2YWxpZC4nLFxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEVudHJ5LnNvdXJjZSxcclxuICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgMTAwXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgICB2YWxpZGF0aW9uQ29udGV4dC5hZGRSdWxlKFxyXG4gICAgICAgICAgbmV3IFN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UoJ01lc3NhZ2VJc1ZhbGlkJywgJ1RoZSBtZXNzYWdlIGlzIHJlcXVpcmVkIGZvciB0aGUgW0xvZyBFbnRyeV0uJywgdGhpcy50YXJnZXRFbnRyeS5tZXNzYWdlLCAxLCAyMDAwKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdmFsaWRhdGlvbkNvbnRleHQuYWRkUnVsZShcclxuICAgICAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAgICAgJ1RpbWVzdGFtcElzUmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAnVGhlIHRpbWVzdGFtcCBtdXN0IGJlIGEgdmFsaWQgRGF0ZVRpbWUgdmFsdWUuJyxcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRFbnRyeS50aW1lc3RhbXBcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25Db250ZXh0LnJlbmRlclJ1bGVzKCkuaXNWYWxpZDtcclxuICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlIHRvIGltcGxlbWVudCB0aGUgYWN0dWFsIHdyaXRlIG9mIHRoZSBbTG9nIEVudHJ5XS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IHdyaXRlKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdG8gZmluaXNoIHRoZSBwcm9jZXNzIG9yIGNsZWFuLXVwIGFueSByZXNvdXJjZXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5pc2goKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBMb2dXcml0ZXIgfSBmcm9tIFwiLi9sb2ctd3JpdGVyXCI7XHJcbmltcG9ydCB7IElMb2dFbnRyeSB9IGZyb20gXCIuLi9pLWxvZy1lbnRyeVwiO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gXCIuLi9zZXZlcml0eS5lbnVtXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSBcIi4vLi4vbG9nZ2luZy5zZXJ2aWNlXCI7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgd3JpdGVyIHRvIGxvZyBpbmZvcm1hdGlvbiB0byB0aGUgYnJvd3NlciBjb25zb2xlLlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29uc29sZVdyaXRlciBleHRlbmRzIExvZ1dyaXRlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGNvbnNvbGUubG9nKCdoaScpO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2dFbnRyaWVzJC5zdWJzY3JpYmUoXHJcbiAgICAgIGxvZ0VudHJ5ID0+IHRoaXMuaGFuZGxlTG9nRW50cnkobG9nRW50cnkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlTG9nRW50cnkobG9nRW50cnk6IElMb2dFbnRyeSkge1xyXG4gICAgdGhpcy50YXJnZXRFbnRyeSA9IGxvZ0VudHJ5O1xyXG4gICAgdGhpcy5leGVjdXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBObyBzZXR1cCByZXF1aXJlZCBmb3IgdGhlIGNvbnNvbGUgd3JpdGVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBhYnN0cmFjdCBtZXRob2QuIFRoaXMgd2lsbCBwZXJmb3JtIHRoZVxyXG4gICAqIGFjdHVhbCBgd3JpdGVgIGFjdGlvbiBmb3IgdGhlIHNwZWNpZmllZCB3cml0ZXIuXHJcbiAgICovXHJcbiAgcHVibGljIHdyaXRlKCk6IHZvaWQge1xyXG4gICAgc3dpdGNoICh0aGlzLnRhcmdldEVudHJ5LnNldmVyaXR5KSB7XHJcbiAgICAgIGNhc2UgU2V2ZXJpdHkuRGVidWc6XHJcbiAgICAgICAgY29uc29sZS5kZWJ1Zyh0aGlzLnRhcmdldEVudHJ5KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTZXZlcml0eS5JbmZvcm1hdGlvbjpcclxuICAgICAgICBjb25zb2xlLmluZm8odGhpcy50YXJnZXRFbnRyeSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU2V2ZXJpdHkuV2FybmluZzpcclxuICAgICAgICBjb25zb2xlLndhcm4odGhpcy50YXJnZXRFbnRyeSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU2V2ZXJpdHkuRXJyb3I6XHJcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnRhcmdldEVudHJ5KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTZXZlcml0eS5Dcml0aWNhbDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMudGFyZ2V0RW50cnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IExvZ1dyaXRlciB9IGZyb20gJy4vbG9nLXdyaXRlcic7XHJcbmltcG9ydCB7IElMb2dFbnRyeSB9IGZyb20gJy4uL2ktbG9nLWVudHJ5JztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExvZ2dseVNlcnZpY2UgfSBmcm9tICduZ3gtbG9nZ2x5LWxvZ2dlcic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnaW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQ29uZmlndXJhdGlvbiwgSUxvZ2dseUNvbmZpZyB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9jb25maWd1cmF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dnbHlXcml0ZXIgZXh0ZW5kcyBMb2dXcml0ZXIge1xyXG5cclxuICBsb2dnbHlDb25maWc6IElMb2dnbHlDb25maWc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWd1cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dseTogTG9nZ2x5U2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlICYmIHRoaXMubG9nZ2luZ1NlcnZpY2VcclxuICAgICkge1xyXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2Uuc2V0dGluZ3MkLnN1YnNjcmliZSggc2V0dGluZ3MgPT4gdGhpcy5oYW5kbGVTZXR0aW5ncyhzZXR0aW5ncykpO1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZ0VudHJpZXMkLnN1YnNjcmliZShlbnRyeSA9PiB0aGlzLmhhbmRsZUxvZ0VudHJ5KGVudHJ5KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTZXR0aW5ncyhzZXR0aW5nczogSUNvbmZpZ3VyYXRpb24pIHtcclxuICAgIGlmKHNldHRpbmdzKSB7XHJcbiAgICAgIHRoaXMuaGFzV3JpdGVyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5sb2dnbHlDb25maWcgPSBzZXR0aW5ncy5sb2dnbHk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVMb2dFbnRyeShlbnRyeTogSUxvZ0VudHJ5KSB7XHJcbiAgICBpZih0aGlzLmhhc1dyaXRlcikge1xyXG4gICAgICB0aGlzLnRhcmdldEVudHJ5ID0gZW50cnk7XHJcbiAgICAgIHRoaXMuZXhlY3V0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydCBvZiB0aGUgW2V4ZWN1dGVdIHBpcGVsaW5lLiBEbyBub3QgY2FsbFxyXG4gICAqIHRoaXMgbWV0aG9kIG91dHNpZGUgb2YgdGhlIGNvbnRleHQgb2YgdGhlIGV4ZWN1dGlvbiBwaXBlbGluZS5cclxuICAgKiAgXHJcbiAgICogVXNlIHRvIHNldHVwIHRoZSBbTG9nZ2x5XSB3cml0ZXIgd2l0aCBhbiBbYXBpS2V5XSBmcm9tIHRoZVxyXG4gICAqIGNvbmZpZ3VyYXRpb24gc2VydmljZS4gXHJcbiAgICogXHJcbiAgICogSXQgd2lsbCB1c2UgdGhlIGNvbmZpZ3VyYXRpb24gc2VydmljZSB0byBjb25maWd1cmUgYW5kIGluaXRpYWxpemUgXHJcbiAgICogYW5kIHNldHVwIGEgbmV3IGNhbGwgdG8gbG9nIHRoZSBpbmZvcm1hdGlvbiB0byB0aGUgd3JpdGVyLiBcclxuICAgKi9cclxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5oYXNXcml0ZXIpIHtcclxuICAgICAgdGhpcy5sb2dnbHkucHVzaCh7XHJcbiAgICAgICAgbG9nZ2x5S2V5OiB0aGlzLmxvZ2dseUNvbmZpZy5hcGlLZXksXHJcbiAgICAgICAgc2VuZENvbnNvbGVFcnJvcnM6IHRoaXMubG9nZ2x5Q29uZmlnLnNlbmRDb25zb2xlRXJyb3JzXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMudGFyZ2V0RW50cnkudGFncyAmJiB0aGlzLnRhcmdldEVudHJ5LnRhZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnRhcmdldEVudHJ5LnRhZ3Muam9pbignLCcpO1xyXG4gICAgICAgIHRoaXMubG9nZ2x5LnB1c2goeyB0YWc6IHRhZ3MgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIGlzIHBhcnQgb2YgdGhlIFtleGVjdXRlXSBwaXBlbGluZSAtIGl0IHdpbGwgYmUgY2FsbGVkIGlmIHRoZSBcclxuICAgKiBjdXJyZW50IFtMb2cgRW50cnldIGl0ZW0gaXMgdmFsaWQgYW5kIHRoZSB3cml0ZXIgaXMgaW5pdGlhbGl6ZWQgYW5kIHJlYWR5LlxyXG4gICAqL1xyXG4gIHB1YmxpYyB3cml0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nZ2x5LnB1c2godGhpcy5mb3JtYXRFbnRyeSh0aGlzLnRhcmdldEVudHJ5KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBmb3JtYXQgYSBzcGVjaWZpZWQgW0xvZyBFbnRyeV0gaXRlbS4gVGhpcyBzaG91bGQgYmUgbW92ZWRcclxuICAgKiB0byBhIHNwZWNpZmljIFtmb3JtYXR0ZXJdIHNlcnZpY2UgdGhhdCBjYW4gYmUgaW5qZWN0ZWQgaW50byB0aGUgc3BlY2lmaWVkIFxyXG4gICAqIHdyaXRlci4gXHJcbiAgICogQHBhcmFtIGxvZ0VudHJ5IFxyXG4gICAqL1xyXG4gIGZvcm1hdEVudHJ5KGxvZ0VudHJ5OiBJTG9nRW50cnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBhcHBsaWNhdGlvbjoke2xvZ0VudHJ5LmFwcGxpY2F0aW9ufTsgc291cmNlOiR7XHJcbiAgICAgIGxvZ0VudHJ5LnNvdXJjZVxyXG4gICAgfTsgdGltZXN0YW1wOiR7bG9nRW50cnkudGltZXN0YW1wLnRvVVRDU3RyaW5nKCl9OyBtZXNzYWdlOiR7XHJcbiAgICAgIGxvZ0VudHJ5Lm1lc3NhZ2VcclxuICAgIH1gO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJBbmd1bGFybGljaW91c1J1bGVzRW5naW5lTW9kdWxlIiwiTmd4TG9nZ2x5TW9kdWxlIiwiUmVwbGF5U3ViamVjdCIsIkluamVjdGFibGUiLCJDb25maWd1cmF0aW9uU2VydmljZSIsIk9wdGlvbmFsIiwiVmFsaWRhdGlvbkNvbnRleHQiLCJJc1RydWUiLCJJc05vdE51bGxPclVuZGVmaW5lZCIsIlN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIkxvZ2dseVNlcnZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztvQkFLQ0EsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDQyxtQkFBWTs0QkFDcEJDLDJDQUErQjs0QkFDL0JDLCtCQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzVCLFNBQVMsRUFBRSxFQUFFO3FCQUNkOzswQ0FWRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBLFFBQUE7UUFRSSxrQkFBWSxXQUFtQixFQUFFLE1BQWMsRUFBRSxRQUFrQixFQUFFLE9BQWUsRUFBRSxJQUFzQjtZQUN4RyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDZjt1QkFsQkw7UUFtQkM7Ozs7OztBQ25CRDs7OztRQTBCRSxzQ0FDcUI7WUFEckIsaUJBV0M7WUFWb0IsV0FBTSxHQUFOLE1BQU07K0JBaEJiLGdCQUFnQjttQ0FLSixhQUFhOzJCQUNyQixPQUFPOytCQUlTLElBQUlDLGtCQUFhLENBQVksQ0FBQyxDQUFDO1lBUS9ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsa0NBQWdDLElBQUksQ0FBQyxTQUFXLENBQUMsQ0FBQztZQUVuRyxJQUFHLE1BQU0sRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQzdCLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFBLENBQzlDLENBQUM7YUFDSDtTQUNGOzs7OztRQUVELHlEQUFrQjs7OztZQUFsQixVQUFtQixRQUF3QjtnQkFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtvQkFDdkUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7b0JBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQztvQkFDdkksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN6RyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7aUJBQ3ZIO2FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFhRCwwQ0FBRzs7Ozs7Ozs7Ozs7OztZQUFILFVBQUksTUFBYyxFQUFFLFFBQWtCLEVBQUUsT0FBZSxFQUFFLElBQWU7Z0JBQ3RFLElBQUksQ0FBQyxNQUFNLEdBQU0sSUFBSSxDQUFDLGVBQWUsU0FBSSxNQUFRLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFFdEMscUJBQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pDOztvQkExREZDLGVBQVU7Ozs7O3dCQUxGQyxrQ0FBb0IsdUJBdUJ4QkMsYUFBUTs7OzJDQTNCYjs7Ozs7OztBQ0FBLFFBQUE7O21DQUMyQix1QkFBdUI7O21DQURsRDtRQUdDOzs7Ozs7QUNERDs7O0FBSUM7O1FBQUE7Ozs7Ozs7Ozs7OztRQVFHLDJCQUFPOzs7OztZQUFQO2dCQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNoQjtnQkFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakI7Ozs7Ozs7O1FBZU0saUNBQWE7Ozs7Ozs7O2dCQUNoQixxQkFBTSxpQkFBaUIsR0FBRyxJQUFJQyw2QkFBaUIsRUFBRSxDQUFDO2dCQUNsRCxpQkFBaUIsQ0FBQyxPQUFPLENBQ3ZCLElBQUlDLGtCQUFNLENBQ1IsaUJBQWlCLEVBQ2pCLG1DQUFtQyxFQUNuQyxJQUFJLENBQUMsU0FBUyxDQUNmLENBQ0YsQ0FBQztnQkFDRixpQkFBaUIsQ0FBQyxPQUFPLENBQ3ZCLElBQUlDLGdDQUFvQixDQUN0QixnQkFBZ0IsRUFDaEIsMkJBQTJCLEVBQzNCLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQ0YsQ0FBQztnQkFDRixpQkFBaUIsQ0FBQyxPQUFPLENBQ3ZCLElBQUlDLHFDQUF5QixDQUMzQixrQkFBa0IsRUFDbEIsZ0NBQWdDLEVBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUN2QixDQUFDLEVBQ0QsR0FBRyxDQUNKLENBQ0YsQ0FBQztnQkFDRixpQkFBaUIsQ0FBQyxPQUFPLENBQ3ZCLElBQUlBLHFDQUF5QixDQUFDLGdCQUFnQixFQUFFLDhDQUE4QyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FDbkksQ0FBQztnQkFDRixpQkFBaUIsQ0FBQyxPQUFPLENBQ3ZCLElBQUlELGdDQUFvQixDQUN0QixxQkFBcUIsRUFDckIsK0NBQStDLEVBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUMzQixDQUNGLENBQUM7Z0JBRUYsT0FBTyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUM7Ozs7OztRQVc1QywwQkFBTTs7Ozs7O3dCQWxGakI7UUFxRkM7O0lDckZEOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9FLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFFRix1QkFBMEIsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7Ozs7Ozs7Ozs7UUNqQmtDRSxpQ0FBUztRQUUxQyx1QkFDVTtZQURWLFlBR0UsaUJBQU8sU0FLUjtZQVBTLG9CQUFjLEdBQWQsY0FBYztZQUd0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FDdkMsVUFBQSxRQUFRLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFBLENBQzFDLENBQUM7O1NBQ0g7Ozs7O1FBRUQsc0NBQWM7Ozs7WUFBZCxVQUFlLFFBQW1CO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCOzs7OztRQUtNLDZCQUFLOzs7Ozs7Ozs7OztRQU9MLDZCQUFLOzs7Ozs7Z0JBQ1YsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7b0JBQy9CLEtBQUssUUFBUSxDQUFDLEtBQUs7d0JBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO29CQUNSLEtBQUssUUFBUSxDQUFDLFdBQVc7d0JBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUMvQixNQUFNO29CQUNSLEtBQUssUUFBUSxDQUFDLE9BQU87d0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUMvQixNQUFNO29CQUNSLEtBQUssUUFBUSxDQUFDLEtBQUs7d0JBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO29CQUNSLEtBQUssUUFBUSxDQUFDLFFBQVE7d0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO29CQUNSO3dCQUNFLE1BQU07aUJBQ1Q7OztvQkEvQ0pQLGVBQVU7Ozs7O3dCQUxGLDRCQUE0Qjs7OzRCQUpyQztNQVVtQyxTQUFTOzs7Ozs7O1FDRlZPLGdDQUFTO1FBSXpDLHNCQUNzQixlQUNaLGdCQUNBO1lBSFYsWUFLRSxpQkFBTyxTQU9SO1lBWHFCLG1CQUFhLEdBQWIsYUFBYTtZQUN6QixvQkFBYyxHQUFkLGNBQWM7WUFDZCxZQUFNLEdBQU4sTUFBTTtZQUdkLElBQ0UsS0FBSSxDQUFDLGFBQWEsSUFBSSxLQUFJLENBQUMsY0FDN0IsRUFBRTtnQkFDQSxLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUUsVUFBQSxRQUFRLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFBLENBQUMsQ0FBQztnQkFDbkYsS0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBQSxDQUFDLENBQUM7YUFDaEY7O1NBQ0Y7Ozs7O1FBRUQscUNBQWM7Ozs7WUFBZCxVQUFlLFFBQXdCO2dCQUNyQyxJQUFHLFFBQVEsRUFBRTtvQkFDWCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNyQzthQUNGOzs7OztRQUVELHFDQUFjOzs7O1lBQWQsVUFBZSxLQUFnQjtnQkFDN0IsSUFBRyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNoQjthQUNGOzs7Ozs7Ozs7Ozs7UUFZTSw0QkFBSzs7Ozs7Ozs7Ozs7O2dCQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTTt3QkFDbkMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7cUJBQ3ZELENBQUMsQ0FBQztvQkFFSCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQzdELHFCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7cUJBQ2pDO2lCQUNGOzs7Ozs7O1FBT0ksNEJBQUs7Ozs7OztnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7UUFTdkQsa0NBQVc7Ozs7Ozs7WUFBWCxVQUFZLFFBQW1CO2dCQUM3QixPQUFPLGlCQUFlLFFBQVEsQ0FBQyxXQUFXLGlCQUN4QyxRQUFRLENBQUMsTUFBTSxvQkFDRixRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxrQkFDN0MsUUFBUSxDQUFDLE9BQ1QsQ0FBQzthQUNKOzs7O3dCQWxGTU4sa0NBQW9CLHVCQVd4QkMsYUFBUTt3QkFSSiw0QkFBNEI7d0JBRDVCTSw2QkFBYTs7OzJCQUp0QjtNQVFrQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==