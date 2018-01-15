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

  riskAppetites = [
    {label: 'Nulla', value: 0},
    {label: 'Bassa', value: 300},
    {label: 'Media', value: 700},
    {label: 'Alta', value: 1000},
    {label: 'Molto alta', value: 1500},
  ];
  riskAppetite;

  constructor(private session: SessionService) { }

  ngOnInit() {
    if (!this.profile.valueAtRisk) {
      this.profile.valueAtRisk = this.riskAppetites[0].value;
    }
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
  // valueAtRiskChanged(value) {
  //   this.profile.valueAtRisk = value;
  //   this.session.profileChanged();
  // }
  planDurationChanged(value) {
    this.profile.planDuration = value;
    this.session.profileChanged();
  }

  getMaxPlanDuration() {
    return 100 - this.profile.age;
  }

  setRiskAppetite(event) {
    console.log('appetite chosen', event);
    this.riskAppetite = event.value;
    this.profile.valueAtRisk = this.riskAppetite;
    // this.session.setProfile(this.profile);
    // this.session.profileChanged();
  }
  // getRiskAppetite() {
  //   const ra = this.riskAppetites[this.profile.valueAtRisk];
  //   console.log('risk appetite chosen', ra);
  //   return this.riskAppetites[this.profile.valueAtRisk];
  // }

  // riskAppetiteOfProfile() {
  //   if (this.profile.valueAtRisk) {
  //     this.riskAppetite = this.riskAppetites[this.profile.valueAtRisk];
  //   } else {
  //     this.riskAppetite = this.riskAppetites[0];
  //   }
  //   return this.riskAppetite;
  // }

}
