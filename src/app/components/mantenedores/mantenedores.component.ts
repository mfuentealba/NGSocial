import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Catergoria } from '../../models/categoria';  
import { Subcategoria } from '../../models/subcategoria';  
import { TipoContrato } from '../../models/tipoContrato';  
import { UserService } from '../../services/user.services';
import { Form } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit{

    public title:string;
    public user:User;
    public status:string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Registrate';
        this.user = new User("",
            "",
            "",
            "",
            "",
            "",
            "",
            "");
    }

    ngOnInit(){
        console.log("componente register cargado");
    }

    onSubmit(form){
        console.log(this.user);
        this._userService.register(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    this.status = 'success';
                    form.reset();
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }

        );
    }

}