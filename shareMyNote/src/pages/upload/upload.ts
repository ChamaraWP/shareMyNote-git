import { PostsProvider } from './../../providers/posts/posts';
import { post } from './../../models/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';



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

  userPost = {} as post;
  constructor(public navCtrl: NavController, public navParams: NavParams,private postProvider:PostsProvider,private camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  uploadPost(userPost){
    console.log(userPost);
    this.postProvider.setPost(userPost);
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
