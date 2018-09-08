import { async, TestBed } from '@angular/core/testing';
import { ContentfulModule } from './contentful.module';

describe('ContentfulModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ContentfulModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ContentfulModule).toBeDefined();
  });
});
