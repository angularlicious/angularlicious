import { Action } from '@angularlicious/actions';
import { ServiceMessage } from '@angularlicious/rules-engine';
import { ServiceContext } from '@angularlicious/rules-engine';
import { MessageType } from '@angularlicious/rules-engine';
import { ActionResult } from '@angularlicious/actions';

import { AngularliciousLoggingService } from '@angularlicious/logging';
import { Severity } from '@angularlicious/logging';
import { ActionBase, ServiceResponse } from '@angularlicious/foundation';
import { SecurityBusinessProviderService } from '../security-business-provider.service';
import { Observable } from 'rxjs';

export class SecurityActionBase extends ActionBase {
  businessProvider: SecurityBusinessProviderService;
  loggingService: AngularliciousLoggingService;
  public response: Observable<ServiceResponse>;

  constructor() {
    super();
  }

  /**
   * Use the [Do] method to perform the action.
   */
  Do(businessProvider: SecurityBusinessProviderService) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;

    this.execute();
  }
}
