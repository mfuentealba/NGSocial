import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService]
})
export class TimelineComponent implements OnInit{
    public title:string;
   /* public user:User;*/
    public status:string;
    public identity;
    public token;
    public url:string;
    public publications:Publication[];
    public page = 1;
     /*public next_page;
    public prev_page;*/
    public total:number;
    public pages:number;
    /*public users:User[];
    public follows;*/
    public stats;
    public itemsPerPage:number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService

    ){
        this.title = 'Timeline';
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.gettoken();


    }

    ngOnInit(){
        console.log("componente TimelineComponent cargado");
        this.getPublications(this.page);
    }

   getPublications(page, adding = false){
       this._publicationService.getPublication(this.token, page).subscribe(
        response => {
            console.log(response);
            console.log(response['publications']);
            if(response['publications']){

                this.pages = response['pages'];
                this.total = response['totalItems'];
                this.itemsPerPage = response['items_per_page'];
                if(adding){
                    var arrA = this.publications;
                    var arrB = response['publications'];
                    this.publications = arrA.concat(arrB);
                    $("html, body").animate({scrollTop: $('body').prop("scrollHeight")}, 500);
                } else {
                    this.publications = response['publications'];
                }

                /*if(page > this.pages){
                    this._router.navigate(['/home']);
                }*/

                this.status = 'success';

            } else {
                this.status = 'error';
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

   public noMore = false;
   viewMore(){
        console.log(this.publications.length);
        console.log(this.total);
        this.page++;
       if(this.page == this.pages){
            this.noMore = true;
       }

       this.getPublications(this.page, true);
   }

   refresh(event){
    this.getPublications(1);
   }

}
