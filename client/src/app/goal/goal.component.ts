import { Component, OnInit, Input } from '@angular/core';

import {environment} from '../../environments/environment';

import {GoalInterface} from '../shared/model/goal.interface';

@Component({
  selector: 'planner-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  @Input() goal: GoalInterface;
  @Input() over: boolean;

  constructor() { }

  ngOnInit() {
  }

  getIcon() {
    return environment.iconPath + this.goal.icon;
  }

}
