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
  goalTypes$: Observable<GoalTypeInterface[]>;
  goalSelected: GoalInterface;
  goalSelectedSub: Subscription;

  isseData;
  isseParameters;
  financialPlanData;

  showCurrentState = true;
  showObjectives = true;
  buildIsse = false;
  buildFinancialPlan = false;
  showIsse = false;
  showFinancialPlan = false;

  showProgressSpinner = false;
  progressMessage = 'Stiamo eseguendo i calcoli';

  constructor(private session: SessionService,
                private backendHttpService: BackendHttpService,
                private router: Router
              ) { }

  ngOnInit() {
    this.profile = this.session.profile;
    if (!this.profile) {
      this.router.navigate(['avatars']);
    }
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
    this.closeAllSections();
    this.showProgressSpinner = true;
    this.backendHttpService.getProjection(this.profile)
                            // .map(projectionsData => projectionsData['graphs'])
                            .subscribe(
                              projectionsData => {
                                const status = projectionsData['status'];
                                if (status && status >= 400) {
                                  this.progressMessage = 'Si è verificato un errore nel calcolo';
                                } else {
                                  this.isseParameters = projectionsData['pars'];
                                  const graphsData = projectionsData['graphs'];
                                  this.isseData = graphsData.find(data => data['id'] === 'grafico_02')['values'];
                                  this.financialPlanData = graphsData.find(data => data['id'] === 'grafico_04')['scelte'];
                                  this.showProgressSpinner = false;
                                  this.buildFinancialPlan = true;
                                  this.buildIsse = true;
                                }
                              },
                              error => {
                                this.progressMessage = 'Si è verificato un errore nel calcolo';
                                console.error('error while calling Engine', error);
                              }
                            );
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
    console.log('Profile current state', this.profile);
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

  closeAllSections() {
    this.showCurrentState = false;
    this.showFinancialPlan = false;
    this.showIsse = false;
    this.showObjectives = false;
  }

  getIsse() {
    return this.isseParameters.ISSE;
  }

}
