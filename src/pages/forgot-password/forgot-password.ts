import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {LoginService} from '../../services/loginService';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import {Login} from  '../../model/login.model';
import {EmailValidator} from 'ng-email-validation';
import {Status} from '../../model/status.model';
@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  main_page: { component: any };
  loading:any;
  constructor(
    public nav: NavController ,
    public loginService:LoginService,
    private alertCtr: AlertController,
    public loadingCtrl: LoadingController,) {
    this.main_page = { component: TabsNavigationPage };
    this.loading = this.loadingCtrl.create();
    this.CreateForm();
  }
  private CreateForm()
  {
    this.forgot_password = new FormGroup({
      email: new FormControl('', [Validators.required,EmailValidator.emailValidator])
    });
  }
  recoverPassword(){
    console.log(this.forgot_password.value);
    this.loading.present();
    let login = new Login();
    login.UserName = this.forgot_password.value.email;
    this.loginService.ForgetPassword(login)
    .then( response => this.onLoginSuccess(response) ,
        error => this.onLoginError(error));
        
    //this.nav.setRoot(this.main_page.component);
  }
  onLoginSuccess(response:Status)
  {
    this.loading.dismiss();
     if(response.Status){
      this.ShowAlert("Success",response.Message);
      this.CreateForm();
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

}
