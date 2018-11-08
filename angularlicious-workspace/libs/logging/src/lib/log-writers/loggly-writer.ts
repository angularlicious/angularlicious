import { LogWriter } from './log-writer';
import { ILogEntry } from '../i-log-entry';
import { ConfigurationService } from '@angularlicious/configuration';
import { Optional } from '@angular/core';
import { LogglyService } from 'ngx-loggly-logger';
import { AngularliciousLoggingService } from '../logging.service';
import { IConfiguration, ILogglyConfig } from 'dist/@angularlicious/configuration';

export class LogglyWriter extends LogWriter {

  logglyConfig: ILogglyConfig;

  constructor(
    @Optional() private configService: ConfigurationService,
    private loggingService: AngularliciousLoggingService,
    private loggly: LogglyService
  ) {
    super();
    if (
      this.configService && this.loggingService
    ) {
      this.configService.settings$.subscribe( settings => this.handleSettings(settings));
      this.loggingService.logEntries$.subscribe(entry => this.handleLogEntry(entry));
    }
  }

  handleSettings(settings: IConfiguration) {
    if(settings) {
      this.hasWriter = true;
      this.logglyConfig = settings.loggly;
    }
  }

  handleLogEntry(entry: ILogEntry) {
    if(this.hasWriter) {
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
   */
  public setup(): void {
    if (this.hasWriter) {
      this.loggly.push({
        logglyKey: this.logglyConfig.apiKey,
        sendConsoleErrors: this.logglyConfig.sendConsoleErrors
      });

      if (this.targetEntry.tags && this.targetEntry.tags.length > 0) {
        const tags = this.targetEntry.tags.join(',');
        this.loggly.push({ tag: tags });
      }
    }
  }

  /**
   * This method is part of the [execute] pipeline - it will be called if the 
   * current [Log Entry] item is valid and the writer is initialized and ready.
   */
  public write(): void {
    this.loggly.push(this.formatEntry(this.targetEntry));
  }

  /**
   * Use this function to format a specified [Log Entry] item. This should be moved
   * to a specific [formatter] service that can be injected into the specified 
   * writer. 
   * @param logEntry 
   */
  formatEntry(logEntry: ILogEntry): string {
    return `application:${logEntry.application}; source:${
      logEntry.source
    }; timestamp:${logEntry.timestamp.toUTCString()}; message:${
      logEntry.message
    }`;
  }
}
