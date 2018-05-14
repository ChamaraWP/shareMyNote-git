import { AngularFireDatabase} from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  userid:string = null;

  constructor(public http: HttpClient, private afAuth:AngularFireAuth, private firebase:AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
  }

  async registerUser(user:User){
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(
          newUser => {
                this.firebase
                  .database
                    .ref('/userProfile')
                      .child(newUser.uid)
                        .set({email:user.email,username:user.name})
    });
    console.log(result);
  }

  async loginUser(user:User){
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
        console.log(result);
          this.userid = result.uid
            console.log(this.userid);
    }

}
