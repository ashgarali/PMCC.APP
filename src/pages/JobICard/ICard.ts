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
    //currentJob:JobPrintingModel;
    currentDate:string;
    responedPage : { component: any };
    enquiriesPage:{component:any}
    jobTypeList: DataSourceList[]=[];
    jobQualityList:DataSourceList[]=[];
    lessTypeList:DataSourceList[]=[];
    holderQualityList:DataSourceList[]=[];
    paymentModeList: DataSourceList[]=[];
    deliveryList:DataSourceList[]=[];
    
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
  }
}