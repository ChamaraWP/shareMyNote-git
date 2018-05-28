import { Observable } from 'rxjs/Observable';
import { PostsProvider } from './../../providers/posts/posts';
import { Disc } from './../../models/disc';
import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public discussion = {} as Disc;
  postedComment:Observable<any[]>
  err:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertController:AlertController,private pstProvider:PostsProvider) {
    // If we navigated to this page, we will have an item available as a nav param

  }

  ionViewCanEnter(){
    this.discussion = this.navParams.get('post')
    console.log(this.discussion);
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
           data.name=this.discussion.username;
           if( this.checkProperties(data)){
            console.log("Cant Post Empty Comments");
            this.err = 'Cant Post Empty Comments';
          }else{

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
