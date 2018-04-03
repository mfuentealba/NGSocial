import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.services';
import { UploadService } from './services/upload.service';
import { User } from './models/user';  
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, UploadService]
})
export class AppComponent implements OnInit, DoCheck{
  public title;
  public identity:any;
  public token:any;
  public url:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    
  ){
    this.title = 'NGSOCIAL';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    console.log('logout');
    
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

}
