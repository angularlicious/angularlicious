import { async, TestBed } from '@angular/core/testing';
import { ErrorHandlericiousModule } from './error-handlericious.module';

describe('ErrorHandlericiousModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ErrorHandlericiousModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ErrorHandlericiousModule).toBeDefined();
  });
});
