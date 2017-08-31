import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'planner-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) { }

  goToWall() {
    this.router.navigate(['avatars']);
  }
  goToProfiles() {
    this.router.navigate(['profiles']);
  }

}
