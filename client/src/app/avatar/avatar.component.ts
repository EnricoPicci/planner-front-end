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

  private over = false;

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
    const profile: ProfileInterface = {
      id: null,
      firstName: null,
      lastName: null,
      // tslint:disable-next-line:radix
      age: parseInt(this.avatar.age),
      goals: this.avatar.goals,
      initialCapital: 0,
      status: this.avatar.status,
      yearlySavings: this.avatar.yearlySavings,
      planDuration: this.avatar.planDuration,
    };
    return profile;
  }

}
