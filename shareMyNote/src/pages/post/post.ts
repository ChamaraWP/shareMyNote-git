import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,AlertController} from 'ionic-angular';
import { CommentsPage } from './../comments/comments';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modelController:ModalController, public alertController:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  openCommentModal(){
    console.log('Model is Empty Now')
    let commentModal= this.modelController.create(CommentsPage,{
      name:'UserName',

    });
    commentModal.present();

  }

}
