import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-goal-life-ins',
  templateUrl: './profile-goal-life-ins.component.html',
  styleUrls: ['./profile-goal-life-ins.component.css']
})
export class ProfileGoalLifeInsComponent implements OnInit {
  @Input() goal: GoalInterface;

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  futureIncomeCoveragePercentageChanged(yearlyRate: number) {
    this.goal.futureIncomeCoveragePercentage = yearlyRate;
    this.session.goalSelectedChanged(this.goal);
  }

}
