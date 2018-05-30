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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { PostPage } from './../pages/post/post';
import { DiscussionPage } from './../pages/discussion/discussion';
import { UploadPage } from './../pages/upload/upload';
import { UploadDiscussionPage } from './../pages/upload-discussion/upload-discussion';
import { FavPage } from './../pages/fav/fav';
import { PhotoviewPage } from './../pages/photoview/photoview';
import { FavNotesPage } from '../pages/fav-notes/fav-notes';
import { FavDiscPage } from './../pages/fav-disc/fav-disc';

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
    UploadDiscussionPage,
    FavPage,
    PhotoviewPage,
    FavNotesPage,
    FavDiscPage



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
    CommonModule,
    IonicImageViewerModule

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
    UploadDiscussionPage,
    FavPage,
    PhotoviewPage,
    FavNotesPage,
    FavDiscPage




  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostsProvider,
    AuthProvider,
    UsercontentProvider,
    ImagePicker,
    File



  ]
})
export class AppModule {}
