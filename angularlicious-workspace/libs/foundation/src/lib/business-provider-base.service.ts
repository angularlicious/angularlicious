import { AngularliciousLoggingService } from '@angularlicious/logging';

import { ServiceContext } from '@angularlicious/rules-engine';
import { ServiceMessage } from '@angularlicious/rules-engine';
import { MessageType } from '@angularlicious/rules-engine';
import { Severity } from '@angularlicious/logging';

/**
 * Use the business provider base class to access common elements of the business provider.
 *
 * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
 */
export class BusinessProviderBase {
  serviceName: string;
  serviceContext: ServiceContext;
  accessToken: string;

  constructor(public loggingService: AngularliciousLoggingService) {
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Running constructor for the [BusinessProviderBase].`
    );
  }

  /**
   * Use to handle an unexpected error in the application. The error should implement
   * the specified interface. The method will add a new [ServiceMessage] to the
   * specified [ServiceContext].
   * @param error An unexpected application error that implements the [Error] interface.
   *
   * interface Error {
   *  name: string;
   *  message: string;
   *  stack?: string;
   * }
   */
  handleUnexpectedError(error: Error): void {
    const message = new ServiceMessage(error.name, error.message)
      .WithDisplayToUser(true)
      .WithMessageType(MessageType.Error)
      .WithSource(this.serviceName);

    const logItem = `${message.toString()}; ${error.stack}`;
    this.loggingService.log(this.serviceName, Severity.Error, logItem);

    this.serviceContext.addMessage(message);
  }

  finishRequest(sourceName: string): void {
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Request for [${sourceName}] by ${this.serviceName} is complete.`
    );
    if (this.serviceContext.hasErrors()) {
      this.loggingService.log(
        this.serviceName,
        Severity.Information,
        `Preparing to write out the errors.`
      );
      this.serviceContext.Messages.filter(
        f => f.DisplayToUser && f.MessageType === MessageType.Error
      ).forEach(e =>
        this.loggingService.log(this.serviceName, Severity.Error, e.toString())
      );
    }
  }
}
