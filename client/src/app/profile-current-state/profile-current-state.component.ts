import { Component, OnInit, Input } from '@angular/core';

import {ProfileInterface} from '../shared/model/profile.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-current-state',
  templateUrl: './profile-current-state.component.html',
  styleUrls: ['./profile-current-state.component.css']
})
export class ProfileCurrentStateComponent implements OnInit {
  @Input() profile: ProfileInterface;

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  initialCapitalChanged(value) {
    this.profile.initialCapital = value;
    this.session.profileChanged();
  }
  annualSavingsChanged(value) {
    this.profile.yearlySavings = value;
    this.session.profileChanged();
  }
  investmentThreasholdChanged(value) {
    this.profile.investmentThreashold = value;
    this.session.profileChanged();
  }
  valueAtRiskChanged(value) {
    this.profile.valueAtRisk = value;
    this.session.profileChanged();
  }
  planDurationChanged(value) {
    this.profile.planDuration = value;
    this.session.profileChanged();
  }

  getMaxPlanDuration() {
    return 100 - this.profile.age;
  }

}
