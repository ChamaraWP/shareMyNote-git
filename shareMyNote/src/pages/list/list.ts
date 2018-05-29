import { Observable } from 'rxjs/Observable';
import { PostsProvider } from './../../providers/posts/posts';
import { Disc } from './../../models/disc';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public discussion:any;
  postedComment:Observable<any[]>
  err:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertController:AlertController,private pstProvider:PostsProvider,public loader:LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param

  }

  ionViewCanEnter(){
    let loader = this.loader.create({
      content:'Getting Ready'
    })
    loader.present();
    this.discussion = this.navParams.get('post')
    console.log(this.discussion);
    loader.dismiss();
  }

  ionViewDidLoad(){
    console.log(this.discussion);

    this.postedComment = this.pstProvider.getAllCommentsOnDisc(this.discussion.key);
    this.postedComment.subscribe((data)=>{
      console.log("LogData "+data);
    })
  }


  openCommentModal(){
    console.log(this.discussion);

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
           data.name=this.discussion.obj.username;
           if( this.checkProperties(data)){
            console.log("Cant Post Empty Comments");
            this.err = 'Cant Post Empty Comments';
          }else{
            console.log(this.discussion.key);
            this.pstProvider.setDiscussionComments(data,this.discussion.key);
          }
        }
     }]
    }).present()


  }

  checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
  }

}
