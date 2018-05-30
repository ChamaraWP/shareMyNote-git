import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FavNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fav-notes',
  templateUrl: 'fav-notes.html',
})
export class FavNotesPage {

  favNotes:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter(){
   this.favNotes = this.navParams.get('data')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavNotesPage');
  }

}
