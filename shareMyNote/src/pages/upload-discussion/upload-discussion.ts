import { AngularFireObject } from 'angularfire2/database';
import { FormGroup,FormBuilder,AbstractControl,Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { Disc } from '../../models/disc';


/**
 * Generated class for the UploadDiscussionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-discussion',
  templateUrl: 'upload-discussion.html',
})
export class UploadDiscussionPage {
  uploadDiscussionForm:FormGroup;
  title:AbstractControl;
  description:AbstractControl;
  discussion = {} as Disc;
  userObservable:AngularFireObject<any>;
  public userData:any;
  err:any



  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public frmBuilder:FormBuilder,
                private pstProvider:PostsProvider,
                public toastController:ToastController,

              ) {

    this.uploadDiscussionForm = frmBuilder.group({
      title:['',[Validators.required,Validators.minLength(5),Validators.maxLength(150)]],
      description:['',[Validators.required,Validators.minLength(25),Validators.maxLength(1000)]]
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadDiscussionPage');
    this.userObservable = this.pstProvider.getUserName();
    this.userObservable.snapshotChanges().subscribe((data) => {
      this.userData = data.payload.val();
      console.log(this.userData);
    });
}

  uploadDiscussion(value:any){
    let toast = this.toastController.create({
      message:'Post uploaded successfully',
      duration:3000
    })

    if(this.uploadDiscussionForm.valid){
      this.discussion.qstion = value.title;
      this.discussion.description = value.description;
      this.discussion.username =this.userData.username;
      this.pstProvider.setDiscussion(this.discussion);
      toast.present();
      this.uploadDiscussionForm.reset();
    }else{
      this.err="Fields are Empty";
    }
  }

}
