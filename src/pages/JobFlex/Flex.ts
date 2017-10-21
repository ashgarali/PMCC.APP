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
  selector: 'Flex-Page',
  templateUrl: 'Flex.html'
})
export class FlexPage {

    flexForm: FormGroup;
    isEditMode=false;
    isEditDesiable=false;
    editId="";
    common = new AppCommon();
    loading: any;
    //currentJob:JobPrintingModel;
    currentDate:string;
    responedPage : { component: any };
    enquiriesPage:{component:any}
    noOfDesignList: DataSourceList[]=[];
    jobQualityList:DataSourceList[]=[];
    umoList:DataSourceList[]=[];
    mountingList:DataSourceList[]=[];
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
      mountingReq : new FormControl('',Validators.required),
      
      expDelivery: new FormControl('', Validators.required),
      payMode: new FormControl('', Validators.required),
      expCost: new FormControl('', Validators.required),

      installationReq:new FormControl(false),
      dtpReq:new FormControl(false),
      deliveryAt:new FormControl(),
      details:new FormControl()
    });
  }
}