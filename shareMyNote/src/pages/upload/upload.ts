import { PostsProvider } from './../../providers/posts/posts';
import { post } from './../../models/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




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
  constructor(public navCtrl: NavController, public navParams: NavParams,private postProvider:PostsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  uploadPost(userPost){
    console.log(userPost);

    this.postProvider.setPost(userPost);
  }


}
