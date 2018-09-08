import { ServiceMessage } from './ServiceMessage';
import { MessageType } from './MessageType';

/**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
export class ServiceContext {
  /**
   * A list of service messages added by the application during the processing of the
   * specified service request.
   */
  Messages: Array<ServiceMessage> = new Array<ServiceMessage>();

  /**
   * Use this method to add a new message to the [ServiceContext].
   */
  addMessage(message: ServiceMessage) {
    this.Messages.push(message);
  }

  /**
   * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
   */
  hasErrors(): boolean {
    if (this.Messages && this.Messages.length > 0) {
      const errorMessages = this.Messages.filter(
        f => f.MessageType === MessageType.Error
      );
      if (errorMessages.length > 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Use to determine if the current [ServiceContext] does not contain any errors.
   */
  isGood(): boolean {
    if (this.Messages && this.Messages.length > 0) {
      const errorMessages = this.Messages.filter(
        f => f.MessageType === MessageType.Error
      );
      if (errorMessages.length > 0) {
        return false;
      }
    }
    return true;
  }
}
