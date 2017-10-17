
import { Component } from '@angular/core';
import { NavController, SegmentButton, AlertController ,LoadingController,NavParams,ToastController} from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { counterRangeValidator } from '../../components/counter-input/counter-input';
import {ServiceHelper} from '../../services/serviceHelper';
import {DataSourceMasters,JobType} from '../../model/appenums';
import {Status,ResponedJob} from '../../model/status.model';
import {AppCommon} from '../../model/appcommon';
import {KeyValueData,DataSourceList} from '../../model/datasource.model';
import {ResponseRequiest} from './responed.module'
import {JobCreateRequest} from '../../model/JobRequest';
@Component({
  selector: 'Responed-Page',
  templateUrl: 'Responed.html'
})
export class ResponedPage {
    responed_form: FormGroup;
    notificationPage : { component: any };
    loading: any;
    paymentModeList: DataSourceList[]=[];
    deliveryList:DataSourceList[]=[];
    paymentModeListNew: DataSourceList[]=[];
    deliveryListNew:DataSourceList[]=[];
    currentJob:ResponedJob;
constructor(public nav: NavController, 
  public alertCtrl: AlertController,
  public serviceHelper:ServiceHelper,
  public loadingCtrl: LoadingController,
  public navParams :NavParams ,
  public toastCtrl: ToastController,
) {
    this.loading=loadingCtrl.create();
    this.notificationPage={ component: TabsNavigationPage };
    this.currentJob = this.navParams.get('currentJob');
    this.CreateForm();
    
}
 CreateForm()
 {
     this.responed_form = new FormGroup({
      expectedDate_option:new FormControl(true, Validators.required),
      expected_date: new FormControl(AppCommon.ParseJsonDate(this.currentJob.ExpectedData)),
      your_date: new FormControl(''),

      expectedLocation_option:new FormControl(true, Validators.required),
      expected_location: new FormControl('', Validators.required),
      your_location: new FormControl('', Validators.required),

      paymentMode_option:new FormControl(true, Validators.required),
      payment_mode: new FormControl('', Validators.required),
      your_paymentMode: new FormControl('', Validators.required),
      
      paymentCost_option:new FormControl(true, Validators.required),
      given_cost: new FormControl(this.currentJob.ExpectedCost, Validators.required),
      your_cost: new FormControl('', Validators.required),
      your_opinion:new FormControl('', Validators.required),

    });
 }
ionViewWillEnter()
  {
    //this.GetDataSource(DataSourceMasters.PaymentModeId);
    //this.GetDataSource(DataSourceMasters.DeliveryAtId);
  }
  private GetDataSource(id:number)
  {
    this.serviceHelper.DataSourceValues(id)
    .then( response => this.OnDataSourceSuccess(response) ,
        error => this.OnError(error));
  }
  public OnDataSourceSuccess(response:Status)
  {
    if(response.Status){
      switch(response.SourceId.toString())
      {
          // case DataSourceMasters.PaymentModeId.toString():
          //   this.paymentModeList= AppCommon.CreateDataSource(response);
          //   this.paymentModeListNew= AppCommon.CreateDataSource(response);
          //   break;
          //  case DataSourceMasters.DeliveryAtId.toString():
          //   this.deliveryList= AppCommon.CreateDataSource(response);
          //   this.deliveryListNew= AppCommon.CreateDataSource(response);
          //   setTimeout(()=>{this.SetFormValues(this.currentJob);},500);
          //   break;
      }
     }else
     {
       this.ShowAlert("Error",response.Message);
     }
      
  }
  SetFormValues(job:ResponedJob)
  {
      this.responed_form.patchValue({  //patchValue//setValue
        expected_location: job.ExpectedLoc,
        payment_mode:job.ExpectedPayment,
      });
  }
  public OnError(error:any)
  {
    this.loading.dismiss();
    this.ShowAlert("Error",error);
  }
  ShowAlert(title:string,msg:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
 sendResponed(){
   this.loading.present();
   let jobRequest =  this.SetResponedValues(this.responed_form.value);
   this.serviceHelper.CreateJob(jobRequest)
   .then( response => this.onSaveSuccess(response) ,
    error => this.OnError(error));
   
  }
public onSaveSuccess(response:Status)
 {
     this.loading.dismiss();
     if(response.Status)
       {
         this.ShowToast("Save successfull!");
       }
       else{
       this.ShowAlert("Error",response.Message);
     }
 }
  ShowToast(msg:string) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
    this.nav.setRoot(this.notificationPage.component);
  });
  toast.present();
}
  private SetResponedValues(responedValues:any):JobCreateRequest
  {
    

    let request = new ResponseRequiest();
    if(!responedValues.expectedDate_option)
      request.ReceivedDate=responedValues.your_date;
    else
      request.ReceivedDate =responedValues.expected_date;

    if(!responedValues.expectedLocation_option)
      request.ReceivedLoc = responedValues.your_location;
    else
       request.ReceivedLoc = responedValues.expected_location;

    if(!responedValues.paymentMode_option)
      request.ReceivedPaymentMode = responedValues.your_paymentMode;
    else
       request.ReceivedPaymentMode = responedValues.payment_mode;

    if(!responedValues.paymentCost_option)
      request.ReceivedCost = responedValues.your_cost;
    else
       request.ReceivedCost = responedValues.given_cost;

    request.Description= responedValues.your_opinion;
     //request.NotificationId= this.currentJob.JobId;
     request.JobType= this.currentJob.JobType;
     request.JobTypeId=this.currentJob.JobId;

    let jobRequest = new JobCreateRequest();
    jobRequest.JobType= JobType.Response;
    jobRequest.Data=request;
    return jobRequest;

  }  
}