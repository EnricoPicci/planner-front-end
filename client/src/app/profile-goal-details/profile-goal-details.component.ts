import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Subscription} from 'rxjs/Rx';

import {GoalInterface} from '../shared/model/goal.interface';
import {GoalTypeCodes} from '../shared/model/goal-type.interface';
import {ProfileInterface} from '../shared/model/profile.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-goal-details',
  templateUrl: './profile-goal-details.component.html',
  styleUrls: ['./profile-goal-details.component.css']
})
export class ProfileGoalDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() goal: GoalInterface;
  @Input() profile: ProfileInterface;

  goalForm: FormGroup;
  goalFormSubscription: Subscription;

  constructor(private fb: FormBuilder, private session: SessionService) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (this.goalForm) {
      this.goalForm.patchValue(simpleChanges.goal.currentValue);
    }
  }
  ngOnInit() {
    this.createForm(this.goal);
    this.goalFormSubscription = this.goalForm.valueChanges.subscribe(formValues => {
      this.goal.value = this.goalForm.value.value;
      this.goal.name = this.goalForm.value.name;
      this.session.goalSelectedChanged(this.goal);
    });
  }
  ngOnDestroy() {
    this.goalFormSubscription.unsubscribe();
  }
  createForm(goal: GoalInterface) {
    this.goalForm = this.fb.group({
      value: [goal.value, Validators.required],
      name: [goal.name, Validators.required]
    });
  }

  ageChanged(age: number) {
    this.goal.age = age;
    this.session.goalSelectedChanged(this.goal);
  }
  // cashComponentChanged(cashComponent: number) {
  //   this.goal.cashComponent = cashComponent;
  //   this.session.goalSelectedChanged(this.goal);
  // }
  // debtComponentChanged(debtComponent: number) {
  //   this.goal.debtComponent = debtComponent;
  //   this.session.goalSelectedChanged(this.goal);
  // }
  // debtInterestChanged(debtInterest: number) {
  //   this.goal.debtInterest = debtInterest;
  //   this.session.goalSelectedChanged(this.goal);
  // }
  // debtDurationChanged(debtDuration: number) {
  //   this.goal.debtDuration = debtDuration;
  //   this.session.goalSelectedChanged(this.goal);
  // }
  // investmentComponentChanged(investmentComponent: number) {
  //   this.goal.investmentComponent = investmentComponent;
  //   this.session.goalSelectedChanged(this.goal);
  // }
  // investmentInterestChanged(investmentInterest: number) {
  //   this.goal.investmentInterest = investmentInterest;
  //   this.session.goalSelectedChanged(this.goal);
  // }

  isHouse() {
    return this.goal.type.code === GoalTypeCodes.Immobili;
  }
  isPip() {
    return this.goal.type.code === GoalTypeCodes.Pip;
  }
  isPac() {
    return this.goal.type.code === GoalTypeCodes.Pac;
  }
  isLifeInsurance() {
    return this.goal.type.code === GoalTypeCodes.Protezione;
  }
  isGeneric() {
    return !this.isHouse() && !this.isPip() && !this.isPac() && !this.isLifeInsurance();
  }
  showValue() {
    return !this.isPip() && !this.isPac() && !this.isLifeInsurance();
  }

  getMaxAge() {
    return this.profile.age + this.profile.planDuration;
  }

}
