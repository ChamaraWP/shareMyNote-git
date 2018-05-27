import { post } from './../../models/post';
import { PostsProvider } from './../../providers/posts/posts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,AlertController} from 'ionic-angular';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs/Observable';



/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
 userID:string = null
 comments:string = null
 postObservable:AngularFireObject<any>
 userPost = {} as post;
 postID;
 postData={} as post;
 userDetails:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modelController:ModalController,
     public alertController:AlertController,
     private pstProvider:PostsProvider,
     private firebase:AngularFireDatabase
     ) {

      this.userPost.comments = [];
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter PostPage');
    this.postID = this.navParams.get('param');
    console.log(this.postID);

    this.postObservable = this.firebase.object(`allPosts/${this.postID}`);
    this.postObservable.snapshotChanges().subscribe((data) => {
    this.postData = data.payload.val();
    })



}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    console.log(this.postData);
 /* this.postID = this.navParams.get('param');
    console.log(this.postID);

    this.postObservable = this.firebase.object(`allPosts/${this.postID}`);
    this.postObservable.snapshotChanges().subscribe((data) => {
      this.postData = data.payload.val();
      console.log(this.postData.subject);
 })*/

}

  openCommentModal(){
    console.log(this.postData);

    this.alertController.create({
      title:"Add your comment",
      cssClass:'alertcss',
      inputs:[{
        name:'comment',
      }],
      buttons:[
      {  text:'Close',
         role:'cansle'
      },
      {
        text:'Post',
        role:'submit',
        handler: (data ) => {
           console.log(data.comment)

        }
     }]
    }).present()

  }
  ionViewDidLeave(){

  }

}
