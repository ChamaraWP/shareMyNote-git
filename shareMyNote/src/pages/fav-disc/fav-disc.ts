import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FavDiscPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fav-disc',
  templateUrl: 'fav-disc.html',
})
export class FavDiscPage {
  favDisc:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter(){
   this.favDisc = this.navParams.get('data');
   console.log(this.favDisc);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavDiscPage');
  }

}
