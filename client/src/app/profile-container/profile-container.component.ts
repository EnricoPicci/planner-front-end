import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {SessionService} from '../shared/services/session.service';
import { BackendHttpService } from '../shared/services/backend-http.service';
import {GoalTypeInterface} from '../shared/model/goal-type.interface';
import {ProfileInterface} from '../shared/model/profile.interface';
import {GoalInterface} from '../shared/model/goal.interface';

@Component({
  selector: 'planner-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css']
})
export class ProfileContainerComponent implements OnInit {
  profile: ProfileInterface;
  goalTypes$: Observable<GoalTypeInterface>;
  // projection$: Observable<any>;
  goalSelected: GoalInterface;

  showCurrentState = true;

  constructor(private session: SessionService,
                private backendHttpService: BackendHttpService
              ) { }

  ngOnInit() {
    this.profile = this.session.profile;
    this.goalTypes$ = this.backendHttpService.getGoalTypeList();
    // this.getProjection();

    this.session.selectedGoal$.subscribe(goalSelected => {
      this.goalSelected = goalSelected;
    });
  }

  // getProjection() {
  //   this.projection$ = this.backendHttpService.getProjection(this.profile);
  // }

  delete(goal: GoalInterface) {
    const index = this.profile.goals.indexOf(goal);
    this.profile.goals.splice(index, 1);
    this.session.goalSelectedChanged(this.profile.goals[0]);
  }

  getProfileGoals() {
    return this.profile.goals.sort((a, b) => a.age < b.age ? -1 : 1 );
  }

  toggleCurrentState() {
    this.showCurrentState = !this.showCurrentState;
  }

}
