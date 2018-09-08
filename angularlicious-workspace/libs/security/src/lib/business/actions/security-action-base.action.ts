import { SecurityBusinessProviderService } from './../../business/security-business-provider.service';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { ActionBase } from '@angularlicious/foundation';

export class SecurityActionBase extends ActionBase {
  businessProvider: SecurityBusinessProviderService;
  loggingService: AngularliciousLoggingService;

  constructor() {
    super();
  }

  /**
   * Use the [Do] method to perform the action.
   */
  Do(businessProvider: SecurityBusinessProviderService) {
    // Provide the [SecurityBusinessProviderService], [ServiceContext], and [LoggingService] to action;
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;

    this.execute();
  }
}
