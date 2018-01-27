import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl,ValidatorFn,AbstractControl } from '@angular/forms';
import {Storage} from '@ionic/storage';
import {LoginService} from '../../services/loginService';

import {ThemeableBrowser} from '@ionic-native/themeable-browser'
import { AddressPage } from '../address/address';
import {Registration} from '../../model/login.model';
import {Status } from '../../model/status.model';
import {StoreKey,AppConfig} from '../../app.config';
import {AppValidators} from '../../model/AppValidators'
import {AppCommon} from '../../model/appcommon';
import {DeviceType} from '../../model/appenums';
import {EmailValidator} from 'ng-email-validation';
import {Localstorage} from '../../services/storageService';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: FormGroup;
  address_page: { component: any };
  loading :any;

  constructor(public nav: NavController,
   public modal: ModalController,
   public loginService: LoginService,
   private storage : Localstorage,
   public alertCtr :AlertController,
   private themeableBrowser: ThemeableBrowser,
   public loadingCtrl: LoadingController
  ) {
    this.address_page = { component: AddressPage };
    this.loading = this.loadingCtrl.create();
    this.signup = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.maxLength(20)]),
      phone: new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required,EmailValidator.emailValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
      confirm_password: new FormControl('', [Validators.required,this.ConformPassword('password')])
    });
    }
  private ConformPassword(field_name): any
  {
      return AppValidators.CheckConformPassword(field_name);
  }
  doSignup(){
    let login = new Registration();
    login.Name = this.signup.value.name;
    login.Email = this.signup.value.email;
    login.PhoneNo = this.signup.value.phone;
    login.Password = this.signup.value.password;
    login.UserType="C";
    if(AppCommon.IsCordovaAvailable()){
        login.DeviceId=device.uuid;
        login.DeviceType=DeviceType.Android;
    }
    this.loading.present();
    this.loginService.SignUp(login)
    .then( response => this.onSignUpSuccess(response) ,
        error => this.onLoginError(error));
  }
  onSignUpSuccess(response:Status)
  {
     this.loading.dismiss();
     if(response.Status){
        this.storage.SetValue(StoreKey.AuthKey, response.Value.AuthKey);
        this.storage.SetValue(StoreKey.UserId, response.Value.UserId);
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


  showPrivacyModal() {
    let options = {
			statusbar: {
				color: '#ffffffff'
			},
			toolbar: {
				height: 44,
				color: '#3ea3bd'
			},
			title: {
				color: '#ffffffff',
				showPageTitle: true
			},
			closeButton: {
				wwwImage: 'assets/images/close.png',
				wwwImageDensity: 2,
				align: 'left',
				event: 'closePressed'
      },
    //   menu: {
	// 			wwwImage: 'assets/images/menu.png',
	// 			wwwImageDensity: 2,
	// 			align: 'right',
	// 			title: 'Test',
	// 			cancel: 'Cancel',
	// 			items: [
	// 				{
	// 					event: 'helloPressed',
	// 					label: 'Hello World!'
	// 				},
	// 				{
	// 					event: 'testPressed',
	// 					label: 'Test!'
	// 				}
	// 			]
	// 		},
			backButtonCanClose: true
    };
    
    let browser = this.themeableBrowser.create(AppConfig.BaseUrl +'TandC.html', '_self', options);
  }

  ///Validation Start
  $validateName=false;
  $validatePhone=false;
  $validateEmail=false;
  $validatePassword=false;
  $validateConformPwd=false;
  
  public onNameBlur()
  {
    if(AppValidators.MaxLength(this.signup.controls.name))
       this.$validateName=true;
    else
        this.$validateName=false;
  }
  public onPhoneBlur(){
    if(AppValidators.MobileNo(this.signup.controls.phone))
       this.$validatePhone=true;
    else
        this.$validatePhone=false;
  }
  public onEmailBlur(){
    if(AppValidators.Email(this.signup.controls.email))
       this.$validateEmail=true;
    else
        this.$validateEmail=false;
  }
  public onPasswordBlur(){
    if(AppValidators.Password(this.signup.controls.password))
       this.$validatePassword=true;
    else
        this.$validatePassword=false;
  }

  public onConfirmPasswordBlur(){
    if(AppValidators.ConfirmPassword(this.signup.controls.confirm_password))
       this.$validateConformPwd=true;
    else
        this.$validateConformPwd=false;
  }
  ///Validation end



}
