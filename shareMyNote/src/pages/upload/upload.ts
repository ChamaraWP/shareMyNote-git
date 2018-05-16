import { PostsProvider } from './../../providers/posts/posts';
import { post } from './../../models/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup,FormBuilder,Validators,AbstractControl } from '@angular/forms';



/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  uploadForm:FormGroup;
  userPost = {} as post;
  subject:AbstractControl;
  lessonNumber:AbstractControl;
  description:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private postProvider:PostsProvider,private camera:Camera,public frmBuilder:FormBuilder) {
    this.uploadForm = frmBuilder.group({
      subject:['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      lessonNumber:['',[Validators.required,Validators.minLength(1),Validators.maxLength(5)]],
      description:['',[Validators.required,Validators.minLength(20),Validators.maxLength(1000)]]
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  uploadPost(value:any){
    if(this.uploadForm.valid){
      this.userPost.subject = value.subject;
      this.userPost.lessonNumber = Number(value.lessonNumber);
      this.userPost.description = value.description;
      console.log(this.userPost);
      //this.postProvider.setPost(this.userPost);
    }

  }

  getImages(){
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.FILE_URI,
      targetHeight:1000,
      targetWidth:1000,
      quality:100,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }).then((images) => {
       this.userPost.photos.push(images)
    }).catch( (err) =>{
      console.log('This Error from Camera '+ err);

    })
  }


}
