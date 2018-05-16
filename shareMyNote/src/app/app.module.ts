import { UsercontentProvider } from './../providers/usercontent/usercontent';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FIREBASE_CONFIG } from './app.firebase.config'
import { Camera } from '@ionic-native/camera'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { PostPage } from './../pages/post/post';
import { DiscussionPage } from './../pages/discussion/discussion';
import { UploadPage } from './../pages/upload/upload';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PostsProvider } from '../providers/posts/posts';
import { AuthProvider } from './../providers/auth/auth';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    PostPage,
    DiscussionPage,
    UploadPage,


  ],
  imports: [

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CommonModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    PostPage,
    DiscussionPage,
    UploadPage,



  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostsProvider,
    AuthProvider,
    UsercontentProvider,
    Camera,



  ]
})
export class AppModule {}
