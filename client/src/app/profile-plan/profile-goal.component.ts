import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter,
          ChangeDetectorRef, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Rx';

import {environment} from '../../environments/environment';

import {GoalInterface} from '../shared/model/goal.interface';
import {SessionService} from '../shared/services/session.service';
import {ProfileGoalDialogComponent} from './profile-goal-dialog.component';

@Component({
  selector: 'planner-profile-goal',
  template: `
    <div *ngIf="xOffset" (click)="onClick()" draggable [dragData]="goal">
      <img [src]="getIcon()" style="position: absolute; top: 0px" [style.left]="getXOffset()" [class.selectedImg]="selected"
          mdTooltip="{{getTooltip()}}" [mdTooltipPosition]="'above'">
    </div>
    <div *ngIf="!xOffset" class="tab" [class.selected]="selected" (click)="onClick()">
      <img [src]="getIcon()">
      <span>{{goal.name}}</span>
      <img *ngIf="selected" [src]="'assets/images/close.png'" class="close" (click)="onClose()" mdTooltip="Rimuovi">
    </div>
  `,
  styles: [
    `.selected {
        padding: 10px;
        margin: 20px;
        background-color: lightgray;
        border-width: thin;
        border-style: solid;
      }`,
    `.selectedImg {
        padding: 10px;
        background-color: lightgray;
        border-width: thin;
        border-style: solid;
    }`,
    `.tab {
        margin: 5px;
        padding: 5px;
        border-width: thin;
        border-style: solid;
        border-color: lightgray;
    }`,
    `.close {
        float: right;
        cursor: pointer;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileGoalComponent implements OnInit, OnDestroy {
  @Input() goal: GoalInterface;
  @Input() xOffset: number;

  @Output() close = new EventEmitter();

  selected = false;
  selectedGoalSubscription: Subscription;

  constructor(private session: SessionService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.selectedGoalSubscription = this.session.selectedGoal$.subscribe(goalSelected => {
      this.selected = (this.goal === goalSelected);
      console.log('selected', this.selected);
      // used to make sure that when the selected goal is changed we refresh the view of this component and update
      // classes that are used to show the 'selected' state
      this.changeDetectorRef.detectChanges();
    });
  }
  ngOnDestroy() {
    this.selectedGoalSubscription.unsubscribe();
  }

  getIcon() {
    return environment.iconPath + this.goal.icon;
  }

  private getXOffset() {
    console.log('this.xOffset', this.xOffset + 'px');
    return this.xOffset + 'px';
  }

  onClick() {
    this.session.goalSelectedChanged(this.goal);
    // this.clicked.next(this);
  }
  onClose() {
    this.selectedGoalSubscription.unsubscribe();
    this.close.next(this.goal);
  }

  isGoalSelected() {
    return true;
  }

  getTooltip() {
    return this.goal.name + ' - valore: ' + this.goal.value;
  }

}
