import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastProvidersComponent } from './podcast-providers.component';

describe('PodcastProvidersComponent', () => {
  let component: PodcastProvidersComponent;
  let fixture: ComponentFixture<PodcastProvidersComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PodcastProvidersComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
