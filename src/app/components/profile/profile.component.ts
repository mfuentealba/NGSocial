import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { Follow } from '../../models/follow';
import { User } from '../../models/user';  
import { UserService } from '../../services/user.services';
import { FollowService } from '../../services/follow.services';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';



@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    providers: [UserService/*, PublicationService*/, FollowService]
})
export class ProfileComponent implements OnInit{
    public title:string;
    public user:User;
    public status:string;
    public identity;
    public token;
    public url:string;
    public publications:Publication[];
    //public page = 1;
     /*public next_page;
    public prev_page;*/
    public total:number;
    public pages:string;
    /*public users:User[];*/
    public followed;
    public following;
    public stats;
    public itemsPerPage:number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        //private _publicationService: PublicationService,
        private _followService: FollowService

    ){
        this.title = 'Perfil';
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.gettoken();
        this.followed = false;
        this.following = false;
        //this.stats = this._userService.getStats();
        
    }

    ngOnInit(){
        console.log("componente ProfileComponent cargado");
        this.loadPage()
    }    

    loadPage(){
        this._route['params'].subscribe(params => {
            let id = params['id'];
            this.getUser(id);
            this.getCounters(id);
        });
    }

    getUser(id){
       this._userService.getUser(id).subscribe(
        response => {
            console.log('response');
            console.log(response);
            console.log(response['user']);
            if(response['user']){
                this.user = response['user'];
               
                if(response.following && response.following._id){
                   this.following = true;
                } else {
                    this.following = false;
                }
                if(response.followed && response.followed._id){
                    this.followed = true;
                 } else {
                     this.followed = false;
                 }

                this.status = 'success';
                
            } else {
                this.status = 'error';
            }
        },
        error => {
            var errorMessage = <any>error;
            
            this._router.navigate(['/perfil', this.identity._id]);
        }
    )
   }

   getCounters(id){
    this._userService.getCounters(id).subscribe(
     response => {
         console.log(response);
         console.log(response['user']);
         if(response['user']){


            this.user = response['user'];
            
            this.stats = response;

             //this.status = 'success';
             
         } else {
             this.status = 'error';
         }
     },
     error => {
         var errorMessage = <any>error;
         
         this._router.navigate(['/perfil', this.identity._id]);
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
            this.following = true;
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
            this.following = false;
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
