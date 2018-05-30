import { PostsProvider } from './../../providers/posts/posts';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FavNotesPage } from '../fav-notes/fav-notes';
import { FavDiscPage } from '../fav-disc/fav-disc';

/**
 * Generated class for the FavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})


export class FavPage {

  public uid:any;
  shouldShowCancel: boolean = true;
  allFavs:Observable<any[]>


  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth:AngularFireAuth,private pstProvider:PostsProvider,public toast:ToastController) {
  }

  ionViewCanEnter(){
    this.afAuth.authState
    .subscribe((data )=> {
      this.uid = data.uid;
         console.log("this Fav Page : "+this.uid);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavPage');
    this.allFavs = this.pstProvider.getAllFav();
  }

  gotoDetailsPage(pageParams){

    if(pageParams.type == 'Notes'){
      console.log("Notes");
      this.navCtrl.push(FavNotesPage,{data:pageParams});
    }else{
      console.log("Disc");
      this.navCtrl.push(FavDiscPage,{data:pageParams});
    }

  }

  deleteFav(fav){
    let toast = this.toast.create({
      message:'Delete Sucessfully',
      duration:3000,
    })
    toast.present();
    this.pstProvider.deleteFav(fav.key);
  }






}
