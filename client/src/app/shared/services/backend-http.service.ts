import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment} from '../../../environments/environment';

import {AvatarInterface} from '../model/avatar.interface';
import {JobInterface} from '../model/job.interface';
import {StatusInterface} from '../model/status.interface';
import {ProfileInterface} from '../model/profile.interface';
import {GoalTypeInterface} from '../model/goal-type.interface';
import {AvatarSelectionParamsInterface} from '../model/avatar-selection-params.interface';

import {response} from './backend-grafici-response-data';

@Injectable()
export class BackendHttpService {


/* set statuses */
statuses = [
    {code: '1', name: 'Sposato'},
    {code: '2', name: 'Celibe'},
    {code: '3', name: 'Divorziato'}
  ];
  /* set goal types */
goaltypes = [
    {code: '1', name: 'Immobili', icon: 'proprieta/immobili.png', value: 200000},
    {code: '2', name: 'Motori', icon: 'motori/motori.png', value: 20000},
    {code: '3', name: 'Viaggi', icon: 'viaggi/viaggi.png', value: 5000},
    {code: '4', name: 'Anniversari', icon: 'famiglia/famiglia.png', value: 10000},
    {code: '5', name: 'Collezioni', icon: 'collezioni/collezioni.png', value: 100000},
    {code: 'pip',
      name: 'Piano Pensione',
      icon: 'ic_redeem_black_24dp/web/ic_redeem_black_24dp_1x.png',
      value: 0},
    {code: 'pac',
      name: 'Piano di Accumulo',
      icon: 'ic_account_balance_black_24dp/web/ic_account_balance_black_24dp_1x.png',
      value: 0},
    {code: 'life-ins',
      name: 'Protezione',
      icon: 'ic_security_black_24dp/web/ic_security_black_24dp_1x.png',
      value: 0}
  ];
  /* set job types */
jobs = [
    {code: '1', name: 'Architetto'},
    {code: '2', name: 'Cuoco'},
    {code: '3', name: 'Impiegato'},
    {code: '4', name: 'Commesso'},
    {code: '5', name: 'Elettricista'},
    {code: '6', name: 'Manager'},
    {code: '7', name: 'Consulente'},
  ];
  /* set Avatars */
propertyGoal = this.goaltypes.filter(goalType => goalType.code === '1')[0];
motorGoal = this.goaltypes.filter(goalType => goalType.code === '2')[0];
avatars = [
    {name: 'Architetto',
    age: '37',
    planDuration: 25,
    yearlySavings: 25000,
    status: this.statuses[0],
    image: 'assets/images/Architetto.png',
    goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: this.propertyGoal, age: 50, value: 100000,
              debtYearlyRate: 0, debtDuration: 0},
            {name: 'Auto', icon: 'motori/motori.png', type: this.motorGoal, age: 40, value: 20000}]},
    {name: 'Cuoco',
    age: '31',
    planDuration: 30,
    yearlySavings: 10000,
    status: this.statuses[1],
    image: 'assets/images/Cuoco.png',
    goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: this.propertyGoal, age: 40, value: 100000,
              debtYearlyRate: 0, debtDuration: 0},
            {name: 'Auto', icon: 'motori/motori.png', type: this.motorGoal, age: 35, value: 20000}]},
    {name: 'Commesso',
    age: '21',
    planDuration: 30,
    yearlySavings: 5000,
    status: this.statuses[1],
    image: 'assets/images/Commesso.png',
    goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: this.propertyGoal, age: 40, value: 200000,
              debtYearlyRate: 0, debtDuration: 0},
            {name: 'Auto', icon: 'motori/motori.png', type: this.motorGoal, age: 30, value: 20000}]},
    {name: 'Manager',
    age: '41',
    planDuration: 30,
    yearlySavings: 20000,
    status: this.statuses[0],
    image: 'assets/images/Manager.png',
    goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: this.propertyGoal, age: 50, value: 100000,
              debtYearlyRate: 0, debtDuration: 0},
            {name: 'Auto', icon: 'motori/motori.png', type: this.motorGoal, age: 55, value: 10000},
            {name: 'Auto', icon: 'motori/motori.png', type: this.motorGoal, age: 60, value: 20000},
            {name: 'Auto', icon: 'motori/motori.png', type: this.motorGoal, age: 65, value: 30000}]},
    {name: 'Elettricista',
    age: '39',
    planDuration: 20,
    yearlySavings: 10000,
    status: this.statuses[0],
    image: 'assets/images/Elettricista.png',
    goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: this.propertyGoal, age: 45, value: 100000,
              debtYearlyRate: 0, debtDuration: 0},
            {name: 'Auto', icon: 'motori/motori.png', type: this.motorGoal, age: 50, value: 20000}]},
    {name: 'Consulente',
    age: '49',
    planDuration: 30,
    yearlySavings: 15000,
    status: this.statuses[0],
    image: 'assets/images/Consulente.png',
    goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: this.propertyGoal, age: 50, value: 100000,
              debtYearlyRate: 0, debtDuration: 0},
            {name: 'Auto', icon: 'motori/motori.png', type: this.motorGoal, age: 60, value: 20000}]}
  ];

  /* crete dictionary to store profiles and a variable to store next profile ID */
  storedProfiles = {};
  nextProfileID = 0;

  constructor() { }

  getAllAvatars() {
    return Observable.of(this.avatars);
  }
  getAvatarsForProfile(params: AvatarSelectionParamsInterface) {
    let data;
    if (params.age < 35) {
      // tslint:disable-next-line:radix
      data = this.avatars.filter(avatar => parseInt(avatar.age) <= 40);
    } else {
      // tslint:disable-next-line:radix
      data = this.avatars.filter(avatar => parseInt(avatar.age) > 40);
    }
    return Observable.of(data);
  }

  getJobList() {
    return Observable.of(this.jobs);
  }

  getStatusList() {
    return Observable.of(this.statuses);
  }

  saveProfile(profile: ProfileInterface) {
    const profileId = profile.id;
    if (profileId === null) {
      profile.id = this.nextProfileID + '';
      this.nextProfileID++;
    }
    this.storedProfiles[profile.id] = profile;
    return Observable.of(profile.id);
  }
  getProfile(id: string) {
    return Observable.of(this.storedProfiles[id]);
  }
  getAllProfiles() {
    const allProfilesArray = [];
    // tslint:disable-next-line:forin
    for (const profileId in this.storedProfiles) {
      allProfilesArray.push(this.storedProfiles[profileId]);
    }
    return Observable.of(allProfilesArray);
  }

  getGoalTypeList() {
    return Observable.of(this.goaltypes);
  }

  getProjection(profile: ProfileInterface) {
    return Observable.of(response);
  }

}

