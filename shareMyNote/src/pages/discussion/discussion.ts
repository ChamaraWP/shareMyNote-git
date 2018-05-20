import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PostsProvider } from './../../providers/posts/posts';
import { UploadDiscussionPage } from '../upload-discussion/upload-discussion';

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
  public allDiscussion = []
  constructor(public navCtrl: NavController, public navParams: NavParams, private postProvider:PostsProvider, public loader:LoadingController ) {
  }

  ionViewDidLoad() {
    let loader = this.loader.create({
      content:'Getting Ready'
    })
    loader.present()
    this.postProvider.getPosts()
      .subscribe(discussionList => {
        this.allDiscussion = discussionList});
         loader.dismiss();
  }

  directToCreatDiscussion(){
    this.navCtrl.push(UploadDiscussionPage);
  }


}
