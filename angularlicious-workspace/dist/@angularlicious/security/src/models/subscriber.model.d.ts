export declare class Subscriber {
    Name: string;
    EmailAddress: string;
    SubscriptionStart: Date;
    /**
     * Use to create a new subscriber for the application. This is not an account - only
     * a subscription to resources from the application.
     * @param subscriberName\
     * @param subscriberEmail
     */
    constructor(subscriberName: string, subscriberEmail: string);
}
