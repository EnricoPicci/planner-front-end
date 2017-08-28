import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {GoalInterface} from '../shared/model/goal.interface';
import {ProfileInterface} from '../shared/model/profile.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-goal-details',
  templateUrl: './profile-goal-details.component.html',
  styleUrls: ['./profile-goal-details.component.css']
})
export class ProfileGoalDetailsComponent implements OnInit, OnChanges {
  @Input() goal: GoalInterface;
  @Input() profile: ProfileInterface;

  goalForm: FormGroup;

  constructor(private fb: FormBuilder, private session: SessionService) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    console.log('SimpleChanges', simpleChanges);
    if (this.goalForm) {
      this.goalForm.patchValue(simpleChanges.goal.currentValue);
    }
  }
  ngOnInit() {
    this.createForm(this.goal);
    this.goalForm.valueChanges.subscribe(formValues => {
      this.goal.value = this.goalForm.value.value;
      this.goal.name = this.goalForm.value.name;
      // reset the values of cash and investment if the value of the goal changes
      this.goal.cashComponent = this.goal.debtComponent = this.goal.debtInterest = this.goal.debtDuration = null;
      this.goal.investmentComponent = this.goal.investmentInterest = null;
    });
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
  cashComponentChanged(cashComponent: number) {
    this.goal.cashComponent = cashComponent;
    this.session.goalSelectedChanged(this.goal);
  }
  debtComponentChanged(debtComponent: number) {
    this.goal.debtComponent = debtComponent;
    this.session.goalSelectedChanged(this.goal);
  }
  debtInterestChanged(debtInterest: number) {
    this.goal.debtInterest = debtInterest;
    this.session.goalSelectedChanged(this.goal);
  }
  debtDurationChanged(debtDuration: number) {
    this.goal.debtDuration = debtDuration;
    this.session.goalSelectedChanged(this.goal);
  }
  investmentComponentChanged(investmentComponent: number) {
    this.goal.investmentComponent = investmentComponent;
    this.session.goalSelectedChanged(this.goal);
  }
  investmentInterestChanged(investmentInterest: number) {
    this.goal.investmentInterest = investmentInterest;
    this.session.goalSelectedChanged(this.goal);
  }

}
