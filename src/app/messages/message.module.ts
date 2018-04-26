//Librerias Modulo
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Componentes

import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';
import { SendedComponent } from './components/sended/sended.component';
import { ReceivedComponent } from './components/received/received.component';
import { MomentModule } from 'ngx-moment';

//Rutas

import { MessagesRoutingModule } from './messages.routing.module';

@NgModule({
    declarations: [
        AddComponent,
        MainComponent,
        SendedComponent,
        ReceivedComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      MessagesRoutingModule,
      MomentModule
    ],
    providers: [
      
    ],
    exports: [
        AddComponent,
        MainComponent,
        SendedComponent,
        ReceivedComponent
    ]
  })
  export class MessageModule { }
  