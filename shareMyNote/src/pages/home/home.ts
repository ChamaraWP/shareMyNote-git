import { UsercontentProvider } from './../../providers/usercontent/usercontent';
import { Component } from '@angular/core';
import { NavController, ViewController,LoadingController } from 'ionic-angular';
import { PostsProvider } from './../../providers/posts/posts';
import { PostPage } from './../post/post';
import { UploadPage } from './../upload/upload';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allPost = []
  alive:boolean= false;
  menuIsHidden: boolean = false; // keep state of the togle button

  constructor(public navCtrl: NavController ,
    private viewController:ViewController,
    private postProvider:PostsProvider,
    private loadinController:LoadingController,
    private userCont:UsercontentProvider,

     ) {

    }



  ionViewWillEnter(){
   this.viewController.showBackButton(false);
  }

  ionViewDidLoad(){

    let loader = this.loadinController.create({ //create loader present that in component
      content:"Getting Ready"
    });
    loader.present()
       this.postProvider.getPosts()
         .subscribe((postsList) => {
             this.allPost = postsList});
              loader.dismiss();
    }

  directToPost(){
    this.navCtrl.push(PostPage);
  }

  directToUpload(){
    this.navCtrl.push(UploadPage);
  }




}
