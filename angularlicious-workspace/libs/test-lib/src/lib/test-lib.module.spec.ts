import { async, TestBed } from '@angular/core/testing';
import { TestLibModule } from './test-lib.module';

describe('TestLibModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestLibModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(TestLibModule).toBeDefined();
  });
});
