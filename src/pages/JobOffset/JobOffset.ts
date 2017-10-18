
import { Component } from '@angular/core';
import {NavController, SegmentButton, AlertController ,ToastController,LoadingController,NavParams} from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {EnquiriesPage} from '../Enquiries/Enquiries';
import {ResponedPage} from '../Responed/responed';
import {KeyValueData,DataSourceList} from '../../model/datasource.model';
import {DataSourceMasters,DataSourceGroup} from '../../model/appenums';
import { counterRangeValidator } from '../../components/counter-input/counter-input';
import {ServiceHelper} from '../../services/serviceHelper';
import {Status} from '../../model/status.model';
import {AppCommon} from '../../model/appcommon';
import {JobType} from '../../model/appenums';
import {JobOffSetModel} from './JobOffset.model';
import {JobCreateRequest,OffSetPrinting ,JobGetRequest,JobUpdateRequest} from '../../model/JobRequest';
import {Msg,MsgType} from '../../app.config'
@Component({
  selector: 'joboffset-Page',
  templateUrl: 'JobOffset.html'
})
export class JobOffsetPage {
    jobOffsetForm: FormGroup;
    enquiriesPage : { component: any };
    responedPage : { component: any };
    jobTypeList: DataSourceList[]=[];
    noofPlatesList:DataSourceList[]=[];
    colorsList: DataSourceList[]=[];
    jobSizeList:DataSourceList[]=[];
    paymentModeList: DataSourceList[]=[];
    outputList:DataSourceList[]=[];
    deliveryList:DataSourceList[]=[];

