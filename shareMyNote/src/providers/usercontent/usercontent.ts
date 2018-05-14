import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


/*
  Generated class for the UsercontentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsercontentProvider {

  userid:string = null;

  constructor(public http: HttpClient, private afAuth:AngularFireAuth) {
    console.log('Hello UsercontentProvider Provider2');
    this.userCredential();
  }

  userCredential(){
   this.afAuth.authState
      .subscribe((data )=> {
        this.userid = data.uid;
        console.log(this.userid);
         this.userid;

    });
  }


}
