import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSourceComponent } from './event-source.component';

describe('EventSourceComponent', () => {
  let component: EventSourceComponent;
  let fixture: ComponentFixture<EventSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
