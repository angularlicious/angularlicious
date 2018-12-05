(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('rxjs'), require('@angularlicious/rules-engine'), require('@angularlicious/configuration'), require('@angular/core'), require('ngx-loggly-logger')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/logging', ['exports', '@angular/common', 'rxjs', '@angularlicious/rules-engine', '@angularlicious/configuration', '@angular/core', 'ngx-loggly-logger'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.logging = {}),global.ng.common,global.rxjs,global.rulesEngine,global.configuration,global.ng.core,global.ngxLogglyLogger));
}(this, (function (exports,common,rxjs,rulesEngine,configuration,core,ngxLogglyLogger) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AngularliciousLoggingModule = /** @class */ (function () {
        function AngularliciousLoggingModule() {
        }
        AngularliciousLoggingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule,
                            rulesEngine.AngularliciousRulesEngineModule,
                            ngxLogglyLogger.NgxLogglyModule.forRoot()],
                        providers: []
                    },] }
        ];
        return AngularliciousLoggingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var Severity = {
        Information: 1,
        Warning: 2,
        Error: 3,
        Critical: 4,
        Debug: 5,
    };
    Severity[Severity.Information] = 'Information';
    Severity[Severity.Warning] = 'Warning';
    Severity[Severity.Error] = 'Error';
    Severity[Severity.Critical] = 'Critical';
    Severity[Severity.Debug] = 'Debug';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LogEntry = /** @class */ (function () {
        function LogEntry(application, source, severity, message, tags) {
            this.application = application;
            this.source = source;
            this.severity = severity;
            this.message = message;
            this.timestamp = new Date(Date.now());
            this.tags = tags;
        }
        return LogEntry;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AngularliciousLoggingService = /** @class */ (function () {
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
                /** @type {?} */
                var logEntry = new LogEntry(this.applicationName, this.source, this.severity, this.message, tags);
                this.logEntries$.next(logEntry);
            };
        AngularliciousLoggingService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AngularliciousLoggingService.ctorParameters = function () {
            return [
                { type: configuration.ConfigurationService, decorators: [{ type: core.Optional }] }
            ];
        };
        return AngularliciousLoggingService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoggingServiceConfig = /** @class */ (function () {
        function LoggingServiceConfig() {
            this.applicationName = 'APP_NAME_NOT_PROVIDED';
        }
        return LoggingServiceConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // @Injectable()
    /**
     * @abstract
     */
    var  
    // @Injectable()
    /**
     * @abstract
     */
    LogWriter = /** @class */ (function () {
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
         */
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
                /** @type {?} */
                var validationContext = new rulesEngine.ValidationContext();
                validationContext.addRule(new rulesEngine.IsTrue('LogWriterExists', 'The log writer is not configured.', this.hasWriter));
                validationContext.addRule(new rulesEngine.IsNotNullOrUndefined('EntryIsNotNull', 'The entry cannot be null.', this.targetEntry));
                validationContext.addRule(new rulesEngine.StringIsNotNullEmptyRange('SourceIsRequired', 'The entry source is not valid.', this.targetEntry.source, 1, 100));
                validationContext.addRule(new rulesEngine.StringIsNotNullEmptyRange('MessageIsValid', 'The message is required for the [Log Entry].', this.targetEntry.message, 1, 2000));
                validationContext.addRule(new rulesEngine.IsNotNullOrUndefined('TimestampIsRequired', 'The timestamp must be a valid DateTime value.', this.targetEntry.timestamp));
                return validationContext.renderRules().isValid;
            };
        /**
         * Use to finish the process or clean-up any resources.
         */
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Use this writer to log information to the browser console.
     */
    var ConsoleWriter = /** @class */ (function (_super) {
        __extends(ConsoleWriter, _super);
        function ConsoleWriter(loggingService) {
            var _this = _super.call(this) || this;
            _this.loggingService = loggingService;
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
         */
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
         */
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConsoleWriter.ctorParameters = function () {
            return [
                { type: AngularliciousLoggingService }
            ];
        };
        return ConsoleWriter;
    }(LogWriter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LogglyWriter = /** @class */ (function (_super) {
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
         */
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
                        /** @type {?} */
                        var tags = this.targetEntry.tags.join(',');
                        this.loggly.push({ tag: tags });
                    }
                }
            };
        /**
         * This method is part of the [execute] pipeline - it will be called if the
         * current [Log Entry] item is valid and the writer is initialized and ready.
         */
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
                { type: configuration.ConfigurationService, decorators: [{ type: core.Optional }] },
                { type: AngularliciousLoggingService },
                { type: ngxLogglyLogger.LogglyService }
            ];
        };
        return LogglyWriter;
    }(LogWriter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

//# sourceMappingURL=angularlicious-logging.umd.js.map