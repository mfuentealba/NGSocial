import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.services';

@Injectable()
export class UserGuard  implements CanActivate{

    constructor(
        private _userService:UserService,
        private _router:Router
    ){

    }

    canActivate(){
        let identity = this._userService.getIdentity;

        if(identity && (('ROLE_USER|ROLE_ADMIN').indexOf(identity['role']) > 1 )){
            return true;
        } else 
            this._router.navigate(['/login']);
            return false;
    }
}