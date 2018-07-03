import { SecurityBusinessProviderService } from './../../business/security-business-provider.service';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { ActionBase } from '@angularlicious/foundation';
export declare class SecurityActionBase extends ActionBase {
    businessProvider: SecurityBusinessProviderService;
    loggingService: AngularliciousLoggingService;
    constructor();
    /**
     * Use the [Do] method to perform the action.
     */
    Do(businessProvider: SecurityBusinessProviderService): void;
}
