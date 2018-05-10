import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { User } from "../../models/user"


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  splash = true;
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authprovider:AuthProvider) {
  }


  redirectToSignUp(){
    this.navCtrl.push(RegisterPage);
  }

  redirectToHome(user){

    this.authprovider.loginUser(user);
    // to use default animation and add Homepage as Root
    this.navCtrl.insert(0, HomePage).then(() => {
      this.navCtrl.popToRoot();
    });
  }

  ionViewDidLoad() {
    setTimeout(() =>  this.splash = false ,3000)

  }

}
