import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  menuIsHidden: boolean = false; // keep state of the togle button

  constructor(public navCtrl: NavController , private viewController:ViewController) {

  }

  ionViewWillEnter(){
   this.viewController.showBackButton(false);
  }

  ionViewDidLoad(){

  }

}
