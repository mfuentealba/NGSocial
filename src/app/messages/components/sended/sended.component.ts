
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
    selector: 'sended',
    templateUrl: './sended.component.html',
    providers: []
})
export class SendedComponent implements OnInit{
    public title: string;
    public status:string;
    public identity;
    public token;
    public message: Message;
    public url:string;
    public messages:Message[];

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _messageService: MessageService,
      private _followService: FollowService
    ){
        this.title = 'Mensajes Enviados';
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.gettoken();
        console.log(this.identity);
        this.message = new Message('', '', '', '', this.identity._id, '');
    }

    ngOnInit(){
        console.log('SendedComponent');
        this.getMessages();
    }

    getMessages(){
      this._messageService.getEmmitMessages(this.token, 1).subscribe(
        response => {
            if(response.messages){
                this.messages = response.messages;
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
