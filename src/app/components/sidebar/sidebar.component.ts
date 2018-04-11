import { Component, OnInit } from '@angular/core';
/*import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';  */
import { UserService } from '../../services/user.services';

//import { Form } from '@angular/forms';
import { GLOBAL } from '../../services/global';
//import { FollowService } from '../../services/follow.services';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService/*, FollowService*/]
})
export class SidebarComponent implements OnInit{
    /*public title:string;
    public user:User;*/
    public status:string;
    public identity;
    public token;
    public url:string;
    /*public page;
    public next_page;
    public prev_page;
    public total:string;xxx
    public pages:string;
    public users:User[];
    public follows;*/
    public stats;

    constructor(
        /*private _route: ActivatedRoute,
        private _router: Router,*/
        private _userService: UserService/*,
        private _followService: FollowService*/

    ){
        //this.title = 'Gente';
        this.url = GLOBAL.url;
        //this.user = this._userService.getIdentity();
        this.identity = this._userService.getIdentity();
        this.token = this._userService.gettoken();
        console.log('CONSTRUCCION');
        this.stats = this._userService.getStats();
        console.log(this.stats);
    }

    ngOnInit(){
        console.log("componente SidebarComponent cargado");
        //this.actualPage();
    }



}
