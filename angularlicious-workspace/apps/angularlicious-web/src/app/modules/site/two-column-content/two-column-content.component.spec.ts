import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoColumnContentComponent } from './two-column-content.component';

describe('TwoColumnContentComponent', () => {
  let component: TwoColumnContentComponent;
  let fixture: ComponentFixture<TwoColumnContentComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TwoColumnContentComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColumnContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
