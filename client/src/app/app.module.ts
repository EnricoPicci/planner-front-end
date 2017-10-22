import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {MdSidenavModule, MdToolbarModule, MdIconModule, MdCardModule,
        MdSelectModule, MdSliderModule, MdGridListModule, MdButtonModule,
        MdCheckboxModule, MdInputModule, MdTooltipModule, MdDialogModule,
        MdRadioModule} from '@angular/material';
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
import { ProfileGoalDetailsComponent } from './profile-goal-details/profile-goal-details.component';
import { ProfileListContainerComponent } from './profile-list-container/profile-list-container.component';
import { ProfileGoalHouseComponent } from './profile-goal-house/profile-goal-house.component';
import { ProfileGoalPacComponent } from './profile-goal-pac/profile-goal-pac.component';
import { ProfileGoalLifeInsComponent } from './profile-goal-life-ins/profile-goal-life-ins.component';
import { ProfileGoalPipComponent } from './profile-goal-pip/profile-goal-pip.component';
import {SavingsEvolutionService} from './shared/services/savings-evolution.service';
import { ProfileISSEComponent } from './profile-isse/profile-isse.component';
import { ProfileFinancialPlanComponent } from './profile-financial-plan/profile-financial-plan.component';

const appRoutes: Routes = [
  {
    path: 'isse',
    component: ProfileISSEComponent,
    data: { title: 'Isse' }
  },
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
  {
    path: 'profiles',
    component: ProfileListContainerComponent,
    data: { title: 'Profile List' }
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
    SliderComponent,
    ProfileGoalDetailsComponent,
    ProfileListContainerComponent,
    ProfileGoalHouseComponent,
    ProfileGoalPacComponent,
    ProfileGoalLifeInsComponent,
    ProfileGoalPipComponent,
    ProfileISSEComponent,
    ProfileFinancialPlanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MdTooltipModule,
    MdDialogModule,
    MdRadioModule,
    FlexLayoutModule,
    Ng2DragDropModule.forRoot(),
    NgxChartsModule
  ],
  providers: [
    BackendHttpService,
    SessionService,
    SavingsEvolutionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
