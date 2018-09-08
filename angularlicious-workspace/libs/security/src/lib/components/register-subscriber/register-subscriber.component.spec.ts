import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSubscriberComponent } from './register-subscriber.component';

describe('RegisterSubscriberComponent', () => {
  let component: RegisterSubscriberComponent;
  let fixture: ComponentFixture<RegisterSubscriberComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterSubscriberComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
