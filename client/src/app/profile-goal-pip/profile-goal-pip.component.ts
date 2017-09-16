import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';

@Component({
  selector: 'planner-profile-goal-pip',
  templateUrl: './profile-goal-pip.component.html',
  styleUrls: ['./profile-goal-pip.component.css']
})
export class ProfileGoalPipComponent implements OnInit {
  @Input() goal: GoalInterface;

    constructor() { }

    ngOnInit() {
    }

    debtYearlyRateChanged(yearlyRate: number) {
      this.goal.debtYearlyRate = yearlyRate;
    }

}
