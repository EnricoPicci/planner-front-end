import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';

import { BackendHttpService } from '../shared/services/backend-http.service';
import {ProfileInterface} from '../shared/model/profile.interface';
import {SessionService} from '../shared/services/session.service';

@Component({
  selector: 'planner-profile-list-container',
  templateUrl: './profile-list-container.component.html',
  styleUrls: ['./profile-list-container.component.css']
})
export class ProfileListContainerComponent implements OnInit {
  profileList$: Observable<Array<ProfileInterface>>;
  profileList: Array<ProfileInterface>;

  constructor(private backendHttpService: BackendHttpService, private router: Router, private session: SessionService) { }

  ngOnInit() {
    this.profileList$ = this.backendHttpService.getAllProfiles();
    this.profileList$.subscribe(results => {
      this.profileList = results;
    });
  }

  profileSelected(profile: ProfileInterface) {
    this.session.setProfile(profile);
    this.router.navigate(['profile']);
  }

}
