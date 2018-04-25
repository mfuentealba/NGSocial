import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { Message } from '../../../models/message';
import { Follow } from '../../../models/follow';
import { UserService } from '../../../services/user.services';
import { MessageService } from '../../../services/message.service';
import { FollowService } from '../../../services/follow.services';
import { GLOBAL } from '../../../services/global';


@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    providers: [MessageService, UserService, FollowService]
})
export class AddComponent implements OnInit{
    public title: string;
    public user:User;
    public status:string;
    public identity;
    public token;
    public message: Message;
    public url:string;
    public follows:any[];
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _messageService: MessageService,
        private _followService: FollowService
    ){
        this.title = 'Enviar Mensaje';
        this.url = GLOBAL.url;        
        this.identity = this._userService.getIdentity();
        this.token = this._userService.gettoken();
        console.log(this.identity);
        this.message = new Message('', '', '', '', this.identity._id, '');
    }

    ngOnInit(){
        console.log('AddComponent');
        this.getMyFollows();
    }

    onSubmit(form){
        this._messageService.addMessage(this.token, this.message).subscribe(
            response => {
                if(response.message){
                    this.status = 'success';
                }
                form.reset();
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

    getMyFollows(){
        this._followService.getMyFollows(this.token).subscribe(
            response => {
                this.follows = response.follows;
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