    currentJob:JobOffSetModel;
    currentDate:string;
    isEditMode:boolean=false;
    editId="";
    isEditDesiable:boolean=false;
    isPlatesUsed:boolean=false;
    noOfPlates: number[];
    common = new AppCommon();
    loading: any;
    connctionErrorCount:number=0;
    errorInPlatesCount:boolean=false;
constructor(
   public nav: NavController,
   public alertCtrl: AlertController,
   public serviceHelper:ServiceHelper,
   public toastCtrl: ToastController,
   public loadingCtrl: LoadingController,
   public navParams :NavParams
  ) {
    this.enquiriesPage = { component:EnquiriesPage };
    this.responedPage = { component:ResponedPage };
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
    this.jobOffsetForm = new FormGroup({
      jobType: new FormControl('',Validators.required),
      jobQuantity : new FormControl('',Validators.required),
      jobGSM:new FormControl('',Validators.required),
      jobSize:new FormControl('',Validators.required),
      noofPlates:new FormControl('1',Validators.required),
      plate1color:new FormControl(''),
      plate2color:new FormControl(''),
      plate3color:new FormControl(''),
      plate4color:new FormControl(''),
      expDelivery: new FormControl('', Validators.required),
      payMode: new FormControl('', Validators.required),
      expCost: new FormControl('', Validators.required),

      outputReq: new FormControl(''),
      deliveryAt:new FormControl(''),
      details:new FormControl('')
    });
  }
  ionViewWillEnter()
  {
    this.GetDataSource(DataSourceMasters.OFSJobType);
    this.GetDataSource(DataSourceMasters.OFSJobSize);
    this.GetDataSource(DataSourceMasters.PaymentMode);
    this.GetDataSource(DataSourceMasters.SPOutPutProvide);
    this.GetDataSource(DataSourceMasters.DeliveryAt);
    if(this.isEditMode)
      this.LoadCurrentJob(this.editId);
     
  }
  public LoadCurrentJob(id:string)
  {
    this.loading.present();
    let job= new JobGetRequest();
    job.JobType=JobType.OffsetPrinting;
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
        setTimeout(()=>{this.onJobTypeChange(job.JobType);},500);
        setTimeout(()=>{this.SetFormValues(job);},500);
      }
      this.loading.dismiss();
      this.loading = this.loadingCtrl.create();
  }
  SetFormValues(job:JobOffSetModel)
  {
     this.currentJob=job;
     if(job.JobType==1){
       setTimeout(()=>{this.onPlatesChange(job.NoOfPlates);},100);
        this.jobOffsetForm.patchValue({  //patchValue//setValue
        jobType:job.JobType,
        jobQuantity : job.JobQty,
        jobGSM:job.GSM,
        jobSize:job.JobSize,
        noofPlates:job.NoOfPlates,
        plate1color:job.Plate1Color,
        plate2color:job.Plate2Color,
        plate3color:job.Plate3Color,
        plate4color:job.Plate4Color,
        expDelivery: AppCommon.ParseJsonDate(job.ExpectedDeliverDate),
        payMode: job.PaymentMode,
        expCost: job.ExpectedCost,
        outputReq: job.OutputReq,
        deliveryAt:job.DeliveryAt,
        details:job.specialInstructions
        });
     }else
      {
        this.jobOffsetForm.patchValue({  //patchValue//setValue
        jobType:job.JobType,
        jobQuantity : job.JobQty,
        jobGSM:job.GSM,
        jobSize:job.JobSize,
        expDelivery: AppCommon.ParseJsonDate(job.ExpectedDeliverDate),
        payMode: job.PaymentMode,
        expCost: job.ExpectedCost,
        outputReq: job.OutputReq,
        deliveryAt:job.DeliveryAt,
        details:job.specialInstructions
        });
      }
      if(this.isEditDesiable)
        this.jobOffsetForm.disable();
  }
  private GetDataSource(id:number)
  {
    this.serviceHelper.DataSourceValues(id)
    .then( response => this.OnDataSourceSuccess(response) ,
        error => this.OnError(error));
  }
  private GetDataSourceChild(id:number,group:number)
  {
    this.serviceHelper.DataSourceValues(id,group)
    .then( response => this.OnDataSourceChildSuccess(response) ,
        error => this.OnError(error));
  }
  public OnDataSourceSuccess(response:Status)
  {
    if(response.Status){
      switch(response.SourceId.toString())
      {
          case DataSourceMasters.OFSJobType.toString():
            this.jobTypeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.OFSJobSize.toString():
            this.jobSizeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.PaymentMode.toString():
            this.paymentModeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.SPOutPutProvide.toString():
            this.outputList= AppCommon.CreateDataSource(response);
            break;
           case DataSourceMasters.DeliveryAt.toString():
            this.deliveryList= AppCommon.CreateDataSource(response);
            break;
           case DataSourceMasters.OFSColorType.toString():
            this.colorsList= AppCommon.CreateDataSource(response);
            break;
      }
     }else
     {
       this.ShowAlert(MsgType.ErrorType,response.Message);
     }
      
  }
  public OnDataSourceChildSuccess(response:Status)
  {
      if(response.Status){
        switch(response.SourceId.toString())
        {
            case DataSourceGroup.NoOfPlates.toString():
              this.noofPlatesList= AppCommon.CreateDataSource(response);
            break;
        }
      }
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
 onOffsetPrintingSave(){
    console.log(this.jobOffsetForm.value);
    this.loading.present();
    if(!this.isEditMode){
    let jobRequest= this.CreateOffSetReqest(this.jobOffsetForm.value);
    if(this.errorInPlatesCount){
      this.ShowAlert(MsgType.InfoType,Msg.PlatesCountError);
      return false;
    }
    this.serviceHelper.CreateJob(jobRequest)
    .then( response => this.onSaveSuccess(response) ,
        error => this.OnError(error));
     }else
      {
        let jobRequest= this.UpdateRequest(this.jobOffsetForm.value);
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
 }
 private CreateOffSetReqest(formValues:any):JobCreateRequest
 {
    let jobRequest = new JobCreateRequest();
    jobRequest.JobType= JobType.OffsetPrinting;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
 }
  private UpdateRequest(formValues:any):JobUpdateRequest
  {
    let jobRequest = new JobUpdateRequest();
    jobRequest.JobType= JobType.OffsetPrinting;
    jobRequest.Id=this.editId;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
  }
private SetProperties(formValues:any):OffSetPrinting
{
    let platesSelectedCount=0;
    let screenObj = new OffSetPrinting();
    screenObj.JobType= formValues.jobType;
    screenObj.JobQty =formValues.jobQuantity;
    screenObj.GSM = formValues.jobGSM;
    screenObj.JobSize = formValues.jobSize;
    if(this.isPlatesUsed)
    {
      screenObj.NoOfPlates=formValues.noofPlates;
      if(formValues.plate1color!=""){
         screenObj.Plate1Color=formValues.plate1color;
         platesSelectedCount=1;
      }
      if(formValues.plate2color!=""){
        screenObj.Plate2Color=formValues.plate2color;
        platesSelectedCount=2;
      }
      if(formValues.plate3color!=""){
        screenObj.Plate3Color=formValues.plate3color;
        platesSelectedCount=3;
      }
      if(formValues.plate4color!=""){
        screenObj.Plate4Color=formValues.plate4color;
        platesSelectedCount=4;
      }
    }else
    {
      screenObj.NoOfPlates=0;
      platesSelectedCount=0;
    }
    screenObj.ExpectedDeliverDate = formValues.expDelivery;
    screenObj.PaymentMode = formValues.payMode;
    screenObj.ExpectedCost = formValues.expCost;

    screenObj.OutPutReq=formValues.outputReq;
    screenObj.DeliveryAt =formValues.deliveryAt;
    screenObj.SpecialInstructions=formValues.details;
    if(screenObj.NoOfPlates != platesSelectedCount)
        this.errorInPlatesCount=true;
    return screenObj;
}
public onJobTypeChange(event:any)
 {
    let item = AppCommon.GetElementFromArray(this.jobTypeList,event);
    if(item.Value=="1")
      {
        this.GetDataSourceChild(item.Id,DataSourceGroup.NoOfPlates);
        this.GetDataSource(DataSourceMasters.SPColors);
        this.GetDataSource(DataSourceMasters.OFSColorType);
        this.isPlatesUsed=true;
      }
    else  
      {
       this.isPlatesUsed=false;
       this.noOfPlates= [];
      }
 }
  onPlatesChange(event:any)
  {
    this.noOfPlates= [];
    for(var i=1 ;i<=event;i++ ){
        this.noOfPlates.push(i);
      }
  }
  onRespondClick()
  {
    let responed = AppCommon.CreateResponedData(
      this.currentJob.Id,
      this.currentJob.DocName,
      this.currentJob.JobType,
      this.currentJob.ExpectedCost,
      this.currentJob.ExpectedDeliverDate,
      this.currentJob.DeliveryAt,
      this.currentJob.PaymentMode
    );
    this.nav.push(this.responedPage.component,{"currentJob":responed});
  }
}