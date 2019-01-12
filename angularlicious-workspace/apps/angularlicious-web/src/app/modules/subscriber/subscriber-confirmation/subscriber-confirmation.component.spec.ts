import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberConfirmationComponent } from './subscriber-confirmation.component';

describe('SubscriberConfirmationComponent', () => {
  let component: SubscriberConfirmationComponent;
  let fixture: ComponentFixture<SubscriberConfirmationComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SubscriberConfirmationComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
