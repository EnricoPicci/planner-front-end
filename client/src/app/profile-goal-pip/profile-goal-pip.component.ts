import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-goal-pip',
  templateUrl: './profile-goal-pip.component.html',
  styleUrls: ['./profile-goal-pip.component.css']
})
export class ProfileGoalPipComponent implements OnInit {
  @Input() goal: GoalInterface;

    constructor(private session: SessionService) { }

    ngOnInit() {
    }

    debtYearlyRateChanged(yearlyRate: number) {
      this.goal.debtYearlyRate = yearlyRate;
      this.session.goalSelectedChanged(this.goal);
    }

}
