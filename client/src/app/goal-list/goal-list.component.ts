import { Component, OnInit, Input } from '@angular/core';

import {GoalInterface} from '../shared/model/goal.interface';

@Component({
  selector: 'planner-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  @Input() goals: Array<GoalInterface>;
  @Input() over: boolean;

  constructor() { }

  ngOnInit() {
  }

}
