import { Component, OnInit, Input, HostListener } from '@angular/core';

import {AvatarInterface} from '../shared/model/avatar.interface';

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


  constructor() { }

  ngOnInit() {
  }

}
