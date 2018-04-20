import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    providers: []
})
export class AddComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = 'Enviar Mensaje';
    }

    ngOnInit(){
        console.log('AddComponent');
    }
}
