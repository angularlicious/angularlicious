/**
 * Use this model to represent service error/message information from the
 * application's service APIs.
 *
 * The DisplayToUser boolean value indicates whether the message should be
 * displayed to the user if desired.
 */
export declare class ServiceError {
    Name: string;
    Message: string;
    Exception: any;
    DisplayToUser: boolean;
    Source: string;
    Target: string;
}
