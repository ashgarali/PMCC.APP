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
import {ICardModel} from './ICard.model';
import {Msg,MsgType} from '../../app.config'
@Component({
  selector: 'ICard-Page',
  templateUrl: 'ICard.html'
})
export class ICardPage {

    icardForm: FormGroup;
    isEditMode=false;
    isEditDesiable=false;
    editId="";
    common = new AppCommon();
    loading: any;
    currentJob:ICardModel;
    currentDate:string;
    responedPage : { component: any };
    enquiriesPage:{component:any}
    jobTypeList: DataSourceList[]=[];
    jobQualityList:DataSourceList[]=[];
    lessTypeList:DataSourceList[]=[];
    holderQualityList:DataSourceList[]=[];
    paymentModeList: DataSourceList[]=[];
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
    this.icardForm = new FormGroup({
      jobType: new FormControl('',Validators.required),
      jobQuality : new FormControl('',Validators.required),
      jobQuantity:new FormControl('',Validators.required),
      lessRequired:new FormControl(false),
      lessType:new FormControl('',Validators.required),
      lessPrintRequired:new FormControl(false),
      holderRequired:new FormControl(false),
      holderQuality:new FormControl('',Validators.required),

      expDelivery: new FormControl('', Validators.required),
      payMode: new FormControl('', Validators.required),
      expCost: new FormControl('', Validators.required),

      deliveryAt:new FormControl(),
      details:new FormControl()
    });
    this.icardForm.controls.lessType.disable({onlySelf: true});
    this.icardForm.controls.lessPrintRequired.disable({onlySelf: true});
    this.icardForm.controls.holderQuality.disable({onlySelf: true});
  }
   ionViewWillEnter()
  {
    this.loading.present();
    this.GetDataSource(DataSourceMasters.ICardJobType);
    this.GetDataSource(DataSourceMasters.ICardJobQuality);
    this.GetDataSource(DataSourceMasters.ICardLesstype);
    this.GetDataSource(DataSourceMasters.ICardHolderQuality);
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
          case DataSourceMasters.ICardJobType.toString():
            this.jobTypeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.ICardJobQuality.toString():
            this.jobQualityList= AppCommon.CreateDataSource(response);
            break;
           case DataSourceMasters.ICardLesstype.toString():
            this.lessTypeList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.PaymentMode.toString():
            this.paymentModeList= AppCommon.CreateDataSource(response);
             this.loading.dismiss();
            break;
          case DataSourceMasters.ICardHolderQuality.toString():
            this.holderQualityList= AppCommon.CreateDataSource(response);
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
    job.JobType=JobType.IdentityCard;
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
        setTimeout(()=>{this.SetFormValues(job);},500);
      }
      this.loading.dismiss();
      this.loading = this.loadingCtrl.create();
  }
 public  SetFormValues(job:ICardModel)
  {
     this.currentJob=job;
      this.icardForm.patchValue({  //patchValue//setValue
        jobType:job.JobType,
        jobQuality: job.JobQuality,
        jobQuantity:job.JobQuantity,
        lessRequired:job.LessRequired,
        lessType :job.LessType,
        lessPrintRequired:job.LessPrintingRequired,
        holderRequired:job.HolderRequired,
        holderQuality:job.HolderQuality,
        expDelivery:AppCommon.ParseJsonDate(job.ExpectedDeliverDate),
        payMode:job.PaymentMode,
        expCost:job.ExpectedCost,
        deliveryAt:job.DeliveryAt,
        details:job.specialInstructions
      });
      this.onLessRequiredChange();
      this.onHolderRequiredChange();
      if(this.isEditDesiable)
        this.icardForm.disable();
  }
  public onLessRequiredChange()
  {
      if(this.icardForm.controls.lessRequired.value)
        {
          this.icardForm.controls.lessType.enable({onlySelf: true});
          this.icardForm.controls.lessPrintRequired.enable({onlySelf: true});

        }else
        {
          this.icardForm.controls.lessType.disable({onlySelf: true});
          this.icardForm.controls.lessPrintRequired.disable({onlySelf: true});
        }
  }
  public onHolderRequiredChange()
  {
    if(this.icardForm.controls.holderRequired.value)
      this.icardForm.controls.holderQuality.enable({onlySelf: true});
    else
       this.icardForm.controls.holderQuality.disable({onlySelf: true});

  }
  public onICardSave()
{
   this.loading.present();
    if(!this.isEditMode){
      let jobRequest= this.CreateReqest(this.icardForm.value);
      this.serviceHelper.CreateJob(jobRequest)
        .then( response => this.onSaveSuccess(response) ,
            error => this.OnError(error));
    }else
    {
       let jobRequest= this.UpdateRequest(this.icardForm.value);
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
    jobRequest.JobType= JobType.IdentityCard;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
 }
  private UpdateRequest(formValues:any):JobUpdateRequest
  {
    let jobRequest = new JobUpdateRequest();
    jobRequest.JobType= JobType.IdentityCard;
    jobRequest.Id=this.editId;
    jobRequest.Data=this.SetProperties(formValues);
    return jobRequest;
  }
  private SetProperties(formValues:any):ICardModel
  {
    let screenObj = new ICardModel();
    screenObj.JobType= formValues.jobType;
    screenObj.JobQuality =formValues.jobQuality;
    screenObj.JobQuantity =formValues.jobQuantity;
    if(formValues.lessRequired)
    {
      screenObj.LessRequired = formValues.lessRequired;
      screenObj.LessType = formValues.lessType;
      screenObj.LessPrintingRequired = formValues.lessPrintRequired;
    }
    if(formValues.holderRequired)
      {
        screenObj.HolderRequired = formValues.holderRequired;
        screenObj.HolderQuality = formValues.holderQuality;
      }
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
      JobType.IdentityCard,//this.currentJob.JobType,
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