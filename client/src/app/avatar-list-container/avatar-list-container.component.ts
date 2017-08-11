import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {MdSliderChange} from '@angular/material';

import { BackendHttpService } from '../shared/services/backend-http.service';
import {AvatarInterface} from '../shared/model/avatar.interface';
import {JobInterface} from '../shared/model/job.interface';

@Component({
  selector: 'planner-avatar-list-container',
  templateUrl: './avatar-list-container.component.html',
  styleUrls: ['./avatar-list-container.component.css']
})
export class AvatarListContainerComponent implements OnInit {
  isMale = false;
  avatarList$: Observable<AvatarInterface>;
  jobList$: Observable<JobInterface>;
  startAge = 20;
  age: number;
  startIncome = 0;
  income: number;

  constructor(private backendHttpService: BackendHttpService) { }

  ngOnInit() {
    this.avatarList$ = this.backendHttpService.getAvatarList();
    this.jobList$ = this.backendHttpService.getJobList();
    this.age = this.startAge;
    this.income = this.startIncome;
  }

  ageChanged(event: MdSliderChange) {
    this.age = event.value;
  }

  incomeChanged(event: MdSliderChange) {
    this.income = event.value;
  }

}

