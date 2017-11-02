import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Rx';

import { BackendHttpService } from '../shared/services/backend-http.service';
import {StatusInterface} from '../shared/model/status.interface';
import {ProfileInterface} from '../shared/model/profile.interface';
import {SessionService} from '../shared/services/session.service';

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
    private backendHttpService: BackendHttpService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.backendHttpService.getStatusList()
                            .subscribe(result => this.statuses = result);
    if (this.profile) {
      this.createForm(this.profile);
    }
  }

  createForm(profile: ProfileInterface) {
    const status = profile.status;
    this.profileForm = this.fb.group({
      firstName: profile.firstName,
      lastName: profile.lastName,
      age: [profile.age, [Validators.required]],
      status: status.code
    });
    this.profileForm.valueChanges.subscribe(formValues => {
      this.profile.firstName = formValues.firstName;
      this.profile.lastName = formValues.lastName;
      // this.profile.age = formValues.age;
      this.profile.status = formValues.status;
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
                            });
  }

  ageChanged(event) {
    // tslint:disable-next-line:radix
    this.profile.age = parseInt(event.target.value);
    this.session.profileChanged();
  }

  getFirstGoalAge() {
    const minGoalAge = this.profile.goals.sort((a, b) => a.age - b.age)[0].age;
    return this.profile.goals.sort((a, b) => a.age - b.age)[0].age;
  }

}
