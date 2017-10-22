import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';

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
export class ProfileContainerComponent implements OnInit, OnDestroy {
  profile: ProfileInterface;
  goalTypes$: Observable<GoalTypeInterface>;
  goalSelected: GoalInterface;
  goalSelectedSub: Subscription;

  isseData;

  showCurrentState = true;
  showObjectives = true;
  showIsse = false;

  constructor(private session: SessionService,
                private backendHttpService: BackendHttpService,
                private router: Router
              ) { }

  ngOnInit() {
    this.profile = this.session.profile;
    this.goalTypes$ = this.backendHttpService.getGoalTypeList();
    // this.getProjection();

    this. goalSelectedSub = this.session.selectedGoal$.subscribe(goalSelected => {
      this.goalSelected = goalSelected;
    });
  }
  ngOnDestroy() {
    this.goalSelectedSub.unsubscribe();
  }

  getProjection() {
    // this.router.navigate(['isse']);
    this.backendHttpService.getProjectionsData(this.profile)
                            .map(projectionsData => projectionsData['graphs'])
                            .map(graphsData => graphsData.find(data => data['id'] === 'grafico_02')['values'])
                            .subscribe(graphsData => {
                              this.isseData = graphsData;
                                                // .find(s => s.year === 2).data
                                                // // tslint:disable-next-line:arrow-return-shorthand
                                                // .map(d => {return {name: d.assex, value: d.invest}; });
                              console.log('isse data', this.isseData);
                              this.showIsse = true;
                            });
  }

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
  toggleObjectives() {
    this.showObjectives = !this.showObjectives;
  }
  toggleIsse() {
    this.showIsse = !this.showIsse;
  }

}
