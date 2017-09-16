import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';

@Component({
  selector: 'planner-profile-goal-house',
  templateUrl: './profile-goal-house.component.html',
  styleUrls: ['./profile-goal-house.component.css']
})
export class ProfileGoalHouseComponent implements OnInit {
  @Input() goal: GoalInterface;

  constructor() { }

  ngOnInit() {
  }

  debtYearlyRateChanged(yearlyRate: number) {
    this.goal.debtYearlyRate = yearlyRate;
  }
  debtDurationChanged(debtDuration: number) {
    this.goal.debtDuration = debtDuration;
  }

}
