import { AlertTypes } from './alert-types.constants';

export class AlertNotification {
  type: string = AlertTypes.Information; // alert-warning, alert-success, alert-info, alert-danger
  header: string;
  title: string;
  messages: Array<string> = new Array<string>();
  showAlert = false;

  constructor(
    header: string,
    title: string,
    messages?: Array<string>,
    type?: string
  ) {
    if (type) {
      this.type = type;
    }

    this.header = header;
    this.title = title;
    if (messages) {
      this.messages = messages;
    }

    if (this.header && this.title) {
      this.showAlert = true; // used to trigger the display of the notification.
    }
  }
}
