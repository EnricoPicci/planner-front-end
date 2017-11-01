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
  financialPlanData;

  showCurrentState = true;
  showObjectives = true;
  buildIsse = false;
  buildFinancialPlan = false;
  showIsse = false;
  showFinancialPlan = false;

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
    this.prepareAllSectionsClosed();
    this.backendHttpService.getProjection(this.profile)
                            .map(projectionsData => projectionsData['graphs'])
                            .subscribe(graphsData => {
                              this.isseData = graphsData.find(data => data['id'] === 'grafico_02')['values'];
                              this.financialPlanData = graphsData.find(data => data['id'] === 'grafico_04')['scelte'];
                              // this.showIsse = true;
                              // this.showFinancialPlan = true;
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
  toggleFinancialPlan() {
    this.showFinancialPlan = !this.showFinancialPlan;
  }

  prepareAllSectionsClosed() {
    this.buildFinancialPlan = true;
    this.buildIsse = true;
    this.showCurrentState = false;
    this.showFinancialPlan = false;
    this.showIsse = false;
    this.showObjectives = false;
  }

}
