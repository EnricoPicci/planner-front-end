import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {MdSliderChange} from '@angular/material';

import { BackendHttpService } from '../shared/services/backend-http.service';
import {AvatarInterface} from '../shared/model/avatar.interface';
import {JobInterface} from '../shared/model/job.interface';
import {AvatarSelectionParamsInterface} from '../shared/model/avatar-selection-params.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-avatar-list-container',
  templateUrl: './avatar-list-container.component.html',
  styleUrls: ['./avatar-list-container.component.css']
})
export class AvatarListContainerComponent implements OnInit {
  isMale = false;
  avatarList$: Observable<AvatarInterface[]>;
  jobList$: Observable<JobInterface[]>;
  startAge = 20;
  age: number;
  startIncome = 0;
  income: number;

  constructor(private backendHttpService: BackendHttpService, private session: SessionService) { }

  ngOnInit() {
    // this.avatarList$ = this.backendHttpService.getAllAvatars();
    this.jobList$ = this.backendHttpService.getJobList();
    this.age = this.startAge;
    this.income = this.startIncome;
    const profile = {
      id: null,
      firstName: null,
      lastName: null
    };
    this.session.profile = profile;
  }

  ageChanged(event: MdSliderChange) {
    this.age = event.value;
    this.session.profile.age = this.age;
    if (this.age && this.income) {
      this.getAvatarsForProfile();
    }
  }

  incomeChanged(event: MdSliderChange) {
    this.income = event.value;
    this.session.profile.yearlySavings = this.income;
    if (this.age && this.income) {
      this.getAvatarsForProfile();
    }
  }

  getAvatarsForProfile() {
    const params: AvatarSelectionParamsInterface = {
      age: this.age
    };
    this.avatarList$ = this.backendHttpService.getAvatarsForProfile(params);
  }

}

