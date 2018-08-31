import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularliciousEventsComponent } from './angularlicious-events.component';

describe('AngularliciousEventsComponent', () => {
  let component: AngularliciousEventsComponent;
  let fixture: ComponentFixture<AngularliciousEventsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AngularliciousEventsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularliciousEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
