import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { PostsProvider } from './../../providers/posts/posts';
import { UploadDiscussionPage } from '../upload-discussion/upload-discussion';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
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

  searchQuery: string = '';
  shouldShowCancel: boolean = true;
  public loadedSeekers: Array<any>;
  public seekers: Array<any> = [];
  public seekerRef: firebase.database.Reference = firebase.database().ref('/allDiscussion');


  constructor(public navCtrl: NavController, public navParams: NavParams, private pstProvider:PostsProvider, public loader:LoadingController,public toast:ToastController ) {
  }

  ionViewDidLoad() {


   let loader = this.loader.create({
      content:'Getting Ready'
    })
    loader.present()
    this.initializeItems()
    loader.dismiss();
  }

  directToCreatDiscussion(){
    //console.log(values);
    this.navCtrl.push(UploadDiscussionPage);
  }

   directDicussionPage(discussion){
    this.navCtrl.push(ListPage,{post:discussion})
  }


  initializeItems() {
    this.seekerRef.on('value', itemSnapshot => {
      this.seekers = [];
      itemSnapshot.forEach(itemSnap => {
          this.seekers.push({
          key:itemSnap.key,
          obj:itemSnap.val()});
        return false;
      })
    })
  }

  setFilteredItems() {
    this.initializeItems();
    this.seekers = this.seekers.filter((seeker) => {
      return seeker.obj.qstion.toLowerCase().indexOf(this.searchQuery.toString().toLocaleLowerCase()) > -1;
    })
  }

  addToFav(discussion:any){
    let toast = this.toast.create({
      message:'Favorit Added',
      duration:3000
    })
    toast.present();
    discussion.obj.type="Discussion"
    discussion.obj.subject=discussion.obj.qstion;
    this.pstProvider.addToFav(discussion);
  }

  onCancel() {

  }


}
