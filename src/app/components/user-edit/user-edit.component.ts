import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';  
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.service';
import { Form } from '@angular/forms';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit{
    public title:string;
    public user:User;
    public status:string;
    public identity;
    public token;
    public url:string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService

    ){
        this.title = 'Actualizar mis datos';
        this.url = GLOBAL.url;
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.gettoken();
    }

    ngOnInit(){
        console.log("componente UserEditComponent cargado");
    }

    onSubmit(form){
        console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(response.user));
                    this.identity = response.user;

                    this._uploadService.makeFileRequest(this.url + 'uploadImageUser/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                        .then((result:any) => {
                            console.log(result);
                            this.user.image = result.user.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                        })
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

        );
    }

    public filesToUpload:Array<File>;

    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}