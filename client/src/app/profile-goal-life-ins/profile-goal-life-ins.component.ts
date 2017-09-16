import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';

@Component({
  selector: 'planner-profile-goal-life-ins',
  templateUrl: './profile-goal-life-ins.component.html',
  styleUrls: ['./profile-goal-life-ins.component.css']
})
export class ProfileGoalLifeInsComponent implements OnInit {
  @Input() goal: GoalInterface;

  constructor() { }

  ngOnInit() {
  }

  futureIncomeCoveragePercentageChanged(yearlyRate: number) {
    this.goal.futureIncomeCoveragePercentage = yearlyRate;
  }

}
