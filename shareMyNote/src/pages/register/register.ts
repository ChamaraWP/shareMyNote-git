import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators,AbstractControl} from '@angular/forms'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  registerForm:FormGroup;

  username:AbstractControl;
  email:AbstractControl;
  password:AbstractControl;
  repassword:AbstractControl;


  constructor(public navCtrl: NavController, public navParams: NavParams, private authprovider:AuthProvider,public frmBuilder:FormBuilder) {
    this.registerForm = frmBuilder.group({
      username:['',[Validators.required,Validators.minLength(4),Validators.maxLength(12)]],
      email:['',[Validators.required,Validators.email,Validators.minLength(8),Validators.maxLength(30)]],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      repassword:['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  singup(value:any){
    if(this.registerForm.valid){
      this.user.name = value.username,
      this.user.email = value.email
      console.log(value);
      //this.authprovider.registerUser(this.user)

  }else{
    console.error('Inputs not Valid');

  }

  }

  redirectToSignin(){
    this.navCtrl.push(LoginPage);
  }

}
