import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
/*import { User } from '../../models/user';*/
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.services';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';

//import { Form } from '@angular/forms';
import { GLOBAL } from '../../services/global';
//import { FollowService } from '../../services/follow.services';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService]
})
export class SidebarComponent implements OnInit{
    /*public title:string;
    public user:User;*/
    public status:string;
    public identity;
    public token;
    public url:string;
    public publication:Publication;


    /*public page;
    public next_page;
    public prev_page;
    public total:string;xxx
    public pages:string;
    public users:User[];
    public follows;*/
    public stats;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _uploadService: UploadService

    ){
        //this.title = 'Gente';
        this.url = GLOBAL.url;
        //this.user = this._userService.getIdentity();
        this.identity = this._userService.getIdentity();
        this.token = this._userService.gettoken();
        console.log('CONSTRUCCION');
        this.stats = this._userService.getStats();
        console.log(this.stats);
        this.publication = new Publication("", "", "", "", this.identity._id);
    }

    ngOnInit(){
        console.log("componente SidebarComponent cargado");
        console.log(this.identity);
        //this.actualPage();
    }

    onSubmit(form, event){
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                console.log(event);

                if(response.publication){


                    if(this.filesToUpload && this.filesToUpload.length){
                        this._uploadService.makeFileRequest(this.url + 'uploadImagePublication/' + response.publication._id, [], this.filesToUpload, this.token, 'image')
                        .then((result:any) => {
                            this.status = 'success';
                            form.reset();
                            this.sendPublication(event);
                            this._router.navigate(['timeline/']);
                        })
                    } else {
                        this.status = 'success';
                        form.reset();
                        this.sendPublication(event);
                        this._router.navigate(['timeline/']);
                    }


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

    public filesToUpload:Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    @Output() sended = new EventEmitter();
    sendPublication(event){
      this.sended.emit({send: 'true'});
    }

}
