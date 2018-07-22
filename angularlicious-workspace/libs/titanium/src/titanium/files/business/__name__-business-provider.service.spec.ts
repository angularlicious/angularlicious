import { TestBed, inject } from '@angular/core/testing';

import { SecurityBusinessProviderService } from './__name__-business-provider.service';

describe('SubscriberBusinessProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityBusinessProviderService]
    });
  });

  it(
    'should be created',
    inject(
      [SecurityBusinessProviderService],
      (service: SecurityBusinessProviderService) => {
        expect(service).toBeTruthy();
      }
    )
  );
});
