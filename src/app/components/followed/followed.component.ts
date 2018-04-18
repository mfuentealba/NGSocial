import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.services';
import { FollowService } from '../../services/follow.services';
import { GLOBAL } from '../../services/global';


@Component({
    selector: 'followed',
    templateUrl: './followed.component.html',
    providers: [UserService, FollowService]
})
export class FollowedComponent implements OnInit{
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
    public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService

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

            if(!params['page']){
                page = 1;
            }


            if(!page){
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if(this.prev_page <= 0){
                    this.prev_page = 1;
                }
            }
            //devolver usuarios
            this.getUsers(1);
        });
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
                    this.follows = response.usersFollowing;
                    console.log(response);
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

    public followUserOver = '0';
    mouseEnter(_id){
        this.followUserOver = _id;
    }

    mouseLeave(_id){
        this.followUserOver = '0';
    }

    followUser(followed){
        var follow = new Follow('', this.identity._id, followed);

        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if(!response.follow){
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    this.follows.push(followed);

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

    unfollowUser(followed){
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                var search = this.follows.indexOf(followed);
                if(search > -1){
                    this.follows.splice(search, 1);
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
