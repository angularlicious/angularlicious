import { CommonModule } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { AngularliciousRulesEngineModule, ValidationContext, IsTrue, IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';
import { ConfigurationService } from '@angularlicious/configuration';
import { NgModule, Injectable, Optional } from '@angular/core';
import { NgxLogglyModule, LogglyService } from 'ngx-loggly-logger';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AngularliciousLoggingModule {
}
AngularliciousLoggingModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule,
                    AngularliciousRulesEngineModule,
                    NgxLogglyModule.forRoot()],
                providers: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const Severity = {
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
class LogEntry {
    /**
     * @param {?} application
     * @param {?} source
     * @param {?} severity
     * @param {?} message
     * @param {?=} tags
     */
    constructor(application, source, severity, message, tags) {
        this.application = application;
        this.source = source;
        this.severity = severity;
        this.message = message;
        this.timestamp = new Date(Date.now());
        this.tags = tags;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AngularliciousLoggingService {
    /**
     * The [LoggingService] constructor.
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.serviceName = 'LoggingService';
        this.applicationName = 'application';
        this.version = '0.0.0';
        this.logEntries$ = new ReplaySubject(1);
        this.timestamp = new Date(Date.now());
        this.log(this.serviceName, Severity.Information, `Starting logging service at: ${this.timestamp}`);
        if (config) {
            this.config.settings$.subscribe(settings => this.setupConfiguration(settings));
        }
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    setupConfiguration(settings) {
        if (this.config && this.config.settings && this.config.settings.logging) {
            this.loggingConfig = this.config.settings.logging;
            this.applicationName = (this.loggingConfig && this.loggingConfig.applicationName) ? this.loggingConfig.applicationName : 'application';
            this.version = (this.loggingConfig && this.loggingConfig.version) ? this.loggingConfig.version : '0.0.0';
            this.isProduction = (this.loggingConfig && this.loggingConfig.isProduction) ? this.loggingConfig.isProduction : false;
        }
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
     * @param {?=} tags
     * @return {?}
     */
    log(source, severity, message, tags) {
        this.source = `${this.applicationName}.${source}`;
        this.severity = severity;
        this.message = message;
        this.timestamp = new Date(Date.now());
        /** @type {?} */
        const logEntry = new LogEntry(this.applicationName, this.source, this.severity, this.message, tags);
        this.logEntries$.next(logEntry);
    }
}
AngularliciousLoggingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AngularliciousLoggingService.ctorParameters = () => [
    { type: ConfigurationService, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoggingServiceConfig {
    constructor() {
        this.applicationName = 'APP_NAME_NOT_PROVIDED';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @Injectable()
/**
 * @abstract
 */
class LogWriter {
    /**
     * Use this method to execute the write process for the
     * specified [Log Entry] item.
     * @return {?}
     */
    execute() {
        this.setup();
        if (this.validateEntry()) {
            this.write();
        }
        this.finish();
    }
    /**
     * Use to validate the [log entry] before attempting to write
     * using the specified [log writer].
     *
     * Returns a [false] boolean to indicate the item is not valid.
     * @return {?}
     */
    validateEntry() {
        /** @type {?} */
        const validationContext = new ValidationContext();
        validationContext.addRule(new IsTrue('LogWriterExists', 'The log writer is not configured.', this.hasWriter));
        validationContext.addRule(new IsNotNullOrUndefined('EntryIsNotNull', 'The entry cannot be null.', this.targetEntry));
        validationContext.addRule(new StringIsNotNullEmptyRange('SourceIsRequired', 'The entry source is not valid.', this.targetEntry.source, 1, 100));
        validationContext.addRule(new StringIsNotNullEmptyRange('MessageIsValid', 'The message is required for the [Log Entry].', this.targetEntry.message, 1, 2000));
        validationContext.addRule(new IsNotNullOrUndefined('TimestampIsRequired', 'The timestamp must be a valid DateTime value.', this.targetEntry.timestamp));
        return validationContext.renderRules().isValid;
    }
    /**
     * Use to finish the process or clean-up any resources.
     * @return {?}
     */
    finish() {
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use this writer to log information to the browser console.
 */
class ConsoleWriter extends LogWriter {
    /**
     * @param {?} loggingService
     */
    constructor(loggingService) {
        super();
        this.loggingService = loggingService;
        this.loggingService.logEntries$.subscribe(logEntry => this.handleLogEntry(logEntry));
    }
    /**
     * @param {?} logEntry
     * @return {?}
     */
    handleLogEntry(logEntry) {
        this.targetEntry = logEntry;
        this.execute();
    }
    /**
     * No setup required for the console writer.
     * @return {?}
     */
    setup() {
    }
    /**
     * Implementation of the abstract method. This will perform the
     * actual `write` action for the specified writer.
     * @return {?}
     */
    write() {
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
    }
}
ConsoleWriter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConsoleWriter.ctorParameters = () => [
    { type: AngularliciousLoggingService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LogglyWriter extends LogWriter {
    /**
     * @param {?} configService
     * @param {?} loggingService
     * @param {?} loggly
     */
    constructor(configService, loggingService, loggly) {
        super();
        this.configService = configService;
        this.loggingService = loggingService;
        this.loggly = loggly;
        if (this.configService && this.loggingService) {
            this.configService.settings$.subscribe(settings => this.handleSettings(settings));
            this.loggingService.logEntries$.subscribe(entry => this.handleLogEntry(entry));
        }
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    handleSettings(settings) {
        if (settings) {
            this.hasWriter = true;
            this.logglyConfig = settings.loggly;
        }
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    handleLogEntry(entry) {
        if (this.hasWriter) {
            this.targetEntry = entry;
            this.execute();
        }
    }
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
    setup() {
        if (this.hasWriter) {
            this.loggly.push({
                logglyKey: this.logglyConfig.apiKey,
                sendConsoleErrors: this.logglyConfig.sendConsoleErrors
            });
            if (this.targetEntry.tags && this.targetEntry.tags.length > 0) {
                /** @type {?} */
                const tags = this.targetEntry.tags.join(',');
                this.loggly.push({ tag: tags });
            }
        }
    }
    /**
     * This method is part of the [execute] pipeline - it will be called if the
     * current [Log Entry] item is valid and the writer is initialized and ready.
     * @return {?}
     */
    write() {
        this.loggly.push(this.formatEntry(this.targetEntry));
    }
    /**
     * Use this function to format a specified [Log Entry] item. This should be moved
     * to a specific [formatter] service that can be injected into the specified
     * writer.
     * @param {?} logEntry
     * @return {?}
     */
    formatEntry(logEntry) {
        return `application:${logEntry.application}; source:${logEntry.source}; timestamp:${logEntry.timestamp.toUTCString()}; message:${logEntry.message}`;
    }
}
/** @nocollapse */
LogglyWriter.ctorParameters = () => [
    { type: ConfigurationService, decorators: [{ type: Optional }] },
    { type: AngularliciousLoggingService },
    { type: LogglyService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularliciousLoggingModule, AngularliciousLoggingService, LoggingServiceConfig, Severity, LogWriter, ConsoleWriter, LogglyWriter, LogEntry };

//# sourceMappingURL=angularlicious-logging.js.map