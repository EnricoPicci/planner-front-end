import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdSidenavModule, MdToolbarModule, MdIconModule, MdCardModule,
        MdSelectModule, MdSliderModule, MdGridListModule, MdButtonModule, MdCheckboxModule} from '@angular/material';
import 'hammerjs';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import {AvatarListComponent} from './avatar-list/avatar-list.component';
import { AvatarComponent } from './avatar/avatar.component';
import { AvatarListContainerComponent } from './avatar-list-container/avatar-list-container.component';
import { BackendHttpService } from './shared/services/backend-http.service';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalComponent } from './goal/goal.component';

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'avatars',
    component: AvatarListContainerComponent,
    data: { title: 'Avatar List' }
  },
  { path: '',
    redirectTo: '/avatars',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AvatarListComponent,
    AvatarComponent,
    AvatarListContainerComponent,
    GoalListComponent,
    GoalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdSelectModule,
    MdSliderModule,
    MdGridListModule,
    MdButtonModule,
    MdCheckboxModule,
    FlexLayoutModule
  ],
  providers: [
    BackendHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
