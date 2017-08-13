import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Rx';

import { BackendHttpService } from '../shared/services/backend-http.service';
import {StatusInterface} from '../shared/model/status.interface';
import {ProfileInterface} from '../shared/model/profile.interface';

@Component({
  selector: 'planner-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent implements OnInit {
  @Input() profile: ProfileInterface;
  profileForm: FormGroup;
  // statuses$: Observable<Array<StatusInterface>>;
  statuses: Array<StatusInterface>;

  constructor(
    private fb: FormBuilder,
    private backendHttpService: BackendHttpService
  ) {}

  ngOnInit() {
    this.backendHttpService.getStatusList()
                            .subscribe(result => this.statuses = result);
    this.createForm(this.profile);
  }

  createForm(profile: ProfileInterface) {
    const status: any = profile.status;
    this.profileForm = this.fb.group({
      firstName: profile.firstName,
      lastName: profile.lastName,
      age: [profile.age, Validators.required],
      status: status.code
    });
  }

  saveProfile() {
    this.profile.firstName = this.profileForm.value.firstName;
    this.profile.lastName = this.profileForm.value.lastName;
    this.profile.age = this.profileForm.value.age;
    this.profile.status = this.statuses.find((status) => status.code === this.profileForm.value.status);
    this.backendHttpService.saveProfile(this.profile)
                            .subscribe(profileId => {
                              this.profile.id = profileId;
                              console.log('profile saved with id', profileId);
                            });
  }

}
