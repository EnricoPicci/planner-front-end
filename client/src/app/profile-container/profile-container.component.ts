import { Component, OnInit } from '@angular/core';

import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css']
})
export class ProfileContainerComponent implements OnInit {

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

}
