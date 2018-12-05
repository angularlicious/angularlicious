import { AngularliciousLoggingService } from '@angularlicious/logging';
import { ActionBase } from '@angularlicious/foundation';
import { BusinessProviderService } from './business-provider.service';

export class CrossCuttingActionBase extends ActionBase {
  businessProvider: BusinessProviderService;
  loggingService: AngularliciousLoggingService;

  constructor() {
    super();
  }

  /**
   * Use the [Do] method to perform the action.
   */
  Do(businessProvider: BusinessProviderService) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;

    this.execute();
  }
}
