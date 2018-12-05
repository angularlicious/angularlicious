import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLargeComponent } from './modal-large.component';

describe('ModalLargeComponent', () => {
  let component: ModalLargeComponent;
  let fixture: ComponentFixture<ModalLargeComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ModalLargeComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
