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

  initialCapitalChanged(event) {
    this.profile.initialCapital = event.value;
  }

}
