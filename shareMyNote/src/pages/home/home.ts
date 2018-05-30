import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, ViewController,LoadingController,ToastController } from 'ionic-angular';
import { PostsProvider } from './../../providers/posts/posts';
import { PostPage } from './../post/post';
import { UploadPage } from './../upload/upload';
import firebase from 'firebase';








@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userObservable:AngularFireObject<any>;
  public userData:any
  searchQuery: string = '';
  shouldShowCancel: boolean = true;
  alive:boolean= false;
  menuIsHidden: boolean = false; // keep state of the togle button
  public loadedSeekers: Array<any>;
  public seekers: Array<any> = [];
  public seekerRef: firebase.database.Reference = firebase.database().ref('/allPosts');


  constructor(public navCtrl: NavController ,
    private viewController:ViewController,
    private loadinController:LoadingController,
    private pstProvider:PostsProvider,
    public toast:ToastController,


     ) {

    }



  ionViewWillEnter(){
   this.viewController.showBackButton(false);
  }

  ionViewDidLoad(){

    this.userObservable = this.pstProvider.getUserName();
    this.userObservable.snapshotChanges().subscribe((data) => {
      this.userData = data.payload.val();
      console.log(this.userData);
    });

  let loader = this.loadinController.create({ //create loader present that in component
      content:"Getting Ready"
    });
    loader.present()
        this.initializeItems();
        loader.dismiss();

    }

  directToPost(postObject:any){
    this.navCtrl.push(PostPage,{postObj:postObject,name:this.userData.username});
  }

  directToUpload(){
    this.navCtrl.push(UploadPage);
  }

  setFilteredItems() {
    this.initializeItems();
    this.seekers = this.seekers.filter((seeker) => {
      return seeker.obj.subject.toLowerCase().indexOf(this.searchQuery.toString().toLocaleLowerCase()) > -1;
    })
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

  addToFav(post){
    let toast = this.toast.create({
      message:'Favorit Added',
      duration:3000
    })
    toast.present();
    post.obj.type="Notes";
    this.pstProvider.addToFav(post);
  }

  onCancel() {

  }


}
