
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { Message } from '../../../models/message';
import { Follow } from '../../../models/follow';
import { UserService } from '../../../services/user.services';
import { MessageService } from '../../../services/message.service';
import { FollowService } from '../../../services/follow.services';
import { GLOBAL } from '../../../services/global';
import { MomentModule } from 'ngx-moment';

@Component({
    selector: 'sended',
    templateUrl: './sended.component.html',
    providers: [MessageService, FollowService, ]
})
export class SendedComponent implements OnInit{
    public title: string;
    public status:string;
    public identity;
    public token;
    public message: Message;
    public url:string;
    public messages:Message[];
    public page:number = 1;
    public next_page;
    public prev_page;
    public total:number;
    public pages:number = 0;

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
        this.actualPage();
    }

    getMessages(token, page){
        //console.log(this.token);
        this._messageService.getEmmitMessages(this.token, page).subscribe(
            response => {
                console.log(response);
                if(response.messages){
                    this.messages = response.messages;
                    this.total = response.total;
                    this.pages = response.pages;
                    
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

    actualPage(){
        this._route.params.subscribe(params => {
            console.log("DATOS FOLLOWING ");
            console.log(params);
            
            
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
            this.getMessages(this.token, 1);
        });
    }
}
