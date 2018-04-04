import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';  
import { UserService } from '../../services/user.services';

import { Form } from '@angular/forms';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [UserService]
})
export class UsersComponent implements OnInit{
    public title:string;
    public user:User;
    public status:string;
    public identity;
    public token;
    public url:string;
    public page;
    public next_page;
    public prev_page;
    public total:string;
    public pages:string;
    public users:User[];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService

    ){
        this.title = 'Gente';
        this.url = GLOBAL.url;
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.gettoken();
    }

    ngOnInit(){
        console.log("componente UsersComponent cargado");
        this.actualPage();
    }

    actualPage(){
        this._route.params.subscribe(params => {
            let page = +params['page'];
            this.page = page;

            if(!page){
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if(this.prev_page <= 0){
                    this.prev_page = 1;
                }
            }
        })
    }

    getUsers(page){
        this._userService.getUsers(page).subscribe(
            response => {
                if(!response.users){
                    this.status = 'error';
                } else {
                    this.total = response.total;
                    this.pages = response.pages;
                    this.users = response.users;
                    if(page > this.pages){
                        this._router.navigate(['/page', 1]);
                    }
                }
            }, 
            error => {
                var errorMessage = <any>error;
                
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        )
    }
}