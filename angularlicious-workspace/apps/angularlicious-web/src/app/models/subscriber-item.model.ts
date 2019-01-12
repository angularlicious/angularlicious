export class SubscriberItem {
  Id: string;
  EmailAddress: string;
  IsUnsubscribed: boolean;
  IsVerified: boolean;
  Name: string;
  SubscriptionStart: Date = new Date();
  VerifiedDate?: Date;
}
