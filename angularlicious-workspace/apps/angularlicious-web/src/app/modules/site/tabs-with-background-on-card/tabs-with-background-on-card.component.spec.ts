import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsWithBackgroundOnCardComponent } from './tabs-with-background-on-card.component';

describe('TabsWithBackgroundOnCardComponent', () => {
  let component: TabsWithBackgroundOnCardComponent;
  let fixture: ComponentFixture<TabsWithBackgroundOnCardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TabsWithBackgroundOnCardComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsWithBackgroundOnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
