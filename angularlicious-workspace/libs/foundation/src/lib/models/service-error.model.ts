/**
 * Use this model to represent service error/message information from the
 * application's service APIs.
 *
 * The DisplayToUser boolean value indicates whether the message should be
 * displayed to the user if desired.
 */
export class ServiceError {
  // "{"IsSuccess":false,
  // "Message":"Failed to create new user account.",
  // "Errors":[{"Name":"PasswordFormatIsValid",
  // "Message":"The password format is not valid. Must contain at least one: alpha, numeric, and special character.",
  // "Exception":null,"Source":"CreateLearnerAccountAction",
  // DisplayToUser":true,"Target":""}]}"

  Name: string;
  Message: string;
  Exception: any;
  DisplayToUser: boolean;
  Source: string;
  Target: string;
}
