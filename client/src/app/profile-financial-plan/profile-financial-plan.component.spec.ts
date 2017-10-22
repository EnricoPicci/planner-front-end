import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFinancialPlanComponent } from './profile-financial-plan.component';

describe('ProfileFinancialPlanComponent', () => {
  let component: ProfileFinancialPlanComponent;
  let fixture: ComponentFixture<ProfileFinancialPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFinancialPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFinancialPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
