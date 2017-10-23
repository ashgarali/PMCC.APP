import { Component } from '@angular/core';
import {NavController, SegmentButton, AlertController ,ToastController,LoadingController,NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ResponedPage} from '../Responed/responed';
import {EnquiriesPage} from '../Enquiries/Enquiries';
import {KeyValueData,DataSourceList} from '../../model/datasource.model';
import {DataSourceMasters,DataSourceGroup} from '../../model/appenums';
import { counterRangeValidator } from '../../components/counter-input/counter-input';
import {ServiceHelper} from '../../services/serviceHelper';
import {Status} from '../../model/status.model';
import {AppCommon} from '../../model/appcommon';
import {JobType} from '../../model/appenums';
import {JobCreateRequest,ScreenPrinting,JobGetRequest ,JobUpdateRequest} from '../../model/JobRequest';
import {DTPModel} from './Dtp.model';
import {Msg,MsgType} from '../../app.config'
@Component({
  selector: 'Dtp-Page',
  templateUrl: 'Dtp.html'
})
export class DtpPage {

    dtpForm: FormGroup;
    isEditMode=false;
    isEditDesiable=false;
    editId="";
    common = new AppCommon();
    loading: any;
    currentJob:DTPModel;
    currentDate:string;
    responedPage : { component: any };
    enquiriesPage:{component:any}
    jobTypeList: DataSourceList[]=[];
    jobLanguageList: DataSourceList[]=[];
    jobWorkList:DataSourceList[]=[];
    umoList:DataSourceList[]=[];
    paymentModeList: DataSourceList[]=[];
    outputList:DataSourceList[]=[];
    deliveryList:DataSourceList[]=[];
    
    connctionErrorCount:number=0;
   constructor(
   public nav: NavController,
   public alertCtrl: AlertController,
   public serviceHelper:ServiceHelper,
   public toastCtrl: ToastController,
   public loadingCtrl: LoadingController,
   public navParams :NavParams 
  ) {
   
    this.responedPage = { component:ResponedPage };
    this.enquiriesPage ={component:EnquiriesPage};
    this.loading = this.loadingCtrl.create();
    let id = this.navParams.get('id');
    this.currentDate = (new Date()).toISOString();
    if(typeof id!='undefined' && id)
    {
      this.isEditMode=true;
      this.editId = id;
      let isDisable = this.navParams.get('isDisable');
      if(typeof isDisable!='undefined' && isDisable)
        this.isEditDesiable=true;
    }else{
      this.isEditMode=false;
    }
    this.CreateForm();
}

public CreateForm()
  {
    this.dtpForm = new FormGroup({
      jobType: new FormControl('',Validators.required),
      jobLanguage : new FormControl('',Validators.required),
      jobWork:new FormControl('',Validators.required),
      jobDim1:new FormControl('',Validators.required),
      jobDim2:new FormControl('',Validators.required),
      jobUom: new FormControl('', Validators.required),
      noOfDesign: new FormControl('',Validators.required),
      noOfPage: new FormControl('',Validators.required),
      outputReq: new FormControl('',Validators.required),
      expDelivery: new FormControl('', Validators.required),
      payMode: new FormControl('', Validators.required),
      expCost: new FormControl('', Validators.required),

      
      deliveryAt:new FormControl(),
      details:new FormControl()
    });
  }
   ionViewWillEnter()
  {
     this.loading.present();
    this.GetDataSource(DataSourceMasters.DTPJobType);
    this.GetDataSource(DataSourceMasters.DTPJobLang);
    this.GetDataSource(DataSourceMasters.DTPJobWork);
    this.GetDataSource(DataSourceMasters.DTPOutput);
    this.GetDataSource(DataSourceMasters.DeliveryAt);
    this.GetDataSource(DataSourceMasters.PaymentMode);
    this.GetDataSource(DataSourceMasters.UMO);
    if(this.isEditMode)
      this.LoadCurrentJob(this.editId);
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
          case DataSourceMasters.DTPJobType.toString():
            this.jobTypeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.DTPJobLang.toString():
            this.jobLanguageList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.DTPJobWork.toString():
            this.jobWorkList= AppCommon.CreateDataSource(response);
            break;
           case DataSourceMasters.DTPOutput.toString():
            this.outputList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.UMO.toString():
            this.umoList= AppCommon.CreateDataSource(response);
            this.loading.dismiss();
            break;
          case DataSourceMasters.PaymentMode.toString():
            this.paymentModeList= AppCommon.CreateDataSource(response);
            break;
           case DataSourceMasters.DeliveryAt.toString():
            this.deliveryList= AppCommon.CreateDataSource(response);
            break;
      }
     }else
     {
       this.ShowAlert(MsgType.ErrorType,response.Message);
     }
      
  }
 public LoadCurrentJob(id:string)
  {
    this.loading.present();
    let job= new JobGetRequest();
    job.JobType=JobType.DTP;
    job.Id=id;
    this.serviceHelper.GetJob(job)
    .then( response => this.onJobSuccess(response) ,
        error => this.OnError(error));
  }
