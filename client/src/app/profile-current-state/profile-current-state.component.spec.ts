import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCurrentStateComponent } from './profile-current-state.component';

describe('ProfileCurrentStateComponent', () => {
  let component: ProfileCurrentStateComponent;
  let fixture: ComponentFixture<ProfileCurrentStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCurrentStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCurrentStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
