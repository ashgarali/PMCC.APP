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
//import {JobPrintingModel} from './Binding.model';
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
    //currentJob:JobPrintingModel;
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
      
      expDelivery: new FormControl('', Validators.required),
      payMode: new FormControl('', Validators.required),
      expCost: new FormControl('', Validators.required),

      outputReq: new FormControl(),
      deliveryAt:new FormControl(),
      details:new FormControl()
    });
  }
   ionViewWillEnter()
  {
    this.GetDataSource(DataSourceMasters.DTPJobType);
    this.GetDataSource(DataSourceMasters.DTPJobLang);
    this.GetDataSource(DataSourceMasters.DTPOutput);
    this.GetDataSource(DataSourceMasters.DeliveryAt);
    this.GetDataSource(DataSourceMasters.PaymentMode);
    this.GetDataSource(DataSourceMasters.UMO);
    // if(this.isEditMode)
    //   this.LoadCurrentJob(this.editId);
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
           case DataSourceMasters.DTPOutput.toString():
            this.outputList= AppCommon.CreateDataSource(response);
            break;
          case DataSourceMasters.UMO.toString():
            this.umoList= AppCommon.CreateDataSource(response);
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