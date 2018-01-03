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
import {JobType,ActionType} from '../../model/appenums';
import {JobCreateRequest,ScreenPrinting,JobGetRequest ,JobUpdateRequest,JobActionRequest} from '../../model/JobRequest';
import {FlexModel} from './Flex.model';
import {Msg,MsgType} from '../../app.config'
@Component({
  selector: 'Flex-Page',
  templateUrl: 'Flex.html'
})
export class FlexPage {

    flexForm: FormGroup;
    isEditMode=false;
    isEditDesiable=false;
    editId="";
    clearBtnText:string="Clear";
    common = new AppCommon();
    loading: any;
    currentJob:FlexModel;
    currentDate:string;
    responedPage : { component: any };
    enquiriesPage:{component:any}
    jobTypeList :DataSourceList[]=[];
    noOfDesignList: DataSourceList[]=[];
    jobQualityList:DataSourceList[]=[];
    umoList:DataSourceList[]=[];
    mountingList:DataSourceList[]=[];
    paymentModeList: DataSourceList[]=[];
    deliveryList:DataSourceList[]=[];

    errorInDim:boolean=false;
    connctionErrorCount:number=0;
    noOfDesigns: number[]=[1];
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
      this.clearBtnText="Close";
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
    this.flexForm = new FormGroup({
      noOfFlex: new FormControl('',Validators.required),
      noOfDesign : new FormControl('',Validators.required),
      jobDim11:new FormControl(''),
      jobDim12:new FormControl(''),
      jobUom13: new FormControl(''),
      jobDim21:new FormControl(''),
      jobDim22:new FormControl(''),
      jobUom23: new FormControl(''),
      jobDim31:new FormControl(''),
      jobDim32:new FormControl(''),
      jobUom33: new FormControl(''),
      jobDim41:new FormControl(''),
      jobDim42:new FormControl(''),
      jobUom43: new FormControl(''),
      jobDim51:new FormControl(''),
      jobDim52:new FormControl(''),
      jobUom53: new FormControl(''),
      jobQuality : new FormControl('',Validators.required),
     // mountingReq : new FormControl('',Validators.required),
      
      expDelivery: new FormControl('', Validators.required),
      payMode: new FormControl('', Validators.required),
      expCost: new FormControl('', Validators.required),

     // installationReq:new FormControl(false),
      dtpReq:new FormControl(false),
      deliveryAt:new FormControl(),
      details:new FormControl()
    });
  }
   ionViewWillEnter()
  {
     this.loading.present();
     this.GetDataSource(DataSourceMasters.FlexJobType)
    this.GetDataSource(DataSourceMasters.FlexNoofDesign);
    this.GetDataSource(DataSourceMasters.FlexJobQuality);
    this.GetDataSource(DataSourceMasters.FlexMountingRequired);
    this.GetDataSource(DataSourceMasters.DeliveryAt);
    this.GetDataSource(DataSourceMasters.PaymentMode);
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
        case DataSourceMasters.FlexJobType.toString():
            this.jobTypeList= AppCommon.CreateDataSource(response);
            break;
        case DataSourceMasters.FlexNoofDesign.toString():
            this.noOfDesignList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.FlexJobQuality.toString():
          case DataSourceMasters.VinylJobQuality.toString():
            this.jobQualityList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.FlexMountingRequired.toString():
            this.mountingList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.PaymentMode.toString():
            this.paymentModeList= AppCommon.CreateDataSource(response);
            this.HideLoad();
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
    job.JobType=JobType.FlexPrinting;
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
        setTimeout(()=>{this.onJobTypeChange(job.NumberOfFlex);},500);
        setTimeout(()=>{this.onDesignChange(job.NumberOfDesigns);},700);
        setTimeout(()=>{this.SetFormValues(job);},900);
      }
     setTimeout(()=>{this.HideLoad();},1000);
  }
  HideLoad()
  {
      this.loading.dismiss();
      this.loading = this.loadingCtrl.create();
  }
  SetFormValues(job:FlexModel)
  {
     this.currentJob=job;
      this.flexForm.patchValue({  //patchValue//setValue
        noOfFlex:job.NumberOfFlex,
        noOfDesign: job.NumberOfDesigns,
        jobDim11:job.JobDim11==0?'':job.JobDim11,
        jobDim12:job.JobDim12==0?'':job.JobDim12,
        jobUom13: job.JobDim13==0?'':job.JobDim11,
        jobDim21:job.JobDim21==0?'':job.JobDim13,
        jobDim22:job.JobDim22==0?'':job.JobDim22,
        jobUom23: job.JobDim23==0?'':job.JobDim23,
        jobDim31:job.JobDim31==0?'':job.JobDim31,
        jobDim32:job.JobDim32==0?'':job.JobDim32,
        jobUom33: job.JobDim33==0?'':job.JobDim33,
        jobDim41:job.JobDim41==0?'':job.JobDim41,
        jobDim42:job.JobDim42==0?'':job.JobDim42,
        jobUom43: job.JobDim43==0?'':job.JobDim43,
        jobDim51:job.JobDim51==0?'':job.JobDim51,
        jobDim52:job.JobDim52==0?'':job.JobDim52,
        jobUom53: job.JobDim53==0?'':job.JobDim53,
        jobQuality:job.JobQuality,
        //mountingReq:job.MountingRequired,
       // installationReq:job.InstallationRequired,
        dtpReq:job.DTPRequired,
        expDelivery:AppCommon.ParseJsonDate(job.ExpectedDeliverDate),
        payMode:job.PaymentMode,
        expCost:job.ExpectedCost,
        deliveryAt:job.DeliveryAt,
        details:job.specialInstructions
      });
      if(this.isEditDesiable)
        this.flexForm.disable();
  }
  public ClearForm()
  {
    if( this.isEditMode)
      {
          this.CheckDoument();
      }else{
        this.CreateForm();
      }
    
  }
