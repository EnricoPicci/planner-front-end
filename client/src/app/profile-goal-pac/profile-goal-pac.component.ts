import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';

@Component({
  selector: 'planner-profile-goal-pac',
  templateUrl: './profile-goal-pac.component.html',
  styleUrls: ['./profile-goal-pac.component.css']
})
export class ProfileGoalPacComponent implements OnInit {
  @Input() goal: GoalInterface;

  constructor() { }

  ngOnInit() {
  }

  debtYearlyRateChanged(yearlyRate: number) {
    this.goal.debtYearlyRate = yearlyRate;
  }
  investmentDurationChanged(duration: number) {
    this.goal.investmentDuration = duration;
  }

}
