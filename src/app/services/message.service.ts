import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Message } from '../models/message';
import { GLOBAL } from './global';

@Injectable()
export class MessageService{
    public url:string;


    constructor(
        public _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    addMessage(token, message):Observable<any>{
        let params = JSON.stringify(message);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', token);
        return this._http.post(this.url + 'message', params, {headers: headers});
    }

    getMyMessages(token, page = 1){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', token);
        return this._http.get(this.url + 'myMessages/' + page, {headers: headers});
    }

    getEmmitMessages(token, user_id, page = 1):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                              .set('Authorization', token);
      return this._http.get(this.url + 'myMessagesEmit/' + user_id + '/' + page, {headers: headers});
  }

    /*deletePublication(token, id):Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', token);
        return this._http.delete(this.url + 'publicationDelete/' + id, {headers: headers});
    }*/

}
