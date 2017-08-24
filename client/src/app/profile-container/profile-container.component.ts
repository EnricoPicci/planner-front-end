import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {SessionService} from '../shared/services/session.service';
import { BackendHttpService } from '../shared/services/backend-http.service';
import {GoalTypeInterface} from '../shared/model/goal-type.interface';
import {ProfileInterface} from '../shared/model/profile.interface';

@Component({
  selector: 'planner-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css']
})
export class ProfileContainerComponent implements OnInit {
  profile: ProfileInterface;
  goalTypes$: Observable<GoalTypeInterface>;
  projection$: Observable<any>;

  constructor(private session: SessionService, private backendHttpService: BackendHttpService) { }

  ngOnInit() {
    this.profile = this.session.profile;
    this.goalTypes$ = this.backendHttpService.getGoalTypeList();
    this.projection$ = this.backendHttpService.getProjection(this.profile);
  }

}
