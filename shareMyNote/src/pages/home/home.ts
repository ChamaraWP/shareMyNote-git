import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { PostsProvider } from './../../providers/posts/posts';
import { PostPage } from './../post/post';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allPost = []


  menuIsHidden: boolean = false; // keep state of the togle button

  constructor(public navCtrl: NavController , private viewController:ViewController, private postProvider:PostsProvider) {

  }

  ionViewWillEnter(){
   this.viewController.showBackButton(false);
  }

  ionViewDidLoad(){
    this.postProvider.getPosts()
      .subscribe(postsList => this.allPost = postsList);
  }

  directToPost(){
    this.navCtrl.push(PostPage);
  }

}
