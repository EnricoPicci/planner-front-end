import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdSidenavModule, MdToolbarModule, MdIconModule, MdCardModule, 
        MdSelectModule, MdSliderModule, MdButtonModule, MdCheckboxModule} from '@angular/material';
import 'hammerjs';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import {AvatarListComponent} from './avatar-list/avatar-list.component';

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'avatars',
    component: AvatarListComponent,
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
    AvatarListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MdSidenavModule, 
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdSelectModule,
    MdSliderModule,
    MdButtonModule,
    MdCheckboxModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
