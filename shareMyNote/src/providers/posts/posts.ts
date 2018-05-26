import { AngularFireDatabase } from 'angularfire2/database';
import { post } from './../../models/post';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'



/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API:string = "http://orangevalleycaa.org/api/music";
@Injectable()
export class PostsProvider {
 public userID:string = null
  constructor(public http: HttpClient,private afAuth:AngularFireAuth,private firebase:AngularFireDatabase) {
    this.afAuth.authState
    .subscribe((data )=> {
      this.userID = data.uid;
      console.log(this.userID);


  });
}

  getPosts(){
    return this.http.get<any>(API)
      .map(response => response);
  }

  setPost(userPost:post){
    console.log("this is user id  setPostfires"+ userPost.subject);
    //this.firebase.database.ref('/userProfile/'+this.userID).push(userPost);
    this.firebase.list(`/userProfile/${this.userID}/userPost`).push(userPost);
    this.firebase.list(`/allPosts`).push(userPost);
 }


 setComments(){
   //this.firebase.list().push();
 }

 getPost(){
   //return this.firebase.list();
 }

}
