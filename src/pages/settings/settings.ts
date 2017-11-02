import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController,AlertController,ToastController } from 'ionic-angular';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import {UserDetail} from './settings.model';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import {ServiceHelper} from '../../services/serviceHelper';
import {LoginPage} from '../login/login';
import { JobGetsRequest} from '../../model/JobRequest';
import {JobType,ViewsType,Operators,SortingType} from '../../model/appenums';
import {Filter,KeyValueData,Shorting,MasterDataSource} from '../../model/datasource.model';
import {AppCommon} from '../../model/appcommon';
import {Status} from '../../model/status.model';
import {Storage} from '@ionic/storage';
import {StoreKey} from '../../app.config';
import 'rxjs/Rx';
import {AppValidators} from '../../model/AppValidators'
import { ProfileModel } from '../profile/profile.model';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settingsForm: FormGroup;
  // make WalkthroughPage the root (or first) page
  rootPage: any = LoginPage;
  loading: any;
  profile: ProfileModel = new ProfileModel();
  profileImg ="./assets/images/profile/user.png";
  states: KeyValueData[]=[]
  cites: KeyValueData[]=[];
  private userId :string;
   private errorMsg :string="Auth error";
   private isError :boolean =false;
   private isDetailsSet=false;
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    private serviceHelper:ServiceHelper,
    public alertCtr: AlertController,
    private storage : Storage,
    public toastCtrl: ToastController,
  ) {
    this.loading = this.loadingCtrl.create();
    this.storage.get(StoreKey.UserId)
      .then((value) => this.userId=value)
      .catch(() => {this.errorMsg = "User not found!",this.isError=true});

    this.settingsForm = new FormGroup({
      phone: new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      address1: new FormControl('', [Validators.required,Validators.maxLength(30)]),
      address2: new FormControl('',[Validators.maxLength(30)]),
      pincode: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
      state: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
    });
  }
  ionViewWillEnter()
  {
    this.GetStates(1);
  }
  private GetStates(id:number)
  {
    this.loading.present();
    let orders :Shorting[]  =[];
    orders.push(new Shorting("Name",SortingType.Asc));
    let request = AppCommon.CreateGetsRequest(JobType.StateMaster,[],orders);
    this.serviceHelper.GetsJob(request)
    .then( response => this.OnStateSuccess(response) ,
        error => this.OnError(error));
  }
  private GetCities(id:number)
  {
    let filter :Filter[]=[];
    filter.push(new Filter("StateId",Operators.Equals,id))
    let orders :Shorting[]  =[];
    orders.push(new Shorting("Name",SortingType.Asc));
    let request = AppCommon.CreateGetsRequest(JobType.CityMaster,filter,orders);
    this.serviceHelper.GetsJob(request)
    .then( response => this.OnCitySuccess(response) ,
        error => this.OnError(error));
  }
  public OnStateSuccess(response:Status)
  {
    if(response.Status){
        this.states = response.Value.Data.map(item => new MasterDataSource(item));
        this.LoadUserDetails();
     }else
     {
       this.ShowAlert("Error",response.Message);
     }
      
  }
  public OnCitySuccess(response:Status)
  {
    if(response.Status){
        this.cites = response.Value.Data.map(item => new MasterDataSource(item));
        if(!this.isDetailsSet)
          this.SetUserDetails();
        else
          {
            this.settingsForm.setValue({
                city:this.profile.user.CityId
            });
          }
     }else
     {
       this.ShowAlert("Error",response.Message);
     }
      
  }
  onStateChange(event:any)
  {
    if(!isNaN(event))
      {
        this.GetCities(event);
      }
  }
  LoadUserDetails() {
    this.serviceHelper.GetViews(this.UserDetailsRequest())
      .then(response => {
        this.profile.user = response.Value.Data;
        this.GetCities(parseInt(this.profile.user.StateId)) ;
        this.loading.dismiss();
        this.loading = this.loadingCtrl.create()
      });
  }
private SetUserDetails()
{
    this.settingsForm.setValue({
        phone: this.profile.user.MobileNo,
        email: this.profile.user.Email,
        address1: this.profile.user.AddressLine1,
        address2: this.profile.user.AddressLine2,
        pincode: this.profile.user.Pincode,
        state: this.profile.user.StateId,
        city:this.profile.user.CityId
    });
    this.isDetailsSet=true;
}
private UserDetailsRequest():JobGetsRequest
 {
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewUserDetails;
    request.Filters=[];
    return request;
 }
  logout() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.serviceHelper.LogOut()
    .then( response => {
       this.loading.dismiss();
       this.loading = this.loadingCtrl.create()
       this.nav.setRoot(this.rootPage);
    } ,
        error => {
           this.loading.dismiss();
           this.loading = this.loadingCtrl.create()
           this.nav.setRoot(this.rootPage);
        });
    // navigate to the new page if it is not the current page
   
  }
  SaveUserDetails(){
     if(this.isError){
      this.ShowAlert("Error",this.errorMsg);
      return false;
    }
    console.log( this.settingsForm);
    this.loading.present();
    let userAddress = new UserDetail();
    userAddress.MobileNo= this.settingsForm.value.phone;
    userAddress.Email= this.settingsForm.value.email;
    userAddress.AddressLine1 = this.settingsForm.value.address1;
    userAddress.AddressLine2=  this.settingsForm.value.address2;
    userAddress.StateId = this.settingsForm.value.state;
    userAddress.CityId = this.settingsForm.value.city;
    userAddress.Pincode = this.settingsForm.value.pincode;
    userAddress.UserId=this.userId;
    this.serviceHelper.UserSetting(userAddress)
    .then( response => this.onDetailsSuccess(response) ,
        error => this.OnError(error));
  }
  onDetailsSuccess(response:Status)
  {
    this.loading.dismiss();
     if(response.Status){
       this.ShowToast("Update successfull!");
     }else
     {
       this.ShowAlert("Error",response.Message);
     }
  }
  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }
  OnError(error:any)
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
  ShowToast(msg:string) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
     this.nav.pop();
  });
  toast.present();
}

///Validation Start
  $validatePhone=false;
  $validateEmail=false;
  $validateAddress1=false;
  $validateAddress2=false;
  $validatePincode=false;
 public onPhoneBlur(){
    if(AppValidators.MobileNo(this.settingsForm.controls.phone))
       this.$validatePhone=true;
    else
        this.$validatePhone=false;
  }
  public onEmailBlur(){
    if(AppValidators.Email(this.settingsForm.controls.email))
       this.$validateEmail=true;
    else
        this.$validateEmail=false;
  }
   public onAddress1Blur(){
    if(AppValidators.MaxLength(this.settingsForm.controls.address1))
       this.$validateAddress1=true;
    else
        this.$validateAddress1=false;
  }
  public onAddress2Blur(){
    if(AppValidators.MaxLength(this.settingsForm.controls.address2))
       this.$validateAddress2=true;
    else
        this.$validateAddress2=false;
  }
  public onPincodeBlur(){
    if(AppValidators.Pincode(this.settingsForm.controls.pincode))
       this.$validatePincode=true;
    else
        this.$validatePincode=false;
  }
  ///Validation end

}
