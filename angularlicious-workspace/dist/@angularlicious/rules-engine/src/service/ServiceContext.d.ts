import { ServiceMessage } from './ServiceMessage';
/**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
export declare class ServiceContext {
    /**
     * A list of service messages added by the application during the processing of the
     * specified service request.
     */
    Messages: Array<ServiceMessage>;
    /**
     * Use this method to add a new message to the [ServiceContext].
     */
    addMessage(message: ServiceMessage): void;
    /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     */
    hasErrors(): boolean;
    /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     */
    isGood(): boolean;
}
