
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
import {Msg,MsgType} from '../../app.config'
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
    currentDate:string;
    connctionErrorCount:number=0;
    
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
    this.currentDate = (new Date()).toISOString();
    this.CreateForm();
    
}
 CreateForm()
 {

     this.responed_form = new FormGroup({
      expectedDate_option:new FormControl(true, Validators.required),
      expected_date: new FormControl({value:AppCommon.ParseJsonDate(this.currentJob.ExpectedData),disabled: true}),
      your_date: new FormControl({value:''}),

      expectedLocation_option:new FormControl(true, Validators.required),
      expected_location: new FormControl({value:'',disabled: true}, Validators.required),
      your_location: new FormControl({value:''}),

      paymentMode_option:new FormControl(true, Validators.required),
      payment_mode: new FormControl({value:'',disabled: true}, Validators.required),
      your_paymentMode: new FormControl({value:''}),
      
      paymentCost_option:new FormControl(true, Validators.required),
      given_cost: new FormControl({value:this.currentJob.ExpectedCost,disabled: true}, Validators.required),
      your_cost: new FormControl({value:''}),

      your_opinion:new FormControl(''),

    });
 }
 
ionViewWillEnter()
  {
    this.GetDataSource(DataSourceMasters.PaymentMode);
    this.GetDataSource(DataSourceMasters.DeliveryAt);
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
          case DataSourceMasters.PaymentMode.toString():
            this.paymentModeList= AppCommon.CreateDataSource(response);
            this.paymentModeListNew= AppCommon.CreateDataSource(response);
            break;
           case DataSourceMasters.DeliveryAt.toString():
            this.deliveryList= AppCommon.CreateDataSource(response);
            this.deliveryListNew= AppCommon.CreateDataSource(response);
            setTimeout(()=>{this.SetFormValues(this.currentJob);},500);
            break;
      }
     }else
     {
       this.ShowAlert("Error",response.Message);
     }
      
  }
  SetFormValues(job:ResponedJob)
  {
      job.ExpectedLoc =job.ExpectedLoc==null? 2 :job.ExpectedLoc;
      this.responed_form.patchValue({  //patchValue//setValue
        expected_location: job.ExpectedLoc,
        payment_mode:job.ExpectedPayment,
      });
  }
  public OnError(error:any)
  {
      this.loading.dismiss();
    if(this.connctionErrorCount==0)
      this.ShowAlert(MsgType.ErrorType,error.message);
    if(error.status==0)
      this.connctionErrorCount++;
    this.loading = this.loadingCtrl.create();
  
  }
  ShowAlert(title:string,msg:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
     buttons: [{
        text: 'OK',
        handler: () => {
          this.connctionErrorCount=0;
        }
      }]
    });
    alert.present();
  }
 sendResponed(){
   this.loading.present();
   let jobRequest =  this.SetResponedValues(this.responed_form.controls);
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
    duration: AppCommon.ToastDuration,
    position: AppCommon.ToastPosition
  });
  toast.onDidDismiss(() => {
    this.nav.setRoot(this.notificationPage.component);
  });
  toast.present();
}
public onExpactedDateChange()
{
      this.responed_form.patchValue({  //patchValue//setValue
                your_date:''
              });
}
public onLocationChange()
{
      this.responed_form.patchValue({  //patchValue//setValue
                your_location:''
              });
}
public onPaymentChange()
{
      this.responed_form.patchValue({  //patchValue//setValue
                your_paymentMode:''
              });
}
public onCostChange()
{
      this.responed_form.patchValue({  //patchValue//setValue
                your_cost:''
              });
}
  private SetResponedValues(responedValues:any):JobCreateRequest
  {
    let request = new ResponseRequiest();
    if(!responedValues.expectedDate_option.value)
      request.ReceivedDate=responedValues.your_date.value;
    else
      request.ReceivedDate =responedValues.expected_date.value;

    if(!responedValues.expectedLocation_option.value)
      request.ReceivedLoc = responedValues.your_location.value;
    else
       request.ReceivedLoc = responedValues.expected_location.value;

    if(!responedValues.paymentMode_option.value)
      request.ReceivedPaymentMode = responedValues.your_paymentMode.value;
    else
       request.ReceivedPaymentMode = responedValues.payment_mode.value;

    if(!responedValues.paymentCost_option.value)
      request.ReceivedCost = responedValues.your_cost.value;
    else
       request.ReceivedCost = responedValues.given_cost.value;

    request.Description= responedValues.your_opinion.value;
     //request.NotificationId= this.currentJob.JobId;
     request.JobType= this.currentJob.JobType;
     request.JobTypeId=this.currentJob.JobId;

    let jobRequest = new JobCreateRequest();
    jobRequest.JobType= JobType.Response;
    jobRequest.Data=request;
    return jobRequest;

  }  
}