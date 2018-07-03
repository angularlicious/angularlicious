import { Severity } from './severity.enum';
export declare class AngularliciousLoggingService {
    applicationName: string;
    serviceName: string;
    source: string;
    severity: Severity;
    message: string;
    timestamp: Date;
    /**
     * The [LoggingService] constructor.
     */
    /**
     * Use this method to send a log message with severity and source information
     * to the application's logger.
     *
     * If the application environment mode is [Production], the information will
     * be sent to a centralized repository.
     *
     * @param source
     * @param severity
     * @param message
     */
    log(source: string, severity: Severity, message: string): void;
}
