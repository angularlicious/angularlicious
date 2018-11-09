import { NgModule, Injectable, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLogglyModule, LogglyService } from 'ngx-loggly-logger';
import { AngularliciousRulesEngineModule, ValidationContext, IsTrue, IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';
import { ConfigurationService } from '@angularlicious/configuration';
import { ReplaySubject } from 'rxjs';
import { __extends } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularliciousLoggingModule = /** @class */ (function () {
    function AngularliciousLoggingModule() {
    }
    AngularliciousLoggingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule,
                        AngularliciousRulesEngineModule,
                        NgxLogglyModule.forRoot()],
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
var LogEntry = /** @class */ (function () {
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
        this.logEntries$ = new ReplaySubject(1);
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
        { type: Injectable },
    ];
    /** @nocollapse */
    AngularliciousLoggingService.ctorParameters = function () { return [
        { type: ConfigurationService, decorators: [{ type: Optional },] },
    ]; };
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
/**
 * @abstract
 */
var  /**
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
        var /** @type {?} */ validationContext = new ValidationContext();
        validationContext.addRule(new IsTrue('LogWriterExists', 'The log writer is not configured.', this.hasWriter));
        validationContext.addRule(new IsNotNullOrUndefined('EntryIsNotNull', 'The entry cannot be null.', this.targetEntry));
        validationContext.addRule(new StringIsNotNullEmptyRange('SourceIsRequired', 'The entry source is not valid.', this.targetEntry.source, 1, 100));
        validationContext.addRule(new StringIsNotNullEmptyRange('MessageIsValid', 'The message is required for the [Log Entry].', this.targetEntry.message, 1, 2000));
        validationContext.addRule(new IsNotNullOrUndefined('TimestampIsRequired', 'The timestamp must be a valid DateTime value.', this.targetEntry.timestamp));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this writer to log information to the browser console.
 */
var ConsoleWriter = /** @class */ (function (_super) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ConsoleWriter.ctorParameters = function () { return [
        { type: AngularliciousLoggingService, },
    ]; };
    return ConsoleWriter;
}(LogWriter));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    LogglyWriter.ctorParameters = function () { return [
        { type: ConfigurationService, decorators: [{ type: Optional },] },
        { type: AngularliciousLoggingService, },
        { type: LogglyService, },
    ]; };
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

export { AngularliciousLoggingModule, AngularliciousLoggingService, LoggingServiceConfig, Severity, LogWriter, ConsoleWriter, LogglyWriter, LogEntry };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtbG9nZ2luZy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZ2dpbmcubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvbG9nZ2luZy9saWIvbG9nLWVudHJ5LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvbG9nZ2luZy9saWIvbG9nZ2luZy5zZXJ2aWNlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvbG9nZ2luZy9saWIvbG9nZ2luZy5zZXJ2aWNlLmNvbmZpZy50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZy13cml0ZXJzL2xvZy13cml0ZXIudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9sb2dnaW5nL2xpYi9sb2ctd3JpdGVycy9jb25zb2xlLXdyaXRlci50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvbGliL2xvZy13cml0ZXJzL2xvZ2dseS13cml0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmd4TG9nZ2x5TW9kdWxlfSBmcm9tICduZ3gtbG9nZ2x5LWxvZ2dlcidcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNSdWxlc0VuZ2luZU1vZHVsZSxcclxuICAgIE5neExvZ2dseU1vZHVsZS5mb3JSb290KCldLFxyXG4gIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSB7XHJcbn1cclxuIiwiaW1wb3J0IHsgSUxvZ0VudHJ5IH0gZnJvbSBcIi4vaS1sb2ctZW50cnlcIjtcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tIFwiLi9zZXZlcml0eS5lbnVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nRW50cnkgaW1wbGVtZW50cyBJTG9nRW50cnkge1xyXG4gICAgYXBwbGljYXRpb246IHN0cmluZztcclxuICAgIHNvdXJjZTogc3RyaW5nOyAgICBcclxuICAgIHNldmVyaXR5OiBTZXZlcml0eTtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIHRpbWVzdGFtcDogRGF0ZTtcclxuICAgIHRhZ3M/OiBzdHJpbmdbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbjogc3RyaW5nLCBzb3VyY2U6IHN0cmluZywgc2V2ZXJpdHk6IFNldmVyaXR5LCBtZXNzYWdlOiBzdHJpbmcsIHRhZ3M/OiBzdHJpbmdbXSB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XHJcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSBuZXcgRGF0ZShEYXRlLm5vdygpKTtcclxuICAgICAgICB0YWdzID0gdGFncztcclxuICAgIH1cclxufSIsImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJy4vc2V2ZXJpdHkuZW51bSc7XHJcbmltcG9ydCB7IElMb2dnaW5nQ29uZmlnLCBJQ29uZmlndXJhdGlvbiB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IExvZ0VudHJ5IH0gZnJvbSAnLi9sb2ctZW50cnknO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElMb2dFbnRyeSB9IGZyb20gJy4vaS1sb2ctZW50cnknO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB7XHJcbiAgc2VydmljZU5hbWUgPSAnTG9nZ2luZ1NlcnZpY2UnO1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG4gIHNldmVyaXR5OiBTZXZlcml0eTtcclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgdGltZXN0YW1wOiBEYXRlO1xyXG4gIGFwcGxpY2F0aW9uTmFtZTogc3RyaW5nID0gJ2FwcGxpY2F0aW9uJztcclxuICB2ZXJzaW9uOiBzdHJpbmcgPSAnMC4wLjAnO1xyXG4gIGlzUHJvZHVjdGlvbjogYm9vbGVhbjtcclxuICBsb2dnaW5nQ29uZmlnOiBJTG9nZ2luZ0NvbmZpZztcclxuXHJcbiAgbG9nRW50cmllcyQ6IFN1YmplY3Q8SUxvZ0VudHJ5PiA9IG5ldyBSZXBsYXlTdWJqZWN0PElMb2dFbnRyeT4oMSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBbTG9nZ2luZ1NlcnZpY2VdIGNvbnN0cnVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIGNvbmZpZzogQ29uZmlndXJhdGlvblNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMudGltZXN0YW1wID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XHJcbiAgICB0aGlzLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgYFN0YXJ0aW5nIGxvZ2dpbmcgc2VydmljZSBhdDogJHt0aGlzLnRpbWVzdGFtcH1gKTtcclxuXHJcbiAgICBpZihjb25maWcpIHtcclxuICAgICAgdGhpcy5jb25maWcuc2V0dGluZ3MkLnN1YnNjcmliZShcclxuICAgICAgICBzZXR0aW5ncyA9PiB0aGlzLnNldHVwQ29uZmlndXJhdGlvbihzZXR0aW5ncylcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldHVwQ29uZmlndXJhdGlvbihzZXR0aW5nczogSUNvbmZpZ3VyYXRpb24pIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5zZXR0aW5ncyAmJiB0aGlzLmNvbmZpZy5zZXR0aW5ncy5sb2dnaW5nKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ0NvbmZpZyA9IHRoaXMuY29uZmlnLnNldHRpbmdzLmxvZ2dpbmc7XHJcbiAgICAgIHRoaXMuYXBwbGljYXRpb25OYW1lID0gKHRoaXMubG9nZ2luZ0NvbmZpZyAmJiB0aGlzLmxvZ2dpbmdDb25maWcuYXBwbGljYXRpb25OYW1lKSA/IHRoaXMubG9nZ2luZ0NvbmZpZy5hcHBsaWNhdGlvbk5hbWUgOiAnYXBwbGljYXRpb24nO1xyXG4gICAgICB0aGlzLnZlcnNpb24gPSAodGhpcy5sb2dnaW5nQ29uZmlnICYmIHRoaXMubG9nZ2luZ0NvbmZpZy52ZXJzaW9uKSA/IHRoaXMubG9nZ2luZ0NvbmZpZy52ZXJzaW9uIDogJzAuMC4wJztcclxuICAgICAgdGhpcy5pc1Byb2R1Y3Rpb24gPSAodGhpcy5sb2dnaW5nQ29uZmlnICYmIHRoaXMubG9nZ2luZ0NvbmZpZy5pc1Byb2R1Y3Rpb24pID8gdGhpcy5sb2dnaW5nQ29uZmlnLmlzUHJvZHVjdGlvbiA6IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHNlbmQgYSBsb2cgbWVzc2FnZSB3aXRoIHNldmVyaXR5IGFuZCBzb3VyY2UgaW5mb3JtYXRpb25cclxuICAgKiB0byB0aGUgYXBwbGljYXRpb24ncyBsb2dnZXIuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgYXBwbGljYXRpb24gZW52aXJvbm1lbnQgbW9kZSBpcyBbUHJvZHVjdGlvbl0sIHRoZSBpbmZvcm1hdGlvbiB3aWxsXHJcbiAgICogYmUgc2VudCB0byBhIGNlbnRyYWxpemVkIHJlcG9zaXRvcnkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc291cmNlXHJcbiAgICogQHBhcmFtIHNldmVyaXR5XHJcbiAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgKi9cclxuICBsb2coc291cmNlOiBzdHJpbmcsIHNldmVyaXR5OiBTZXZlcml0eSwgbWVzc2FnZTogc3RyaW5nLCB0YWdzPzogc3RyaW5nW10pIHtcclxuICAgIHRoaXMuc291cmNlID0gYCR7dGhpcy5hcHBsaWNhdGlvbk5hbWV9LiR7c291cmNlfWA7XHJcbiAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHk7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgdGhpcy50aW1lc3RhbXAgPSBuZXcgRGF0ZShEYXRlLm5vdygpKTtcclxuXHJcbiAgICBjb25zdCBsb2dFbnRyeSA9IG5ldyBMb2dFbnRyeSh0aGlzLmFwcGxpY2F0aW9uTmFtZSwgdGhpcy5zb3VyY2UsIHRoaXMuc2V2ZXJpdHksIHRoaXMubWVzc2FnZSwgdGFncyk7XHJcbiAgICB0aGlzLmxvZ0VudHJpZXMkLm5leHQobG9nRW50cnkpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2luZ1NlcnZpY2VDb25maWcge1xyXG4gIHB1YmxpYyBhcHBsaWNhdGlvbk5hbWUgPSAnQVBQX05BTUVfTk9UX1BST1ZJREVEJztcclxuICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IElMb2dXcml0ZXIgfSBmcm9tIFwiLi9pLWxvZy13cml0ZXJcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0LCBJc1RydWUsIElzTm90TnVsbE9yVW5kZWZpbmVkLCBTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlIH0gZnJvbSBcIkBhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmVcIjtcclxuaW1wb3J0IHsgSUxvZ0VudHJ5IH0gZnJvbSBcIi4uL2ktbG9nLWVudHJ5XCI7XHJcblxyXG4vLyBASW5qZWN0YWJsZSgpXHJcbiBleHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9nV3JpdGVyIGltcGxlbWVudHMgSUxvZ1dyaXRlciB7XHJcbiAgICBoYXNXcml0ZXI6IGJvb2xlYW47Ly8gPSBmYWxzZTtcclxuICAgIHRhcmdldEVudHJ5OiBJTG9nRW50cnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSB0aGUgd3JpdGUgcHJvY2VzcyBmb3IgdGhlXHJcbiAgICAgKiBzcGVjaWZpZWQgW0xvZyBFbnRyeV0gaXRlbS5cclxuICAgICAqL1xyXG4gICAgZXhlY3V0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVFbnRyeSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5maW5pc2goKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZSB0byBwZXJmb3JtIGFuIHNldHVwIG9yIGNvbmZpZ3VyYXRpb24gb2YgdGhlIFt3cml0ZXJdLiBcclxuICAgICAqIFRoZSBbc2V0dXBdIG1ldGhvZCBydW5zIG9uIGFsbCBleGVjdXRpb25zIG9mIHRoZSB3cml0ZXIgLSBhbmRcclxuICAgICAqIGlzIGNhbGxlZCBiZWZvcmUgdGhlIFt3cml0ZV0gbWV0aG9kLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0dXAoKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZSB0byB2YWxpZGF0ZSB0aGUgW2xvZyBlbnRyeV0gYmVmb3JlIGF0dGVtcHRpbmcgdG8gd3JpdGVcclxuICAgICAqIHVzaW5nIHRoZSBzcGVjaWZpZWQgW2xvZyB3cml0ZXJdLiBcclxuICAgICAqIFxyXG4gICAgICogUmV0dXJucyBhIFtmYWxzZV0gYm9vbGVhbiB0byBpbmRpY2F0ZSB0aGUgaXRlbSBpcyBub3QgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2YWxpZGF0ZUVudHJ5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25Db250ZXh0ID0gbmV3IFZhbGlkYXRpb25Db250ZXh0KCk7XHJcbiAgICAgICAgdmFsaWRhdGlvbkNvbnRleHQuYWRkUnVsZShcclxuICAgICAgICAgIG5ldyBJc1RydWUoXHJcbiAgICAgICAgICAgICdMb2dXcml0ZXJFeGlzdHMnLFxyXG4gICAgICAgICAgICAnVGhlIGxvZyB3cml0ZXIgaXMgbm90IGNvbmZpZ3VyZWQuJyxcclxuICAgICAgICAgICAgdGhpcy5oYXNXcml0ZXJcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICAgIHZhbGlkYXRpb25Db250ZXh0LmFkZFJ1bGUoXHJcbiAgICAgICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXHJcbiAgICAgICAgICAgICdFbnRyeUlzTm90TnVsbCcsXHJcbiAgICAgICAgICAgICdUaGUgZW50cnkgY2Fubm90IGJlIG51bGwuJyxcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRFbnRyeVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdmFsaWRhdGlvbkNvbnRleHQuYWRkUnVsZShcclxuICAgICAgICAgIG5ldyBTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlKFxyXG4gICAgICAgICAgICAnU291cmNlSXNSZXF1aXJlZCcsXHJcbiAgICAgICAgICAgICdUaGUgZW50cnkgc291cmNlIGlzIG5vdCB2YWxpZC4nLFxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEVudHJ5LnNvdXJjZSxcclxuICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgMTAwXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgICB2YWxpZGF0aW9uQ29udGV4dC5hZGRSdWxlKFxyXG4gICAgICAgICAgbmV3IFN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UoJ01lc3NhZ2VJc1ZhbGlkJywgJ1RoZSBtZXNzYWdlIGlzIHJlcXVpcmVkIGZvciB0aGUgW0xvZyBFbnRyeV0uJywgdGhpcy50YXJnZXRFbnRyeS5tZXNzYWdlLCAxLCAyMDAwKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdmFsaWRhdGlvbkNvbnRleHQuYWRkUnVsZShcclxuICAgICAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAgICAgJ1RpbWVzdGFtcElzUmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAnVGhlIHRpbWVzdGFtcCBtdXN0IGJlIGEgdmFsaWQgRGF0ZVRpbWUgdmFsdWUuJyxcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRFbnRyeS50aW1lc3RhbXBcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25Db250ZXh0LnJlbmRlclJ1bGVzKCkuaXNWYWxpZDtcclxuICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlIHRvIGltcGxlbWVudCB0aGUgYWN0dWFsIHdyaXRlIG9mIHRoZSBbTG9nIEVudHJ5XS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IHdyaXRlKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdG8gZmluaXNoIHRoZSBwcm9jZXNzIG9yIGNsZWFuLXVwIGFueSByZXNvdXJjZXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5pc2goKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTG9nV3JpdGVyIH0gZnJvbSBcIi4vbG9nLXdyaXRlclwiO1xyXG5pbXBvcnQgeyBJTG9nRW50cnkgfSBmcm9tIFwiLi4vaS1sb2ctZW50cnlcIjtcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tIFwiLi4vc2V2ZXJpdHkuZW51bVwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gXCIuLy4uL2xvZ2dpbmcuc2VydmljZVwiO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIHdyaXRlciB0byBsb2cgaW5mb3JtYXRpb24gdG8gdGhlIGJyb3dzZXIgY29uc29sZS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbnNvbGVXcml0ZXIgZXh0ZW5kcyBMb2dXcml0ZXIge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBjb25zb2xlLmxvZygnaGknKTtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nRW50cmllcyQuc3Vic2NyaWJlKFxyXG4gICAgICBsb2dFbnRyeSA9PiB0aGlzLmhhbmRsZUxvZ0VudHJ5KGxvZ0VudHJ5KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUxvZ0VudHJ5KGxvZ0VudHJ5OiBJTG9nRW50cnkpIHtcclxuICAgIHRoaXMudGFyZ2V0RW50cnkgPSBsb2dFbnRyeTtcclxuICAgIHRoaXMuZXhlY3V0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTm8gc2V0dXAgcmVxdWlyZWQgZm9yIHRoZSBjb25zb2xlIHdyaXRlci5cclxuICAgKi9cclxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgYWJzdHJhY3QgbWV0aG9kLiBUaGlzIHdpbGwgcGVyZm9ybSB0aGVcclxuICAgKiBhY3R1YWwgYHdyaXRlYCBhY3Rpb24gZm9yIHRoZSBzcGVjaWZpZWQgd3JpdGVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB3cml0ZSgpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAodGhpcy50YXJnZXRFbnRyeS5zZXZlcml0eSkge1xyXG4gICAgICBjYXNlIFNldmVyaXR5LkRlYnVnOlxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcodGhpcy50YXJnZXRFbnRyeSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU2V2ZXJpdHkuSW5mb3JtYXRpb246XHJcbiAgICAgICAgY29uc29sZS5pbmZvKHRoaXMudGFyZ2V0RW50cnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFNldmVyaXR5Lldhcm5pbmc6XHJcbiAgICAgICAgY29uc29sZS53YXJuKHRoaXMudGFyZ2V0RW50cnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFNldmVyaXR5LkVycm9yOlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy50YXJnZXRFbnRyeSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU2V2ZXJpdHkuQ3JpdGljYWw6XHJcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnRhcmdldEVudHJ5KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQgeyBMb2dXcml0ZXIgfSBmcm9tICcuL2xvZy13cml0ZXInO1xyXG5pbXBvcnQgeyBJTG9nRW50cnkgfSBmcm9tICcuLi9pLWxvZy1lbnRyeSc7XHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMb2dnbHlTZXJ2aWNlIH0gZnJvbSAnbmd4LWxvZ2dseS1sb2dnZXInO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vbG9nZ2luZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24sIElMb2dnbHlDb25maWcgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvY29uZmlndXJhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nZ2x5V3JpdGVyIGV4dGVuZHMgTG9nV3JpdGVyIHtcclxuXHJcbiAgbG9nZ2x5Q29uZmlnOiBJTG9nZ2x5Q29uZmlnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlndXJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnbHk6IExvZ2dseVNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY29uZmlnU2VydmljZSAmJiB0aGlzLmxvZ2dpbmdTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLnNldHRpbmdzJC5zdWJzY3JpYmUoIHNldHRpbmdzID0+IHRoaXMuaGFuZGxlU2V0dGluZ3Moc2V0dGluZ3MpKTtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2dFbnRyaWVzJC5zdWJzY3JpYmUoZW50cnkgPT4gdGhpcy5oYW5kbGVMb2dFbnRyeShlbnRyeSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlU2V0dGluZ3Moc2V0dGluZ3M6IElDb25maWd1cmF0aW9uKSB7XHJcbiAgICBpZihzZXR0aW5ncykge1xyXG4gICAgICB0aGlzLmhhc1dyaXRlciA9IHRydWU7XHJcbiAgICAgIHRoaXMubG9nZ2x5Q29uZmlnID0gc2V0dGluZ3MubG9nZ2x5O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTG9nRW50cnkoZW50cnk6IElMb2dFbnRyeSkge1xyXG4gICAgaWYodGhpcy5oYXNXcml0ZXIpIHtcclxuICAgICAgdGhpcy50YXJnZXRFbnRyeSA9IGVudHJ5O1xyXG4gICAgICB0aGlzLmV4ZWN1dGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIGlzIHBhcnQgb2YgdGhlIFtleGVjdXRlXSBwaXBlbGluZS4gRG8gbm90IGNhbGxcclxuICAgKiB0aGlzIG1ldGhvZCBvdXRzaWRlIG9mIHRoZSBjb250ZXh0IG9mIHRoZSBleGVjdXRpb24gcGlwZWxpbmUuXHJcbiAgICogIFxyXG4gICAqIFVzZSB0byBzZXR1cCB0aGUgW0xvZ2dseV0gd3JpdGVyIHdpdGggYW4gW2FwaUtleV0gZnJvbSB0aGVcclxuICAgKiBjb25maWd1cmF0aW9uIHNlcnZpY2UuIFxyXG4gICAqIFxyXG4gICAqIEl0IHdpbGwgdXNlIHRoZSBjb25maWd1cmF0aW9uIHNlcnZpY2UgdG8gY29uZmlndXJlIGFuZCBpbml0aWFsaXplIFxyXG4gICAqIGFuZCBzZXR1cCBhIG5ldyBjYWxsIHRvIGxvZyB0aGUgaW5mb3JtYXRpb24gdG8gdGhlIHdyaXRlci4gXHJcbiAgICovXHJcbiAgcHVibGljIHNldHVwKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaGFzV3JpdGVyKSB7XHJcbiAgICAgIHRoaXMubG9nZ2x5LnB1c2goe1xyXG4gICAgICAgIGxvZ2dseUtleTogdGhpcy5sb2dnbHlDb25maWcuYXBpS2V5LFxyXG4gICAgICAgIHNlbmRDb25zb2xlRXJyb3JzOiB0aGlzLmxvZ2dseUNvbmZpZy5zZW5kQ29uc29sZUVycm9yc1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnRhcmdldEVudHJ5LnRhZ3MgJiYgdGhpcy50YXJnZXRFbnRyeS50YWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCB0YWdzID0gdGhpcy50YXJnZXRFbnRyeS50YWdzLmpvaW4oJywnKTtcclxuICAgICAgICB0aGlzLmxvZ2dseS5wdXNoKHsgdGFnOiB0YWdzIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0IG9mIHRoZSBbZXhlY3V0ZV0gcGlwZWxpbmUgLSBpdCB3aWxsIGJlIGNhbGxlZCBpZiB0aGUgXHJcbiAgICogY3VycmVudCBbTG9nIEVudHJ5XSBpdGVtIGlzIHZhbGlkIGFuZCB0aGUgd3JpdGVyIGlzIGluaXRpYWxpemVkIGFuZCByZWFkeS5cclxuICAgKi9cclxuICBwdWJsaWMgd3JpdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dseS5wdXNoKHRoaXMuZm9ybWF0RW50cnkodGhpcy50YXJnZXRFbnRyeSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gZm9ybWF0IGEgc3BlY2lmaWVkIFtMb2cgRW50cnldIGl0ZW0uIFRoaXMgc2hvdWxkIGJlIG1vdmVkXHJcbiAgICogdG8gYSBzcGVjaWZpYyBbZm9ybWF0dGVyXSBzZXJ2aWNlIHRoYXQgY2FuIGJlIGluamVjdGVkIGludG8gdGhlIHNwZWNpZmllZCBcclxuICAgKiB3cml0ZXIuIFxyXG4gICAqIEBwYXJhbSBsb2dFbnRyeSBcclxuICAgKi9cclxuICBmb3JtYXRFbnRyeShsb2dFbnRyeTogSUxvZ0VudHJ5KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgYXBwbGljYXRpb246JHtsb2dFbnRyeS5hcHBsaWNhdGlvbn07IHNvdXJjZToke1xyXG4gICAgICBsb2dFbnRyeS5zb3VyY2VcclxuICAgIH07IHRpbWVzdGFtcDoke2xvZ0VudHJ5LnRpbWVzdGFtcC50b1VUQ1N0cmluZygpfTsgbWVzc2FnZToke1xyXG4gICAgICBsb2dFbnRyeS5tZXNzYWdlXHJcbiAgICB9YDtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInRzbGli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