import { Component, OnInit, Input } from '@angular/core';

import {AvatarInterface} from '../shared/model/avatar.interface';

@Component({
  selector: 'planner-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() avatar: AvatarInterface;  

  constructor() { }

  ngOnInit() {
  }

}
