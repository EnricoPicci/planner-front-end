import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'planner-avatar-list',
  templateUrl: './avatar-list.component.html',
  styleUrls: ['./avatar-list.component.css']
})
export class AvatarListComponent implements OnInit {
  isMale = false;

  jobs = [
    {code: '1', name: 'Architetto'},
    {code: '2', name: 'Cuoco'},
    {code: '3', name: 'Impiegato'},
    {code: '4', name: 'Commesso'},
  ];

  constructor() { }

  ngOnInit() {
  }

}

