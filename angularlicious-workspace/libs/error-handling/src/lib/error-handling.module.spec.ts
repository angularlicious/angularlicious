import { async, TestBed } from '@angular/core/testing';
import { ErrorHandlingModule } from './error-handling.module';

describe('ErrorHandlingModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ErrorHandlingModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ErrorHandlingModule).toBeDefined();
  });
});
