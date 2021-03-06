import { Component ,ViewChild} from '@angular/core';
import { NavController,AlertController,ModalController ,LoadingController} from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {Storage} from '@ionic/storage';
import {Device } from '@ionic-native/device';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import {LoginService} from '../../services/loginService';
import { AddressPage } from '../address/address';
import {Login} from  '../../model/login.model';
import {Status} from '../../model/status.model';
import {StoreKey} from '../../app.config';
import {AppCommon} from '../../model/appcommon';
import {DeviceType} from '../../model/appenums';
import {EmailValidator} from 'ng-email-validation';
import {Localstorage  } from "../../services/storageService";
///http://www.concretepage.com/angular-2/angular-2-http-post-example
//https://www.npmjs.com/package/angular2-social-login
@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage  {
  login: FormGroup;
  main_page: { component: any };
  address_page: { component: any };
  errorMessage: String;
  public user;
  sub: any;
  loading:any;
  banner_image: string = "./assets/images/pmcclogo-img.png";
  private authKey :string ="";
  constructor(public nav: NavController, 
              private loginService:LoginService,
              //private storage : Storage,
              private alertCtr: AlertController,
              public modal: ModalController,
              public loadingCtrl: LoadingController,
              private device:Device,
              private storage:Localstorage
             ) {
    this.main_page = { component: TabsNavigationPage };
    this.address_page = { component: AddressPage };
    this.loading = this.loadingCtrl.create();
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required,EmailValidator.emailValidator]),
      password: new FormControl('', Validators.required)
    });
    
  }
  doLogin(){
    this.loading.present();
    let login = new Login();
    login.UserName = this.login.value.email;
    login.PassWord = this.login.value.password;
    if(AppCommon.IsCordovaAvailable()){
        login.DeviceId=device.uuid;
        login.DeviceType=DeviceType.Android;
    }
    console.log(this.login.value);
    this.loginService.Login(login)
    .then( response => this.onLoginSuccess(response) ,
        error => this.onLoginError(error));
  }
  onLoginSuccess(response:Status)
  {
    this.loading.dismiss();
     if(response.Status){
       this.storage.SetValue(StoreKey.AuthKey, response.Value.AuthKey);
       this.storage.SetValue(StoreKey.UserId, response.Value.ClientId);
       if(response.Value.IsSet=="1")
          this.nav.setRoot(this.main_page.component);
       else
          this.nav.push(this.address_page.component);
     }else
     {
       this.ShowAlert("Error",response.Message);
     }
      setTimeout(()=>{this.loading = this.loadingCtrl.create();},1000);
  }
  onLoginError(error:any)
  {
    this.loading.dismiss();
    if(error.message!=null)
      this.ShowAlert("Error",error.message);
    else
     this.ShowAlert("Error",error);
     setTimeout(()=>{this.loading = this.loadingCtrl.create();},1000);
  }
  ShowAlert(title:string,msg:string) {
    let alert = this.alertCtr.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
    doFacebookLogin() {
    this.nav.setRoot(this.main_page.component);
  }
  doGoogleLogin() {
    // this.googlePlus.login({
    //   'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    //   'webClientId': '343753043222-stm16dcg0tg8p4ufl7g55kcou4a94k89.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    //   'offline': true
    // })
    // .then(user=>this.onGoogleLogin(user),
    //       error=>this.onLoginError(error) );
    this.nav.setRoot(this.main_page.component);
  }
  onGoogleLogin(user)
  {
    this.ShowAlert("Success","Success") ;
  }
  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
}
