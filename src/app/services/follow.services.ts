import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class FollowService{
    public url:string;
    public identity:User;
    public token:any;
    public stats:any;

    constructor(
        public _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    addFollow(token, follow):Observable<any>{
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', token);
        return this._http.post(this.url + 'follow', params, {headers: headers});
    }

    deleteFollow(token, id):Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', token);
        return this._http.delete(this.url + 'follow/' + id, {headers: headers});
    }

    getFollowing(token, user_id, page = 1):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                              .set('Authorization', token);
      var url = this.url + 'following';
      console.log("DATA:----- " + user_id);
      if(user_id != null){
        url = this.url + 'following/' + user_id + '/' + page;
      }

      return this._http.get(url, {headers: headers});
  }

}
