
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
import {JobPrintingModel} from './Printing.model';
import {Msg,MsgType} from '../../app.config'
@Component({
  selector: 'Printing-Page',
  templateUrl: 'Printing.html'
})
export class PrintingPage {
    screenPrintingForm: FormGroup;
    isEditMode=false;
    isEditDesiable=false;
    clearBtnText:string="Clear";
    editId="";
    responedPage : { component: any };
    enquiriesPage:{component:any}
    jobTypeList: DataSourceList[]=[];
    noOfColorList:DataSourceList[]=[];
    materialTypeList:DataSourceList[]=[];
    jobSizeList:DataSourceList[]=[];
    umoList:DataSourceList[]=[];
    paymentModeList: DataSourceList[]=[];
    outputList:DataSourceList[]=[];
    deliveryList:DataSourceList[]=[];
    common = new AppCommon();
    loading: any;
    currentJob:JobPrintingModel;
    currentDate:string;

    hideMaterialType:boolean=false;
    hideJobSize:boolean=false;
    gummingRequired:boolean=false; 
    pastingRequired:boolean=false; 
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
      this.clearBtnText="Close";
      this.editId = id;
      let isDisable = this.navParams.get('isDisable');
      if(typeof isDisable!='undefined' && isDisable){
        this.isEditDesiable=true;
      }
    }else{
      this.isEditMode=false;
    }
    this.CreateForm(new JobPrintingModel());
}

  public LoadCurrentJob(id:string)
  {
    this.loading.present();
    let job= new JobGetRequest();
    job.JobType=JobType.ScreenPrinting;
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
  SetFormValues(job:JobPrintingModel)
  {
     this.currentJob=job;
      this.screenPrintingForm.patchValue({  //patchValue//setValue
        jobType:job.JobType,
        jobQuantity: job.JobQuantity,
        noOfColor:job.NumberOfColors,
        materialType:job.MaterialType,
        jobSize:job.JobSize,
        jobDim1:job.JobSizDimension1,
        jobDim2 :job.JobSizDimension2,
        jobUom:job.UOM,
        expDelivery:AppCommon.ParseJsonDate(job.ExpectedDeliverDate),
        payMode:job.PaymentMode,
        expCost:job.ExpectedCost,
        gummingReq:job.GummingRequired,
        pastingReq:job.PastingRequired,
        outputReq:job.OutputReq,
        deliveryAt:job.DeliveryAt,
        details:job.specialInstructions
      });
      if(this.isEditDesiable)
        this.screenPrintingForm.disable();
  }
  public ClearForm()
  {
    if( this.isEditMode)
      {
          this.CheckDoument();
      }else{
        this.CreateForm(new JobPrintingModel());
      }
    
  }
  public CreateForm(job:JobPrintingModel)
  {
        this.screenPrintingForm = new FormGroup({
        jobType: new FormControl('',Validators.required),
        jobQuantity : new FormControl('',Validators.required),
        noOfColor:new FormControl('',Validators.required),
        materialType:new FormControl('',Validators.required),
        jobSize:new FormControl('',Validators.required),
        jobDim1:new FormControl('',Validators.required),
        jobDim2:new FormControl('',Validators.required),
        jobUom: new FormControl('', Validators.required),
        expDelivery: new FormControl('', Validators.required),
        payMode: new FormControl('', Validators.required),
        expCost: new FormControl('', Validators.required),

        gummingReq:new FormControl(false),
        pastingReq:new FormControl(false),
        outputReq: new FormControl(),
        deliveryAt:new FormControl(),
        details:new FormControl()
      });
  }
  ionViewWillEnter()
  {
    this.GetDataSource(DataSourceMasters.SPJobType);
    this.GetDataSource(DataSourceMasters.SPColors);
    this.GetDataSource(DataSourceMasters.SPOutPutProvideNew);
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
          case DataSourceMasters.SPJobType.toString():
            this.jobTypeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.SPColors.toString():
            this.noOfColorList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.UMO.toString():
            this.umoList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.PaymentMode.toString():
            this.paymentModeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.SPOutPutProvideNew.toString():
            this.outputList= AppCommon.CreateDataSource(response);
            break;
           case DataSourceMasters.DeliveryAt.toString():
            this.deliveryList= AppCommon.CreateDataSource(response);
            break;
      }
      //this.jobTypes = response.Value.map(item => new DataSourceList(item));
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
            case DataSourceGroup.MaterialType.toString():
              this.materialTypeList= AppCommon.CreateDataSource(response);
            break;
            case DataSourceGroup.JobSize.toString():
               this.jobSizeList= AppCommon.CreateDataSource(response);
            break;
        }
      }
  }
  public CloseDocument()
  {
    let jobRequest = new JobActionRequest();
    jobRequest.JobType= JobType.ScreenPrinting;
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
 onScreenPrintingSave(){
    console.log(this.screenPrintingForm.value);
    this.loading.present();
    if(!this.isEditMode){
      let jobRequest= this.CreatePrintingReqest(this.screenPrintingForm.value);
      this.serviceHelper.CreateJob(jobRequest)
        .then( response => this.onSaveSuccess(response) ,
            error => this.OnError(error));
    }else
    {
       let jobRequest= this.UpdateRequest(this.screenPrintingForm.value);
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
 //#region Screen
 public onJobTypeChange(event:any)
 {
    let item = AppCommon.GetElementFromArray(this.jobTypeList,event);
    if(parseInt(item.Value) <=7 ){
      this.GetDataSourceChild(item.Id,DataSourceGroup.MaterialType);
       this.hideMaterialType=false;
        this.screenPrintingForm.patchValue({  //patchValue//setValue
                materialType:''
      });
    }
    else
      {
        this.screenPrintingForm.patchValue({  //patchValue//setValue
                materialType:-1
              });
        this.hideMaterialType=true;
      }

    if(parseInt(item.Value) < 3){
      this.GetDataSourceChild(item.Id,DataSourceGroup.JobSize);
      this.hideJobSize=false;
       this.screenPrintingForm.patchValue({  //patchValue//setValue
         jobDim1:-1,
         jobDim2:-1,
         jobUom:-1,
       });
    }
    else
      {
        this.screenPrintingForm.patchValue({  //patchValue//setValue
         jobSize:-1
       });
        this.screenPrintingForm.patchValue({  //patchValue//setValue
         jobDim1:'',
         jobDim2:'',
         jobUom:''
       });
        this.hideJobSize=true;
      }
    
      if(parseInt(item.Value)==3)
      {
        this.pastingRequired=true;
      }else
      {
        this.pastingRequired=false;
      }

      if(parseInt(item.Value)==4)
      {
        this.gummingRequired=true;
      }else
      {
        this.gummingRequired=false;
      }
      
 }
 
 
 //#endregion
 private CreatePrintingReqest(formValues:any):JobCreateRequest
 {
    let jobRequest = new JobCreateRequest();
    jobRequest.JobType= JobType.ScreenPrinting;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
 }
  private UpdateRequest(formValues:any):JobUpdateRequest
  {
    let jobRequest = new JobUpdateRequest();
    jobRequest.JobType= JobType.ScreenPrinting;
    jobRequest.Id=this.editId;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
  }
  private SetProperties(formValues:any):ScreenPrinting
  {
    let screenObj = new ScreenPrinting();
    screenObj.JobType= formValues.jobType;
    screenObj.JobQuantity =formValues.jobQuantity;
    screenObj.NumberOfColors =formValues.noOfColor;
    screenObj.MaterialType =formValues.materialType;
    screenObj.JobSize = formValues.jobSize;
    screenObj.JobSizDimension1 = formValues.jobDim1;
    screenObj.JobSizDimension2 = formValues.jobDim2;
    screenObj.UOM = formValues.jobUom;
    screenObj.ExpectedDeliverDate = formValues.expDelivery;
    screenObj.PaymentMode = formValues.payMode;
    screenObj.ExpectedCost = formValues.expCost;

    screenObj.GummingRequired = formValues.gummingReq;
    screenObj.PastingRequired =formValues.pastingReq;
    screenObj.OutPutReq=formValues.outputReq;
    screenObj.DeliveryAt =formValues.deliveryAt;
    screenObj.SpecialInstructions=formValues.details;
    return screenObj;
  }
  onRespondClick()
  {
    let responed = AppCommon.CreateResponedData(
      this.currentJob.Id,
      this.currentJob.DocName,
      JobType.ScreenPrinting,//this.currentJob.JobType,
      this.currentJob.ExpectedCost,
      this.currentJob.ExpectedDeliverDate,
      this.currentJob.DeliveryAt,
      this.currentJob.PaymentMode
    );
    this.nav.push(this.responedPage.component,{"currentJob":responed});
  }
}