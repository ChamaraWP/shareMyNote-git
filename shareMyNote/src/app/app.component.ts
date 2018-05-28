import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DiscussionPage } from './../pages/discussion/discussion';
import { MenuController } from 'ionic-angular';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = LoginPage;
  loginEmail:any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth:AngularFireAuth,public menuCtrl:MenuController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Notes', component: HomePage },
      { title :'Discussions',component:DiscussionPage}

      ];

      this.afAuth.authState
      .subscribe((data )=> {
        this.loginEmail = data.email;
           console.log(this.loginEmail);
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  singoutUser(){
    this.afAuth.auth.signOut().then(() => {
      this.menuCtrl.close();
      this.nav.push(LoginPage);
    }).catch( (err) => {
      console.log("This is Signout Error " +err);
    })
  }
}
