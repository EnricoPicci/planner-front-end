import { Component, OnInit, Input } from '@angular/core';

import {environment} from '../../environments/environment';

import {GoalTypeInterface} from '../shared/model/goal-type.interface';

@Component({
  selector: 'planner-profile-goal-selection',
  templateUrl: './profile-goal-selection.component.html',
  styleUrls: ['./profile-goal-selection.component.css']
})
export class ProfileGoalSelectionComponent implements OnInit {
  @Input() goalTypes: Array<GoalTypeInterface>;

  constructor() { }

  ngOnInit() {
  }

  getIcon(goalType: GoalTypeInterface) {
    return environment.iconPath + goalType.icon;
  }

}
