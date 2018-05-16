import { FormGroup,FormBuilder,AbstractControl,Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public frmBuilder:FormBuilder) {

    this.uploadDiscussionForm = frmBuilder.group({
      title:['',[Validators.required,Validators.minLength(5),Validators.maxLength(150)]],
      description:['',[Validators.required,Validators.minLength(25),Validators.maxLength(1000)]]
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadDiscussionPage');
  }

  uploadDiscussion(value:any){

  }

}
