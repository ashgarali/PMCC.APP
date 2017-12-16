import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import {Storage} from '@ionic/storage';
import {UserAddress} from '../../model/login.model';
import {KeyValueData} from '../../model/datasource.model';
import {JobGetsRequest} from '../../model/JobRequest';
import {Status} from '../../model/status.model';
import {ServiceHelper} from '../../services/serviceHelper';
import {StoreKey} from '../../app.config';
import {JobType,Operators,SortingType} from '../../model/appenums';
import {AppCommon} from '../../model/appcommon';
import {Shorting,DataSourceList,MasterDataSource,Filter} from '../../model/datasource.model';
import {AppValidators} from '../../model/AppValidators'
import {Localstorage} from '../../services/storageService'
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
   address:FormGroup;
   main_page: { component: any };
   states: KeyValueData[]=[]
   cites: KeyValueData[]=[];
   private userId :string;
   private errorMsg :string="Auth error";
   private isError :boolean =false;
   loading:any;
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtr: AlertController,
              public serviceHelper :ServiceHelper,
              private storage : Localstorage,
              public loadingCtrl: LoadingController
              ) 
  {
    this.main_page = { component: TabsNavigationPage };
    this.loading = this.loadingCtrl.create();
    this.address = new FormGroup({
      companyName: new FormControl('',[Validators.required,Validators.maxLength(30)]),
      address1: new FormControl('', [Validators.required,Validators.maxLength(30)]),
      address2: new FormControl('', [Validators.maxLength(30)]),
      pincode: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
      state: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
    });
     this.storage.GetValues(StoreKey.UserId)
      .then((value) => this.userId=value)
      .catch(() => {this.errorMsg = "User not found!",this.isError=true});
      
       this.storage.GetValues(StoreKey.AuthKey)
      .then((value) =>AppCommon.HoldAuthKey =value)
      .catch(() => {this.errorMsg = "User not found!",this.isError=true});
  }
  ionViewWillEnter()
  {
    setTimeout(()=>{this.GetStates(1);},1000);
  }
  private GetStates(id:number)
  {
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
     }else
     {
       this.ShowAlert("Error",response.Message);
     }
      
  }
  public OnCitySuccess(response:Status)
  {
    if(response.Status){
        this.cites = response.Value.Data.map(item => new MasterDataSource(item));
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
  doSignUp(){
    if(this.isError){
      this.ShowAlert("Error",this.errorMsg);
      return false;
    }
    this.loading.present();
    let userAddress = new UserAddress();
    userAddress.CompanyName=this.address.value.companyName;
    userAddress.AddressLine1 = this.address.value.address1;
    userAddress.AddressLine2=  this.address.value.address2;
    userAddress.StateId = this.address.value.state;
    userAddress.CityId = this.address.value.city;
    userAddress.Pincode = this.address.value.pincode;
    userAddress.UserId=this.userId;
    console.log(this.address.value);
    this.serviceHelper.UserDetails(userAddress)
    .then( response => this.onDetailsSuccess(response) ,
        error => this.OnError(error));
  }
  onDetailsSuccess(response:Status)
  {
    this.loading.dismiss();
     if(response.Status){
        this.navCtrl.setRoot(this.main_page.component);
     }else
     {
       this.ShowAlert("Error",response.Message);
     }
    setTimeout(()=>{this.loading = this.loadingCtrl.create();},1000);
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

  ///Validation Start
  $validateName=false;
  $validateAddress1=false;
  $validateAddress2=false;
  $validatePincode=false;
  
  public onCompanyNameBlur()
  {
    if(AppValidators.MaxLength(this.address.controls.companyName))
       this.$validateName=true;
    else
        this.$validateName=false;
  }
  public onAddress1Blur(){
    if(AppValidators.MaxLength(this.address.controls.address1))
       this.$validateAddress1=true;
    else
        this.$validateAddress1=false;
  }
  public onAddress2Blur(){
    if(AppValidators.MaxLength(this.address.controls.address2))
       this.$validateAddress2=true;
    else
        this.$validateAddress2=false;
  }
  public onPincodeBlur(){
    if(AppValidators.Pincode(this.address.controls.pincode))
       this.$validatePincode=true;
    else
        this.$validatePincode=false;
  }
  ///Validation end

}
