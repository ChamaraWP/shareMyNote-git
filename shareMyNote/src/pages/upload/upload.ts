import { AngularFireDatabase } from 'angularfire2/database';
import { PostsProvider } from './../../providers/posts/posts';
import { post } from './../../models/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup,FormBuilder,Validators,AbstractControl } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { File } from '@ionic-native/file';



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
  public images = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private postProvider:PostsProvider,
    private camera:Camera,
    public frmBuilder:FormBuilder,
    public toastController:ToastController,
    private imgPicker:ImagePicker,
    private file:File
    ) {
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
   let toast = this.toastController.create({
      message:'Post uploaded successfully',
      duration:3000

    })

    if(this.uploadForm.valid){

      if(this.images.length > 0){
        for (var i=0; i<this.images.length; i++) {
          console.log('this is inside the post'+this.images[i]);
          firebase.storage().ref('/images').putString(this.images[i], 'base64',{contentType: 'image/jpg'}).then((data)=>{
            this.userPost.photos[i]=data.downloadURL
            console.log( 'this is download url '+this.userPost.photos[i]);
          })
        }
      }
        this.userPost.subject = value.subject;
        this.userPost.lessonNumber = Number(value.lessonNumber);
        this.userPost.description = value.description;
        console.log(this.userPost);
        this.postProvider.setPost(this.userPost);
        toast.present();
        this.uploadForm.reset();
        this.images=[];

   }else{
      console.log('Post Upload Faild');
   }
}

  getImages(){
    let option = {
      title:"Selec Your Images",
      message:'You can only select 5 Images',
      maximumImagesCount:5,
      outType:1
    }
    this.imgPicker.getPictures(option).then((results) => {
      for(let i=0; i < results.length;i++){
      this.file.resolveLocalFilesystemUrl(results[i]).then((newUrl)=>{
        console.log('newUrl'+newUrl);
        let dirPath = newUrl.nativeURL;
        let dirPathSegment = dirPath.split('/')
        dirPathSegment.pop()
        dirPath = dirPathSegment.join('/')


        this.file.readAsArrayBuffer(dirPath,newUrl.name).then((buffer)=>{
            console.log(buffer);
            this.upload(buffer,newUrl.name);
        })

      })
    }
    },(err)=> {
      console.log("Get Image faild");
    })

   /* this.camera.getPicture({
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
       console.log(images);

    }).catch( (err) =>{
      console.log('This Error from Camera '+ err);

    })*/
  }

 upload(buffer,name){
    let blob = new Blob([buffer],{type:"image/jpeg"});
    firebase.storage().ref('images/'+name).put(blob).then((results)=>{
      console.log(results.downloadURL);
    })
 }

}
