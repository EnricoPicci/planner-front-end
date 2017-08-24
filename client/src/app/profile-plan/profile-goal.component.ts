import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import {environment} from '../../environments/environment';

import {GoalInterface} from '../shared/model/goal.interface';

@Component({
  selector: 'planner-profile-goal',
  template: `
    <div ><img [src]="getIcon()" style="position: absolute; top: 0px" [style.left]="getXOffset()"></div>
  `,
//   styleUrls: ['./profile-container.component.css']
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileGoalComponent implements OnInit {
  @Input() goal: GoalInterface;
  @Input() xOffset: number;

  constructor() { }

  ngOnInit() {
  }

  getIcon() {
    return environment.iconPath + this.goal.icon;
  }

  private getXOffset() {
    console.log('this.xOffset', this.xOffset + 'px');
    return this.xOffset + 'px';
  }

}
