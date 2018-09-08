import { Injectable, Optional } from '@angular/core';

import { LoggingServiceConfig } from './logging.service.config';
import { Severity } from './severity.enum';

@Injectable()
export class AngularliciousLoggingService {
  applicationName = 'Angularlicio.us';
  serviceName = 'LoggingService';
  source: string;
  severity: Severity;
  message: string;
  timestamp: Date;

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
  log(source: string, severity: Severity, message: string) {
    this.source = `${this.applicationName}.${source}`;
    this.severity = severity;
    this.message = message;
    this.timestamp = new Date();

    const msg = `${this.message}`;

    // todo: add switch based on the severity to:
    // console.info
    // console.warn
    // console.error
    // console.log
    console.log(
      `${this.severity} from ${this.source}: ${msg} (${this.timestamp})`
    );
  }
}
