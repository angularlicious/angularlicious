/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecurityService } from './security.service';

describe('Service: Security', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityService]
    });
  });

  it(
    'should ...',
    inject([SecurityService], (service: SecurityService) => {
      expect(service).toBeTruthy();
    })
  );
});
