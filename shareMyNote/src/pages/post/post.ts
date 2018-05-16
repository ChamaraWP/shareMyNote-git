
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,AlertController} from 'ionic-angular';


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
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modelController:ModalController,
     public alertController:AlertController,
     ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  openCommentModal(){

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

}
