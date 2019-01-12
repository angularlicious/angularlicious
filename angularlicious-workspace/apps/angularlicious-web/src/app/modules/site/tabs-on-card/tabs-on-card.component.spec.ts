import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsOnCardComponent } from './tabs-on-card.component';

describe('TabsOnCardComponent', () => {
  let component: TabsOnCardComponent;
  let fixture: ComponentFixture<TabsOnCardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TabsOnCardComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsOnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
