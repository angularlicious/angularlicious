import { async, TestBed } from '@angular/core/testing';
import { HttpServiceModule } from './http-service.module';

describe('HttpServiceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpServiceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HttpServiceModule).toBeDefined();
  });
});
