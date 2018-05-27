import { Observable } from 'rxjs/Observable';
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

  /*getPosts(){
    return this.http.get<any>(API)
      .map(response => response);
  }*/

  getAllPosts(){
    let ref = this.firebase.list('/allPosts/').snapshotChanges().map((changes)=>{
        return changes.map( c => ({
          key:c.payload.key,...c.payload.val()}))
    });
  return ref;

  }

  getUserName(){
    let username:any
   let usn = this.firebase.object(`userProfile/${this.userID}`).snapshotChanges().subscribe((data)=>{
      console.log("username"+data);
      username=data.payload.val();
      return username.username
    });

    console.log("Hello"+usn);
    return usn;



  }

  setPost(userPost:post){
    console.log("this is user id  setPostfires"+ userPost.subject);
    //this.firebase.database.ref('/userProfile/'+this.userID).push(userPost);
    this.firebase.list(`/userProfile/${this.userID}/userPost`).push(userPost).then((results)=>{
      console.log('This Is SetPostPrivder'+results);
  });
    this.firebase.list(`/allPosts`).push(userPost);
 }


 setComments(){
   //this.firebase.list().push();
 }

 getPost(postId:any){
   console.log('post service post id'+ postId);

   let ref = this.firebase.object(`userProfile/${postId}`).snapshotChanges().map((changes)=>{
     return changes.payload.toJSON();
   })

   return ref;
}

}
