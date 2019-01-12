import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProviderDialogComponent } from './auth-provider-dialog.component';

describe('AuthProviderDialogComponent', () => {
  let component: AuthProviderDialogComponent;
  let fixture: ComponentFixture<AuthProviderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthProviderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthProviderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
