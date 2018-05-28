import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PostsProvider } from './../../providers/posts/posts';
import { UploadDiscussionPage } from '../upload-discussion/upload-discussion';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the DiscussionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discussion',
  templateUrl: 'discussion.html',
})
export class DiscussionPage {
  Discussions:Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, private pstProvider:PostsProvider, public loader:LoadingController ) {
  }

  ionViewDidLoad() {
   let loader = this.loader.create({
      content:'Getting Ready'
    })
    loader.present()
     this.Discussions =  this.pstProvider.getAllDescussion();
    console.log(this.Discussions);

    loader.dismiss();
  }

  directToCreatDiscussion(){
    //console.log(values);
    this.navCtrl.push(UploadDiscussionPage);
  }

   directDicussionPage(discussion){

     this.navCtrl.push(ListPage,{post:discussion})

  }

}
