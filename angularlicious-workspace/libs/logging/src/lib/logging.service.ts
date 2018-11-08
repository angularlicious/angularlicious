import { Injectable, Optional } from '@angular/core';

import { Severity } from './severity.enum';
import { ILoggingConfig, IConfiguration } from '@angularlicious/configuration';
import { ConfigurationService } from '@angularlicious/configuration';
import { LogEntry } from './log-entry';
import { Subject, ReplaySubject } from 'rxjs';
import { ILogEntry } from './i-log-entry';

@Injectable()
export class AngularliciousLoggingService {
  serviceName = 'LoggingService';
  source: string;
  severity: Severity;
  message: string;
  timestamp: Date;
  applicationName: string = 'application';
  version: string = '0.0.0';
  isProduction: boolean;
  loggingConfig: ILoggingConfig;

  logEntries$: Subject<ILogEntry> = new ReplaySubject<ILogEntry>(1);

  /**
   * The [LoggingService] constructor.
   */
  constructor(
    @Optional() public config: ConfigurationService
  ) {
    this.timestamp = new Date(Date.now());
    this.log(this.serviceName, Severity.Information, `Starting logging service at: ${this.timestamp}`);

    if(config) {
      this.config.settings$.subscribe(
        settings => this.setupConfiguration(settings)
      );
    }
  }

  setupConfiguration(settings: IConfiguration) {
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
   * @param source
   * @param severity
   * @param message
   */
  log(source: string, severity: Severity, message: string, tags?: string[]) {
    this.source = `${this.applicationName}.${source}`;
    this.severity = severity;
    this.message = message;
    this.timestamp = new Date(Date.now());

    const logEntry = new LogEntry(this.applicationName, this.source, this.severity, this.message, tags);
    this.logEntries$.next(logEntry);
  }
}
