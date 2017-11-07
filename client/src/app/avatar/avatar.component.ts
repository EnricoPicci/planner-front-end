import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import {AvatarInterface} from '../shared/model/avatar.interface';
import {SessionService} from '../shared/services/session.service';

import {ProfileInterface} from '../shared/model/profile.interface';

@Component({
  selector: 'planner-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() avatar: AvatarInterface;

  over = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.over = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.over = false;
  }


  constructor(private router: Router, private session: SessionService) { }

  ngOnInit() {
  }

  onClick() {
    this.session.setProfile(this.getProfileFromAvatar());
    this.router.navigate(['profile']);
  }

  private getProfileFromAvatar() {
    // const profile: ProfileInterface = {
    //   id: null,
    //   firstName: null,
    //   lastName: null,
    //   // tslint:disable-next-line:radix
    //   age: parseInt(this.avatar.age),
    //   goals: this.avatar.goals,
    //   initialCapital: 0,
    //   status: this.avatar.status,
    //   yearlySavings: this.avatar.yearlySavings,
    //   planDuration: this.avatar.planDuration,
    // };
    const profile = this.session.profile;
    profile.goals = [];
    // tslint:disable-next-line:radix
    const ageDifference = parseInt(this.avatar.age) - profile.age;
    for (const goal of this.avatar.goals) {
      const goalCopy = {... goal};
      goalCopy.age = goal.age - ageDifference;
      profile.goals.push(goalCopy);
    }
    profile.initialCapital = 0;
    profile.status = this.avatar.status;
    profile.planDuration = this.avatar.planDuration;
    return profile;
  }

}