public onJobSuccess(response:Status)
  {
      if(response.Status)
      {
        let job=response.Value.Data;
        setTimeout(()=>{this.onJobWorkChange(job.JobType);},500);
        setTimeout(()=>{this.SetFormValues(job);},500);
      }
      this.loading.dismiss();
      this.loading = this.loadingCtrl.create();
  }
  SetFormValues(job:DTPModel)
  {
     this.currentJob=job;
      this.dtpForm.patchValue({  //patchValue//setValue
        jobType:job.JobType,
        jobLanguage: job.JobLungage,
        jobWork:job.JobWork,
        jobDim1:job.JobSizeDimension1,
        jobDim2 :job.JobSizeDimension2,
        jobUom:job.UOM,
        noOfDesign:job.NumbersOfDesigns,
        noOfPage:job.NumbersOfPages,
        outputReq:job.OutputRequired,
        expDelivery:AppCommon.ParseJsonDate(job.ExpectedDeliverDate),
        payMode:job.PaymentMode,
        expCost:job.ExpectedCost,
        deliveryAt:job.DeliveryAt,
        details:job.specialInstructions
      });
      if(this.isEditDesiable)
        this.dtpForm.disable();
  }
public onJobWorkChange(event:any)
 {
    let item = AppCommon.GetElementFromArray(this.jobWorkList,event);
    if(parseInt(item.Value) ==1)
    {
      this.dtpForm.controls.noOfDesign.enable({onlySelf: true});
      this.dtpForm.controls.noOfPage.enable({onlySelf: true});
    }else if(parseInt(item.Value) ==2)
    {
       this.dtpForm.controls.noOfDesign.enable({onlySelf: true});
       this.dtpForm.controls.noOfPage.disable({onlySelf: true});
    }else if(parseInt(item.Value) ==3)
    {
       this.dtpForm.controls.noOfDesign.disable({onlySelf: true});
       this.dtpForm.controls.noOfPage.enable({onlySelf: true});
    }
 }
public onDTPSave()
{
   this.loading.present();
    if(!this.isEditMode){
      let jobRequest= this.CreateReqest(this.dtpForm.value);
      this.serviceHelper.CreateJob(jobRequest)
        .then( response => this.onSaveSuccess(response) ,
            error => this.OnError(error));
    }else
    {
       let jobRequest= this.UpdateRequest(this.dtpForm.value);
      this.serviceHelper.UpdateJob(jobRequest)
        .then( response => this.onSaveSuccess(response) ,
            error => this.OnError(error));
    }
} 
public onSaveSuccess(response:Status)
 {
     this.loading.dismiss();
     if(response.Status)
       {
         this.ShowToast(Msg.SaveSuccess);
       }
       else{
       this.ShowAlert(MsgType.ErrorType,response.Message);
     }
     this.loading = this.loadingCtrl.create();
 } 
private CreateReqest(formValues:any):JobCreateRequest
 {
    let jobRequest = new JobCreateRequest();
    jobRequest.JobType= JobType.DTP;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
 }
  private UpdateRequest(formValues:any):JobUpdateRequest
  {
    let jobRequest = new JobUpdateRequest();
    jobRequest.JobType= JobType.DTP;
    jobRequest.Id=this.editId;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
  }
  private SetProperties(formValues:any):DTPModel
  {
    let screenObj = new DTPModel();
    screenObj.JobType= formValues.jobType;
    screenObj.JobLungage =formValues.jobLanguage;
    screenObj.JobWork =formValues.jobWork;
    screenObj.JobSizeDimension1 = formValues.jobDim1;
    screenObj.JobSizeDimension2 = formValues.jobDim2;
    screenObj.UOM = formValues.jobUom;
    screenObj.NumbersOfDesigns = formValues.noOfDesign;
    screenObj.NumbersOfPages = formValues.noOfPage;
    screenObj.OutputRequired = formValues.outputReq;
    screenObj.ExpectedDeliverDate = formValues.expDelivery;
    screenObj.PaymentMode = formValues.payMode;
    screenObj.ExpectedCost = formValues.expCost;
    screenObj.DeliveryAt =formValues.deliveryAt;
    screenObj.specialInstructions=formValues.details;
    return screenObj;
  }
  onRespondClick()
  {
    let responed = AppCommon.CreateResponedData(
      this.currentJob.Id,
      this.currentJob.DocName,
      JobType.DTP,//this.currentJob.JobType,
      this.currentJob.ExpectedCost,
      this.currentJob.ExpectedDeliverDate,
      this.currentJob.DeliveryAt,
      this.currentJob.PaymentMode
    );
    this.nav.push(this.responedPage.component,{"currentJob":responed});
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
  ShowToast(msg:string) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
     this.nav.setRoot(this.enquiriesPage.component);
     //this.nav.getro.setRoot(this.main_page.component);
  });
  toast.present();
}
}