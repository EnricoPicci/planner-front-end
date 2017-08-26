import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {MdSidenavModule, MdToolbarModule, MdIconModule, MdCardModule,
        MdSelectModule, MdSliderModule, MdGridListModule, MdButtonModule,
        MdCheckboxModule, MdInputModule} from '@angular/material';
import 'hammerjs';

import { FlexLayoutModule } from '@angular/flex-layout';

import { Ng2DragDropModule } from 'ng2-drag-drop';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import {AvatarListComponent} from './avatar-list/avatar-list.component';
import { AvatarComponent } from './avatar/avatar.component';
import { AvatarListContainerComponent } from './avatar-list-container/avatar-list-container.component';
import { BackendHttpService } from './shared/services/backend-http.service';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalComponent } from './goal/goal.component';
import { ProfileContainerComponent } from './profile-container/profile-container.component';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { ProfileGoalSelectionComponent } from './profile-goal-selection/profile-goal-selection.component';
import { ProfilePlanComponent } from './profile-plan/profile-plan.component';
import { ProfileGoalComponent } from './profile-plan/profile-goal.component';
import {SessionService} from './shared/services/session.service';
import { ProfileCurrentStateComponent } from './profile-current-state/profile-current-state.component';
import { SliderComponent } from './shared/components/slider/slider.component';

const appRoutes: Routes = [
  {
    path: 'avatars',
    component: AvatarListContainerComponent,
    data: { title: 'Avatar List' }
  },
  {
    path: 'profile',
    component: ProfileContainerComponent,
    data: { title: 'Profile' }
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
    GoalComponent,
    ProfileContainerComponent,
    ProfileSummaryComponent,
    ProfileGoalSelectionComponent,
    ProfilePlanComponent,
    ProfileGoalComponent,
    ProfileCurrentStateComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    ReactiveFormsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdSelectModule,
    MdSliderModule,
    MdGridListModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    FlexLayoutModule,
    Ng2DragDropModule.forRoot(),
    NgxChartsModule
  ],
  providers: [
    BackendHttpService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
