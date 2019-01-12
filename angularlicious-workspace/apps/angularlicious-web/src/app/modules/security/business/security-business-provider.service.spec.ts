/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecurityBusinessProviderService } from './security-business-provider.service';

describe('Service: SecurityBusinessProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityBusinessProviderService]
    });
  });

  it(
    'should ...',
    inject(
      [SecurityBusinessProviderService],
      (service: SecurityBusinessProviderService) => {
        expect(service).toBeTruthy();
      }
    )
  );
});
