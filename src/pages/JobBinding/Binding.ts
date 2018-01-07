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
import {JobType,ActionType,JobNames} from '../../model/appenums';
import {JobCreateRequest,JobGetRequest ,JobUpdateRequest,JobActionRequest} from '../../model/JobRequest';
import {BindingModel} from './Binding.model';
import {Msg,MsgType} from '../../app.config'
@Component({
  selector: 'Binding-Page',
  templateUrl: 'Binding.html'
})
export class BindingPage {

    bindingForm: FormGroup;
    isEditMode=false;
    isEditDesiable=false;
    editId="";
    clearBtnText:string="Clear";
    common = new AppCommon();
    loading: any;
    currentJob:BindingModel;
    currentDate:string;
    responedPage : { component: any };
    enquiriesPage:{component:any}
    jobTypeList: DataSourceList[]=[];
    jobSizeList:DataSourceList[]=[];
    umoList:DataSourceList[]=[];
    noOfCopiesList:DataSourceList[]=[];
    coverTypeList:DataSourceList[]=[];
    paymentModeList: DataSourceList[]=[];
    deliveryList:DataSourceList[]=[];
    
    hideJobSize:boolean=false;
    showCovertType:boolean=true;
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
      if(typeof isDisable!='undefined' && isDisable)
        this.isEditDesiable=true;
    }else{
      this.isEditMode=false;
    }
    this.CreateForm();
}

public CreateForm()
  {
    this.bindingForm = new FormGroup({
      jobType: new FormControl('',Validators.required),
      noOfBook : new FormControl('',Validators.required),
      jobSize:new FormControl('',Validators.required),
      jobDim1:new FormControl('',Validators.required),
      jobDim2:new FormControl('',Validators.required),
      jobUom: new FormControl('', Validators.required),
      noOfCopies : new FormControl('',Validators.required),
      eachCopyQty: new FormControl('',Validators.required),
      coverType:new FormControl('',Validators.required),
      noRequired:new FormControl(false),

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
    this.GetDataSource(DataSourceMasters.BindingJobType);
    this.GetDataSource(DataSourceMasters.BindingJobSize);
    this.GetDataSource(DataSourceMasters.BindingNoOfCopy);
    this.GetDataSource(DataSourceMasters.BindingCoverType);
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
          case DataSourceMasters.BindingJobType.toString():
            this.jobTypeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.BindingJobSize.toString():
            this.jobSizeList= AppCommon.CreateDataSource(response);
            break;
           case DataSourceMasters.BindingNoOfCopy.toString():
            this.noOfCopiesList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.UMO.toString():
            this.umoList= AppCommon.CreateDataSource(response);
            this.HideLoad();
            break;
          case DataSourceMasters.PaymentMode.toString():
            this.paymentModeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.BindingCoverType.toString():
            this.coverTypeList= AppCommon.CreateDataSource(response);
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
 public onJobTypeChange(event:any)
 {
    let item = AppCommon.GetElementFromArray(this.jobTypeList,event);
    if(parseInt(item.Value) <3 )
    {
        this.hideJobSize=false;
        this.bindingForm.patchValue({  //patchValue//setValue
               jobDim1:0,
               jobDim2:0,
               jobUom:0
      });
    }else{
        this.hideJobSize=true;
        this.bindingForm.patchValue({  //patchValue//setValue
               jobSize:0,
               coverType:0,
               noOfCopies:0
      });
    }
    if(parseInt(item.Value) <=2 ){
      this.showCovertType=true;
    }
    else
      {
      this.showCovertType=false;
      this.bindingForm.patchValue({  //patchValue//setValue
               jobSize:0,
               coverType:0,
              noOfCopies:0
      });
      }
 }
public LoadCurrentJob(id:string)
  {
    this.loading.present();
    let job= new JobGetRequest();
    job.JobType=JobType.Binding;
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
     setTimeout(()=>{this.HideLoad();},600);
  }
  HideLoad()
  {
      this.loading.dismiss();
      this.loading = this.loadingCtrl.create();
  }
  SetFormValues(job:BindingModel)
  {
     this.currentJob=job;
      this.bindingForm.patchValue({  //patchValue//setValue
        jobType:job.JobType,
        noOfBook: job.NumberOfBooks,
        jobSize:job.JobSize,
        jobDim1:job.JobSizDimension1,
        jobDim2 :job.JobSizDimension2,
        jobUom:job.UOM,
        noOfCopies:job.NumberOfcopies,
        eachCopyQty:job.EachCopyQty,
        coverType:job.CoverType,
        noRequired:job.NumberingRequired,
        expDelivery:AppCommon.ParseJsonDate(job.ExpectedDeliverDate),
        payMode:job.PaymentMode,
        expCost:job.ExpectedCost,
        deliveryAt:job.DeliveryAt,
        details:job.specialInstructions
      });
      if(this.isEditDesiable)
        this.bindingForm.disable();
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
    jobRequest.JobType= JobType.Binding;
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
public onBindingSave()
{
   this.loading.present();
    if(!this.isEditMode){
      let jobRequest= this.CreateReqest(this.bindingForm.value);
      this.serviceHelper.CreateJob(jobRequest)
        .then( response => this.onSaveSuccess(response) ,
            error => this.OnError(error));
    }else
    {
       let jobRequest= this.UpdateRequest(this.bindingForm.value);
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
    jobRequest.JobType= JobType.Binding;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
 }
  private UpdateRequest(formValues:any):JobUpdateRequest
  {
    let jobRequest = new JobUpdateRequest();
    jobRequest.JobType= JobType.Binding;
    jobRequest.Id=this.editId;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
  }
  private SetProperties(formValues:any):BindingModel
  {
    let screenObj = new BindingModel();
    screenObj.JobType= formValues.jobType;
    screenObj.NumberOfBooks =formValues.noOfBook;
    screenObj.JobSize =formValues.jobSize;
    screenObj.JobSizDimension1 = formValues.jobDim1;
    screenObj.JobSizDimension2 = formValues.jobDim2;
    screenObj.UOM = formValues.jobUom;
    screenObj.NumberOfcopies = formValues.noOfCopies;
    screenObj.EachCopyQty = formValues.eachCopyQty;
    screenObj.NumberingRequired = formValues.noRequired;
    screenObj.CoverType = formValues.coverType;
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
      JobType.Binding,//this.currentJob.JobType,
      this.currentJob.ExpectedCost,
      this.currentJob.ExpectedDeliverDate,
      this.currentJob.DeliveryAt,
      this.currentJob.PaymentMode,
      JobNames.Binding
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
    duration: AppCommon.ToastDuration,
    position: AppCommon.ToastPosition
  });
  toast.onDidDismiss(() => {
     this.nav.setRoot(this.enquiriesPage.component);
     //this.nav.getro.setRoot(this.main_page.component);
  });
  toast.present();
}
}