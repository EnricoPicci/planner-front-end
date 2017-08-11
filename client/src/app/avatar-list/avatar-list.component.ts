import { Component, OnInit, Input } from '@angular/core';

import {AvatarInterface} from '../shared/model/avatar.interface';

@Component({
  selector: 'planner-avatar-list',
  templateUrl: './avatar-list.component.html',
  styleUrls: ['./avatar-list.component.css']
})
export class AvatarListComponent implements OnInit {
  @Input() avatarList: Array<AvatarInterface>;

  constructor() { }

  ngOnInit() {
  }

}

