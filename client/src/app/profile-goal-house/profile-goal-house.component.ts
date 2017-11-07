import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-goal-house',
  templateUrl: './profile-goal-house.component.html',
  styleUrls: ['./profile-goal-house.component.css']
})
export class ProfileGoalHouseComponent implements OnInit {
  @Input() goal: GoalInterface;

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  debtYearlyRateChanged(yearlyRate: number) {
    this.goal.debtYearlyRate = yearlyRate;
    this.session.goalSelectedChanged(this.goal);
  }
  debtDurationChanged(debtDuration: number) {
    this.goal.debtDuration = debtDuration;
    this.session.goalSelectedChanged(this.goal);
  }
  // mortgageChanged() {

  // }

  // getMortgageValue() {
  //   return this.goal.debtYearlyRate * this.goal.debtDuration;
  // }

}
