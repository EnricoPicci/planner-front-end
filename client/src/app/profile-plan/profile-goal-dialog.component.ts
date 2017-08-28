import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  template: `
    <div><span>{{goal.name}}</span></div>
  `
})
export class ProfileGoalDialogComponent {

  constructor(@Inject(MD_DIALOG_DATA) private goal: any) { }

}
