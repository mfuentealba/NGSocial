import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'received',
    templateUrl: './received.component.html',
    providers: []
})
export class ReceivedComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = 'Mensajes recibidos';
    }

    ngOnInit(){
        console.log('ReceivedComponent');
    }
}
