import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl,ValidatorFn,AbstractControl } from '@angular/forms';
import {EmailValidator} from 'ng-email-validation';
import {AppValidators} from '../../model/AppValidators';
import {ContactUs} from './contactus.model';
import {ServiceHelper } from '../../services/serviceHelper';

@Component({
    selector: 'contactus-page',
    templateUrl: 'contactus.html'
  })
  export class ContactusPage {

  contactusForm: FormGroup;
  loading :any;
  $validateName=false;
  $validateEmail=false;

    constructor(public nav: NavController,
      public alertCtr :AlertController,
      public loadingCtrl: LoadingController,
      private serviceHelper:ServiceHelper
     ) {
       this.loading = this.loadingCtrl.create();
       this.CreateForm();
    }
  public CreateForm()
  {
    this.contactusForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required,EmailValidator.emailValidator]),
      details: new FormControl('', [Validators.required,Validators.maxLength(200)]),
    });
  }
  public onNameBlur()
  {
    this.$validateName =AppValidators.MaxLength(this.contactusForm.controls.name);
  }
  public onEmailBlur(){
    this.$validateEmail =AppValidators.Email(this.contactusForm.controls.email);
  }
  /**
   *  doContactUs
   */
public  doContactUs(){
    let contact = new ContactUs();
    contact.Name = this.contactusForm.value.name;
    contact.EmailId = this.contactusForm.value.email;
    contact.Description = this.contactusForm.value.details;
    this.loading.present();
    this.serviceHelper.ContactUs(contact)
    .then( response => this.onCuntactUsSuccess(response) ,
        error => this.onLoginError(error));
  }
  onCuntactUsSuccess(response:boolean)
  {
     this.loading.dismiss();
     if(response){
      this.CreateForm();
      this.ShowAlert("Success","Your request have submited successfuly");
     }else
     {
       this.ShowAlert("Error","Some error occurred,try again");
     }
     this.loading = this.loadingCtrl.create();
  }
  onLoginError(error:any)
  {
    this.loading.dismiss();
     this.ShowAlert("Error",error);
     this.loading = this.loadingCtrl.create();
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
