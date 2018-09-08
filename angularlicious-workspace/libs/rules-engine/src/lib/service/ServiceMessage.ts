import { MessageType } from './MessageType';

/**
 * Use this class to create a message for the current [ServiceContext].
 */
export class ServiceMessage {
  /** Use to specify the name of the message. */
  Name: string;

  /** Use to specify the message. */
  Message: string;

  /** Use to specifiy  */
  MessageType: MessageType;

  /** Use to indicate the source of the message. */
  Source: string;

  /** Use to indicate if the specified message should be displayed to the user. */
  DisplayToUser: boolean;

  /**
   * The constructor for the [ServiceMessage].
   * @param name The name of the message.
   * @param message The display text of the message.
   * @param messageType: Indicates the type of message.
   * @param source: Indicates the source of the message.
   * @param displayToUser: Indicates if the message is displayable.
   */

  constructor(
    name: string,
    message?: string,
    messageType?: MessageType,
    source?: string
  );
  /**
   * The constructor for the [ServiceMessage].
   * @param name The name of the message.
   * @param message The display text of the message.
   * @param messageType: Indicates the type of message.
   * @param source: Indicates the source of the message.
   */
  constructor(
    name: string,
    message: string,
    messageType?: MessageType,
    source?: string
  );
  /**
   *
   * @param name The name of the message.
   * @param message The display text of the message.
   * @param messageType: Indicates the type of message.
   * @param source: Indicates the source of the message.
   * @param displayToUser Use to indicate if the specified message should be displayed to the user.
   */
  constructor(
    name: string,
    message: string,
    messageType?: MessageType,
    source?: string,
    displayToUser: boolean = false
  ) {
    this.Name = name;
    this.Message = message;
    if (message) {
      this.MessageType = messageType as MessageType;
    }
    if (source) {
      this.Source = source as string;
    }
  }

  /**
   * Use this extension method to add the name of the message.
   * @param name The name of the service message.
   */
  WithName(name: string) {
    this.Name = name;
    return this;
  }

  /**
   * Use this extension method to add the message text to the ServiceMessage item.
   * @param message The display text of the service message.
   */
  WithMessage(message: string) {
    this.Message = message;
    return this;
  }

  /**
   * Use this extension method to set the [MessageType] of the ServiceMessage item.
   * @param messageType: Use to indicate the message type.
   */
  WithMessageType(messageType: MessageType) {
    this.MessageType = messageType;
    return this;
  }

  /**
   * Use this extension method to set the [Source] of the ServiceMessage item.
   * @param source: Use to indicate the source of the message.
   */
  WithSource(source: string) {
    this.Source = source;
    return this;
  }

  /**
   * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
   * @param displayToUser: A boolean value to indicate if the message can be displayed to the user.
   */
  WithDisplayToUser(displayToUser: boolean) {
    this.DisplayToUser = displayToUser;
    return this;
  }

  /**
   * Use this method return a string representing the ServiceMessage.
   */
  toString() {
    return `Name: ${this.Name}; Message: ${
      this.Message
    }; MessageType: ${this.MessageType.toString()}; Source: ${
      this.Source
    }; DisplayToUser: ${this.DisplayToUser}`;
  }
}
