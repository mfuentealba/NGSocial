import { PublicationsComponent } from './components/publications/publications.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';

//import { HttpModule } from '@angular/http';Modulo para peticiones ajax
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {  routing, appRoutingProviders } from './app.routing';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

//Modulo custom

import { MessageModule } from './messages/message.module'

//servicios

import { UserGuard } from './services/user.guard';
import { UserService } from './services/user.services';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    //HttpModule,
    HttpClientModule,
    MomentModule,
   /* UserGuard,
    UserService,*/
    MessageModule
  ],
  providers: [
    appRoutingProviders,
    UserGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
