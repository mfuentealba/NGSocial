import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';  
import { UserService } from '../../services/user.services';
import { Form } from '@angular/forms';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [UserService]
})
export class HomeComponent implements OnInit{

    public title:string;
    /*public user:User;
    public status:string;
    public identity;
    public token;*/

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Bienvenido a NGSOCIAL'; 
        /*this.user = new User("",
            "",
            "",
            "",
            "",
            "",
            "",
            "");*/
    }

    ngOnInit(){
        console.log("componente home cargado");
    }

    onSubmit(form){
       
       /* this._userService.signup(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    this.identity = response.user;
                    console.log(this.identity);
                    this.status = 'success';

                    //Persistencia
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    this.getToken(form);
                } else {
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }

        );*/
    }

    getToken(form){
       /*
        this._userService.signup(this.user, 'true').subscribe(
            response => {
               
                this.token = response.token;
                console.log(this.token);
                if(this.token.length > 0){
                    localStorage.setItem('token', JSON.stringify(this.token));
                    this.status = 'success';
                } else {
                    this.status = 'error';
                }
                    
                
            },
            error => {
                var errorMessage = <any>error;
                console.log('errorMessage');
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
                
            }

        );*/
    }

    
}