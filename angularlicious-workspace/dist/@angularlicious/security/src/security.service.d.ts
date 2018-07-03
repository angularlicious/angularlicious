import { Observable } from 'rxjs';
import { ServiceBase, ServiceResponse } from '@angularlicious/foundation';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { SecurityBusinessProviderService } from './business/security-business-provider.service';
import { Subscriber } from './models/subscriber.model';
export declare class AngularliciousSecurityService extends ServiceBase {
    private businessProvider;
    constructor(loggingService: AngularliciousLoggingService, businessProvider: SecurityBusinessProviderService);
    /**
     * Use to register a new subscriber to the application.
     * @param subscriber contains the user name and email address for the subscriber.
     */
    registerSubscriber(subscriber: Subscriber): Observable<ServiceResponse>;
    verifyService(): boolean;
}