public CloseDocument()
  {
    this.loading.present();
    let jobRequest = new JobActionRequest();
    jobRequest.JobType= JobType.FlexPrinting;
    jobRequest.Id=this.editId;
    jobRequest.Data="";
    jobRequest.ActionType= ActionType.CloseDocument;
    this.serviceHelper.PerformAction(jobRequest)
        .then( response => this.onCloseSuccess(response) ,
            error => this.OnError(error));
  }
  public onCloseSuccess(response:Status)
  {
     this.loading.dismiss();
     if(response.Status)
       {
         this.ShowToast(Msg.CloseDocument);
       }
       else{
       this.ShowAlert(MsgType.ErrorType,response.Message);
     }
     this.loading = this.loadingCtrl.create();
  }
  public CheckDoument()
  {
      let alert = this.alertCtrl.create({
    title: 'Confirm',
    message: 'Do you want to close this job?',
    buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.CloseDocument();
        }
      },
      {
        text: 'No',
         handler: () => {
          console.log("NO");
        }
      }
    ]
  });
  alert.present();
  }
public onDesignChange(event:any)
 {
    let item = AppCommon.GetElementFromArray(this.noOfDesignList,event);
   this.SetNoOfDesigns(parseInt(item.Value));

 }
  public   onJobTypeChange(event:any)
  {
    let item = AppCommon.GetElementFromArray(this.jobTypeList,event);
    if(parseInt(item.Value) == 1)
      this.GetDataSource(DataSourceMasters.FlexJobQuality);
    else
      this.GetDataSource(DataSourceMasters.VinylJobQuality)
     
  }
 public SetNoOfDesigns(count:number)
 {
     this.noOfDesigns= [];
    for(var i=1 ;i<=count;i++ ){
        this.noOfDesigns.push(i);
      }
 }
public onFlexSave()
{
  
    if(!this.isEditMode){
      let jobRequest= this.CreateReqest(this.flexForm.value);
       if(this.errorInDim){
        this.ShowAlert(MsgType.InfoType,Msg.FlexDimError);
      return false;
     }
     this.loading.present();
      this.serviceHelper.CreateJob(jobRequest)
        .then( response => this.onSaveSuccess(response) ,
            error => this.OnError(error));
    }else
    {
       let jobRequest= this.UpdateRequest(this.flexForm.value);
       if(this.errorInDim){
        this.ShowAlert(MsgType.InfoType,Msg.FlexDimError);
      return false;
     }
     this.loading.present();
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
    jobRequest.JobType= JobType.FlexPrinting;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
 }
  private UpdateRequest(formValues:any):JobUpdateRequest
  {
    let jobRequest = new JobUpdateRequest();
    jobRequest.JobType= JobType.FlexPrinting;
    jobRequest.Id=this.editId;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
  }
  private SetProperties(formValues:any):FlexModel
  {
    let screenObj = new FlexModel();
    this.errorInDim=false;
    screenObj.NumberOfFlex= formValues.noOfFlex;
    screenObj.NumberOfDesigns =formValues.noOfDesign;
    if(screenObj.NumberOfDesigns>=1)
    {
        screenObj.JobDim11=formValues.jobDim11;
        screenObj.JobDim12=formValues.jobDim12;
        screenObj.JobDim13=formValues.jobUom13;
        if(formValues.jobDim11==""||formValues.jobDim12==""||formValues.jobUom13=="")
          this.errorInDim=true;

    }
    if(screenObj.NumberOfDesigns>=2)
    {
        screenObj.JobDim21=formValues.jobDim21;
        screenObj.JobDim22=formValues.jobDim22;
        screenObj.JobDim23=formValues.jobUom23;
        if(formValues.jobDim21==""||formValues.jobDim22==""||formValues.jobUom23=="")
          this.errorInDim=true;
    }
    if(screenObj.NumberOfDesigns>=3)
    {
        screenObj.JobDim31=formValues.jobDim31;
        screenObj.JobDim32=formValues.jobDim32;
        screenObj.JobDim33=formValues.jobUom33;
         if(formValues.jobDim31==""||formValues.jobDim32==""||formValues.jobUom33=="")
          this.errorInDim=true;
    }
    if(screenObj.NumberOfDesigns>=4)
    {
        screenObj.JobDim41=formValues.jobDim41;
        screenObj.JobDim42=formValues.jobDim42;
        screenObj.JobDim43=formValues.jobUom43;
        if(formValues.jobDim41==""||formValues.jobDim42==""||formValues.jobUom43=="")
          this.errorInDim=true;
    }
    if(screenObj.NumberOfDesigns>=5)
    {
        screenObj.JobDim51=formValues.jobDim51;
        screenObj.JobDim52=formValues.jobDim52;
        screenObj.JobDim53=formValues.jobUom53;
        if(formValues.jobDim51==""||formValues.jobDim52==""||formValues.jobUom53=="")
          this.errorInDim=true;
    }
    screenObj.JobQuality =formValues.jobQuality;
    screenObj.MountingRequired = formValues.mountingReq;
    screenObj.InstallationRequired = formValues.installationReq;
    screenObj.DTPRequired = formValues.dtpReq;
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
      JobType.FlexPrinting,//this.currentJob.JobType,
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
    position: 'middle'
  });
  toast.onDidDismiss(() => {
     this.nav.setRoot(this.enquiriesPage.component);
     //this.nav.getro.setRoot(this.main_page.component);
  });
  toast.present();
}
}