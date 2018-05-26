import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { User } from "../../models/user"
import {FormGroup,FormBuilder,Validators,AbstractControl} from '@angular/forms'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  splash = true;
  user = {} as User;
  email:AbstractControl;
  password:AbstractControl;
  errmsg:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authprovider:AuthProvider,public frmBuilder:FormBuilder) {
    this.loginForm = this.frmBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]]
    });
    this.errmsg ='';

  }


  redirectToSignUp(){
    this.navCtrl.push(RegisterPage);
  }

  redirectToHome(value:any){
  if(this.loginForm.valid){
     this.user.email = value.email;
     this.user.password= value.password;
     console.log(this.user.email);
     this.authprovider.loginUser(this.user).then(
        () => this.navCtrl.insert(0, HomePage)
         .then(() => { // to use default animation and add Homepage as Root
          this.navCtrl.popToRoot()}),
           (err) =>
             this.errmsg = 'Not a Registerd User'
       );
    }else{
      this.errmsg='Filed are not valid'

    }


  }

  ionViewDidLoad() {
    setTimeout(() =>  this.splash = false ,3000)

  }

}
