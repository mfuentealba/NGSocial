import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    providers: []
})
export class MainComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = 'Mensajes Privados';
    }

    ngOnInit(){
        console.log('MainComponent');
    }
}
