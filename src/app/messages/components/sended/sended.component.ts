import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'sended',
    templateUrl: './sended.component.html',
    providers: []
})
export class SendedComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = 'Mensajes Enviados';
    }

    ngOnInit(){
        console.log('SendedComponent');
    }
}
