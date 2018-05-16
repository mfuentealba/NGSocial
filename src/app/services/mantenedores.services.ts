import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import { Catergoria } from '../models/categoria';  
import { Subcategoria } from '../models/subcategoria';  
import { TipoContrato } from '../models/tipoContrato';  
import { GLOBAL } from './global';

@Injectable()
export class MantenedoresService{
    public url:string;
    
    
    

    constructor(
        public _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    saveCategoria(token, categoria):Observable<any>{
        let params = JSON.stringify(categoria);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        return this._http.post(this.url + 'categoria/create', params, {headers: headers});
    }

    

   

    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats'));
        console.log("getStats");


        console.log(stats);
        if(stats != 'undefined'){
            this.stats = stats
        } else {
            this.stats = null;
        }
        return this.stats;
    }

    getCounters(userId = null):Observable<any>{
        console.log("getCounters");
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.gettoken());

        if(userId){
            return this._http.get(this.url + 'counters/' + userId,{headers: headers});
        } else {
            return this._http.get(this.url + 'counters', {headers: headers});
        }

    }

    updateUser(user:User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.gettoken());
        return this._http.put(this.url + 'userUpdate/' + user._id, params, {headers: headers});
    }

    getUsers(page = null):Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.gettoken());
        return this._http.get(this.url + 'users/' + page, {headers: headers});
    }

    getUser(id = null):Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.gettoken());
        return this._http.get(this.url + 'user/' + id, {headers: headers});
    }
}
