import { Observable } from 'rxjs/Observable';
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
  //public allPost = []
  allPost:Observable<any[]>
  alive:boolean= false;
  menuIsHidden: boolean = false; // keep state of the togle button


  constructor(public navCtrl: NavController ,
    private viewController:ViewController,
    private loadinController:LoadingController,
    private pstProvider:PostsProvider

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
        this.allPost = this.pstProvider.getAllPosts();
        console.log(this.allPost);
    loader.dismiss();

    }

  directToPost(postid:any){
    console.log(postid);

    this.navCtrl.push(PostPage,{param:postid});



  }

  directToUpload(){
    this.navCtrl.push(UploadPage);
  }




}
