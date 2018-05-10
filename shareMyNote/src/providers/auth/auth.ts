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

  constructor(public http: HttpClient, private afAuth:AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  async registerUser(user:User){
    try{
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
        console.log(result);

    }catch(error){
       console.log('Somethig Went Worng '+ error);
    }
  }

  async loginUser(user:User){
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);

    } catch (error) {
      console.log('Somethig Went Worng '+ error);
    }
  }

}
