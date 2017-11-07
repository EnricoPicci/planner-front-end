import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-goal-pac',
  templateUrl: './profile-goal-pac.component.html',
  styleUrls: ['./profile-goal-pac.component.css']
})
export class ProfileGoalPacComponent implements OnInit {
  @Input() goal: GoalInterface;

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  debtYearlyRateChanged(yearlyRate: number) {
    this.goal.debtYearlyRate = yearlyRate;
    this.session.goalSelectedChanged(this.goal);
  }
  investmentDurationChanged(duration: number) {
    this.goal.investmentDuration = duration;
    this.session.goalSelectedChanged(this.goal);
  }

}
