import { Observable } from 'rxjs';
import { ServiceBase, ServiceResponse } from '@angularlicious/foundation';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { Subscriber } from './../models/subscriber.model';
import { SecurityApiService } from './security-api.service';
export declare class SecurityBusinessProviderService extends ServiceBase {
    securityApiService: SecurityApiService;
    constructor(loggingService: AngularliciousLoggingService, securityApiService: SecurityApiService);
    /**
     * Use action to register a new subscriber.
     * @param subscriber
     */
    registerSubscriber(subscriber: Subscriber): Observable<ServiceResponse>;
}
