import { FavPage } from './../fav/fav';
import { Observable } from 'rxjs/Observable';
import { post } from './../../models/post';
import { PostsProvider } from './../../providers/posts/posts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,AlertController} from 'ionic-angular';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';




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
 postID2;
 postData={} as post;
 username;
 err:any;
 postedComment:Observable<any[]>

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modelController:ModalController,
     public alertController:AlertController,
     private pstProvider:PostsProvider,
     private firebase:AngularFireDatabase,
     public modalCtrl: ModalController

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
    console.log(this.postData);
  })
}


  ionViewDidLoad() {
    this.postID2 = this.navParams.get('param');
   this.username = this.navParams.get('name');
    console.log('ionViewDidLoad PostPage'+this.postID2);

    this.postedComment = this.pstProvider.getAllComments(this.postID2);
    this.postedComment.subscribe((data)=>{
      console.log("LogDataPost "+ data);
    })
}

  openCommentModal(){
    this.err = ""
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
        handler: (data) => {
          console.log(data);
          data.name=this.username;
          if(this.checkProperties(data)){
            console.log("Cant Post Empty Comments");
            this.err = 'Cant Post Empty Comments';
          }else{
            this.pstProvider.setComments(data,this.postID);
          }
        }
     }]
    }).present()

  }

  openPhotoModal(photo){
    console.log(photo);
    let photoViewer = this.modalCtrl.create(FavPage,{image:photo});
    photoViewer.present();

  }

  checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
  }


}
