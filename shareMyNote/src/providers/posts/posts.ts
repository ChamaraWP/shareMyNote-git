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

  getAllPosts(){
    let ref = this.firebase.list('/allPosts/').snapshotChanges().map((changes)=>{
        return changes.map( c => ({
          key:c.payload.key,...c.payload.val()}))
    });
    return ref;
  }

  getUserName(){
    return this.firebase.object(`userProfile/${this.userID}`);
  }

  setPost(userPost:post){
    console.log("this is user id  setPostfires"+ userPost.subject);
    //this.firebase.database.ref('/userProfile/'+this.userID).push(userPost);
    this.firebase.list(`/userProfile/${this.userID}/userPost`).push(userPost).then((results)=>{
      console.log('This Is SetPostPrivder'+results);
  });
    this.firebase.list(`/allPosts`).push(userPost);
 }


 setComments(commentsObj,postID){
   console.log('test Comment'+commentsObj);
   this.firebase.list(`allPosts/${postID}/comments`).push(commentsObj);
 }

 getPost(postId:any){

}

 getAllDescussion(){
  let ref = this.firebase.list('/allDiscussion/').snapshotChanges().map((changes)=>{
    return changes.map( c => ({
      key:c.payload.key,...c.payload.val()}))
    });
  return ref;
 }

 getDiscussion(){

 }

 setDiscussion(values:any){
   console.log(values);
   this.firebase.list(`allDiscussion/`).push(values);
 }

 setDiscussionComments(commentsObj,postID){
  console.log('test Comment'+commentsObj);
   this.firebase.list(`allDiscussion/${postID}/comments`).push(commentsObj);
 }

 getAllComments(postID){
  let ref = this.firebase.list(`/allPosts/${postID}/comments`).snapshotChanges().map((changes)=>{
    return changes.map( c => ({
      key:c.payload.key,...c.payload.val()}))
    });
  return ref;
 }

 getAllCommentsOnDisc(discID){
  console.log('This function fires get All CommetsOn'+ discID);
  let ref = this.firebase.list(`/allDiscussion/${discID}/comments`).snapshotChanges().map((changes)=>{
    return changes.map( c => ({
      key:c.payload.key,...c.payload.val()}))
    });
  return ref;
 }

}
