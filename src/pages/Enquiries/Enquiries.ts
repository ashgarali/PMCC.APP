import { Component } from '@angular/core';
import { NavController, SegmentButton,ModalController, AlertController ,LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { EnquiriesModel ,EnquiryModel} from './Enquiries.model';
import {PrintingPage } from'../JobPrinting/Printing';
import {JobOffsetPage} from '../JobOffset/JobOffset';
import {BindingPage } from '../JobBinding/Binding';
import {DtpPage} from '../JobDTP/Dtp';
import {ICardPage} from '../JobICard/ICard';
import {FlexPage } from '../JobFlex/Flex';
import {ResponsesPage } from'../Responses/Responses';
import {JobSelectionPage} from '../JobSelection/JobSelection';
import {ServiceHelper} from '../../services/serviceHelper';
import {JobGetsRequest} from '../../model/JobRequest';
import {JobType,ViewsType,Operators} from '../../model/appenums';
import { Filter} from '../../model/datasource.model';
import {Msg,MsgType,AppConfig} from '../../app.config'

@Component({
  selector: 'enquiries-page',
  templateUrl: 'Enquiries.html'
})
export class EnquiriesPage {
  segment: string;
  
  enquiries: EnquiriesModel = new EnquiriesModel();
  loading: any;
  printingPage : { component: any };
  responsesPage : { component: any };
  jobOffsetPage :{component:any};
  jobBindingPage:{component:any};
  jobdtpPage:{component:any};
  jobICardPage: {component:any};
  jobFlexPage:{component:any};
  jobSelectionPage :{component:any};

   connctionErrorCount:number=0;
  _refresher:any;
  startIndex:number=0;
  lastLoadType:boolean=false;
  constructor(
    public nav: NavController,
    public serviceHelper: ServiceHelper,
    public loadingCtrl: LoadingController,
    public modal: ModalController,
    public alertCtrl: AlertController,
  ) {
    this.segment = "Active";
    this.loading = this.loadingCtrl.create();
    this.printingPage = { component: PrintingPage };
     this.responsesPage = { component: ResponsesPage };
     this.jobSelectionPage ={component : JobSelectionPage};
     this.jobOffsetPage ={component:JobOffsetPage};
     this.jobBindingPage ={component:BindingPage};
     this.jobdtpPage ={component:DtpPage};
     this.jobICardPage ={component:ICardPage};
     this.jobFlexPage = { component:FlexPage};
  }
  ionViewWillEnter() {
    this.loading.present();
     this.startIndex=0;
    this.enquiries = new EnquiriesModel();
    this.GetEnquiries(false);
    
  }
  doRefresh(){
  this.startIndex=0;
  this.loading.present();
   this.enquiries = new EnquiriesModel();
  this.GetEnquiries(this.lastLoadType);
}
  doInfinite(infiniteScroll){
    this._refresher=infiniteScroll;
    this.GetEnquiries(this.lastLoadType);
}
public GetEnquiries(IsClosed:boolean=false)
{
  this.lastLoadType=IsClosed;
  this.serviceHelper
      .GetViews(this.CreateEnquiriesRequest(IsClosed))
      .then(response => {
         let didGetData=false;
        for(let enquirie of response.Value.Data) {
           this.enquiries.enquiries.push(enquirie);
            didGetData=true;
        }
        if(didGetData)
          this.startIndex +=AppConfig.RecordCount;
        if(this._refresher!=undefined){
          this._refresher.complete();
           this._refresher=undefined;
        }
        this.loading.dismiss();
        this.loading = this.loadingCtrl.create();
      },error => this.OnError(error));
}
 private CreateEnquiriesRequest(IsClosed :boolean):JobGetsRequest
 {
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewEnquiries;
    request.StartIndex=this.startIndex+1;
    if(IsClosed)
      {
          request.Filters.push(new Filter("IsClosed",Operators.Equals,true))
      }else
      {
          request.Filters.push(new Filter("IsClosed",Operators.Equals,false))
      }
    return request;
 }
  onActiveItemClick(item: EnquiryModel)
  {
    this.GoToJobPage(item);
  }
  GoToJobPage(item: EnquiryModel)
  {
     switch(item.JobTypeId){
        case JobType.ScreenPrinting:
          this.nav.push(this.printingPage.component,{id:item.Id});
        break;
        case JobType.OffsetPrinting:
          this.nav.push(this.jobOffsetPage.component,{id:item.Id});
        break;
        case JobType.Binding:
          this.nav.push(this.jobBindingPage.component,{id:item.Id});
        break;
        case JobType.DTP:
          this.nav.push(this.jobdtpPage.component,{id:item.Id});
        break;
        case JobType.IdentityCard:
          this.nav.push(this.jobICardPage.component,{id:item.Id});
        break;
        case JobType.FlexPrinting:
          this.nav.push(this.jobFlexPage.component,{id:item.Id});
        break;
     }
  }
  public OnError(error:any)
  {
    this.loading.dismiss();
    if(this.connctionErrorCount==0)
      this.ShowAlert("Error",error.message);
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
  onResponsesClick(item:EnquiryModel)
  {
    let currentJob={
      "JobTypeId":item.Id,
      "JobType":item.JobTypeId
    };
    this.nav.push(this.responsesPage.component,{"curentJob":currentJob});
  }
  onSelectJobType()
  {
    this.nav.push(this.jobSelectionPage.component);
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: boolean) {
    this.loading.present();
    this.startIndex=0;
    this.enquiries = new EnquiriesModel();
    this.GetEnquiries(segmentButton);
    // console.log('Segment selected', segmentButton.value);
  }

}
