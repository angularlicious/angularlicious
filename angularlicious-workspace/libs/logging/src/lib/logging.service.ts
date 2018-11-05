import { Injectable, Optional } from '@angular/core';

import { Severity } from './severity.enum';
import { LoggingConfig, ILoggingConfig } from '@angularlicious/configuration';
import { ConfigurationService } from '@angularlicious/configuration';

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

  /**
   * The [LoggingService] constructor.
   */
  constructor(
    @Optional() public config: ConfigurationService,
  ) {
    this.timestamp = new Date(Date.now());
    this.log(this.serviceName, Severity.Information, `Starting logging service at: ${this.timestamp}`);
    this.setupConfiguration();
  }

  setupConfiguration() {
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
  log(source: string, severity: Severity, message: string) {
    this.source = `${this.applicationName}.${source}`;
    this.severity = severity;
    this.message = message;
    this.timestamp = new Date(Date.now());

    const logItem = `${this.severity} from ${this.source} at ${this.timestamp}: ${this.message}`;

    switch (this.severity) {
      
      case Severity.Debug:
        console.debug(logItem);
        break;
      case Severity.Information:
        console.info(logItem);
        break;
      case Severity.Warning:
        console.warn(logItem);
        break;
      case Severity.Error:
        console.error(logItem);
        break;
      case Severity.Critical:
        console.error(logItem);
        break;

      default:
        break;
    }
  }
}
