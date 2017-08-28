import { Component, OnInit, Input } from '@angular/core';

import {ProfileInterface} from '../shared/model/profile.interface';

@Component({
  selector: 'planner-profile-current-state',
  templateUrl: './profile-current-state.component.html',
  styleUrls: ['./profile-current-state.component.css']
})
export class ProfileCurrentStateComponent implements OnInit {
  @Input() profile: ProfileInterface;

  constructor() { }

  ngOnInit() {
  }

  initialCapitalChanged(value) {
    this.profile.initialCapital = value;
  }
  annualSavingsChanged(value) {
    this.profile.yearlySavings = value;
  }

}
