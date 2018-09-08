import { TestBed, inject } from '@angular/core/testing';

import { SecurityApiService } from './security-api.service';

describe('SubscriberApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityApiService]
    });
  });

  it(
    'should be created',
    inject([SecurityApiService], (service: SecurityApiService) => {
      expect(service).toBeTruthy();
    })
  );
});
