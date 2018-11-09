import { async, TestBed } from '@angular/core/testing';
import { ConfigurationModule } from './configuration.module';

describe('ConfigurationModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ConfigurationModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ConfigurationModule).toBeDefined();
  });
});
